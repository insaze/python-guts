---
tags:
  - Асинхронность
  - Декораторы
  - asyncio
---

# Создание синхронной функции из асинхронной

Иногда может возникнуть необходимость вызвать асинхронную функцию внутри синхронной. Сделать это достаточно просто с
помощью `asyncio.run`.

```python
import asyncio


def syncify(func):
    def wrapper(*args, **kwargs):
        res = func(*args, **kwargs)
        if asyncio.iscoroutine(res):
            return asyncio.run(res)
        return res

    return wrapper
```

Пример использования:

```python
import asyncio


async def async_sleep(seconds):
    print('Sleeping for', seconds, 'sec')
    await asyncio.sleep(seconds)
    print('Awake after', seconds, 'sec')
    return seconds


sleep = syncify(async_sleep)

if __name__ == '__main__':
    print(sleep(1))
    print(sleep(2))
    print(sleep(3))
```

```
Sleeping for 1 sec
Awake after 1 sec
1
Sleeping for 2 sec
Awake after 2 sec
2
Sleeping for 3 sec
Awake after 3 sec
3
```

## Связанные заметки
- [Создание асинхронной функции из синхронной](asyncify.md)
