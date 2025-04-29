# Кратко

`AttributeSet` определяет, хранит и управляет изменениями `Attributes`. Разработчикам следует создать подкласс от [`UAttributeSet`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAttributeSet/index.html). Создание `AttributeSet` в конструкторе `OwnerActor's` автоматически регистрирует его с помощью `ASC`. **Это должно быть сделано в C++**.

`ASC` может иметь один или несколько `AttributeSet`. AttributeSets имеют незначительные накладные расходы памяти, поэтому организационное решение о том, сколько `AttributeSet` использовать, остается за разработчиком.

Допустимо иметь один большой монолитный `AttributeSet`, общий для каждого `Actor` в вашей игре, и использовать атрибуты только при необходимости, игнорируя неиспользуемые атрибуты.

В качестве альтернативы вы можете выбрать более одного `AttributeSet`, представляющего группы `Attribute`, которые вы выборочно добавляете к своим `Actor` по мере необходимости. Например, у вас может быть `AttributeSet` для `Attribute`, связанных со здоровьем, `AttributeSet` для `Attribute`, связанных с маной, и так далее. В игре MOBA героям может понадобиться мана, а миньонам — нет. Поэтому герои получат `AttributeSet` маны, а миньоны — нет.

Кроме того, `AttributeSets` можно подклассифицировать как еще один способ выборочного выбора `Attributes` у `Actor`. `Attributes` внутренне именуются `AttributeSetClassName.AttributeName`. Когда вы подклассифицируете `AttributeSet`, все `Attributes` из родительского класса по-прежнему будут иметь имя родительского класса в качестве префикса.

Хотя у вас может быть более одного `AttributeSet`, у вас не должно быть более одного `AttributeSet` одного и того же класса на `ASC`. Если у вас есть более одного `AttributeSet` из одного и того же класса, он не будет знать, какой `AttributeSet` использовать, и просто выберет один.

## Основные Функции Attribute Set

1. **Определение Атрибутов**: Атрибуты определяются в C++ в заголовочном файле `AttributeSet`. Для каждого атрибута генерируются геттеры и сеттеры, что упрощает доступ к ним.

2. **Управление Атрибутами**: `Attribute Set` управляет изменениями атрибутов, включая их инициализацию, изменение и репликацию.

3. **Репликация**: Атрибуты могут быть реплицированы на клиенты, чтобы все игроки видели одинаковое состояние объекта.

## Пример Определения Attribute Set

```c++
// MyAttributeSet.h
#include "AttributeSet.h"
#include "MyAttributeSet.generated.h"

UCLASS()
class MYGAME_API UMyAttributeSet : public UAttributeSet
{
    GENERATED_BODY()

public:
    UMyAttributeSet();

    // Определение атрибутов
    UPROPERTY(BlueprintReadOnly, Category = "Health", ReplicatedUsing = OnRep_Health)
    FGameplayAttributeData Health;
    ATTRIBUTE_ACCESSORS(UMyAttributeSet, Health)

    UPROPERTY(BlueprintReadOnly, Category = "Mana", ReplicatedUsing = OnRep_Mana)
    FGameplayAttributeData Mana;
    ATTRIBUTE_ACCESSORS(UMyAttributeSet, Mana)

    // Функции OnRep для репликации
    UFUNCTION()
    virtual void OnRep_Health(const FGameplayAttributeData& OldHealth);

    UFUNCTION()
    virtual void OnRep_Mana(const FGameplayAttributeData& OldMana);
};

// MyAttributeSet.cpp
#include "MyAttributeSet.h"

UMyAttributeSet::UMyAttributeSet()
{
    // Инициализация значений атрибутов
    Health.SetBaseValue(100.0f);
    Mana.SetBaseValue(50.0f);
}

void UMyAttributeSet::OnRep_Health(const FGameplayAttributeData& OldHealth)
{
    GAMEPLAYATTRIBUTE_REPNOTIFY(UMyAttributeSet, Health, OldHealth);
}

void UMyAttributeSet::OnRep_Mana(const FGameplayAttributeData& OldMana)
{
    GAMEPLAYATTRIBUTE_REPNOTIFY(UMyAttributeSet, Mana, OldMana);
}

void UMyAttributeSet::GetLifetimeReplicatedProps(TArray<FLifetimeProperty>& OutLifetimeProps) const
{
    Super::GetLifetimeReplicatedProps(OutLifetimeProps);

    DOREPLIFETIME_CONDITION_NOTIFY(UMyAttributeSet, Health, COND_None, REPNOTIFY_Always);
    DOREPLIFETIME_CONDITION_NOTIFY(UMyAttributeSet, Mana, COND_None, REPNOTIFY_Always);
}
```

## Пример Использования Attribute Set

```c++
// MyCharacter.h
#include "GameFramework/Character.h"
#include "MyAttributeSet.h"
#include "MyCharacter.generated.h"

UCLASS()
class MYGAME_API AMyCharacter : public ACharacter
{
    GENERATED_BODY()

public:
    AMyCharacter();

    UPROPERTY()
    UMyAttributeSet* AttributeSet;
};

// MyCharacter.cpp
#include "MyCharacter.h"

AMyCharacter::AMyCharacter()
{
    AttributeSet = CreateDefaultSubobject<UMyAttributeSet>(TEXT("AttributeSet"));
}
```

## Важные Моменты

1. **Репликация**: Атрибуты должны быть реплицированы, чтобы все клиенты видели одинаковые значения. Для этого используются функции `OnRep` и `GetLifetimeReplicatedProps`.

2. **Инициализация**: Атрибуты могут быть инициализированы с помощью `GameplayEffect` или напрямую через функции инициализации, сгенерированные макросом `ATTRIBUTE_ACCESSORS`.

3. **Изменение Атрибутов**: Изменения атрибутов могут быть обработаны в функции `PreAttributeChange` для ограничения значений или в `PostGameplayEffectExecute` для дополнительных манипуляций после применения `GameplayEffect`.

