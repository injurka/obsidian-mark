# Кратко

**Gameplay Ability (GA)** — это любые действия или навыки, которые может выполнять Actor в игре. Например, прыжок, бег, стрельба из оружия, пассивное блокирование атак каждые X секунд, использование зелья, открытие двери, сбор ресурсов, строительство здания и т.д. 

Gameplay Ability может быть реализована как в Blueprint, так и в C++. Однако, некоторые действия, такие как базовый ввод движения или некоторые взаимодействия с UI, не должны быть реализованы с помощью Gameplay Ability.

## Примеры Gameplay Ability:

1. **Прыжок (Jumping):**
   - **Описание:** Актёр совершает прыжок вверх.
   - **Реализация:** Может быть реализовано с использованием физики и анимации.

2. **Бег (Sprinting):**
   - **Описание:** Актёр увеличивает скорость движения.
   - **Реализация:** Может быть реализовано с изменением скорости движения и анимации.

3. **Стрельба из оружия (Shooting a gun):**
   - **Описание:** Актёр стреляет из оружия, нанося урон противнику.
   - **Реализация:** Может быть реализовано с использованием физики и эффектов частиц.

4. **Пассивное блокирование атак (Passively blocking an attack every X number of seconds):**
   - **Описание:** Актёр автоматически блокирует атаки каждые X секунд.
   - **Реализация:** Может быть реализовано с использованием таймеров и логики блокировки.

5. **Использование зелья (Using a potion):**
   - **Описание:** Актёр использует зелье, восстанавливая здоровье или ману.
   - **Реализация:** Может быть реализовано с изменением атрибутов актёра.

6. **Открытие двери (Opening a door):**
   - **Описание:** Актёр открывает дверь.
   - **Реализация:** Может быть реализовано с использованием анимации и физики.

7. **Сбор ресурсов (Collecting a resource):**
   - **Описание:** Актёр собирает ресурсы, увеличивая свои запасы.
   - **Реализация:** Может быть реализовано с изменением переменных актёра.

8. **Строительство здания (Constructing a building):**
   - **Описание:** Актёр строит здание.
   - **Реализация:** Может быть реализовано с использованием логики строительства и анимации.

## Основные характеристики Gameplay Ability:

1. **Уровень (Level):**
   - Gameplay Ability может иметь уровень, который изменяет количество изменения атрибутов или функциональность Gameplay Ability.

2. **Политика выполнения по сети (Net Execution Policy):**
   - Определяет, где и как будет выполняться Gameplay Ability (на клиенте, на сервере, с предсказанием и т.д.).

3. **Стоимость и перезарядка (Cost and Cooldown):**
   - Gameplay Ability может иметь стоимость (например, расход маны) и перезарядку (таймер, который ограничивает частоту использования способности).

4. **Ability Tasks:**
   - Используются для действий, которые происходят в течение времени, таких как ожидание события, изменения атрибутов, выбор цели или перемещение персонажа с использованием Root Motion Source.

5. **Активация и отмена (Activation and Cancellation):**
   - Gameplay Ability может быть активирована или отменена вручную или автоматически.

6. **Теги (Tags):**
   - Gameplay Ability может иметь различные теги, которые определяют её поведение, такие как теги для активации, блокировки, отмены и т.д.

## Пример реализации Gameplay Ability в Blueprint:

1. **Создайте новый Blueprint класс, наследуемый от `GameplayAbility`.**
2. **Настройте свойства Gameplay Ability:**
   - Установите `Ability Tags`, `Cost`, `Cooldown`, `Net Execution Policy` и другие параметры.
3. **Реализуйте логику активации:**
   - Переопределите функцию `ActivateAbility` и добавьте свою логику.
4. **Добавьте Ability Tasks:**
   - Используйте Ability Tasks для действий, которые должны происходить в течение времени (например, ожидание события или изменение атрибутов).
5. **Реализуйте логику отмены:**
   - Переопределите функцию `EndAbility` и добавьте логику, которая должна выполняться при отмене способности.

## Пример реализации Gameplay Ability в C++:

```cpp
#include "MyGameplayAbility.h"
#include "AbilitySystemComponent.h"

UMyGameplayAbility::UMyGameplayAbility()
{
    // Установите политику выполнения по сети
    NetExecutionPolicy = EGameplayAbilityNetExecutionPolicy::ServerOnly;

    // Установите стоимость и перезарядку
    CostGameplayEffectClass = UGameplayEffect::StaticClass();
    CooldownGameplayEffectClass = UGameplayEffect::StaticClass();
}

void UMyGameplayAbility::ActivateAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
{
    if (HasAuthorityOrPredictionKey(ActorInfo, &ActivationInfo))
    {
        // Проверьте, можно ли активировать способность
        if (!CommitAbility(Handle, ActorInfo, ActivationInfo))
        {
            EndAbility(Handle, ActorInfo, ActivationInfo, true, true);
            return;
        }

        // Добавьте свою логику активации
        // Например, примените эффекты или запустите анимацию
    }
}

void UMyGameplayAbility::EndAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, bool bReplicateEndAbility, bool bWasCancelled)
{
    // Добавьте свою логику завершения способности
    Super::EndAbility(Handle, ActorInfo, ActivationInfo, bReplicateEndAbility, bWasCancelled);
}
```

