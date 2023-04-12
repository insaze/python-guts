---
tags:
  - Асинхронность
  - Потоки
  - Декораторы
  - asyncio
---

# Создание асинхронной функции из синхронной

Иногда возникает необходимость сделать синхронную операцию неблокирующей. Сделать это можно с помощью метода `to_thread` модуля `asyncio`.

```python
import asyncio


def asyncify(func):
    async def wrapper(*args, **kwargs):
        return await asyncio.to_thread(func, *args, **kwargs)
    return wrapper
```

Пример использования:

```python
import asyncio
import time


def asyncify(func):
    async def wrapper(*args, **kwargs):
        return await asyncio.to_thread(func, *args, **kwargs)

    return wrapper


def sync_sleep():
    time.sleep(2)


async_sleep = asyncify(sync_sleep)


async def main():
    start = time.time()
    await asyncio.gather(*[async_sleep() for _ in range(5)])
    print(time.time() - start)


if __name__ == '__main__':
    asyncio.run(main())  # 2.0055196285247803
```

## Связанные заметки
- [Создание синхронной функции из асинхронной](syncify.md)
