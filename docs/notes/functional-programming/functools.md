---
tags:
  - Мемоизация
  - Функции
  - Декораторы
  - functools
---

# Модуль `functools`

Данный модуль предназначен для функций высшего порядка, то есть которые работают с другими функциями или возвращают их.

## Мемоизация

Декораторы `cache`, `cached_property` и `lru_cache` позволяют кэшировать результаты функции, вызванной с заданными
аргументам.

И `cache`, и `lru_cache` используют словарь для хранения ранее посчитанных значений, однако у второго есть ограничение
по размеру кэша. **LRU - Least Recently Used** (наименее недавно использованный) - значит, что если функция уже давно не
вызывалась с такими аргументами, то происходит удаление из кэша. Ограничение задается с помощью параметра `maxsize`, по
умолчанию равным 128.

### Примеры

#### cache

```python
import functools


@functools.cache
def factorial(n):
    return n * factorial(n - 1) if n else 1


if __name__ == '__main__':
    import time

    start = time.perf_counter_ns()
    factorial(20)
    print('First call:', time.perf_counter_ns() - start, 'ns')

    start = time.perf_counter_ns()
    factorial(20)
    print('Second call:', time.perf_counter_ns() - start, 'ns')
```

```
First call: 5705 ns
Second call: 474 ns
```

#### lru_cache

```python
import functools


@functools.lru_cache(maxsize=64)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


if __name__ == '__main__':
    import time

    start = time.perf_counter_ns()
    fib(20)
    print('First call:', time.perf_counter_ns() - start, 'ns')

    start = time.perf_counter_ns()
    fib(20)
    print('Second call:', time.perf_counter_ns() - start, 'ns')
```

```
First call: 7347 ns
Second call: 493 ns
```

Можно посмотреть информацию о кэше:

```python
print(fib.cache_info())
```

```
CacheInfo(hits=19, misses=21, maxsize=64, currsize=21)
```

- `hits` - количество попаданий (ключ был в словаре)
- `misses` - количество промахов (ключа не оказалось, исполняем функцию)
- `maxsize` - максимальный размер кэша
- `currsize` - текущий размер кэша

Также можно очистить кэш с помощью `fib.cache_clear()`

```python
print(fib.cache_info())
fib.cache_clear()
print(fib.cache_info())
```

```
CacheInfo(hits=19, misses=21, maxsize=64, currsize=21)
CacheInfo(hits=0, misses=0, maxsize=64, currsize=0)
```

#### cached_property

```python
import functools


class TestClass:
    def __init__(self, n):
        self.n = n

    @functools.cached_property
    def some_property(self):
        return ', '.join(map(str, range(self.n)))


if __name__ == '__main__':
    import time

    test = TestClass(1000)

    start = time.perf_counter_ns()
    result1 = test.some_property
    print('First call:', time.perf_counter_ns() - start, 'ns')

    start = time.perf_counter_ns()
    result2 = test.some_property
    print('Second call:', time.perf_counter_ns() - start, 'ns')

    assert result1 == result2
```

```
First call: 109523 ns
Second call: 394 ns
```

Но здесь нужно быть аккуратным - результат функции кэшируется по переданному аргументу, в данном случае по объекту self.
Поэтому при изменении поля результат будет тот же:

```python
if __name__ == '__main__':
    import time

    test = TestClass(1_000)

    start = time.perf_counter_ns()
    result1 = test.some_property
    print('First call:', time.perf_counter_ns() - start, 'ns')

    test.n = 10_000  # изменяем n
    start = time.perf_counter_ns()
    result2 = test.some_property
    print('Second call:', time.perf_counter_ns() - start, 'ns')

    assert result1 != result2
```

```
First call: 107938 ns
Second call: 394 ns
AssertionError
```

## Частичное применение

**Частичное применение** - это функция, которая принимает за раз столько аргументов, сколько пожелает, но не все.

### partial

```python
import functools


def hello(name, *, title=False, exclamation=False):
    string = f'hello {name}'
    if title:
        string = string.title()
    if exclamation:
        string += '!'
    return string


if __name__ == '__main__':
    hello_title = functools.partial(hello, title=True)
    hello_exclam = functools.partial(hello, exclamation=True)
    hello_Alex = functools.partial(hello, 'Alex', title=True)
    print(hello('Alex'))
    print(hello_title('Alex'))
    print(hello_exclam('Alex'))
    print(hello_Alex())
```

```
hello Alex
Hello Alex
hello Alex!
Hello Alex
```

Еще один пример:

```python
import functools

basetwo = functools.partial(int, base=2)
basetwo.__doc__ = 'Convert base 2 string to an int.'

print(basetwo('1010100'))
print(basetwo('1111111'))
```

```
84
127
```

### partialmethod

Делает то же самое, что и `partial`, только заточен под использование в классах.

```python
import functools


class Cell:

    def __init__(self):
        self._alive = False

    @property
    def alive(self):
        return self._alive

    def set_state(self, state):
        self._alive = bool(state)

    set_alive = functools.partialmethod(set_state, True)

    set_dead = functools.partialmethod(set_state, False)


if __name__ == '__main__':
    c = Cell()
    print(c.alive)
    c.set_alive()
    print(c.alive)
```

```
False
True
```

## Свертка

Функция `reduce` позволяет свернуть итерабельный объект к единому значению, поэлементно применяя операцию к вычисленному значению.

```python
from functools import reduce

print(reduce(lambda x, y: x + y, range(100)))
```

```
4950
```

Можно задать инициализатор, выступающий в роли первого вычисленного значения:

```python
from functools import reduce

print(reduce(lambda x, y: x + y, range(100), 50))
```

```
5000
```

Удобно использовать `reduce` вкупе с модулем `operator`, предоставляющий стандартные операции `add`, `sub`, `mul` и т.п.

Данный код находит число из массива, у которого нет пары:

```python
import operator
from functools import reduce

array = (1, 2, 2, 3, 6, 1, 3)
print(reduce(operator.xor, array))
```

```
6
```

## Перегрузка

С помощью `singledispatch` и `singledispatchmethod` можно перегружать функции и методы. `single` в их названии означает, что диспетчеризация происходит по типу первого аргумента.

### singledispatch

```python
from functools import singledispatch


@singledispatch
def fun(argument, verbose=False):
    if verbose:
        print("Let me just say,", end=" ")
    print(argument)


@fun.register
def _(argument: int, verbose=False):
    if verbose:
        print("Strength in numbers, eh?", end=" ")
    print(argument)


@fun.register
def _(argument: list, verbose=False):
    if verbose:
        print('Enumerate this:')
    for i, elem in enumerate(argument):
        print(i, elem)


if __name__ == '__main__':
    fun("Hello", verbose=True)
    fun(5, verbose=True)
    fun([9, 8, 7], verbose=True)
```

```
Let me just say, Hello
Strength in numbers, eh? 5
Enumerate this:
0 9
1 8
2 7
```

### singledispatchmethod

```python
from functools import singledispatchmethod


class Negator:
    @singledispatchmethod
    def neg(self, arg):
        raise NotImplementedError("Cannot negate a")

    @neg.register
    def _(self, arg: int):
        return -arg

    @neg.register
    def _(self, arg: bool):
        return not arg


if __name__ == '__main__':
    negator = Negator()
    print(negator.neg(5))
    print(negator.neg(False))
    print(negator.neg('hello'))
```

```
-5
True
NotImplementedError: Cannot negate a
```

## Обертка

При создании декораторов можно столкнуться с такой проблемой:

```python
def dec(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper


@dec
def example():
    """docstring"""
    print('Example')


print(example.__name__)
print(example.__doc__)
```

```
wrapper
None
```

Так как декоратор возвращает новую функцию `wrapper`, то у нас не сохранятся данные декорируемой функции:

```python
WRAPPER_ASSIGNMENTS = ('__module__', '__name__', '__qualname__', '__doc__',
                       '__annotations__')
WRAPPER_UPDATES = ('__dict__',)
```

### wraps

```python
from functools import wraps


def dec(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)

    return wrapper


@dec
def example():
    """docstring"""
    print('Example')


print(example.__name__)
print(example.__doc__)
```

```
example
docstring
```

## Ссылки
- [Документация. functools](https://docs.python.org/3/library/functools.html)
