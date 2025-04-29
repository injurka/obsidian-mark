# Кратко

В Unreal Engine, *Attributes* (атрибуты) — это числовые значения, представленные структурой [`FGameplayAttributeData`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayAttributeData/index.html). Они могут представлять различные игровые параметры, такие как количество здоровья персонажа, его уровень или количество зарядов зелья. Если значение связано с игровым процессом и относится к `Actor`, его следует рассматривать как *Attribute*. 

*Attributes* обычно изменяются только через [`GameplayEffects`](#concepts-ge), чтобы система управления способностями (ASC) могла предсказывать изменения.

*Attributes* определяются и хранятся в [`AttributeSet`](#concepts-as). `AttributeSet` отвечает за репликацию *Attributes*, которые помечены для репликации.

**Пример:**
```cpp
USTRUCT()
struct FMyCharacterAttributeSet : public FGameplayAttributeData
{
    GENERATED_BODY()

    UPROPERTY(BlueprintReadOnly, Category = "Attributes", Meta = (HideInDetailsView))
    float Health;

    UPROPERTY(BlueprintReadOnly, Category = "Attributes")
    float Mana;
};
```

## BaseValue vs CurrentValue

Каждый *Attribute* состоит из двух значений: `BaseValue` и `CurrentValue`. `BaseValue` — это постоянное значение *Attribute*, а `CurrentValue` — это `BaseValue` плюс временные модификации от `GameplayEffects`.

**Пример:**
Предположим, у вашего персонажа есть атрибут скорости движения (`movespeed`) с `BaseValue` 600 единиц в секунду. Если нет `GameplayEffects`, изменяющих скорость, `CurrentValue` также будет 600 единиц в секунду. Если персонаж получает временный бафф скорости на 50 единиц в секунду, `BaseValue` останется 600, а `CurrentValue` станет 650 единиц в секунду. Когда бафф истечет, `CurrentValue` вернется к `BaseValue` 600 единиц в секунду.

## Meta Attributes

Некоторые *Attributes* используются как заполнители для временных значений, которые взаимодействуют с другими *Attributes*. Они называются `Meta Attributes`. Например, урон часто определяется как `Meta Attribute`. Вместо того чтобы `GameplayEffect` напрямую изменял здоровье, мы используем `Meta Attribute` урона как заполнитель. Это позволяет изменять значение урона с помощью баффов и дебаффов в [`GameplayEffectExecutionCalculation`](#concepts-ge-ec) и дополнительно манипулировать им в `AttributeSet`.

**Пример:**
```cpp
UPROPERTY(BlueprintReadOnly, Category = "Attributes", Meta = (HideInDetailsView))
float Damage;
```

## Отслеживание изменений *Attributes*

Для отслеживания изменений *Attributes* и обновления UI или других игровых элементов используется `UAbilitySystemComponent::GetGameplayAttributeValueChangeDelegate(FGameplayAttribute Attribute)`. Эта функция возвращает делегат, который можно привязать к событию изменения *Attribute*.

**Пример:**
```cpp
AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSetBase->GetHealthAttribute()).AddUObject(this, &AGDPlayerState::HealthChanged);

virtual void HealthChanged(const FOnAttributeChangeData& Data);
```

## Derived Attributes

Чтобы создать *Attribute*, значение которого частично или полностью зависит от других *Attributes*, используется `Infinite` `GameplayEffect` с одним или несколькими `Attribute Based` или [`MMC`](#concepts-ge-mmc) `Modifiers`. `Derived Attribute` будет автоматически обновляться при изменении зависимых *Attributes*.

**Пример:**
Предположим, у нас есть `Infinite` `GameplayEffect`, который вычисляет значение `TestAttrA` на основе `TestAttrB` и `TestAttrC` по формуле:
```
TestAttrA = (TestAttrA + TestAttrB) * (2 * TestAttrC)
```
`TestAttrA` будет автоматически пересчитываться при изменении значений `TestAttrB` или `TestAttrC`.

# Подробно `(Доскональный перевод первоисточника)`

`Атрибуты` — это значения с плавающей точкой, определяемые структурой [`FGameplayAttributeData`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/FGameplayAttributeData/index.html). Они могут представлять все, от количества здоровья персонажа до уровня персонажа и количества зарядов зелья. Если это числовое значение, связанное с игровым процессом и принадлежащее `Актеру`, вам следует рассмотреть возможность использования `Атрибута` для него. `Атрибуты` обычно следует изменять только с помощью [`GameplayEffects`](#concepts-ge), чтобы ASC мог [предсказать](#concepts-p) изменения.

`Attributes` определяются и находятся в [`AttributeSet`](#concepts-as). `AttributeSet` отвечает за репликацию `Attributes`, которые отмечены для репликации. См. раздел [`AttributeSets`](#concepts-as) для получения информации о том, как определить `Attributes`.

**Совет:** Если вы не хотите, чтобы `Attribute` отображался в списке `Attributes` редактора, вы можете использовать `Meta = (HideInDetailsView)` `property specifier`.

## BaseValue и CurrentValue

`Attribute` состоит из двух значений - `BaseValue` и `CurrentValue`. `BaseValue` - это постоянное значение `Attribute`, тогда как `CurrentValue` - это `BaseValue` плюс временные изменения от `GameplayEffects`. Например, ваш `Character` может иметь `Attribute` скорости передвижения с `BaseValue` 600 ед./сек. Поскольку пока нет `GameplayEffects`, изменяющих скорость передвижения, `CurrentValue` также составляет 600 ед./сек. Если она получает временный бафф скорости передвижения на 50 ед./сек., `BaseValue` остается прежним на уровне 600 ед./сек., тогда как `CurrentValue` теперь составляет 600 + 50, что в сумме составляет 650 ед./сек. Когда бафф на скорость передвижения заканчивается, `CurrentValue` возвращается к `BaseValue` в 600 ед./с.

Часто новички в GAS путают `BaseValue` с максимальным значением для `Attribute` и пытаются рассматривать его как таковой. Это неправильный подход. Максимальные значения для `Attributes`, которые могут меняться или на которые ссылаются способности или пользовательский интерфейс, следует рассматривать как отдельные `Attributes`. Для жестко закодированных максимальных и минимальных значений есть способ определить `DataTable` с `FAttributeMetaData`, который может устанавливать максимальные и минимальные значения, но комментарий Epic над структурой называет это «работой в процессе». См. `AttributeSet.h` для получения дополнительной информации. Чтобы избежать путаницы, я рекомендую, чтобы максимальные значения, на которые можно ссылаться в способностях или пользовательском интерфейсе, были сделаны отдельными `Attributes`, а жестко закодированные максимальные и минимальные значения, которые используются только для фиксации `Attributes`, были определены как жестко закодированные float в `AttributeSet`. Фиксация `Attributes` обсуждается в [PreAttributeChange()](#concepts-as-preattributechange) для изменений `CurrentValue` и [PostGameplayEffectExecute()](#concepts-as-postgameplayeffectexecute) для изменений `BaseValue` из `GameplayEffects`.

Постоянные изменения `BaseValue` происходят из `Instant` `GameplayEffects`, тогда как `Duration` и `Infinite` `GameplayEffects` изменяют `CurrentValue`. Периодические `GameplayEffects` обрабатываются как мгновенные `GameplayEffects` и изменяют `BaseValue`.

## Метаатрибуты

Некоторые `Attributes` обрабатываются как заполнители для временных значений, которые предназначены для взаимодействия с `Attributes`. Они называются `Meta Attributes`. Например, мы обычно определяем урон как `Meta Attribute`. Вместо того, чтобы `GameplayEffect` напрямую изменял наш `Attribute` здоровья, мы используем `Meta Attribute`, называемый damage, в качестве заполнителя. Таким образом, значение урона может быть изменено с помощью баффов и дебаффов в [`GameplayEffectExecutionCalculation`](#concepts-ge-ec) и может быть дополнительно изменено в `AttributeSet`, например, вычитая урон из текущего щита `Attribute`, прежде чем окончательно вычесть остаток из здоровья `Attribute`. Урон `Meta Attribute` не имеет постоянства между `GameplayEffects` и переопределяется каждым. `Meta Attributes` обычно не реплицируются.

`Meta Attributes` обеспечивают хорошее логическое разделение для таких вещей, как урон и исцеление, между «Сколько урона мы нанесли?» и «Что мы делаем с этим уроном?». Это логическое разделение означает, что нашим `Gameplay Effects` и `Execution Calculations` не нужно знать, как цель обрабатывает урон. Продолжая наш пример с уроном, `Gameplay Effect` определяет, сколько урона, а затем `AttributeSet` решает, что делать с этим уроном. Не у всех персонажей могут быть одинаковые `Attributes`, особенно если вы используете подклассы `AttributeSet`. Базовый класс `AttributeSet` может иметь только `Attribute` здоровья, но подкласс `AttributeSet` может добавлять `Attribute` щита. Подкласс `AttributeSet` с `Attribute` щита будет распределять полученный урон иначе, чем базовый класс `AttributeSet`.

Хотя `Meta Attributes` являются хорошим шаблоном проектирования, они не являются обязательными. Если у вас есть только один `Execution Calculation`, используемый для всех случаев повреждения, и один класс `Attribute Set`, общий для всех персонажей, то вы можете спокойно распределять урон по здоровью, щитам и т. д. внутри `Execution Calculation` и напрямую изменять эти `Attribute`. Вы только пожертвуете гибкостью, но это может быть приемлемо для вас.

## Реагирование на изменения атрибутов

Чтобы отслеживать, когда `Attribute` изменяется для обновления пользовательского интерфейса или другого игрового процесса, используйте `UAbilitySystemComponent::GetGameplayAttributeValueChangeDelegate(FGameplayAttribute Attribute)`. Эта функция возвращает делегат, к которому можно привязаться, который будет автоматически вызываться при каждом изменении `Attribute`. Делегат предоставляет параметр `FOnAttributeChangeData` с `NewValue`, `OldValue` и `FGameplayEffectModCallbackData`. **Примечание:** `FGameplayEffectModCallbackData` будет установлен только на сервере.

```c++
AbilitySystemComponent->GetGameplayAttributeValueChangeDelegate(AttributeSetBase->GetHealthAttribute()).AddUObject(this, &AGDPlayerState::HealthChanged);
```

```c++
virtual void HealthChanged(const FOnAttributeChangeData& Data);
```

Пример проекта привязывается к делегатам изменения значения `Attribute` в `GDPlayerState` для обновления HUD и реагирования на смерть игрока, когда здоровье достигает нуля.

В пример проекта включен пользовательский узел Blueprint, который оборачивает это в `ASyncTask`. Он используется в виджете UMG `UI_HUD` для обновления значений здоровья, маны и выносливости. Этот `AsyncTask` будет существовать вечно, пока вручную не будет вызван `EndTask()`, что мы делаем в событии `Destruct` виджета UMG. См. `AsyncTaskAttributeChanged.h/cpp`.

![Прослушать узел BP изменения атрибута](https://github.com/tranek/GASDocumentation/raw/master/Images/attributechange.png)

## Производные атрибуты

Чтобы создать `Attribute`, часть или все значение которого получены из одного или нескольких других `Attributes`, используйте `Infinite` `GameplayEffect` с одним или несколькими `Attribute Based` или [`MMC`](#concepts-ge-mmc) [`Modifiers`](#concepts-ge-mods). `Производный атрибут` обновится автоматически при обновлении `Attribute`, от которого он зависит.

Окончательная формула для всех `Модификаторов` в `Производном атрибуте` - это та же формула для `Агрегаторов модификаторов`. Если вам нужно, чтобы вычисления выполнялись в определенном порядке, делайте все это внутри `MMC`.

```
((Текущее значение + Аддитив) * Мультиплицитив) / Деление
```

**Примечание:** Если вы играете с несколькими клиентами в PIE, вам нужно отключить `Запуск в одном процессе` в настройках редактора, иначе `Производные атрибуты` не будут обновляться, когда их независимые `Атрибуты` обновляются на клиентах, отличных от первого.

В этом примере у нас есть `Infinite` `GameplayEffect`, который выводит значение `TestAttrA` из `Attributes`, `TestAttrB` и `TestAttrC`, в формуле `TestAttrA = (TestAttrA + TestAttrB) * ( 2 * TestAttrC)`. `TestAttrA` автоматически пересчитывает свое значение всякий раз, когда любой из `Attributes` обновляет свои значения.

![Пример производного атрибута](https://github.com/tranek/GASDocumentation/raw/master/Images/derivedattribute.png)