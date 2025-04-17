# Кратко

`Ability System Component` (ASC) является сердцем системы GameplayAbilities (GAS). Это компонент `UActorComponent`, который обрабатывает все взаимодействия с системой. Любой `Actor`, который хочет использовать `GameplayAbilities`, иметь `Attributes` или получать `GameplayEffects`, должен иметь прикрепленный к нему `ASC`. Эти объекты живут внутри и управляются (а также реплицируются, за исключением `Attributes`, которые реплицируются их `AttributeSet`) `ASC`. Разработчики могут, но не обязаны, создавать подклассы этого компонента.

`Actor`, к которому прикреплен `ASC`, называется `OwnerActor` `ASC`. Физическое представление `Actor` `ASC` называется `AvatarActor`. `OwnerActor` и `AvatarActor` могут быть одним и тем же `Actor`, как в случае простого AI-миньона в MOBA-игре. Они также могут быть разными `Actor`, как в случае игрока, управляемого героем в MOBA-игре, где `OwnerActor` является `PlayerState`, а `AvatarActor` — классом героя `Character`. Большинство `Actor` будут иметь `ASC` на себе. Если ваш `Actor` будет возрождаться и нуждается в сохранении `Attributes` или `GameplayEffects` между возрождениями (как герой в MOBA), то идеальное место для `ASC` — это `PlayerState`.

**Примечание:** Если ваш `ASC` находится в `PlayerState`, то вам нужно увеличить `NetUpdateFrequency` вашего `PlayerState`. Он по умолчанию имеет очень низкое значение в `PlayerState` и может вызвать задержки или ощущение задержки, прежде чем изменения в таких вещах, как `Attributes` и `GameplayTags`, произойдут на клиентах. Обязательно включите [`Adaptive Network Update Frequency`](https://docs.unrealengine.com/en-US/Gameplay/Networking/Actors/Properties/index.html#adaptivenetworkupdatefrequency), Fortnite использует его.

Оба, `OwnerActor` и `AvatarActor`, если они разные `Actor`, должны реализовывать интерфейс `IAbilitySystemInterface`. Этот интерфейс имеет одну функцию, которую необходимо переопределить, `UAbilitySystemComponent* GetAbilitySystemComponent() const`, которая возвращает указатель на его `ASC`. `ASCs` взаимодействуют друг с другом внутри системы, ища эту функцию интерфейса.

`ASC` хранит свои текущие активные `GameplayEffects` в `FActiveGameplayEffectsContainer ActiveGameplayEffects`.

`ASC` хранит свои предоставленные `Gameplay Abilities` в `FGameplayAbilitySpecContainer ActivatableAbilities`. Всякий раз, когда вы планируете перебирать `ActivatableAbilities.Items`, обязательно добавьте `ABILITYLIST_SCOPE_LOCK();` выше вашего цикла, чтобы заблокировать список от изменений (из-за удаления способности). Каждый `ABILITYLIST_SCOPE_LOCK();` в области видимости увеличивает `AbilityScopeLockCount` и затем уменьшает, когда он выходит из области видимости. Не пытайтесь удалить способность внутри области `ABILITYLIST_SCOPE_LOCK();` (функции очистки способностей проверяют `AbilityScopeLockCount` внутренне, чтобы предотвратить удаление способностей, если список заблокирован).

## Примеры использования ASC

### Пример 1: Создание и репликация ASC

```c++
AGDPlayerState::AGDPlayerState()
{
	// Создание компонента системы способностей и установка его для явной репликации
	AbilitySystemComponent = CreateDefaultSubobject<UGDAbilitySystemComponent>(TEXT("AbilitySystemComponent"));
	AbilitySystemComponent->SetIsReplicated(true);
	//...
}
```

### Пример 2: Инициализация ASC на сервере и клиенте

```c++
void APACharacterBase::PossessedBy(AController * NewController)
{
	Super::PossessedBy(NewController);

	if (AbilitySystemComponent)
	{
		AbilitySystemComponent->InitAbilityActorInfo(this, this);
	}

	// ASC MixedMode replication требует, чтобы Owner ASC был Controller.
	SetOwner(NewController);
}
```

```c++
void APAPlayerControllerBase::AcknowledgePossession(APawn* P)
{
	Super::AcknowledgePossession(P);

	APACharacterBase* CharacterBase = Cast<APACharacterBase>(P);
	if (CharacterBase)
	{
		CharacterBase->GetAbilitySystemComponent()->InitAbilityActorInfo(CharacterBase, CharacterBase);
	}

	//...
}
```


# Подробно `(Доскональный перевод первоисточника)`

`AbilitySystemComponent` (`ASC`) является сердцем GAS. Это `UActorComponent` ([`UAbilitySystemComponent`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAbilitySystemComponent/index.html)), который обрабатывает все взаимодействия с системой. Любой `Actor`, который хочет использовать [`GameplayAbilities`](#concepts-ga), иметь [`Attributes`](#concepts-a) или получать [`GameplayEffects`](#concepts-ge), должен иметь один `ASC`, прикрепленный к нему. Все эти объекты находятся внутри, управляются и реплицируются (за исключением `Attributes`, которые реплицируются их [`AttributeSet`](#concepts-as)) `ASC`. Разработчики ожидают, но не обязаны создавать подклассы этого.

`Actor` с прикрепленным к нему `ASC` называется `OwnerActor` для `ASC`. Физическое представление `Actor` для `ASC` называется `AvatarActor`. `OwnerActor` и `AvatarActor` могут быть одним и тем же `Actor`, как в случае простого ИИ-приспешника в игре MOBA. Они также могут быть разными `Actor`, как в случае героя, управляемого игроком в игре MOBA, где `OwnerActor` является `PlayerState`, а `AvatarActor` является классом `Character` героя. Большинство `Actor` будут иметь `ASC` на себе. Если ваш `Actor` будет возрождаться и вам необходимо сохранение `Attributes` или `GameplayEffects` между возрождениями (как герой в MOBA), то идеальным местом для `ASC` будет `PlayerState`.

**Примечание:** Если ваш `ASC` находится в вашем `PlayerState`, то вам нужно будет увеличить `NetUpdateFrequency` вашего `PlayerState`. По умолчанию он имеет очень низкое значение в `PlayerState` и может вызывать задержки или воспринимаемое отставание перед тем, как изменения таких вещей, как `Attributes` и `GameplayTags`, произойдут на клиентах. Обязательно включите [`Adaptive Network Update Frequency`](https://docs.unrealengine.com/en-US/Gameplay/Networking/Actors/Properties/index.html#adaptivenetworkupdatefrequency), Fortnite использует его.

Оба, `OwnerActor` и `AvatarActor`, если это разные `Actors`, должны реализовывать `IAbilitySystemInterface`. Этот интерфейс имеет одну функцию, которую необходимо переопределить, `UAbilitySystemComponent* GetAbilitySystemComponent() const`, которая возвращает указатель на его `ASC`. `ASC` взаимодействуют друг с другом внутри системы, ища эту функцию интерфейса.

`ASC` хранит свои текущие активные `GameplayEffects` в `FActiveGameplayEffectsContainer ActiveGameplayEffects`.

`ASC` хранит свои предоставленные `Gameplay Abilities` в `FGameplayAbilitySpecContainer ActivatableAbilities`. Каждый раз, когда вы планируете итерировать `ActivatableAbilities.Items`, обязательно добавьте `ABILITYLIST_SCOPE_LOCK();` над вашим циклом, чтобы заблокировать список от изменения (из-за удаления способности). Каждый `ABILITYLIST_SCOPE_LOCK();` в области действия увеличивает `AbilityScopeLockCount`, а затем уменьшает, когда он выходит из области действия. Не пытайтесь удалить способность внутри области действия `ABILITYLIST_SCOPE_LOCK();` (функции очистки способности проверяют `AbilityScopeLockCount` внутренне, чтобы предотвратить удаление способностей, если список заблокирован).

## Режим репликации

`ASC` определяет три различных режима репликации для репликации `GameplayEffects`, `GameplayTags` и `GameplayCues` - `Full`, `Mixed` и `Minimal`. `AttributeSet` реплицируются с помощью `AttributeSet`.

| Режим репликации | Когда использовать | Описание |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Полный` | Одиночный | Каждый `GameplayEffect` реплицируется на каждого клиента. |
| `Смешанный` | Многопользовательский, `Актёры`, контролируемые игроком | `GameplayEffects` реплицируются только на владеющего клиента. Только `GameplayTags` и `GameplayCues` реплицируются на всех. |
| `Минимальный` | Многопользовательский, `Актёры`, контролируемые ИИ | `GameplayEffects` никогда не реплицируются ни на кого. Только `GameplayTags` и `GameplayCues` реплицируются на всех. |

**Примечание:** Режим репликации `Смешанный` предполагает, что `Владелец` `OwnerActor` будет `Контроллером`. `PlayerState's` `Owner` по умолчанию является `Controller`, а `Character's` - нет. Если используется `Mixed` режим репликации с `OwnerActor`, а не `PlayerState`, то вам необходимо вызвать `SetOwner()` для `OwnerActor` с допустимым `Controller`.

Начиная с версии 4.24, `PossessedBy()` теперь устанавливает владельца `Pawn` на новый `Controller`.

## Настройка и инициализация

`ASC` обычно создаются в конструкторе `OwnerActor` и явно помечаются как реплицируемые. **Это должно быть сделано в C++**.

```c++
AGDPlayerState::AGDPlayerState()
{
// Создаем компонент системы способностей и устанавливаем его для явной репликации
AbilitySystemComponent = CreateDefaultSubobject<UGDAbilitySystemComponent>(TEXT("AbilitySystemComponent"));
AbilitySystemComponent->SetIsReplicated(true);
//...
}
```

`ASC` необходимо инициализировать с помощью `OwnerActor` и `AvatarActor` как на сервере, так и на клиенте. Вы хотите инициализировать после того, как `Pawn` `Controller` будет установлен (после владения). В однопользовательских играх нужно беспокоиться только о пути к серверу.

Для персонажей, контролируемых игроком, где `ASC` находится на `Pawn`, я обычно инициализирую на сервере в функции `PossessedBy()` `Pawn` и инициализирую на клиенте в функции `AcknowledgePossession()` `PlayerController`.

```c++
void APACharacterBase::PossessedBy(AController * NewController)
{
Super::PossessedBy(NewController);

if (AbilitySystemComponent)
{
AbilitySystemComponent->InitAbilityActorInfo(this, this);
}

// Для репликации ASC MixedMode требуется, чтобы владелец владельца ASC был контроллером.
SetOwner(NewController);
}
```

```c++
void APAPlayerControllerBase::AcknowledgePossession(APawn* P)
{
Super::AcknowledgePossession(P);

APACharacterBase* CharacterBase = Cast<APACharacterBase>(P);
if (CharacterBase)
{
CharacterBase->GetAbilitySystemComponent()->InitAbilityActorInfo(CharacterBase, CharacterBase);
}

//...
}
```

Для персонажей, контролируемых игроком, где `ASC` находится в `PlayerState`, я обычно инициализирую сервер в функции `Pawn` `PossessedBy()` и инициализирую на клиенте в функции `Pawn` `OnRep_PlayerState()`. Это гарантирует, что `PlayerState` существует на клиенте.

```c++
// Только сервер
void AGDHeroCharacter::PossessedBy(AController * NewController)
{
Super::PossessedBy(NewController);

AGDPlayerState* PS = GetPlayerState<AGDPlayerState>();
if (PS)
{
// Устанавливаем ASC на сервере. Клиенты делают это в OnRep_PlayerState()
AbilitySystemComponent = Cast<UGDAbilitySystemComponent>(PS->GetAbilitySystemComponent());

// У ИИ не будет PlayerControllers, поэтому мы можем инициализировать здесь снова, просто чтобы убедиться. Нет ничего плохого в двойной инициализации для героев, у которых есть PlayerControllers.
PS->GetAbilitySystemComponent()->InitAbilityActorInfo(PS, this);
}

//...
}
```

```c++
// Только клиент
void AGDHeroCharacter::OnRep_PlayerState()
{
Super::OnRep_PlayerState();

AGDPlayerState* PS = GetPlayerState<AGDPlayerState>();
if (PS)
{
// Установите ASC для клиентов. Сервер делает это в PossessedBy.
AbilitySystemComponent = Cast<UGDAbilitySystemComponent>(PS->GetAbilitySystemComponent());

// Инициализация информации об актере ASC для клиентов. Сервер инициирует свой ASC, когда он обладает новым актером.
AbilitySystemComponent->InitAbilityActorInfo(PS, this);
}

// ...
}
```

Если вы получили сообщение об ошибке `LogAbilitySystem: Предупреждение: невозможно активировать LocalOnly или LocalPredicted способность %s, если она не локальная!`, значит, вы не инициализировали `ASC` на клиенте.