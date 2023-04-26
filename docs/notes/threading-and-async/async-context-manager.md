---
tags:
  - Асинхронность
  - Контекстные менеджеры
---

# Асинхронный контекстный менеджер

Обычный контекстный менеджер реализует два метода: `__enter__` и `__exit__`. С асинхронным все аналогично - он реализует асинхронные `__aenter__` и `__aexit__`.

## Пример

В данном примере мы создаем контекстный менеджер, который открывает файл в переданном режиме. Если такого файла не существует, то он его создает.

```python
import asyncio

import aiofiles
import aiofiles.ospath


class AsyncContextManager:
    def __init__(self, filename, mode, *args, **kwargs):
        self.__filename = filename
        self.__mode = mode
        self.__args = args
        self.__kwargs = kwargs

    async def __aenter__(self):
        if not await aiofiles.ospath.exists(self.__filename):
            async with aiofiles.open(self.__filename, "w") as new_file:
                ...

        self.__file = await aiofiles.open(self.__filename, self.__mode, *self.__args, **self.__kwargs)
        return self.__file

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.__file.close()


defaultopen = AsyncContextManager


async def main():
    async with defaultopen("no_such_file", "r") as file:
        print(await file.read())  # 

    async with defaultopen("no_such_file", "w") as file:
        await file.write("Hello world!")

    async with defaultopen("no_such_file", "r") as file:
        print(await file.read())  # Hello world!


if __name__ == '__main__':
    asyncio.run(main())
```

## Ссылки
- [Документация. Asynchronous Context Managers](https://docs.python.org/3/reference/datamodel.html?highlight=__aenter__#asynchronous-context-managers)
