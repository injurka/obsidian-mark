```q
Polye/  # Корень проекта Unreal Engine
├── Content/ # Здесь лежат все ассеты игры (карты, блюпринты, меши, материалы, звуки и т.д.)
└── Source/
    └── Polye/ # Корень вашего основного игрового модуля
        ├── Polye.Build.cs          # Файл сборки модуля, определяющий зависимости и настройки
        ├── Polye.h                 # Основной заголовочный файл модуля, часто включает другие главные заголовки
        ├── Polye.cpp               # Основной файл реализации модуля (точка входа)
        |
        ├── Core/ # Фундаментальные классы, структуры и перечисления, используемые в разных частях игры
        │   ├── PolyeTypes.h              # Общие определения: Enum (EFieldType, ECardType, EFaction), Struct (FCardData, FEffectData), базовые интерфейсы
        │   ├── PolyeGameInstance.h       # Класс Game Instance (управляет состоянием игры между уровнями, например, данными игрока вне матча)
        │   ├── PolyeGameInstance.cpp
        │   ├── PolyePlayerStateBase.h    # Базовый класс Player State (хранит реплицируемое состояние игрока: Эфир, руку, данные колоды)
        │   ├── PolyePlayerStateBase.cpp
        │   ├── PolyePlayerControllerBase.h # Базовый класс Player Controller (обрабатывает ввод игрока, взаимодействует с UI)
        │   ├── PolyePlayerControllerBase.cpp
        │   └── PolyeBoardEntityBase.h    # Базовый класс для всех сущностей на поле (Юниты, Строения), содержит базовые атрибуты (HP, Faction, Field)
        │   └── PolyeBoardEntityBase.cpp
        |
        ├── GameModes/ # Классы, специфичные для каждого уникального уровня (карты / сцены) в игре
        │   ├── MainMenu/ # Логика для сцены Главного меню
        │   │   ├── PolyeMainMenuGameMode.h     # Определяет Game Mode для Главного меню (например, создание UI, обработка выбора пунктов меню)
        │   │   └── PolyeMainMenuGameMode.cpp
        │   ├── Lobby/ # Логика для сцены Лобби (перед матчем)
        │   │   ├── PolyeLobbyGameMode.h      # Определяет Game Mode для Лобби (управление комнатой, выбор колоды, готовность игроков)
        │   │   ├── PolyeLobbyGameMode.cpp
        │   │   ├── PolyeLobbyGameState.h     # Game State для Лобби (реплицирует состояние лобби: список игроков, выбранные колоды)
        │   │   └── PolyeLobbyGameState.cpp
        │   └── Gameplay/ # Логика для сцены Игрового матча
        │       ├── PolyeGameplayGameMode.h     # Определяет Game Mode для матча (управляет ходами, фазами, условиями победы/поражения)
        │       ├── PolyeGameplayGameMode.cpp
        │       ├── PolyeGameplayGameState.h    # Game State для матча (реплицирует состояние поля, всех сущностей, состояние игроков, Эфир)
        │       ├── PolyeGameplayGameState.cpp
        │       ├── PolyeGameplayPlayerController.h # Player Controller для матча (обрабатывает ввод игрока на поле, розыгрыш карт, выбор целей)
        │       └── PolyeGameplayPlayerController.cpp
        |
        ├── GameplaySystems/ # Основные системы геймплея, которые используются в матче
        │   ├── Board/ # Системы, связанные с игровым полем и его состоянием
        │   │   ├── PolyeBoard.h              # Класс, представляющий всю игровую доску (сетка 3x5), управляет полями
        │   │   ├── PolyeBoard.cpp
        │   │   ├── PolyeField.h              # Класс, представляющий одно игровое поле (хранит сущности на нем, фракцию, ландшафт)
        │   │   └── PolyeField.cpp
        │   ├── Factions/ # Системы, связанные с фракциями и их влиянием
        │   │   ├── PolyeFactionData.h        # Data Asset для хранения статических данных о каждой фракции (название, Ауры, доступные Ландшафты)
        │   │   └── PolyeFactionManager.h     # Менеджер или Subsystem для доступа к данным фракций
        │   ├── Landscape/ # Системы, связанные с ландшафтами и их эффектами
        │   │   ├── PolyeLandscapeData.h      # Data Asset для хранения статических данных о каждом ландшафте (название, эффект Ульты)
        │   │   └── PolyeLandscapeManager.h   # Менеджер или Subsystem для доступа к данным ландшафтов
        │   ├── Cards/ # Системы, связанные с картами (данные, колода, рука)
        │   │   ├── PolyeCardData.h           # Базовый Data Asset для хранения статических данных о любой карте
        │   │   ├── PolyeUnitCardData.h       # Data Asset для карт Юнитов (наследует от PolyeCardData, добавляет HP, Attack, Cost)
        │   │   ├── PolyeStructureCardData.h  # Data Asset для карт Строений (наследует от PolyeCardData, добавляет HP, Cost, спец.свойства)
        │   │   ├── PolyeEventCardData.h      # Data Asset для карт Событий/Заклинаний (наследует от PolyeCardData, добавляет Cost, эффект)
        │   │   ├── PolyeCardManager.h        # Менеджер или Subsystem для загрузки и предоставления доступа ко всем данным карт
        │   │   ├── PolyeDeckComponent.h      # Компонент Player State для управления колодой игрока в матче
        │   │   ├── PolyeDeckComponent.cpp
        │   │   ├── PolyeHandComponent.h      # Компонент Player State для управления рукой игрока в матче
        │   │   └── PolyeHandComponent.cpp
        │   ├── Economy/ # Системы, связанные с ресурсом Эфир
        │   │   └── PolyeEtherComponent.h     # Компонент Player State для управления запасом Эфира, лимитом и приростом
        │   │   └── PolyeEtherComponent.cpp
        │   ├── Combat/ # Системы, связанные с боем, уроном, исцелением и приоритетами
        │   │   ├── PolyeCombatManager.h      # Менеджер или Subsystem для разрешения атак, расчета урона/исцеления, проверки приоритетов
        │   │   └── PolyeCombatManager.cpp
        │   └── Effects/ # Система для управления всеми игровыми эффектами (Баффы, Дебаффы, Статусы, Ауры, Ульты полей/Ландшафтов)
        │       ├── PolyeGameplayEffectBase.h # Базовый класс для всех активных эффектов, применяемых к сущностям или полям
        │       ├── PolyeGameplayEffectBase.cpp
        │       ├── PolyeDecayingInfluenceSystem.h # Отдельная система/менеджер для расчета и применения Аур Затухающего Влияния
        │       ├── PolyeDecayingInfluenceSystem.cpp
        │       ├── PolyeEffectManager.h      # Менеджер или Subsystem для создания, применения, отслеживания и удаления эффектов
        │       ├── PolyeEffectManager.cpp
        │       └── Implementations/ # Конкретные реализации различных типов эффектов
        │           ├── PolyeEffect_StatModifier.h # Пример: эффект, меняющий атрибут (Attack, HP)
        │           ├── PolyeEffect_StatModifier.cpp
        │           ├── PolyeEffect_Status_Stealth.h # Пример: эффект статуса (Скрытность, Неистовство)
        │           ├── PolyeEffect_Status_Stealth.cpp
        │           ├── PolyeEffect_Aura_HealReduction.h # Пример: эффект Ауры (снижение исцеления)
        │           ├── PolyeEffect_Aura_HealReduction.cpp
        │           ├── PolyeEffect_Field_Overheat.h # Пример: эффект Ульты поля (Перегрев)
        │           ├── PolyeEffect_Field_Overheat.cpp
        │           └── ... другие специфические эффекты из дизайн-документа
        |
        ├── Entities/ # Классы игровых сущностей, которые спавнятся и размещаются на поле
        │   ├── PolyeUnit.h                 # Класс Юнита (наследует от PolyeBoardEntityBase), содержит логику атаки, способностей юнита
        │   ├── PolyeUnit.cpp
        │   ├── PolyeStructure.h            # Класс Строения (наследует от PolyeBoardEntityBase), содержит логику генерации ресурсов, защитных/атакующих способностей строения
        │   └── PolyeStructure.cpp
        |
        ├── UI/ # Классы C++, связанные с пользовательским интерфейсом (часто являются родительскими для Блюпринтов UMG)
        │   ├── Widgets/ # Базовые классы для различных типов виджетов
        │   │   ├── WBP_PolyeBaseWidget.h     # Базовый класс для всех UMG виджетов в игре
        │   │   ├── WBP_GameBoard.h         # Виджет игрового экрана матча (содержит другие виджеты: поле, рука, ресурсы)
        │   │   ├── WBP_GameBoard.cpp
        │   │   ├── WBP_CardInHand.h        # Виджет, отображающий одну карту в руке игрока
        │   │   ├── WBP_CardInHand.cpp
        │   │   ├── WBP_UnitInfo.h          # Виджет для отображения информации о юните или строении
        │   │   ├── WBP_UnitInfo.cpp
        │   │   └── ... другие виджеты для меню, лобби, редактора колоды и т.д.
        │   └── WidgetControllers/ # (Опционально) Классы-контроллеры для реализации логики UI и связывания его с игровыми данными (MVVM)
        │       └── PolyeGameBoardWidgetController.h # Пример контроллера для игрового экрана
        |
        ├── MetaSystems/ # Системы, существующие за пределами одного игрового матча (мета-системы)
        │   ├── Deckbuilding/ # Система создания и управления колодами вне матча
        │   │   └── PolyeDeckBuilder.h        # Класс, отвечающий за логику редактора колоды и сохранение/загрузку колод
        │   │   └── PolyeDeckBuilder.cpp
        │   └── Progression/ # Системы прогрессии игрока (уровень, опыт, рейтинг, достижения)
        │       └── PolyeProgressionManager.h # Класс, управляющий уровнем игрока, рейтингом, квестами и достижениями
        │       └── PolyeProgressionManager.cpp
        └── Utilities/ # Вспомогательные классы и функции, не относящиеся к конкретной системе
            └── PolyeMathLibrary.h        # Статические функции для специфических расчетов
            └── PolyeMathLibrary.cpp
```