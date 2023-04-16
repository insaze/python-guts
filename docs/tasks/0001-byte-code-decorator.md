---
tags:
  - Декораторы
  - Байт-код
  - dis
---

# 0001. Байт-код декоратор

Напишите декоратор `inspect`, который будет выводить название вызываемой функции, передаваемые аргументы и байт-код декорируемой функции.

Для получения байт-кода можно использовать [модуль dis](https://docs.python.org/3/library/dis.html).

## Пример

```python
@inspect
def sum_(a: int, b: int) -> int:
    return a + b


sum_(3, 5)
sum_: (3, 5) {}
  3           0 LOAD_FAST                0 (a)
              2 LOAD_FAST                1 (b)
              4 BINARY_ADD
              6 RETURN_VALUE
Out[5]: 8
```
