Конечно, давайте рассмотрим, как можно реализовать интерфейс в C++ в контексте Unreal Engine, и как его можно использовать.

## Что есть интерфейс и как его использовать

В Unreal Engine интерфейсы обычно реализуются с использованием абстрактных классов. Вот пример того, как можно создать интерфейс:

```cpp
#pragma once

#include "CoreMinimal.h"
#include "UObject/Interface.h"
#include "MyInterface.generated.h"

// Этот класс не должен быть создан!
UINTERFACE(MinimalAPI)
class UMyInterface : public UInterface
{
    GENERATED_BODY()
};

class MYPROJECT_API IMyInterface
{
    GENERATED_BODY()

public:
    // Виртуальная функция, которая должна быть реализована в классе, реализующем интерфейс
    virtual void MyFunction() = 0;
};
```

### Использование интерфейса

Теперь, когда у нас есть интерфейс, давайте посмотрим, как его можно использовать в другом классе:

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyInterface.h"
#include "MyActor.generated.h"

UCLASS()
class MYPROJECT_API AMyActor : public AActor, public IMyInterface
{
    GENERATED_BODY()

public:
    // Конструктор по умолчанию
    AMyActor();

protected:
    // Вызывается при начале игры
    virtual void BeginPlay() override;

public:
    // Вызывается каждый кадр
    virtual void Tick(float DeltaTime) override;

    // Реализация функции интерфейса
    virtual void MyFunction() override;
};
```

В файле исходного кода (.cpp) вы можете реализовать функцию интерфейса:

```cpp
#include "MyActor.h"

// Конструктор по умолчанию
AMyActor::AMyActor()
{
    PrimaryActorTick.bCanEverTick = true;
}

// Вызывается при начале игры
void AMyActor::BeginPlay()
{
    Super::BeginPlay();
}

// Вызывается каждый кадр
void AMyActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
}

// Реализация функции интерфейса
void AMyActor::MyFunction()
{
    UE_LOG(LogTemp, Warning, TEXT("MyFunction called!"));
}
```

### Тонкости использования

1. **Абстрактные классы**: Интерфейсы в Unreal Engine реализуются как абстрактные классы, что означает, что они не могут быть созданы напрямую. Они предназначены для наследования и реализации в других классах.

2. **Виртуальные функции**: Все функции в интерфейсе должны быть чисто виртуальными (`= 0`), что означает, что они должны быть реализованы в классе, который наследует интерфейс.

3. **Использование интерфейса**: Вы можете использовать интерфейс для проверки, реализует ли объект определенный интерфейс, используя `Cast<IMyInterface>(MyObject)`. Если приведение прошло успешно, вы можете вызвать функции интерфейса.

Пример использования:

```cpp
void SomeFunction(UObject* Object)
{
    IMyInterface* Interface = Cast<IMyInterface>(Object);
    if (Interface)
    {
        Interface->MyFunction();
    }
}
```

### Вариации

1. **Множественное наследование**: Вы можете реализовать несколько интерфейсов в одном классе, используя множественное наследование.

2. **Интерфейсы с параметрами**: Вы можете создавать интерфейсы с параметрами, которые будут передаваться в функции интерфейса.

3. **Интерфейсы с событиями**: Вы можете использовать делегаты для создания интерфейсов с событиями, которые могут быть вызваны из внешних классов.

## А как он понимает что `UInteractInterface` и `IInteractInterface` связаны?

В Unreal Engine связь между `UInteractInterface` и `IInteractInterface` устанавливается через макросы и систему генерации кода, предоставляемую Unreal Engine. Давайте разберем, как это работает, на примере.

### Шаг 1: Создание `UInteractInterface`

Первым шагом является создание класса `UInteractInterface`, который наследуется от `UInterface`. Этот класс используется для регистрации интерфейса в системе Unreal Engine.

```cpp
#pragma once

#include "CoreMinimal.h"
#include "UObject/Interface.h"
#include "InteractInterface.generated.h"

// Этот класс не должен быть создан!
UINTERFACE(MinimalAPI)
class UInteractInterface : public UInterface
{
    GENERATED_BODY()
};
```

### Шаг 2: Создание `IInteractInterface`

Вторым шагом является создание класса `IInteractInterface`, который содержит саму логику интерфейса. Этот класс наследуется от `UObject` и содержит чисто виртуальные функции, которые должны быть реализованы в классах, использующих этот интерфейс.

```cpp
class INTERACTINTERFACE_API IInteractInterface
{
    GENERATED_BODY()

public:
    // Виртуальная функция, которая должна быть реализована в классе, реализующем интерфейс
    virtual void Interact() = 0;
};
```

### Шаг 3: Использование макросов `GENERATED_BODY()`

Макрос `GENERATED_BODY()` является ключевым элементом, который связывает `UInteractInterface` и `IInteractInterface`. Этот макрос генерирует код, который связывает метаданные интерфейса с его логикой.

Когда вы используете `GENERATED_BODY()` в обоих классах, Unreal Engine генерирует скрытый код, который связывает эти два класса. Этот скрытый код включает в себя:

1. **Регистрацию интерфейса**: `UInteractInterface` регистрируется в системе Unreal Engine, что позволяет редактору и другим инструментам работать с интерфейсом.

2. **Связывание логики**: `IInteractInterface` связывается с `UInteractInterface`, что позволяет использовать интерфейс в других классах.

### Пример сгенерированного кода

Хотя вы не видите сгенерированный код напрямую, вот пример того, как это может выглядеть (упрощенно):

```cpp
// Сгенерированный код для UInteractInterface
class UInteractInterface : public UInterface
{
    // Регистрация интерфейса в системе Unreal Engine
    static void StaticRegisterNativesUInteractInterface();
    UClass* GetClass() const override;
};

// Сгенерированный код для IInteractInterface
class IInteractInterface
{
    // Связывание с UInteractInterface
    static UClass* GetInterfaceClass() { return UInteractInterface::StaticClass(); }

    // Виртуальная функция, которая должна быть реализована в классе, реализующем интерфейс
    virtual void Interact() = 0;
};
```

### Как это работает в реальности

Когда вы создаете класс, который реализует интерфейс, Unreal Engine использует сгенерированный код для проверки, реализует ли класс данный интерфейс. Например:

```cpp
void SomeFunction(UObject* Object)
{
    IInteractInterface* Interface = Cast<IInteractInterface>(Object);
    if (Interface)
    {
        Interface->Interact();
    }
}
```

В этом примере `Cast<IInteractInterface>(Object)` использует сгенерированный код для проверки, реализует ли `Object` интерфейс `IInteractInterface`. Если да, то возвращается указатель на интерфейс, и вы можете вызвать функции интерфейса.

## Примеры использования

Структура файлов

![[45DE8E59-1514-4704-8A97-72138161CFD7.png]]

> InteractInterface.h
```cpp
#pragma once  
  
#include "CoreMinimal.h"  
#include "UObject/Interface.h"  
#include "InteractInterface.generated.h"  
  
UINTERFACE(MinimalAPI)  
class UInteractInterface : public UInterface  
{  
    GENERATED_BODY()  
};  
  
class PROJECT_API IInteractInterface  
{  
    GENERATED_BODY()  
  
public:  
    /** Функция, вызываемая при взгляде на объект */  
    UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "Interaction")  
    void LookAt();  
  
    /** Функция, вызываемая при взаимодействии с объектом */  
    UFUNCTION(BlueprintNativeEvent, BlueprintCallable, Category = "Interaction")  
    FText InteractWith();  
};
```

>TestItem.h
```cpp
#pragma once  
  
#include "CoreMinimal.h"  
#include "GameFramework/Actor.h"  
#include "Interface/InteractInterface.h"  
#include "TestItem.generated.h"  
  
UCLASS()  
class ROR_API ATestItem : public AActor, public IInteractInterface  
{  
    GENERATED_BODY()  
  
public:  
    ATestItem();  
  
protected:  
    virtual void BeginPlay() override;  
  
public:  
    // Реализация функции LookAt  
    virtual void LookAt_Implementation() override;  
      
    // Реализация функции InteractWith  
    virtual FText InteractWith_Implementation() override;  
};
```

>TestItem.cpp
```cpp
#include "TestItem.h"  
  
ATestItem::ATestItem()  
{

}  
  
void ATestItem::BeginPlay()  
{  
    Super::BeginPlay();  
}  
  
// Реализация функции LookAt  
void ATestItem::LookAt_Implementation()  
{  
    // Добавьте здесь логику для обработки события "LookAt"  
    UE_LOG(LogTemp, Warning, TEXT("LookAt called on %s"), *GetName());  
}  
  
// Реализация функции InteractWith  
FText ATestItem::InteractWith_Implementation()  
{  
    // Добавьте здесь логику для обработки события "InteractWith"  
    UE_LOG(LogTemp, Warning, TEXT("InteractWith called on %s"), *GetName());  
    return FText::FromString("InteractWith message from " + GetName());  
}
```