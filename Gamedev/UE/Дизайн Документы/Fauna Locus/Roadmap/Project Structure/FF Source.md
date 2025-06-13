
### **Иерархия папки `Source` (C++ Код)**

```q
FaunaLocuse/  # Корень проекта
└── Source/
    └── FaunaLocuse/ # Корень игрового модуля
        ├── FaunaLocuse.Build.cs
        ├── FaunaLocuse.h
        ├── FaunaLocuse.cpp
        |
        ├── Core/ # Фундаментальные классы и типы, используемые везде
        │   ├── FF_Types.h                      # Глобальные Enum (EBiomeType, EResourceType) и Struct (FResourceAmount)
        │   ├── FF_GameModeBase.h/.cpp          # Базовый Game Mode
        │   ├── FF_GameStateBase.h/.cpp         # Хранит глобальное состояние (время, погода)
        │   ├── FF_PlayerState.h/.cpp           # Хранит реплицируемое состояние игрока
        │   ├── FF_PlayerController.h/.cpp      # Обработка ввода (Enhanced Input)
        │   └── FF_GameInstance.h/.cpp          # Состояние игры между уровнями
        |
        ├── Character/ # Все, что связано с персонажем игрока
        │   ├── FF_Character.h/.cpp             # Базовый класс персонажа (перемещение, камера)
        │   ├── Components/ # Компоненты, которые вешаются на персонажа
        │   │   ├── SurvivalComponent.h/.cpp    # Управляет Голодом, Жаждой, Температурой
        │   │   ├── BuildingComponent.h/.cpp    # Логика предпросмотра и размещения строений
        │   │   └── InteractionComponent.h/.cpp # Логика обнаружения и взаимодействия с миром
        |
        ├── GameplaySystems/ # Ключевые игровые механики в виде систем или компонентов
        │   ├── InventorySystem/
        │   │   ├── InventoryComponent.h/.cpp   # Компонент для хранения предметов (у игрока, у контейнеров)
        │   │   └── ItemDataAsset.h             # C++ класс для UDataAsset, описывающего предмет
        │   ├── CraftingSystem/
        │   │   ├── CraftingSubsystem.h/.cpp    # Глобальный менеджер рецептов
        │   │   └── RecipeDataAsset.h           # C++ класс для UDataAsset, описывающего рецепт крафта
        │   ├── FloraSystem/
        │   │   ├── FloraDataAsset.h            # C++ класс для UDataAsset, описывающего растение (из роудмапа)
        │   │   └── GrowthComponent.h/.cpp      # Компонент для симуляции роста (может быть на растении или в Мультиферме)
        │   ├── FaunaSystem/
        │   │   ├── ArkhonidDataAsset.h         # C++ класс для UDataAsset, описывающего Архонида (из роудмапа)
        │   │   ├── GeneticsSubsystem.h/.cpp    # Глобальный менеджер для логики наследования и мутаций
        │   │   └── PopulationComponent.h/.cpp  # Компонент на Улье для управления жизненным циклом популяции
        │   ├── AutomationSystem/
        │   │   ├── EnergySubsystem.h/.cpp      # Управляет энергосетями, производством и потреблением
        │   │   └── LogisticsSubsystem.h/.cpp   # Управляет логикой конвейеров и труб
        │   └── WorldGeneration/
        │       └── PCGSubsystem.h/.cpp         # (Опционально) Централизованное управление PCG графами
        |
        ├── World/ # Акторы, существующие в игровом мире
        │   ├── Interactables/ # Объекты, с которыми можно взаимодействовать
        │   │   ├── InteractableBase.h/.cpp     # Базовый класс для всех интерактивных объектов
        │   │   ├── Multifarm.h/.cpp            # Актор Мультифермы (Этап 2)
        │   │   ├── Hive.h/.cpp                 # Актор Улья (Этап 3)
        │   │   └── CraftingStation.h/.cpp      # Актор Верстака (Этап 1)
        │   ├── Building/
        │   │   └── BuildingPieceBase.h/.cpp    # Базовый класс для всех строительных блоков (фундамент, стены)
        │   ├── Creatures/
        │   │   ├── CreatureBase.h/.cpp         # Базовый класс для всех существ (общая логика здоровья, AI)
        │   │   ├── ArkhonidCharacter.h/.cpp    # Наследник CreatureBase для Архонидов
        │   │   └── HostileFaunaCharacter.h/.cpp # Наследник CreatureBase для враждебных хищников (Этап 5)
        │   ├── Flora/
        │   │   ├── FloraBase.h/.cpp            # Базовый актор для любого растения в мире
        │   │   └── ThreateningFlora.h/.cpp     # Базовый класс для агрессивной флоры (Хищная Лоза, Этап 2)
        │   ├── Items/
        │   │   └── WorldItem.h/.cpp            # Актор для предмета, лежащего на земле
        │   └── Automation/
        │       ├── EnergyGeneratorBase.h/.cpp  # Базовый актор для генераторов
        │       ├── ConveyorBelt.h/.cpp         # Актор конвейера
        │       └── Pipe.h/.cpp                 # Актор трубы
        |
        ├── AI/ # Все, что связано с искусственным интеллектом
        │   ├── Tasks/              # Кастомные задачи для Behavior Tree (BTTask)
        │   ├── Services/           # Кастомные сервисы для Behavior Tree (BTService)
        │   └── Decorators/         # Кастомные декораторы для Behavior Tree (BTDecorator)
        |
        ├── UI/ # Базовые C++ классы для виджетов и HUD
        │   ├── FF_HUD.h/.cpp
        │   └── Widgets/
        │       └── BaseWidget.h/.cpp       # Общий базовый класс для всех виджетов UMG
        |
        └── Utilities/ # Вспомогательные классы и библиотеки
            └── FF_MathLibrary.h/.cpp

```
