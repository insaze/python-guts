---
tags:
  - Структуры данных
  - Контекстные менеджеры
  - Производительность
  - Массивы
  - Форматирование
  - Память
---

# Модуль array

Данный модуль из стандартной библиотеки предоставляет структуру данных `array`, который ведет себя как обычный список,
однако элементы ограничены определенным размером.

Какие типы можно хранить:

- 'b' - signed char (int, 1 байт)
- 'B' - unsigned char (int, 1 байт)
- 'u' - wchar_t (Символ Unicode, 2 или 4 байта в зависимости от платформы)
- 'h' - signed short (int, 2 байта)
- 'H' - unsigned short (int, 2 байта)
- 'i' - signed int (int, 2 байта)
- 'I' - unsigned int (int, 2 байта)
- 'l' - signed long (int, 4 байта)
- 'L' - unsigned long (int, 4 байта)
- 'q' - signed long long (int, 8 байт)
- 'Q' - unsigned long long (int, 8 байт)
- 'f' - float (float, 4 байт)
- 'd' - double (float, 8 байт)

## Сравнение производительности

Протестируем время выполнения основных операций и размер структур с помощью следующего кода:

```python
from array import array
from time import perf_counter


class Timer:
    def __init__(self, message: str):
        self.message = message
        self.start = None
        self.duration = None

    def __enter__(self):
        self.start = perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.duration = perf_counter() - self.start


data: dict[str, list] = {}
N = 10_000

lst_timer = Timer("list")
arr_timer = Timer("array")

with lst_timer:
    lst = list(range(N))
with arr_timer:
    arr = array("H", range(N))
data["Время инициализации"] = [lst_timer.duration, arr_timer.duration]

data["Размер заполненной структуры"] = [lst.__sizeof__(), arr.__sizeof__()]

with lst_timer:
    lst.append(N)
with arr_timer:
    arr.append(N)
data["Время добавления"] = [lst_timer.duration, arr_timer.duration]

with lst_timer:
    lst.insert(0, 0)
with arr_timer:
    arr.insert(0, 0)
data["Время вставки в начало"] = [lst_timer.duration, arr_timer.duration]

with lst_timer:
    lst.remove(0)
with arr_timer:
    arr.remove(0)
data["Время удаления"] = [lst_timer.duration, arr_timer.duration]

with lst_timer:
    _ = N / 2 in lst
with arr_timer:
    _ = N / 2 in arr
data["Время поиска"] = [lst_timer.duration, arr_timer.duration]

with lst_timer:
    for _ in lst:
        ...
with arr_timer:
    for _ in arr:
        ...
data["Время прохода"] = [lst_timer.duration, arr_timer.duration]

with lst_timer:
    _ = lst[N // 2]
with arr_timer:
    _ = arr[N // 2]
data["Время индексации"] = [lst_timer.duration, arr_timer.duration]

header = "{:<30}{:^8}{:^8}{:^8}{:^8}"
row = "{:<30}{:^8.1e}{:^8.1e}{:^8}{:^8.1f}"

print(header.format("", "list", "array", "winner", "ratio"))
for title, (lst_value, arr_value) in data.items():
    worst, best = max(lst_value, arr_value), min(lst_value, arr_value)
    ratio = worst / best
    winner = 'array' if best == arr_value else 'list'
    print(row.format(title, lst_value, arr_value, winner, ratio))
```

Результаты

```text
                                list   array   winner  ratio  
Время инициализации           2.1e-04 4.9e-04   list    2.4   
Размер заполненной структуры  8.0e+04 2.0e+04  array    4.0   
Время добавления              3.5e-05 7.6e-07  array    45.4  
Время вставки в начало        3.4e-06 4.9e-06   list    1.4   
Время удаления                1.6e-06 8.1e-07  array    1.9   
Время поиска                  7.4e-05 1.2e-04   list    1.7   
Время прохода                 1.6e-04 2.1e-04   list    1.3   
Время индексации              4.8e-07 5.9e-07   list    1.2 
```

Как можно видеть, `array` выигрывает только по размеру структуры, по времени добавление и по времени удаления. 

## Копаемся в кишках

Меня удивило разительное отличие по времени добавлении - `array` в 30-60 раз был быстрее. Посмотрим исходный код `array`:

```c
static PyObject *
array_array_append(arrayobject *self, PyObject *v)
{
    return ins(self, Py_SIZE(self), v);
}
```

```c
static PyObject *
ins(arrayobject *self, Py_ssize_t where, PyObject *v)
{
    if (ins1(self, where, v) != 0)
        return NULL;
    Py_RETURN_NONE;
}
```

```c
static int
ins1(arrayobject *self, Py_ssize_t where, PyObject *v)
{
    char *items;
    Py_ssize_t n = Py_SIZE(self);
    if (v == NULL) {
        PyErr_BadInternalCall();
        return -1;
    }
    if ((*self->ob_descr->setitem)(self, -1, v) < 0)
        return -1;

    if (array_resize(self, n+1) == -1)
        return -1;
    items = self->ob_item;
    if (where < 0) {
        where += n;
        if (where < 0)
            where = 0;
    }
    if (where > n)
        where = n;
    /* appends don't need to call memmove() */
    if (where != n)
        memmove(items + (where+1)*self->ob_descr->itemsize,
            items + where*self->ob_descr->itemsize,
            (n-where)*self->ob_descr->itemsize);
    return (*self->ob_descr->setitem)(self, where, v);
}
```

Сравним с `list`:

```c
static PyObject *
list_append(PyListObject *self, PyObject *object)
{
    if (_PyList_AppendTakeRef(self, Py_NewRef(object)) < 0) {
        return NULL;
    }
    Py_RETURN_NONE;
}
```

```c
static inline int
_PyList_AppendTakeRef(PyListObject *self, PyObject *newitem)
{
    assert(self != NULL && newitem != NULL);
    assert(PyList_Check(self));
    Py_ssize_t len = PyList_GET_SIZE(self);
    Py_ssize_t allocated = self->allocated;
    assert((size_t)len + 1 < PY_SSIZE_T_MAX);
    if (allocated > len) {
        PyList_SET_ITEM(self, len, newitem);
        Py_SET_SIZE(self, len + 1);
        return 0;
    }
    return _PyList_AppendTakeRefListResize(self, newitem);
}
```

```c
int
_PyList_AppendTakeRefListResize(PyListObject *self, PyObject *newitem)
{
    Py_ssize_t len = PyList_GET_SIZE(self);
    assert(self->allocated == -1 || self->allocated == len);
    if (list_resize(self, len + 1) < 0) {
        Py_DECREF(newitem);
        return -1;
    }
    PyList_SET_ITEM(self, len, newitem);
    return 0;
}
```

Дальше копнуть не удалось =(. Кажется, что `array` просто использует гораздо меньше инструкций для добавления элемента.

## Выводы

Если важна память, то использование `array` поможет сильно ее сэкономить, однако по производительности он сильно уступает обычному списку. Массивы в `numpy` в этом плане будут эффективнее.

## Ссылки
- [array. Документация](https://docs.python.org/3/library/array.html)
- [Исходный код модуля array](https://github.com/python/cpython/blob/main/Modules/arraymodule.c)
