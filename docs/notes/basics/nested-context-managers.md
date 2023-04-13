---
tags:
  - Контекстные менеджеры
  - Сокращение вложенности
---

# Вложенные контекстные менеджеры

Часто можно встретить такую конструкцию:

```python
with Test(1) as t1:
    with Test(2) as t2:
        with Test(3) as t3:
            ...
```

Благо синтаксис Python позволяет уместить все это в одно выражение:

```
with_stmt:
    | 'with' '(' ','.with_item+ ','? ')' ':' block 
    | 'with' ','.with_item+ ':' [TYPE_COMMENT] block 
```

Выглядит это так:

```python
with Test(1) as t1, Test(2) as t2, Test(3) as t3:
    ...
```

```
Enter: 1
Enter: 2
Enter: 3
Exit: 3
Exit: 2
Exit: 1
```

Методы `__enter__` вызываются в порядке перечисления, методы `__exit__` - в обратном, что довольно логично.

Можно использовать такой синтаксис:

```python
with (
    Test(1) as t1,
    Test(2) as t2,
    Test(3) as t3
):
```

## Примеры

Такой синтаксис поможет навести немного красоты, особенно если внутри вложенных контекстных менеджеров есть еще какая-то логика из циклов и ветвлений, которые смещают ваш код на восток. 

### Работа с несколькими файлами

```python
with open('read.txt', 'r') as read_file:
    with open('write.txt', 'w') as write_file:
        write_file.write(read_file.read())
```

```python
with (
    open('read.txt', 'r') as read_file,
    open('write.txt', 'w') as write_file
):
    write_file.write(read_file.read())
```

### Тестирование контекстных менеджеров

```python
with assertRaises(TypeError):
    with Test(0):
        1 / '0'
```

```python
with assertRaises(TyperError), Test(0):
    1 / '0'
```

Или более читаемый вариант:

```python
with (
    assertRaises(TyperError), 
    Test(0)
):
    1 / '0'
```

## Ссылки
- [PEP 343 – The “with” Statement](https://peps.python.org/pep-0343/)
- [Документация. Грамматика синтаксиса Python](https://docs.python.org/3/reference/grammar.html)
