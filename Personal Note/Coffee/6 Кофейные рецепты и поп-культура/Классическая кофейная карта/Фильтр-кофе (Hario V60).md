---
target: "coffee-recipe"
id: "hario-v60-pourover"
title: "Фильтр-кофе (Hario V60)"
category: "Классическая кофейная карта"
difficulty: 3
time_total_min: 5
servings_default: 1
coffee_base_type: "filter"
temperature: "hot"
ingredients:
  - item: "кофе_светлой_обжарки"
    amount: 15
    unit: "г"
    required: true
    alternatives: []
  - item: "вода_горячая"
    amount: 250
    unit: "мл"
    required: true
    alternatives: []
tools:
  - "воронка_v60"
  - "весы_кофейные_с_таймером"
  - "чайник_с_тонким_носиком"
  - "фильтр_бумажный"
tags:
  - "метод/пуровер"
  - "вкус/чистый"
  - "вкус/кислотный"
---

<div class="recipe-single-column">

    <p style="margin-bottom: 1.5rem;"><strong>Hario V60</strong> — это Святой Грааль спешелти-индустрии. Название воронки происходит от угла её конуса (ровно 60 градусов), который задает идеальную геометрию для прохождения воды через кофейную таблетку. Метод пуровера (от англ. <em>pour over</em> — лить сверху) дает самую чистую, прозрачную и "чайную" чашку кофе, раскрывая тончайшие энзимные ноты зерна: ягоды, цветы, цитрусы и тропические фрукты.</p>

    <div class="recipe-block">
        <div class="recipe-info-header">📋 Параметры приготовления (Рецепт Джеймса Хоффманна / Тэцу Касуя)</div>
        <div class="recipe-meta-grid">
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Время пролива (Drawdown)</span>
                <span class="recipe-meta-value">⏱️ 2:30 — 3:00 минуты</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Brew Ratio (Пропорция)</span>
                <span class="recipe-meta-value">⚖️ 1:16.6 (15г кофе / 250г воды)</span>
            </div>
            <div class="recipe-meta-item">
                <span class="recipe-meta-label">Сложность</span>
                <span class="recipe-meta-value">🔴 Высокая <span style="font-size: 0.8em; font-weight: 400; color: var(--text-muted);">(важен контроль вливания)</span></span>
            </div>
        </div>
    </div>

    <!-- НОВЫЙ БЛОК: ГРАФИК И АНАТОМИЯ -->
    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.5rem;">📊 График экстракции и анатомия процесса</h3>
        
        <!-- График вливаний (Pouring Schedule Chart) -->
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">График массы воды от времени</p>
        <div class="recipe-pour-chart">
            <div class="chart-y-axis">
                <span>250g</span>
                <span>150g</span>
                <span>30g</span>
                <span>0g</span>
            </div>
            <div class="chart-grid-area">
                <div class="chart-step step-bloom">
                    <span class="step-label">Предсмока (Bloom)</span>
                </div>
                <div class="chart-step step-pour-1">
                    <span class="step-label">Фаза 1 (Сладость/Кислотность)</span>
                </div>
                <div class="chart-step step-pour-2">
                    <span class="step-label">Фаза 2 (Плотность/Тело)</span>
                </div>
            </div>
            <div class="chart-x-axis">
                <span>0:00</span>
                <span>0:45</span>
                <span>1:30</span>
                <span>2:30 - 3:00</span>
            </div>
        </div>

        <!-- Анатомия V60 -->
        <div class="recipe-cup-wrapper" style="margin-top: 2rem;">
            <div class="recipe-v60-diagram">
                <!-- Воронка -->
                <div class="v60-dripper">
                    <div class="v60-filter-paper">
                        <div class="v60-coffee-bed">Кофейная таблетка</div>
                        <div class="v60-water-level"></div>
                    </div>
                </div>
                <!-- Капля (Анимация) -->
                <div class="v60-drip"></div>
                <!-- Сервер (Чайник) -->
                <div class="v60-server">
                    <div class="server-coffee-liquid">Готовый фильтр-кофе</div>
                </div>
            </div>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">🛒 Ингредиенты и оборудование</h3>
        
        <div class="recipe-ing-group">
            <div class="recipe-ing-title">База</div>
            <ul class="recipe-ingredient-list">
                <li><strong>Кофе светлой обжарки (Под фильтр)</strong> — ровно 15 г. <span class="recipe-marker">Помол средне-крупный</span> (как морская соль или тростниковый сахар).</li>
                <li><strong>Вода</strong> — 250 мл. Температура: <strong>93–96°C</strong>. Чем светлее обжарка, тем выше должна быть температура для полноценной экстракции. Вода должна быть мягкой (минерализация 50-75 ppm).</li>
            </ul>
        </div>

        <div class="recipe-ing-group" style="margin-top: 1.5rem;">
            <div class="recipe-ing-title">Критичное оборудование</div>
            <ul class="recipe-ingredient-list">
                <li><strong>Чайник (Gooseneck)</strong> — без длинного изогнутого носика сделать правильное, ламинарное вливание воды невозможно.</li>
                <li><strong>Ювелирные весы с таймером</strong> — погрешность даже в 10 грамм воды или 1 грамм кофе разрушит баланс чашки (TDS).</li>
            </ul>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1rem;">🔬 Физика экстракции: Ошибки и механика</h3>
        <div class="recipe-details-group">
            <details>
                <summary>🫧 Зачем нужно предсмочивание (Bloom)?</summary>
                <p>Свежеобжаренный кофе содержит огромное количество углекислого газа (CO2). Если залить весь объем воды сразу, газ начнет бурно выходить, отталкивая воду от кофейных частиц, и экстракции не произойдет — вода просто протечет сквозь зерно. Предсмочивание (вливание 30 г воды на 45 секунд) дает газу выйти ("цветение" таблетки), подготавливая поры целлюлозы к принятию воды.</p>
            </details>

            <details>
                <summary>🚧 Проблема Байпаса (Bypass)</summary>
                <p>Байпас — это вода, которая протекла по ребристым стенкам V60 сквозь бумагу напрямую в сервер, <em>минуя</em> саму кофейную таблетку. Она разбавляет напиток. Именно поэтому мы льем воду строго по кофейной гуще круговыми движениями, не касаясь голых бумажных стенок воронки. Ребра на Hario V60 (spirals) нужны как раз для того, чтобы воздух мог выходить из сервера, не мешая воде проходить сквозь кофе.</p>
            </details>

            <details>
                <summary>🔄 Ажитация (Взбалтывание)</summary>
                <p>Перемешивание (ажитация) увеличивает скорость экстракции. Когда мы крутим саму воронку после предсмочивания или вливаний (т.н. <em>"Rao Spin"</em> или Вращение Рао), мы выравниваем кофейную таблетку. Плоское дно таблетки гарантирует, что вода будет проходить равномерно через всю массу кофе, не образуя каналов (channeling).</p>
            </details>
        </div>
    </div>

    <div class="recipe-block">
        <h3 style="margin-top: 0; margin-bottom: 1.25rem;">👩‍🍳 Пошаговый график вливаний</h3>
        
        <div class="recipe-step-item">
            <h4>Шаг 1. Подготовка и прогрев (0:00)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Вставьте бумажный фильтр в воронку. Обильно пролейте его горячей водой (около 100 мл). Это смоет вкус целлюлозы/бумаги и прогреет керамическую воронку (чтобы она не крала температуру у экстракции). Слейте воду из сервера. Засыпьте 15 г кофе, сделайте воронку плоской, слегка потряся её, и сделайте пальцем небольшое углубление в центре.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 2. Предсмочивание / Bloom (0:00 — 0:45)</h4>
            <p style="margin: 0; font-size: 0.95rem;">Включите таймер. Быстро влейте <strong>30 г воды</strong> (в два раза больше веса кофе), чтобы смочить все частицы. Возьмите воронку и активно покрутите её по кругу (Rao Spin), чтобы перемешать кофе с водой. Ждите до 45 секунды. Кофе должен вздуться пузырями.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 3. Первая фаза: Кислотность и сладость (0:45 — 1:30)</h4>
            <p style="margin: 0; font-size: 0.95rem;">На 45-й секунде начните медленно вливать воду от центра к краям (не задевая бумагу) и обратно. Лейте со скоростью около 5-6 грамм в секунду, пока весы не покажут <strong>150 г</strong> (это еще +120 г воды). В этой фазе вывариваются самые легкие и яркие компоненты — фруктовые кислоты и сахара.</p>
        </div>

        <div class="recipe-step-item">
            <h4>Шаг 4. Вторая фаза: Тело и баланс (1:30 — 2:30)</h4>
            <p style="margin: 0; font-size: 0.95rem;">На отметке 1:30 влейте оставшуюся воду медленными спиральными движениями, доводя общий вес до <strong>250 г</strong> (это еще +100 г). Слегка покрутите воронку еще раз, чтобы сбросить налипшую гущу со стенок. Ждите полного пролива воды (Drawdown). К 2:30 - 3:00 минутам кофейная таблетка на дне должна стать идеально плоской. Напиток готов!</p>
        </div>
    </div>

    <div class="recipe-block-alert">
        <h4 style="margin-top: 0; margin-bottom: 0.5rem; color: var(--interactive-accent);">💡 Анализ результата: Как читать таблетку?</h4>
        <p style="margin: 0; font-size: 0.95rem;">
            Посмотрите на гущу после пролива. Если она похожа на кратер вулкана (с углублением в центре и кофе на стенках) — вы получили неравномерную экстракцию (недоэкстракт в центре, переэкстракт по краям). Идеальная таблетка должна лежать ровным, плоским слоем грязи. Если вода проходила дольше 3:30 минут — ваш помол был слишком мелким (кофе будет горчить). Если быстрее 2:15 минут — слишком крупным (кофе будет водянистым и кислым).
        </p>
    </div>

</div>
