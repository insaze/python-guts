---
tags:
  - decimal
  - float
---

# Работа с десятичными числами

Числа в компьютере хранятся в бинарном виде. Количество битов ограничено, поэтому в какой-то момент они округляются. Это можно видеть на следующем примере:

```python
>>> 0.1 + 0.2 == 0.3
False
>>> 0.1 + 0.2
0.30000000000000004
```

Данную проблему может решить встроенный модуль `decimal`. Ключевым компонентом этого модуля является класс `Decimal`.

## Decimal

```python
from decimal import Decimal

a = Decimal("0.1")
b = Decimal("0.2")
print(a + b) # 0.3
```

Однако проводить операции между `float` и `Decimal` нельзя, это приведет к ошибке:

```
TypeError: unsupported operand type(s) for +: 'decimal.Decimal' and 'float'
```

## Контекст

Мы можем посмотреть конфигурацию модуля `decimal` с помощью функции `getcontext()`:

```python
>>> from decimal import getcontext
>>> getcontext()
Context(prec=28, rounding=ROUND_HALF_EVEN, Emin=-999999, Emax=999999, capitals=1, clamp=0, flags=[], traps=[InvalidOperation, DivisionByZero, Overflow])
```

У контекста есть два основных параметра:

- `prec` - точность округления для арифметических операций (по умолчанию 28 знаков после запятой)
- `rounding` - режим округления

## Точность

Контекст можно изменять, устанавливая свои значения. Например, точность можно задать так:

```python
>>> from decimal import Decimal, getcontext
>>> getcontext().prec = 2
>>> Decimal("4.34") / 4
1.1
>>> getcontext().prec = 3
>>> Decimal("4.34") / 4
1.08
```

## Округление

Округление производится с помощью метода `quantize`. Первым аргументом передается объект `Decimal`, указывающий на формат округления:

```python
>>> Decimal("1.41421356").quantize(Decimal("1.000"))
Decimal("1.414")
```

Вторым аргументом в quantize можно передать режим округления.

## Режимы округления

### ROUND_CEILING

Всегда округляет вверх к бесконечности, т.е. округляет число в большую сторону если справа от разряда стоит цифра отличная от 0.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.440000").quantize(D("1.00"), decimal.ROUND_CEILING)
Decimal('0.44')
>>> D("0.4400001").quantize(D("1.00"), decimal.ROUND_CEILING)
Decimal('0.45')
>>> D("0.5500001").quantize(D("1.00"), decimal.ROUND_CEILING)
Decimal('0.56')
```

### ROUND_DOWN

Всегда округляет к нулю, т.е. округляет число в меньшую сторону вне зависимости от того, какое число стоит справа от разряда.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.448").quantize(D("1.00"), decimal.ROUND_DOWN)
Decimal('0.44')
>>> D("0.445").quantize(D("1.00"), decimal.ROUND_DOWN)
Decimal('0.44')
>>> D("0.559").quantize(D("1.00"), decimal.ROUND_DOWN)
Decimal('0.55')
```

### ROUND_FLOOR

Всегда округляет в сторону отрицательной бесконечности.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.4488").quantize(D("1.00"), decimal.ROUND_FLOOR)
Decimal('0.44')
>>> D("0.445").quantize(D("1.00"), decimal.ROUND_FLOOR)
Decimal('0.44')
>>> D("0.5595").quantize(D("1.00"), decimal.ROUND_FLOOR)
Decimal('0.55')
```

### ROUND_HALF_DOWN
Округляет от нуля, если последняя значащая цифра больше 5, в противном случае к нулю. То есть округляет число в большую сторону, если справа от разряда идет цифра 6 или выше.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.445").quantize(D("1.00"), decimal.ROUND_HALF_DOWN)
Decimal('0.44')
>>> D("0.446").quantize(D("1.00"), decimal.ROUND_HALF_DOWN)
Decimal('0.45')
>>> D("0.555").quantize(D("1.00"), decimal.ROUND_HALF_DOWN)
Decimal('0.55')
>>> D("0.556").quantize(D("1.00"), decimal.ROUND_HALF_DOWN)
Decimal('0.56')
```

### ROUND_HALF_EVEN
Как и `ROUND_HALF_DOWN`, за исключением того, что, если значение равно 5, проверяется предыдущая цифра. Нечетные значения приводят к округлению результата, а нечетные цифры не округляются.

То есть округляет число в большую сторону:

- если оно нечетное, а предыдущее перед ним 5 или выше.
- если оно четное, а предыдущее перед ним 6 или выше.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.445").quantize(D("1.00"), decimal.ROUND_HALF_EVEN)
Decimal('0.44')
>>> D("0.446").quantize(D("1.00"), decimal.ROUND_HALF_EVEN)
Decimal('0.45')
>>> D("0.555").quantize(D("1.00"), decimal.ROUND_HALF_EVEN)
Decimal('0.56')
```

### ROUND_HALF_UP

Как и `ROUND_HALF_DOWN`, за исключением того, что если последняя значащая цифра равна 5, значение округляется от нуля, т. е. округляет число в сторону повышения, если справа от разряда идет число 5 или выше.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("0.444").quantize(D("1.00"), decimal.ROUND_HALF_UP)
Decimal('0.44')
>>> D("0.445").quantize(D("1.00"), decimal.ROUND_HALF_UP)
Decimal('0.45')
>>> D("0.554").quantize(D("1.00"), decimal.ROUND_HALF_UP)
Decimal('0.55')
>>> D("0.555").quantize(D("1.00"), decimal.ROUND_HALF_UP)
Decimal('0.56')
```

### ROUND_UP

Округляет от нуля, т.е. всегда округляет в большую сторону если справа от разряда стоит цифра отличная от 0.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("10.00000").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.00')
>>> D("10.000001").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.01')
>>> D("10.001").quantize(D("1.00"), decimal.ROUND_UP)
Decimal('10.01')
>>> D("10.020001").quantize(D("1.00"), decimal.ROUND_UP)
Decimal('10.03')
```

### ROUND_05UP

Округляет от нуля, если последняя цифра округляемого разряда 0 или 5, в противном случае в сторону нуля.

```python
>>> import decimal
>>> D = decimal.Decimal
>>> D("10.00001").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.01')
>>> D("10.050101").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.06')
>>> D("10.018").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.01')
>>> D("10.068").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.06')
>>> D("10.029").quantize(D("1.00"), decimal.ROUND_05UP)
Decimal('10.02')
```

## Ссылки
- [Округление в Python](./rounding.md)
- [Модуль decimal](https://metanit.com/python/tutorial/6.4.php)
- [decimal — Decimal fixed point and floating point arithmetic](https://docs.python.org/3/library/decimal.html)
- [Режимы округления модуля decimal в Python](https://docs-python.ru/standart-library/modul-decimal-python/rezhimy-okruglenija-modulja-decimal/)
