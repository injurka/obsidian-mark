## Общая иерархия

Отличный вопрос! Правильная структура папок и файлов — это основа для масштабируемого и понятного проекта в Unreal Engine, особенно если над ним будет работать несколько человек или вы вернетесь к нему через некоторое время.

Вот рекомендуемый подход, основанный на общепринятых практиках и ориентированный на масштабируемость:

**Основные Принципы:**

1.  **Группировка по Фиче (Feature-Based):** Это самый масштабируемый подход. Вместо группировки по типу ассета (все меши в одной папке, все блюпринты в другой), вы группируете все ассеты, относящиеся к конкретной фиче или системе, вместе.
2.  **Консистентность:** Используйте одинаковую логику и именование во всем проекте.
3.  **Четкие Имена:** Имена папок и файлов должны быть понятными и отражать их содержимое или назначение. Используйте `PascalCase` для имен папок и файлов.
4.  **Стандартные Префиксы/Суффиксы:** Используйте общепринятые префиксы для типов ассетов (см. ниже).

**Рекомендуемая Структура Папок в `Content`:**

```q
Content/
├── Core                   # Основные системы, не привязанные к конкретной фиче (базовые классы, GameInstance, Core GameMode)
│   ├── Blueprints         # Базовые BP (GM_Core, GI_GameInstance, BaseCharacter, BaseController)
│   ├── Data             # Глобальные Data Tables, Structs, Enums
│   └── Systems          # Подсистемы (например, SaveSystem, InputHandling)
│
├── Features               # Папки для конкретных игровых фич/модулей
│   ├── Character          # Все связанное с главным персонажем
│   │   ├── Blueprints     # BP_PlayerCharacter, BP_PlayerController, Components (AC_Health), AnimBP
│   │   ├── Art            # Ассеты арта для персонажа
│   │   │   ├── Meshes     # Skeletal Mesh (SK_Character), Static Meshes (SM_Helmet)
│   │   │   ├── Textures   # Textures (T_Character_D, T_Character_N)
│   │   │   └── Materials  # Materials (M_Character, MI_Character_Red)
│   │   ├── Animations     # Animations (A_Walk, A_Jump_Montage), BlendSpaces (BS_Locomotion)
│   │   └── Sounds         # Звуки персонажа (S_Footstep, S_Jump)
│   │
│   ├── Weapons            # Система оружия
│   │   ├── Blueprints     # BP_BaseWeapon, BP_Rifle, BP_Projectile
│   │   ├── Art            # Меши, текстуры, материалы для оружия
│   │   └── Sounds         # Звуки выстрелов, перезарядки
│   │
│   ├── AI                 # Искусственный интеллект
│   │   ├── Blueprints     # BP_AIController, BT_EnemyBehavior, BB_EnemyBlackboard
│   │   ├── Characters     # BP для конкретных типов врагов (BP_EnemyGrunt)
│   │   └── Art            # Арт для AI (если отличается от обычных персонажей)
│   │
│   └── Lobby              # Все связанное с лобби и созданием игры (Как запрошено в пред. вопросе)
│       ├── Blueprints     # GM_Lobby, PC_Lobby
│       ├── UI             # WBP_Lobby, WBP_CharacterSelectButton (Если UI тесно связан только с лобби)
│       └── Data           # DT_CharacterList
│
├── Environments           # Ассеты для окружения, сгруппированные по типу или локации
│   ├── Forest             # Ассеты для лесной локации
│   │   ├── Meshes
│   │   ├── Textures
│   │   └── Materials
│   ├── Shared             # Общие ассеты окружения (небо, общие материалы ландшафта)
│   │   ├── Materials
│   │   └── Textures
│   └── Props              # Отдельные объекты окружения (бочки, ящики)
│       ├── Meshes
│       ├── Textures
│       └── Materials
│
├── UI                     # Все связанное с пользовательским интерфейсом (UMG)
│   ├── MainMenu           # Виджеты и ассеты для главного меню
│   │   ├── Widgets        # WBP_MainMenu, WBP_SettingsMenu
│   │   └── Textures       # T_Button_Normal, T_Logo
│   ├── HUD                # Виджеты и ассеты для игрового HUD
│   │   └── Widgets        # WBP_HUD, WBP_HealthBar
│   ├── Shared             # Общие элементы UI (стили кнопок, шрифты, иконки)
│   │   ├── Fonts
│   │   ├── Icons
│   │   ├── Widgets        # WBP_GenericButton
│   │   └── Materials      # Материалы для UI
│   └── Fonts              # Файлы шрифтов
│
├── Maps                   # Все уровни (карты) проекта
│   ├── MainMenu           # L_MainMenu
│   ├── Lobby              # L_CharacterSelect (или L_Lobby)
│   ├── Game               # Игровые уровни
│   │   ├── World1         # L_Level1, L_Level1_Lighting
│   │   └── Arena          # L_Arena_PVP
│   └── Testing            # Уровни для тестов и прототипирования
│       └── LT_FeatureTest
│
├── Audio                  # Общие аудио ассеты (музыка, эмбиент)
│   ├── Music
│   ├── Ambient
│   └── SoundClasses       # SC_...
│   └── SoundMixes         # SM_...
│
├── Cinematics             # Ассеты для катсцен (Sequencer)
│   └── Sequences          # LS_IntroSequence
│
├── ThirdParty             # Контент из Marketplace или других внешних источников
│   └── [AssetName]        # Сохраняйте оригинальную структуру папок ассета здесь
│
└── Developers             # Папки для личных экспериментов разработчиков (не идет в финальную сборку)
    └── [YourName]         # Ваша личная "песочница"
```

**Стандартные Префиксы для Именования Файлов:**

*   `L_` или `LVL_`: Level (Уровень)
*   `BP_`: Blueprint Class (Актёры, Компоненты и др.)
*   `WBP_`: Widget Blueprint (UI)
*   `GM_`: Game Mode
*   `GS_`: Game State
*   `GI_`: Game Instance
*   `PC_`: Player Controller
*   `PS_`: Player State
*   `AC_`: Actor Component
*   `SK_`: Skeletal Mesh
*   `SM_`: Static Mesh
*   `MI_`: Material Instance
*   `M_`: Material
*   `MF_`: Material Function
*   `T_`: Texture (Суффиксы: `_D` Diffuse/BaseColor, `_N` Normal, `_M` Mask, `_RMA` Roughness/Metallic/AO, `_E` Emissive)
*   `A_`: Animation Sequence
*   `ABP_` или `AnimBP_`: Animation Blueprint
*   `BS_`: Blend Space
*   `AM_`: Animation Montage
*   `S_` или `SFX_` или `AUD_`: Sound Wave (Аудиофайл)
*   `SC_`: Sound Cue
*   `DT_`: Data Table
*   `E_`: Enumeration
*   `ST_` или `F_`: Struct
*   `MPC_`: Material Parameter Collection
*   `RT_`: Render Target
*   `DE_`: Decal
*   `NI_` или `NS_`: Niagara System
*   `NE_`: Niagara Emitter
*   `LS_`: Level Sequence (Cinematics)

## Развернутое представление

### Core 
```q
Content/
└── _Core                     # Фундаментальные, не привязанные к фичам элементы игры
    ├── Blueprints            # Основные Блюпринты базовых классов и систем
    │   ├── Actors            # Базовые акторы, не являющиеся частью GameFramework
    │   │   ├── BP_BaseInteractable.uasset      # Родительский класс для всех интерактивных объектов (Сундуки, Станции, Порталы)
    │   │   ├── BP_WorldEventManager.uasset     # (Опционально) Актор для управления глобальными событиями на уровне (астероидный дождь, волны врагов)
    │   │   └── BP_DebugDisplayActor.uasset     # (Опционально) Актор для вывода отладочной информации в мире
    │   │
    │   ├── Components        # Базовые, переиспользуемые Actor Components
    │   │   ├── AC_InventoryComponent_Base.uasset # Базовая логика хранения предметов (возможно, только для "запчастей" или ресурсов)
    │   │   ├── AC_InputHandlerComponent.uasset   # (Опционально) Компонент для инкапсуляции логики Enhanced Input на акторе
    │   │   ├── AC_DebugComponent.uasset          # (Опционально) Компонент для добавления отладочных функций любому актору
    │   │   └── ...                               # Другие базовые компоненты, если понадобятся
    │   │
    │   ├── GameFramework     # Основные классы игрового фреймворка Unreal Engine
    │   │   ├── BP_BaseChassis.uasset           # Главный родительский класс для ВСЕХ Шасси (Typhon, Phantom и т.д.). *Содержит AbilitySystemComponent*.
    │   │   ├── BP_BasePlayerController.uasset  # Базовый контроллер игрока (обработка ввода, управление камерой, инициализация ASC на клиенте)
    │   │   ├── GM_FrameForge_Menu.uasset       # GameMode для Главного Меню и Лобби (простая логика, без спавна Шасси)
    │   │   ├── GM_FrameForge_Gameplay.uasset   # GameMode для основного игрового цикла (забегов) (логика спавна, управление циклом игры, связь с DifficultySubsystem)
    │   │   ├── GS_FrameForge_Gameplay.uasset   # GameState для игрового цикла (репликация таймера, уровня сложности, глобальных Gameplay Cues/Effects)
    │   │   ├── GI_FrameForge.uasset            # GameInstance (хранение мета-прогрессии, разблокировок, глобальных настроек между сессиями)
    │   │   └── PS_FrameForgePlayer.uasset      # PlayerState (репликация ресурсов игрока, возможно, владелец ASC и атрибутов игрока)
    │   │
    │   ├── GAS                   # Фундаментальные элементы Gameplay Ability System
    │   │   ├── AttributeSets       # Наборы Атрибутов
    │   │   │   └── AS_BaseAttributes.uasset  # Основные атрибуты (Здоровье, МаксЗдоровье, Энергия, МаксЭнергия, Броня, Скорость Передвижения и т.д.) - используется BP_BaseChassis и, возможно, AI
    │   │   │
    │   │   ├── Abilities           # Базовые, общие Способности
    │   │   │   ├── GA_Interact_Generic.uasset # Способность для взаимодействия с BPI_Interactable
    │   │   │   ├── GA_Jump_Default.uasset     # (Если используется GAS для прыжка)
    │   │   │   └── GA_Debug_KillSelf.uasset   # (Отладочная способность)
    │   │   │
    │   │   ├── GameplayEffects     # Базовые Gameplay Effects (GE) - шаблоны и общие эффекты
    │   │   │   ├── Damage          # GE_Damage_Physical_Base.uasset, GE_Damage_Energy_Base.uasset, GE_Damage_DOT_Burn_Base.uasset
    │   │   │   ├── Healing         # GE_Heal_Instant_Base.uasset, GE_Heal_OverTime_Base.uasset
    │   │   │   ├── Buffs           # GE_Buff_MoveSpeed_Base.uasset, GE_Buff_Armor_Base.uasset
    │   │   │   ├── Debuffs         # GE_Debuff_Slow_Base.uasset, GE_Debuff_ArmorReduce_Base.uasset
    │   │   │   ├── Status          # GE_Status_Stun_Base.uasset, GE_Status_Freeze_Base.uasset
    │   │   │   ├── Costs           # GE_Cost_Energy_Template.uasset, GE_Cost_Health_Template.uasset
    │   │   │   ├── Cooldowns       # GE_Cooldown_Template.uasset # Шаблон для кулдаунов способностей
    │   │   │   └── Utility         # GE_InfiniteDuration_Template.uasset, GE_ApplyTag_Base.uasset
    │   │   │
    │   │   ├── AbilityTasks        # Кастомные Ability Tasks (если нужны)
    │   │   │   └── AT_WaitTargetDataHitScan.uasset # Пример задачи ожидания данных от HitScan
    │   │   │
    │   │   ├── GameplayCueNotify   # Базовые Gameplay Cues (визуальные/звуковые эффекты для GAS) - могут быть BP или Static
    │   │   │   ├── GCN_GenericDamage_Impact_Flesh.uasset
    │   │   │   ├── GCN_GenericDamage_Impact_Metal.uasset
    │   │   │   ├── GCN_Character_Landed.uasset
    │   │   │   ├── GCN_Status_Stun_Start.uasset
    │   │   │   └── GCN_OutOfEnergy_Feedback.uasset
    │   │   │
    │   │   └── Calculations        # Gameplay Effect Calculations (если используются C++ классы для сложных вычислений)
    │   │       └── GEC_DamageCalculation_Base.uasset # Базовый класс для расчета урона (учитывает броню и т.д.)
    │   │
    │   └── Systems               # Глобальные игровые подсистемы (часто реализуются как UE Subsystems)
    │       ├── BP_DifficultySubsystem.uasset       # Управляет логикой повышения сложности (от времени, от стадии)
    │       ├── BP_MetaProgressionSubsystem.uasset  # Управляет разблокировкой Шасси, Предметов между забегами (читает/пишет в GI)
    │       ├── BP_SaveLoadSubsystem.uasset         # Отвечает за сохранение/загрузку данных мета-прогрессии
    │       ├── BP_GlobalEventSubsystem.uasset      # Координирует запуск случайных событий в мире (связь с BP_WorldEventManager, если он есть)
    │       └── BP_AudioManagerSubsystem.uasset     # Централизованное управление музыкой, уровнями громкости SFX, возможно, динамической музыкой
    │
    ├── Data                      # Глобальные данные, структуры, таблицы
    │   ├── DataTables            # Таблицы данных
    │   │   ├── DT_GlobalGameSettings.uasset    # Глобальные настройки игры (стартовая сложность, множители и т.п.)
    │   │   ├── DT_MetaProgressionUnlocks.uasset # Таблица всех возможных разблокировок (Шасси, Предметы) и их стоимость/условия
    │   │   ├── DT_DamageTypes.uasset           # (Опционально) Описание типов урона и их взаимодействия
    │   │   └── DT_InputBindingsDisplay.uasset  # (Опционально) Тексты и иконки для отображения настроек управления
    │   │
    │   ├── Enums                 # Перечисления (Enums)
    │   │   ├── EGameState.uasset             # Возможные состояния игры (MainMenu, Lobby, Loading, Playing, Paused, GameOver)
    │   │   ├── EDifficultyLevel.uasset       # Уровни сложности (Easy, Normal, Hard, Insane, etc.)
    │   │   ├── EAbilityInputID.uasset        # Идентификаторы для привязки ввода к способностям GAS (Primary, Secondary, Utility, Movement, etc.)
    │   │   ├── EChassisType.uasset           # Идентификаторы типов Шасси (Typhon, Phantom, Vector, Technic)
    │   │   ├── ESlotType.uasset              # Идентификаторы типов слотов (Weapon, Component, Ability, Movement, Support, Heavy)
    │   │   ├── EItemRarity.uasset            # Редкость предметов (Common, Uncommon, Rare, Legendary, Boss, Special)
    │   │   ├── EDamageType.uasset            # Типы урона (Physical, Energy, Fire, Cold, Acid, Explosive)
    │   │   └── EInteractionType.uasset       # Типы взаимодействия (OpenChest, UseStation, PickupItem, TalkNPC)
    │   │
    │   ├── Structs               # Структуры данных
    │   │   ├── FDamageInfo.uasset            # Структура для передачи информации об уроне (Источник, Цель, Величина, Тип, Критический ли)
    │   │   ├── FMetaUnlockEntry.uasset       # Структура для записи в DT_MetaProgressionUnlocks
    │   │   ├── FInteractableData.uasset      # Данные для отображения подсказки взаимодействия (Текст, Тип, Стоимость)
    │   │   └── FResourceAmount.uasset        # Структура для представления количества ресурса (Тип Ресурса, Количество)
    │   │
    │   └── DataAssets            # Ассеты данных (альтернатива таблицам для некоторых настроек)
    │       ├── DA_GlobalConfig.uasset          # Может содержать базовые настройки игры, ссылки на важные ассеты
    │       └── DA_InputConfig.uasset           # Содержит ссылки на Input Actions и Mapping Contexts для удобства управления
    │
    ├── Input                     # Система Enhanced Input
    │   ├── Actions               # Input Actions (IA) - описывают действие
    │   │   ├── IA_Move.uasset
    │   │   ├── IA_Look.uasset
    │   │   ├── IA_Jump.uasset
    │   │   ├── IA_Fire.uasset                # Основная атака (ЛКМ/RT)
    │   │   ├── IA_AltFire.uasset             # Альтернативная атака (ПКМ/LT), если будет
    │   │   ├── IA_Ability_Primary.uasset     # (Например, Q / LB) - Привязывается к InputID в GAS
    │   │   ├── IA_Ability_Secondary.uasset   # (Например, E / RB) - Привязывается к InputID в GAS
    │   │   ├── IA_Ability_Utility.uasset     # (Например, Shift / X) - Привязывается к InputID в GAS
    │   │   ├── IA_Ability_Movement.uasset    # (Например, Пробел в воздухе / A) - Привязывается к InputID в GAS
    │   │   ├── IA_Interact.uasset            # (Например, F / Y)
    │   │   ├── IA_Reload.uasset              # (Например, R / B)
    │   │   ├── IA_OpenMenu.uasset            # (Например, Tab - Инвентарь/Шасси)
    │   │   ├── IA_PauseGame.uasset           # (Например, Escape / Start)
    │   │   ├── IA_AbilityConfirm.uasset      # Подтверждение для способностей с таргетингом
    │   │   └── IA_AbilityCancel.uasset       # Отмена для способностей с таргетингом
    │   │
    │   └── Mappings              # Input Mapping Contexts (IMC) - привязывают Actions к кнопкам
    │       ├── IMC_Gameplay_Base.uasset      # Основной контекст для геймплея (загружается для всех Шасси)
    │       ├── IMC_Menu_Base.uasset          # Контекст для навигации в меню
    │       └── IMC_Spectator.uasset          # (Если будет режим наблюдателя)
    │
    ├── Interfaces                # Blueprint Interfaces (Контракты взаимодействия)
    │   ├── BPI_Interactable.uasset           # Функции: CanInteract, OnInteractBegin, OnInteractEnd, GetInteractionData
    │   ├── BPI_Damageable.uasset             # Функции: ApplyDamageInfo, GetHealthAttributes, IsAlive (может быть заменен чисто на GAS)
    │   ├── BPI_GAS_AbilitySystem.uasset      # Функции: GetAbilitySystemComponent, GetAvatarActor (для удобного доступа к ASC)
    │   ├── BPI_GameInstance_Data.uasset      # Функции: RequestSaveMeta, RequestLoadMeta, GetUnlockableStatus, GrantUnlockable
    │   └── BPI_PlayerState_Resources.uasset  # Функции: GetResourceAmount, AddResource, CanAffordCost
    │
    ├── Libraries                 # Blueprint Function Libraries (Наборы статических функций)
    │   ├── BFL_MathHelpers.uasset            # Общие математические утилиты (ClampAngle, NormalizeVectorOptional и т.д.)
    │   ├── BFL_DebugHelpers.uasset           # Утилиты для рисования отладочной информации (DrawDebugSphereAdvanced и т.д.)
    │   ├── BFL_GAS_Helpers.uasset            # Утилиты для работы с GAS (ApplyGameplayEffectToTargetSafely, HasTag, GetAttributeValueChecked)
    │   └── BFL_ArrayHelpers.uasset           # Утилиты для работы с массивами (Shuffle, GetRandomElementSafe)
    │
    ├── Materials                 # Базовые/Общие материалы (не привязанные к фичам)
    │   ├── Debug                 # M_Debug_Red.uasset, M_Debug_Collision.uasset
    │   └── UI                    # M_UI_Core_Background.uasset (если есть очень базовый фон)
    │
    ├── Audio                     # Базовые/Общие звуки
    │   ├── SFX                   # Звуковые эффекты
    │   │   ├── UI                # SFX_UI_Core_ButtonClick.uasset, SFX_UI_Core_Hover.uasset, SFX_UI_Core_Error.uasset
    │   │   └── System            # SFX_System_GameStart.uasset, SFX_System_Pause.uasset
    │   └── System                # Ассеты настройки звука
    │       ├── SoundClasses      # SC_Master.uasset, SC_Music.uasset, SC_SFX_Gameplay.uasset, SC_SFX_UI.uasset
    │       └── SoundMixes        # SM_Gameplay_Default.uasset, SM_Menu_Paused.uasset
    │
    └── VFX                       # Базовые/Общие визуальные эффекты
        ├── Debug                 # NS_Debug_SphereMarker.uasset, NS_Debug_LineTrace.uasset
        └── Impacts               # NS_Core_GenericImpact_World.uasset (самый базовый эффект попадания)
```

### Features

```q
Content/
└── Features                  # Основные Игровые Фичи (Модули, Шасси, Враги и т.д.)
    ├── Chassis               # Всё о Играбельных Шасси
    │   ├── Blueprints        # Логика Шасси
    │   │   ├── Base          # (BP_BaseChassis находится в _Core/Blueprints/GameFramework)
    │   │   ├── Player        # Конкретные играбельные Шасси
    │   │   │   ├── BP_PlayerChassis_Typhon.uasset    # Наследуется от BP_BaseChassis
    │   │   │   ├── BP_PlayerChassis_Phantom.uasset   # Наследуется от BP_BaseChassis
    │   │   │   ├── BP_PlayerChassis_Vector.uasset    # Наследуется от BP_BaseChassis
    │   │   │   └── BP_PlayerChassis_Technic.uasset   # Наследуется от BP_BaseChassis
    │   │   └── Components    # Компоненты, специфичные для Шасси
    │   │       ├── AC_ChassisSlotManager.uasset      # Управляет слотами (оружие, модули, компоненты) на Шасси
    │   │       ├── AC_VisualAttachmentManager.uasset # Управляет прикреплением/откреплением визуальных мешей модулей/оружия
    │   │       └── AC_ChassisStatsComponent.uasset   # (Альтернатива GAS Attributes) Компонент для хранения и управления доп. статами Шасси, если не все в GAS
    │   │
    │   ├── GAS               # Gameplay Ability System специфичный для Шасси
    │   │   ├── Abilities     # Уникальные способности Шасси (не от модулей)
    │   │   │   ├── BaseAttacks # Встроенные атаки (если не заменены оружием)
    │   │   │   │   ├── GA_Chassis_Typhon_BaseMelee.uasset
    │   │   │   │   ├── GA_Chassis_Phantom_BaseBlade.uasset
    │   │   │   │   ├── GA_Chassis_Vector_BasePulse.uasset
    │   │   │   │   └── GA_Chassis_Technic_BaseShock.uasset
    │   │   │   └── Passives    # (Если реализуются через способности)
    │   │   │       └── GA_Chassis_Vector_CritBonus_Passive.uasset # Способность, применяющая GE бонуса к криту
    │   │   │
    │   │   ├── GameplayEffects # Уникальные пассивные эффекты Шасси
    │   │   │   ├── GE_Chassis_Typhon_InnateArmor.uasset
    │   │   │   ├── GE_Chassis_Phantom_InnateSpeed.uasset
    │   │   │   ├── GE_Chassis_Vector_InnateCritChance.uasset
    │   │   │   └── GE_Chassis_Technic_InteractionCostReduction.uasset
    │   │   │
    │   │   └── AttributeSets # (Если у Шасси есть уникальные атрибуты сверх базовых)
    │   │       └── AS_Typhon_HeavySlotCharge.uasset # Пример: Уникальный ресурс для Тяжелого Слота Тифона
    │   │
    │   ├── Art               # Визуальные Ассеты Шасси
    │   │   ├── Shared        # Общие элементы для всех Шасси
    │   │   │   ├── Meshes    # SK_Chassis_BaseSkeleton.uasset (Общий скелет, если возможно)
    │   │   │   ├── Materials # M_Chassis_Master.uasset, MI_Chassis_DamageOverlay.uasset
    │   │   │   └── Textures  # T_Chassis_Shared_Details_N.uasset
    │   │   │
    │   │   ├── Typhon        # Ассеты для Шасси "Тифон"
    │   │   │   ├── Meshes    # SK_Chassis_Typhon.uasset, SM_Typhon_ShoulderPlate.uasset (Пример аттачмента)
    │   │   │   ├── Textures  # T_Chassis_Typhon_D.uasset, T_Chassis_Typhon_N.uasset, T_Chassis_Typhon_M.uasset
    │   │   │   └── Materials # MI_Chassis_Typhon_Default.uasset, MI_Chassis_Typhon_Damaged.uasset
    │   │   │
    │   │   ├── Phantom       # Ассеты для Шасси "Фантом"
    │   │   │   ├── Meshes    # SK_Chassis_Phantom.uasset
    │   │   │   ├── Textures  # T_Chassis_Phantom_D.uasset
    │   │   │   └── Materials # MI_Chassis_Phantom.uasset
    │   │   │
    │   │   ├── Vector        # Ассеты для Шасси "Вектор"
    │   │   │   └── ...
    │   │   │
    │   │   └── Technic       # Ассеты для Шасси "Техник"
    │   │       └── ...
    │   │
    │   ├── Animations        # Анимации Шасси
    │   │   ├── Base          # Ассеты, используемые базовым AnimBP
    │   │   │   ├── ABP_BaseChassis.uasset      # Основной Animation Blueprint для всех Шасси
    │   │   │   ├── BS_Locomotion_Ground.uasset # BlendSpace для передвижения по земле
    │   │   │   ├── BS_Locomotion_Air.uasset    # BlendSpace для состояния в воздухе
    │   │   │   ├── A_Base_Idle.uasset
    │   │   │   ├── A_Base_Walk_F.uasset
    │   │   │   ├── A_Base_Run_F.uasset
    │   │   │   ├── A_Base_Jump_Start.uasset
    │   │   │   ├── A_Base_Jump_Loop.uasset
    │   │   │   ├── A_Base_Jump_End.uasset
    │   │   │   ├── AM_Interact_Generic.uasset  # Монтаж для общего взаимодействия
    │   │   │   └── AM_HitReact_Generic.uasset  # Монтаж для реакции на попадание
    │   │   │
    │   │   ├── Typhon        # Специфичные анимации/монтажи для Тифона
    │   │   │   ├── AM_Typhon_BaseMelee_Attack.uasset
    │   │   │   └── A_Typhon_HeavyStomp_Idle.uasset
    │   │   │
    │   │   ├── Phantom       # Специфичные анимации/монтажи для Фантома
    │   │   │   ├── AM_Phantom_BaseBlade_Combo.uasset
    │   │   │   └── A_Phantom_Agile_Idle.uasset
    │   │   │
    │   │   ├── Vector        # ... Специфичные анимации Вектора ...
    │   │   ├── Technic       # ... Специфичные анимации Техника ...
    │   │   │
    │   │   └── GameplayCueNotify # Анимационные Gameplay Cues для Шасси
    │   │       ├── GCN_Chassis_JumpLaunch.uasset   # Эффект/анимация при прыжке
    │   │       ├── GCN_Chassis_HardLand.uasset     # Эффект/анимация при жестком приземлении
    │   │       ├── GCN_Chassis_Typhon_MeleeSwing.uasset # Анимация удара Тифона через GCN
    │   │       └── GCN_Chassis_Footstep_Default.uasset # (Может быть здесь или в Audio)
    │   │
    │   ├── Audio             # Звуки, специфичные для Шасси
    │   │   ├── Typhon        # SFX_Chassis_Typhon_Footstep_Heavy.uasset, SFX_Chassis_Typhon_Melee_Whoosh.uasset
    │   │   ├── Phantom       # SFX_Chassis_Phantom_Footstep_Light.uasset, SFX_Chassis_Phantom_Blade_Slice.uasset
    │   │   ├── Vector        # SFX_Chassis_Vector_Pulse_Fire.uasset
    │   │   └── Technic       # SFX_Chassis_Technic_Shock_Discharge.uasset
    │   │
    │   └── Data              # Таблицы данных для Шасси
    │       └── DT_ChassisBaseConfig.uasset # Стартовые статы, слоты, базовая атака (ссылка на GA_), начальные GE
    │
    ├── Items                 # Модули, Компоненты, Предметы и связанные Системы
    │   ├── Blueprints        # Логика Предметов
    │   │   ├── Base          # Базовые классы для Предметов
    │   │   │   ├── BP_ItemPickup.uasset              # Актор, который лежит на земле и может быть подобран
    │   │   │   ├── BP_BaseModule_DataAsset.uasset    # Базовый Data Asset для хранения данных Модуля (тип слота, иконка, ссылка на GA/GE)
    │   │   │   ├── BP_BaseComponent_Passive.uasset   # Базовый Actor Component для Пассивных Компонентов (применяет GE при добавлении)
    │   │   │   └── BP_BaseWeaponMod.uasset           # Базовый класс для Модификаторов Оружия (может быть Actor Component или Data Asset)
    │   │   │
    │   │   ├── Modules       # Активные Модули
    │   │   │   ├── Ability   # Модули Активных Способностей/Утилит
    │   │   │   │   ├── BP_ModulePickup_KineticRepulsor.uasset # Актор подбора
    │   │   │   │   └── DA_Module_Ability_KineticRepulsor.uasset # Data Asset с данными (ссылка на GA_Module_KineticRepulsor)
    │   │   │   │   └── BP_ModulePickup_PhaseBlink.uasset
    │   │   │   │   └── DA_Module_Ability_PhaseBlink.uasset
    │   │   │   │   └── ... # И так далее для каждого модуля способности
    │   │   │   │
    │   │   │   ├── Movement  # Модули Передвижения
    │   │   │   │   ├── BP_ModulePickup_GrappleHook.uasset
    │   │   │   │   └── DA_Module_Movement_GrappleHook.uasset # Data Asset (ссылка на GA_Module_GrappleHook)
    │   │   │   │   └── BP_ModulePickup_BoostPack.uasset
    │   │   │   │   └── DA_Module_Movement_BoostPack.uasset
    │   │   │   │   └── ... # И так далее для каждого модуля передвижения
    │   │   │   │
    │   │   │   └── Support   # Модули Поддержки (если будут, например, для Техника)
    │   │   │       ├── BP_ModulePickup_DeployableTurret.uasset
    │   │   │       └── DA_Module_Support_DeployableTurret.uasset
    │   │   │       └── BP_Deployable_Turret.uasset # Сам актор турели, который спавнится
    │   │   │
    │   │   ├── Components    # Пассивные Компоненты (как Actor Components)
    │   │   │   ├── BP_Component_Passive_TitaniumPlating.uasset # Наследуется от BP_BaseComponent_Passive
    │   │   │   ├── BP_Component_Passive_BurstServos.uasset
    │   │   │   └── BP_Component_Passive_TargetingModule.uasset
    │   │   │   └── ... # И так далее для каждого пассивного компонента
    │   │   │
    │   │   ├── WeaponMods    # Модификаторы Оружия
    │   │   │   ├── BP_WeaponModPickup_Ricochet.uasset
    │   │   │   └── DA_WeaponMod_Ricochet.uasset # Data Asset с данными (ссылка на GE_WeaponMod_Ricochet_Apply)
    │   │   │   └── BP_WeaponModPickup_BurningRounds.uasset
    │   │   │   └── DA_WeaponMod_BurningRounds.uasset
    │   │   │   └── ... # И так далее для каждого модификатора
    │   │   │
    │   │   └── Systems       # Системные элементы для Эволюции/Комбинации
    │   │       ├── BP_ItemPickup_EvolutionCatalyst.uasset # Актор подбора Катализатора
    │   │       ├── BP_ItemPickup_CombinationBlueprint.uasset # Актор подбора Чертежа
    │   │       └── BP_ItemDatabaseSubsystem.uasset # (Опционально) Подсистема для легкого доступа к данным всех предметов по ID/Тегу
    │   │
    │   ├── GAS               # Gameplay Ability System для Предметов
    │   │   ├── Abilities     # Способности, предоставляемые Модулями
    │   │   │   ├── Ability   # GA_Module_KineticRepulsor.uasset, GA_Module_PhaseBlink.uasset, GA_Module_ResonanceMine.uasset, GA_Module_RepairNanites.uasset, GA_Module_VoidTether.uasset, GA_Module_VolatileOvercharge.uasset, GA_Module_DeployableDecoy.uasset
    │   │   │   ├── Movement  # GA_Module_GrappleHook_Fire.uasset, GA_Module_BoostPack_Activate.uasset, GA_Module_GeckoBoots_Toggle.uasset, GA_Module_Slide_Execute.uasset, GA_Module_NullTeleport_Execute.uasset
    │   │   │   └── Support   # GA_Module_DeployTurret.uasset
    │   │   │
    │   │   ├── GameplayEffects # Эффекты от Компонентов, Модулей, Модификаторов
    │   │   │   ├── Components  # GE_Component_TitaniumPlating_HealthBuff.uasset, GE_Component_SelfSealGel_Regen.uasset, GE_Component_ShieldConverter_Passive.uasset, GE_Component_Insulation_ElementalResist.uasset, GE_Component_BurstServos_SpeedBuff.uasset, GE_Component_JumpBoosters_Passive.uasset, GE_Component_EvasionPredictor_Passive.uasset, GE_Component_TargetingModule_CritBuff.uasset, GE_Component_ReloadAccelerator_Passive.uasset, GE_Component_NeuralAmp_DamageBuff.uasset, GE_Component_PowerCore_EnergyBuff.uasset, GE_Component_ScavengerMagnet_Passive.uasset
    │   │   │   ├── Modules     # GE_Module_KineticRepulsor_Cooldown.uasset, GE_Module_KineticRepulsor_Cost.uasset, GE_Module_PhaseBlink_Charges.uasset, GE_Module_BoostPack_FuelDrain.uasset, GE_Module_VolatileOvercharge_Buff.uasset, GE_Module_VolatileOvercharge_Debuff.uasset
    │   │   │   └── WeaponMods  # GE_WeaponMod_Ricochet_ApplyTag.uasset, GE_WeaponMod_BurningRounds_ApplyDOT.uasset, GE_WeaponMod_Vampiric_ApplyHeal.uasset
    │   │   │
    │   │   └── GameplayCueNotify # Визуальные/Звуковые эффекты для способностей Модулей
    │   │       ├── GCN_Module_Repulsor_Activate.uasset
    │   │       ├── GCN_Module_PhaseBlink_In.uasset
    │   │       ├── GCN_Module_PhaseBlink_Out.uasset
    │   │       ├── GCN_Module_GrappleHook_Fire.uasset
    │   │       ├── GCN_Module_GrappleHook_HitSurface.uasset
    │   │       ├── GCN_Module_BoostPack_Loop.uasset
    │   │       └── GCN_Module_Slide_Execute.uasset
    │   │
    │   ├── Data              # Таблицы данных и структуры для Предметов
    │   │   ├── DataTables    # DT_Modules_Ability.uasset, DT_Modules_Movement.uasset, DT_Modules_Support.uasset, DT_Components_Passive.uasset, DT_WeaponMods.uasset, DT_EvolutionRecipes.uasset, DT_CombinationRecipes.uasset, DT_ItemDropRates.uasset (Шансы выпадения)
    │   │   └── Structs       # FModuleData.uasset (Общая структура для DA_Module), FComponentPassiveData.uasset, FWeaponModData.uasset, FEvolutionRecipe.uasset, FCombinationRecipe.uasset, FItemDropEntry.uasset
    │   │
    │   ├── Art               # Визуальные Ассеты Предметов
    │   │   ├── Icons         # Иконки для UI (Критически важно!)
    │   │   │   ├── Modules/  # Icon_Module_Ability_Repulsor.uasset, Icon_Module_Movement_Hook.uasset, ...
    │   │   │   ├── Components/ # Icon_Component_Plating.uasset, Icon_Component_Servos.uasset, ...
    │   │   │   ├── WeaponMods/ # Icon_WeaponMod_Ricochet.uasset, Icon_WeaponMod_Burn.uasset, ...
    │   │   │   ├── Resources/  # Icon_Resource_Scrap.uasset, Icon_Resource_Catalyst.uasset, Icon_Resource_Blueprint.uasset
    │   │   │   └── RarityFrames/ # Icon_Frame_Common.uasset, Icon_Frame_Uncommon.uasset, ... (Рамки для иконок)
    │   │   │
    │   │   ├── Meshes        # 3D модели для подбираемых предметов
    │   │   │   ├── Pickups/    # SM_ItemPickup_Generic_Module.uasset, SM_ItemPickup_Generic_Component.uasset, SM_EvolutionCatalyst.uasset, SM_CombinationBlueprint_Chip.uasset
    │   │   │   └── Attachments/ # (Опционально) Меши, которые будут крепиться к Шасси AC_VisualAttachmentManager
    │   │   │       └── SM_Module_BoostPack_Attachment.uasset
    │   │   │
    │   │   └── VFX           # Визуальные эффекты для Предметов
    │   │       ├── Pickups/    # NS_Pickup_Highlight_Common.uasset, NS_Pickup_Highlight_Rare.uasset, NS_Pickup_Collected.uasset
    │   │       ├── Evolution/  # NS_Evolution_Charging.uasset, NS_Evolution_Success.uasset, NS_Evolution_Fail.uasset
    │   │       └── Combination/ # NS_Combination_Success.uasset
    │   │
    │   └── Audio             # Звуки для Предметов
    │       ├── Pickups/        # SFX_Item_Pickup_Common.uasset, SFX_Item_Pickup_Rare.uasset, SFX_Item_Pickup_Fail.uasset
    │       ├── Evolution/      # SFX_Item_Evolution_Start.uasset, SFX_Item_Evolution_Success.uasset, SFX_Item_Evolution_Fail.uasset
    │       └── Combination/    # SFX_Item_Combination_Success.uasset
    │
    ├── Weapons               # Оружейные Системы
    │   ├── Blueprints        # Логика Оружия
    │   │   ├── Base          # BP_BaseWeapon.uasset (Актор, который держит Шасси, управляет стрельбой через GAS, хранит модификаторы)
    │   │   ├── Implementations # Конкретные виды оружия
    │   │   │   ├── BP_Weapon_KineticPiercer_Razor.uasset
    │   │   │   ├── BP_Weapon_ImpulseShotgun_Wave.uasset
    │   │   │   ├── BP_Weapon_PlasmaInductor_Globule.uasset
    │   │   │   ├── BP_Weapon_NeedleSprayer_Flurry.uasset
    │   │   │   ├── BP_Weapon_LaserCutter_Focus.uasset
    │   │   │   ├── BP_Weapon_BioCrossbow_Predator.uasset
    │   │   │   ├── BP_Weapon_KineticHammer_Crusher.uasset # (Ближний бой)
    │   │   │   ├── BP_Weapon_MonofilamentBlade_Sting.uasset # (Ближний бой)
    │   │   │   └── BP_Weapon_EnergyWhip_Constrictor.uasset # (Ближний бой/Контроль)
    │   │   │
    │   │   └── Projectiles   # Акторы Снарядов
    │   │       ├── BP_Projectile_Bullet_HitScan.uasset # (Может быть не актор, а логика в GA_)
    │   │       ├── BP_Projectile_Bullet_Physical.uasset
    │   │       ├── BP_Projectile_Plasma_Globule.uasset
    │   │       ├── BP_Projectile_Needle.uasset
    │   │       ├── BP_Projectile_BioDart.uasset
    │   │       └── BP_Projectile_EnergyPulse.uasset
    │   │
    │   ├── GAS               # Gameplay Ability System для Оружия
    │   │   ├── Abilities     # Способности Оружия
    │   │   │   ├── Fire/       # GA_Weapon_Fire_HitScan.uasset, GA_Weapon_Fire_Projectile_Single.uasset, GA_Weapon_Fire_Shotgun.uasset, GA_Weapon_Fire_Beam.uasset, GA_Weapon_Fire_Charge.uasset, GA_Weapon_Melee_Swing.uasset, GA_Weapon_Melee_Combo.uasset
    │   │   │   ├── Reload/     # GA_Weapon_Reload_Clip.uasset, GA_Weapon_Reload_Energy.uasset
    │   │   │   └── Utility/    # GA_Weapon_ToggleAltFire.uasset, GA_Weapon_Whip_Grab.uasset
    │   │   │
    │   │   └── GameplayEffects # Эффекты, связанные с Оружием
    │   │       ├── Damage/     # GE_Weapon_Damage_Razor.uasset, GE_Weapon_Damage_Wave_Close.uasset, GE_Weapon_Damage_Wave_Far.uasset, GE_Weapon_Damage_Plasma_Direct.uasset, GE_Weapon_Damage_Plasma_AoE.uasset, GE_Weapon_Damage_Needle.uasset, GE_Weapon_Damage_Laser_Tick.uasset, GE_Weapon_Damage_BioDart_Direct.uasset, GE_Weapon_Damage_BioDart_DOT.uasset, GE_Weapon_Damage_Hammer_Direct.uasset, GE_Weapon_Damage_Hammer_AoE.uasset, GE_Weapon_Damage_Blade_Slash.uasset, GE_Weapon_Damage_Whip_Hit.uasset, GE_Weapon_Damage_Whip_Hold.uasset
    │   │       ├── ModsApply/  # GE_Weapon_ApplyMod_RicochetTag.uasset, GE_Weapon_ApplyMod_BurningDOT.uasset # Эффекты, которые применяет GA_Weapon_Fire при наличии модификатора
    │   │       └── Ammo/       # GE_Weapon_ConsumeAmmo_Bullet.uasset, GE_Weapon_ConsumeAmmo_Energy.uasset
    │   │
    │   ├── Art               # Визуальные Ассеты Оружия
    │   │   ├── Meshes        # 3D Модели
    │   │   │   ├── Weapons/    # SK_Weapon_Razor.uasset, SK_Weapon_Wave.uasset, SK_Weapon_Hammer.uasset, ...
    │   │   │   └── Projectiles/ # SM_Projectile_Plasma.uasset, SM_Projectile_Dart.uasset, ...
    │   │   │
    │   │   ├── Textures      # Текстуры для оружия и эффектов
    │   │   ├── Materials     # Материалы оружия
    │   │   └── VFX           # Визуальные эффекты
    │   │       ├── MuzzleFlash/ # NS_MuzzleFlash_Razor.uasset, NS_MuzzleFlash_Wave.uasset, ...
    │   │       ├── Impacts/    # NS_Impact_Bullet_Metal.uasset, NS_Impact_Plasma_Generic.uasset, NS_Impact_Blade_Flesh.uasset, ...
    │   │       ├── Projectiles/ # NS_ProjectileTrail_Bullet.uasset, NS_ProjectileTrail_Plasma.uasset, NS_LaserBeam.uasset, ...
    │   │       └── Reload/     # NS_Reload_ShellEject.uasset, NS_Reload_EnergyVent.uasset
    │   │
    │   ├── Animations        # Анимации Оружия (обычно используются через AnimBP Шасси)
    │   │   ├── Montages      # AM_Weapon_Razor_Fire.uasset, AM_Weapon_Razor_Reload.uasset, AM_Weapon_Hammer_Swing.uasset
    │   │   └── GameplayCueNotify # Визуальные/Звуковые эффекты для оружия через GAS
    │   │       ├── GCN_Weapon_MuzzleFlash_Razor.uasset
    │   │       ├── GCN_Weapon_Reload_Sound_Clip.uasset
    │   │       ├── GCN_Weapon_Impact_Bullet_Metal.uasset
    │   │       └── GCN_Weapon_Hammer_HitWorld.uasset
    │   │
    │   ├── Audio             # Звуки Оружия
    │   │   ├── Fire/         # SFX_Weapon_Razor_Shot.uasset, SFX_Weapon_Wave_Fire.uasset, SFX_Weapon_Laser_Loop.uasset, SFX_Weapon_Hammer_Swing.uasset
    │   │   ├── Reload/       # SFX_Weapon_Reload_ClipIn.uasset, SFX_Weapon_Reload_EnergyCell.uasset
    │   │   ├── Impacts/      # SFX_Impact_Bullet_Metal.uasset, SFX_Impact_Plasma_Explode.uasset
    │   │   └── Handling/     # SFX_Weapon_Equip_Generic.uasset, SFX_Weapon_DryFire.uasset
    │   │
    │   └── Data              # Таблицы данных для Оружия
    │       └── DT_WeaponStats.uasset # Урон (ссылка на GE_), скорострельность, тип боеприпаса, емкость магазина, время перезарядки, ссылки на GA_Fire/Reload и т.д.
    │
    ├── AI                    # Враги и Боссы
    │   ├── Blueprints        # Логика AI
    │   │   ├── Base          # BP_BaseAICharacter.uasset, AIC_BaseEnemy.uasset
    │   │   ├── Enemies       # Конкретные типы врагов
    │   │   │   ├── BP_AI_Enemy_RusherBot.uasset
    │   │   │   ├── BP_AI_Enemy_RangedBasicBot.uasset
    │   │   │   ├── BP_AI_Enemy_AcidSpitter.uasset
    │   │   │   ├── BP_AI_Enemy_CryoDrone.uasset
    │   │   │   ├── BP_AI_Enemy_TankBot.uasset
    │   │   │   └── BP_AI_Enemy_SupportDrone.uasset
    │   │   │
    │   │   ├── Bosses        # Боссы
    │   │   │   ├── BP_AI_Boss_GuardianMK1.uasset # Пример босса для Ржавых Рубежей
    │   │   │   └── BP_AI_Boss_NexusCore.uasset   # Пример финального босса
    │   │   │
    │   │   └── BehaviorTree  # Элементы Дерева Поведения
    │   │       ├── Base        # BT_BaseEnemyBehavior.uasset, BB_BaseEnemyBlackboard.uasset
    │   │       ├── Tasks       # BTT_FindTargetPlayer.uasset, BTT_MoveToTarget.uasset, BTT_AttackMelee.uasset, BTT_AttackRanged.uasset, BTT_UseAbility.uasset, BTT_PlayMontageAndWait.uasset
    │   │       ├── Services    # BTS_DetectPlayer.uasset, BTS_UpdateTargetLocation.uasset, BTS_CheckHealthThreshold.uasset
    │   │       └── Decorators  # BTD_IsTargetInRange.uasset, BTD_HasLineOfSight.uasset, BTD_IsHealthLow.uasset, BTD_Cooldown.uasset
    │   │
    │   ├── GAS               # Gameplay Ability System для AI (если используется)
    │   │   ├── AttributeSets # AS_AI_BaseAttributes.uasset (Может наследоваться от AS_BaseAttributes или быть отдельным)
    │   │   ├── Abilities     # Способности AI
    │   │   │   ├── GA_AI_MeleeAttack_Basic.uasset
    │   │   │   ├── GA_AI_RangedAttack_FireProjectile.uasset
    │   │   │   ├── GA_AI_ChargePlayer.uasset
    │   │   │   ├── GA_AI_SpawnMinions.uasset (Для босса или спец. врага)
    │   │   │   └── GA_AI_HealSelf.uasset (Для саппорта или элитки)
    │   │   │
    │   │   └── GameplayEffects # Эффекты, применяемые AI
    │   │       ├── GE_AI_Damage_MeleeToPlayer.uasset
    │   │       ├── GE_AI_Damage_RangedToPlayer.uasset
    │   │       ├── GE_AI_ApplySlowDebuff.uasset
    │   │       └── GE_AI_Elite_RegenBuff.uasset (Эффект от элитного модификатора)
    │   │
    │   ├── Art               # Визуальные Ассеты AI
    │   │   ├── Shared        # Общие эффекты, материалы
    │   │   │   └── VFX       # NS_AI_SpawnEffect.uasset, NS_AI_DeathExplosion_Generic.uasset
    │   │   │
    │   │   ├── RusherBot     # Ассеты для RusherBot
    │   │   │   ├── Meshes    # SK_RusherBot.uasset
    │   │   │   ├── Textures  # T_RusherBot_D.uasset
    │   │   │   └── Materials # MI_RusherBot.uasset
    │   │   │
    │   │   ├── AcidSpitter   # Ассеты для AcidSpitter
    │   │   │   ├── Meshes    # SK_AcidSpitter.uasset
    │   │   │   ├── VFX       # NS_AcidSpit_Projectile.uasset, NS_AcidPool_Decal.uasset
    │   │   │   └── ...
    │   │   │
    │   │   ├── CryoDrone     # ... Ассеты для CryoDrone ...
    │   │   ├── TankBot       # ... Ассеты для TankBot ...
    │   │   ├── SupportDrone  # ... Ассеты для SupportDrone ...
    │   │   └── Boss_Guardian # ... Ассеты для Босса Guardian ...
    │   │
    │   ├── Animations        # Анимации AI
    │   │   ├── RusherBot     # ABP_RusherBot.uasset, A_RusherBot_Run.uasset, AM_RusherBot_Attack.uasset
    │   │   ├── AcidSpitter   # ABP_AcidSpitter.uasset, AM_AcidSpitter_Spit.uasset
    │   │   ├── ...           # Анимации для других врагов и боссов
    │   │   └── GameplayCueNotify # Анимационные/эффектные GCN для AI
    │   │       ├── GCN_AI_MeleeImpact_HitPlayer.uasset
    │   │       ├── GCN_AI_AcidSpit_Launch.uasset
    │   │       └── GCN_AI_Elite_SpawnAura.uasset
    │   │
    │   ├── Audio             # Звуки AI
    │   │   ├── RusherBot     # SFX_RusherBot_Move_Loop.uasset, SFX_RusherBot_Attack.uasset, SFX_RusherBot_Alerted.uasset
    │   │   ├── AcidSpitter   # SFX_AcidSpitter_Spit.uasset, SFX_AcidSpitter_Idle_Gurgle.uasset
    │   │   └── ...           # Звуки для других врагов и боссов
    │   │
    │   └── Data              # Таблицы данных для AI
    │       ├── DT_EnemyStats.uasset        # Базовые статы (здоровье, урон, скорость), ссылки на BP, AnimBP, атрибуты GAS
    │       ├── DT_EnemyAttackPatterns.uasset # Описание атак (тип, урон GE, кулдаун, анимация/монтаж)
    │       ├── DT_EnemySpawnGroups.uasset  # Конфигурации групп врагов для спавна
    │       └── DT_EliteModifiers.uasset    # Описание элитных модификаторов (название, виз. эффект, применяемый GE)
    │
    ├── GameplayObjects       # Интерактивные Объекты Мира
    │   ├── Blueprints        # Логика Объектов
    │   │   ├── Chests        # BP_Interactable_Chest_Common.uasset, BP_Interactable_Chest_Rare.uasset, BP_Interactable_Chest_Boss.uasset
    │   │   ├── Stations      # BP_Interactable_Station_Improvement.uasset, BP_Interactable_Station_Synthesis.uasset, BP_Interactable_Station_Recycle.uasset (для разборки)
    │   │   ├── Terminals     # BP_Interactable_ShopTerminal.uasset, BP_Interactable_EventTerminal.uasset
    │   │   ├── Navigation    # BP_Interactable_StagePortal.uasset, BP_Interactable_SecretDoor.uasset
    │   │   └── Destructibles # BP_Destructible_Crate_Wood.uasset, BP_Destructible_Barrel_Explosive.uasset
    │   │
    │   ├── Art               # Визуальные Ассеты Объектов
    │   │   ├── Meshes        # SM_Chest_SciFi_Common.uasset, SM_Station_Improvement.uasset, SM_Portal_Frame.uasset, SM_Barrel_Explosive.uasset
    │   │   ├── Textures      # Текстуры для объектов
    │   │   ├── Materials     # Материалы для объектов
    │   │   └── VFX           # NS_Chest_Open_Common.uasset, NS_Station_Activate_Loop.uasset, NS_Portal_Idle_Effect.uasset, NS_Barrel_Explosion.uasset
    │   │
    │   ├── Audio             # Звуки Объектов
    │   │   ├── Chests        # SFX_Chest_Open_Common.uasset, SFX_Chest_Open_Rare.uasset
    │   │   ├── Stations      # SFX_Station_Activate.uasset, SFX_Station_Improve_Success.uasset, SFX_Station_Recycle.uasset
    │   │   ├── Terminals     # SFX_Terminal_Interact.uasset, SFX_Terminal_Purchase.uasset
    │   │   ├── Navigation    # SFX_Portal_Activate.uasset, SFX_Portal_Travel.uasset
    │   │   └── Destructibles # SFX_Crate_Destroy.uasset, SFX_Barrel_Explode.uasset
    │   │
    │   └── Data              # Таблицы данных для Объектов (если нужны)
    │       ├── DT_ChestLootTables_Common.uasset # Таблицы лута для сундуков
    │       ├── DT_ShopItemPool.uasset           # Список товаров в магазине
    │       └── DT_RandomEvents.uasset           # Список возможных случайных событий
    │
    └── Multiplayer           # Системы, Специфичные для Мультиплеера
        ├── Blueprints        # Логика Мультиплеера
        │   ├── Lobby         # BP_LobbyManager.uasset (Управление игроками в лобби, запуск игры)
        │   ├── Replication   # AC_ReplicationHelper.uasset (Если нужна сложная логика репликации для определенных акторов)
        │   └── Gameplay      # BP_ReviveInteraction.uasset (Логика поднятия союзника), BP_PlayerIndicator.uasset (Маркер над союзником)
        │
        ├── Data              # Данные для Мультиплеера
        │   └── DT_MultiplayerScaling.uasset # Таблица с множителями здоровья/урона/количества врагов в зависимости от числа игроков
        │
        └── UI                # UI Элементы для Мультиплеера (Могут быть и в основной папке UI)
            └── Widgets       # WBP_LobbyPlayerList.uasset, WBP_RevivePrompt.uasset, WBP_PlayerStatusIndicator.uasset
```

### Environments

```q
**Content/
└── Environments              # Ассеты Окружения (Стадии/Биомы)
    ├── _Shared               # Общие ассеты для всех или многих локаций
    │   ├── Blueprints        # Общая логика или базовые классы для элементов окружения
    │   │   ├── Hazards       # BP_EnvironmentalHazard_Base.uasset (Родитель для лавы, кислоты, и т.д.)
    │   │   └── Interactables # BP_DestructibleProp_Base.uasset (Родитель для разрушаемых ящиков/бочек)
    │   │
    │   ├── Materials         # Общие Мастер-Материалы, Функции, Инстансы, Коллекции
    │   │   ├── Masters       # Главные мастер-материалы
    │   │   │   ├── M_Landscape_Master.uasset     # Для Ландшафтов
    │   │   │   ├── M_Object_Master.uasset        # Для Статичных/Динамических Мешей
    │   │   │   ├── M_Foliage_Master.uasset       # Для Растительности (с поддержкой ветра и т.п.)
    │   │   │   ├── M_Decal_Master.uasset         # Для Декалей
    │   │   │   ├── M_VFX_Master.uasset           # Базовый материал для частиц Niagara
    │   │   │   └── M_Water_Master.uasset         # (Если нужна общая вода)
    │   │   │
    │   │   ├── Functions     # Переиспользуемые Material Functions
    │   │   │   ├── MF_WorldAlignedTexture.uasset # Текстурирование по мировым координатам
    │   │   │   ├── MF_TextureVariationMask.uasset # Маска для смешивания текстур
    │   │   │   ├── MF_EdgeWear.uasset            # Эффект потертостей на гранях
    │   │   │   ├── MF_DetailNormals.uasset       # Добавление мелких деталей к нормалям
    │   │   │   └── MF_WindSimulation.uasset      # Симуляция ветра для растительности
    │   │   │
    │   │   ├── Instances     # Базовые Material Instances (MI) от Мастеров
    │   │   │   ├── MI_Metal_Base.uasset
    │   │   │   ├── MI_Concrete_Base.uasset
    │   │   │   ├── MI_Rock_Base.uasset
    │   │   │   ├── MI_Wood_Base.uasset
    │   │   │   └── MI_Glass_Base.uasset
    │   │   │
    │   │   ├── Decals        # Общие Material Instances для Декалей
    │   │   │   ├── MI_Decal_Crack_Generic.uasset
    │   │   │   ├── MI_Decal_Leak_Oil_Generic.uasset
    │   │   │   └── MI_Decal_ScorchMark_Generic.uasset
    │   │   │
    │   │   └── Collections   # Material Parameter Collections (MPC)
    │   │       ├── MPC_GlobalEnvironmentParameters.uasset # Параметры ветра, влажности, времени суток и т.д.
    │   │       └── MPC_PlayerScannerEffect.uasset     # (Если есть эффект сканера окружения)
    │   │
    │   ├── Meshes            # Общие Меши (простые формы, наборы, которые могут использоваться везде)
    │   │   ├── Primitives    # Простые геометрические формы с хорошей UV
    │   │   │   ├── SM_Cube_Chamfered.uasset
    │   │   │   └── SM_Plane_DetailedUV.uasset
    │   │   │
    │   │   ├── Sets          # Модульные наборы (трубы, вентиляция, кабели)
    │   │   │   ├── Pipes/        # SM_Pipe_Straight.uasset, SM_Pipe_Corner.uasset, SM_Pipe_Tee.uasset, ...
    │   │   │   ├── Vents/        # SM_Vent_Wall_A.uasset, SM_Vent_Ceiling_A.uasset, ...
    │   │   │   └── Cables/       # SM_Cable_SplineMesh.uasset (Для создания кабелей по сплайну)
    │   │   │
    │   │   └── Props         # Общие Пропсы (если они не привязаны стилистически к биому)
    │   │       ├── SM_Crate_Plastic_A.uasset
    │   │       └── SM_Barrel_Metal_A.uasset
    │   │
    │   ├── Textures          # Общие Текстуры (шумы, маски, утилиты)
    │   │   ├── Base          # Базовые поверхности (могут быть переопределены в биомах)
    │   │   │   ├── T_Metal_Bare_BC.uasset, T_Metal_Bare_N.uasset, T_Metal_Bare_RMA.uasset # (BC=BaseColor, N=Normal, RMA=Roughness/Metallic/AO)
    │   │   │   └── T_Concrete_Smooth_BC.uasset, T_Concrete_Smooth_N.uasset, T_Concrete_Smooth_RMA.uasset
    │   │   │
    │   │   ├── Masks         # Маски для смешивания материалов и эффектов
    │   │   │   ├── T_Grime_Mask_01.uasset, T_Grime_Mask_02.uasset
    │   │   │   ├── T_EdgeWear_Mask_Packed.uasset
    │   │   │   └── T_Leak_Mask_Vertical.uasset
    │   │   │
    │   │   ├── Noise         # Процедурные шумы
    │   │   │   ├── T_Noise_Perlin_01.uasset
    │   │   │   ├── T_Noise_Clouds_02.uasset
    │   │   │   └── T_Noise_Cellular_01.uasset
    │   │   │
    │   │   ├── Utility       # Утилитарные текстуры
    │   │   │   ├── T_Black_1x1.uasset
    │   │   │   ├── T_White_1x1.uasset
    │   │   │   ├── T_Gray_128.uasset
    │   │   │   ├── T_Normal_Flat_1x1.uasset # Плоская нормаль
    │   │   │   └── T_Checkerboard_Debug.uasset # Для отладки UV
    │   │   │
    │   │   └── Imposters     # (Если используете импостеры для далеких объектов)
    │   │       └── T_DistantTree_ImposterAtlas.uasset
    │   │
    │   ├── VFX               # Общие Визуальные Эффекты Окружения
    │   │   ├── Ambient       # Фоновые эффекты
    │   │   │   ├── NS_Ambient_DustMotes_Indoor.uasset
    │   │   │   ├── NS_Ambient_SteamLeak_Small_Loop.uasset
    │   │   │   └── NS_Ambient_GodRays_Volumetric.uasset # (Если нужен эффект лучей света)
    │   │   │
    │   │   ├── Weather       # Погодные эффекты
    │   │   │   ├── NS_Rain_Effect_World.uasset
    │   │   │   ├── NS_Snow_Effect_World.uasset
    │   │   │   └── NS_WindStreaks_Effect.uasset
    │   │   │
    │   │   └── Impacts       # Базовые эффекты попаданий по поверхностям
    │   │       ├── NS_Impact_Dirt_Generic.uasset
    │   │       ├── NS_Impact_Concrete_Generic.uasset
    │   │       ├── NS_Impact_Metal_Generic.uasset
    │   │       └── NS_Impact_Wood_Generic.uasset
    │   │
    │   └── Audio             # Общие Звуки Окружения
    │       ├── Ambient       # Фоновые зацикленные звуки
    │       │   ├── AMB_Wind_Light_Outdoor_Loop.uasset
    │       │   ├── AMB_Cave_Drips_Stereo_Loop.uasset
    │       │   └── AMB_Generic_Indoor_RoomTone_Loop.uasset
    │       │
    │       └── Impacts       # Звуки ударов по общим поверхностям
    │           ├── SFX_Impact_PhysObject_Dirt.uasset
    │           ├── SFX_Impact_PhysObject_Concrete.uasset
    │           ├── SFX_Impact_PhysObject_Metal.uasset
    │           └── SFX_Impact_PhysObject_Wood.uasset
    │
    ├── RustedFrontiers       # Биом: Ржавые Рубежи (Пример структуры для одного биома)
    │   ├── Blueprints        # Логика, специфичная для этого биома
    │   │   ├── Hazards       # BP_Hazard_AcidRainController.uasset # Управляет эффектом кислотного дождя
    │   │   └── Destructibles # BP_Destructible_RustedPlatform.uasset # Разрушаемая платформа
    │   │
    │   ├── Materials         # Материалы и Инстансы для Ржавых Рубежей
    │   │   ├── Instances     # Material Instances (MI) от мастеров из _Shared
    │   │   │   ├── MI_Metal_Rusted_Heavy.uasset
    │   │   │   ├── MI_Concrete_Cracked_Stained.uasset
    │   │   │   ├── MI_Ground_ScrappyDirt.uasset
    │   │   │   └── MI_Landscape_RustedFrontiers.uasset # MI для ландшафта этого биома
    │   │   │
    │   │   └── Decals        # Декали, специфичные для биома
    │   │       ├── MI_Decal_RustStain_Large_A.uasset
    │   │       ├── MI_Decal_OilPuddle.uasset
    │   │       └── MI_Decal_WarningSign_Corroded.uasset
    │   │
    │   ├── Meshes            # Модели для Ржавых Рубежей
    │   │   ├── Static        # Статичные меши
    │   │   │   ├── Architecture/ # Здания, конструкции
    │   │   │   │   ├── SM_Building_IndustrialRuin_A.uasset
    │   │   │   │   ├── SM_Walkway_Rusted_Set/ # Набор модульных дорожек
    │   │   │   │   └── SM_Girder_Heavy_Bent.uasset
    │   │   │   │
    │   │   │   ├── Props/      # Объекты наполнения
    │   │   │   │   ├── SM_Container_Shipping_Damaged_A.uasset
    │   │   │   │   ├── SM_ScrapPile_Metal_Large.uasset
    │   │   │   │   └── SM_BrokenMachinery_EngineBlock.uasset
    │   │   │   │
    │   │   │   └── Foliage/    # Растительность (если есть)
    │   │   │       └── SM_Weed_DryScrub_A.uasset # Сухая, чахлая трава
    │   │   │
    │   │   └── Destructible  # Разрушаемые объекты, специфичные для биома
    │   │       └── SM_Platform_Rusted_Destructible.uasset
    │   │
    │   ├── Textures          # Текстуры для Ржавых Рубежей
    │   │   ├── Tileable      # Бесшовные текстуры
    │   │   │   ├── T_Metal_Rusted_Heavy_BC.uasset, T_Metal_Rusted_Heavy_N.uasset, T_Metal_Rusted_Heavy_RMA.uasset
    │   │   │   ├── T_Concrete_Cracked_BC.uasset, T_Concrete_Cracked_N.uasset, T_Concrete_Cracked_RMA.uasset
    │   │   │   └── T_Ground_ScrappyDirt_BCN_Packed.uasset # BC+N+RMA в одной текстуре, если используется паковка
    │   │   │
    │   │   ├── Trimsheets    # Трим-листы для оптимизации
    │   │   │   └── T_RustedMetal_TrimSheet_Atlas.uasset
    │   │   │
    │   │   └── Decals        # Текстурные атласы для декалей
    │   │       ├── T_Decal_RustStains_Atlas.uasset
    │   │       ├── T_Decal_OilLeaks_Atlas.uasset
    │   │       └── T_Decal_WarningSigns_Corroded_Atlas.uasset
    │   │
    │   ├── VFX               # Визуальные эффекты для Ржавых Рубежей
    │   │   ├── Ambient       # Фоновые эффекты
    │   │   │   ├── NS_Ambient_Sparks_Welding_Distant.uasset
    │   │   │   ├── NS_Ambient_Dust_HeavyWind.uasset
    │   │   │   └── NS_Ambient_ChemicalLeak_Drips.uasset
    │   │   │
    │   │   └── Hazards       # Эффекты опасностей
    │   │       ├── NS_AcidRain_Heavy.uasset
    │   │       └── NS_Platform_Collapse_Dust.uasset
    │   │
    │   └── Audio             # Звуки для Ржавых Рубежей
    │       ├── Ambient       # Фоновые звуки
    │       │   ├── AMB_RustedFrontiers_IndustrialHum_Distant_Loop.uasset
    │       │   ├── AMB_Wind_MetalCreak_Heavy_Loop.uasset
    │       │   └── AMB_ChemicalDrips_Random.uasset
    │       │
    │       └── Hazards       # Звуки опасностей
    │           ├── SFX_AcidRain_Heavy_Loop.uasset
    │           └── SFX_Platform_Rusted_Collapse.uasset
    │
    ├── AcidicGreenhouses     # Биом: Кислотные Теплицы (Структура аналогична RustedFrontiers)
    │   ├── Blueprints        # BP_Hazard_AcidPool.uasset, BP_Plant_AttackingSpitter.uasset, ...
    │   ├── Materials         # MI_Metal_Corroded_Green.uasset, MI_Plant_Mutated_Leaf.uasset, MI_Liquid_Acid.uasset, ...
    │   ├── Meshes            # SM_Greenhouse_Frame_Set/, SM_Plant_Mutated_Vine_Spline.uasset, SM_Hydroponics_Tank_Broken.uasset, ...
    │   ├── Textures          # T_Metal_Corroded_BC.uasset, T_Plant_AlienSkin_N.uasset, T_Liquid_Acid_BC.uasset, ...
    │   ├── VFX               # NS_Ambient_Spores_Floating.uasset, NS_AcidPool_Bubbles.uasset, NS_PlantSpitter_Projectile.uasset, ...
    │   └── Audio             # AMB_AcidicGreenhouses_BioHum_Loop.uasset, SFX_AcidPool_Sizzle_Loop.uasset, SFX_Plant_SpitAttack.uasset, ...
    │
    ├── GeothermalFields      # Биом: Поля Геотермальных Аномалий (Структура аналогична)
    │   ├── Blueprints        # BP_Hazard_LavaFlow.uasset, BP_Hazard_Geyser_Steam.uasset, ...
    │   ├── Materials         # MI_Rock_Volcanic_Cool.uasset, MI_Lava_Flowing.uasset, ...
    │   ├── Meshes            # SM_Rock_Volcanic_Large_A.uasset, SM_GeothermalPlant_Building_A.uasset, ...
    │   ├── Textures          # T_Rock_Volcanic_BC.uasset, T_Lava_Flow_N.uasset, ...
    │   ├── VFX               # NS_Ambient_HeatHaze.uasset, NS_LavaFlow_Bubbles.uasset, NS_Geyser_SteamBurst.uasset, ...
    │   └── Audio             # AMB_Geothermal_Rumble_Loop.uasset, AMB_Lava_Flow_Loop.uasset, SFX_Geyser_SteamBurst.uasset, ...
    │
    ├── CryoArchive           # Биом: Замерзший Архив Данных (Структура аналогична)
    │   ├── Blueprints        # BP_Hazard_IcySurface.uasset, BP_Hazard_CryoLeak_Freeze.uasset, ...
    │   ├── Materials         # MI_Metal_Frosted.uasset, MI_Ice_Clear.uasset, MI_Screen_Frozen_Static.uasset, ...
    │   ├── Meshes            # SM_Corridor_SciFi_Clean_Set/, SM_ServerRack_Frozen.uasset, SM_IceSpike_A.uasset, ...
    │   ├── Textures          # T_Metal_Clean_BC.uasset, T_Ice_Noise_N.uasset, ...
    │   ├── VFX               # NS_Ambient_ColdBreath.uasset, NS_CryoLeak_Mist.uasset, NS_IceShatter_Small.uasset, ...
    │   └── Audio             # AMB_CryoArchive_ServerHum_Low_Loop.uasset, SFX_CryoLeak_Hiss_Loop.uasset, SFX_Footstep_Ice_Slide.uasset, ...
    │
    ├── OrbitalGraveyard      # Биом: Орбитальное Кладбище (Структура аналогична)
    │   ├── Blueprints        # BP_GameplayVolume_LowGravity.uasset, BP_Hazard_FloatingDebris.uasset, ...
    │   ├── Materials         # MI_Metal_SpaceshipHull_A.uasset, MI_Skybox_OrbitalGraveyard.uasset, ...
    │   ├── Meshes            # SM_Corridor_Spaceship_Set/, SM_Airlock_Door.uasset, SM_SpaceshipDebris_Large_A.uasset, ...
    │   ├── Textures          # T_Metal_SpaceshipHull_BC.uasset, ...
    │   ├── VFX               # NS_Ambient_ZeroG_DustParticles.uasset, NS_Vacuum_AirSuck_Particles.uasset, ...
    │   └── Audio             # AMB_OrbitalGraveyard_ShipCreaks_Loop.uasset, AMB_ZeroG_MuffledHum_Loop.uasset, SFX_Airlock_Cycle.uasset, ...
    │
    └── NexusCore             # (Пример Финального Биома, структура та же)
        ├── Blueprints        # ...
        ├── Materials         # ...
        ├── Meshes            # ...
        ├── Textures          # ...
        ├── VFX               # ...
        └── Audio             # ...**
```

### UI

```q
Content/
└── UI                        # Пользовательский Интерфейс (UMG - Unreal Motion Graphics)
    ├── HUD                   # Игровой Интерфейс (Heads-Up Display) - то, что видно во время геймплея
    │   ├── Widgets           # Основные виджеты HUD и его компоненты
    │   │   ├── WBP_HUD_Main.uasset             # Главный контейнер для всех элементов HUD
    │   │   │
    │   │   ├── StatusBars/     # Полосы здоровья, щитов, энергии
    │   │   │   ├── WBP_HUD_AttributeBar.uasset   # Универсальная полоса для атрибутов (Здоровье, Щит, Энергия)
    │   │   │   └── WBP_HUD_SegmentedBar.uasset   # (Альтернатива) Сегментированная полоса (например, для брони)
    │   │   │
    │   │   ├── WeaponInfo/     # Информация об оружии
    │   │   │   ├── WBP_HUD_WeaponInfoDisplay.uasset # Отображает иконку оружия, патроны/перегрев
    │   │   │   └── WBP_HUD_WeaponModIcon.uasset    # Маленькая иконка для отображения установленного модификатора оружия
    │   │   │
    │   │   ├── Abilities/      # Иконки способностей (Модулей)
    │   │   │   ├── WBP_HUD_AbilityBar.uasset       # Контейнер для иконок способностей
    │   │   │   ├── WBP_HUD_AbilityIcon.uasset      # Иконка одной способности (показывает кулдаун, заряды)
    │   │   │   └── WBP_HUD_MovementAbilityIcon.uasset # (Опционально) Отдельный виджет для иконки модуля передвижения
    │   │   │
    │   │   ├── EffectsStatus/  # Отображение активных эффектов/компонентов
    │   │   │   ├── WBP_HUD_StatusEffectList.uasset # Контейнер для иконок баффов/дебаффов/пассивок
    │   │   │   └── WBP_HUD_StatusEffectIcon.uasset # Иконка одного эффекта (с таймером длительности, если нужно)
    │   │   │
    │   │   ├── Objectives/     # Отображение целей уровня
    │   │   │   └── WBP_HUD_ObjectiveTracker.uasset # Текстовое или иконное отображение текущей цели
    │   │   │
    │   │   ├── Indicators/     # Различные индикаторы и оповещения
    │   │   │   ├── WBP_HUD_DifficultyTimer.uasset  # Показывает время забега и уровень сложности
    │   │   │   ├── WBP_HUD_InteractionPrompt.uasset # Подсказка для взаимодействия ("Нажмите F чтобы...")
    │   │   │   ├── WBP_HUD_DamageNumber.uasset     # Виджет для всплывающих цифр урона
    │   │   │   ├── WBP_HUD_HitIndicator.uasset     # Индикатор направления полученного урона
    │   │   │   └── WBP_HUD_BossHealthBar.uasset    # Отдельная полоса здоровья для боссов
    │   │   │
    │   │   ├── Minimap/        # Компоненты миникарты
    │   │   │   ├── WBP_HUD_Minimap.uasset          # Основной виджет миникарты
    │   │   │   ├── WBP_HUD_Minimap_Icon_Player.uasset # Иконка игрока на миникарте
    │   │   │   ├── WBP_HUD_Minimap_Icon_Objective.uasset # Иконка цели
    │   │   │   └── WBP_HUD_Minimap_Icon_Enemy.uasset # (Если есть) Иконка врага
    │   │   │
    │   │   ├── Crosshair/      # Прицелы
    │   │   │   ├── WBP_HUD_Crosshair_Default.uasset
    │   │   │   ├── WBP_HUD_Crosshair_HitScan.uasset
    │   │   │   └── WBP_HUD_Crosshair_Charge.uasset # Прицел для заряжаемого оружия
    │   │   │
    │   │   └── Multiplayer/    # Элементы HUD для мультиплеера
    │   │       ├── WBP_HUD_PlayerStatusIndicator.uasset # Иконка/полоса здоровья союзника
    │   │       └── WBP_HUD_RevivePrompt_World.uasset # Подсказка над упавшим союзником ("Press F to Revive")
    │   │
    │   └── Textures          # Текстуры, специфичные для HUD
    │       ├── Crosshairs/     # T_Crosshair_Dot.uasset, T_Crosshair_Circle.uasset
    │       ├── Bars/           # T_HealthBar_Fill.uasset, T_EnergyBar_Frame.uasset
    │       └── Icons/          # T_HUD_Icon_Skull.uasset (для элиток), T_HUD_Icon_ArrowDown.uasset (индикатор урона)
    │
    ├── Menus                 # Главное Меню, Лобби, Настройки, Пауза, Конец Игры
    │   ├── MainMenu/         # Виджеты Главного Меню
    │   │   └── Widgets       # WBP_MainMenu_Main.uasset          # Основной виджет
    │   │                     # WBP_MainMenu_Button_Large.uasset  # Стилизованная кнопка меню
    │   │
    │   ├── Lobby/            # Виджеты Лобби (Подбор Игроков)
    │   │   └── Widgets       # WBP_Lobby_Screen.uasset         # Экран лобби
    │   │                     # WBP_Lobby_PlayerList.uasset     # Список игроков в лобби
    │   │                     # WBP_Lobby_PlayerEntry.uasset    # Строка одного игрока в списке
    │   │                     # WBP_Lobby_ChatBox.uasset        # (Если будет чат в лобби)
    │   │
    │   ├── CharacterSelect/  # Виджеты Выбора Шасси
    │   │   └── Widgets       # WBP_CharacterSelect_Screen.uasset # Основной экран выбора
    │   │                     # WBP_CharacterSelect_Button.uasset # Кнопка выбора одного Шасси
    │   │                     # WBP_CharacterSelect_InfoPanel.uasset # Панель с описанием и статами Шасси
    │   │
    │   ├── Settings/         # Виджеты Меню Настроек
    │   │   └── Widgets       # WBP_Settings_Main.uasset          # Основной контейнер настроек с вкладками
    │   │                     # WBP_Settings_Tab_Graphics.uasset  # Вкладка Графики
    │   │                     # WBP_Settings_Tab_Audio.uasset     # Вкладка Аудио
    │   │                     # WBP_Settings_Tab_Controls.uasset  # Вкладка Управления
    │   │                     # WBP_Settings_Tab_Gameplay.uasset  # Вкладка Геймплея
    │   │                     # WBP_Settings_Tab_Accessibility.uasset # Вкладка Доступности
    │   │                     # WBP_Settings_Option_Slider.uasset # Элемент настройки - Слайдер
    │   │                     # WBP_Settings_Option_Checkbox.uasset # Элемент настройки - Чекбокс
    │   │                     # WBP_Settings_Option_Dropdown.uasset # Элемент настройки - Выпадающий список
    │   │                     # WBP_Settings_Option_Keybind.uasset # Элемент настройки - Привязка клавиши
    │   │
    │   ├── Pause/            # Виджеты Меню Паузы
    │   │   └── Widgets       # WBP_PauseMenu_Main.uasset         # Основное меню паузы (Resume, Settings, Exit)
    │   │
    │   └── GameOver/         # Виджеты Экрана Конца Игры
    │       └── Widgets       # WBP_GameOver_Screen.uasset        # Экран "Забег Окончен"
    │                         # WBP_GameOver_StatsPanel.uasset    # Панель со статистикой забега (время, убийства, собранные предметы)
    │
    ├── Screens               # Полноэкранные Интерфейсы (Инвентарь, Станции и т.п.)
    │   ├── Inventory/        # Экран Инвентаря ("Запчасти")
    │   │   └── Widgets       # WBP_Inventory_Screen.uasset       # Основной экран
    │   │                     # WBP_Inventory_Grid.uasset         # Сетка для отображения предметов
    │   │                     # WBP_Inventory_ItemSlot.uasset     # Виджет одного слота в инвентаре
    │   │
    │   ├── ChassisOverview/  # Экран Обзора Шасси (Просмотр установленных модулей/компонентов)
    │   │   └── Widgets       # WBP_ChassisOverview_Screen.uasset # Основной экран
    │   │                     # WBP_ChassisOverview_SlotDisplay.uasset # Виджет отображения одного слота и установленного предмета
    │   │                     # WBP_ChassisOverview_StatsPanel.uasset # Панель с текущими характеристиками Шасси (из GAS)
    │   │
    │   ├── Stations/         # Экраны Станций Улучшения/Эволюции/Комбинации
    │   │   └── Widgets       # WBP_Station_ImprovementScreen.uasset # Экран Станции Улучшения
    │   │                     # WBP_Station_EvolutionScreen.uasset   # Экран Станции Эволюции
    │   │                     # WBP_Station_CombinationScreen.uasset # Экран Станции Комбинации
    │   │                     # WBP_Station_ItemSelectionList.uasset # Список предметов для выбора (улучшения/эволюции)
    │   │                     # WBP_Station_RecipeDisplay.uasset   # Отображение рецепта (для комбинации/эволюции)
    │   │                     # WBP_Station_ResourceCost.uasset    # Отображение стоимости в ресурсах
    │   │
    │   ├── Shop/             # Экран Магазина/Терминала
    │   │   └── Widgets       # WBP_Shop_Screen.uasset            # Основной экран магазина
    │   │                     # WBP_Shop_ItemList.uasset          # Список доступных товаров
    │   │                     # WBP_Shop_ItemEntry.uasset         # Карточка одного товара с ценой
    │   │
    │   ├── MetaProgression/  # Экран Мета-Прогрессии (Разблокировки)
    │   │   └── Widgets       # WBP_MetaProgression_Screen.uasset # Основной экран
    │   │                     # WBP_MetaProgression_UnlockTree.uasset # (Если будет дерево) Дерево разблокировок
    │   │                     # WBP_MetaProgression_UnlockEntry.uasset # Запись об одной разблокировке (статус, стоимость)
    │   │
    │   └── Map/              # (Если будет) Экран Карты Забега / Нексуса
    │       └── Widgets       # WBP_RunMap_Screen.uasset          # Экран карты
    │                         # WBP_RunMap_Node.uasset            # Виджет узла на карте (локация, событие)
    │
    ├── Elements              # Переиспользуемые Базовые Элементы UI
    │   ├── Widgets           # Основные переиспользуемые виджеты
    │   │   ├── Buttons/        # WBP_Button_Generic.uasset       # Базовая кнопка с текстом
    │   │   │                 # WBP_Button_Icon.uasset        # Кнопка с иконкой
    │   │   │                 # WBP_Button_TextAndIcon.uasset # Кнопка с текстом и иконкой
    │   │   │                 # WBP_Button_Close.uasset       # Стандартная кнопка "Закрыть" (крестик)
    │   │   │
    │   │   ├── Tooltips/       # WBP_Tooltip_Generic.uasset      # Базовая всплывающая подсказка
    │   │   │                 # WBP_Tooltip_Item.uasset         # Подсказка для Предмета (с статами, описанием, редкостью)
    │   │   │                 # WBP_Tooltip_Ability.uasset      # Подсказка для Способности (с описанием, кулдауном, стоимостью)
    │   │   │                 # WBP_Tooltip_StatusEffect.uasset # Подсказка для Статус-Эффекта
    │   │   │
    │   │   ├── Modals/         # WBP_ModalDialog_Confirm.uasset  # Диалог подтверждения (Да/Нет)
    │   │   │                 # WBP_ModalDialog_Info.uasset     # Информационное сообщение (OK)
    │   │   │                 # WBP_ModalDialog_Error.uasset    # Сообщение об ошибке
    │   │   │
    │   │   ├── InputFields/    # WBP_InputField_Text.uasset      # Поле для ввода текста (для чата, имени)
    │   │   │
    │   │   ├── ListsScrolls/   # WBP_ScrollBox_CustomStyled.uasset # Скроллбокс с кастомным стилем
    │   │   │                 # WBP_ListView_Generic.uasset     # Базовый ListView
    │   │   │
    │   │   ├── Primitives/     # WBP_ProgressBar_Generic.uasset  # Универсальная полоса прогресса
    │   │   │                 # WBP_LoadingSpinner.uasset     # Анимированный индикатор загрузки
    │   │   │                 # WBP_SeparatorLine.uasset      # Простая линия-разделитель
    │   │   │
    │   │   └── Slots/          # WBP_Slot_Generic.uasset         # Базовый виджет слота (может содержать иконку, текст)
    │   │                     # WBP_Slot_Item.uasset            # Слот специально для отображения предмета (с рамкой редкости)
    │   │
    │   └── Styles            # (Если используете) Ассеты стилей (Slate Brush, Text Style и т.д.)
    │       ├── SB_ButtonStyle_Default.uasset
    │       ├── TS_MainFont_Normal.uasset
    │       └── SS_ScrollBarStyle_Custom.uasset # Slate Style Set
    │
    ├── Loading               # Экраны Загрузки
    │   └── Widgets           # WBP_LoadingScreen_Main.uasset     # Основной виджет экрана загрузки (используется в L_TransitionMap)
    │                         # WBP_LoadingScreen_TipText.uasset    # Виджет для отображения случайных подсказок
    │
    ├── Fonts                 # Файлы Шрифтов (*.ttf, *.otf) и Font Assets UE
    │   ├── Roboto/           # Пример
    │   │   ├── Roboto-Regular.uasset
    │   │   ├── Roboto-Bold.uasset
    │   │   └── Fnt_Roboto_Main.uasset      # Font Asset для использования в UMG
    │   ├── Orbitron/         # Пример Sci-Fi шрифта
    │   │   ├── Orbitron-Medium.uasset
    │   │   └── Fnt_Orbitron_Title.uasset   # Font Asset для заголовков
    │
    ├── Icons                 # Общие Иконки UI (не иконки предметов/способностей!)
    │   ├── Actions/          # Icon_Confirm_Checkmark.uasset, Icon_Cancel_X.uasset, Icon_Edit_Pencil.uasset
    │   ├── Navigation/       # Icon_Arrow_Left.uasset, Icon_Arrow_Right.uasset, Icon_Arrow_Up.uasset, Icon_Arrow_Down.uasset
    │   ├── Settings/         # Icon_Settings_Gear.uasset, Icon_Graphics_Monitor.uasset, Icon_Audio_Speaker.uasset
    │   ├── Resources/        # Icon_Resource_GenericCoin.uasset (если нужны в UI общие иконки ресурсов)
    │   └── Misc/             # Icon_Warning_Triangle.uasset, Icon_Info_Circle.uasset
    │
    └── Materials             # Материалы, специфичные для UI
        ├── Backgrounds/      # M_UI_Background_BlurryGlass.uasset, MI_UI_Background_MainMenuGradient.uasset
        ├── Effects/          # M_UI_ScanlineEffect.uasset, M_UI_GlitchEffect.uasset, M_UI_HighlightPulse.uasset
        ├── Masks/            # M_UI_Mask_RoundedCorners.uasset, M_UI_Mask_Circular.uasset
        └── Brushes/          # (Если нужны материалы для Slate Brushes) M_UI_Brush_ButtonGradient.uasset
```

### Maps

```q
Content/
└── Maps                      # Все Уровни (.umap файлы) Проекта
    ├── MainMenu              # Уровни для Главного Меню и начального флоу
    │   └── L_MainMenu.umap             # Основной уровень главного меню (отображает WBP_MainMenu)
    │
    ├── Lobby                 # Уровни для Лобби и Выбора Персонажа
    │   └── L_CharacterSelect.umap      # Уровень для выбора Шасси (отображает WBP_CharacterSelect)
    │
    ├── Transitions           # Уровни, используемые для Загрузочных Экранов между стадиями
    │   └── L_TransitionMap.umap        # Пустой (или почти пустой) уровень, который загружается быстро и отображает WBP_LoadingScreen
    │
    ├── Stages                # Основные Игровые Уровни (Стадии/Биомы Забега)
    │   │                     # Структура внутри каждого биома может использовать Level Streaming (подуровни)
    │   │
    │   ├── Tier1_RustedFrontiers # Биом: Ржавые Рубежи
    │   │   ├── Persistent/       # Главный (постоянный) уровень для этого биома
    │   │   │   └── L_RustedFrontiers_P.umap # Загружает остальные подуровни, содержит основную логику уровня
    │   │   │
    │   │   ├── Geometry/         # Подуровни с основной геометрией и процедурной генерацией
    │   │   │   ├── L_RustedFrontiers_Geo_LayoutA_01.umap # Вариант базовой геометрии/структуры
    │   │   │   ├── L_RustedFrontiers_Geo_LayoutA_02.umap # Другая часть или вариант
    │   │   │   ├── L_RustedFrontiers_Geo_LayoutB_01.umap # Альтернативный базовый лэйаут
    │   │   │   └── L_RustedFrontiers_Geo_ProceduralChunks/ # (Если используется) Папка с процедурно генерируемыми кусками уровня
    │   │   │
    │   │   ├── Gameplay/         # Подуровни с геймплейными элементами (враги, интерактивные объекты)
    │   │   │   ├── L_RustedFrontiers_Gameplay_Spawners_A.umap # Конфигурация спавнеров врагов для Layout A
    │   │   │   ├── L_RustedFrontiers_Gameplay_Interactables_A.umap # Размещение сундуков, станций для Layout A
    │   │   │   └── L_RustedFrontiers_Gameplay_BossTrigger_Guardian.umap # Логика и триггер для босса
    │   │   │
    │   │   ├── Lighting/         # Подуровни с освещением
    │   │   │   ├── L_RustedFrontiers_Lighting_Day.umap    # Дневное освещение
    │   │   │   └── L_RustedFrontiers_Lighting_Overcast.umap # Пасмурное/кислотный дождь
    │   │   │
    │   │   ├── Audio/            # Подуровни для звукового окружения
    │   │   │   └── L_RustedFrontiers_Audio_Ambient.umap # Основной эмбиент биома
    │   │   │
    │   │   ├── VFX/              # Подуровни для постоянных визуальных эффектов
    │   │   │   └── L_RustedFrontiers_VFX_Atmospheric.umap # Пыль, пар и т.д.
    │   │   │
    │   │   └── Arenas/           # Отдельные уровни/подуровни для специфичных арен или зон
    │   │       └── L_RustedFrontiers_Arena_BossGuardian.umap # Арена для босса (может загружаться отдельно или быть частью _P)
    │   │
    │   ├── Tier2_AcidicGreenhouses # Биом: Кислотные Теплицы (Аналогичная структура с Persistent, Geometry, Gameplay, Lighting и т.д.)
    │   │   ├── Persistent/       # L_AcidicGreenhouses_P.umap
    │   │   ├── Geometry/         # L_AcidicGreenhouses_Geo_LabSection.umap, L_AcidicGreenhouses_Geo_OpenArea.umap
    │   │   ├── Gameplay/         # L_AcidicGreenhouses_Gameplay_PlantEnemies.umap, L_AcidicGreenhouses_Gameplay_Chests.umap
    │   │   ├── Lighting/         # L_AcidicGreenhouses_Lighting_Interior.umap
    │   │   ├── Audio/            # L_AcidicGreenhouses_Audio_Ambient.umap
    │   │   └── VFX/              # L_AcidicGreenhouses_VFX_Spores.umap
    │   │
    │   ├── Tier2_GeothermalFields # Биом: Поля Геотермальных Аномалий (Аналогичная структура)
    │   │   ├── Persistent/       # L_GeothermalFields_P.umap
    │   │   ├── Geometry/         # L_GeothermalFields_Geo_OpenPlains.umap, L_GeothermalFields_Geo_CaveEntrance.umap
    │   │   ├── Gameplay/         # L_GeothermalFields_Gameplay_LavaHazards.umap, L_GeothermalFields_Gameplay_FireEnemies.umap
    │   │   ├── Lighting/         # L_GeothermalFields_Lighting_AshySky.umap
    │   │   ├── Audio/            # L_GeothermalFields_Audio_Ambient.umap
    │   │   └── VFX/              # L_GeothermalFields_VFX_HeatHaze.umap, L_GeothermalFields_VFX_Geysers.umap
    │   │
    │   ├── Tier3_CryoArchive # Биом: Замерзший Архив Данных (Аналогичная структура)
    │   │   ├── Persistent/       # L_CryoArchive_P.umap
    │   │   ├── ...               # Geometry, Gameplay, Lighting, Audio, VFX подпапки и уровни
    │   │
    │   ├── Tier3_OrbitalGraveyard # Биом: Орбитальное Кладбище (Аналогичная структура)
    │   │   ├── Persistent/       # L_OrbitalGraveyard_P.umap
    │   │   ├── ...               # Geometry, Gameplay (с LowGravity зонами), Lighting, Audio, VFX подпапки и уровни
    │   │
    │   ├── Final_NexusCore   # Финальный Биом/Уровень
    │   │   ├── Persistent/       # L_NexusCore_P.umap
    │   │   ├── Geometry/         # L_NexusCore_Geo_CentralChamber.umap
    │   │   ├── Gameplay/         # L_NexusCore_Gameplay_FinalBossFight.umap
    │   │   ├── Lighting/         # L_NexusCore_Lighting_Dramatic.umap
    │   │   ├── Audio/            # L_NexusCore_Audio_Epic.umap
    │   │   └── VFX/              # L_NexusCore_VFX_EnergyEffects.umap
    │   │
    │   └── SecretLevels      # (Опционально) Секретные Уровни/Зоны
    │       ├── L_Secret_LavaTunnels_P.umap
    │       └── L_Secret_MutagenCore_P.umap
    │
    ├── SharedLevels          # Общие Подуровни, которые могут загружаться разными основными уровнями
    │   │                     # (Используется реже, если только нет элементов, общих для ВСЕХ стадий)
    │   ├── Lighting/         # Общее освещение (если не уникально для каждого биома)
    │   │   ├── L_Shared_SkySphere.umap     # Глобальный скайбокс
    │   │   ├── L_Shared_DirectionalLight.umap # Глобальное солнце/луна
    │   │   └── L_Shared_PostProcess.umap   # Глобальные пост-эффекты
    │   │
    │   ├── Audio/            # Общие звуковые системы
    │   │   └── L_Shared_MusicManager.umap  # Если музыка управляется через актор в уровне
    │   │
    │   └── Gameplay/         # Очень редко - общие геймплейные менеджеры в уровне
    │       └── L_Shared_GameRulesController.umap # (Скорее всего, это будет в GameMode/GameState/Subsystem)
    │
    └── Testing               # Уровни, Используемые Исключительно для Разработки и Тестирования
        ├── FeatureTests/     # Тестирование конкретных игровых механик
        │   ├── LT_GAS_AbilityShowcase.umap     # Демонстрация способностей GAS
        │   ├── LT_ItemSystem_CraftingBench.umap # Тестирование Эволюции/Комбинации
        │   ├── LT_AI_CombatArena.umap          # Арена для тестирования поведения AI
        │   ├── LT_Chassis_MovementPlayground.umap # Площадка для тестирования модулей передвижения
        │   ├── LT_ProceduralGeneration_Debug.umap # Отладка процедурной генерации уровня
        │   ├── LT_Multiplayer_ConnectivityTest.umap # Тест подключения и репликации
        │   └── LT_Destruction_PhysicsTest.umap # Тест разрушаемых объектов
        │
        ├── ArtTests/         # Тестирование Визуальных Ассетов
        │   ├── LT_Material_Showcase.umap       # Демонстрация материалов
        │   ├── LT_Lighting_Scenarios.umap      # Тестирование разных сценариев освещения
        │   ├── LT_AssetZoo_Environment.umap    # Уровень со всеми ассетами окружения для обзора
        │   ├── LT_AssetZoo_Characters.umap     # Уровень со всеми Шасси и Врагами
        │   └── LT_VFX_Showcase.umap            # Демонстрация визуальных эффектов
        │
        ├── PerfTests/        # Тестирование Производительности
        │   ├── LT_Perf_HeavyCombatStress.umap  # Тест с большим количеством врагов и эффектов
        │   ├── LT_Perf_LargeLevelStreaming.umap # Тест производительности стриминга уровней
        │   └── LT_Perf_DrawCallTest.umap       # Тест количества Draw Calls
        │
        └── Prototypes/       # Уровни для Раннего Прототипирования (могут быть удалены позже)
            ├── LP_OldMenuLayout.umap
            ├── LP_EarlyCombatMechanics.umap
            └── LP_BiomeConcept_A.umap
```

### Audio

```q
Content/
└── Audio                     # Глобальные Аудио Ассеты и Системные Настройки
    ├── Music                 # Вся Музыка Игры
    │   ├── Menu/             # Музыка для Меню и Лобби
    │   │   ├── MUS_MainMenu_Theme.uasset           # Главная тема
    │   │   ├── MUS_CharacterSelect_Loop.uasset   # Музыка для экрана выбора Шасси
    │   │   └── MUS_Lobby_Waiting_Loop.uasset     # Музыка ожидания в лобби
    │   │
    │   ├── Gameplay_Tiers/   # Музыка для Разных Стадий/Тиров Сложности
    │   │   ├── Tier1_Rusted/   # Музыка для Ржавых Рубежей
    │   │   │   ├── MUS_Tier1_Exploration_Loop.uasset
    │   │   │   └── MUS_Tier1_Combat_Loop.uasset
    │   │   │
    │   │   ├── Tier2_Acid_Geo/ # Музыка для Кислотных Теплиц и Геотермальных Полей
    │   │   │   ├── MUS_Tier2_Exploration_Loop.uasset
    │   │   │   └── MUS_Tier2_Combat_Loop.uasset
    │   │   │
    │   │   ├── Tier3_Cryo_Orbital/ # Музыка для Замерзшего Архива и Орбитального Кладбища
    │   │   │   ├── MUS_Tier3_Exploration_Loop.uasset
    │   │   │   └── MUS_Tier3_Combat_Loop.uasset
    │   │   │
    │   │   └── Final_NexusCore/ # Музыка для Финальной Локации
    │   │       ├── MUS_Final_Approach_Loop.uasset
    │   │       └── MUS_Final_Area_Combat_Loop.uasset
    │   │
    │   ├── Gameplay_Intensity/ # (Если используется динамическая система музыки) Слои разной интенсивности
    │   │   ├── Exploration/    # Набор слоев для исследования
    │   │   │   ├── MUS_Layer_Explore_Base_Loop.uasset
    │   │   │   └── MUS_Layer_Explore_Melody_Loop.uasset
    │   │   │
    │   │   ├── Combat_Low/     # Слои для низкоинтенсивного боя
    │   │   │   ├── MUS_Layer_CombatLow_Percussion_Loop.uasset
    │   │   │   └── MUS_Layer_CombatLow_Bass_Loop.uasset
    │   │   │
    │   │   └── Combat_High/    # Слои для высокоинтенсивного боя
    │   │       ├── MUS_Layer_CombatHigh_Rhythm_Loop.uasset
    │   │       └── MUS_Layer_CombatHigh_Lead_Loop.uasset
    │   │
    │   ├── BossFights/       # Музыка для Битв с Боссами
    │   │   ├── MUS_Boss_Generic_Intro.uasset     # Общее вступление к боссу
    │   │   ├── MUS_Boss_Generic_Phase1_Loop.uasset
    │   │   ├── MUS_Boss_Generic_Phase2_Loop.uasset
    │   │   ├── MUS_Boss_GuardianMK1_Theme_Loop.uasset # Уникальная тема для босса
    │   │   └── MUS_Boss_NexusCore_FinalBattle_Loop.uasset # Уникальная тема финального босса
    │   │
    │   ├── Events/           # Музыка для Особых Игровых Событий
    │   │   ├── MUS_Event_DefenseWave_Start.uasset
    │   │   ├── MUS_Event_DefenseWave_Loop.uasset
    │   │   └── MUS_Event_TimedSurvival_Loop.uasset
    │   │
    │   └── Stingers_Jingles/ # Короткие Музыкальные Фразы (Сигналы)
    │       ├── Success/        # MUS_Stinger_ObjectiveComplete_Positive.uasset, MUS_Stinger_BossDefeated_Victory.uasset
    │       ├── Failure/        # MUS_Stinger_ObjectiveFailed_Negative.uasset, MUS_Stinger_GameOver_Melancholic.uasset
    │       ├── Discovery/      # MUS_Stinger_SecretFound_Mysterious.uasset, MUS_Stinger_NewAreaDiscovered.uasset
    │       └── ItemRarity/     # MUS_Stinger_ItemPickup_Rare.uasset, MUS_Stinger_ItemPickup_Legendary.uasset
    │
    ├── Ambience              # Фоновые Звуки Окружения (Эмбиент) - Глобальные и Специфичные для Биомов
    │   │                     # (Здесь можно хранить Sound Cues, которые комбинируют разные слои)
    │   ├── Global/           # Общие фоновые звуки
    │   │   ├── Outdoor_Base_Loop.uasset              # Базовый внешний фон (ветер, если нет специфики биома)
    │   │   ├── Indoor_RoomTone_Generic_Loop.uasset # Базовый внутренний фон (тихое гудение)
    │   │   └── Wind_Variations/                    # Зацикленные звуки ветра разной силы
    │   │       ├── AMB_Wind_Light_Loop.uasset
    │   │       ├── AMB_Wind_Medium_Loop.uasset
    │   │       └── AMB_Wind_Heavy_Storm_Loop.uasset
    │   │
    │   ├── Biomes/           # Специфичный эмбиент для каждого биома (могут быть Sound Cues)
    │   │   ├── RustedFrontiers/
    │   │   │   ├── AMB_RustedFrontiers_IndustrialHum_Distant_Loop.uasset
    │   │   │   ├── AMB_Wind_MetalCreaks_Random.uasset # Случайные скрипы металла от ветра
    │   │   │   └── SC_Ambience_RustedFrontiers.uasset # Sound Cue, комбинирующий слои
    │   │   │
    │   │   ├── AcidicGreenhouses/
    │   │   │   ├── AMB_AcidicGreenhouses_BioHum_Organic_Loop.uasset
    │   │   │   ├── AMB_LiquidDrips_Random.uasset
    │   │   │   └── SC_Ambience_AcidicGreenhouses.uasset
    │   │   │
    │   │   ├── GeothermalFields/
    │   │   │   ├── AMB_Geothermal_LowRumble_Loop.uasset
    │   │   │   ├── AMB_Lava_Sizzle_Nearby_Loop.uasset
    │   │   │   └── SC_Ambience_GeothermalFields.uasset
    │   │   │
    │   │   ├── CryoArchive/
    │   │   │   ├── AMB_CryoArchive_ServerFan_LowHum_Loop.uasset
    │   │   │   ├── AMB_Ice_Cracking_Distant_Random.uasset
    │   │   │   └── SC_Ambience_CryoArchive.uasset
    │   │   │
    │   │   ├── OrbitalGraveyard/
    │   │   │   ├── AMB_OrbitalGraveyard_ShipCreaks_MetalStress_Loop.uasset
    │   │   │   ├── AMB_ZeroG_MuffledBackground_Loop.uasset # Приглушенный фон для вакуума/низкой гравитации
    │   │   │   └── SC_Ambience_OrbitalGraveyard.uasset
    │   │   │
    │   │   └── NexusCore/
    │   │       ├── AMB_NexusCore_EnergyHum_Deep_Loop.uasset
    │   │       └── SC_Ambience_NexusCore.uasset
    │   │
    │   └── OneShots/         # Не зацикленные, случайные детали окружения
    │       ├── Distant_Explosion_Generic_01.uasset, Distant_Explosion_Generic_02.uasset
    │       ├── Creature_Call_Unknown_Distant_Random.uasset
    │       ├── Metal_Stress_Groan_Deep_Random.uasset
    │       └── Rock_Fall_Small_Random.uasset
    │
    ├── SFX_UI                # Звуковые Эффекты Пользовательского Интерфейса (ВСЕ ЗВУКИ UI ЗДЕСЬ)
    │   ├── Core/             # Самые частые и общие звуки UI
    │   │   ├── Button_Click_Standard_01.uasset, Button_Click_Standard_02.uasset # Вариации клика
    │   │   ├── Button_Hover_Subtle_01.uasset, Button_Hover_Subtle_02.uasset   # Вариации наведения
    │   │   ├── Confirm_Positive_Chime.uasset     # Подтверждение действия
    │   │   ├── Cancel_Negative_Buzz.uasset       # Отмена/Назад
    │   │   ├── Error_Feedback_Denied.uasset      # Ошибка/Невозможное действие
    │   │   ├── Transition_Screen_Smooth_Whoosh.uasset # Переход между экранами
    │   │   └── Focus_Received_SubtlePing.uasset  # Получение фокуса элементом
    │   │
    │   ├── Navigation/       # Звуки навигации по меню
    │   │   ├── Tab_Switch_Click.uasset           # Переключение вкладок
    │   │   ├── Scroll_List_Tick_Loop.uasset      # Звук прокрутки списка (зацикленный)
    │   │   ├── Scroll_List_EndStop.uasset        # Достижение конца списка
    │   │   ├── Slider_Adjust_Tick.uasset         # Изменение слайдера
    │   │   └── Dropdown_OpenClose.uasset         # Открытие/закрытие выпадающего списка
    │   │
    │   ├── HUD_Feedback/     # Звуки от элементов HUD во время игры
    │   │   ├── Notification_Minor_Blip.uasset      # Небольшое уведомление
    │   │   ├── Notification_Major_Alert.uasset     # Важное уведомление
    │   │   ├── Warning_LowHealth_Heartbeat_Loop.uasset # Начинает играть при низком здоровье
    │   │   ├── Warning_LowEnergy_PowerDown.uasset  # Предупреждение о низкой энергии
    │   │   ├── Objective_New_IncomingMessage.uasset # Появилась новая цель
    │   │   ├── Objective_Update_ProgressTick.uasset # Обновление прогресса цели
    │   │   ├── Objective_Complete_SuccessChime.uasset # Цель выполнена
    │   │   └── Difficulty_Increase_AlarmStinger.uasset # Повышение уровня сложности
    │   │
    │   ├── Items_System/     # Звуки УПРАВЛЕНИЯ предметами в UI (не подбор в мире!)
    │   │   ├── Item_DragStart_UI.uasset          # Начало перетаскивания предмета
    │   │   ├── Item_Drop_Success_UI.uasset       # Успешное размещение предмета в слоте
    │   │   ├── Item_Drop_Fail_UI.uasset          # Неудачное размещение (не тот слот)
    │   │   ├── Item_Equip_Confirm_UI.uasset      # Звук экипировки через UI
    │   │   ├── Item_Unequip_Confirm_UI.uasset    # Звук снятия через UI
    │   │   ├── Item_Recycle_Process_Loop.uasset  # Звук процесса разборки
    │   │   ├── Item_Recycle_Complete_UI.uasset   # Завершение разборки
    │   │   ├── Evolution_Confirm_UI.uasset       # Подтверждение Эволюции
    │   │   ├── Combination_Confirm_UI.uasset     # Подтверждение Комбинации
    │   │   └── Station_Craft_Success_UI.uasset   # Общий звук успешного крафта на станции
    │   │
    │   ├── Game_System/      # Звуки системных событий игры
    │   │   ├── Game_Pause_In.uasset              # Звук постановки на паузу
    │   │   ├── Game_Pause_Out.uasset             # Звук снятия с паузы
    │   │   ├── Game_Over_Soundscape.uasset       # Фоновый звук на экране Game Over
    │   │   ├── Run_Start_EngageStinger.uasset    # Сигнал начала забега
    │   │   └── LoadingScreen_Loop.uasset         # Фоновый звук на экране загрузки (если нужен)
    │   │
    │   └── CharacterSelect/  # Звуки для Экрана Выбора Шасси
    │       ├── Chassis_Select_RobotConfirm.uasset # Выбор Шасси
    │       ├── Chassis_Hover_DataStream_Loop.uasset # Наведение на Шасси
    │       └── Chassis_Locked_DeniedBeep.uasset   # Попытка выбрать заблокированное Шасси
    │
    ├── VoiceOver             # Озвучка (Если Планируется) - Глобальная
    │   ├── Announcer/        # Голос Диктора/Системы
    │   │   ├── English/        # (Подпапки для локализации)
    │   │   │   ├── Anncr_RunStart_Engage.uasset
    │   │   │   ├── Anncr_BossWarning_Incoming.uasset
    │   │   │   ├── Anncr_DifficultyUp_ThreatIncreased.uasset
    │   │   │   ├── Anncr_LowHealth_Warning.uasset
    │   │   │   └── Anncr_ObjectiveComplete.uasset
    │   │   └── Russian/        # (Пример другой локализации)
    │   │       └── ...
    │   │
    │   └── (Player Efforts/Grunts/Pain - скорее всего в Features/Chassis/Audio)
    │   └── (NPC Dialogue - если будут NPC, то в их папках)
    │
    └── System                # Системные Ассеты Настройки Звука
        ├── SoundClasses/     # Иерархия Классов Звуков для управления громкостью
        │   ├── SC_Master.uasset                # Главный класс
        │   ├── SC_Music.uasset                 # Класс для всей музыки
        │   ├── SC_Ambience.uasset              # Класс для всего эмбиента
        │   ├── SC_SFX.uasset                   # Главный класс для всех звуковых эффектов
        │   │   ├── SC_SFX_Weapons.uasset       # Подкласс для оружия
        │   │   ├── SC_SFX_Abilities.uasset     # Подкласс для способностей
        │   │   ├── SC_SFX_Chassis_Movement.uasset # Подкласс для движения Шасси
        │   │   ├── SC_SFX_Chassis_Impacts.uasset # Подкласс для получения урона Шасси
        │   │   ├── SC_SFX_AI_Movement.uasset   # Подкласс для движения AI
        │   │   ├── SC_SFX_AI_Attacks.uasset    # Подкласс для атак AI
        │   │   ├── SC_SFX_Environment_Impacts.uasset # Подкласс для ударов по окружению
        │   │   ├── SC_SFX_Environment_Hazards.uasset # Подкласс для опасностей
        │   │   └── SC_SFX_UI.uasset            # Подкласс для всех звуков UI (из папки SFX_UI)
        │   │
        │   └── SC_VoiceOver.uasset             # Класс для всей озвучки
        │
        ├── SoundMixes/       # Миксы для изменения громкости/питча классов в разных ситуациях
        │   ├── SM_Gameplay_Default.uasset        # Стандартный микс во время игры
        │   ├── SM_Menu_Paused.uasset           # Приглушает геймплейные звуки в меню паузы
        │   ├── SM_LowHealth_Danger.uasset      # Приглушает музыку/эмбиент, усиливает сердцебиение/предупреждения
        │   ├── SM_Cinematic_FocusVO.uasset     # Приглушает все, кроме VoiceOver и музыки (для катсцен)
        │   ├── SM_Settings_AudioPreview.uasset # Микс для корректного прослушивания звуков в настройках
        │   └── SM_Stealth_FocusAmbience.uasset # (Если будет стелс) Приглушает шаги, усиливает эмбиент и звуки врагов
        │
        ├── Attenuation/      # Настройки Затухания Звука с Расстоянием
        │   ├── Attenuation_Weapon_Default3D.uasset # Стандартное затухание для оружия
        │   ├── Attenuation_Ability_MediumRange3D.uasset
        │   ├── Attenuation_Footstep_CloseRange3D.uasset
        │   ├── Attenuation_Explosion_LargeRange3D.uasset
        │   ├── Attenuation_Ambient_BackgroundSphere.uasset # Затухание для эмбиентных лупов
        │   ├── Attenuation_Dialogue_ClearNear3D.uasset
        │   └── Attenuation_UI_NoAttenuation2D.uasset # Для 2D звуков UI (без затухания)
        │
        ├── Reverb/           # Настройки Эффектов Реверберации для разных пространств
        │   ├── Reverb_Default_GenericOutdoor.uasset
        │   ├── Reverb_Cave_LargeEcho.uasset
        │   ├── Reverb_Indoor_MetalCorridor_Echoey.uasset
        │   ├── Reverb_Indoor_SmallRoom_Tight.uasset
        │   ├── Reverb_ZeroG_MuffledDistant.uasset # Эффект для вакуума/космоса
        │   └── Reverb_Settings_Off.uasset         # Для отключения реверберации
        │
        └── Concurrency/      # Настройки Одновременного Воспроизведения (Ограничение количества звуков)
            ├── Concurrency_Footsteps_LimitCharacter.uasset # Ограничить шаги на персонажа
            ├── Concurrency_BulletImpacts_Max10.uasset      # Не более 10 звуков попадания пуль одновременно
            ├── Concurrency_Explosions_Limit2Large.uasset   # Не более 2 больших взрывов
            ├── Concurrency_AlarmLoop_Limit1Global.uasset   # Только один цикл тревоги глобально
            ├── Concurrency_PlayerPain_Limit1Briefly.uasset # Ограничить частоту звуков боли игрока
            ├── Concurrency_ItemPickup_Max5.uasset        # Ограничить звуки подбора предметов
            └── Concurrency_DefaultSetting.uasset           # Настройки по умолчанию (если не указано иное)
```

### Cinematic

```q
Content/
└── Cinematics              # Все Ассеты, Связанные с Катсценами и Level Sequences
    ├── Sequences           # Основные Ассеты Level Sequence (.uasset) - "Монтажные столы"
    │   │                     # Именование: LS_[Контекст]_[Описание].uasset
    │   │
    │   ├── GameFlow/         # Синематики, определяющие основной поток игры
    │   │   ├── Intro/          # Вступительные ролики
    │   │   │   └── LS_Game_Intro_Sequence.uasset       # Главное вступление (например, после меню)
    │   │   │
    │   │   ├── Outro/          # Завершающие ролики
    │   │   │   ├── LS_Game_Ending_Victory_Standard.uasset # Стандартная победная концовка
    │   │   │   ├── LS_Game_Ending_Victory_Secret.uasset   # (Если есть) Секретная/альтернативная концовка
    │   │   │   └── LS_Game_Ending_Defeat_Loop.uasset      # (Опционально) Короткий зацикленный ролик поражения (может быть UI)
    │   │   │
    │   │   └── Transitions/    # Синематики для переходов между стадиями/мирами (если они не просто экран загрузки)
    │   │       └── LS_Transition_WarpEffect.uasset      # Пример эффекта перехода через портал
    │   │
    │   ├── Bosses/           # Синематики, Связанные с Боссами
    │   │   ├── Introductions/  # Представления боссов при первом появлении
    │   │   │   ├── LS_BossIntro_GuardianMK1.uasset
    │   │   │   ├── LS_BossIntro_AcidicBehemoth.uasset   # (Пример)
    │   │   │   └── LS_BossIntro_NexusCore.uasset
    │   │   │
    │   │   ├── MidFight/       # Синематики во время боя (например, смена фазы)
    │   │   │   ├── LS_BossPhaseChange_GuardianMK1_ShieldBreak.uasset
    │   │   │   └── LS_BossPhaseChange_NexusCore_Awakening.uasset
    │   │   │
    │   │   └── Defeats/        # Синематики после победы над боссом
    │   │       ├── LS_BossDefeated_GuardianMK1_Explosion.uasset
    │   │       └── LS_BossDefeated_NexusCore_Implosion.uasset
    │   │
    │   ├── StoryMoments/     # Синематики для Ключевых Сюжетных Точек (если GDD их подразумевает)
    │   │   ├── Discovery/      # Моменты находок или открытий
    │   │   │   └── LS_Story_DiscoverCryoArchives.uasset
    │   │   │
    │   │   ├── Flashbacks/     # Флешбеки или видения
    │   │   │   └── LS_Story_CataclysmVision.uasset
    │   │   │
    │   │   └── CharacterArcs/  # Моменты, раскрывающие Шасси или мир (если есть)
    │   │       └── LS_Story_TechnicFindsDroneFriend.uasset # (Гипотетический пример)
    │   │
    │   ├── GameplayEvents/   # Короткие Синематики для Важных Геймплейных Моментов
    │   │   ├── ItemPickups/    # Короткие сценки при подборе особо редких предметов
    │   │   │   └── LS_Gameplay_Pickup_LegendaryModule.uasset
    │   │   │
    │   │   ├── ObjectiveComplete/ # Завершение важной цели уровня/стадии
    │   │   │   └── LS_Gameplay_PortalActivated_StageEnd.uasset
    │   │   │
    │   │   └── EnvironmentChanges/ # Скриптовые изменения окружения
    │   │       └── LS_Gameplay_BridgeCollapse_Sequence.uasset
    │   │
    │   ├── UISequences/      # Level Sequences, управляющие анимацией UI (альтернатива Widget Animation)
    │   │   └── LS_UI_MainMenu_EnterAnimation.uasset
    │   │
    │   └── Templates_Subscenes/ # Шаблоны и переиспользуемые под-сцены для вставки в основные синематики
    │       ├── LS_Subscene_CharacterFocusShot_CloseUp.uasset
    │       ├── LS_Subscene_EstablishingShot_Wide.uasset
    │       └── LS_Template_CameraShake_Light.uasset
    │
    ├── Assets              # Ассеты, Созданные Специально для Синематиков (не используемые в геймплее)
    │   │                     # Именование: Префикс_[Контекст]_Cinematic_[Описание].uasset
    │   │
    │   ├── Animations/     # Анимации, проигрываемые только в синематиках
    │   │   ├── Characters/   # Анимации Персонажей (Шасси, Боссы, NPC)
    │   │   │   ├── Chassis/    # Общие для Шасси
    │   │   │   │   └── A_Chassis_Cinematic_Observe_Curious.uasset
    │   │   │   │
    │   │   │   ├── Typhon/     # Специфичные для Тифона
    │   │   │   │   ├── A_Typhon_Cinematic_Intro_LandingImpact.uasset
    │   │   │   │   └── AM_Typhon_Cinematic_IntimidatingRoar.uasset # Анимационный Монтаж
    │   │   │   │
    │   │   │   ├── Phantom/    # Специфичные для Фантома
    │   │   │   │   └── A_Phantom_Cinematic_StealthyLookAround.uasset
    │   │   │   │
    │   │   │   ├── (Vector/Technic...)
    │   │   │   │
    │   │   │   └── Bosses/     # Анимации Боссов для катсцен
    │   │   │       ├── GuardianMK1/
    │   │   │       │   └── AM_Boss_GuardianMK1_Cinematic_Awaken.uasset
    │   │   │       └── NexusCore/
    │   │   │           └── A_Boss_NexusCore_Cinematic_FinalPulse.uasset
    │   │   │
    │   │   └── Props/        # Анимации для объектов окружения в катсценах
    │   │       └── A_Door_Cinematic_SlowOpen_Creaky.uasset
    │   │
    │   ├── Audio/          # Звуки и Музыка, Синхронизированные или Созданные для Катсцен
    │   │   ├── MusicCues/    # Короткие музыкальные фрагменты, запускаемые из Sequencer
    │   │   │   ├── MUS_Cue_Intro_OpeningTitles.uasset
    │   │   │   ├── MUS_Cue_BossReveal_TensionSting.uasset
    │   │   │   └── MUS_Cue_Ending_EmotionalResolve.uasset
    │   │   │
    │   │   ├── SFX/          # Звуковые эффекты, созданные специально для катсцен (не геймплейные)
    │   │   │   ├── Environment/ # SFX_Cinematic_Rumble_Deep_LowEnd.uasset, SFX_Cinematic_Wind_Howl_Exposed.uasset
    │   │   │   ├── Foley/       # SFX_Cinematic_Cloth_Movement_Slow.uasset, SFX_Cinematic_MetalFootstep_Heavy_Echo.uasset
    │   │   │   ├── Impacts/     # SFX_Cinematic_Impact_HeavySlowMotion.uasset
    │   │   │   └── Transitions/ # SFX_Cinematic_Whoosh_Slow_Deep.uasset, SFX_Cinematic_Glitch_Transition.uasset
    │   │   │
    │   │   └── VO/           # Озвучка, записанная специально для катсцен
    │   │       ├── Narration/    # VO_Intro_Narration_Part1.uasset, VO_Intro_Narration_Part2.uasset
    │   │       └── Characters/   # VO_Boss_Guardian_IntroTaunt.uasset, VO_Player_Reaction_Surprise.uasset
    │   │
    │   ├── Blueprints/     # Специальные Блюпринты для Синематиков
    │   │   ├── Cameras/      # Кастомные Камеры или Риги
    │   │   │   ├── BP_CinematicCameraRig_SmoothFollow.uasset # Риг для плавного следования
    │   │   │   ├── BP_CinematicCameraRig_HandheldSim.uasset # Симуляция ручной камеры
    │   │   │   └── BP_CinematicCameraDirector.uasset # (Опционально) Управляет переключением камер в сложной сцене
    │   │   │
    │   │   ├── Actors/       # Специальные Акторы для Катсцен
    │   │   │   ├── BP_CinematicTriggerVolume.uasset # Триггер для запуска Level Sequence
    │   │   │   ├── BP_CinematicProp_ScriptedEvent.uasset # Пропс, выполняющий действие по сигналу из Sequencer
    │   │   │   └── BP_CinematicLightSetup_Preset.uasset # Блюпринт для быстрого создания пресета освещения сцены
    │   │   │
    │   │   └── Utilities/    # Вспомогательные блюпринты
    │   │       └── BPFL_CinematicHelpers.uasset # Blueprint Function Library с утилитами для синематиков (плавный старт/стоп и т.д.)
    │   │
    │   ├── VFX/            # Визуальные Эффекты, Используемые Только в Катсценах
    │   │   ├── Atmospherics/ # NS_Cinematic_VolumetricFog_Dense.uasset, NS_Cinematic_DustMotes_Sunlit.uasset
    │   │   ├── CharacterFX/  # NS_Cinematic_Character_EnergyAura_Subtle.uasset
    │   │   ├── EnvironmentFX/ # NS_Cinematic_DebrisFall_SlowMotion.uasset
    │   │   └── Transitions/  # NS_Cinematic_FadeTransition_Particles.uasset
    │   │
    │   ├── TexturesMaterials/ # Текстуры и Материалы, Используемые Только в Катсценах
    │   │   ├── Overlays/     # T_Cinematic_LetterboxMask.uasset (Маска для черных полос), T_Cinematic_Vignette_Soft.uasset
    │   │   ├── Effects/      # M_Cinematic_ScreenDistortion.uasset, MI_Cinematic_DepthOfField_ManualControl.uasset
    │   │   └── Transitions/  # M_Cinematic_FadeToFromBlack.uasset
    │   │
    │   └── CameraAnims/    # Ассеты CameraAnim (если используются для тряски камеры)
    │       ├── CA_Handheld_LightShake.uasset
    │       └── CA_Explosion_HeavyRumble.uasset
    │
    ├── Levels              # Специальные Уровни или Подуровни, Созданные для Синематиков
    │   ├── Sets/           # Изолированные уровни-"декорации" для конкретных катсцен
    │   │   ├── L_CinematicSet_Intro_CrashSite.umap # Декорация для вступительной сцены
    │   │   ├── L_CinematicSet_BossIntro_GuardianArena.umap # Декорация для представления Стража
    │   │   ├── L_CinematicSet_CharacterCloseUp_Generic.umap # Нейтральный фон для крупных планов
    │   │   └── L_CinematicSet_GreenScreen.umap # (Если нужно) Уровень с зеленым фоном для композитинга
    │   │
    │   └── Lighting/       # Подуровни с освещением, настроенным для синематиков (загружаются аддитивно)
    │       ├── L_CinematicLighting_Intro_Day.umap
    │       ├── L_CinematicLighting_BossReveal_Dramatic.umap
    │       └── L_CinematicLighting_CharacterSpotlight.umap
    │
    └── Utilities           # Вспомогательные Ассеты и Конфигурации для Работы с Синематиками
        ├── Takes/          # Папка для записанных Дублей из Sequencer (если используется Movie Render Queue или Take Recorder)
        │   └── LS_GameIntro/   # Подпапки для каждого основного синематика
        │       └── Take_001/   # Записи дублей
        │
        ├── Config/         # Файлы Конфигурации (если используются специфичные настройки рендера и т.п.)
        │   └── MovieRenderQueue_Preset_HighQuality.uasset # Пресет настроек для Movie Render Queue
        │
        └── Placeholders/   # Временные или черновые ассеты
            └── Placeholder_Sequence_Storyboard.uasset # Пример: простой сиквенс для раскадровки
```