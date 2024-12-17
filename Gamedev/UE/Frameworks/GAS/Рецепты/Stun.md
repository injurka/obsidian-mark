## Шаги для реализации Stun:

1. **Добавление GameplayTag для Stun:**
   Сначала нам нужно добавить `GameplayTag` для Stun. Этот тег будет использоваться для идентификации состояния Stun.

   ```cpp
   /** GameplayTag для Stun */
   static const FGameplayTag StunTag = FGameplayTag::RequestGameplayTag(FName("Status.Stun"));
   ```

2. **Отмена активных GameplayAbilities:**
   Когда персонаж получает Stun, мы должны отменить все его активные `GameplayAbilities`.

   ```cpp
   /** Отмена активных GameplayAbilities при получении Stun */
   void UMyAbilitySystemComponent::OnStunTagAdded()
   {
       CancelAbilities();
   }
   ```

3. **Блокировка активации новых GameplayAbilities:**
   Мы должны предотвратить активацию новых `GameplayAbilities` во время Stun. Для этого мы добавим `StunTag` в `Activation Blocked Tags` каждой `GameplayAbility`.

   ```cpp
   /** Добавление StunTag в Activation Blocked Tags */
   FGameplayTagContainer BlockedTags;
   BlockedTags.AddTag(StunTag);
   AbilitySystemComponent->SetBlockedAbilityTags(BlockedTags);
   ```

4. **Предотвращение движения во время Stun:**
   Чтобы предотвратить движение персонажа во время Stun, мы переопределим функцию `GetMaxSpeed()` в `CharacterMovementComponent`.

   ```cpp
   /** Переопределение GetMaxSpeed для блокировки движения во время Stun */
   float UMyCharacterMovementComponent::GetMaxSpeed() const
   {
       if (CharacterOwner->GetAbilitySystemComponent()->HasMatchingGameplayTag(StunTag))
       {
           return 0.0f;
       }
       return Super::GetMaxSpeed();
   }
   ```

## Пример использования:

Предположим, у нас есть `GameplayAbility`, которая применяет Stun на цель при попадании. Мы можем использовать следующий код для применения Stun:

```cpp
/** Применение Stun на цель */
void UMyStunAbility::ActivateAbility(const FGameplayAbilitySpecHandle Handle, const FGameplayAbilityActorInfo* ActorInfo, const FGameplayAbilityActivationInfo ActivationInfo, const FGameplayEventData* TriggerEventData)
{
    if (HasAuthorityOrPredictionKey(ActorInfo, &ActivationInfo))
    {
        if (!CommitAbility(Handle, ActorInfo, ActivationInfo))
        {
            EndAbility(Handle, ActorInfo, ActivationInfo, true, true);
            return;
        }

        // Применение Stun на цель
        AActor* TargetActor = GetTargetActor(TriggerEventData);
        if (TargetActor)
        {
            UAbilitySystemComponent* TargetASC = UAbilitySystemGlobals::GetAbilitySystemComponentFromActor(TargetActor);
            if (TargetASC)
            {
                TargetASC->AddLooseGameplayTag(StunTag);
                TargetASC->OnGameplayTagAddedDelegate(StunTag).AddUObject(this, &UMyStunAbility::OnStunTagAdded);
            }
        }
    }
}
```
