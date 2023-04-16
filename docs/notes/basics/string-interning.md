---
tags:
  - Строки
  - Память
---

# Интернирование строк

Рассмотрим на примерах такое явление в Python как интернирование строк. Это оптимизация CPython, которая позволяет переиспользовать раннее созданные строки.

```python
>>> s1 = 'hello'
>>> s2 = 'hello'
>>> s1 is s2
True
```

В данном случае две строки будут ссылаться на одну и ту же ячейку памяти.

```python
>>> s1 = 'hello!'
>>> s2 = 'hello!'
>>> s1 is s2
False
```

А в этом случае уже не будут, потому что строки содержат символ восклицательного знака. Интернироваться могут только строки, состоящие из букв ASCII, цифр или нижнего подчеркивания.

## Сравнение производительности

Посмотрим, как интернирование помогает сэкономить время:

```jupyterpython
In [1]: s1 = 'hello'
In [2]: %time s2 = 'hello'
CPU times: user 2 µs, sys: 0 ns, total: 2 µs
Wall time: 3.58 µs

In [3]: s1 = 'hello!'
In [4]: %time s2 = 'hello!'
CPU times: user 2 µs, sys: 0 ns, total: 2 µs
Wall time: 4.05 µs
```

Разница в скорости создания строки получилась в районе 500 нс.

## Ссылки
- [WTFPython. Strings can be tricky sometimes](https://github.com/satwikkansal/wtfpython#-strings-can-be-tricky-sometimes)
