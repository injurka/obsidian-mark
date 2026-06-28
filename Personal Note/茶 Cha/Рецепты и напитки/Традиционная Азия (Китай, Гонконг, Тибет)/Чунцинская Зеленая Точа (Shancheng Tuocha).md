---
target: "recipe-viewer"
id: "shancheng-green-tuocha"
title: "Чунцинская Зеленая Точа (Shancheng Tuocha)"
category: "Традиционные рецепты"
difficulty: 2
time_total_min: 15
servings_default: 1
tea_base_type: "green_tea"
temperature: "hot"
ingredients:
  - item: "чай_зеленый_точа"
    amount: 5
    unit: "г"
    required: true
    alternatives: []
  - item: "вода_чистая"
    amount: 300
    unit: "мл"
    required: true
    alternatives: []
tools:
  - "гайвань_стеклянная"
  - "чахай"
  - "шило_пуэрное"
tags:
  - "метод/проливом"
  - "вкус/травянистый"
  - "вкус/освежающий"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;"><strong>Шаньчэн Точа (山城沱茶)</strong> — это уникальный представитель сычуаньской и чунцинской чайной культуры. В отличие от юньнаньских пуэров, эта точа спрессована из купажа зеленых чаев (высушенных на солнце, прожаренных и печеных). Напиток обладает плотным, ярким травянисто-цветочным профилем с характерной освежающей терпкостью и сладким послевкусием. Главное правило при его заваривании — не "сварить" нежный зеленый лист в замкнутом пространстве гайвани.</p>

    <div class="recipe-block">
        <div class="recipe-info-header">📋 Параметны приготовления</div>
        <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Температура воды</span>
                <span class="recipe-meta-value">🌡️ 80–85°C</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Время пролива</span>
                <span class="recipe-meta-value">⏱️ 10–15 секунд</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Сложность</span>
                <span class="recipe-meta-value">🟡 Средняя <span style="font-size: 0.8em; font-weight: 400; color: var(--text-muted);">(баланс температуры и времени)</span></span>
            </div>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.5rem;">📊 Профиль и анатомия посуды</h3>
        
        <div class="recipe-taste-profile">
            <div class="taste-bar-row">
                <span class="taste-label">Травянистая свежесть</span>
                <div class="taste-track"><div class="taste-fill" style="width: 85%; background: #6B8E23;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Цветочная сладость</span>
                <div class="taste-track"><div class="taste-fill" style="width: 60%; background: #E6C229;"></div></div>
            </div>
            <div class="taste-bar-row">
                <span class="taste-label">Терпкость (Катехины)</span>
                <div class="taste-track"><div class="taste-fill" style="width: 45%; background: #556B2F;"></div></div>
            </div>
        </div>

        <div class="recipe-cup-wrapper">
            <div class="recipe-glass-gaiwan-diagram">
                <!-- Стеклянная крышка (приоткрыта, чтобы чай "дышал") -->
                <div class="glass-gaiwan-lid"></div>
                
                <!-- Стеклянная чаша -->
                <div class="glass-gaiwan-bowl">
                    <!-- Настой светло-желто-зеленого цвета -->
                    <div class="glass-gaiwan-liquid">
                        <!-- Раскрывающиеся листья зеленого чая -->
                        <div class="diagram-green-leaf" style="bottom: 5px; left: 20px; transform: rotate(15deg);"></div>
                        <div class="diagram-green-leaf" style="bottom: 12px; right: 25px; transform: rotate(-30deg) scale(0.9);"></div>
                        <div class="diagram-green-leaf" style="bottom: 8px; left: 45px; transform: rotate(60deg) scale(1.1);"></div>
                        <span>Зеленый настой</span>
                    </div>
                </div>
                
                <!-- Стеклянное блюдце -->
                <div class="glass-gaiwan-saucer"></div>
            </div>
        </div>
        <p style="text-align: center; font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0 0 0;">Открытая гайвань: зеленый чай боится «эффекта бани», крышку лучше не закрывать плотно.</p>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты</h3>
        
        <div class="recipe-ing-group">
            <div class="recipe-ing-title">Чай и Вода</div>
            <ul class="recipe-ingredient-list">
                <li><strong>Чунцинская зеленая точа</strong> — 5 г на стандартную гайвань (120 мл). <span class="recipe-marker">Используйте пуэрное шило</span>, чтобы аккуратно отколоть кусочек от спрессованного "гнезда", стараясь сохранить листья целыми.</li>
                <li><strong>Вода (мягкая)</strong> — 300-400 мл. Температура строго <strong>80–85°C</strong>.</li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Физика экстракции: Ошибка температур</h3>
        <div class="recipe-details-group">
            <details open>
                <summary>🌡️ Парадокс прессованного зеленого чая</summary>
                <p>Обычно прессованные чаи (пуэры, хэй ча) требуют крутого кипятка (95-100°C), чтобы пробить плотную структуру листа. Однако сырье для Шаньчэн Точа — это нежный зеленый чай, богатый полифенолами и катехинами. Если залить его кипятком, катехины мгновенно высвободятся, сделав настой едким, горьким и терпким. Баланс достигается за счет времени, а не температуры: мы используем остывшую воду (80-85°C), но даем спрессованному комочку чуть больше времени на раскрытие.</p>
            </details>

            <details>
                <summary>🌬️ Концепция «Мэнь» (Задыхающийся чай)</summary>
                <p>В китайской чайной традиции есть термин <em>Mèn (闷)</em> — "тушить" или "томить под крышкой". Зеленый чай категорически нельзя подвергать этому процессу. После того как вы залили воду in гайвань, не закрывайте крышку плотно, оставляйте широкий зазор или вовсе снимайте ее между проливами. Иначе влажный горячий воздух "сварит" листья, и они приобретут неприятный запах вареных овощей (сена).</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩🍳 Пошаговый ритуал</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 1. Пробуждение (Син Ча)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Положите отколотый кусочек точи (5 г) в прогретую стеклянную или фарфоровую гайвань. Залейте водой 85°C так, чтобы вода только покрыла чай, подождите 10 секунд и аккуратно слейте. Это смоет чайную пыль и поможет спрессованному листу начать раскрываться.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Первый пролив</h4>
            <p style="margin: 0; font-size: 0.95rem;">Снова залейте чай водой 80-85°C по стенке гайвани (старайтесь не лить жесткой струей прямо в центр листа). Подождите 15-20 секунд. В первый пролив комочек еще не раскроется до конца, поэтому настой будет легким, сладко-травянистым. Слейте настой в чахай до последней капли.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Раскрытие вкуса (2-4 проливы)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Начиная со второго пролива, точа полностью распадется на цельные листья. Вода получит максимальный контакт с поверхностью чая. Время экстракции можно сократить до 10 секунд. Настой приобретет яркий желто-зеленый цвет и мощный, свежий аромат с нотами орхидеи и легкого дымка.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 4. Угасание (5-7 проливы)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Постепенно увеличивайте время заваривания на 10-15 секунд с каждым последующим проливом. Когда чай начнет терять вкус, можно слегка повысить температуру воды до 90°C, чтобы "выжать" из листа последние сладкие ноты.</p>
        </div>
    </div>

    <div class="recipe-block" style="margin-top: 16px; background: var(--background-secondary); border-color: transparent;">
        <h3 style="margin-top: 0px; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🇨🇳</span> Языковая практика: География и Форма
        </h3>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
            На вашей обертке написана история целого региона. Давайте разберем главные иероглифы:<br><br>
            • <strong>山城 (Shānchéng)</strong> — <em>Горный город</em>. Это историческое прозвище Чунцина (重庆), мегаполиса, построенного на крутых холмах у слияния рек Янцзы и Цзялин. <em>Shān (山)</em> — гора (1-й ровный тон), <em>chéng (城)</em> — город/стена (2-й восходящий тон).<br>
            • <strong>沱茶 (Tuóchá)</strong> — <em>Чай в форме чаши/гнезда</em>. <em>Tuó (沱)</em> произносится со 2-м восходящим тоном.<br>
            • <strong>绿茶 (Lǜchá)</strong> — <em>Зеленый чай</em>. Обратите внимание на <em>Lǜ (绿)</em> с 4-м нисходящим тоном (звук "юй").<br><br>
            🎙️ Если вы захотите угостить кого-то этим чаем, можно сказать: <strong>«Это чунцинская Шаньчэн Точа, это зеленый чай, а не пуэр»</strong> (<em>Zhè shì chóngqìng de shānchéng tuóchá, shì lǜchá bù  shì pǔ'ěr</em> — Это чунцинская Шаньчэн Точа, это зеленый чай, а не пуэр).
        </p>
    </div>

</div>
