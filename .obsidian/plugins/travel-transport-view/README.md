# Travel Transport View

Локальный плагин для интерактивного отображения транспорта и галерей изображений в Obsidian.

## Галерея изображений

Чтобы показать изображения сеткой с просмотром крупного размера по нажатию, добавьте блок `gallery`:

````markdown
```gallery
title: "Xiangshan"
images: [
  "_/03/01_taipei101_sunset.jpg",
  "_/03/20260825143131.png"
]
```
````

Для файлов с пробелами в имени сохраняйте кавычки. Пути разрешаются сначала от корня vault, затем как обычные Obsidian-ссылки относительно текущей заметки.

## Использование

В заметке добавьте:

````markdown
```transport-board
scope: current-folder
types: bus, metro
layout: journey-board
title: Транспортные сегменты
```
````

Для новых записей используйте структурированный YAML-блок. Он отображается прямо в заметке и одновременно попадает на общую доску:

````markdown
```transport
type: metro
title: Taoyuan Airport MRT + Taipei MRT

routes:
  - from: Airport Terminal 2 (A13)
    to: Taipei Main Station (A1)
    line: Taoyuan Airport MRT
    code: A
    color: "#A93C93"
    direction: Taipei Main Station
    stops: 2

  - from: Taipei Main Station (R10)
    to: Dongmen (R07)
    line: Tamsui–Xinyi Line
    code: R
    color: "#D2072A"
    direction: Xiangshan
    stops: 3
```
````

Для автобуса используются `type: bus` и поле `route`:

````markdown
```transport
type: bus
title: Chiayi → Hinoki Village

routes:
  - from: TRA Chiayi Station
    to: Hinoki Village
    route: Zhongxiao Xinmin Main Line
    code: Red A
    operator: Kuo-Kuang
    direction: Minxiong Industrial Park Service Center
    stops: 2
    walk: 95 м / 2 мин
```
````

Inline-блок `transport` в режиме чтения показывает только компактный маршрут активности: тип, линию, код, точки и полезные детали. Поиск, фильтры, сводка и переход к исходнику доступны только в отдельной общей доске `transport-board`.

Общая доска строится с фильтрами, поиском, сводкой, карточками сегментов и переходом к исходному блоку.

Поддерживаемые значения `scope`:

- `current-folder` — все Markdown-файлы в папке текущей заметки;
- `current-note` — только текущая заметка;
- `folder` вместе с `folder: путь/к/папке` — указанная папка.

Данные маршрутов остаются в Markdown. HTML создаётся только в режиме просмотра и не записывается обратно в заметки.
