# Кратко

## Определение Ability Tasks

`AbilityTasks` в Unreal Engine — это латентные действия, которые позволяют выполнять действия, занимающие время или требующие реагирования на делегаты, срабатывающие в будущем. В отличие от обычных `GameplayAbilities`, которые выполняются за один кадр, `AbilityTasks` могут работать в течение нескольких кадров или даже длительного периода времени.

## Предопределенные Ability Tasks

Unreal Engine поставляется с множеством предопределенных `AbilityTasks`, таких как:
- **Перемещение персонажей с использованием `RootMotionSource`**: Позволяет управлять движением персонажа с помощью анимаций, которые влияют на физику движения.
- **Проигрывание анимационных монтажей**: Позволяет запускать и контролировать проигрывание анимационных монтажей.
- **Реагирование на изменения `Attributes` и `GameplayEffects`**: Позволяет отслеживать изменения в атрибутах персонажа или эффектах и реагировать на них.
- **Реагирование на ввод игрока**: Позволяет создавать задачи, которые реагируют на действия игрока, такие как нажатие клавиш или движение мыши.

## Ограничения

Конструктор `UAbilityTask` накладывает жесткое ограничение в 1000 одновременных `AbilityTasks` на всю игру. Это важно учитывать при разработке игр, где может быть много персонажей в мире, например, в RTS-играх.

## Создание пользовательских Ability Tasks

Часто разработчики создают свои собственные `AbilityTasks` на C++. В Sample Project есть два примера пользовательских `AbilityTasks`:
1. **`PlayMontageAndWaitForEvent`**: Комбинация `PlayMontageAndWait` и `WaitGameplayEvent`. Позволяет анимационным монтажам отправлять игровые события обратно в `GameplayAbility`, который их запустил.
2. **`WaitReceiveDamage`**: Слушает получение урона `OwnerActor`. Используется, например, для удаления стака брони при получении урона.

## Структура Ability Tasks

`AbilityTasks` состоят из:
- **Статической функции для создания экземпляра `AbilityTask`**.
- **Делегатов**, которые срабатывают при завершении задачи.
- **Функции `Activate()`**, которая запускает основную работу задачи и привязывает внешние делегаты.
- **Функции `OnDestroy()`** для очистки, включая внешние делегаты, к которым была привязана задача.
- **Функций обратного вызова** для внешних делегатов.
- **Членов-переменных** и внутренних вспомогательных функций.

## Пример использования Ability Tasks в C++

Пример создания и активации `AbilityTask` в C++:
```c++
UGDAT_PlayMontageAndWaitForEvent* Task = UGDAT_PlayMontageAndWaitForEvent::PlayMontageAndWaitForEvent(this, NAME_None, MontageToPlay, FGameplayTagContainer(), 1.0f, NAME_None, false, 1.0f);
Task->OnBlendOut.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnCompleted.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnInterrupted.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->OnCancelled.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->EventReceived.AddDynamic(this, &UGDGA_FireGun::EventReceived);
Task->ReadyForActivation();
```

## Использование Ability Tasks в Blueprint

В Blueprint использование `AbilityTasks` упрощено. Для этого создаются узлы Blueprint, которые автоматически вызывают `ReadyForActivation()`. Например, узел `WaitTargetData` автоматически вызывает `BeginSpawningActor()` и `FinishSpawningActor()`, если они определены в классе `AbilityTask`.

## Отмена Ability Tasks

Чтобы вручную отменить `AbilityTask`, достаточно вызвать `EndTask()` на объекте `AbilityTask` в Blueprint или C++.

## Root Motion Source Ability Tasks

GAS предоставляет `AbilityTasks` для перемещения `Characters` с использованием `Root Motion Sources`, что полезно для эффектов типа "отброс", "сложные прыжки", "тяга" и "рывки".


# Подробно `(Доскональный перевод первоисточника)`

`GameplayAbilities` выполняются только в одном кадре. Это само по себе не обеспечивает большой гибкости. Для выполнения действий, которые происходят с течением времени или требуют ответа на делегаты, запущенные в какой-то момент времени позже, мы используем скрытые действия, называемые `AbilityTasks`.

GAS поставляется со многими `AbilityTasks` из коробки:
* Задачи для перемещения персонажей с `RootMotionSource`
* Задача для воспроизведения монтажей анимации
* Задачи для реагирования на изменения `Attribute`
* Задачи для реагирования на изменения `GameplayEffect`
* Задачи для реагирования на ввод игрока
* и многое другое

Конструктор `UAbilityTask` обеспечивает жестко запрограммированный для всей игры максимум 1000 одновременных `AbilityTasks`, работающих одновременно. Помните об этом при проектировании `GameplayAbilities` для игр, в которых одновременно могут быть сотни персонажей в мире, например, в играх RTS.

## Пользовательские задачи способностей

Часто вы будете создавать собственные пользовательские `AbilityTasks` (на C++). Пример проекта поставляется с двумя пользовательскими `AbilityTasks`:
1. `PlayMontageAndWaitForEvent` — это комбинация стандартных `PlayMontageAndWait` и `WaitGameplayEvent` `AbilityTasks`. Это позволяет анимационным монтажам отправлять игровые события из `AnimNotifies` обратно в `GameplayAbility`, который их запустил. Используйте это для запуска действий в определенные моменты во время анимационных монтажей.
1. `WaitReceiveDamage` ожидает получения урона `OwnerActor`. Пассивные стеки брони `GameplayAbility` удаляют стек брони, когда герой получает экземпляр урона.

`AbilityTasks` состоят из:
* Статической функции, которая создает новые экземпляры `AbilityTask`
* Делегатов, которые транслируются, когда `AbilityTask` завершает свою цель
* Функции `Activate()` для запуска своей основной работы, привязки к внешним делегатам и т. д.
* Функции `OnDestroy()` для очистки, включая внешние делегаты, с которыми она связана
* Функции обратного вызова для любых внешних делегатов, с которыми она связана
* Переменные-члены и любые внутренние вспомогательные функции

**Примечание:** `AbilityTasks` может объявлять только один тип выходного делегата. Все ваши выходные делегаты должны быть этого типа, независимо от того, используют они параметры или нет. Передайте значения по умолчанию для неиспользуемых параметров делегата.

`AbilityTasks` запускаются только на Клиенте или Сервере, на котором запущен владелец `GameplayAbility`; Однако `AbilityTasks` можно настроить на запуск на имитируемых клиентах, установив `bSimulatedTask = true;` в конструкторе `AbilityTask`, переопределив `virtual void InitSimulatedTask(UGameplayTasksComponent& InGameplayTasksComponent);` и установив любые переменные-члены для репликации. Это полезно только в редких ситуациях, таких как `AbilityTasks`, когда вы не хотите реплицировать каждое изменение движения, а вместо этого имитировать все движение `AbilityTask`. Все `RootMotionSource` `AbilityTasks` делают это. См. `AbilityTask_MoveToLocation.h/.cpp` в качестве примера.

`AbilityTasks` может `Tick`, если вы установите `bTickingTask = true;` в конструкторе `AbilityTask` и переопределите `virtual void TickTask(float DeltaTime);`. Это полезно, когда вам нужно плавно преобразовывать значения в кадрах. См. пример `AbilityTask_MoveToLocation.h/.cpp`.

## Использование задач способностей

Чтобы создать и активировать `AbilityTask` в C++ (из `GDGA_FireGun.cpp`):
```c++
UGDAT_PlayMontageAndWaitForEvent* Task = UGDAT_PlayMontageAndWaitForEvent::PlayMontageAndWaitForEvent(this, NAME_None, MontageToPlay, FGameplayTagContainer(), 1.0f, NAME_None, false, 1.0f);
Task->OnBlendOut.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnCompleted.AddDynamic(this, &UGDGA_FireGun::OnCompleted);
Task->OnInterrupted.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->OnCancelled.AddDynamic(this, &UGDGA_FireGun::OnCancelled);
Task->EventReceived.AddDynamic(this, &UGDGA_FireGun::EventReceived);
Task->ReadyForActivation();
```

В Blueprint мы просто используем узел Blueprint, который мы создаем для `AbilityTask`. Нам не нужно вызывать `ReadyForActivation()`. Это автоматически вызывается `Engine/Source/Editor/GameplayTasksEditor/Private/K2Node_LatentGameplayTaskCall.cpp`. `K2Node_LatentGameplayTaskCall` также автоматически вызывает `BeginSpawningActor()` и `FinishSpawningActor()`, если они существуют в вашем классе `AbilityTask` (см. `AbilityTask_WaitTargetData`). Повторим, `K2Node_LatentGameplayTaskCall` выполняет только автомагическое колдовство для Blueprint. В C++ нам нужно вручную вызывать `ReadyForActivation()`, `BeginSpawningActor()` и `FinishSpawningActor()`.

![Blueprint WaitTargetData AbilityTask](https://github.com/tranek/GASDocumentation/raw/master/Images/abilitytask.png)

Чтобы вручную отменить `AbilityTask`, просто вызовите `EndTask()` для объекта `AbilityTask` в Blueprint (называется `Async Task Proxy`) или в C++.