---
tags:
  - Математика
  - math
---

# Округление в Python

## Округление вниз

```python
def floor(x):
    """
    >>> floor(4.2)
    4
    >>> floor(4.6)
    4
    >>> floor(4.0)
    4
    """
    return int(x)
```

Также данная функция реализована в модуле _math_ -- [math.floor](https://docs.python.org/3/library/math.html#math.floor)

## Округление вверх

```python
def ceil(x):
    """
    >>> ceil(4.2)
    5
    >>> ceil(4.6)
    5
    >>> ceil(4.0)
    4
    """
    return int(x + (x % 1 != 0))
```

Также данная функция реализована в модуле _math_ -- [math.ceil](https://docs.python.org/3/library/math.html#math.ceil)

## Округление до ближайшего целого

```python
def round_nearest(x):
    """
    >>> round_nearest(4.2)
    4
    >>> round_nearest(4.6)
    5
    >>> round_nearest(4.0)
    4
    """
    return int(x + .5)
```

## Банковское округление

```python
def round_even(x):
    """
    >>> round_even(2.5)
    2
    >>> round_even(3.5)
    4
    >>> round_even(3.0)
    3
    """
    return int(x + (int(x) % 2) * 0.5)
```

Также данная функция реализована в Python -- [round](https://docs.python.org/3/library/functions.html#round).

Да, `round` реализует банковское округление, а не к ближайшему целому. 

### Нюанс использования round

Есть один нюанс использования этой встроенной функции:

```python
>>> round(2.65, 1)
2.6
>>> round(2.85, 1)
2.9
```

Дело в том, что из-за тонкостей представления чисел в компьютере `2.85` на самом деле немного больше, чем настоящие `2.85`. Это можно увидеть в следующем примере:

```python
>>> from fractions import Fraction
>>> num1 = Fraction(2.85)
>>> num2 = Fraction('2.85')
>>> num1 > num2
True
```

## Переопределение методов округления

С помощью dunder-методов можно переопределять поведение функций `round`, `math.floor` и `math.ceil`:

```python
class MyNumber(float):
    def __floor__(self):
        print("Округление вниз")
        return -2 * super().__floor__()

    def __ceil__(self):
        print("Округление вверх")
        return 2 * super().__ceil__()

    def __round__(self, n=None):
        print("Банковское округление")
        return 10 * super().__round__(n)


if __name__ == '__main__':
    import math

    num = MyNumber(4.568)
    print(math.ceil(num))
    print(math.floor(num))
    print(round(num, 2))

```

```text
Округление вверх
10
Округление вниз
-8
Банковское округление
45.7
```

## Ссылки
- [Работа с десятичными числами](./decimal.md)
- [Модуль decimal](https://metanit.com/python/tutorial/6.4.php)
