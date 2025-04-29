# Кратко

`AbilitySystemGlobals` — это класс в Unreal Engine, который хранит глобальную информацию о системе Gameplay Abilities (GAS). Этот класс предоставляет общие настройки и данные, которые используются во всем проекте для работы с GAS. Большинство переменных этого класса могут быть настроены через файл `DefaultGame.ini`. Обычно вам не нужно взаимодействовать напрямую с этим классом, но важно знать о его существовании, особенно если вы планируете создавать подклассы для таких компонентов, как `GameplayCueManager` или `GameplayEffectContext`.

## Настройка подкласса `AbilitySystemGlobals`

Если вам нужно создать подкласс `AbilitySystemGlobals`, вы можете сделать это, указав имя класса в файле `DefaultGame.ini`:

```ini
[/Script/GameplayAbilities.AbilitySystemGlobals]
AbilitySystemGlobalsClassName="/Script/ParagonAssets.PAAbilitySystemGlobals"
```

## Метод `InitGlobalData()`

В версиях Unreal Engine между 4.24 и 5.2, необходимо вызывать метод `UAbilitySystemGlobals::Get().InitGlobalData()`, чтобы использовать `TargetData`. Этот метод инициализирует глобальные данные, необходимые для работы с `TargetData`, и предотвращает ошибки, связанные с `ScriptStructCache`, которые могут привести к отключению клиентов от сервера. Этот метод нужно вызывать только один раз в проекте.

Пример вызова `InitGlobalData()` в `UAssetManager::StartInitialLoading()`:

```cpp
void UMyAssetManager::StartInitialLoading()
{
    Super::StartInitialLoading();

    // Инициализация глобальных данных для GAS
    UAbilitySystemGlobals::Get().InitGlobalData();
}
```

Начиная с версии 5.3, этот метод вызывается автоматически, поэтому вам не нужно будет делать это вручную.

## Пример использования

Предположим, у вас есть проект, в котором вы используете систему Gameplay Abilities. Вы хотите настроить глобальные параметры для этой системы, например, изменить путь к таблице дефолтных значений атрибутов. Вы можете сделать это, создав подкласс `AbilitySystemGlobals` и настроив его в `DefaultGame.ini`:

```ini
[/Script/GameplayAbilities.AbilitySystemGlobals]
AbilitySystemGlobalsClassName="/Script/YourProject.YourAbilitySystemGlobals"
```

Затем в вашем подклассе `YourAbilitySystemGlobals` вы можете переопределить метод `InitGlobalData()`, чтобы добавить дополнительную логику инициализации:

```cpp
void UYourAbilitySystemGlobals::InitGlobalData()
{
    Super::InitGlobalData();

    // Дополнительная логика инициализации
    // Например, настройка пути к таблице дефолтных значений атрибутов
    GlobalAttributeSetDefaultsTableNames.Add(FName("YourAttributeSetDefaultsTable"));
}
```

Таким образом, вы можете настроить глобальные параметры системы Gameplay Abilities в соответствии с потребностями вашего проекта.

# Подробно `(Доскональный перевод первоисточника)`

Класс [`AbilitySystemGlobals`](https://docs.unrealengine.com/en-US/API/Plugins/GameplayAbilities/UAbilitySystemGlobals/index.html) содержит глобальную информацию о GAS. Большинство переменных можно задать из `DefaultGame.ini`. Обычно вам не придется взаимодействовать с этим классом, но вы должны знать о его существовании. Если вам нужно создать подклассы таких вещей, как [`GameplayCueManager`](#concepts-gc-manager) или [`GameplayEffectContext`](#concepts-ge-context), вам нужно сделать это через `AbilitySystemGlobals`.

Чтобы создать подкласс `AbilitySystemGlobals`, задайте имя класса в `DefaultGame.ini`:
```
[/Script/GameplayAbilities.AbilitySystemGlobals]
AbilitySystemGlobalsClassName="/Script/ParagonAssets.PAAbilitySystemGlobals"
```

## InitGlobalData()

В UE между 4.24 и 5.2 необходимо вызывать `UAbilitySystemGlobals::Get().InitGlobalData()` для использования [`TargetData`](#concepts-targeting-data), в противном случае вы получите ошибки, связанные с `ScriptStructCache`, и клиенты будут отключены от сервера. Эту функцию нужно вызывать только один раз в проекте. Fortnite вызывает его из `UAssetManager::StartInitialLoading()`, а Paragon вызывает его из `UEngine::Init()`. Я считаю, что размещение его в `UAssetManager::StartInitialLoading()` является хорошим местом, как показано в примере проекта. Я бы счел этот шаблонный код, который вы должны скопировать в свой проект, чтобы избежать проблем с `TargetData`. Начиная с версии 5.3 он вызывается автоматически.

Если вы столкнетесь с крахом при использовании `AbilitySystemGlobals` `GlobalAttributeSetDefaultsTableNames`, вам может потребоваться вызвать `UAbilitySystemGlobals::Get().InitGlobalData()` позже, как в Fortnite в `AssetManager` или в `GameInstance`.