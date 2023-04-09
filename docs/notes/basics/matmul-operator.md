---
tags:
  - Списки
  - Массивы
  - Матрицы
  - dunder-методы
---

# Оператор матричного умножения

Мало кто знает, но в Python есть оператор `@`, предназначенный для работы с матрицами. По умолчанию он не работает со стандартными типами данных, его можно только переопределить с помощью методов `__matmul__`, `__rmatmul__` (@) и `__imatmul__` (@=).


## Демонстрация

Так оно выглядит в коде:

```python
A = Matrix([[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]])
B = Matrix([[1, 2],
            [3, 4],
            [5, 6]])
print(A @ B)
```

```
[[22, 28], [49, 64], [76, 100]]
```


## Определение матричного умножения

Воспользуемся определением из [википедии](https://ru.wikipedia.org/wiki/%D0%A3%D0%BC%D0%BD%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86), чтобы вспомнить линейную алгебру:

Пусть даны две прямоугольные матрицы $A$ и $B$ размерности $l \times m$ и $m \times n$ соответственно:

$$
A = 
\begin{bmatrix}
a_{11} & a_{12} & \dots & a_{1m} \\
a_{21} & a_{22} & \dots & a_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
a_{l1} & a_{l2} & \dots & a_{lm} \\
\end{bmatrix}
$$

$$
B = 
\begin{bmatrix}
b_{11} & b_{12} & \dots & b_{1n} \\
b_{21} & b_{22} & \dots & b_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
b_{m1} & b_{m2} & \dots & b_{mn} \\
\end{bmatrix}
$$

Тогда матрица $C$ размерностью $l \times n$:

$$
C = 
\begin{bmatrix}
c_{11} & c_{12} & \dots & c_{1n} \\
c_{21} & c_{22} & \dots & c_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
c_{l1} & c_{l2} & \dots & c_{ln} \\
\end{bmatrix}
$$

в которой

$$
c_{ij} = \sum_{r=1}^m a_{ir}b_{rj} \enspace (i=1,2,\dots l;\enspace j=1,2,\dots n)
$$

называется их произведением.

Операция умножения двух матриц выполнима только в том случае, если число столбцов в первом сомножителе равно числу строк во втором; в этом случае говорят, что матрицы согласованы. В частности, умножение всегда выполнимо, если оба сомножителя — квадратные матрицы одного и того же порядка.


## Реализация матричного умножения в Python

```python
def matmul(a, b):
    a_rows, a_cols = len(a), len(a[0])
    b_rows, b_cols = len(b), len(b[0])
    assert a_cols == b_rows

    c = [[0 for _ in range(b_cols)] for __ in range(a_rows)]
    for i in range(a_rows):
        for j in range(b_cols):
            c[i][j] = sum(a[i][r] * b[r][j] for r in range(b_rows))
    return c


if __name__ == '__main__':
    A = [[1, 2, 3],
         [4, 5, 6],
         [7, 8, 9]]
    B = [[1, 2],
         [3, 4],
         [5, 6]]
    print(matmul(A, B))
```

```
[[22, 28], [49, 64], [76, 100]]
```

## Переопределение оператора @

Создадим класс Matrix и определим у него метод `__matmul__`:

```python
class Matrix:
    def __init__(self, matrix):
        self._matrix = matrix
        self.rows = len(matrix)
        self.cols = len(matrix[0])

    def __getitem__(self, item):
        return self._matrix[item]

    def __matmul__(self, other: 'Matrix') -> 'Matrix':
        assert self.cols == other.rows
        c = [[0 for _ in range(other.cols)] for __ in range(self.rows)]
        for i in range(self.rows):
            for j in range(other.cols):
                c[i][j] = sum(self[i][r] * other[r][j] for r in range(other.rows))
        return Matrix(c)

    def __repr__(self):
        return str(self._matrix)


if __name__ == '__main__':
    A = Matrix([[1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]])
    B = Matrix([[1, 2],
                [3, 4],
                [5, 6]])
    print(A @ B)
```

```
[[22, 28], [49, 64], [76, 100]]
```

## Ссылки
- [PEP 465 – A dedicated infix operator for matrix multiplication](https://peps.python.org/pep-0465/)
