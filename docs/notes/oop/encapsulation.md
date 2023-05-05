---
tags:
  - ООП
  - Модули
  - __all__
  - Name mangling
  - Инкапсуляция
  - Наследование
---

# Инкапсуляция

## Классы

### protected атрибуты

Атрибут класса с одним префиксным подчеркиванием говорит, что параметр используется только внутри класса. При этом он доступен для обращения извне. Это ограничение доступа только на уровне соглашения.

```python
class Foo:
    def __init__(self):
        self._protected = 1337


print(Foo()._protected)  # 1337
```

### private атрибуты

Атрибут класса с двумя префиксными подчеркиваниями доступен внутри класса, но недоступен извне. 

```python
class Foo:
    def __init__(self):
        self.__private = 1337
        
print(Foo().__private) # AttributeError: 'Foo' object has no attribute '__private'
```

#### Name mangling

Интерпретатор назначает таким атрибутам имя вида `_ClassName__fieldName`. Этот прием называется **name mangling**. Поэтому атрибут оказывается не таким уж недоступным:

```python
print(Foo()._Foo__private)  # 1337
```

### Наследование

Посмотрим, как ведут себя `protected` и `private` атрибуты при наследовании: 

```python
class Foo:
    def __init__(self):
        self._protected = 1
        self.__private = 2


class Bar(Foo):
    pass


foo = Foo()
print(f"{foo._protected = }")
print(f"{foo._Foo__private = }")

bar = Bar()
print(f"{bar._protected = }")
print(f"{bar._Bar__private = }")
```

```text
foo._protected = 1
foo._Foo__private = 2
bar._protected = 1
AttributeError: 'Bar' object has no attribute '_Bar__private'. Did you mean: '_Foo__private'?
```

Как мы видим, с `_protected` атрибутом все хорошо. А вот из-за **name mangling** `Bar` унаследовал от `Foo` атрибут `__private` под именем `_Foo__private`.

## Модули

Инкапсуляция в модулях работает несколько иначе

**moda.py**:

```python
_protected = 1
__private = 2
```

Обе переменные можно напрямую импортировать:

**modb.py**:

```python
from moda import _protected, __private

print(_protected) # 1
print(__private) # 2
```

Однако если импортировать с помощью звездочки, то мы получим ошибку:

```python
from moda import *

print(_protected, __private) # NameError: name '_protected' is not defined
```

Чтобы переменные стали доступны таким образом нужно в модуле добавить переменную `__all__`, которая отвечает за то, что импортирует данный модуль.

**moda.py**:

```python
_protected = 1
__private = 2

__all__ = ['_protected', '__private']
```

**modc.py**:

```python
from moda import *

print(_protected) # 1
print(__private) # 2
```

На прямой импорт это никак не повлияет. Допустим, мы добавили в `__all__` только `__private`:

**moda.py**:

```python
_protected = 1
__private = 2

__all__ = ['__private']
```

Тогда мы все еще будем иметь доступ к `_protected`, если импортировать его напрямую:

**modb.py**:

```python
from moda import _protected, __private

print(_protected) # 1
print(__private) # 2
```
