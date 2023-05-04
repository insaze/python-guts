---
tags:
  - kafka
  - zookeeper
  - aiokafka
  - Брокеры сообщений
---

# aiokafka

Для работы с Apache Kafka в Python есть специальная библиотека [kafka-python](https://kafka-python.readthedocs.io/en/master/). Здесь же мы рассмотрим его асинхронного двойника `aiokafka`, который основан на `kafka-python`.

## Установка 

```shell
$ pip install aiokafka
```

Рассмотрим классический паттерн Producer-Consumer. Producer будет генерировать погоду, а Consumer, соответственно, ее показывать.

Для начала напишем **docker-compose.yml** со следующим содержимым:

```yaml
version: '2'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - "22181:2181"

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "29092:29092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092,PLAINTEXT_HOST://localhost:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Запуск:

```shell
$ docker-compose up -d
```

Должны увидеть, что два сервиса успешно поднялись:

```
Creating aiokafka_zookeeper_1 ... done
Creating aiokafka_kafka_1     ... done
```

Apache Kafka поднимется на порту 29092.

## Конфиг

**config.py**

```python
HOST = 'localhost'
PORT = 29092
WEATHER_TOPIC = 'weather'
```

## Producer

**producer.py**

```python
import asyncio
import json
import random
from aiokafka import AIOKafkaProducer

import config


def serializer(value):
    """
    Обмен данными происходит в байтах, поэтому мы должны
    сначала перевести наше значение JSON, а затем в байты
    """
    return json.dumps(value).encode()


async def produce():
    producer = AIOKafkaProducer(
        bootstrap_servers=f'{config.HOST}:{config.PORT}',
        value_serializer=serializer,
        compression_type="gzip"
    )
    await producer.start()
    try:
        while True:
            data = {
                "temp": random.randint(10, 20),
                "weather": random.choice(("rainy", "sunny"))
            }
            await producer.send(config.WEATHER_TOPIC, data)
            await asyncio.sleep(random.randint(1, 5))
    finally:
        await producer.stop()


if __name__ == '__main__':
    asyncio.run(produce())
```

## Consumer

**consumer.py**

```python
import asyncio
import json
from aiokafka import AIOKafkaConsumer

import config


def deserializer(serialized):
    """
    Десериализатор получаемых данных
    """
    return json.loads(serialized)


async def event_handler(value):
    """
    Обработчик события. Как только мы получаем новое сообщение,
    будет отрабатывать данная функция
    """
    print(f"Temperature: {value['temp']}, weather: {value['weather']}")


async def consume():
    consumer = AIOKafkaConsumer(
        config.WEATHER_TOPIC,
        bootstrap_servers=f'{config.HOST}:{config.PORT}',
        value_deserializer=deserializer
    )
    await consumer.start()
    try:
        async for msg in consumer:
            await event_handler(msg.value)
    finally:
        await consumer.stop()


if __name__ == '__main__':
    asyncio.run(consume())
```

## Запуск

```shell
$ python3 producer.py
```

```shell
$ python3 consumer.py
```

```text
Temperature: 18, weather: rainy
Temperature: 12, weather: sunny
Temperature: 12, weather: sunny
Temperature: 13, weather: rainy
Temperature: 13, weather: sunny
Temperature: 18, weather: sunny
Temperature: 16, weather: sunny
Temperature: 14, weather: sunny
Temperature: 16, weather: sunny
Temperature: 19, weather: rainy
Temperature: 19, weather: sunny
```

## Ссылки
- [aiokafka. Документация](https://aiokafka.readthedocs.io/en/stable/index.html)
- [Using Kafka with ZooKeeper](https://www.openlogic.com/blog/using-kafka-zookeeper#what-is-zookeeper)
