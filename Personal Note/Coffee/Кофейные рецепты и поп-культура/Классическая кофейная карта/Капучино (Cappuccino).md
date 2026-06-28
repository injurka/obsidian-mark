---
target: "recipe-viewer"
id: "cappuccino"
title: "Капучино (Cappuccino)"
category: "Классическая кофейная карта"
difficulty: 2
time_total_min: 5
servings_default: 1
coffee_base_type: "espresso"
temperature: "hot"
ingredients:
  - item: "эспрессо_шот"
    amount: 1
    unit: "шт"
    required: true
    alternatives: ["эспрессо_двойной"]
  - item: "молоко_коровье"
    amount: 120
    unit: "мл"
    required: true
    alternatives: ["молоко_овсяное_бариста", "молоко_миндальное"]
tools:
  - "эспрессо_машина"
  - "капучинатор"
  - "питчер_молочный"
  - "весы_кофейные"
tags:
  - "вкус/сбалансированный"
  - "текстура/воздушная"
  - "пропорция/итальянская"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;">Капучино — это абсолютный золотой стандарт и самый популярный кофейный напиток в мире. Это идеальный баланс, где плотный, сиропистый эспрессо встречается со сладостью теплого молока и укрывается толстым слоем эластичной, глянцевой пены, напоминающей растаявшее маршмэллоу.</p>

    <div class="recipe-block">
        <div class="recipe-info-header">📋 Параметры приготовления</div>
        <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Время</span>
                <span class="recipe-meta-value">⏱️ 5 минут</span>
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
        <h3 style="margin-top: 0; margin-bottom: 1.5rem;">📊 Профиль и анатомия напитка</h3>
        
        <div class="recipe-taste-profile">
            <div class="taste-bar-row">
                <span class="taste-label">Интенсивность кофе</span>
                <div class="taste-track"><div class="taste-fill" style="width: 50%; background: #6F4E37;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Сладость молока</span>
                <div class="taste-track"><div class="taste-fill" style="width: 70%; background: #F0E6D2;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Объем пены</span>
                <div class="taste-track"><div class="taste-fill" style="width: 85%; background: var(--interactive-accent);"></div></div>
            </div>
        </div>

        <div class="recipe-cup-wrapper">
            <div class="recipe-bowl-cup-diagram">
                <div class="bowl-layer layer-cap-foam">Плотная пена (1.5 - 2 см)</div>
                <div class="bowl-layer layer-cap-milk">Текстурированное молоко</div>
                <div class="bowl-layer layer-cap-espresso">Эспрессо (~30-40 г)</div>
            </div>
        </div>
        <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0;">Идеальная чашка: керамическая, округлой формы (сферическое дно) <strong>150–180 мл</strong>.</p>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты</h3>
        
        <div class="recipe-ing-group">
            <ul class="recipe-ingredient-list">
                <li><strong>Шот эспрессо</strong> — 1 шт. (~30 мл). В современных кофейнях часто используют двойной шот для более яркого вкуса.</li>
                <li><strong>Молоко коровье (3.2% - 3.5%)</strong> — 120–150 мл. <span class="recipe-marker">Холодное, из холодильника!</span></li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Секреты идеального Капучино</h3>
        <div class="recipe-details-group">
            <details>
                <summary>📐 Правило третей (Классика vs Спешелти)</summary>
                <p>Традиционный итальянский рецепт (SCAE) гласит: 1/3 эспрессо, 1/3 молока, 1/3 пены. Однако в современной спешелти-культуре бариста ушли от сухой «пены для ванны», которую можно есть ложкой. Современный капучино имеет пену толщиной около 1.5 см — она влажная, мелкодисперсная и не отделяется от молока.</p>
            </details>

            <details>
                <summary>💨 Искусство аэрации (впускания воздуха)</summary>
                <p>Главный секрет капучино — правильная фаза расширения молока. Чтобы получить нужный объем пены, паровой кран нужно держать у самой поверхности молока на 1–2 секунды дольше, чем для латте или флэт уайта (примерно 3–5 секунд характерного шипения), после чего сразу уводить в воронку.</p>
            </details>

            <details>
                <summary>☕ Почему важна форма чашки?</summary>
                <p>Классическая чашка для капучино имеет форму полусферы с толстыми стенками. Сферическое дно помогает эспрессо и молоку идеально перемешаться при вливании, сохраняя целостность кремы, а толстая керамика удерживает правильную температуру.</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩‍🍳 Пошаговое приготовление</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 1. Базовый шот</h4>
            <p style="margin: 0; font-size: 0.95rem;">Сварите порцию эспрессо в прогретую чашку (150–180 мл). Для капучино отлично подходят сбалансированные лоты с нотами шоколада, орехов или карамели — в сочетании с плотной молочной пеной они дают вкус растаявшего мороженого.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Агрессивная аэрация</h4>
            <p style="margin: 0; font-size: 0.95rem;">Наполните питчер холодным молоком. Включите пар. Держите форсунку близко к поверхности, чтобы пустить достаточное количество воздуха (3-4 секунды шипения), увеличив объем молока примерно на 30%.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Интеграция пены</h4>
            <p style="margin: 0; font-size: 0.95rem;">Погрузите форсунку глубже и создайте мощную воронку. Ваша цель — разбить все крупные пузыри и вмешать взбитую пену обратно в жидкое молоко до достижения температуры 60–65°C. Текстура должна стать однородной, напоминающей густую белую краску.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 4. Вливание (Монашеский капюшон)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Круговым движением влейте часть молока, перемешав его с эспрессо. Затем, опустив питчер к самой поверхности в центре чашки, выложите плотное белое пятно пены (классическое "яблоко" или "голова монаха"). Белый круг должен быть четко окаймлен коричневым кофейным кольцом.</p>
        </div>
    </div>

    <div class="recipe-block-alert">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--interactive-accent);">💡 UX-заметка бариста: Не ешьте пену ложкой!</h4>
        <p style="margin: 0; font-size: 0.95rem;">
            Многие совершают ошибку, съедая пену ложкой до того, как выпить кофе. Правильный капучино нужно пить через край. Плотная сладкая пена обволакивает губы, работая как фильтр, сквозь который проступает горячий, насыщенный кофейно-молочный микс. Это одновременный контраст текстур и вкусов.
        </p>
    </div>

    <div class="recipe-block" style="margin-top: 16px; background: var(--background-secondary); border-color: transparent;">
        <h3 style="margin-top: 0px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🇮🇹</span> Орден Капуцинов
        </h3>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            Название напитка берет свое начало в Италии XVI века и связано с монашеским орденом Капуцинов (Ordo Fratrum Minorum Capuccinorum). Монахи этого ордена носили рясы характерного красновато-коричневого цвета с остроконечным белым капюшоном (cappuccio). <br><br>
            Когда итальянцы начали добавлять в черный кофе вспененное молоко, цвет получившегося напитка и белая "шапка" пены сверху вызвали прямую визуальную ассоциацию с одеянием монахов. До сих пор классическим латте-артом для эталонного капучино считается рисунок "Голова монаха" — идеально ровный белый круг пены, окруженный коричневым кольцом кофейной кремы.
        </p>
    </div>

</div>
