**Kubernetes** (K8s) - это платформа управления контейнерами с открытым исходным кодом, разработанная Google. Она предоставляет средства для автоматизации развертывания, масштабирования и управления контейнеризированными приложениями.

Kubernetes позволяет создавать и управлять группами контейнеров, которые объединяются в логические единицы, называемые "поды". Он обеспечивает автоматическую оркестрацию, балансировку нагрузки, масштабирование и высокую доступность приложений.

Идея состоят в том, что ваш деплой строится на базе контейнеров (например, [Docker](https://eax.me/docker/)), а также описании того, сколько этих контейнеров нужно и какие ресурсы они используют. Kubernetes на базе этого описания и доступных физических машин разворачивает контейнеры и делает все возможное для поддержания требуемой конфигурации. В том числе, он перезапускает упавшие контейнеры, перемещает их для выделения ресурсов, необходимых новым контейнерам, и так далее.

Зачем это нужно? Другими словами, используется декларативный подход — мы описываем, _что_ требуется достичь, а а Kubernetes берет на себя задачи по достижению и поддержанию этого состояния. Из преимуществ данного подхода можно отметить следующие. Система сама себя восстанавливает в случае сбоев. У вас не болит голова о том, на какой физической машине запущен тот или иной контейнер, и куда его перенести, чтобы запустить новый тяжелый сервис. Система становится повторяемой. Если у вас все развернулось и работает в тестовом окружении, вы можете с хорошей долей уверенности сказать, что оно развернется в точно такую же систему и на продакшене. Наконец, система становится версионируемой. Если что-то пошло не так, вы можете достать из Git старую конфигурацию и развернуть все в точности, как было раньше.

Kubernetes также предоставляет множество возможностей, таких как сервис-дискавери, маршрутизация трафика, хранение данных, мониторинг и многое другое, с помощью расширяемой архитектуры и плагинов.

## Основные компоненты платформы Kubernetes включают:

### Master Node

Мастер-узел является главным управляющим компонентом Kubernetes. Он отвечает за принятие решений и координацию работы кластера. Компоненты мастер-узла включают API-сервер, контроллеры управления, планировщик (scheduler) и хранилище состояния кластера (etcd).

### Worker Nodes

Рабочие узлы - это машины, на которых запускаются и работают контейнеры. Они получают команды от мастер-узла и выполняют их. Рабочие узлы включают в себя kubelet (агент Kubernetes), контейнерный рантайм (например, Docker или containerd) и kube-proxy (для управления сетевым взаимодействием).

### Pods

Поды являются наименьшей развертываемой и масштабируемой единицей в Kubernetes. Они содержат один или несколько контейнеров, которые работают вместе и разделяют сеть и хранилище. Поды создаются, управляются и масштабируются Kubernetes.

### Services

Сервисы предоставляют постоянный IP-адрес и стабильное DNS-имя для набора подов. Они позволяют установить коммуникацию между различными подами и внешними системами.

### Replication Controllers

Репликационные контроллеры отвечают за поддержание заданного количества работающих экземпляров подов. Если какие-то поды выходят из строя, репликационный контроллер автоматически создает новые экземпляры, чтобы поддерживать желаемое состояние.

### Ingress

Внешние объекты предоставляют маршрутизацию внешнего трафика к сервисам внутри кластера Kubernetes.

### ConfigMaps и Secrets

ConfigMaps позволяют хранить конфигурационные данные, которые могут быть использованы в подах, а Secrets используются для хранения и управления конфиденциальной информацией, такой как пароли и ключи.

### Kubectl

Kubectl - это клиентская утилита командной строки для взаимодействия с кластером Kubernetes. Она позволяет разработчикам и администраторам управлять и контролировать различные аспекты кластера, такие как создание, удаление и масштабирование ресурсов, просмотр логов и мониторинг состояния приложений.

Kubectl позволяет выполнять следующие задачи:

1. Создание и управление ресурсами: Вы можете создавать и управлять различными ресурсами Kubernetes, такими как поды, сервисы, репликационные контроллеры, секреты и конфигурационные карты (ConfigMaps).
2. Масштабирование приложений: С помощью Kubectl вы можете масштабировать количество экземпляров подов или других ресурсов для обеспечения нужной производительности или отказоустойчивости.
3. Управление состоянием приложений: Kubectl предоставляет возможности для управления состоянием приложений, включая развертывание новых версий, обновление конфигураций и переключение между различными версиями.
4. Отладка и мониторинг: Вы можете получать доступ к логам и метрикам приложений, а также выполнять отладку и проверку состояния ресурсов Kubernetes с помощью Kubectl.
5. Работа с конфигурацией и контекстами: Kubectl позволяет управлять конфигурационными файлами Kubernetes и устанавливать контексты для работы с различными кластерами и окружениями.

### Minikube

Minikube - это инструмент для локального развертывания единственной ноды Kubernetes. Он позволяет разработчикам запускать и тестировать приложения на своих локальных машинах без необходимости полноценного кластера Kubernetes. Minikube создает изолированную среду, в которой можно разрабатывать и отлаживать приложения в контейнерах.

### Kubelet

Kubelet - это агент, который работает на каждом рабочем узле в кластере Kubernetes. Он отвечает за управление жизненным циклом подов на рабочем узле. Kubelet следит за состоянием подов, запускает и останавливает их, проверяет их здоровье, а также обеспечивает связь с мастер-узлом для получения инструкций и обновлений.

Вместе Kubectl, Minikube и Kubelet предоставляют разработчикам и администраторам удобный способ взаимодействия с Kubernetes-кластерами и управления ими, позволяя разрабатывать, тестировать и развертывать приложения в контейнерах.