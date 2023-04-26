---
tags:
  - multiprocessing
---

# Методы Pool

## apply

* Выполняет заданную функцию с указанными аргументами.
* Возвращает результат выполнения функции для указанных аргументов.
* Является блокирующей функцией: ожидает завершения задачи перед возвращением результата.
* Может принимать несколько аргументов для функции.
* Используется, когда вам нужно выполнить одну задачу с указанными аргументами.

**Пример**

```python
from multiprocessing import Pool


def add(a, b):
    return a + b


with Pool() as pool:
    result = pool.apply(add, args=(3, 4))
print(result)  # -> 7
```

## apply_async

* Выполняет заданную функцию с указанными аргументами.
* Возвращает объект `AsyncResult`, который может быть использован для получения результата выполнения функции в дальнейшем.
* Неблокирующая функция (не ожидает завершения задачи перед возвращением).
* Задачи могут выполняться параллельно, в порядке, определяемом операционной системой и доступными ресурсами.
* Может принимать колбек-функцию для обработки результата после завершения задачи.
* Порядок результатов может быть произвольным.

**Пример**

```python
import random
import time
from multiprocessing import Pool, cpu_count


def square(number):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return number * number


def print_result(result):
    print(result)  # -> 9 16 4 1 25


if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5]

    pool = Pool(processes=cpu_count())
    for num in numbers:
        pool.apply_async(square, args=(num,), callback=print_result)

    pool.close()
    pool.join()
```

## map

* Применяет заданную функцию ко всем элементам итерируемого объекта (например, списка).
* Возвращает список результатов, соответствующий порядку исходного итерируемого объекта.
* Является блокирующей функцией: ожидает завершения всех задач перед возвращением списка результатов.
* Может принимать только один аргумент для функции.
* Используется, когда нужно обработать все элементы итерируемого объекта, передавая каждый элемент как аргумент функции.

**Пример**

```python
import random
import time
from multiprocessing import Pool


def square(number):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return number * number


with Pool() as pool:
    numbers = [1, 2, 3, 4, 5]
    results = pool.map(square, numbers)
print(results)  # -> [1, 4, 9, 16, 25]
```

## map_async

* Асинхронная версия `Pool.map()`.
* Применяет заданную функцию ко всем элементам итерируемого объекта.
* Возвращает объект `AsyncResult`, который можно использовать для получения списка результатов в дальнейшем.
* Результаты возвращаются в том же порядке, что и исходные аргументы.
* Неблокирующая функция (не ожидает завершения всех задач перед возвращением).
* Может принимать колбек-функцию для обработки результата после завершения всех задач.

**Пример**

```python
import random
import time
from multiprocessing import Pool, cpu_count


def square(number):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return number * number


def print_result(result):
    print(result)  # -> [4, 1, 16, 9, 25]


if __name__ == "__main__":
    numbers = [2, 1, 4, 3, 5]

    pool = Pool(processes=cpu_count())
    pool.map_async(square, numbers, callback=print_result)

    pool.close()
    pool.join()
```

## imap

* Применяет заданную функцию ко всем элементам итерируемого объекта.
* Возвращает итератор результатов, который можно использовать для получения результатов по мере их поступления.
* Результаты возвращаются в том же порядке, что и исходные аргументы.
* Неблокирующая функция (не ожидает завершения всех задач перед возвращением).

**Пример***

```python
import random
import time
from multiprocessing import Pool, cpu_count


def square(number):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return number * number


if __name__ == "__main__":
    numbers = [3, 2, 1, 5, 4]

    pool = Pool(processes=cpu_count())
    results = pool.imap(square, numbers)

    pool.close()
    pool.join()

    print(results)  # -> <multiprocessing.pool.IMapIterator object at 0x7f4bae29e3b0>
    for result in results:
        print(result)  # -> 9 4 1 25 16
```

## imap_unordered

* Применяет заданную функцию ко всем элементам итерируемого объекта.
* Возвращает итератор результатов, который можно использовать для получения результатов по мере их поступления.
* Результаты возвращаются в произвольном порядке (не обязательно совпадают с порядком исходных аргументов).
* Неблокирующая функция (не ожидает завершения всех задач перед возвращением).

**Пример**

```python
import random
import time
from multiprocessing import Pool, cpu_count


def square(number):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return number * number


if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5]

    pool = Pool(processes=cpu_count())
    results_imap_unordered = pool.imap_unordered(square, numbers)

    pool.close()
    pool.join()

    print(results_imap_unordered)  # -> <multiprocessing.pool.IMapUnorderedIterator object at 0x7f4bae1aa320>
    for result in results_imap_unordered:
        print(result)  # -> 25 1 16 9 4
```

## starmap

* Применяет заданную функцию ко всем элементам итерируемого объекта, распаковывая аргументы из каждого элемента.
* Ожидается, что каждый элемент итерируемого объекта является кортежем, содержащим аргументы для функции.
* Возвращает список результатов в том же порядке, что и исходные аргументы.
* Блокирующая функция (ожидает завершения всех задач перед возвращением результатов).

**Пример**

```python
import random
import time
from multiprocessing import Pool, cpu_count


def multiply(x, y):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return x * y


if __name__ == "__main__":
    arguments = [(1, 2), (3, 4), (5, 6)]
    pool = Pool(processes=cpu_count())

    result = pool.starmap(multiply, arguments)

    pool.close()
    pool.join()

    print(result)  # -> [2, 12, 30]
```

## starmap_async

* Асинхронная версия `Pool.starmap()`.
* Применяет заданную функцию ко всем элементам итерируемого объекта, распаковывая аргументы из каждого элемента.
* Ожидается, что каждый элемент итерируемого объекта является кортежем, содержащим аргументы для функции.
* Возвращает объект `AsyncResult`, который можно использовать для получения списка результатов в дальнейшем.
* Результаты возвращаются в том же порядке, что и исходные аргументы.
* Неблокирующая функция (не ожидает завершения всех задач перед возвращением).
* Может принимать колбек-функцию для обработки результата после завершения всех задач.

**Пример**

```python
import random
import time
from multiprocessing import Pool, cpu_count


def multiply(x, y):
    sleep_time = random.uniform(0.1, 1)
    time.sleep(sleep_time)
    return x * y


if __name__ == "__main__":
    arguments = [(2, 3), (3, 2), (4, 2), (5, 3)]

    pool = Pool(processes=cpu_count())
    result = pool.starmap_async(multiply, arguments)

    pool.close()
    pool.join()

    results = result.get()
    print(results)  # -> [6, 6, 8, 15]
```

## Ссылки
- [Документация. Process Pools](https://docs.python.org/3/library/multiprocessing.html?highlight=pool#module-multiprocessing.pool)
