Перечисления (enums) используются для определения набора именованных констант. Они могут быть полезны для улучшения читаемости кода и упрощения работы с наборами связанных значений. В этом документе мы рассмотрим различные виды перечислений, способы их определения и особенности их использования в UE5.

## Виды перечислений

### 1. Простые перечисления
Простые перечисления определяют набор именованных констант без каких-либо дополнительных атрибутов.

```cpp
enum EMySimpleEnum
{
    EMySimpleEnum_Option1,
    EMySimpleEnum_Option2,
    EMySimpleEnum_Option3,
};
```

### 2. Перечисления с атрибутами
Перечисления могут быть дополнены атрибутами, такими как `BlueprintType`, чтобы сделать их доступными в Blueprint.

```cpp
UENUM(BlueprintType)
enum class EMyBlueprintEnum : uint8
{
    Option1,
    Option2,
    Option3,
};
```

### 3. Перечисления с пользовательскими значениями
Перечисления могут иметь пользовательские значения для каждой константы.

```cpp
UENUM(BlueprintType)
enum class EMyCustomValueEnum : uint8
{
    Option1 = 10,
    Option2 = 20,
    Option3 = 30,
};
```

### 4. Перечисления с метаданными
Перечисления могут содержать метаданные, которые могут быть использованы для документирования или настройки поведения в редакторе.

```cpp
UENUM(BlueprintType)
enum class EMyMetadataEnum : uint8
{
    Option1 UMETA(DisplayName="First Option"),
    Option2 UMETA(DisplayName="Second Option"),
    Option3 UMETA(DisplayName="Third Option"),
};
```

## Особенности перечислений в UE5

### 1. Использование `UENUM`
Все перечисления в UE5 должны быть объявлены с помощью макроса `UENUM`. Этот макрос генерирует необходимый код для работы перечисления в UE5.

### 2. Использование `BlueprintType`
Если перечисление должно быть доступно в Blueprint, его нужно объявить с атрибутом `BlueprintType`.

### 3. Использование `UMETA`
Метаданные могут быть добавлены к элементам перечисления с помощью макроса `UMETA`. Это позволяет добавлять дополнительную информацию, такую как отображаемое имя.

### 4. Использование `enum class`
Использование `enum class` вместо простого `enum` обеспечивает более строгую типизацию и предотвращает случайное приведение типов.

### 5. Использование пользовательских значений
Перечисления могут иметь пользовательские значения для каждой константы, что может быть полезно для совместимости с существующими системами или для упрощения логики.

## Примеры использования

### Пример использования простого перечисления
```cpp
enum EMySimpleEnum
{
    EMySimpleEnum_Option1,
    EMySimpleEnum_Option2,
    EMySimpleEnum_Option3,
};

void UseSimpleEnum(EMySimpleEnum EnumValue)
{
    switch (EnumValue)
    {
    case EMySimpleEnum_Option1:
        UE_LOG(LogTemp, Log, TEXT("Option 1 selected"));
        break;
    case EMySimpleEnum_Option2:
        UE_LOG(LogTemp, Log, TEXT("Option 2 selected"));
        break;
    case EMySimpleEnum_Option3:
        UE_LOG(LogTemp, Log, TEXT("Option 3 selected"));
        break;
    default:
        UE_LOG(LogTemp, Warning, TEXT("Unknown option"));
        break;
    }
}
```

### Пример использования перечисления с атрибутами
```cpp
UENUM(BlueprintType)
enum class EMyBlueprintEnum : uint8
{
    Option1,
    Option2,
    Option3,
};

void UseBlueprintEnum(EMyBlueprintEnum EnumValue)
{
    switch (EnumValue)
    {
    case EMyBlueprintEnum::Option1:
        UE_LOG(LogTemp, Log, TEXT("Option 1 selected"));
        break;
    case EMyBlueprintEnum::Option2:
        UE_LOG(LogTemp, Log, TEXT("Option 2 selected"));
        break;
    case EMyBlueprintEnum::Option3:
        UE_LOG(LogTemp, Log, TEXT("Option 3 selected"));
        break;
    default:
        UE_LOG(LogTemp, Warning, TEXT("Unknown option"));
        break;
    }
}
```

### Пример использования перечисления с метаданными
```cpp
UENUM(BlueprintType)
enum class EMyMetadataEnum : uint8
{
    Option1 UMETA(DisplayName="First Option"),
    Option2 UMETA(DisplayName="Second Option"),
    Option3 UMETA(DisplayName="Third Option"),
};

void UseMetadataEnum(EMyMetadataEnum EnumValue)
{
    switch (EnumValue)
    {
    case EMyMetadataEnum::Option1:
        UE_LOG(LogTemp, Log, TEXT("First Option selected"));
        break;
    case EMyMetadataEnum::Option2:
        UE_LOG(LogTemp, Log, TEXT("Second Option selected"));
        break;
    case EMyMetadataEnum::Option3:
        UE_LOG(LogTemp, Log, TEXT("Third Option selected"));
        break;
    default:
        UE_LOG(LogTemp, Warning, TEXT("Unknown option"));
        break;
    }
}
```
