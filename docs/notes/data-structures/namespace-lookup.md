---
tags:
  - Производительность
  - Словари
  - Структуры данных
  - Модули
  - timeit
  - dis
---

# Поиск в пространстве имен

Словарь является отличной структурой данных для поиска переменных в пространстве имен, однако это действие может замедлить время работы программы.

## Как работает поиск в пространстве имен

Пусть мы обращаемся к переменной X.

1. Сначала смотрим, есть ли `X` в словаре `locals()`, который хранит все локальные переменные.
2. Если там не оказалось `X`, смотрим в `globals()`, который хранит глобальные переменные.
3. Если и там не оказалось, тогда исследуется `__builtins__`. Технически это модуль, поэтому поиск идет по его
   пространству имен. Например, функцию `all` можно получить так:
    
    ```python
    getattr(__builtins__, 'all')
    ```
4. Если ничего не найдено, вызывается `NameError`.

## Оптимизация поиска

Посмотрим на примере, как вышеуказанная процедура влияет на время работы программы: 

```python
import math
from math import sin


def test1(x):
    res = 1
    for _ in range(1_000):
        res += math.sin(x)
    return res


def test2(x):
    res = 1
    for _ in range(1_000):
        res += sin(x)
    return res


def test3(x, sin=math.sin):
    res = 1
    for _ in range(1_000):
        res += sin(x)
    return res


def test4(x, sin=sin):
    res = 1
    for _ in range(1_000):
        res += sin(x)
    return res
```

Замерим время работы:

```jupyterpython
In [2]: %timeit test1(num)
90.7 µs ± 252 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)

In [3]: %timeit test2(num)
70.2 µs ± 717 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)

In [4]: %timeit test3(num)
68.1 µs ± 159 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)

In [5]: %timeit test4(num)
67.8 µs ± 126 ns per loop (mean ± std. dev. of 7 runs, 10,000 loops each)
```

Посмотрим байт-код:

```python
>>> dis.dis(test1)
   ...
             18 LOAD_GLOBAL              1 (math)
             20 LOAD_METHOD              2 (sin)
             22 LOAD_FAST                0 (x)
             24 CALL_METHOD              1
   ...
>>> dis.dis(test2)
   ...
             18 LOAD_GLOBAL              1 (sin)
             20 LOAD_FAST                0 (x)
             22 CALL_FUNCTION            1
   ...
>>> dis.dis(test3)
   ...
             18 LOAD_FAST                1 (sin)
             20 LOAD_FAST                0 (x)
             22 CALL_FUNCTION            1
   ...
>>> dis.dis(test4)
   ...
             18 LOAD_FAST                1 (sin)
             20 LOAD_FAST                0 (x)
             22 CALL_FUNCTION            1
   ...
```

Как делается поиск `sin` в каждой функции:

**test1**:

1. math in locals()
2. math in globals()
3. sin in math

**test2**:

1. sin in locals()
2. sin in globals()

**test3**:

При объявлении функции:

1. math in locals()
2. math in globals()
3. sin in math

При вызове функции:

1. sin in locals()

**test4**:

При объявлении функции:

1. sin in locals()
2. sin in globals()

При вызове функции:

1. sin in locals()

## Выводы

Третья и четвертая функции выглядят совсем не в Python-стиле, однако данный трюк поможет сэкономить микросекунды. Это может быть полезно, если какая-то функция вызывается очень часто.

Также импорт нужных методов из модуля сэкономит немного времени на поиске внутри пространства имен данного модуля, поэтому для повышения производительности лучше использовать `from ... import ...`.
