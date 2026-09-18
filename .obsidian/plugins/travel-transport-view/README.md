# Travel Transport View

Локальный плагин для интерактивного отображения транспортных блоков в Obsidian.

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
