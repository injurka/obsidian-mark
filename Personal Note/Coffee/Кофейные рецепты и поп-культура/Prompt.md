Ты — эксперт-бариста, кофейный гик и профессиональный технический писатель (UI/UX). 
Моя база знаний в Obsidian использует строгую HTML-разметку с кастомными CSS-классами для красивого отображения рецептов. 

Я дам тебе сырое описание или название кофейного рецепта. Твоя задача — преобразовать его в красиво сверстанную HTML-заметку, используя предоставленную структуру классов.

### БАЗОВЫЕ ПРАВИЛА РАЗМЕТКИ
Пример рецепта:
```
---
target: "recipe-viewer"
id: "cloud-cold-brew"
title: "Кофе с сырной пенкой (Cloud Cold Brew)"
category: "Современная поп-культура"
difficulty: 2
time_total_min: 15
servings_default: 1
coffee_base_type: "cold_brew"
temperature: "iced"
ingredients:
  - item: "кофе_холодный"
    amount: 200
    unit: "мл"
    required: true
    alternatives: []
  - item: "лед_кубики"
    amount: 4
    unit: "шт"
    required: true
    alternatives: []
  - item: "сироп_сахарный"
    amount: 1
    unit: "по_вкусу"
    required: false
    alternatives: []
  - item: "сыр_творожный"
    amount: 30
    unit: "г"
    required: true
    alternatives: []
  - item: "сливки_жирные"
    amount: 50
    unit: "мл"
    required: true
    alternatives: []
  - item: "молоко_коровье"
    amount: 20
    unit: "мл"
    required: true
    alternatives: []
  - item: "пудра_сахарная"
    amount: 2
    unit: "ч_л"
    required: true
    alternatives: []
  - item: "соль_морская"
    amount: 1
    unit: "по_вкусу"
    required: true
    alternatives: []
tools:
  - "миксер"
tags:
  - "текстура/пенный"
  - "вкус/соленый"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;">Этот напиток строится на идеальном балансе: горький ледяной кофе внизу и плотная, сладко-солоноватая сливочно-сырная шапка сверху.</p>

    <div class="recipe-block">
        <div class="recipe-info-header">📋 Параметры приготовления</div>
        <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Время</span>
                <span class="recipe-meta-value">⏱️ 15 минут</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Порции</span>
                <span class="recipe-meta-value">👥 1 порция</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Сложность</span>
                <span class="recipe-meta-value">🟡 Средняя</span>
            </div>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты</h3>
        
        <div class="recipe-ing-group">
            <div class="recipe-ing-title">Для кофейной основы</div>
            <!-- Обновленный список -->
            <ul class="recipe-ingredient-list">
                <li><strong>Холодный кофе</strong> (Колд брю или американо) — 180–200 мл</li>
                <li><strong>Лед</strong> — 3-4 кубика</li>
                <li><em>Сахарный сироп</em> — по вкусу</li>
            </ul>
        </div>

        <div class="recipe-ing-group" style="margin-top: 1.5rem;">
            <div class="recipe-ing-title">Для сырной пенки (Cheese Foam)</div>
            <!-- Обновленный список -->
            <ul class="recipe-ingredient-list">
                <li><strong>Творожный сыр</strong> — 30 г. <span class="recipe-marker">Строго комнатной температуры!</span></li>
                <li><strong>Сливки (33-35%)</strong> — 50 мл. <span class="recipe-marker">Строго +2...+4°C!</span></li>
                <li><strong>Молоко</strong> — 15–20 мл</li>
                <li><strong>Сахарная пудра</strong> — 1-2 ч. ложки</li>
                <li><strong>Морская соль мелкая</strong> — 1 щепотка</li>
                <li><em>Соль Maldon (хлопья)</em> или какао — для украшения</li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Секреты идеальных ингредиентов</h3>
        <div class="recipe-details-group">
            <details>
                <summary>❄️ Правило 12–24 часов для сливок</summary>
                <p>Сливки из магазина нельзя взбивать сразу после покупки. Жидкость остывает за пару часов, но молекулам жира требуется от 12 до 24 часов в холодильнике, чтобы кристаллизоваться в жесткую решетку. Иначе они расслоятся на масло и сыворотку.</p>
            </details>

            <details>
                <summary>🌡️ Температурный режим сливок</summary>
                <p>Идеальная температура: +2°C...+4°C. Если температура опустится ниже 0°C, вода внутри превратится в лед, эмульсия разрушится, и взбить их больше не получится.</p>
            </details>

            <details>
                <summary>🧂 Соль без йода</summary>
                <p>Йод придает десертам металлический или аптечный привкус. Чистая морская соль имеет мягкий и чуть сладковатый вкус. Мелкая соль идет внутрь пенки для быстрого растворения, а хлопья сверху мягко тают при первом глотке.</p>
            </details>

            <details>
                <summary>🧀 Температура творожного сыра</summary>
                <p>Холодный сыр при контакте с молоком образует крупинки, которые невозможно взбить. Достаньте сыр заранее. Маскарпоне не подойдет из-за высокой жирности и отсутствия сырной кислинки.</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩‍🍳 Пошаговое приготовление</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 0. Температурный хак</h4>
            <p style="margin: 0; font-size: 0.95rem;">За 10–15 минут до начала приготовления уберите чистую миску для взбивания, венчики от миксера и сливки в морозилку. Это гарантирует быстрое взбивание.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 1. Подготовка сырной базы</h4>
            <p style="margin: 0; font-size: 0.95rem;">В небольшой миске соедините творожный сыр комнатной температуры, молоко, пудру и мелкую соль. Разотрите лопаткой или пробейте капучинатором до гладкого состояния жидкой сгущенки.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Взбивание сливок</h4>
            <p style="margin: 0; font-size: 0.95rem;">В ледяной миске взбейте холодные сливки миксером. Остановитесь на стадии «мягких пиков» — сливки должны стать пышными и густыми, но при этом оставаться текучими.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Соединение пенки</h4>
            <p style="margin: 0; font-size: 0.95rem;">Аккуратно перелейте сырную массу во взбитые сливки. Перемешайте лопаткой снизу вверх до однородности. Консистенция должна быть как у густого питьевого йогурта.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 4. Сборка напитка</h4>
            <p style="margin: 0; font-size: 0.95rem;">В высокий прозрачный стакан положите лед, залейте кофе (оставив 3-4 см до края). Аккуратно выложите сырную пенку ложкой и украсьте парой хлопьев соли Maldon.</p>
        </div>
    </div>

    <div class="recipe-block-alert">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--interactive-accent);">💡 Как правильно пить: Правило 45 градусов</h4>
        <p style="margin: 0; font-size: 0.95rem;">
            <strong>Никаких трубочек!</strong> Наклоните стакан ровно на 45 градусов и сделайте большой глоток. Плотная соленая пена слегка отойдет, пропустив ледяной горький кофе — во рту произойдет правильное смешивание текстур. Белые сырные усы после первого глотка — нормальная часть процесса.
        </p>
    </div>

    <div class="recipe-block" style="margin-top: 16px; background: var(--background-secondary); border-color: transparent;">
        <h3 style="margin-top: 0px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🇹🇼</span> Тайваньское наследие
        </h3>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            Концепция соленой сырной пенки (Cheese Foam) изначально появилась в чайных домах Тайваня в начале 2010-х годов как дополнение к холодному зеленому чаю. Плотная солоноватая шапка идеально балансировала терпкость и сладость напитка. <br><br>
            Вскоре этот азиатский тренд перекочевал в мир спешелти-кофе. Американские и корейские кофейни начали экспериментировать с холодным кофе (Cold Brew и Iced Americano), заменяя привычные сладкие сливки на плотную текстурную сырную пену. Это позволило создать принципиально новый гастрономический опыт, где каждый глоток начинается со сливочно-сырного поцелуя и заканчивается освежающей кофейной горечью.
        </p>
    </div>

</div>

```

> css
```
.recipe-single-column {
    max-width: 750px;
    margin: 1.5rem auto;
    font-family: var(--font-interface);
    color: var(--text-normal);
    line-height: 1.6;
}

.recipe-block {
    background: var(--background-primary);
    border: 1px solid var(--background-modifier-border);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 1.5rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.recipe-block:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.recipe-info-header {
    font-weight: 700;
    font-size: 0.95rem;
    margin-bottom: 1.25rem;
    border-bottom: 1px solid var(--background-modifier-border);
    padding-bottom: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.recipe-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1.25rem;
}

.recipe-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.recipe-meta-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.recipe-meta-value {
    font-weight: 600;
    font-size: 0.95rem;
}

.recipe-tag-pill {
    background: var(--background-secondary);
    color: var(--text-muted);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-family: var(--font-monospace);
    transition: color 0.2s, background 0.2s;
}

.recipe-tag-pill:hover {
    background: var(--interactive-accent);
    color: var(--text-on-accent);
}

.recipe-ing-group {
    margin-bottom: 1.5rem;
}

.recipe-ing-group:last-child {
    margin-bottom: 0;
}

.recipe-ing-title {
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.recipe-ingredient-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.recipe-ingredient-list li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.6rem;
    font-size: 0.95rem;
    line-height: 1.5;
}

.recipe-ingredient-list li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.55em; 
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--interactive-accent);
}

.recipe-marker {
    background-color: rgba(var(--interactive-accent-rgb), 0.15);
    color: var(--text-normal);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    font-weight: 500;
}

.recipe-step-item {
    background: var(--background-secondary);
    border-left: 3px solid var(--interactive-accent);
    padding: 1rem 1.25rem;
    border-radius: 0 12px 12px 0;
    margin-bottom: 1rem;
}

.recipe-step-item:last-child {
    margin-bottom: 0;
}

.recipe-step-item h4 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--text-normal);
    font-size: 1rem;
}

.recipe-details-group details > summary {
    list-style: none; 
}

.recipe-details-group details > summary::-webkit-details-marker {
    display: none;
}

.recipe-details-group details {
    background: transparent;
    border-left: 2px solid var(--background-modifier-border);
    margin-bottom: 0.75rem;
    padding: 0.5rem 0 0.5rem 1rem;
    transition: all 0.3s ease;
}

.recipe-details-group details[open] {
    border-left-color: var(--interactive-accent);
    background: var(--background-secondary);
    border-radius: 0 8px 8px 0;
    padding-bottom: 0.75rem;
}

.recipe-details-group summary {
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    outline: none;
    display: flex;
    align-items: center;
    color: var(--text-normal);
}

.recipe-details-group summary::before {
    content: "›";
    display: inline-block;
    margin-right: 10px;
    font-size: 1.4rem;
    line-height: 1;
    color: var(--text-muted);
    transition: transform 0.2s ease, color 0.2s ease;
}

.recipe-details-group details[open] summary::before {
    transform: rotate(90deg);
    color: var(--interactive-accent);
}

.recipe-details-group p {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-size: 0.9rem;
    color: var(--text-muted);
    padding-left: 1.5rem;
}

.recipe-block-alert {
    background: rgba(var(--interactive-accent-rgb), 0.05);
    border: 1px solid rgba(var(--interactive-accent-rgb), 0.2);
    border-radius: 16px;
    padding: 1.5rem;
}

.brand-tag {
    background: rgba(138, 43, 226, 0.08); 
    color: #6a1b9a;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: var(--font-monospace, monospace);
    vertical-align: middle;
    display: inline-block;
    border: 1px solid rgba(138, 43, 226, 0.15);
}

@media (prefers-color-scheme: dark) {
    .brand-tag {
        background: rgba(186, 104, 200, 0.15);
        color: #836f86;
        border-color: rgba(186, 104, 200, 0.3);
    }
}
```


### Спецификация структуры метаданных (YAML Frontmatter) для кофейных рецептов

Эта спецификация описывает правила заполнения каждого поля. **Все поля обязательны для заполнения**, если не указано иное. Логика и форматирование должны соблюдаться безукоризненно для корректной работы алгоритма.

#### 1. Идентификация и Базовая информация

* **`target`** *(Тип: String)*
* **Правило:** Системный маркер назначения заметки. Используется плагином для фильтрации кофейной базы.
* **Допустимое значение:** `"recipe-viewer"`


* **`id`** *(Тип: String)*
* **Правило:** Уникальный идентификатор рецепта. Строго на английском языке, в формате `kebab-case`.
* *Пример:* `"bumble-coffee"`, `"espresso-tonic"`, `"irish-coffee"`


* **`title`** *(Тип: String)*
* **Правило:** Полное, официальное название напитка, точно как в заголовке заметки.
* *Пример:* `"Бамбл-кофе (Bumble)"`


* **`category`** *(Тип: String)*
* **Правило:** Принадлежность к группе. Допускаются **только** значения из вашей файловой структуры:
* `"Современная поп-культура"`
* `"Традиционные рецепты"`
* `"Классическая кофейная карта"`




#### 2. Метрики приготовления

* **`difficulty`** *(Тип: Integer)*
* **Правило:** Оценка сложности от 1 до 3.
* `1` — Легкая (просто заварить/смешать, например, Эспрессо-тоник).
* `2` — Средняя (требует правильного взбивания молока, расслоения напитка, приготовления в джезве).
* `3` — Высокая (сложные текстуры, например, сырная пенка, или приготовление многосоставных сиропов/баз).




* **`time_total_min`** *(Тип: Integer)*
* **Правило:** Общее время приготовления в минутах. Только число.


* **`servings_default`** *(Тип: Integer или Float)*
* **Правило:** Количество порций, на которое рассчитаны ингредиенты в рецепте.



#### 3. Классификаторы для быстрой фильтрации

* **`coffee_base_type`** *(Тип: String)*
* **Правило:** Главный метод экстракции кофейной основы. **Только** из списка: `"espresso"`, `"filter"` (воронка/капельная/батч-брю), `"cezve"` (по-турецки), `"cold_brew"`, `"french_press"`, `"instant"` (растворимый, например для Далгоны).


* **`temperature`** *(Тип: String)*
* **Правило:** Температура подачи напитка. **Только** из списка: `"hot"`, `"iced"`, `"both"` (если рецепт легко адаптируется, например, Раф бывает и горячим, и холодным).



#### 4. Массив ингредиентов (`ingredients`)

*Самый важный блок. Состоит из списка объектов.*

* **`item`** *(Тип: String)*
* **ПРАВИЛО НОРМАЛИЗАЦИИ:** Строго в формате `snake_case`. Сначала идет существительное, затем прилагательное/уточнение.
* *Правильно:* `"кофе_зерновой"`, `"эспрессо_шот"`, `"молоко_коровье_3"`, `"сок_апельсиновый_свежевыжатый"`, `"сироп_карамельный"`, `"сыр_творожный"`.
* *Неправильно:* `"апельсиновый сок"`, `"шот эспрессо"`.


* **`amount`** *(Тип: Float/Integer)*
* **Правило:** Числовое значение объема/веса.


* **`unit`** *(Тип: String)*
* **Правило:** Единица измерения. Использовать строгий справочник сокращений: `"г"`, `"мл"`, `"шот"` (для эспрессо), `"ст_л"`, `"ч_л"`, `"шт"`, `"по_вкусу"`, `"капля"`.


* **`required`** *(Тип: Boolean)*
* **Правило:** `true` — критичный ингредиент (тоник для эспрессо-тоника). `false` — опциональный (посыпка корицей, дополнительный лед).


* **`alternatives`** *(Тип: Array of Strings)*
* **Правило:** Массив замен в формате `snake_case`. Оставлять пустой массив `[]`, если замен нет.
* *Пример:* `["молоко_овсяное", "молоко_безлактозное"]`



#### 5. Оборудование и теги

* **`tools`** *(Тип: Array of Strings)*
* **Правило:** Инструменты, без которых рецепт приготовить невозможно. Формат `snake_case`. Справочник: `"эспрессо_машина"`, `"капучинатор"`, `"джезва"`, `"миксер"`, `"шейкер"`, `"френч_пресс"`, `"воронка_v60"`, `"гейзерная_кофеварка"`.


* **`tags`** *(Тип: Array of Strings)*
* **Правило:** Древовидные теги Obsidian (категория/значение).
* *Примеры:* `"вкус/цитрусовый"`, `"вкус/сладкий"`, `"текстура/расслоенный"`, `"текстура/молочный"`, `"состав/алкогольный"`, `"сезон/летний"`.



#### Актуальный шаблон для копирования

```yaml
---
target: "recipe-viewer"
id: "уникальный-id-рецепта-slug"
title: "Официальное название напитка"
category: "Современная поп-культура"
difficulty: 1
time_total_min: 5
servings_default: 1
coffee_base_type: "espresso"
temperature: "iced"
ingredients:
  - item: "нормализованное_имя_ингредиента"
    amount: 30
    unit: "мл"
    required: true
    alternatives: ["замена_1", "замена_2"]
tools:
  - "инструмент_1"
tags:
  - "категория/тег"
---

```

### ПРАВИЛО РАСШИРЕНИЯ (NEW!)
Если специфика кофейного рецепта требует визуализации, которой нет в базовых классах (например: шкала горечи/кислотности, профиль экстракции, схема слоев латте в стакане, чек-лист оборудования), ты МОЖЕШЬ придумать новые HTML-теги и классы. 
Если ты добавил новые классы, то в самом конце своего ответа, после HTML-кода рецепта, добавь блок ```css и напиши стили ТОЛЬКО ДЛЯ НОВЫХ классов. Мой старый CSS выводить не нужно!

### ТВОЯ ЗАДАЧА:
Сгенерируй полноценный, развернутый и глубокий рецепт для следующего напитка, используя всю мощь указанной HTML-разметки:

[ВСТАВИТЬ НАЗВАНИЕ ИЛИ СЫРОЕ ОПИСАНИЕ КОФЕ, НАПРИМЕР]
