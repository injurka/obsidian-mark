```q
Content/ # Корень папки Content
├── Maps/ # Игровые карты / Уровни / Сцены
│   ├── MainMenu/
│   │   └── Map_MainMenu.umap             # Карта для главного меню
│   ├── Lobby/
│   │   └── Map_Lobby.umap                # Карта для лобби (ожидание игроков, выбор колоды)
│   └── Gameplay/
│       └── Map_GameplayBoard.umap        # Основная карта для игрового матча
│       └── Map_GameplayBoard_Lighting.umap # (Опционально) Вариации освещения или тестовые сцены
|
├── Blueprints/ # Весь пользовательский код на Blueprints (наследующие от C++ классов или чистые BP)
│   ├── Core/ # Базовые Блюпринты, наследующие от базовых C++ классов, или общие вспомогательные классы
│   │   ├── BP_PolyeGameInstance.uasset   # BP Game Instance
│   │   ├── BP_PolyePlayerStateBase.uasset# BP Player State Base
│   │   ├── BP_PolyePlayerControllerBase.uasset # BP Player Controller Base
│   │   └── BP_PolyeBoardEntityBase.uasset# BP Board Entity Base (для общих настроек, которые не в C++)
│   ├── GameModes/ # Блюпринты Game Mode, Game State, Player Controller для каждой карты
│   │   ├── MainMenu/
│   │   │   ├── BP_MainMenuGameMode.uasset
│   │   ├── Lobby/
│   │   │   ├── BP_LobbyGameMode.uasset
│   │   │   └── BP_LobbyGameState.uasset
│   │   └── Gameplay/
│   │       ├── BP_GameplayGameMode.uasset
│   │       ├── BP_GameplayGameState.uasset
│   │       └── BP_GameplayPlayerController.uasset
│   ├── GameplaySystems/ # Блюпринты, расширяющие или использующие логику C++ систем
│   │   ├── Board/
│   │   │   ├── BP_GameBoard.uasset       # Визуальное представление игровой доски, управляет полями
│   │   │   └── BP_Field.uasset           # Визуальное представление одного поля
│   │   ├── Cards/ # Логика, связанная с розыгрышем карт (если не вся в C++)
│   │   │   └── BP_CardLogic.uasset       # Базовый BP для реализации специфической логики карт (если не чисто через DataAssets/C++ Effects)
│   │   ├── Effects/ # Блюпринты для визуализации или реализации специфических эффектов
│   │   │   ├── BP_GameplayEffectBase.uasset # Базовый BP эффект (если есть BP-эффекты)
│   │   │   ├── BP_Effect_StatModifier.uasset # BP для эффекта модификации статов
│   │   │   ├── BP_Effect_Stealth.uasset    # BP для эффекта скрытности (управляет визуалом, например)
│   │   │   └── ... другие BP эффектов
│   │   └── Combat/ # Логика, связанная с боем (если не вся в C++ CombatManager)
│   │       └── BP_DamageCalculation.uasset # (Опционально) BP для расчета специфического урона
│   ├── Entities/ # Блюпринты конкретных Юнитов и Строений (наследуют от C++ или BP_BoardEntityBase)
│   │   ├── Units/
│   │   │   ├── BP_Unit_SwampBrotherhood_XYZ.uasset # Пример BP для конкретного юнита Братства Топей
│   │   │   ├── BP_Unit_CoalChildren_ABC.uasset
│   │   │   └── ... другие BP юнитов
│   │   └── Structures/
│   │       ├── BP_Structure_EtherWell.uasset # Пример BP для Строения "Эфирный колодец"
│   │       └── ... другие BP строений
│   └── MetaSystems/ # Блюпринты для мета-систем (редактор колоды, прогрессия)
│       └── Deckbuilding/
│           └── BP_DeckBuilder.uasset       # BP для логики редактора колоды
|
├── UI/ # Все ассеты UMG (Widget Blueprints)
│   ├── Widgets/ # Общие переиспользуемые виджеты
│   │   ├── WBP_Button.uasset             # Базовый стиль кнопки
│   │   ├── WBP_ProgressBar.uasset        # Виджет полосы прогресса (HP, Эфир)
│   │   ├── WBP_CardDisplay.uasset        # Виджет для отображения информации о карте (в руке, в коллекции)
│   │   └── ... другие общие виджеты
│   ├── MainMenu/ # Виджеты для главного меню
│   │   └── WBP_MainMenuScreen.uasset
│   ├── Lobby/ # Виджеты для лобби
│   │   └── WBP_LobbyScreen.uasset
│   └── Gameplay/ # Виджеты для игрового матча
│       ├── WBP_GameBoardScreen.uasset    # Основной виджет экрана матча
│       ├── WBP_HandDisplay.uasset        # Виджет, отображающий руку игрока
│       ├── WBP_ResourceDisplay.uasset    # Виджет, отображающий Эфир
│       ├── WBP_FieldDisplay.uasset       # Виджет, отображающий одно поле
│       ├── WBP_EntityDisplay.uasset      # Виджет, отображающий Юнита/Строение на поле
│       ├── WBP_CombatLog.uasset          # Виджет журнала действий
│       └── WBP_GameOverScreen.uasset     # Виджет экрана победы/поражения
|
├── Data/ # Статические игровые данные (Data Assets и Data Tables)
│   ├── DataAssets/ # Ассеты, хранящие данные о конкретных объектах/правилах
│   │   ├── Cards/
│   │   │   ├── DA_Unit_SwampBrotherhood_XYZ.uasset # Data Asset для конкретного Юнита
│   │   │   ├── DA_Structure_EtherWell.uasset # Data Asset для конкретного Строения
│   │   │   └── DA_Event_Fireball.uasset    # Data Asset для конкретного События/Заклинания
│   │   ├── Factions/
│   │   │   └── DA_Faction_SwampBrotherhood.uasset # Data Asset для фракции Братство Топей
│   │   │   └── DA_Faction_CoalChildren.uasset
│   │   │   └── DA_Faction_RootGuardians.uasset
│   │   ├── Landscapes/
│   │   │   └── DA_Landscape_MysticSwamp.uasset # Data Asset для ландшафта "Мистическое болото"
│   │   │   └── ... другие DA ландшафтов
│   │   └── Effects/ # (Опционально) Data Assets для конфигурации специфических эффектов
│   │       └── DA_EffectConfig_Poisoned.uasset # Пример: DA с параметрами эффекта Отравления
│   ├── DataTables/ # Таблицы для массового хранения однотипных данных или параметров
│   │   ├── DT_CardCatalog.uasset       # Таблица со списком всех карт и ссылками на их DataAssets
│   │   ├── DT_FactionAuraStrength.uasset # Таблица с процентами Затухающего Влияния по расстоянию
│   │   ├── DT_Balance_Units.uasset     # Таблица для быстрой настройки баланса Юнитов
│   │   └── DT_Balance_Effects.uasset   # Таблица для настройки параметров эффектов
|
├── Art/ # Визуальные ассеты, созданные художниками
│   ├── Meshes/ # 3D модели (Static Meshes и Skeletal Meshes)
│   │   ├── Fields/
│   │   │   └── SM_GameBoardTile.uasset   # Модель одной плитки поля
│   │   ├── Structures/
│   │   │   └── SM_Structure_EtherWell.uasset # Модель Эфирного колодца
│   │   ├── Units/ # (Если юниты 3D)
│   │   │   └── SKM_Unit_SwampBrotherhood_Basic.uasset # Скелетная модель Юнита
│   │   └── Props/ # Объекты окружения на картах MainMenu/Lobby/Gameplay
│   │       └── SM_MainMenuTable.uasset
│   ├── Materials/ # Материалы и инстансы материалов
│   │   ├── MasterMaterials/ # Основные, сложные материалы
│   │   ├── Instances/ # Инстансы материалов (для вариаций цвета, текстур)
│   │   │   ├── Fields/
│   │   │   ├── Structures/
│   │   │   ├── Units/
│   │   │   └── Effects/
│   │   └── UI/ # Материалы для UI
│   ├── Textures/ # Текстуры (Diffuse, Normal, Roughness, Icons и т.д.)
│   │   ├── UI/ # Иконки карт, интерфейса, аур, статусов
│   │   ├── Entities/ # Текстуры для моделей Юнитов/Строений
│   │   ├── Fields/ # Текстуры для полей
│   │   └── Effects/ # Текстуры для VFX
│   ├── VFX/ # Визуальные эффекты (Cascade или Niagara)
│   │   ├── Combat/
│   │   │   ├── NS_Hit_Physical.uasset    # Эффект попадания
│   │   │   └── NS_Healing.uasset         # Эффект исцеления
│   │   ├── Abilities/ # Эффекты, связанные с конкретными способностями/картами
│   │   │   └── NS_Card_Fireball.uasset   # Эффект заклинания Fireball
│   │   ├── Factions/ # Эффекты, уникальные для фракций (например, эффект Ауры)
│   │   │   └── NS_Aura_SwampBrotherhood.uasset
│   │   └── Landscape/ # Эффекты, связанные с ландшафтами
│   │       └── NS_Landscape_MysticSwamp_Fog.uasset # Эффект тумана
│   └── Animation/ # Анимационные ассеты (если есть)
│       ├── Units/
│       │   └── AM_Unit_SwampBrotherhood_Basic_Attack.uasset # Анимационный Монтаж атаки
│       └── Structures/ # (Если строения анимированы)
|
├── Audio/ # Все звуковые ассеты (Wave files, Sound Cues)
│   ├── Music/
│   │   ├── Music_MainMenu.uasset
│   │   └── Music_Gameplay.uasset
│   ├── SFX/ # Звуковые эффекты
│   │   ├── UI/ # Звуки интерфейса (кнопки, ошибки, уведомления)
│   │   │   └── SC_UI_ButtonClick.uasset
│   │   ├── Combat/ # Звуки боя (удар, получение урона, уничтожение)
│   │   │   └── SC_Combat_Hit.uasset
│   │   ├── Abilities/ # Звуки способностей и эффектов карт
│   │   │   └── SC_Ability_Heal.uasset
│   │   ├── Factions/ # Звуки, уникальные для фракций
│   │   │   └── SC_Faction_CoalChildren_Aura.uasset
|
└── Developer/ # Папка для специфических ассетов разработчиков (не для финальной сборки)
    └── YourName/ # Подпапка для каждого разработчика
        └── TestMap_YourName.umap
        └── TestBlueprints/
```

**Пояснения:**

1.  **Maps:** Отдельные папки для каждой уникальной карты/уровня игры.
2.  **Blueprints:** Организованы по функциональному назначению, часто отражая структуру C++ для удобства. Конкретные экземпляры сущностей (Юниты, Строения) имеют свои BP, которые настраивают внешний вид, анимацию и, возможно, специфическую BP-логику поверх C++.
3.  **UI:** Организованы по экранам, где они используются, и папка для общих, переиспользуемых виджетов.
4.  **Data:** **Критически важная папка!** Здесь хранятся все Data Assets и Data Tables, которые определяют параметры карт, фракций, ландшафтов, эффектов и т.д. Использование этих ассетов позволяет менять игровой баланс и добавлять новый контент, не меняя код. Это основа гибкости и масштабируемости.
5.  **Art:** Папка для всех визуальных ассетов, созданных художниками. Организована по типу ассета (Meshes, Materials, Textures, VFX, Animation), а внутри - по назначению или фракциям.
6.  **Audio:** Папка для всех звуковых ассетов. Организована по типу (Music, SFX) и назначению.
7.  **Developer:** Стандартная папка Unreal, используемая для хранения личных тестовых ассетов разработчиков. Не включается в финальную сборку.
