Структуры (*structs*) используются для группировки связанных данных. Они могут быть использованы для создания пользовательских типов данных, которые могут быть легко переданы между функциями и классами. В этом документе мы рассмотрим различные виды структур, способы их определения и особенности их использования в UE5.

## Виды структур

### 1. Простые структуры
Простые структуры состоят из набора переменных, которые могут быть разных типов. Они не имеют методов и служат только для хранения данных.

```cpp
USTRUCT(BlueprintType)
struct FMySimpleStruct
{
    GENERATED_USTRUCT_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    int32 MyInt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    float MyFloat;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    FString MyString;
};
```

### 2. Структуры с методами
Структуры могут также содержать методы, которые могут выполнять операции над данными, хранящимися в структуре.

```cpp
USTRUCT(BlueprintType)
struct FMyStructWithMethods
{
    GENERATED_USTRUCT_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    int32 MyInt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    float MyFloat;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    FString MyString;

    UFUNCTION(BlueprintCallable, Category="MyStruct")
    void SetMyInt(int32 NewInt)
    {
        MyInt = NewInt;
    }

    UFUNCTION(BlueprintCallable, Category="MyStruct")
    int32 GetMyInt() const
    {
        return MyInt;
    }
};
```

### 3. Структуры с конструкторами
Структуры могут иметь конструкторы, которые позволяют инициализировать данные при создании экземпляра структуры.

```cpp
USTRUCT(BlueprintType)
struct FMyStructWithConstructor
{
    GENERATED_USTRUCT_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    int32 MyInt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    float MyFloat;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    FString MyString;

    FMyStructWithConstructor()
        : MyInt(0)
        , MyFloat(0.0f)
        , MyString(TEXT("Default"))
    {
    }

    FMyStructWithConstructor(int32 InInt, float InFloat, const FString& InString)
        : MyInt(InInt)
        , MyFloat(InFloat)
        , MyString(InString)
    {
    }
};
```

### 4. Структуры с операторами
Структуры могут перегружать операторы, что позволяет выполнять операции над экземплярами структур.

```cpp
USTRUCT(BlueprintType)
struct FMyStructWithOperators
{
    GENERATED_USTRUCT_BODY()

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    int32 MyInt;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    float MyFloat;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category="MyStruct")
    FString MyString;

    bool operator==(const FMyStructWithOperators& Other) const
    {
        return MyInt == Other.MyInt && MyFloat == Other.MyFloat && MyString == Other.MyString;
    }

    bool operator!=(const FMyStructWithOperators& Other) const
    {
        return !(*this == Other);
    }
};
```

### 5. Структуры для использования в `DataTable`

Чтобы можно было создать `DataTable`, нужно наследоваться от `FTableRowBase`

```cpp
#pragma once  
  
#include "CoreMinimal.h"  
#include "ItemStruct.generated.h"  
  
USTRUCT(BlueprintType)  
struct ROR_API FItemStruct: public FTableRowBase  
{  
    GENERATED_BODY()  
  
    // Название предмета  
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Inventory")  
    FText Name;
}
```

## Особенности структур в UE5

### 1. Использование `USTRUCT` и `GENERATED_BODY`
Все структуры в UE5 должны быть объявлены с помощью макроса `USTRUCT`. Этот макрос генерирует необходимый код для работы структуры в UE5.

### 2. Использование `UPROPERTY`
Члены структуры, которые должны быть доступны в Blueprint, должны быть помечены как `UPROPERTY`. Это позволяет редактору Blueprint видеть и редактировать эти переменные.

### 3. Использование `UFUNCTION`
Методы структуры, которые должны быть доступны в Blueprint, должны быть помечены как `UFUNCTION`.

### 4. Конструкторы и деструкторы
Структуры могут иметь конструкторы и деструкторы, которые позволяют инициализировать и освобождать ресурсы при создании и уничтожении экземпляра структуры.

### 5. Перегрузка операторов
Структуры могут перегружать операторы, что позволяет выполнять операции над экземплярами структур.

## Рекомендации по использованию

### 1. Soft pointers

Использование мягких указателей является хорошей практикой для `data table` в `struct`, которая помогает оптимизировать производительность, упрощает управление ресурсами и повышает гибкость разработки. Рекомендуется использовать `TSoftObjectPtr` и `TSoftClassPtr` вместо обычных указателей, где это возможно. 

**TSoftObjectPtr** и **TSoftClassPtr** позволяют отложить загрузку ресурсов до того момента, когда они действительно понадобятся. Это особенно полезно для оптимизации производительности, так как позволяет избежать загрузки большого количества ресурсов при старте игры или уровня.

Мягкие указатели хорошо интегрированы с редактором, что позволяет легко настраивать и управлять ссылками на ресурсы прямо из редактора. Например, вы можете использовать `TSoftObjectPtr` для ссылки на ассеты, которые могут быть изменены или заменены без необходимости перекомпиляции кода.

`TObjectPtr` -> `TSoftObjectPtr`
`TSubclassOf` -> `TSoftClassPtr`

## Источники
- #### [Scripted Adventure](https://www.youtube.com/watch?v=hXZR3udztWE)