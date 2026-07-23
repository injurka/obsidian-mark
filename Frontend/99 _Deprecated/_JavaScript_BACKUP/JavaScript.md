=== Новая структура базы знаний ===
├── 00_Экосистема_и_Справочники
│   ├── ECMAScript (История, Редакции, Спецификации).md
│   ├── JavaScript (Обзор языка).md
│   └── Полезные ссылки.md
│
├── 01_Основы_JavaScript
│   ├── Типы_данных_и_Переменные
│   │   ├── Примитивы (String, Number, Boolean, Null, Undefined, Symbol).md
│   │   ├── Преобразование типов.md
│   │   └── Оболочки примитивов.md
│   ├── Операторы
│   │   ├── Арифметические, Логические, Условные, Битовые.md
│   │   ├── Присваивание, Эквивалентность, Запятая.md
│   │   └── void, typeof, instanceof.md
│   ├── Управляющие_конструкции
│   │   ├── if-else, switch.md
│   │   └── Циклы (while, do-while, for, for...in, for...of).md
│   └── Регулярные выражения.md
│
├── 02_Функции_и_Контекст
│   ├── Базовые концепции (Синтаксис, Arrow functions, Функции высшего порядка).md
│   ├── this и Контекст вызова.md
│   ├── Call, Apply, Bind.md
│   └── Замыкания и Лексическое окружение.md
│
├── 03_Структуры_данных_и_Объекты
│   ├── Коллекции (Map, Set, WeakMap, WeakSet).md
│   ├── Деструктуризация, Spread и Rest.md
│   ├── Глубокое и поверхностное копирование.md
│   ├── Бинарные данные (ArrayBuffer, Blob, File).md [MERGED]
│   └── Встроенные объекты (Math, Date, RegExp, Global).md
│
├── 04_ООП_и_Классы
│   ├── Прототипы и Прототипное наследование.md
│   ├── Синтаксис классов (ES6+).md
│   ├── Наследование классов (extends, super).md
│   ├── Приватные и защищенные свойства.md
│   └── Примеси (Mixins).md
│
├── 05_Асинхронность_и_Событийный_цикл
│   ├── Event Loop (Событийный цикл) и Макро/Микротаски.md [NEW - очень важно!]
│   ├── Promise (resolve, reject, all, any, race, allSettled).md
│   ├── async ~ await.md
│   └── for await...of.md
│
├── 06_Браузерное_окружение_и_DOM
│   ├── Архитектура (BOM, CSSOM, DOM, Shadow DOM).md
│   ├── BOM (window, navigator, location, history, screen).md
│   ├── DOM_Манипуляции
│   │   ├── Иерархия узлов (Тип Node, HTMLCollection, NodeList).md
│   │   ├── Поиск элементов (getElementById, querySelector и др.).md
│   │   └── Изменение документа.md
│   ├── События
│   │   ├── Введение, Всплытие и погружение.md
│   │   ├── Делегирование событий.md
│   │   └── Пользовательские события.md
│   └── Наблюдатели (MutationObserver, IntersectionObserver, ResizeObserver).md
│
├── 07_Сетевые_запросы_и_Связь
│   ├── REST API и Базовые запросы
│   │   ├── Fetch API.md
│   │   ├── XMLHttpRequest.md
│   │   ├── Beacon API.md
│   │   └── Long Polling vs Server Sent Events (SSE).md
│   ├── WebSocket
│   │   ├── WebSocket (База).md
│   │   └── Паттерны (переподключение, heartbeat, мультиплексирование).md
│   ├── WebRTC (Полный цикл)
│   │   ├── Архитектура, Схема работы, Кодеки.md
│   │   ├── Формирование SDP, ICE, Переподключение.md
│   │   ├── Составляющие (MediaStream, PeerConnection, DataChannel).md
│   │   └── Сбор метрик (getStats).md
│   └── Альтернативы (GraphQL, RPC, tRPC, gRPC-Web).md
│
├── 08_Браузерные_API_и_Медиа
│   ├── Графика и Анимации
│   │   ├── requestAnimationFrame.md
│   │   ├── Web Animation API.md
│   │   ├── Canvas API.md
│   │   ├── WebGL.md
│   │   └── WebGPU.md
│   ├── Web Workers (Dedicated, Shared, Service Workers).md
│   ├── Хранение данных
│   │   ├── Cookie.md
│   │   ├── Web Storage (Local/Session).md
│   │   ├── Indexed DB.md
│   │   ├── Cache Storage API.md
│   │   └── Offline-first и CRDTs.md
│   └── Аппаратные и Системные API
│       ├── Geolocation, Media Session, Page Visibility.md
│       ├── Web Share, Web Speech, Web Push.md
│       └── File system Access, Payment Handler.md
│
├── 09_Продвинутый_JavaScript
│   ├── Итераторы и Генераторы (Протокол итератора, Symbol.iterator).md
│   ├── Управление памятью
│   │   ├── Стек вызовов и Куча.md
│   │   ├── Сборщик мусора (GC) и Утечки памяти.md
│   │   └── WeakRef и FinalizationRegistry.md
│   ├── Обработка ошибок (try..catch, Custom Errors).md
│   ├── Модульная система (ESM, CJS, AMD, UMD).md
│   └── Proxy и Reflect.md [NEW]
│
├── 10_Архитектура_и_Паттерны
│   └── Паттерны проектирования в JS.md
│
├── 11_Инструменты_и_Сборка
│   ├── Пакетные менеджеры (npm, yarn, pnpm, bun).md
│   ├── Сборщики модулей (Webpack, Vite, Rollup).md [Merged]
│   ├── Компиляция и AST (Babel, SWC, AST-деревья).md
│   └── Линтеры и Форматтеры.md
│
└── 12_Вопросы_для_собеседований
    ├── Вопросы по JS.md
    ├── async vs defer.md
    └── cookies.md
