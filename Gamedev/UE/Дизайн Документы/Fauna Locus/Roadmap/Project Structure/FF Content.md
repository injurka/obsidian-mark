
### **Иерархия папки `Content` (Ассеты и Блюпринты)**

```q
Content/
├── Maps/
│   └── MainWorld.umap              # Основная игровая карта
│   └── Testbed_Systems.umap        # Карта-песочница для тестирования механик
|
├── Blueprints/
│   ├── Core/
│   │   ├── BP_GameMode.uasset
│   │   ├── BP_PlayerState.uasset
│   │   └── BP_PlayerController.uasset
│   ├── Character/
│   │   └── BP_Character.uasset     # Наследуется от AFF_Character, здесь настраиваются визуал, анимации и т.д.
│   ├── Systems/ # Блюпринты для управления системами (если нужно)
│   ├── World/ # Блюпринты для акторов мира
│   │   ├── Interactables/
│   │   │   ├── BP_Multifarm.uasset         # Наследник от AMultifarm
│   │   │   ├── BP_Hive.uasset              # Наследник от AHive
│   │   │   ├── BP_Workbench.uasset         # Наследник от ACraftingStation
│   │   │   └── BP_GeneticAnalyzer.uasset   # (Может быть уникальным интерактивным актором)
│   │   ├── Building/
│   │   │   ├── BP_Foundation_Wood.uasset   # Наследники от ABuildingPieceBase
│   │   │   ├── BP_Wall_Wood.uasset
│   │   │   └── BP_Ceiling_Wood.uasset
│   │   ├── Creatures/
│   │   │   ├── Arkhonids/
│   │   │   │   └── BP_Arkhonid_ResourceA.uasset # Конкретный вид Архонида, наследуется от AArkhonidCharacter
│   │   │   └── Hostile/
│   │   │       └── BP_Predator_Wolf.uasset    # Конкретный враг, наследуется от AHostileFaunaCharacter
│   │   ├── Flora/
│   │   │   ├── Wild/
│   │   │   │   └── BP_Wild_OakTree.uasset      # Наследники от AFloraBase
│   │   │   └── Threats/
│   │   │       └── BP_ThreateningVine.uasset # Наследник от AThreateningFlora
│   │   ├── Items/
│   │   │   └── BP_WorldItem.uasset         # Наследник от AWorldItem, настраивается через DataAsset
│   │   └── Automation/
│   │       ├── BP_Generator_Biomass.uasset # Наследники от AEnergyGeneratorBase
│   │       ├── BP_ConveyorBelt.uasset
│   │       └── BP_Pipe.uasset
│   └── AI/
│       ├── BT_Arkhonid_Wild.uasset         # Дерево поведения для дикого Архонида (поиск еды, блуждание)
│       └── BT_Predator.uasset              # Дерево поведения для хищника (охота, патрулирование)
|
├── Data/ # САМАЯ ВАЖНАЯ ПАПКА ДЛЯ ГЕЙМ-ДИЗАЙНА
│   ├── DataAssets/
│   │   ├── Items/
│   │   │   ├── DA_Item_WoodLog.uasset
│   │   │   └── DA_Item_SimpleAxe.uasset
│   │   ├── Recipes/
│   │   │   ├── DA_Recipe_SimpleAxe.uasset
│   │   │   └── DA_Recipe_WoodWall.uasset
│   │   ├── Flora/ # Данные для всех видов растений
│   │   │   └── DA_Flora_TemperateTree.uasset
│   │   │   └── DA_Flora_Glowshroom.uasset
│   │   ├── Arkhonids/ # Данные для всех видов Архонидов
│   │   │   └── DA_Arkhonid_HoneyProducer.uasset
│   │   └── Biomes/
│   │       └── DA_Biome_TemperateForest.uasset # Свойства биома: погода, спавн ресурсов и т.д.
│   ├── DataTables/
│   │   ├── DT_ItemRegistry.uasset      # Таблица всех предметов в игре
│   │   └── DT_BuildingCosts.uasset   # Таблица стоимости всех строений
│   └── PCG/ # Графы для Procedural Content Generation
│       └── PCG_TemperateForest.uasset
|
├── UI/
│   ├── Textures/ # Иконки, фоны, элементы
│   ├── Materials/ # Материалы для UI
│   ├── Fonts/
│   └── Widgets/
│       ├── WBP_HUD.uasset          # Главный игровой интерфейс
│       ├── WBP_Inventory.uasset    # Виджет инвентаря
│       ├── WBP_Crafting.uasset     # Виджет верстака
│       ├── WBP_Multifarm_UI.uasset # Интерфейс взаимодействия с Мультифермой
│       ├── WBP_Genetics_UI.uasset  # Интерфейс анализатора генов
│       └── WBP_Hive_UI.uasset      # Интерфейс Улья
|
├── Art/
│   ├── Meshes/
│   │   ├── Environment/ # Камни, скалы, и т.д.
│   │   ├── Flora/ # Модели деревьев, кустов, грибов
│   │   ├── Fauna/ # Модели Архонидов и врагов
│   │   ├── Building/ # Модели стен, фундаментов
│   │   └── Items/ # Модели инструментов, ресурсов
│   ├── Textures/ # Структура папок повторяет Meshes
│   ├── Materials/ # Master материалы и инстансы, структура повторяет Meshes
│   ├── VFX/ # Niagara или Cascade эффекты (дождь, рост растений, взрывы)
│   └── Animations/
│       ├── Player/
│       └── Fauna/ # Анимации для каждого существа в своей папке
|
├── Audio/
│   ├── Music/
│   ├── SFX/ # Звуковые эффекты
│   │   ├── UI/
│   │   ├── Player/
│   │   ├── World/ # Звуки окружения, шагов по разным поверхностям
│   │   └── Creatures/
│   └── Dialogue/ # (Если будет)
|
└── ThirdParty/ # Все ассеты из Epic Games Marketplace или других источников
    └── SomeAssetPack/

```
