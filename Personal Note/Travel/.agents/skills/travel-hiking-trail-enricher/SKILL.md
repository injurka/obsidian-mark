---
name: travel-hiking-trail-enricher
description: >-
  Используй этот навык для поиска всех хайкинг-активностей, пешеходных троп,
  велопрогулок и треккинговых маршрутов в дневных файлах маршрута (02 - Маршрутный план/*)
  и добавления к ним строк `_Хайкинг-трек_:` с реальными ссылками на AllTrails,
  Hikingbook Taiwan или Google Maps Walking/Bicycling Directions.
  Обеспечивает совместимость с obsidian-importer для рендера маршрутов на карте в Trip Scheduler.
---

# 🥾 Travel Hiking Trail Enricher: Добавление Хайкинг-Треков в Заметки

Этот навык обучает агента автоматически находить все пешие, горные и велосипедные маршруты
в тревел-заметках Obsidian и дополнять их машиночитаемыми ссылками на хайкинг-треки.

> [!IMPORTANT]
> Строки `_Хайкинг-трек_:` и `_Велотрек_:` автоматически распознаются
> `obsidian-importer` и преобразуются в интерактивный маршрут на карте в Trip Scheduler
> (секция Geolocation с нарисованной нитью пути и режимом `transportMode: foot` или `bike`).

---

## 🎯 1. Когда применять этот навык

Применяй навык, когда активность содержит хотя бы один из сигналов:

| Сигнал в тексте | Примеры |
|:---|:---|
| Ключевые слова | хайкинг, треккинг, trekking, trail, тропа, маршрут (пешком), подъем, спуск, лесная прогулка |
| Велотрасса / байк-маршрут | велопрогулка, велотрасса, bike trail, cycling path, YouBike |
| Конкретные горы и парки | Elephant Mountain, Alishan, Shoushan, Qixingtan, Taroko, Liyu Mountain |
| Набор высоты | указание «600 м», «2200 м», «подъем на вершину» |
| Берег / прибрежная тропа | coastal trail, береговой маршрут, прибрежная дорожка |
| Экотропы в парках | Botanical Garden Trail, mangrove walkway, boardwalk |

---

## 📐 2. Форматы строк для вставки

### А. AllTrails (предпочтительно)
Используй, если маршрут есть в базе AllTrails (Taiwan):
```markdown
    _Хайкинг-трек_: [AllTrails: <Название маршрута>](<прямой URL на alltrails.com>)
```

### Б. Google Maps Walking Directions (если нет на AllTrails)
```markdown
    _Хайкинг-трек_: [Google Maps: <Старт → Финиш>](https://www.google.com/maps/dir/<Старт>/<Финиш>/?travelmode=walking)
```

### В. Google Maps Bicycling (для велотрасс)
```markdown
    _Велотрек_: [Google Maps: <Старт → Финиш>](https://www.google.com/maps/dir/<Старт>/<Финиш>/?travelmode=bicycling)
```

### Г. Google Maps Multi-Waypoint (для кольцевых и многоточечных маршрутов)
```markdown
    _Хайкинг-трек_: [Google Maps: <Название петли>](https://www.google.com/maps/dir/<Точка1>/<Точка2>/<Точка3>/<Точка1>/?travelmode=walking)
```

> [!NOTE]
> Строка вставляется с **4-пробельным отступом** (под буллет активности, вместе с другими
> `_Ссылка на локацию_:` строками). Это обязательное требование парсера для корректной привязки
> трека к нужной активности. Строка идёт ПОСЛЕ `_Ссылка на локацию_:` и ДО `> [!TIP]`.

---

## 🏷️ 3. Правила позиционирования

```markdown
* **08:45 - 10:00** — Хайкинг по тропе Mist Trail (Шичжоу):
    * *Контекст*: Живописные эко-тропы сквозь чайные террасы.
    * _Ссылка на локацию_: [Google Maps: Mist Trail Shizhuo](https://maps.google.com/?q=Mist+Trail+Shizhuo)<iframe ...></iframe>
    * _Хайкинг-трек_: [AllTrails: Shizhuo Tea Trails Loop](https://www.alltrails.com/trail/taiwan/chiayi/shizhuo-tea-trails)

> [!TIP] Совет к хайкингу
> Выходи до 09:00 — туман рассеивается к 10 утра.
```

**Правила:**
1. `_Хайкинг-трек_:` всегда идёт **ПОСЛЕ** `_Ссылка на локацию_:` и **ДО** первого коллаута `> [!TIP]`.
2. Если у активности несколько участков (Trail #1, Trail #2) — добавляй **отдельную строку** для каждого.
3. Для велосипедных маршрутов пиши `_Велотрек_:` — парсер распознаёт оба варианта.

---

## 🗺️ 4. Каталог Тайваньских Маршрутов (база готовых ссылок)

### 🏙️ Тайбэй и окрестности

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Elephant Mountain / Xiangshan Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Elephant Mountain Trail](https://www.alltrails.com/trail/taiwan/taipei/xiangshan-elephant-mountain-trail)` |
| Xiaoyoukeng Volcano Fumeroles Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Xiaoyoukeng Trail](https://www.alltrails.com/trail/taiwan/new-taipei/xiaoyoukeng-trail)` |
| Maokong Tea Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Maokong Tea Trail](https://www.alltrails.com/trail/taiwan/taipei/maokong-tea-trail)` |
| Zhinan Temple Hiking Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Zhinan Temple Trail](https://www.alltrails.com/trail/taiwan/taipei/zhinan-temple-trail)` |

### 🌊 Ілань / Цзяоси

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Wufengqi Waterfall Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Wufengqi Waterfall Trail](https://www.alltrails.com/trail/taiwan/yilan/wufengqi-waterfall-trail)` |
| Taipingshan Forest Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Taipingshan National Forest](https://www.alltrails.com/trail/taiwan/yilan/taipingshan-national-forest-recreation-area)` |

### 🌊 Хуалянь / Тароко / Цисинтань

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Liyu Mountain Trail (Carp Mountain) | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Liyu Mountain Trail](https://www.alltrails.com/trail/taiwan/hualien/liyu-mountain-trail)` |
| Taroko Gorge Shakadang Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Shakadang Trail Taroko](https://www.alltrails.com/trail/taiwan/hualien/shakadang-trail)` |
| Qixingtan Beach Coastal Walk | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Qixingtan Coastal Walk](https://www.google.com/maps/dir/Qixingtan+Beach+Hualien/Hualien+Harbor/?travelmode=walking)` |
| Qingshui Cliffs Scenic Trail | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Qingshui Cliffs Overlook](https://www.google.com/maps/dir/Qingshui+Cliffs+Hualien/Taroko+National+Park/?travelmode=walking)` |

### 🏞️ Озеро Солнца и Луны (Sun Moon Lake)

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Sun Moon Lake Bike Trail (CNN Top-10) | 🚴 bike | `_Велотрек_: [AllTrails: Sun Moon Lake Bike Path](https://www.alltrails.com/trail/taiwan/nantou/sun-moon-lake-bike-trail)` |
| Shuishe to Xiangshan Lakeside Walk | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Sun Moon Lake Lakeside Walk](https://www.google.com/maps/dir/Sun+Moon+Lake+Shuishe+Pier/Xiangshan+Visitor+Center+Sun+Moon+Lake/?travelmode=walking)` |
| Wenwu Temple Loop Trail | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Wenwu Temple Trail Loop](https://www.google.com/maps/dir/Wenwu+Temple+Sun+Moon+Lake/Shuishe+Pier+Sun+Moon+Lake/?travelmode=walking)` |

### 🍵 Шичжоу (Shizhuo / Alishan Outskirts)

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Shizhuo Mist Trail & Tea Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Shizhuo Tea Trails Alishan](https://www.alltrails.com/trail/taiwan/chiayi/shizhuo-tea-trails)` |
| Shizhuo Bamboo Grove Loop | 🥾 foot | `_Хайкинг-трек_: [Google Maps: Shizhuo Tea Garden Loop](https://www.google.com/maps/dir/Shizhuo+Camping+Area+Alishan/Shizhuo+Alishan/?travelmode=walking)` |

### 🌲 Алишань (Alishan National Forest Recreation Area)

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Giant Tree Plank Trail #1 (Xianglin Sacred Tree) | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Alishan Giant Tree Plank Trail](https://www.alltrails.com/trail/taiwan/chiayi/alishan-giant-tree-plank-trail)` |
| Giant Tree Plank Trail #2 (Tree #28 / Ciyun Temple) | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Alishan Shenmu Tree Trail](https://www.alltrails.com/trail/taiwan/chiayi/alishan-shenmu-trail)` |
| Cherry Blossom Trail (Chaoping Line) | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Alishan Cherry Blossom Trail](https://www.alltrails.com/trail/taiwan/chiayi/alishan-cherry-blossom-trail)` |
| Zhushan Sunrise Viewing Platform Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Alishan Zhushan Sunrise Trail](https://www.alltrails.com/trail/taiwan/chiayi/alishan-zhushan-sunrise-trail)` |
| Alishan Forest Full Loop (Tree Spirit Pagoda → Shenmu → Chaoping) | 🥾 foot | `_Хайкинг-трек_: [Google Maps: Alishan Forest Loop](https://www.google.com/maps/dir/Alishan+Station/Tree+Spirit+Pagoda+Alishan/Shenmu+Station+Alishan/Chaoping+Station+Alishan/?travelmode=walking)` |

### 🏙️ Тайнань

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Sicao Mangrove Green Tunnel Boardwalk | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Sicao Mangrove Green Tunnel](https://www.google.com/maps/dir/Sicao+Green+Tunnel+Tainan/Sicao+Wildlife+Refuge/?travelmode=walking)` |
| Anping Old Street & Fort Coastal Walk | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Anping Old Fort Walk Tainan](https://www.google.com/maps/dir/Anping+Fort+Tainan/Anping+Old+Street/?travelmode=walking)` |

### ⚓ Гаосюн / Шоушань

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Shoushan Nature Park Macaque Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Shoushan Nature Park Trail](https://www.alltrails.com/trail/taiwan/kaohsiung/shoushan-nature-park)` |
| Cijin Island Coastal Bike & Walk | 🚴 bike | `_Велотрек_: [Google Maps: Cijin Island Coastal Path](https://www.google.com/maps/dir/Cijin+Beach+Kaohsiung/Cijin+Lighthouse+Kaohsiung/?travelmode=bicycling)` |

### 🐢 Остров Сяолюцю (Xiaoliuqiu / Liuqiu Island)

| Маршрут | Тип | Готовая строка |
|:---|:---:|:---|
| Xiaoliuqiu Full Island Coastal Trail | 🥾 foot | `_Хайкинг-трек_: [AllTrails: Xiaoliuqiu Coastal Trail](https://www.alltrails.com/trail/taiwan/pingtung/xiaoliuqiu-island-coastal-trail)` |
| Vase Rock to Geban Bay Coastal Walk | 🥾 foot | `_Хайкинг-трек_: [Google Maps: Xiaoliuqiu Vase Rock to Geban Bay](https://www.google.com/maps/dir/Vase+Rock+Xiaoliuqiu/Geban+Bay+Xiaoliuqiu/?travelmode=walking)` |
| Houshi Fringing Reef Snorkeling Path | 🚶 walk | `_Хайкинг-трек_: [Google Maps: Houshi Reef Xiaoliuqiu](https://www.google.com/maps/dir/Houshi+Fringing+Reef+Xiaoliuqiu/Geban+Bay/?travelmode=walking)` |

---

## 🔄 5. Алгоритм работы агента (пошагово)

1. **Читай дневной файл** (`02 - Маршрутный план/ДД *.md`).
2. **Сканируй каждую активность** (`* **HH:MM - HH:MM** — ...`):
   - Есть ли ключевые слова хайкинга/трека? (см. таблицу в п.1)
   - Уже есть строка `_Хайкинг-трек_:` или `_Велотрек_:`?
3. **Для каждой активности без трека:**
   - Найди подходящую ссылку в каталоге (п.4).
   - Если маршрута нет в каталоге — сгенерируй Google Maps Directions URL.
   - Вставь строку с правильным **4-пробельным отступом**.
4. **Позиционирование:** ПОСЛЕ `_Ссылка на локацию_:`, ДО следующего буллета или коллаута `> [!TIP]`.
5. **Не добавляй** строку к транспортным, гастрономическим активностям и заселениям в отель.

---

## ⚠️ 6. Антипаттерны (что нельзя)

❌ **Использовать поисковые URL AllTrails вида `https://www.alltrails.com/explore?q=...`** — такие ссылки НЕ открывают трек, при открытии в браузере применяют географический bounding box текущей локации пользователя и показывают пустую карту без маршрута. Использовать AllTrails ТОЛЬКО если есть прямая ссылка на страницу трека `/trail/taiwan/...`.
❌ Выдумывать несуществующие URL AllTrails — если точный slug неизвестен, использовать Google Maps Walking/Bicycling Directions.
❌ Добавлять трек к не-пешеходным активностям (поезд, автобус, еда, заселение, магазины).
❌ Дублировать строку, если `_Хайкинг-трек_:` уже есть в активности.
❌ Ставить трек ДО `_Ссылка на локацию_:` — нарушает порядок секций парсера.
❌ Использовать 2 пробела вместо 4 перед строкой — парсер не распознает как вложенную.

---

## ✅ 7. Чек-лист самопроверки после обогащения

- [ ] Все хайкинг-активности дня имеют строку `_Хайкинг-трек_:` или `_Велотрек_:`
- [ ] Строка вставлена с 4-пробельным отступом
- [ ] Строка стоит ПОСЛЕ `_Ссылка на локацию_:` и ДО следующего `> [!TIP]` или буллета
- [ ] URL ведёт на реальный маршрут (AllTrails или Google Maps Directions)
- [ ] Транспортные и гастрономические активности не затронуты
- [ ] URL для велосипедных маршрутов использует `?travelmode=bicycling`
- [ ] URL для кольцевых маршрутов содержит старт повторно в конце цепочки точек
