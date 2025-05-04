**Цель:** Реализовать конкретные типы игровых эффектов, которые будут использоваться в MVP, включая базовые Баффы/Дебаффы (изменение атрибутов), статусные эффекты (Скрытность, Неистовство) и специфические эффекты, связанные с механиками фракций/ландшафтов (Перегрев, Контратака, Периодический урон). Эти эффекты должны быть интегрированы с системой эффектов, боевой системой и системой влияния.

**Зачем Нужна Эта Система:**

*   **Глубина Геймплея:** Эффекты добавляют разнообразие и стратегическую глубину, изменяя правила и поведение сущностей.
*   **Уникальность Фракций/Ландшафтов:** Специфические эффекты являются ключевой частью идентичности фракций и ландшафтов Polye.
*   **Динамическое Состояние:** Эффекты создают временные изменения состояния сущностей и полей, на которые игроки должны реагировать.
*   **Интеграция Систем:** Реализация эффектов требует тесной интеграции с системами атрибутов, боя, влияния, карт и визуализации.

**Предпосылки:**

*   **Базовая Сетевая Архитектура (Фаза 1):** Сервер является авторитетом.
*   **Система Данных (Фаза 1, 3):** Определены структуры данных (`FPolyeEffectConfig`, `FDecayingInfluenceAuraConfig`, `FFieldUltConfig`, `EPolyeEffectType`, `EPolyeAttributeType` - включая типы атрибутов, которые могут модифицироваться эффектами). Созданы Data Assets (`UPolyeCardData`, `UPolyeFactionData`, `UPolyeLandscapeData`) с данными об эффектах и их параметрами. Создан Менеджер Данных (`UPolyeCardManager`, `UPolyeFactionManager`, доступный через `GameInstance`).
*   **Система Сущностей и Эффектов (Фаза 1, 2, 5, 6):** Определены базовые сущности (`ABoardEntityBase` с `CurrentHP`, `MaxHP`, `Priority`, `Faction`, `TakeDamage`, `Heal`, `OnDeath`). `UPolyeEffectManagerComponent` присоединен к `ABoardEntityBase`. Базовый класс эффекта (`UPolyeGameplayEffectBase`, наследующий от `UObject` и поддерживающий репликацию) с виртуальными функциями (`InitializeEffect`, `ApplyEffect_Implementation`, `RemoveEffect_Implementation`, `ModifyAttributeValue_Implementation`, `TickEffect_Implementation` и, возможно, триггерные функции типа `OnDamageReceived_Implementation`). `UPolyeEffectManagerComponent` может создавать экземпляры `UPolyeGameplayEffectBase` (`ApplyEffect`), удалять их (`RemoveEffectInstance`, `RemoveEffectsBy`), получать эффективные атрибуты (`GetEffectiveAttributeValue`) и, возможно, управлять их тиком. Список активных эффектов (`ActiveEffects`) реплицируется в компоненте с `OnRep_ActiveEffects`.
*   **Игровое Поле (Фаза 2):** Логическое состояние полей (`FPolyeFieldState`), система индексов.
*   **Система Затухающего Влияния (Шаг 5):** Реализован расчет влияния Аур (`AGameStateBase::CalculateAndApplyInfluence`) и применение эффектов Аур к сущностям на поле, вызывая `Entity->GetEffectManagerComponent()->ApplyEffect` с соответствующей `FPolyeEffectConfig` и `TSubclassOf<UPolyeGameplayEffectBase>` (полученными из Data Assets через Менеджер Фракций). Состояние влияния (`ActiveInfluenceState`) реплицируется, `OnRep_ActiveInfluenceState` триггерит визуал Аур на поле.
*   **Система Ландшафтов (Шаг 6):** Реализована привязка ландшафта к полю (`CurrentLandscapeDataAsset` в `FPolyeFieldState`), управление эффектом Ульты Ландшафта (`AGameStateBase::Apply/RemoveLandscapeUltEffectToField`) также вызывает `Entity->GetEffectManagerComponent()->ApplyEffect` с конфигом Ульты.
*   **Система Атак (Фаза 4, Пункт 2):** `UPolyeCombatManager::ResolveAttack` вызывает `Target->TakeDamage`. `SelectTarget` использует `GetEffectiveAttributeValue(Priority)`.

**Ключевые Компоненты и Их Роли в Этом Пункте:**

*   **Наследники `UPolyeGameplayEffectBase` (Новые C++ или BP Классы):** Для каждого конкретного типа эффекта (Бафф Атаки, Скрытность, Периодический Урон и т.д.) создается отдельный класс, наследующий от `UPolyeGameplayEffectBase`. Каждый такой класс переопределяет виртуальные функции базового класса (`ApplyEffect_Implementation`, `RemoveEffect_Implementation`, `ModifyAttributeValue_Implementation`, `TickEffect_Implementation`, `OnDamageReceived_Implementation`, и т.д.) для реализации специфической логики этого эффекта, используя данные из `EffectConfig`.
*   **`UPolyeEffectManagerComponent` (Сервер):** Управляет экземплярами этих конкретных эффектов. Вызывает их виртуальные функции в нужные моменты (при применении, удалении, тике, получении урона). Собирает модификаторы атрибутов, вызывая `ModifyAttributeValue_Implementation` на всех активных эффектах. Реплицирует список активных эффектов (`ActiveEffects`) на клиенты.
*   **`ABoardEntityBase` & Наследники (Сервер):** Имеют `UPolyeEffectManagerComponent`. Их функции (`TakeDamage`, `Heal`) должны вызывать соответствующие триггерные функции на своем компоненте эффектов (напр., `GetEffectManagerComponent()->HandleDamageReceived(...)`) или напрямую вызывать триггерные функции на активных эффектах, если компонент не имеет такой системы.
*   **Системы, Применяющие Эффекты (Сервер):**
    *   **Система Влияния (Шаг 5):** `AGameStateBase::CalculateAndApplyInfluence` (или менеджер) вызывает `Entity->GetEffectManagerComponent()->ApplyEffect` для **эффектов Аур**.
    *   **Система Ландшафтов (Шаг 6):** `AGameStateBase::ApplyLandscapeUltEffectToField` вызывает `Entity->GetEffectManagerComponent()->ApplyEffect` для **эффектов Ульты Ландшафта**.
    *   **Система Розыгрыша Карт (Фаза 3.3):** `AGameModeBase::HandlePlayerPlayCardRequest` (или менеджер) вызывает `Entity->GetEffectManagerComponent()->ApplyEffect` для **эффектов Карт Событий/Заклинаний**.
    *   **Боевая Система (Фаза 4.2):** `UPolyeCombatManager::ResolveAttack` (или другие боевые функции) может применять эффекты (напр., эффект Оглушения при критическом ударе), вызывая `Target->GetEffectManagerComponent()->ApplyEffect`.
*   **Data Assets & Manager (Фаза 1, 3):** Хранят ссылки на `TSubclassOf<UPolyeGameplayEffectBase>` и `FPolyeEffectConfig` для каждого эффекта (в `UPolyeCardData`, `UPolyeFactionData`, `UPolyeLandscapeData`). Менеджеры предоставляют доступ к этим данным и, возможно, имеют фабричные функции для получения класса эффекта по типу.
*   **Network:** Репликация `ActiveEffects` в `UPolyeEffectManagerComponent` (и их `EffectConfig`) синхронизирует состояние эффектов на клиентах. `OnRep_ActiveEffects` и Multicast RPCs используются для синхронизации визуала и звука эффектов.
*   **UI & Visuals (Клиенты):** Реагируют на `OnRep_ActiveEffects` и Multicast RPCs для отображения иконок статусов/баффов, анимаций эффектов, изменения внешнего вида сущностей.

**Шаги Реализации:**

1.  **Создание Конкретных Классов Эффектов (Наследники `UPolyeGameplayEffectBase`):**
    *   **Роль:** Реализовать уникальную логику каждого типа эффекта, определенного в дизайне MVP.
    *   **Что Хранить Здесь:** Ничего нового, специфическая логика использует данные из унаследованного `EffectConfig`.
    *   **Что Не Хранить Здесь:** Логику управления несколькими эффектами или логику игры.
    *   **Действие:** Для каждого типа эффекта MVP (Бафф Атаки, Скрытность, Неистовство, Контратака, Перегрев, Периодический Урон), создать новый C++ или Blueprint класс, наследующий от `UPolyeGameplayEffectBase`. Переопределить необходимые виртуальные функции для реализации логики:
        *   **Бафф/Дебафф Атрибута (напр., `UPolyeEffect_StatModifier`):** Переопределить `ModifyAttributeValue_Implementation`. В этой функции, если `AttributeType` соответствует атрибуту, который модифицирует этот эффект (напр., `EPolyeAttributeType::BaseAttack`), применить модификацию (добавить/вычесть значение из `EffectConfig.NumericParameters`).
        *   **Статусные Эффекты (напр., `UPolyeEffect_Status_Stealth`, `UPolyeEffect_Status_Frenzy`):** Переопределить `ApplyEffect_Implementation` для применения статуса (напр., добавить тег, изменить видимость, запустить визуальный эффект). Переопределить `RemoveEffect_Implementation` для отмены (удалить тег, вернуть видимость, остановить визуал). `ModifyAttributeValue_Implementation` может быть переопределена, если статус также меняет атрибуты (как Неистовство, увеличивающее Атаку).
        *   **Контратака "Ядовитые шипы" (`UPolyeEffect_Trigger_PoisonThorns`):** Переопределить `OnDamageReceived_Implementation` (если добавили такую виртуальную функцию в `UPolyeGameplayEffectBase` и вызываете ее из `ABoardEntityBase::TakeDamage`). В этой функции, если атакующий валиден, получить урон, который нужно вернуть (из `EffectConfig.NumericParameters`), и вызвать `Attacker->TakeDamage(CounterDamage)`.
        *   **Периодический урон (`UPolyeEffect_PeriodicDamage`):** Переопределить `TickEffect_Implementation`. В этой функции, наносить урон цели через определенные интервалы времени (интервал может быть в `EffectConfig`). Это требует, чтобы `UPolyeEffectManagerComponent` корректно вызывал `TickEffect` и управлял таймерами/интервалами для периодических эффектов.
        *   **Перегрев (`UPolyeEffect_Stacking_Overheat`):** Это сложный эффект. Он требует:
            *   Переменной для стеков (в `UPolyeGameplayEffectBase` наследнике).
            *   Логики накопления стеков (может быть в `TickEffect_Implementation`, если стеки копятся со временем, или вызываться извне - например, когда сущность находится на поле "Детей Угля").
            *   Логики эффекта "Взрыва" при достижении порога стеков (проверять количество стеков в `TickEffect_Implementation` или функции, добавляющей стек; при достижении порога, нанести урон, удалить все стеки, возможно, удалить сам эффект).
            *   Переопределить `ApplyEffect_Implementation` (инициализация стеков, возможно, запуск таймера).
            *   Переопределить `RemoveEffect_Implementation` (очистка таймера, если есть).
    *   **Обоснование Реализации:** Наследование позволяет каждому эффекту иметь свою уникальную логику, используя общий интерфейс `UPolyeGameplayEffectBase`. Логика выполняется на сервере. `EffectConfig` делает эффект настраиваемым из Data Assets.
    *   **Outcome:** Созданы конкретные C++ или Blueprint классы для ключевых эффектов MVP, реализующие их специфическое поведение.

    **Реализация (Примеры):**

    *   **`UPolyeEffect_StatModifier` (Бафф/Дебафф Атрибута):**
        ```cpp
        // Effects/PolyeEffect_StatModifier.h (Новый файл)
        #pragma once
        #include "CoreMinimal.h"
        #include "Effects/PolyeGameplayEffectBase.h"
        #include "PolyeEffect_StatModifier.generated.h"

        UCLASS()
        class POLYE_API UPolyeEffect_StatModifier : public UPolyeGameplayEffectBase
        {
             GENERATED_BODY()
        public:
             // Переопределяем модификацию атрибута
             virtual float ModifyAttributeValue_Implementation(EPolyeAttributeType AttributeType, float CurrentValue) const override;
        };
        ```
        ```cpp
        // Effects/PolyeEffect_StatModifier.cpp
        #include "Effects/PolyeEffect_StatModifier.h"
        #include "Board/BoardEntityBase.h"

        float UPolyeEffect_StatModifier::ModifyAttributeValue_Implementation(EPolyeAttributeType AttributeType, float CurrentValue) const
        {
             // Предполагаем, что в EffectConfig.NumericParameters хранится "AttributeTypeToModify" (FName)
             // и "ModifierValue" (float).
             // Напр., ModifierValue может быть +20 для бонуса Атаки или -10 для дебаффа HP.

             FName AttributeToModifyName;
             // TODO: Нужен способ получить FName атрибута по его EPolyeAttributeType.
             //       Или хранить EPolyeAttributeType прямо в FPolyeEffectConfig или EffectConfig.NumericParameters.
             //       Простой вариант: хранить FName атрибута в конфиге.
             FName ConfiguredAttributeName = EffectConfig.NumericParameters.FindRef(FName("AttributeToModifyName")); // Ищем имя атрибута для модификации

             // TODO: Сравнить AttributeType с нужным атрибутом, используя EPolyeAttributeType
             // if (AttributeType == EPolyeAttributeType::BaseAttack && ConfiguredAttributeName == FName("BaseAttack")) // Или если FPolyeEffectConfig хранит EPolyeAttributeType
             // { ... }

             // MVP: Если в EffectConfig есть параметр "ModifierValue" и "AttributeToModifyName", применяем его
             if (EffectConfig.NumericParameters.Contains(FName("ModifierValue")) && !ConfiguredAttributeName.IsNone())
             {
                  // TODO: Сравнить входящий AttributeType с тем, что указан в конфиге для модификации.
                  //       Нужен надежный маппинг между FName и EPolyeAttributeType.
                  //       Напр., UPolyeDataTypes::GetAttributeTypeFromName(ConfiguredAttributeName) == AttributeType
                  bool bIsTargetAttribute = false;
                  if (AttributeType == EPolyeAttributeType::BaseAttack && ConfiguredAttributeName == FName("BaseAttack")) bIsTargetAttribute = true;
                  if (AttributeType == EPolyeAttributeType::MaxHP && ConfiguredAttributeName == FName("MaxHP")) bIsTargetAttribute = true;
                  // TODO: Добавить все атрибуты, которые может модифицировать этот эффект

                  if (bIsTargetAttribute)
                  {
                       float ModifierValue = EffectConfig.NumericParameters.FindRef(FName("ModifierValue"));
                       // TODO: Определить тип модификации (добавка, множитель).
                       //       Напр., если в EffectConfig есть параметр "ModificationType" (Enum).
                       //       Если добавка: return CurrentValue + ModifierValue;
                       //       Если множитель (для процентов): return CurrentValue * ModifierValue;

                       // MVP: Применяем как добавку
                       return CurrentValue + ModifierValue;
                  }
             }

             return CurrentValue; // Не модифицируем этот атрибут
        }
        ```

    *   **`UPolyeEffect_Status_Stealth` (Скрытность):**
        ```cpp
        // Effects/PolyeEffect_Status_Stealth.h (Новый файл)
        #pragma once
        #include "CoreMinimal.h"
        #include "Effects/PolyeGameplayEffectBase.h"
        #include "PolyeEffect_Status_Stealth.generated.h"

        UCLASS()
        class POLYE_API UPolyeEffect_Status_Stealth : public UPolyeGameplayEffectBase
        {
             GENERATED_BODY()
        public:
             // Переопределяем Apply/Remove для визуального эффекта и, возможно, тега статуса
             virtual void ApplyEffect_Implementation(ABoardEntityBase* Target) override;
             virtual void RemoveEffect_Implementation(ABoardEntityBase* Target) override;

             // Переопределяем модификацию Приоритета (делаем его очень низким для врагов)
             virtual float ModifyAttributeValue_Implementation(EPolyeAttributeType AttributeType, float CurrentValue) const override;

             // TODO: Если нужна триггерная логика (напр., Скрытность спадает при атаке)
             // virtual void OnAttackMade_Implementation(ABoardEntityBase* Target) override; // Нужна такая виртуальная функция в базе и вызов в CombatManager
        };
        ```
        ```cpp
        // Effects/PolyeEffect_Status_Stealth.cpp
        #include "Effects/PolyeEffect_Status_Stealth.h"
        #include "Board/BoardEntityBase.h"
        // TODO: Включить UPolyeEffectManagerComponent.h
        // TODO: Включить UPolyePlayerStateBase.h

        // SERVER ONLY: Применение эффекта
        void UPolyeEffect_Status_Stealth::ApplyEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::ApplyEffect_Implementation(Target); // Вызываем базовую реализацию (возможно, для Multicast визуала)
             // TODO: Добавить логику применения статуса:
             //       - Добавить тег статуса к сущности (если есть система тегов)
             //       - Запустить клиентский визуальный эффект "Скрытность" (через Multicast RPC или BP событие на сущности)
             UE_LOG(LogTemp, Log, TEXT("Applying Stealth effect to %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // SERVER ONLY: Удаление эффекта
        void UPolyeEffect_Status_Stealth::RemoveEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::RemoveEffect_Implementation(Target); // Вызываем базовую реализацию
             // TODO: Удалить логику применения статуса:
             //       - Удалить тег статуса
             //       - Остановить клиентский визуальный эффект "Скрытность"
             UE_LOG(LogTemp, Log, TEXT("Removing Stealth effect from %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // КЛИЕНТ/СЕРВЕР: Модификация атрибута
        float UPolyeEffect_Status_Stealth::ModifyAttributeValue_Implementation(EPolyeAttributeType AttributeType, float CurrentValue) const
        {
             // Если модифицируется Приоритет
             if (AttributeType == EPolyeAttributeType::Priority)
             {
                  // TODO: Скрытность делает сущность невидимой для врагов при выборе цели.
                  //       Это можно реализовать, устанавливая Приоритет в ОЧЕНЬ низкое значение (напр., -1000)
                  //       для ВРАЖЕСКИХ атакующих при расчете их GetEffectiveAttributeValue.
                  //       Но ModifyAttributeValue_Implementation не знает, КТО запрашивает Приоритет (атакующий).
                  //       Лучше: Логика выбора цели (SelectTarget) должна явно проверять статус "Скрытность"
                  //       у потенциальной цели (Target->GetEffectManagerComponent()->HasStatusEffect(EPolyeEffectType::PET_Status_Stealth))
                  //       и исключать ее из списка целей, если атакующий - враг.
                  //       ModifyAttributeValue_Implementation в этом случае не нужен.

                  // Альтернатива (если ModifyAttributeValue используется для выбора цели):
                  // return -1000.0f; // Устанавливаем очень низкий приоритет, делая цель последней для выбора
             }
             return CurrentValue; // Не модифицируем другие атрибуты
        }

        // TODO: Реализация триггерных функций, если Скрытность спадает при атаке.
        //       Нужна виртуальная функция OnAttackMade(ABoardEntityBase* Target) в базе и вызов в CombatManager::ResolveAttack.
        //       virtual void OnAttackMade_Implementation(ABoardEntityBase* Target) override { /* Удалить эффект Скрытности с себя */ }
        ```
    *   **`UPolyeEffect_Trigger_PoisonThorns` (Контратака "Ядовитые шипы"):**
        ```cpp
        // Effects/PolyeEffect_Trigger_PoisonThorns.h (Новый файл)
        #pragma once
        #include "CoreMinimal.h"
        #include "Effects/PolyeGameplayEffectBase.h"
        #include "PolyeEffect_Trigger_PoisonThorns.generated.h"

        UCLASS()
        class POLYE_API UPolyeEffect_Trigger_PoisonThorns : public UPolyeGameplayEffectBase
        {
             GENERATED_BODY()
        public:
             // TODO: Переопределяем триггерную функцию "При получении урона"
             virtual void OnDamageReceived_Implementation(ABoardEntityBase* Attacker, float DamageAmount) override; // Нужна такая виртуальная функция в базе
        };
        ```
        ```cpp
        // Effects/PolyeEffect_Trigger_PoisonThorns.cpp
        #include "Effects/PolyeEffect_Trigger_PoisonThorns.h"
        #include "Board/BoardEntityBase.h"

        // SERVER ONLY: Триггер "При получении урона"
        void UPolyeEffect_Trigger_PoisonThorns::OnDamageReceived_Implementation(ABoardEntityBase* Attacker, float DamageAmount)
        {
             // **ВАЖНО: Выполняется ТОЛЬКО на СЕРВЕРЕ.**
             // Вызывается из ABoardEntityBase::TakeDamage, когда сущность получает урон.
             if (!IsValid(Attacker) || !Attacker->IsAlive()) return; // Атакующий должен быть валиден и жив

             // Предполагаем, что в EffectConfig.NumericParameters хранится "CounterDamageAmount" (float)
             if (EffectConfig.NumericParameters.Contains(FName("CounterDamageAmount")))
             {
                  float CounterDamage = EffectConfig.NumericParameters.FindRef(FName("CounterDamageAmount"));
                  UE_LOG(LogTemp, Log, TEXT("Poison Thorns effect on %s triggers, dealing %f counter damage to attacker %s"),
                       GetOwner() ? *GetOwner()->GetName() : TEXT("NULL"), CounterDamage, *Attacker->GetName());

                  // Наносим контратакующий урон атакующему.
                  // Этот урон может быть модифицирован эффектами на атакующем.
                  Attacker->TakeDamage(CounterDamage); // Вызываем серверную функцию получения урона на атакующем

                  // TODO: Возможно, эффект Контратаки срабатывает только один раз за ход или имеет лимит.
                  //       Нужна логика управления состоянием в эффекте или компоненте.

                  // TODO: Воспроизвести визуальный/звуковой эффект контратаки на всех клиентах (Multicast RPC)
               }
        }
        ```
    *   **`UPolyeEffect_PeriodicDamage` (Периодический урон):**
        ```cpp
        // Effects/PolyeEffect_PeriodicDamage.h (Новый файл)
        #pragma once
        #include "CoreMinimal.h"
        #include "Effects/PolyeGameplayEffectBase.h"
        #include "PolyeEffect_PeriodicDamage.generated.h"

        UCLASS()
        class POLYE_API UPolyeEffect_PeriodicDamage : public UPolyeGameplayEffectBase
        {
             GENERATED_BODY()
        public:
             // Переопределяем Apply/Remove для запуска/остановки таймера или управления тиком
             virtual void ApplyEffect_Implementation(ABoardEntityBase* Target) override;
             virtual void RemoveEffect_Implementation(ABoardEntityBase* Target) override;

             // Переопределяем TickEffect для нанесения урона
             virtual void TickEffect_Implementation(ABoardEntityBase* Target, float DeltaTime) override;

             // TODO: Свойства для управления таймером/интервалом тика
             // UPROPERTY() float TimeSinceLastTick = 0.0f;
             // UPROPERTY() float TickInterval = 1.0f; // Интервал из EffectConfig
        };
        ```
        ```cpp
        // Effects/PolyeEffect_PeriodicDamage.cpp
        #include "Effects/PolyeEffect_PeriodicDamage.h"
        #include "Board/BoardEntityBase.h"
        #include "Board/EffectManagementComponent.h" // Для доступа к компоненту, который вызывает TickEffect

        // SERVER ONLY: Применение эффекта
        void UPolyeEffect_PeriodicDamage::ApplyEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::ApplyEffect_Implementation(Target);
             // TODO: Инициализация таймера или счетчика времени с последнего тика
             // TimeSinceLastTick = 0.0f;
             // TickInterval = EffectConfig.NumericParameters.FindRef(FName("TickInterval"));
             UE_LOG(LogTemp, Log, TEXT("Applying Periodic Damage effect to %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // SERVER ONLY: Удаление эффекта
        void UPolyeGameplayEffectBase::RemoveEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::RemoveEffect_Implementation(Target);
             // TODO: Очистка таймера, если он управлялся вручную
             UE_LOG(LogTemp, Log, TEXT("Removing Periodic Damage effect from %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // SERVER ONLY (или управляемый Tick): Тик эффекта
        void UPolyeEffect_PeriodicDamage::TickEffect_Implementation(ABoardEntityBase* Target, float DeltaTime)
        {
             // **ВАЖНО: Выполняется ТОЛЬКО на СЕРВЕРЕ.**
             if (!IsValid(Target) || !Target->IsAlive()) return; // Цель должна быть жива

             // TODO: Управление таймером тика. EffectManagerComponent должен вызывать эту функцию.
             // TimeSinceLastTick += DeltaTime;
             // if (TimeSinceLastTick >= TickInterval)
             // {
                  // Время пришло для нанесения урона
                  // TODO: Получить количество периодического урона из EffectConfig.NumericParameters ("DamageAmount")
                  // float DamageAmount = EffectConfig.NumericParameters.FindRef(FName("DamageAmount"));

                  // UE_LOG(LogTemp, Log, TEXT("Periodic Damage effect ticks on %s, dealing %f damage."), Target ? *Target->GetName() : TEXT("NULL"), DamageAmount);
                  // Наносим урон цели. TakeDamage обрабатывает модификаторы и смерть.
                  // Target->TakeDamage(DamageAmount);

                  // Сброс таймера
                  // TimeSinceLastTick = 0.0f;
             // }
        }
        ```
    *   **`UPolyeEffect_Stacking_Overheat` (Перегрев):** Это самый сложный. Он требует переменной для стеков, логики накопления, проверки порога и нанесения урона при пороге.
        ```cpp
        // Effects/PolyeEffect_Stacking_Overheat.h (Новый файл)
        #pragma once
        #include "CoreMinimal.h"
        #include "Effects/PolyeGameplayEffectBase.h"
        #include "PolyeEffect_Stacking_Overheat.generated.h"

        UCLASS()
        class POLYE_API UPolyeEffect_Stacking_Overheat : public UPolyeGameplayEffectBase
        {
             GENERATED_BODY()
        public:
             // Переопределяем Apply/Remove
             virtual void ApplyEffect_Implementation(ABoardEntityBase* Target) override;
             virtual void RemoveEffect_Implementation(ABoardEntityBase* Target) override;

             // Переопределяем TickEffect (если стеки копятся со временем или урон периодический)
             virtual void TickEffect_Implementation(ABoardEntityBase* Target, float DeltaTime) override;

             // TODO: Функция для добавления стеков (вызывается извне, напр., из логики поля Детей Угля)
             UFUNCTION(BlueprintCallable, Category = "Эффект|Перегрев")
             void Server_AddStack(ABoardEntityBase* Target, int32 Amount = 1);

             // --- Свойства Экземпляра (Реплицируемые, если нужно для визуала) ---
             UPROPERTY(ReplicatedUsing=OnRep_Stacks)
             int32 CurrentStacks = 0;

             // TODO: Максимальное количество стеков из EffectConfig
             // TODO: Урон при взрыве из EffectConfig

             // --- OnRep ---
             UFUNCTION()
             void OnRep_Stacks(); // Клиентская реакция на изменение стеков (обновить визуал)

        protected:
             // TODO: Функция для проверки порога и взрыва (серверная)
             void CheckThresholdAndExplode(ABoardEntityBase* Target);

        };
        ```
        ```cpp
        // Effects/PolyeEffect_Stacking_Overheat.cpp
        #include "Effects/PolyeEffect_Stacking_Overheat.h"
        #include "Board/BoardEntityBase.h"
        #include "Board/EffectManagementComponent.h"
        #include "Net/UnrealNetwork.h"

        void UPolyeEffect_Stacking_Overheat::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
        {
             Super::GetLifetimeReplicatedProps(OutLifetimeProps);
             DOREPLIFETIME(UPolyeEffect_Stacking_Overheat, CurrentStacks); // Реплицируем стеки
        }

        // SERVER ONLY: Применение эффекта
        void UPolyeEffect_Stacking_Overheat::ApplyEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::ApplyEffect_Implementation(Target);
             // TODO: Инициализация начальных стеков (обычно 1 при первом применении)
             // CurrentStacks = 1;
             // TODO: Возможно, запуск таймера периодического накопления стеков, если это так работает
             UE_LOG(LogTemp, Log, TEXT("Applying Overheat effect to %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // SERVER ONLY: Удаление эффекта
        void UPolyeEffect_Stacking_Overheat::RemoveEffect_Implementation(ABoardEntityBase* Target)
        {
             Super::RemoveEffect_Implementation(Target);
             // TODO: Очистка таймера
             UE_LOG(LogTemp, Log, TEXT("Removing Overheat effect from %s"), Target ? *Target->GetName() : TEXT("NULL"));
        }

        // SERVER ONLY (или управляемый Tick): Тик эффекта
        void UPolyeEffect_Stacking_Overheat::TickEffect_Implementation(ABoardEntityBase* Target, float DeltaTime)
        {
            // **ВАЖНО: Выполняется ТОЛЬКО на СЕРВЕРЕ.**
            // Если стеки Перегрева копятся периодически, это логика здесь.
            // TimeSinceLastTick += DeltaTime;
            // if (TimeSinceLastTick >= AccumulationInterval)
            // {
            //      Server_AddStack(Target, 1); // Добавляем 1 стек
            //      TimeSinceLastTick = 0.0f;
            // }
        }

        // SERVER ONLY: Добавление стеков
        void UPolyeEffect_Stacking_Overheat::Server_AddStack(ABoardEntityBase* Target, int32 Amount /*= 1*/)
        {
             // **ВАЖНО: Выполняется ТОЛЬКО на СЕРВЕРЕ.**
             if (!IsValid(Target) || !Target->HasAuthority() || Amount <= 0) return; // Проверяем, что вызвано на сервере и цель валидна

             CurrentStacks += Amount; // Увеличиваем стеки

             // TODO: Получить максимальное количество стеков из EffectConfig.NumericParameters ("MaxStacks")
             // int32 MaxStacks = EffectConfig.NumericParameters.FindRef(FName("MaxStacks"));

             // UE_LOG(LogTemp, Log, TEXT("Added %d Overheat stacks to %s. Total: %d/%d"), Amount, Target ? *Target->GetName() : TEXT("NULL"), CurrentStacks, MaxStacks);

             CheckThresholdAndExplode(Target); // Проверяем, достигнут ли порог

             // Изменение CurrentStacks реплицируется, вызывая OnRep_Stacks на клиентах.
        }

        // SERVER ONLY: Проверка порога и взрыва
        void UPolyeEffect_Stacking_Overheat::CheckThresholdAndExplode(ABoardEntityBase* Target)
        {
             // **ВАЖНО: Выполняется ТОЛЬКО на СЕРВЕРЕ.**
             if (!IsValid(Target) || !Target->HasAuthority()) return;

             // TODO: Получить максимальное количество стеков из EffectConfig.NumericParameters ("MaxStacks")
             // int32 MaxStacks = EffectConfig.NumericParameters.FindRef(FName("MaxStacks"));

             // Если достигнут или превышен порог стеков
             // if (CurrentStacks >= MaxStacks)
             // {
                  // TODO: Получить урон при взрыве из EffectConfig.NumericParameters ("ExplosionDamage")
                  // float ExplosionDamage = EffectConfig.NumericParameters.FindRef(FName("ExplosionDamage"));

                  // UE_LOG(LogTemp, Warning, TEXT("Overheat threshold reached (%d stacks) on %s! EXPLOSION! Dealing %f damage."), MaxStacks, Target ? *Target->GetName() : TEXT("NULL"), ExplosionDamage);

                  // Наносим урон цели (себе). TakeDamage обрабатывает модификаторы и смерть.
                  // Target->TakeDamage(ExplosionDamage);

                  // Сбрасываем стеки до нуля после взрыва
                  // CurrentStacks = 0;

                  // TODO: Возможно, удаляем сам эффект Перегрева после взрыва, или он остается и снова копится.
                  //       Если удаляем: Target->GetEffectManagerComponent()->RemoveEffectInstance(this);
                  //       Если остается: просто сбрасываем стеки.

                  // TODO: Воспроизвести визуальный/звуковой эффект взрыва на всех клиентах (Multicast RPC)
             // }
        }

        // КЛИЕНТ ONLY: Реакция на изменение стеков
        void UPolyeEffect_Stacking_Overheat::OnRep_Stacks()
        {
             // **ВАЖНО: Выполняется ТОЛЬКО на КЛИЕНТЕ.**
             UE_LOG(LogTemp, Log, TEXT("[Client] OnRep_Stacks: Overheat stacks changed to %d on %s"), CurrentStacks, GetOwner() ? *GetOwner()->GetName() : TEXT("NULL"));
             // TODO: Обновить визуальное представление стеков Перегрева на сущности (напр., индикатор, свечение, текст).
        }
        ```

2.  **Интеграция Эффектов с Системой Влияния и Боевой Системой:**
    *   **Роль:** Обеспечить, что эффекты создаются и применяются в правильные моменты игрового процесса.
    *   **Что Хранить Здесь:** Ничего. Это логика вызовов.
    *   **Действие:**
        *   **Система Влияния (Ауры):** В `AGameStateBase::CalculateAndApplyInfluence` (или менеджере), при определении эффективной Ауры для поля, получить `TSubclassOf<UPolyeGameplayEffectBase>` и `FPolyeEffectConfig` для этой Ауры из данных фракции/менеджера. Вызвать `Entity->GetEffectManagerComponent()->ApplyEffect(EffectClass, EffectConfig)` для сущностей на этом поле. (Эта логика уже намечена в Шаге 5, Пункт 3).
        *   **Система Ландшафтов (Ульты):** В `AGameStateBase::ApplyLandscapeUltEffectToField`, получить `TSubclassOf<UPolyeGameplayEffectBase>` и `FPolyeEffectConfig` для Ульты из данных ландшафта. Вызвать `Entity->GetEffectManagerComponent()->ApplyEffect(EffectClass, EffectConfig)` для сущностей на этом поле. (Эта логика уже намечена в Шаге 6, Пункт 4).
        *   **Система Розыгрыша Карт (События):** В `AGameModeBase::HandlePlayerPlayCardRequest` (или менеджере), при розыгрыше карты типа Событие, получить `TSubclassOf<UPolyeGameplayEffectBase>` и `FPolyeEffectConfig` из данных карты. Определить цели и вызвать `Entity->GetEffectManagerComponent()->ApplyEffect(EffectClass, EffectConfig)` на целях. (Эта логика уже намечена в Фазе 3.3, Пункт 3).
        *   **Боевая Система (Триггеры):** Модифицировать `ABoardEntityBase::TakeDamage` для вызова триггерной функции `OnDamageReceived` на `UPolyeGameplayEffectBase` экземплярах, если такая функция добавлена в базовый класс эффекта. Аналогично для других боевых событий, если они триггерят эффекты.
        *   **Боевая Система (Атрибуты):** Убедиться, что `UPolyeCombatManager` (для выбора цели), `ABoardEntityBase::TakeDamage`, `ABoardEntityBase::Heal` используют `GetEffectiveAttributeValue` для всех релевантных атрибутов.
    *   **Обоснование Реализации:** Эффекты не существуют сами по себе; они создаются и применяются другими системами в ответ на игровые события (активация поля, розыгрыш карты, получение урона).
    *   **Outcome:** Эффекты MVP корректно создаются и применяются к сущностям в ответ на события в системах Влияния, Ландшафтов, Карт и Боя.

    **Реализация (Модификация существующих функций):**

    *   **Добавить триггер OnDamageReceived:** В `UPolyeGameplayEffectBase.h`, добавить `virtual void OnDamageReceived_Implementation(ABoardEntityBase* Attacker, float DamageAmount) override;`. В `UPolyeGameplayEffectBase.cpp`, добавить пустую реализацию по умолчанию.
    *   В `Board/BoardEntityBase.cpp`, в функции `TakeDamage`, перед вызовом `Multicast_PlayReceiveDamageVisuals`, итерировать по `ActiveEffects` и вызвать `OnDamageReceived_Implementation` на каждом эффекте:
        ```cpp
        // BoardEntityBase.cpp (в TakeDamage)
        float ABoardEntityBase::TakeDamage(float DamageAmount, FGameplayEffectContextHandle DamageContext /* = FGameplayEffectContextHandle() */)
        {
             // ... логика расчета урона ...

             int32 DamageToApply = FMath::FloorToInt(ActualDamage);

             // **Триггер эффектов "При получении урона"**
             // Итерируем по копии массива, т.к. эффекты могут удалять себя или другие эффекты.
             TArray<TObjectPtr<UPolyeGameplayEffectBase>> EffectsToTrigger = GetEffectManagerComponent()->ActiveEffects;
             for(UPolyeGameplayEffectBase* Effect : EffectsToTrigger)
             {
                  if(IsValid(Effect) && !Effect->IsPendingKill()) // Проверяем валидность перед вызовом
                  {
                       // TODO: В DamageContext нужно передать атакующего.
                       //       Для MVP, можно передать атакующего прямо в OnDamageReceived, если он известен.
                       //       Напр., если DamageContext хранит SourceEntity.
                       //       ABoardEntityBase* Attacker = Cast<ABoardEntityBase>(DamageContext.GetEffectCauser()); // Пример, если EffectContext используется
                       //       Effect->OnDamageReceived(Attacker, ActualDamage); // Вызываем виртуальную функцию
                       // MVP: Если атакующий не передается в TakeDamage, эта триггерная логика ограничена.
                       //      Лучше: Передать атакующего в TakeDamage.
                       Effect->OnDamageReceived_Implementation(nullptr, ActualDamage); // Вызываем, передавая null для атакующего MVP
                  }
             }


             // ... вычитание HP/OverhealHP ...
             // ... Multicast_PlayReceiveDamageVisuals ...
             // ... проверка смерти ...
        }
        ```
        *   *Примечание:* Передача атакующего в `TakeDamage` и затем в `OnDamageReceived` требует изменения сигнатуры `TakeDamage`, что может повлечь за собой изменения в коде, который ее вызывает (`UPolyeCombatManager::ResolveAttack`).

3.  **Конфигурация Data Assets:**
    *   **Роль:** Связать типы эффектов, определенные в дизайне, с конкретными классами `UPolyeGameplayEffectBase` и их параметрами.
    *   **Что Хранить Здесь:** Ссылки на классы эффектов (`TSubclassOf`) и структуры параметров (`FPolyeEffectConfig`) в `UPolyeCardData`, `UPolyeFactionData`, `UPolyeLandscapeData`.
    *   **Что Не Хранить Здесь:** Логику самих эффектов.
    *   **Действие:** В редакторе, открыть Data Assets MVP фракций, ландшафтов и карт. В свойствах, которые определяют эффекты (массив `DecayingInfluenceAuras` в `UPolyeFactionData`, `LandscapeUlt` в `UPolyeLandscapeData`, массив `InstantEffects` в `UPolyeCardData`), установить:
        *   Ссылку на C++ или Blueprint класс `UPolyeGameplayEffectBase` наследника (например, `BP_Effect_HealReduction`).
        *   Заполнить `FPolyeEffectConfig`: выбрать `EffectType` (Enum), заполнить `NumericParameters` (напр., `{"ReductionAmount": 2.0}` для снижения лечения, `{"DamageAmount": 5.0, "TickInterval": 1.0}` для периодического урона, `{"AttributeToModifyName": "BaseAttack", "ModifierValue": 20.0}` для баффа атаки, `{"CounterDamageAmount": 3.0}` для контратаки, `{"MaxStacks": 3.0, "ExplosionDamage": 10.0}` для Перегрева).
    *   **Обоснование Реализации:** Data Assets позволяют гейм-дизайнерам настраивать, какой эффект срабатывает и с какими параметрами, без изменения кода.
    *   **Outcome:** Data Assets настроены для предоставления информации о ключевых эффектах MVP.

4.  **Клиентская Визуализация Эффектов:**
    *   **Роль:** Визуально отображать активные эффекты на сущностях (иконки статусов/баффов, партиклы, свечение).
    *   **Что Хранить Здесь:** Ничего нового. Это логика визуального отображения.
    *   **Действие:** Реализовать логику визуализации в `UPolyeEffectManagerComponent::OnRep_ActiveEffects` или в Blueprint наследниках `ABoardEntityBase` (или `AUnit`/`AStructure`), реагируя на `OnRep_ActiveEffects`.
    *   **Обоснование Реализации:** `OnRep_ActiveEffects` - это триггер на клиенте, который сообщает об изменении списка эффектов. Клиентский код читает этот список и использует Data Assets (через менеджер) для получения визуальных ресурсов (иконки, VFX, SFX), связанных с каждым эффектом, и отображает их.
    *   **Outcome:** Активные эффекты на сущностях визуально отображаются на клиентах.

    **Реализация (в `Board/EffectManagementComponent.cpp` и BP Сущностей):**
    *   В `UPolyeEffectManagerComponent::OnRep_ActiveEffects`, получить доступ к сущности-владельцу и вызвать функцию обновления визуала на ней:
        ```cpp
        // EffectManagementComponent.cpp (в OnRep_ActiveEffects)
        void UPolyeEffectManagerComponent::OnRep_ActiveEffects()
        {
             // ... логирование ...

              ABoardEntityBase* OwnerEntity = GetOwnerEntity();
              if (IsValid(OwnerEntity))
              {
                   // TODO: Вызвать функцию обновления визуала на владельце.
                   //       Передать ей список ActiveEffects.
                   //       OwnerEntity->UpdateVisualsBasedOnActiveEffects(ActiveEffects); // Нужна такая функция в ABoardEntityBase или его BP
                   //       Сделать UpdateVisualsBasedOnActiveEffects BlueprintImplementableEvent в ABoardEntityBase.
              }
        }
        ```
    *   В `Board/BoardEntityBase.h`, добавить:
        ```cpp
        // BoardEntityBase.h
        // TODO: Добавить функцию для обновления визуала на основе активных эффектов (вызывается из OnRep_ActiveEffects компонента)
        //       Сделать BP Implementable Event для реализации в BP_BoardEntityBase/BP_Unit/BP_Structure
        UFUNCTION(BlueprintImplementableEvent, Category = "Сущность Доски | Визуал")
        void UpdateVisualsBasedOnActiveEffects(const TArray<TObjectPtr<UPolyeGameplayEffectBase>>& CurrentEffects);
        ```
    *   В Blueprint наследниках сущностей (`BP_Unit`, `BP_Structure`): Переопределить событие `UpdateVisualsBasedOnActiveEffects`. В этом событии, итерировать по массиву `CurrentEffects`. Для каждого `UPolyeGameplayEffectBase*` в массиве:
        *   Получить его `EffectConfig` (`GetConfig()`).
        *   Определить тип эффекта (`EffectType`).
        *   Использовать Менеджер Карт/Фракций (доступный в BP через GameInstance) для получения визуальных ресурсов (иконка, VFX, SFX) для этого `EffectType`.
        *   Отобразить иконку эффекта (напр., в UMG Widget Component над головой сущности).
        *   Спавнить или управлять видимостью партикловых систем (VFX) или других визуальных индикаторов, привязанных к сущности.
        *   Сравнить текущий список с предыдущим (если его хранить), чтобы только спавнить/удалять визуал для эффектов, которые появились/исчезли.

**Ключевые Соображения и Тестирование:**

*   **Серверный Авторитет:** Логика эффектов (расчет модификаторов, триггеры, изменение состояния, управление длительностью/стеками) выполняется ТОЛЬКО на сервере. Клиенты только отображают результат.
*   **Триггерные Эффекты:** Реализация триггеров (например, "При получении урона" для Контратаки) требует либо добавления виртуальных функций в `UPolyeGameplayEffectBase` и вызова их в коде, где происходят триггерные события (`TakeDamage`, `Heal`, `ResolveAttack`, `OnDeath`), либо создания более сложной системы событий/триггеров.
*   **Периодические Эффекты:** Реализация `TickEffect` требует, чтобы `UPolyeEffectManagerComponent` имел свою систему Tick'а и управления таймерами для каждого периодического эффекта.
*   **Стекирующиеся Эффекты:** Реализация стеков (как у Перегрева) требует переменной для стеков в наследнике `UPolyeGameplayEffectBase`, логики добавления/удаления стеков, проверки порогов и, возможно, правил сброса стеков при определенных условиях.
*   **Data-Driven:** Максимально использовать `FPolyeEffectConfig` и Data Assets для настройки параметров эффектов, классов эффектов и визуальных ресурсов. Код эффекта должен быть общим, а параметры - в данных.
*   **Визуализация:** Убедиться, что клиентская визуализация эффектов (UI и 3D визуал) корректно реагирует на изменения списка `ActiveEffects` и правильно использует данные из Data Assets.
*   **Тестирование:**
    *   Тестировать каждый тип эффекта MVP отдельно.
    *   Баффы/Дебаффы: Применить эффект к сущности. Проверить, что `GetEffectiveAttributeValue` возвращает правильные модифицированные значения. Проверить, что это влияет на расчет урона/исцеления/выбор цели. Удалить эффект, убедиться, что атрибуты возвращаются к норме.
    *   Статусы: Применить эффект статуса. Проверить, что `HasStatusEffect` возвращает true. Проверить, что визуал статуса появляется. Удалить эффект, убедиться, что `HasStatusEffect` становится false и визуал исчезает.
    *   Контратака: Атаковать сущность с эффектом Контратаки. Убедиться, что атакующий получает урон.
    *   Периодический урон: Применить эффект периодического урона. Убедиться, что цель получает урон через заданные интервалы времени. Удалить эффект, убедиться, что урон прекращается.
    *   Перегрев: Применить эффект Перегрева. Убедиться, что стеки копятся (со временем или по триггеру). Убедиться, что при достижении порога происходит "взрыв" (наносится урон, стеки сбрасываются).
    *   **Сетевое Тестирование:** Убедиться, что все эффекты применяются/удаляются только на сервере, что список `ActiveEffects` реплицируется, и что клиентская визуализация правильно реагирует на эти изменения у всех сущностей, включая противника.
