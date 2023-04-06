---
tags:
  - Логические операторы
  - Условия
  - uuid
  - slugify
---

# Скрытые свойства операторов or и and

Операторы `or` и `and` можно использовать за рамками логических выражений.

## Принцип работы

Давайте внимательно посмотрим, как они устроены.

### and

```python
def and_(a, b):
    if a:
        return b
    return False
```

- Если условие `a` ложно, возвращаем ложь.
- Если условие `a` истинно, возвращаем `b`.

### or

```python
def or_(a, b):
    if a:
        return True
    return b
```

- Если условие `a` ложно, возвращаем `b`.
- Если условие `a` истинно, возвращаем `True`.

Фишка прячется вот в этой строчке:

```python
return b
```

`b` может быть не только логической переменной, а абсолютно любой.

## Примеры

Благодаря этому скрытому свойству можно свести подобную конструкцию:

```python
number = database.get_user_number(user_id)
if number is None:
    display_number = "Не указан"
else:
    display_number = number
```

к такому виду:

```python
display_number = database.get_user_number(user_id) or "Не указан"
```

Если номер есть в базе, то возвращаем его, иначе возвращаем "Не указан". `or` часто используют, когда нужно указать значение по умолчанию, если каких-то данных не хватает.

Использований `and` в таком виде я не встречал, но в теории это может пригодиться, если условие состоит из цепочки проверок, каждая из которой требует истинности предыдущей. 

```python
permalink = url and slugify(url) or uuid4()
```

Если `url` задан, приводим его к slug-виду, иначе берем сгенерированный хэш.

```python
from uuid import uuid4
from slugify import slugify


def get_permalink(url):
    return url and slugify(url) or uuid4()


print(get_permalink(''))
print(get_permalink('Hello_WOrld!'))
```

```
8c02b5b2-7d3c-4aca-8dfd-cdb22a98cf8f
hello-world
```
