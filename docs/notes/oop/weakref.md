---
tags:
  - Память
  - weakref
---

# Модуль `weakref`. Слабые ссылки

В Python реализован подсчет ссылок (Reference counting) в качестве системы управления памятью. При создании ссылки на объект, счетчик увеличивается на один, при удалении - уменьшается на один. Пока на объект кто-то ссылается, он не может быть удален.

Модуль `weakref` позволяет создать слабую ссылку на объект, который не увеличивает обычный счетчик ссылок, поэтому при необходимости объект может быть удален, даже при наличии слабой ссылки на него.

## Зачем это нужно

Механизм освобождения памяти с помощью ссылок может привести к некоторым утечкам, когда объект уже давно не используется, но ссылка на него еще где-то есть.

Слабые ссылки позволяют этого избежать. Они полезны в кэширующих приложениях, где не хочется, чтобы объекты жили в памяти только потому, что они есть в кэше.

Пусть у нас есть объект изображения:

```python
class Image:
    def __init__(self, pixels):
        self.pixels = pixels

    def __sizeof__(self):
        return super().__sizeof__() + self.pixels.__sizeof__()


large_image = Image([[0 for w in range(1200)] for h in range(600)])
```

Создадим обычный словарь, где изображение будет выступать в качестве значения:

```python
data = {'hello_kitty.png': large_image}
```

Теперь попробуем удалить изображение из памяти и посмотрим, что будет:

```python
data = {'hello_kitty.png': large_image}
print(large_image.__sizeof__())
del large_image
print(data)
deleted_image = data['hello_kitty.png']
print(deleted_image.__sizeof__())
```

```
5448
{'hello_kitty.png': <__main__.Image object at 0x7ff256db3e50>}
5448
```

Несмотря на то, что мы явным образом удалили объект, он все равно остался в памяти, так как на него ссылается словарь, хоть мы и не можем напрямую обратиться к `large_image`, ибо `del` лишь отвязывает имя от объекта.

Теперь сделаем то же самое, только с помощью модуля `weakref`:

```python
import weakref


data = weakref.WeakValueDictionary()
data['hello_kitty.png'] = large_image
print(list(data.items()))
del large_image
print(list(data.items()))
```

```
[('hello_kitty.png', <__main__.Image object at 0x7fd559fcfe50>)]
[]
```

Мы создали слабую ссылку на изображение в качестве значения в словаре `WeakValueDictionary`, которая не увеличила обычный счетчик ссылок, из-за чего сборщик мусора смог спокойно стереть объект из памяти.

Также существует `WeakKeyDictionary`, если наш объект будет выступать в роли ключа.

Слабую ссылку на объект можно создать с помощью `weakref.ref`:

```python
wref = weakref.ref(large_image)
print(wref)
large_image_copy = wref()
print(large_image is large_image_copy)
del large_image, large_image_copy
print(wref())
```

```
<weakref at 0x7f9f03d964d0; to 'Image' at 0x7f9eedbbbe50>
True
None
```

`wref` является вызываемым объектом. При вызове он вернет исходный объект.

## Ссылки (сильные :D)
- [Документация. `weakref`](https://docs.python.org/3/library/weakref.html)
