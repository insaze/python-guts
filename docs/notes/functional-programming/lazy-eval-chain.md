---
tags:
  - Генераторы
  - filter
  - map
  - sum
  - Производительность
---

# Цепочка ленивых вычислений

Используя `filter`, `map` и другие генераторные функции, можно повысить читаемость кода и сохранить память путем создания цепочки ленивых вычислений:

```python
numbers = range(10)
odd_numbers = filter(lambda x: x % 2, numbers)
squared_numbers = map(lambda x: x ** 2, odd_numbers)
result = sum(squared_numbers)
print(result)
```

В данном примере мы не храним промежуточные списки для нечетных чисел и для их квадратов. Вычисления происходят в момент вызова функции `sum()`, а операции происходят поэлементно. В этом можно убедиться, добавив `print`'ы:

```python
def is_odd(number):
    print('is_odd', number)
    return number % 2


def square(number):
    print('square', number)
    return number ** 2
```

```python
numbers = range(10)
odd_numbers = filter(is_odd, numbers)
squared_numbers = map(square, odd_numbers)
result = sum(squared_numbers)
print(result)
```

```
is_odd 0
is_odd 1
square 1
is_odd 2
is_odd 3
square 3
is_odd 4
is_odd 5
square 5
is_odd 6
is_odd 7
square 7
is_odd 8
is_odd 9
square 9
165
```

Таким образом, мы не храним промежуточные списки, а все операции происходят поэлементно. Это позволяет сохранить память и повысить читаемость кода.
