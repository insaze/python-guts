---
tags:
  - Асинхронность
  - Файлы
  - asyncio
  - aiofiles
---

# Библиотека aiofiles

Работа с файлами является блокирующей, поэтому в асинхронных приложениях использование стандартных функций по взаимодействию с файловой системой может привести к потере производительности. 

Для этого была создана библиотека [aiofiles](https://github.com/Tinche/aiofiles), которая позволяет сделать все эти операции неблокирующими и поддерживающими конструкции `async`/`await`.

## Установка

```shell
$ pip install aiofiles
```

## Использование

Открытие файла происходит с помощью `aiofiles.open()`. Далее мы можем работать с возвращаемым объектом файла с помощью корутин:

- `read`, `readline`, `readlines`, `readable`
- `write`, `writelines`, `writable`
- `truncate`
- `close`
- `seek`, `tell`
- `fileno`
- `flush`
- `isatty`

```python
import aiofiles
import asyncio


async def main():
    async with aiofiles.open("hello.txt", "w") as file:
        await file.write("Hello\nworld!")

    async with aiofiles.open("hello.txt", "r") as file:
        content = await file.read()
        print(content)
        await file.seek(0)

        async for line in file:
            print("-", line.rstrip("\n"))

        print(await file.tell())


if __name__ == '__main__':
    asyncio.run(main())
```

```
Hello
world!
- Hello
- world!
12
```
