---
tags:
  - Операции
  - Деревья
  - ast
---

# Выполнение операций под надзором ast

Рассмотрим, как с помощью встроенного модуля `ast` можно узнать порядок выполнения операций:

```python
import ast

print(ast.dump(ast.parse('1 + 2 * 3 - 4', mode='eval'), indent=2))
```

```python
Expression(
  body=BinOp(
    left=BinOp(
      left=Constant(value=1),
      op=Add(),
      right=BinOp(
        left=Constant(value=2),
        op=Mult(),
        right=Constant(value=3))),
    op=Sub(),
    right=Constant(value=4)))
```

Как можно видеть, наше выражение преобразовывается из обычной строки в дерево.

Затем интерпретатор вычисляет данное выражение с помощью поиска в глубину. Самые нижние (самые глубокие) операции вычисляются и сворачиваются в результат, который затем используется для вычисления верхних операций.

На примере `1 + 2 * 3 - 4` порядок вычислений будет таким:

- `2 * 3`
    ```python
    BinOp(
      left=Constant(value=2),
      op=Mult(),
      right=Constant(value=3))
    ```
- `1 + (2 * 3)`
    ```python
    BinOp(
      left=Constant(value=1),
      op=Add(),
      right=BinOp(...))
    ```
- `(1 + (2 * 3)) - 4`
    ```python
    BinOp(
      left=BinOp(...),
      op=Sub(),
      right=Constant(value=4))
    ```

Рассмотрим более сложный пример:

```python
X & 127 / 2 ** 3 and Y or Z << 2 ^ 9
```

```python
Expression(
  body=BoolOp(
    op=Or(),
    values=[
      BoolOp(
        op=And(),
        values=[
          BinOp(
            left=Name(id='X', ctx=Load()),
            op=BitAnd(),
            right=BinOp(
              left=Constant(value=127),
              op=Div(),
              right=BinOp(
                left=Constant(value=2),
                op=Pow(),
                right=Constant(value=3)))),
          Name(id='Y', ctx=Load())]),
      BinOp(
        left=BinOp(
          left=Name(id='Z', ctx=Load()),
          op=LShift(),
          right=Constant(value=2)),
        op=BitXor(),
        right=Constant(value=9))]))
```

Здесь уже можно видеть отличия: логические операции превращаются не в `BinOp`, а в `BoolOp`, который содержит уже список операндов. 

Спускаемся в самую глубь:

- `2 ** 3`
    ```python
    BinOp(
      left=Constant(value=2),
      op=Pow(),
      right=Constant(value=3))
    ```
- `127 / (2 ** 3)`
    ```python
    BinOp(
      left=Constant(value=127),
      op=Div(),
      right=BinOp(...))
    ```
- `X & (127 / (2 ** 3))`
    ```python
    BinOp(
      left=Name(id='X', ctx=Load()),
      op=BitAnd(),
      right=BinOp(...))
    ```
- `(X & (127 / (2 ** 3))) and Y`
    ```python
    BoolOp(
      op=And(),
      values=[
        BinOp(...),
        Name(id='Y', ctx=Load())])
    ```
- `Z << 2`
    ```python
    BinOp(
      left=Name(id='Z', ctx=Load()),
      op=LShift(),
      right=Constant(value=2))
    ```
- `(Z << 2) ^ 9`
    ```python
    BinOp(
      left=BinOp(...),
      op=BitXor(),
      right=Constant(value=9))
    ```
- `((X & (127 / (2 ** 3))) and Y) or ((Z << 2) ^ 9)`
    ```python
    BoolOp(
      op=Or(),
      values=[
        BoolOp(...),
        BinOp(...))
    ```

## Связанные заметки
- [Приоритет выполнения операций](operator-precedence.md)


## Ссылки
- [Документация. ast — Abstract Syntax Trees](https://docs.python.org/3/library/ast.html)
