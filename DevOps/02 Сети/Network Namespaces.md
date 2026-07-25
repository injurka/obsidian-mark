# Network Namespaces: Изоляция сетей

## Проблема: Битва за порты и хаос изоляции
Представьте классический сервер "до-контейнерной" эпохи: вы пытаетесь запустить три экземпляра одного и того же веб-сервера (например, для разных окружений), и все они пытаются забиндиться на 80-й порт. Возникает конфликт. Как изолировать их сетевые стеки друг от друга? Как сделать так, чтобы у каждого процесса была своя таблица маршрутизации, свои сетевые интерфейсы и свой `localhost`, не создавая при этом тяжеловесные виртуальные машины?

Решение — **Network Namespaces (netns)**. Это фича ядра Linux, которая позволяет создавать полностью изолированные сетевые стеки. Именно на этой магии работают сети в Docker и Kubernetes. Без `netns` концепция подов в K8s была бы невозможна.

## Как это работает
Сетевое пространство имен (netns) логически копирует сетевой стек. Процесс, запущенный в netns, видит только интерфейсы и маршруты, принадлежащие этому namespace. Для связи изолированных namespace с "внешним миром" (корневым пространством) используются виртуальные Ethernet-кабели — **veth pairs**.

```mermaid
graph LR
    subgraph Root Namespace [Корневой Namespace (Host)]
        eth0[eth0 (Физический)]
        br0[br0 (Bridge)]
        veth0[veth0]
        eth0 --- br0
        br0 --- veth0
    end

    subgraph Container Namespace [Container Namespace]
        veth1[veth1 / eth0 внутри]
        lo[lo]
    end

    veth0 <==> |VETH PAIR| veth1
```

## Примеры из практики

Создание и связывание namespace вручную (под капотом Docker делает именно это):

```bash
# 1. Создаем namespace
ip netns add myapp_ns

# 2. Создаем виртуальный кабель (veth pair)
ip link add veth_host type veth peer name veth_app

# 3. Перемещаем один конец в namespace
ip link set veth_app netns myapp_ns

# 4. Настраиваем IP-адреса
ip addr add 10.0.0.1/24 dev veth_host
ip link set veth_host up

# Выполняем команды внутри namespace
ip netns exec myapp_ns ip addr add 10.0.0.2/24 dev veth_app
ip netns exec myapp_ns ip link set veth_app up
ip netns exec myapp_ns ip link set lo up # Не забываем поднять loopback!

# Проверяем связность
ping 10.0.0.2
ip netns exec myapp_ns ping 10.0.0.1
```

## Day 2 Operations (Эксплуатация)

1. **Troubleshooting (Где отстреливает ногу)**: Главная проблема при отладке микросервисов — утилиты типа `tcpdump` на хосте не видят трафик внутри контейнеров напрямую. Чтобы перехватить трафик контейнера, нужно "зайти" в его сетевое пространство:
   ```bash
   # Входим в netns контейнера и запускаем tcpdump
   ip netns exec <имя_netns> tcpdump -i eth0
   ```
2. **Утечки ресурсов**: Иногда процессы завершаются, но namespace остается висеть "сиротой", удерживая ресурсы и IP-адреса (в K8s это может приводить к исчерпанию пула IP в CNI). Следите за удалением: `ip netns delete <name>`.
3. **Интеграция с CNI**: В Kubernetes за управление namespace отвечают CNI-плагины (Calico, Flannel). Они автоматически создают `netns` для пода, настраивают `veth` и прописывают правила маршрутизации. Понимание базовых команд `ip netns` критически важно, когда CNI ломается и нужно дебажить сеть пода руками.
