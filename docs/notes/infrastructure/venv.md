---
tags:
  - Виртуальное окружение
  - venv
  - Зависимости
---

# Виртуальное окружение

Использование одного и того же интерпретатора с набором одних и тех же зависимостей может привести к таким ошибкам как, например, несовместимость версий.

Для этого в Python есть специальный модуль venv, который позволяет работать с виртуальным окружением.

Ниже приведена шпаргалка с основными операциями и более подробное описание каждой из них.

## Шпаргалка

| Операция \ ОС | Windows                        | Linux / MacOS                 |
|---------------|--------------------------------|-------------------------------|
| Создание      | `python -m venv .venv`         | `python3 -m venv .venv`       |
| Активация     | `.\.venv\Scripts/activate.bat` | `source ./.venv/bin/activate` |
| Деактивация   | `deactivate`                   | `deactivate`                  |


## Куда устанавливаются библиотеки

Узнать место, где установлены все библиотеки можно с помощью команды `pip -V`. Она покажет, куда установлен сам `pip`.

```shell
$ pip -V
pip 23.0.1 from /home/wignorbo/.local/lib/python3.10/site-packages/pip (python 3.10)
```

"Чистый" путь можно получить из Python:

```python
>>> import site
>>> site.getusersitepackages()
'/home/wignorbo/.local/lib/python3.10/site-packages'
```

Все, что вы устанавливаете с помощью `pip install ...`, попадает именно в эту директорию. Зависимости всех ваших проектов на компьютере находятся там.

Перейдем к настройке виртуального окружения, чтобы мы могли изолировать библиотеки одного проекта от библиотек другого и избежать конфликтов, связанных с несовместимостью версий.

### Создание окружения

Модуль venv обычно поставляется вместе с интерпретатором Python на MacOS и Windows. На Ubuntu может потребоваться отдельная установка:

```shell
$ sudo apt install python3-venv
```

Чтобы проверить, что модуль установлен, напишите следующую команду:

```shell
$ python -m venv --help
usage: venv [-h] [--system-site-packages] [--symlinks | --copies] [--clear] [--upgrade] [--without-pip] [--prompt PROMPT] [--upgrade-deps] ENV_DIR [ENV_DIR ...]
```

Для создания виртуального окружения перейдите в директорию с вашим проектом и воспользуйтесь следующей командой:

```shell
$ python -m venv .venv
```

В текущей рабочей директории будет создана папка `.venv`.

### Активация окружения

Для активации воспользуйтесь следующей командой:

```shell
$ source ./.venv/bin/activate
```

или в Windows:

```shell
> .\.venv\Scripts\activate.bat
```

После активации должен появиться специальный маркер такого вида:

```shell
(.venv) $ 
```

Теперь можно устанавливать библиотеки, которые будут храниться в данном виртуальном окружении.

```shell
(.venv) $ pip install flask
```

Посмотрим, куда он установился:

```shell
(.venv) $ pip show flask
Name: Flask
Version: 2.2.3
...
Location: /home/wignorbo/.venv/lib/python3.10/site-packages
...
```

Все верно - библиотека хранится в нашем виртуальном окружении.

### Просмотр списка зависимостей

Для получения всех установленных библиотек в данном окружении можно воспользоваться следующей командой:

```shell
(.venv) $ pip freeze
click==8.1.3
Flask==2.2.3
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.2
Werkzeug==2.2.3
```

Их можно перенаправить в файл `requirements.txt`, который используется для хранения этих самых зависимостей.

```shell
(.venv) $ pip freeze > requirements.txt
(.venv) $ cat requirements.txt
click==8.1.3
Flask==2.2.3
itsdangerous==2.1.2
Jinja2==3.1.2
MarkupSafe==2.1.2
Werkzeug==2.2.3
```

### Установка библиотек из файла

Если вы клонировали чей-то проект, то все зависимости из файла `requirements.txt` можно установить всего одной командой:

```shell
(.venv) $ pip install -r requirements.txt
```

### Деактивация окружения

Чтобы выйти из виртуального окружения, достаточно ввести следующую команду:

```shell
(.venv) $ deactivate
```

После исполнения должен пропасть маркер с названием виртуального окружения – это значит, что вы успешно из него вышли.

## Ссылки
- [Документация. venv — Creation of virtual environments](https://docs.python.org/3/library/venv.html)
- [Python Tools for Managing Virtual Environments](https://dev.to/bowmanjd/python-tools-for-managing-virtual-environments-3bko#venv)
