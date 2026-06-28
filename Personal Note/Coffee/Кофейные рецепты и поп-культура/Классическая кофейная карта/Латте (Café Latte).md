---
target: "coffee-recipe"
id: "cafe-latte"
title: "Латте (Café Latte)"
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
    amount: 220
    unit: "мл"
    required: true
    alternatives: ["молоко_овсяное_бариста", "молоко_соевое"]
tools:
  - "эспрессо_машина"
  - "капучинатор"
  - "питчер_молочный"
  - "весы_кофейные"
tags:
  - "вкус/мягкий"
  - "текстура/молочный"
  - "пропорция/итальянская"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;">Латте (от итал. <em>caffellatte</em> — «кофе с молоком») — это самый объемный и мягкий напиток классической кофейной карты. Это идеальный выбор для тех, кто ищет обволакивающий, сливочный вкус, где кофе выступает не агрессивным солистом, а лишь деликатной, пряной приправой к сладкому текстурированному молоку.</p>

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
                <div class="taste-track"><div class="taste-fill" style="width: 35%; background: #6F4E37;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Сладость молока</span>
                <div class="taste-track"><div class="taste-fill" style="width: 95%; background: #F0E6D2;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Объем пены</span>
                <div class="taste-track"><div class="taste-fill" style="width: 25%; background: var(--interactive-accent);"></div></div>
            </div>
        </div>

        <div class="recipe-cup-wrapper">
            <div class="recipe-tall-glass-diagram">
                <div class="glass-tall-layer layer-latte-foam">Мягкая пена (~1 см)</div>
                <div class="glass-tall-layer layer-latte-milk">Текстурированное молоко (~220 мл)</div>
                <div class="glass-tall-layer layer-latte-espresso">Эспрессо (~30 мл)</div>
            </div>
        </div>
        <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0;">Традиционная подача: высокий стеклянный бокал или большая керамическая чашка <strong>250–300 мл</strong>.</p>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты</h3>
        
        <div class="recipe-ing-group">
            <ul class="recipe-ingredient-list">
                <li><strong>Одинарный шот эспрессо</strong> — 30 мл (для более кофейного вкуса можно использовать двойной).</li>
                <li><strong>Молоко коровье (3.2% - 3.5%)</strong> — 200–220 мл. <span class="recipe-marker">Большой объем скрывает дефекты кофе, но требует качественного молока!</span></li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Секреты идеального Латте</h3>
        <div class="recipe-details-group">
            <details>
                <summary>📏 Правило одного сантиметра</summary>
                <p>Главное отличие латте от капучино заключается в толщине молочной пены. Для капучино пена должна составлять около 1.5–2 см (плотная и упругая), а для латте — ровно 1 см (более мягкая, шелковистая и текучая).</p>
            </details>

            <details>
                <summary>🥛 Латте Маккиато vs Классический Латте</summary>
                <p>Многие путают эти два напитка. В классическом Латте (Café Latte) молоко вливается в эспрессо, что создает однородный кремово-кофейный цвет. В Латте Маккиато (Latte Macchiato) все наоборот: эспрессо вливается в уже взбитое молоко, образуя красивый трехслойный градиент с четкой кофейной «меткой» (macchia) сверху.</p>
            </details>

            <details>
                <summary>🌡️ Опасность перегрева</summary>
                <p>Из-за большого объема молока в питчере процесс текстурирования занимает больше времени. Очень легко отвлечься и перегреть молоко выше 65°C. Как только вы почувствуете легкое жжение ладони на стенке питчера — немедленно выключайте пар.</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩‍🍳 Пошаговое приготовление</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 1. Экстракция основы</h4>
            <p style="margin: 0; font-size: 0.95rem;">Приготовьте одинарный (или двойной) эспрессо в большую чашку или предварительно прогретый высокий стеклянный бокал. Лучше всего подойдет зерно плотной, традиционной обжарки (Бразилия, Колумбия), так как легкая кислотность светлой обжарки может затеряться в таком количестве молока.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Аэрация (насыщение воздухом)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Наполните большой питчер (500–600 мл) холодным молоком до нижней кромки носика. Включите стимер и пустите воздух в течение 2–3 секунд. Вам нужно пустить чуть больше воздуха, чем для Флэт Уайта, но меньше, чем для Капучино.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Вращение и нагрев</h4>
            <p style="margin: 0; font-size: 0.95rem;">Погрузите форсунку глубже, найдите угол для хорошей воронки и разбивайте крупные пузыри до достижения гладкой, эластичной текстуры. Остановите нагрев на 60–65°C. Прокрутите молоко в питчере по столу до глянцевого блеска.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 4. Вливание</h4>
            <p style="margin: 0; font-size: 0.95rem;">Наклоните бокал. Начните вливать молоко с высоты 5–7 см в центр эспрессо, чтобы жидкость перемешалась под слоем крема. Когда бокал наполнится на 3/4, опустите питчер максимально близко к поверхности и выведите простой латте-арт (сердце или розетту).</p>
        </div>
    </div>

    <div class="recipe-block-alert">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--interactive-accent);">💡 Этикет: Заказывать ли Латте в Италии?</h4>
        <p style="margin: 0; font-size: 0.95rem;">
            Если в традиционном итальянском баре вы попросите бариста: <em>"Un latte, per favore"</em>, вам с вероятностью 100% принесут обычный стакан холодного или подогретого молока без капли кофе. Правильно заказывать: <strong>"Caffè latte"</strong>.
        </p>
    </div>

    <div class="recipe-block" style="margin-top: 16px; background: var(--background-secondary); border-color: transparent;">
        <h3 style="margin-top: 0px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🇺🇸</span> Американская коммерциализация
        </h3>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            Хотя концепция смешивания кофе с большим количеством молока была известна в Европе веками (кофе с молоком во Франции, мильхкаффе в Германии), современный «Латте» как поп-культурный феномен был сформирован в Сиэтле в 1980-х годах. <br><br>
            Американские кофейни (в частности Starbucks) стандартизировали этот напиток, сделали его объемным (от 350 до 500+ мл) и превратили в чистый холст для бесконечного количества сиропов: от ванильного до легендарного тыквенно-пряного (Pumpkin Spice Latte). В спешелти-индустрии Латте сохраняет более строгие пропорции (250-300 мл) и подается без сахара, чтобы подчеркнуть естественную природную сладость фермерского молока.
        </p>
    </div>

</div>
