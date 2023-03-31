---
tags:
  - ООП
  - Память
  - Производительность
---

# Слоты объекта. __slots__

Каждый объект в Python содержит динамический словарь, который позволяет добавлять атрибуты, поэтому помимо самого объекта приходится хранить еще и словарь с атрибутами.

Использование `__slots__` позволяет выделить статический объем памяти при создании объекта. Это уменьшает потери памяти и ускоряет работу программы, выделяя пространство для фиксированного количества атрибутов.

Пример объекта без слотов:

```python
class Student:
    def __init__(self, name, surname, marks):
        self.name = name
        self.surname = surname
        self.marks
        

if __name__ == '__main__':
    stud1 = Student('Alex', 'Wignorbo', [5, 4, 5, 5])
    print(stud1.__dict__)
```

Выведет

```
{'name': 'Alex', 'surname': 'Wignorbo', 'marks': [5, 4, 5, 5]}
```

Пример объекта со слотами:

```python
class StudentWithSlots:
    __slots__ = ('name', 'surname', 'marks')

    def __init__(self, name, surname, marks):
        self.name = name
        self.surname = surname
        self.marks
        

if __name__ == '__main__':
    stud2 = StudentWithSLots('Alex', 'Wignorbo', [5, 4, 5, 5])
    print(stud2.__slots__)
    print(stud2.__dict__)
```

Выведет

```
('name', 'surname', 'marks')
AttributeError: 'StudentWithSlots' object has no attribute '__dict__'
```

## Сравнение скорости обращения к атрибутам


```
%%timeit
stud1.name = 'Hello'
stud1.name
del stud1.name
```

```
106 ns ± 13.4 ns per loop (mean ± std. dev. of 7 runs, 10,000,000 loops each)
```

```
%%timeit
stud2.name = 'Hello'
stud2.name
del stud2.name
```

```
77.4 ns ± 2.56 ns per loop (mean ± std. dev. of 7 runs, 10,000,000 loops each)
```

Обеспечивает прирост скорости порядка 27% (Python 3.10.6, Ubuntu)

## Сравнение потребления памяти

```
import sys

print(sys.getsizeof(stud1), sys.getsizeof(stud2))
print(sys.getsizeof(stud1.__dict__), sys.getsizeof(stud2.__slots__))
```

```
48 56
360 64
```

Как можно заметить, на словарь выделяется большее количество памяти, чем на те же атрибуты объекта, объявленные с помощью `__slots__`.

## Ссылки
- [Документация. `object.__slots__`](https://docs.python.org/3/reference/datamodel.html?#object.__slots__)
