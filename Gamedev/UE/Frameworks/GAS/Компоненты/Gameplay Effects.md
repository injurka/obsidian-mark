# Кратко

## Что такое Gameplay Effect?

**Gameplay Effect (GE)** — это основной механизм в Unreal Engine, используемый для изменения атрибутов (Attributes) и тегов (GameplayTags) на себе или на других объектах. Этот механизм позволяет создавать различные эффекты, такие как нанесение урона, лечение, наложение баффов или дебаффов, изменение статуса и многое другое. Gameplay Effect определяет, как и какие изменения будут применены к целевому объекту.

## Основные Характеристики Gameplay Effect

1. **Типы Продолжительности**:
   - **Instant**: Мгновенное изменение атрибутов. Теги не применяются.
   - **Duration**: Временное изменение атрибутов. Теги применяются и удаляются по истечении времени или при ручном удалении.
   - **Infinite**: Постоянное изменение атрибутов. Теги применяются и удаляются только при ручном удалении.

2. **Модификаторы (Modifiers)**:
   - Изменяют атрибуты через различные операции (Add, Multiply, Divide, Override).
   - Могут быть основаны на различных типах данных (Scalable Float, Attribute Based, Custom Calculation Class, Set By Caller).

3. **Теги (GameplayTags)**:
   - Используются для управления применением и активностью Gameplay Effect.
   - Могут блокировать или разрешать применение эффекта в зависимости от тегов цели.

4. **Стек (Stacking)**:
   - Позволяет накладывать несколько экземпляров Gameplay Effect на одну цель, увеличивая их эффект.

5. **Привилегии (Immunity)**:
   - Позволяет блокировать применение Gameplay Effect на основе тегов.

## Примеры Gameplay Effect

1. **Нанесение Урона**:
   - **Тип**: Instant
   - **Описание**: Мгновенно уменьшает здоровье цели на определенное значение.
   - **Пример**: Игрок стреляет из оружия, нанося 50 единиц урона противнику.

   ```cpp
   UGameplayEffect* DamageEffect = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("DamageEffect")));
   DamageEffect->DurationPolicy = EGameplayEffectDurationType::Instant;

   int32 Idx = DamageEffect->Modifiers.Num();
   DamageEffect->Modifiers.SetNum(Idx + 1);

   FGameplayModifierInfo& Info = DamageEffect->Modifiers[Idx];
   Info.ModifierMagnitude = FScalableFloat(50.0f);
   Info.ModifierOp = EGameplayModOp::Additive;
   Info.Attribute = UMyAttributeSet::GetHealthAttribute();

   Source->ApplyGameplayEffectToTarget(DamageEffect, Target, 1.0f);
   ```

2. **Лечение**:
   - **Тип**: Instant
   - **Описание**: Мгновенно увеличивает здоровье цели на определенное значение.
   - **Пример**: Игрок использует аптечку, восстанавливая 30 единиц здоровья.

   ```cpp
   UGameplayEffect* HealEffect = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("HealEffect")));
   HealEffect->DurationPolicy = EGameplayEffectDurationType::Instant;

   int32 Idx = HealEffect->Modifiers.Num();
   HealEffect->Modifiers.SetNum(Idx + 1);

   FGameplayModifierInfo& Info = HealEffect->Modifiers[Idx];
   Info.ModifierMagnitude = FScalableFloat(30.0f);
   Info.ModifierOp = EGameplayModOp::Additive;
   Info.Attribute = UMyAttributeSet::GetHealthAttribute();

   Source->ApplyGameplayEffectToTarget(HealEffect, Target, 1.0f);
   ```

3. **Бафф Скорости**:
   - **Тип**: Duration
   - **Описание**: Временно увеличивает скорость передвижения цели на определенный процент.
   - **Пример**: Игрок использует предмет, увеличивающий скорость на 50% на 10 секунд.

   ```cpp
   UGameplayEffect* SpeedBuffEffect = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("SpeedBuffEffect")));
   SpeedBuffEffect->DurationPolicy = EGameplayEffectDurationType::Duration;
   SpeedBuffEffect->DurationMagnitude = FScalableFloat(10.0f);

   int32 Idx = SpeedBuffEffect->Modifiers.Num();
   SpeedBuffEffect->Modifiers.SetNum(Idx + 1);

   FGameplayModifierInfo& Info = SpeedBuffEffect->Modifiers[Idx];
   Info.ModifierMagnitude = FScalableFloat(1.5f);
   Info.ModifierOp = EGameplayModOp::Multiply;
   Info.Attribute = UMyAttributeSet::GetMovementSpeedAttribute();

   Source->ApplyGameplayEffectToTarget(SpeedBuffEffect, Target, 1.0f);
   ```

4. **Дебафф Оглушение**:
   - **Тип**: Infinite
   - **Описание**: Постоянно блокирует действия цели до ручного удаления.
   - **Пример**: Игрок оглушает противника, блокируя его действия до конца боя.

   ```cpp
   UGameplayEffect* StunEffect = NewObject<UGameplayEffect>(GetTransientPackage(), FName(TEXT("StunEffect")));
   StunEffect->DurationPolicy = EGameplayEffectDurationType::Infinite;

   int32 Idx = StunEffect->Modifiers.Num();
   StunEffect->Modifiers.SetNum(Idx + 1);

   FGameplayModifierInfo& Info = StunEffect->Modifiers[Idx];
   Info.ModifierMagnitude = FScalableFloat(1.0f);
   Info.ModifierOp = EGameplayModOp::Override;
   Info.Attribute = UMyAttributeSet::GetStunAttribute();

   Source->ApplyGameplayEffectToTarget(StunEffect, Target, 1.0f);
   ```

# Подробно `(Доскональный перевод первоисточника)`

[`GameplayEffects`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayEffect/index.html) (`GE_`) — это сосуды, через которые способности изменяют [`Attributes`](#concepts-a) и [`GameplayTags`](#concepts-gt) на себе и других. Они могут вызывать немедленные изменения `Attribute`, такие как урон или исцеление, или применять долгосрочные баффы/дебаффы статуса, такие как повышение скорости передвижения или оглушение. Класс `UGameplayEffect` должен быть **только-данным** классом, который определяет один игровой эффект. Никакой дополнительной логики не должно быть добавлено в `GameplayEffects`. Обычно дизайнеры создают множество дочерних классов Blueprint `UGameplayEffect`.

`GameplayEffects` изменяют `Attributes` через [`Modifiers`](#concepts-ge-mods) и [`Executions` (`GameplayEffectExecutionCalculation`)](#concepts-ge-ec).

`GameplayEffects` имеют три типа длительности: `Instant`, `Duration` и `Infinite`.

Кроме того, `GameplayEffects` может добавлять/выполнять [`GameplayCues`](#concepts-gc). `Instant` `GameplayEffect` вызовет `Execute` для `GameplayCue` `GameplayTags`, тогда как `Duration` или `Infinite` `GameplayEffect` вызовет `Add` и `Remove` для `GameplayCue` `GameplayTags`.

| Тип длительности | Событие GameplayCue | Когда использовать |
| ------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Instant` | Execute | Для немедленных постоянных изменений `Attribute's` `BaseValue`. `GameplayTags` не будут применены даже на один кадр. |
| `Duration` | Добавить и удалить | Для временных изменений `Attribute's` `CurrentValue` и для применения `GameplayTags`, которые будут удалены, когда `GameplayEffect` истечет или будет удален вручную. Длительность указана в классе/Blueprint `UGameplayEffect`. |
| `Infinite` | Добавить и удалить | Для временных изменений `Attribute's` `CurrentValue` и для применения `GameplayTags`, которые будут удалены, когда `GameplayEffect` будет удален. Они никогда не исчезнут сами по себе и должны быть удалены вручную с помощью способности или `ASC`.
`Duration` и `Infinite` `GameplayEffects` имеют возможность применять `Periodic Effects`, которые применяют его `Modifiers` и `Executions` каждые `X` секунд, как определено его `Period`. `Periodic Effects` рассматриваются как `Instant` `GameplayEffects`, когда дело доходит до изменения `Attribute's` `BaseValue` и `Executing` `GameplayCues`. Они полезны для эффектов типа урона с течением времени (DOT). **Примечание:** `Periodic Effects` нельзя [предсказать](#concepts-p).

`Duration` и `Infinite` `GameplayEffects` могут быть временно отключены и включены после применения, если их `Ongoing Tag Requirements` не выполнены/соблюдены ([Gameplay Effect Tags](#concepts-ge-tags)). Отключение `GameplayEffect` удаляет эффекты его `Modifiers` и примененных `GameplayTags`, но не удаляет `GameplayEffect`. Включение `GameplayEffect` снова применяет его `Modifiers` и `GameplayTags`.

Если вам нужно вручную пересчитать `Modifiers` для `Duration` или `Infinite` `GameplayEffect` (скажем, у вас есть `MMC`, которая использует данные, которые не поступают из `Attributes`), вы можете вызвать `UAbilitySystemComponent::ActiveGameplayEffects.SetActiveGameplayEffectLevel(FActiveGameplayEffectHandle ActiveHandle, int32 NewLevel)` с тем же уровнем, который у него уже есть, используя `UAbilitySystemComponent::ActiveGameplayEffects.GetActiveGameplayEffect(ActiveHandle).Spec.GetLevel()`. `Modifiers`, которые основаны на резервных `Attributes`, автоматически обновляются при обновлении резервных `Attributes`. Ключевые функции `SetActiveGameplayEffectLevel()` для обновления `Modifiers`:

```C++
MarkItemDirty(Effect);
Effect.Spec.CalculateModifierMagnitudes();
// Закрытая функция, в противном случае мы бы вызывали эти три функции без необходимости устанавливать уровень на тот, который уже есть
UpdateAllAggregatorModMagnitudes(Effect);
```

`GameplayEffects` обычно не создаются. Когда способность или `ASC` хотят применить `GameplayEffect`, они создают [`GameplayEffectSpec`](#concepts-ge-spec) из `GameplayEffect's` `ClassDefaultObject`. Успешно примененные `GameplayEffectSpecs` затем добавляются в новую структуру с именем `FActiveGameplayEffect`, которую `ASC` отслеживает в специальной структуре-контейнере с именем `ActiveGameplayEffects`.

...