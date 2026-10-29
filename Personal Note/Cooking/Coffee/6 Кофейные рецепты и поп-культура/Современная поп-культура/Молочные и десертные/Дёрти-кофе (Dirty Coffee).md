---
target: "recipe-viewer"
id: "dirty-coffee"
title: "Дёрти (Dirty Coffee / 脏脏咖啡)"
category: "Современная поп-культура"
difficulty: 3
time_total_min: 5
servings_default: 1
coffee_base_type: "espresso"
temperature: "both"
ingredients:
  - item: "эспрессо_шот"
    amount: 2
    unit: "шт"
    required: true
    alternatives: ["ристретто_двойной"]
  - item: "молоко_коровье_ледяное"
    amount: 100
    unit: "мл"
    required: true
    alternatives: []
  - item: "сливки_жирные_10"
    amount: 30
    unit: "мл"
    required: false
    alternatives: []
  - item: "сироп_сахарный"
    amount: 10
    unit: "мл"
    required: false
    alternatives: ["сироп_ванильный"]
tools:
  - "эспрессо_машина"
  - "ложка_барная"
  - "морозильная_камера"
tags:
  - "температура/контраст"
  - "вкус/сливочный"
  - "метод/слоистый"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;"><strong>Дёрти (Dirty Coffee)</strong> — это эстетический и гастрономический шедевр азиатской кофейной волны. Это полная противоположность латте: напиток не перемешивают, в него не кладут лед. Обжигающе горячий двойной эспрессо (или ристретто) аккуратно вливается поверх экстремально холодного, плотного молока. Плотность и температура удерживают эспрессо на поверхности, заставляя его медленно, живописными "грязными" подтеками сползать на дно стакана.</p>

    <div class="recipe-block">
        <div class="recipe-info-header">📋 Параметры приготовления</div>
        <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Время</span>
                <span class="recipe-meta-value">⏱️ 3 минуты (без заморозки посуды)</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Порции</span>
                <span class="recipe-meta-value">👥 1 порция (130-150 мл)</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Сложность</span>
                <span class="recipe-meta-value">🔴 Высокая <span style="font-size: 0.8em; font-weight: 400; color: var(--text-muted);">(баланс плотности жидкостей)</span></span>
            </div>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.5rem;">📊 Профиль и анатомия напитка</h3>
        
        <div class="recipe-taste-profile">
            <div class="taste-bar-row">
                <span class="taste-label">Температурный шок</span>
                <div class="taste-track"><div class="taste-fill" style="width: 100%; background: linear-gradient(90deg, #A8D8EA 0%, #D64545 100%);"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Кофейная плотность (Крема)</span>
                <div class="taste-track"><div class="taste-fill" style="width: 80%; background: #4A2411;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Сливочная сладость</span>
                <div class="taste-track"><div class="taste-fill" style="width: 70%; background: #FDF9F1;"></div></div>
            </div>
        </div>

        <div class="recipe-cup-wrapper">
            <div class="recipe-dirty-glass-diagram">
                <!-- Капли эспрессо, стекающие вниз (Сталактиты) -->
                <div class="dirty-drip" style="left: 15%; height: 35px; animation-duration: 4s;"></div>
                <div class="dirty-drip" style="left: 35%; height: 60px; animation-duration: 6s; width: 6px;"></div>
                <div class="dirty-drip" style="left: 55%; height: 25px; animation-duration: 3s;"></div>
                <div class="dirty-drip" style="left: 75%; height: 45px; animation-duration: 5s; width: 5px;"></div>
                <div class="dirty-drip" style="left: 90%; height: 15px; animation-duration: 2.5s;"></div>
                
                <!-- Слои напитка -->
                <div class="dirty-glass-layer layer-dirty-espresso">
                    <span>Горячий Эспрессо (25%)</span>
                </div>
                <div class="dirty-glass-layer layer-dirty-milk">Ледяное молоко (75%)</div>
            </div>
        </div>
        <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0;">Идеальная посуда: замороженный низкий стакан Рокс <strong>150–200 мл</strong>.</p>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты</h3>
        
        <div class="recipe-ing-group">
            <div class="recipe-ing-title">Уплотненная молочная база</div>
            <ul class="recipe-ingredient-list">
                <li><strong>Цельное молоко (3.2%)</strong> — 100 мл. <span class="recipe-marker">Должно быть экстремально холодным!</span></li>
                <li><strong>Сливки (10-20%)</strong> — 20-30 мл. (Обычное молоко слишком водянистое и не удержит горячий кофе. Добавление сливок повышает плотность жидкостей — это называется <em>Half-and-Half</em>).</li>
                <li><strong>Ванильный сироп</strong> — 10 мл (по желанию, для сладости молочной базы).</li>
            </ul>
        </div>

        <div class="recipe-ing-group" style="margin-top: 1.5rem;">
            <div class="recipe-ing-title">Кофейный слой</div>
            <ul class="recipe-ingredient-list">
                <li><strong>Двойной эспрессо или Ристретто</strong> — 30-40 мл. Идеально подходят бленды средней или темной обжарки с нотами шоколада и орехов.</li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Физика слоев: Как обойтись без льда?</h3>
        <div class="recipe-details-group">
            <details open>
                <summary>🧊 Почему нельзя класть лед?</summary>
                <p>Если бросить в стакан лед (как в Айс-Латте), он быстро охладит эспрессо. Суть «Дёрти» — в <strong>термальном шоке</strong>. Вы должны почувствовать, как ваши губы обжигает горячий кофейный крем, а на язык в это же время льется ледяное, сладкое молоко. Лед разрушит этот баланс и сделает напиток водянистым.</p>
            </details>

            <details>
                <summary>⚖️ Борьба плотностей</summary>
                <p>Горячая вода (эспрессо) менее плотная, чем холодная вода. Кроме того, молочные жиры утяжеляют нижний слой. Именно поэтому горячий эспрессо способен лежать поверх холодного молока. Однако со временем температуры начинают выравниваться, эспрессо тяжелеет и прорывает поверхностное натяжение, красивыми струйками опускаясь на дно. Этот процесс занимает 1-2 минуты.</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩🍳 Пошаговое приготовление</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 1. Заморозка стакана</h4>
            <p style="margin: 0; font-size: 0.95rem;">Это критический шаг! Положите стеклянный стакан (рокс) в морозильную камеру минимум на 15 минут. Стекло должно покрыться инеем. Это поможет удержать температуру молока при вливании горячего кофе.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Подготовка базы</h4>
            <p style="margin: 0; font-size: 0.95rem;">В ледяной стакан налейте сироп, cold молоко и сливки. Слегка перемешайте ложкой. До края стакана должно оставаться около 1.5–2 сантиметров.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Деликатная экстракция (Вливание)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Сварите двойной эспрессо. Есть два способа налить его, не пробив молочный слой:<br>1) <em>Для профи:</em> Поставить стакан с молоком прямо под портафильтр кофемашины, но прижать к поверхности молока холодную барную ложку. Эспрессо будет литься на ложку и мягко растекаться по молоку.<br>2) <em>Домашний:</em> Сварить эспрессо в маленький питчер и медленно, по краю стакана, влить его на поверхность молока.</p>
        </div>
    </div>

    <div class="recipe-block-alert">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--interactive-accent);">💡 Правило употребления: Три больших глотка</h4>
        <p style="margin: 0; font-size: 0.95rem;">
            Напиток «живет» не более 2-3 минут. <strong>Его нельзя перемешивать!</strong> Дёрти пьют большими глотками без трубочки. <br>
            • <em>Первый глоток:</em> Интенсивный, горячий, горький кофе с легкой прохладой.<br>
            • <em>Второй глоток:</em> Идеальный баланс температуры, вкуса кофе и сливок.<br>
            • <em>Третий глоток:</em> Холодный, сладкий молочный десерт с кофейным послевкусием.
        </p>
    </div>

    <div class="recipe-block" style="margin-top: 16px; background: var(--background-secondary); border-color: transparent;">
        <h3 style="margin-top: 0px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🇨🇳</span> Языковая практика: Эстетика грязи
        </h3>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            В Китае этот напиток называется <strong>脏脏咖啡 (Zāng zāng kāfēi)</strong>.<br><br>
            • <strong>脏 (Zāng)</strong> — означает «грязный» или «испачканный». Удвоение <em>zāng zāng</em> придает слову милый, сленговый оттенок (что-то вроде «грязнуля»).<br>
            Этот термин стал вирусным несколько лет назад, когда в Азии появилась мода на <em>Zang zang bao (грязные булочки)</em> — выпечку, настолько обильно политую шоколадом и какао-пудрой, что ее невозможно было съесть, не испачкав всё лицо и руки. Кофейная индустрия переняла этот тренд, создав напиток, который выглядит небрежно, хаотично, но безумно эстетично.<br><br>
            🎙️ Фонетика: <em>Zāng</em> произносится ровным первым тоном. Попробуйте сказать: <strong>«我要一杯脏脏咖啡»</strong> (<em>Wǒ yào yī bēi zāng zāng kāfēi</em> — Я хочу один дёрти кофе).
        </p>
    </div>

</div>
