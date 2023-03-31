---
tags:
  - Функции
---

# Специальные параметры функции

По умолчанию аргументы могут быть переданы в Python функцию по позиции или явно по ключу. Для читаемости и производительности имеет смысл ограничить способ передачи аргументы - передать только по позиции, по позиции и по ключу или только по ключу.

Так выглядит объявление функции:

```
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |      По позиции или по ключу   |
        |                                - Только по ключу
         -- Только по позиции
```

Все, что идет до `/`, можно передать только по позиции. Между `/` и `*` - по позиции и по ключу. Все, что после `*`, - только по ключу.

## Примеры

### По позиции или по ключу

```python
def standard_arg(arg):
    print(arg)
```

```python
standard_arg(2)
# 2

standard_arg(arg=2)
# 2
```

### Только по позиции

```python
def pos_only_arg(arg, /):
    print(arg)
```

```python
pos_only_arg(1)
# 1

pos_only_arg(arg=1)
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
# TypeError: pos_only_arg() got some positional-only arguments passed as keyword arguments: 'arg'
```

### Только по ключу

```python
def kwd_only_arg(*, arg):
    print(arg)
```

```python
kwd_only_arg(3)
# Traceback (most recent call last):
#  File "<stdin>", line 1, in <module>
# TypeError: kwd_only_arg() takes 0 positional arguments but 1 was given

kwd_only_arg(arg=3)
# 3
```

### Комбинированные варианты

```python
def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)
```

```python
combined_example(1, 2, 3)
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: combined_example() takes 2 positional arguments but 3 were given

combined_example(1, 2, kwd_only=3)
# 1 2 3

combined_example(1, standard=2, kwd_only=3)
# 1 2 3

combined_example(pos_only=1, standard=2, kwd_only=3)
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: combined_example() got some positional-only arguments passed as keyword arguments: 'pos_only'
```

#### Нюанс использования позиционных аргументов и `**kwargs`

```python
def foo(name, **kwargs):
    return 'name' in kwargs
```

Мы не сможем вызвать эту функцию так, чтобы она вернула True, потому что параметр `name` будет привязан к первой позиции.

```python
foo(1, **{'name': 2})
# Traceback (most recent call last):
#   File "<stdin>", line 1, in <module>
# TypeError: foo() got multiple values for argument 'name'
```

Однако использование `/` позволяет это исправить:

```python
def foo(name, /, **kwds):
    return 'name' in kwds
```

```python
foo(1, **{'name': 2})
# True
```

## Когда что использовать

### Только по позиции

* Нужно скрыть названия от пользователя
* Параметры не имеют значащих имен
* Если название параметра может измениться в будущем

### Только по ключу

* Порядок не имеет значения
* Явная передача по ключу будет более читаема

## Ссылки
- [Документация. Special parameters](https://docs.python.org/3/tutorial/controlflow.html#special-parameters)
