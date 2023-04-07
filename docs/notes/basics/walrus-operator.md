# Оператор walrus (моржовый оператор)

В версии 3.8 появился моржовый оператор, которого зачастую не хватало разработчикам, писавших на C-подобных языках. Моржовый оператор является одновременно выражением (expression) и оператором присваивания.

А назван он так потому, что символы `:=` похожи на глаза и бивни моржа :)

![Изображение моржа, загадочно смотрящего вдаль](img/walrus-operator_walrus.jpeg)

Чтобы не быть голословным, перейдем сразу к практике.

Допустим, нам нужно складывать все числа из пользовательского ввода до тех пор, пока пользователь не введет пустую строку.

```python
result = 0
while True:
    number = input()
    if number == 0:
        break
    result += int(number)
print(result)
```

С моржовым оператором это будет выглядеть более компактно:

```python
result = 0
while (number := input()) != '':
    result += int(number)
print(result)
```

Моржовый оператор позволяет избежать повторных вызовов функций или вычисления выражений. 

Еще один пример: получить список ссылок в slug-виде, длина которых будет не менее 16 символов.

С повторным вызовом функции:

```python
slug_urls = [slugify(url) for url in urls if len(slugify(url)) >= 16]
```

С дополнительными вычислениями:

```python
all_slugs = (slugify(url) for url in urls)
slug_urls = list(filter(lambda slug: len(slug) >= 16))
```

С моржовым оператором:

```python
slug_urls = [slug for url in urls if len(slug := slugify(url)) >= 16]
```

Можно применять цепочки таких операторов:

```python
>>> (x := (y := 5) + 5)
10
>>> x, y
(10, 5)
```

Важно ставить скобки, иначе вылетит SyntaxError:

```python
>>> x := 5
      ^
SyntaxError: invalid syntax
```

## Ссылки
- [PEP 572 - Assignment Expressions](https://peps.python.org/pep-0572/)