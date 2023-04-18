---
tags:
  - Тестирование
  - doctest
---

# Модуль doctest

Данный модуль позволяет проводить тестирование с помощью docstring'ов.

```python
"""
>>> sum_of_squares(20)
2870
"""


def sum_of_squares(n: int) -> int:
    """Return the sum of 1^2 + 2^2 + 3^2 + ... + n^2

    >>> sum_of_squares(1)
    1
    >>> sum_of_squares(5)
    55
    >>> sum_of_squares(10)
    385
    >>> sum_of_squares(-1)
    Traceback (most recent call last):
        ...
    ValueError: n must be >= 0
    """

    if n < 0:
        raise ValueError("n must be >= 0")

    result = 0
    for i in range(1, n + 1):
        result += i ** 2
    return result


if __name__ == '__main__':
    import doctest

    doctest.testmod(verbose=True)
```

```text
Trying:
    sum_of_squares(20)
Expecting:
    2870
ok
Trying:
    sum_of_squares(1)
Expecting:
    1
ok
Trying:
    sum_of_squares(5)
Expecting:
    55
ok
Trying:
    sum_of_squares(10)
Expecting:
    385
ok
Trying:
    sum_of_squares(-1)
Expecting:
    Traceback (most recent call last):
        ...
    ValueError: n must be >= 0
ok
2 items passed all tests:
   1 tests in __main__
   4 tests in __main__.sum_of_squares
5 tests in 2 items.
5 passed and 0 failed.
Test passed.
```

## Ссылки

- [Документация. doctest — Test interactive Python examples](https://docs.python.org/3/library/doctest.html)
