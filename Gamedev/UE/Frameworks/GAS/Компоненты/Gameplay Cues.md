# Кратко

## Что такое GameplayCues?

`GameplayCues` (GC) в Unreal Engine — это механизм, который позволяет выполнять неигровые эффекты, такие как звуковые эффекты, визуальные эффекты, вибрация камеры и другие визуальные или звуковые индикаторы, которые не влияют на игровой процесс напрямую. Эти эффекты обычно связаны с событиями в игре, такими как попадание снаряда, получение урона, использование способности и т.д.

## Основные концепции GameplayCues

1. **GameplayCue Definition**:
   - `GameplayCues` вызываются с помощью отправки соответствующего `GameplayTag` с обязательным родительским именем `GameplayCue.` и типом события (`Execute`, `Add`, или `Remove`) в `GameplayCueManager` через `ASC` (Ability System Component).
   - Пример: `GameplayCue.A.B.C` — это валидный `GameplayTag` для `GameplayCue`.

2. **GameplayCueNotifies**:
   - Существует два типа `GameplayCueNotifies`: `Static` и `Actor`.
   - **Static GameplayCueNotifies**: Операции выполняются на `ClassDefaultObject` и подходят для одноразовых эффектов, таких как попадание снаряда.
   - **Actor GameplayCueNotifies**: Создают новый экземпляр при добавлении и могут выполнять действия в течение времени, пока не будут удалены. Подходят для эффектов, которые длятся определенное время, например, для звуковых и визуальных эффектов, которые должны быть удалены после окончания действия `GameplayEffect`.

## Примеры использования GameplayCues

1. **Вызов GameplayCue из GameplayEffect**:
   - Когда `GameplayEffect` успешно применяется, он может вызвать один или несколько `GameplayCues`, указав их `GameplayTags`.
   - Пример: При попадании снаряда в персонажа, `GameplayEffect` может вызвать `GameplayCue` для воспроизведения звука попадания и визуального эффекта.

2. **Вызов GameplayCue из GameplayAbility**:
   - В `GameplayAbility` можно использовать узлы Blueprint для вызова `GameplayCues` с типом события `Execute`, `Add`, или `Remove`.
   - Пример: При использовании способности "Огненный шар", можно вызвать `GameplayCue` для воспроизведения звука запуска и визуального эффекта огненного шара.

3. **Локальные GameplayCues**:
   - В некоторых случаях `GameplayCues` можно вызывать локально, чтобы избежать репликации через сеть.
   - Пример: При попадании снаряда в цель, можно вызвать локальный `GameplayCue` на клиенте, чтобы сэкономить пропускную способность и избежать задержек.

## Пример кода для локального вызова GameplayCue

```c++
void UPAAbilitySystemComponent::ExecuteGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
    UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::Executed, GameplayCueParameters);
}
```


# Подробно `(Доскональный перевод первоисточника)`

## Определение игровых реплик

`GameplayCues` (`GC`) выполняют не связанные с игровым процессом вещи, такие как звуковые эффекты, эффекты частиц, тряска камеры и т. д. `GameplayCues` обычно реплицируются (если явно не указано `Executed`, `Added` или `Remove` локально) и прогнозируются.

Мы запускаем `GameplayCues`, отправляя соответствующий `GameplayTag` с **обязательным родительским именем `GameplayCue.`** и типом события (`Execute`, `Add` или `Remove`) в `GameplayCueManager` через `ASC`. Объекты `GameplayCueNotify` и другие `Actors`, реализующие `IGameplayCueInterface`, могут подписываться на эти события на основе `GameplayTag` `GameplayCue` (`GameplayCueTag`).

**Примечание:** Просто повторюсь, `GameplayCue` `GameplayTags` должны начинаться с родительского `GameplayTag` `GameplayCue`. Так, например, допустимый `GameplayCue` `GameplayTag` может быть `GameplayCue.A.B.C`.

Существует два класса `GameplayCueNotifies`, `Static` и `Actor`. Они реагируют на разные события, и разные типы `GameplayEffects` могут их вызывать. Переопределите соответствующее событие с помощью своей логики.

| Класс `GameplayCue` | Событие | Тип `GameplayEffect` | Описание |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`GameplayCueNotify_Static`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UGameplayCueNotify_Static/index.html) | `Execute` | `Instant` или `Periodic` | Статические `GameplayCueNotify` работают с `ClassDefaultObject` (то есть без экземпляров) и идеально подходят для одноразовых эффектов, таких как удары. |
| [`GameplayCueNotify_Actor`](https://docs.unrealengine.com/en-US/BlueprintAPI/GameplayCueNotify/index.html) | `Add` или `Remove` | `Duration` или `Infinite` | Actor `GameplayCueNotifies` порождает новый экземпляр при `Added`. Поскольку они являются экземплярами, они могут выполнять действия с течением времени, пока не будут `Removed`. Они хороши для зацикливания звуков и эффектов частиц, которые будут удалены при удалении поддерживающего `Duration` или `Infinite` `GameplayEffect` или ручного вызова remove. Они также имеют параметры для управления тем, сколько разрешено `Add` одновременно, чтобы несколько приложений одного и того же эффекта запускали звуки или частицы только один раз. |

`GameplayCueNotifies` технически может реагировать на любое из событий, но обычно мы используем их именно так.

**Примечание:** При использовании `GameplayCueNotify_Actor` установите флажок `Auto Destroy on Remove`, иначе последующие вызовы `Add`, `GameplayCueTag`, не будут работать.

При использовании `ASC` [Режим репликации](#concepts-asc-rm), отличного от `Full`, события `Add` и `Remove` `GC` будут срабатывать дважды на игроках сервера (сервер прослушивания) - один раз для применения `GE` и еще раз из `Minimal` `NetMultiCast` для клиентов. Однако события `WhileActive` по-прежнему будут срабатывать только один раз. Все события будут срабатывать только один раз на клиентах.

Пример проекта включает `GameplayCueNotify_Actor` для эффектов оглушения и спринта. Он также имеет `GameplayCueNotify_Static` для воздействия снаряда FireGun. Эти `GC` можно оптимизировать еще больше, [вызывая их локально](#concepts-gc-local) вместо того, чтобы реплицировать их через `GE`. Я решил показать способ их использования для новичков в примере проекта.

## Запуск игровых сигналов

Изнутри «GameplayEffect», когда он успешно применен (не заблокирован тегами или иммунитетом), заполните «GameplayTags» всех «GameplayCues», которые должны быть запущены.

![GameplayCue, запущенный из GameplayEffect](https://github.com/tranek/GASDocumentation/raw/master/Images/gcfromge.png)

`UGameplayAbility` предлагает узлы Blueprint для «Выполнения», «Добавления» или «Удаления» «GameplayCues».

![GameplayCue, вызванный GameplayAbility](https://github.com/tranek/GASDocumentation/raw/master/Images/gcfromga.png)

В C++ вы можете вызывать функции напрямую в `ASC` (или предоставлять их в Blueprint в вашем подклассе `ASC`):

```c++
/** GameplayCues также могут быть предоставлены сами по себе. Они принимают необязательный контекст эффекта для передачи результата попадания и т. д. */
void ExecuteGameplayCue(const FGameplayTag GameplayCueTag, FGameplayEffectContextHandle EffectContext = FGameplayEffectContextHandle());
void ExecuteGameplayCue(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

/** Добавить постоянную игровую подсказку */
void AddGameplayCue(const FGameplayTag GameplayCueTag, FGameplayEffectContextHandle EffectContext = FGameplayEffectContextHandle());
void AddGameplayCue(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

/** Удалить постоянную игровую подсказку */
void RemoveGameplayCue(const FGameplayTag GameplayCueTag);

/** Удаляет любую GameplayCue, добавленную отдельно, т. е. не как часть GameplayEffect. */
void RemoveAllGameplayCues();
```

## Локальные игровые сигналы

Открытые функции для запуска `GameplayCues` из `GameplayAbilities` и `ASC` реплицируются по умолчанию. Каждое событие `GameplayCue` является многоадресным RPC. Это может вызвать множество RPC. GAS также обеспечивает максимум два одинаковых `GameplayCue` RPC на одно сетевое обновление. Мы избегаем этого, используя локальные `GameplayCues`, где это возможно. Локальные `GameplayCues` только `Execute`, `Add` или `Remove` на отдельном клиенте.

Сценарии, в которых мы можем использовать локальные `GameplayCues`:
* Удары снарядов
* Удары столкновений в ближнем бою
* `GameplayCues`, запускаемые из анимационных монтажей

Локальные функции `GameplayCue`, которые следует добавить в подкласс `ASC`:

```c++
UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void ExecuteGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void AddGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);

UFUNCTION(BlueprintCallable, Category = "GameplayCue", Meta = (AutoCreateRefTerm = "GameplayCueParameters", GameplayTagFilter = "GameplayCue"))
void RemoveGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters& GameplayCueParameters);
```

```c++
void UPAAbilitySystemComponent::ExecuteGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::Executed, GameplayCueParameters);
}

void UPAAbilitySystemComponent::AddGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::OnActive, GameplayCueParameters);
UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::WhileActive, GameplayCueParameters);
}

void UPAAbilitySystemComponent::RemoveGameplayCueLocal(const FGameplayTag GameplayCueTag, const FGameplayCueParameters & GameplayCueParameters)
{
UAbilitySystemGlobals::Get().GetGameplayCueManager()->HandleGameplayCue(GetOwner(), GameplayCueTag, EGameplayCueEvent::Type::Removed, GameplayCueParameters);
}
```

Если `GameplayCue` был `Добавлен` локально, он должен быть `Удален` локально. Если он был `Добавлен` через репликацию, он должен быть `Удален` через репликацию.

## Параметры игрового сигнала

`GameplayCues` получает структуру `FGameplayCueParameters`, содержащую дополнительную информацию для `GameplayCue` в качестве параметра. Если вы вручную запускаете `GameplayCue` из функции в `GameplayAbility` или `ASC`, то вы должны вручную заполнить структуру `GameplayCueParameters`, которая передается в `GameplayCue`. Если `GameplayCue` запускается `GameplayEffect`, то следующие переменные автоматически заполняются в структуре `GameplayCueParameters`:

* AggregatedSourceTags
* AggregatedTargetTags
* GameplayEffectLevel
* AbilityLevel
* [EffectContext](#concepts-ge-context)
* Magnitude (если `GameplayEffect` имеет `Attribute` для величины, выбранной в раскрывающемся списке над контейнером тега `GameplayCue`, и соответствующий `Modifier`, который влияет на этот `Attribute`)

Переменная `SourceObject` в структуре `GameplayCueParameters` потенциально является хорошим местом для передачи произвольных данных в `GameplayCue` при запуске `GameplayCue` вручную.

**Примечание:** Некоторые переменные в структуре параметров, например `Instigator`, могут уже существовать в `EffectContext`. `EffectContext` также может содержать `FHitResult` для определения местоположения, где в мире будет создан `GameplayCue`. Подклассификация `EffectContext` — это потенциально хороший способ передать больше данных в `GameplayCues`, особенно те, которые запускаются `GameplayEffect`.

См. 3 функции в [`UAbilitySystemGlobals`](#concepts-asg), которые заполняют структуру `GameplayCueParameters` для получения дополнительной информации. Они виртуальные, поэтому вы можете переопределить их для автоматического заполнения дополнительной информации.

```c++
/** Инициализация параметров GameplayCue */
virtual void InitGameplayCueParameters(FGameplayCueParameters& CueParameters, const FGameplayEffectSpecForRPC &Spec);
virtual void InitGameplayCueParameters_GESpec(FGameplayCueParameters& CueParameters, const FGameplayEffectSpec &Spec);
virtual void InitGameplayCueParameters(FGameplayCueParameters& CueParameters, const FGameplayEffectContextHandle& EffectContext);
```

