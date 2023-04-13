---
tags:
  - Структуры данных
  - Словари
  - collections
  - defaultdict
  - __missing__
  - setdefault
---

# defaultdict

`defaultdict` - это структура данных из модуля `collections`, которая позволяет заполнять словарь значениями по умолчанию, если ключ не был найден.

`defaultdict` позволит удобно работать со словарями и избавиться от конструкций вида:

```python
data[key] = data.get(key, 0) + 1
```

и

```python
data.setdefault(key, []).append(value)
```

В качестве аргумента он принимает функцию-фабрику, которая вызывается, когда не был найден ключ. Результат этой функции станет значением по умолчанию.

## Примеры

### Словарь частот

```python
from collections import defaultdict

text = 'Мама мыла раму'
frequency = defaultdict(int)
for symbol in text.lower():
    frequency[symbol] += 1
print(*frequency.items(), sep='\n')
```

По умолчанию он заполнится нулями, так как в качестве фабрики мы указали `int`. 

```python
>>> int()
0
```

```
('м', 4)
('а', 4)
(' ', 2)
('ы', 1)
('л', 1)
('р', 1)
('у', 1)
```

Без `defaultdict` тело функции выглядело бы так:

```python
if symbol in frequency:
    frequency[symbol] += 1
else:
    frequency[symbol] = 0
```

или так:

```python
frequency[symbol] = frequency.get(symbol, 0) + 1
```

### Инвертированный словарь частот

```python
inv_frequency = defaultdict(list)
for letter, count in frequency.items():
    inv_frequency[count].append(letter)
print(*inv_frequency.items(), sep='\n')
```

Здесь в качестве фабрики мы указали `list`.

```python
>>> list()
[]
```

```
(4, ['м', 'а'])
(2, [' '])
(1, ['ы', 'л', 'р', 'у'])
```

Без `defaultdict` это выглядело бы так:

```python
if letter in inv_frequency:
    inv_frequency[count].append(letter)
else:
    inv_frequency[count] = []
```

или так:

```python
inv_frequency.setdefault(count, []).append(letter)
```

### Как работает

Под капотом просто переопределяется dunder-метод `__missing__`, который вызывается методом `__getitem__`, если не был найден ключ.

```python
class DefaultDict(dict):
    def __missing__(self, key):
        return 100


data = DefaultDict({1: 2, 3: 4})
print(data[5])
print(data.get(5))
```

```
100
None
```

## Ссылки

- [Документация. defaultdict](https://docs.python.org/3/library/collections.html#defaultdict-objects)
