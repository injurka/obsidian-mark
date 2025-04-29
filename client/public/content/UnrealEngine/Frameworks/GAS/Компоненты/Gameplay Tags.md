# Кратко

**Gameplay Tags** — это иерархические имена в формате `Parent.Child.Grandchild...`, которые регистрируются в `GameplayTagManager`. Эти теги чрезвычайно полезны для классификации и описания состояния объекта. Например, если персонаж оглушен, мы можем присвоить ему `GameplayTag` `State.Debuff.Stun` на время оглушения.

Вместо использования булевых переменных или перечислений для управления состоянием объектов, разработчики часто переходят на использование `GameplayTags` и выполняют логические операции на основе наличия или отсутствия определенных `GameplayTags` у объектов.

## Пример использования `GameplayTags`:

Предположим, у нас есть персонаж, который может находиться в различных состояниях, таких как "оглушен", "заморожен", "невидимый" и т.д. Мы можем использовать `GameplayTags` для описания этих состояний:

- `State.Debuff.Stun` — персонаж оглушен.
- `State.Debuff.Freeze` — персонаж заморожен.
- `State.Buff.Invisible` — персонаж невидим.

Пример добавления `GameplayTag` в C++:
```c++
FGameplayTag StunTag = FGameplayTag::RequestGameplayTag(FName("State.Debuff.Stun"));
AbilitySystemComponent->AddLooseGameplayTag(StunTag);
```

## Хранение `GameplayTags`:

`GameplayTags` обычно хранятся в `FGameplayTagContainer`, который более эффективен, чем `TArray<FGameplayTag>`, благодаря оптимизации для репликации и поиска. `FGameplayTagContainer` может содержать несколько `GameplayTags` и предоставляет методы для их эффективного управления.

Пример использования `FGameplayTagContainer`:
```c++
FGameplayTagContainer TagContainer;
TagContainer.AddTag(FGameplayTag::RequestGameplayTag(FName("State.Debuff.Stun")));
TagContainer.AddTag(FGameplayTag::RequestGameplayTag(FName("State.Buff.Invisible")));
```

## Управление `GameplayTags`:

`GameplayTags` должны быть определены заранее в файле `DefaultGameplayTags.ini`. Unreal Engine предоставляет интерфейс в настройках проекта для управления `GameplayTags` без необходимости ручного редактирования `.ini` файла. В редакторе `GameplayTag` можно создавать, переименовывать, искать ссылки и удалять теги.

Пример определения `GameplayTags` в `DefaultGameplayTags.ini`:
```ini
[/Script/GameplayTags.GameplayTagsList]
+GameplayTagList=(Tag="State.Debuff.Stun",DevComment="Character is stunned")
+GameplayTagList=(Tag="State.Debuff.Freeze",DevComment="Character is frozen")
+GameplayTagList=(Tag="State.Buff.Invisible",DevComment="Character is invisible")
```

## Реагирование на изменения `GameplayTags`:

`UAbilitySystemComponent` предоставляет делегат для отслеживания добавления или удаления `GameplayTags`. Этот делегат может быть настроен на срабатывание только при добавлении/удалении тега или при любом изменении `TagMapCount`.

Пример регистрации делегата в C++:
```c++
AbilitySystemComponent->RegisterGameplayTagEvent(FGameplayTag::RequestGameplayTag(FName("State.Debuff.Stun")), EGameplayTagEventType::NewOrRemoved).AddUObject(this, &AGDPlayerState::StunTagChanged);
```

Функция обратного вызова:
```c++
virtual void StunTagChanged(const FGameplayTag CallbackTag, int32 NewCount);
```

## Загрузка `GameplayTags` из плагинов:

Если вы создаете плагин с собственными `.ini` файлами с `GameplayTags`, вы можете загрузить эти теги в своем плагине в функции `StartupModule()`.

Пример загрузки `GameplayTags` из плагина:
```c++
void FCommonConversationRuntimeModule::StartupModule()
{
    TSharedPtr<IPlugin> ThisPlugin = IPluginManager::Get().FindPlugin(TEXT("CommonConversation"));
    check(ThisPlugin.IsValid());
  
    UGameplayTagsManager::Get().AddTagIniSearchPath(ThisPlugin->GetBaseDir() / TEXT("Config") / TEXT("Tags"));

    //...
}
```

Этот код загрузит все `.ini` файлы с `GameplayTags` из директории `Plugins\CommonConversation\Config\Tags` при запуске движка, если плагин включен.

# Подробно `(Доскональный перевод первоисточника)`

[`FGameplayTags`](https://docs.unrealengine.com/en-US/API/Runtime/GameplayTags/FGameplayTag/index.html) — это иерархические имена в форме `Parent.Child.Grandchild...`, которые регистрируются в `GameplayTagManager`. Эти теги невероятно полезны для классификации и описания состояния объекта. Например, если персонаж ошеломлен, мы можем дать ему `State.Debuff.Stun` `GameplayTag` на время ошеломления.

Вы обнаружите, что заменяете вещи, которые вы использовали для обработки с помощью булевых значений или перечислений, на `GameplayTags` и выполняете булеву логику относительно того, имеют ли объекты определенные `GameplayTags`.

При назначении тегов объекту мы обычно добавляем их в его `ASC`, если он есть, чтобы GAS мог с ними взаимодействовать. `UAbilitySystemComponent` реализует `IGameplayTagAssetInterface`, предоставляя функции для доступа к его собственным `GameplayTags`.

Несколько `GameplayTags` можно хранить в `FGameplayTagContainer`. Предпочтительно использовать `GameplayTagContainer` вместо `TArray<FGameplayTag>`, поскольку `GameplayTagContainers` добавляют некоторую магию эффективности. Хотя теги являются стандартными `FNames`, их можно эффективно упаковать вместе в `FGameplayTagContainers` для репликации, если в настройках проекта включена `Fast Replication`. `Fast Replication` требует, чтобы у сервера и клиентов был одинаковый список `GameplayTags`. Обычно это не должно быть проблемой, поэтому вам следует включить эту опцию. `GameplayTagContainers` также может возвращать `TArray<FGameplayTag>` для итерации.

`GameplayTags`, хранящиеся в `FGameplayTagCountContainer`, имеют `TagMap`, в котором хранится количество экземпляров этого `GameplayTag`. `FGameplayTagCountContainer` может по-прежнему иметь `GameplayTag`, но его `TagMapCount` равен нулю. Вы можете столкнуться с этим во время отладки, если `ASC` по-прежнему имеет `GameplayTag`. Любая из `HasTag()` или `HasMatchingTag()` или подобных функций будет проверять `TagMapCount` и возвращать false, если `GameplayTag` отсутствует или его `TagMapCount` равен нулю.

`GameplayTags` должны быть определены заранее в `DefaultGameplayTags.ini`. Редактор Unreal Engine предоставляет интерфейс в настройках проекта, позволяющий разработчикам управлять `GameplayTags` без необходимости вручную редактировать `DefaultGameplayTags.ini`. Редактор `GameplayTag` может создавать, переименовывать, искать ссылки и удалять `GameplayTags`.

![Редактор GameplayTag в настройках проекта](https://github.com/tranek/GASDocumentation/raw/master/Images/gameplaytageditor.png)

Поиск ссылок `GameplayTag` вызовет знакомый график `Reference Viewer` в редакторе, показывающий все ресурсы, ссылающиеся на `GameplayTag`. Однако это не покажет классы C++, ссылающиеся на `GameplayTag`.

Переименование `GameplayTags` создает перенаправление, так что ресурсы, все еще ссылающиеся на исходный `GameplayTag`, могут перенаправляться на новый `GameplayTag`. Я предпочитаю, если это возможно, вместо этого создать новый `GameplayTag`, обновить все ссылки вручную на новый `GameplayTag`, а затем удалить старый `GameplayTag`, чтобы избежать создания перенаправления.

В дополнение к `Fast Replication`, редактор `GameplayTag` имеет возможность заполнять часто реплицируемые `GameplayTags` для их дальнейшей оптимизации.

`GameplayTags` реплицируются, если они добавлены из `GameplayEffect`. `ASC` позволяет добавлять `LooseGameplayTags`, которые не реплицируются и должны управляться вручную. Sample Project использует `LooseGameplayTag` для `State.Dead`, чтобы владельцы могли немедленно отреагировать, когда их здоровье падает до нуля. Возрождение вручную устанавливает `TagMapCount` обратно на ноль. Только вручную корректируйте `TagMapCount` при работе с `LooseGameplayTags`. Предпочтительнее использовать функции `UAbilitySystemComponent::AddLooseGameplayTag()` и `UAbilitySystemComponent::RemoveLooseGameplayTag()`, чем вручную настраивать `TagMapCount`.

Получение ссылки на `GameplayTag` в C++:
```c++
FGameplayTag::RequestGameplayTag(FName("Your.GameplayTag.Name"))
```

Для расширенных манипуляций с `GameplayTag`, таких как получение родительского или дочернего `GameplayTags`, посмотрите на функции, предлагаемые `GameplayTagManager`. Чтобы получить доступ к `GameplayTagManager`, включите `GameplayTagManager.h` и вызовите его с помощью `UGameplayTagManager::Get().FunctionName`. `GameplayTagManager` на самом деле хранит `GameplayTags` как реляционные узлы (родительские, дочерние и т. д.) для более быстрой обработки, чем постоянные манипуляции со строками и сравнения.

`GameplayTags` и `GameplayTagContainers` могут иметь необязательный спецификатор `UPROPERTY` `Meta = (Categories = "GameplayCue")`, который фильтрует теги в Blueprint, чтобы показывать только `GameplayTags`, имеющие родительский тег `GameplayCue`. Это полезно, когда вы знаете, что переменная `GameplayTag` или `GameplayTagContainer` должна использоваться только для `GameplayCues`.

В качестве альтернативы существует отдельная структура под названием `FGameplayCueTag`, которая инкапсулирует `FGameplayTag`, а также автоматически фильтрует `GameplayTags` в Blueprint, чтобы отображать только те теги с родительским тегом `GameplayCue`.

Если вы хотите отфильтровать параметр `GameplayTag` в функции, используйте спецификатор `UFUNCTION` `Meta = (GameplayTagFilter = "GameplayCue")`. Параметры `GameplayTagContainer` в функциях не могут быть отфильтрованы. Если вы хотите отредактировать свой движок, чтобы разрешить это, посмотрите, как `SGameplayTagGraphPin::ParseDefaultValueData()` из `Engine\Plugins\Editor\GameplayTagsEditor\Source\GameplayTagsEditor\Private\SGameplayTagGraphPin.cpp` вызывает `FilterString = UGameplayTagsManager::Get().GetCategoriesMetaFromField(PinStructType);` и передает `FilterString` в `SGameplayTagWidget` в `SGameplayTagGraphPin::GetListContent()`. Версия `GameplayTagContainer` этих функций в `Engine\Plugins\Editor\GameplayTagsEditor\Source\GameplayTagsEditor\Private\SGameplayTagContainerGraphPin.cpp` не проверяет свойства метаполя и передает фильтр.

В проекте Sample Project широко используется `GameplayTags`.

## Реагирование на изменения в тегах игрового процесса

`ASC` предоставляет делегата для добавления или удаления `GameplayTags`. Он принимает `EGameplayTagEventType`, который может указывать только на срабатывание при добавлении/удалении `GameplayTag` или при любом изменении в `GameplayTag` `TagMapCount`.

```c++
AbilitySystemComponent->RegisterGameplayTagEvent(FGameplayTag::RequestGameplayTag(FName("State.Debuff.Stun")), EGameplayTagEventType::NewOrRemoved).AddUObject(this, &AGDPlayerState::StunTagChanged);
```

Функция обратного вызова имеет параметр для `GameplayTag` и новый `TagCount`.
```c++
virtual void StunTagChanged(const FGameplayTag CallbackTag, int32 NewCount);
```

## Загрузка игровых тегов из файлов .ini плагина

Если вы создаете плагин с собственными файлами .ini с помощью `GameplayTags`, вы можете загрузить каталог `GameplayTag` .ini этого плагина в функцию `StartupModule()` вашего плагина.

Например, вот как это делает плагин CommonConversation, который поставляется с Unreal Engine:

```c++
void FCommonConversationRuntimeModule::StartupModule()
{
TSharedPtr<IPlugin> ThisPlugin = IPluginManager::Get().FindPlugin(TEXT("CommonConversation"));
check(ThisPlugin.IsValid());

UGameplayTagsManager::Get().AddTagIniSearchPath(ThisPlugin->GetBaseDir() / TEXT("Config") / TEXT("Tags"));

//...
}
```

Это будет искать каталог `Plugins\CommonConversation\Config\Tags` и загружать любые файлы .ini с `GameplayTags` в них в ваш проект при запуске движка, если плагин включен.