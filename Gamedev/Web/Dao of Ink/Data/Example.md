# Архитектура Данных и Игровые Механики "Dao of Ink"

## 1. Прогрессия Иероглифов и Направленный Ациклический Граф (DAG Crafting)

```mermaid
graph LR
    %% Стили для разных уровней (Tiers)
    classDef primitive fill:#8B5A2B,stroke:#d4af37,stroke-width:2px,color:#fff;
    classDef t1 fill:#556B2F,stroke:#d4af37,stroke-width:2px,color:#fff;
    classDef t2 fill:#2F4F4F,stroke:#d4af37,stroke-width:2px,color:#fff;
    classDef t3 fill:#4B0082,stroke:#d4af37,stroke-width:2px,color:#fff;

    %% УРОВЕНЬ 0: Базовые Примитивы (Tier 0)
    subgraph Tier0["🟤 Tier 0: Базовые Примитивы"]
        R_mu(["<b>木</b> (R-mu)<br>mu4 • 4 черты<br>Дерево<br>HSK 1 | noun"]):::primitive
        R_huo(["<b>火</b> (R-huo)<br>huo3 • 4 черты<br>Огонь<br>HSK 1 | noun"]):::primitive
        R_mu_eye(["<b>目</b> (R-mu-eye)<br>mu4 • 5 черт<br>Глаз<br>HSK 0 | noun"]):::primitive
        R_xin(["<b>心</b> (R-xin)<br>xin1 • 4 черты<br>Сердце<br>HSK 1 | noun"]):::primitive
        R_shi(["<b>士</b> (R-shi)<br>shi4 • 3 черты<br>Воин<br>HSK 0 | noun"]):::primitive
        R_kou(["<b>口</b> (R-kou)<br>kou3 • 3 черты<br>Рот<br>HSK 1 | noun"]):::primitive
    end

    %% УРОВЕНЬ 1: Простые Композиты (Tier 1)
    subgraph Tier1["🟢 Tier 1: Простые Композиты"]
        C_lin[["<b>林</b> (C-lin)<br>lin2 • 8 черт<br>Лес<br>HSK 2 | noun"]]:::t1
        C_xiang[["<b>相</b> (C-xiang)<br>xiang1 • 9 черт<br>Взаимность<br>HSK 3 | adj, adv"]]:::t1
        C_ji[["<b>吉</b> (C-ji)<br>ji2 • 6 черт<br>Удача<br>HSK 3 | adj, noun"]]:::t1
    end

    %% УРОВЕНЬ 2: Сложные Композиты (Tier 2)
    subgraph Tier2["🔵 Tier 2: Сложные Композиты"]
        C_fen{"<b>焚</b> (C-fen)<br>fen2 • 12 черт<br>Сжигать<br>HSK 3 | verb"}:::t2
        C_sen{"<b>森</b> (C-sen)<br>sen1 • 12 черт<br>Чаща<br>HSK 3 | noun, adj"}:::t2
        C_xiang_think{"<b>想</b> (C-xiang-think)<br>xiang3 • 13 черт<br>Думать / Желать<br>HSK 1 | verb"}:::t2
        C_zhe{"<b>喆</b> (C-zhe)<br>zhe2 • 12 черт<br>Мудрость<br>HSK 3 | adj, noun"}:::t2
    end

    %% УРОВЕНЬ 3: Глубокие Концепции (Tier 3)
    subgraph Tier3["🟣 Tier 3: Глубокие Концепции"]
        C_xi{{"<b>囍</b> (C-xi)<br>xi3 • 24 черты<br>Двойное счастье<br>HSK 3 | noun, adj"}}:::t3
    end

    %% СВЯЗИ ДЛЯ TIER 1 (База + База = T1)
    R_mu -->|R-mu x2| C_lin
    
    R_mu --> C_xiang
    R_mu_eye --> C_xiang
    
    R_shi --> C_ji
    R_kou --> C_ji

    %% СВЯЗИ ДЛЯ TIER 2 (T1 + База = T2)
    C_lin --> C_fen
    R_huo --> C_fen

    C_lin --> C_sen
    R_mu --> C_sen

    C_xiang --> C_xiang_think
    R_xin --> C_xiang_think

    %% СВЯЗИ ДЛЯ TIER 2 (T1 + T1 = T2)
    C_ji -->|C-ji x2| C_zhe

    %% СВЯЗИ ДЛЯ TIER 3 (T2 + T2 = T3)
    C_zhe -->|C-zhe x2| C_xi
```

---

## 2. Древо Групп Радикалов (Трактат Дао / `radical-group.json`)

```mermaid
graph LR
    %% Стили для UI-эстетики игры
    classDef rootNode fill:#1a1a1a,stroke:#d4af37,stroke-width:3px,color:#fff,font-size:16px;
    classDef groupNode fill:#3E2723,stroke:#d4af37,stroke-width:1px,color:#FFF8DC,font-size:13px;

    Root(("<b>Трактат Дао</b><br/>(9 Ветвей)")):::rootNode

    %% Определения узлов с ID из radical-group.json
    TG_nature["<b>⛰️ Природа и стихии</b> (TG-nature)<br/><i>Первичные силы мироздания: небесные светила,<br/>ландшафты, погодные явления, вода, огонь и земля.</i>"]:::groupNode
    
    TG_human["<b>👤 Человек и тело</b> (TG-human)<br/><i>Средоточие смертной жизни. Люди, их статусы,<br/>позы, органы чувств и плоть.</i>"]:::groupNode
    
    TG_flora["<b>🎋 Флора и земледелие</b> (TG-flora)<br/><i>Энергия роста и процветания.<br/>Деревья, травы, злаки и поля.</i>"]:::groupNode
    
    TG_fauna["<b>🐅 Животный мир</b> (TG-fauna)<br/><i>Существа, населяющие землю, воду и небеса.<br/>От домашнего скота до диких хищников.</i>"]:::groupNode
    
    TG_architecture["<b>⛩️ Архитектура и пространство</b> (TG-architecture)<br/><i>Укрытия и границы, созданные руками человека.<br/>Крыши, стены, врата, алтари и пути.</i>"]:::groupNode
    
    TG_tools["<b>🪓 Орудия труда и оружие</b> (TG-tools)<br/><i>Инструменты ремесленников и воинов.<br/>Ножи, копья, топоры и луки.</i>"]:::groupNode
    
    TG_life["<b>🏺 Быт, утварь и пища</b> (TG-life)<br/><i>Основа повседневного выживания. Сосуды<br/>для вина, чаши, котлы, пища и очаг.</i>"]:::groupNode
    
    TG_fabric["<b>👘 Одежда, ткани и цвета</b> (TG-fabric)<br/><i>Всё, что согревает и украшает. Шелковые нити,<br/>ткани, традиционные одеяния, нефрит.</i>"]:::groupNode
    
    TG_abstract["<b>☯️ Абстракции, дух и действия</b> (TG-abstract)<br/><i>Тонкие материи и концепции. Речь, звук,<br/>ритуалы гадания, числа, болезни и движение.</i>"]:::groupNode

    %% Связи
    Root --> TG_nature
    Root --> TG_human
    Root --> TG_flora
    Root --> TG_fauna
    Root --> TG_architecture
    Root --> TG_tools
    Root --> TG_life
    Root --> TG_fabric
    Root --> TG_abstract
```

---

## 3. Механика Расшифровки Таинственных Свитков (`mystery-scrolls.json`)

```mermaid
graph TD
    classDef scroll fill:#4A148C,stroke:#E040FB,stroke-width:2px,color:#fff;
    classDef anchor fill:#1B5E20,stroke:#81C784,stroke-width:1px,color:#fff;
    classDef target fill:#0D47A1,stroke:#64B5F6,stroke-width:2px,color:#fff;
    classDef grid fill:#212121,stroke:#757575,stroke-dasharray: 5 5,color:#fff;

    Scroll["<b>📜 Таинственный Свиток</b><br>ID: scroll-sen<br>Требуемый HSK: 2<br>Цена: 30 меди"]:::scroll
    
    Hint["<b>💬 Подсказка</b><br><i>'Шепот свитков говорит о густой чаще...'</i>"]:::scroll

    subgraph Grid["🧩 Сетка Расшифровки (gridSize: 3x3)"]
        Anchor1["<b>Якорь 1</b>: 木 (R-mu)"]:::anchor
        Anchor2["<b>Якорь 2</b>: 林 (C-lin)"]:::anchor
    end

    Target["<b>✨ Целевой Иероглиф</b><br>森 (C-sen)<br>Тайга / Чаща"]:::target

    Scroll --> Hint
    Scroll --> Grid
    Anchor1 --> Target
    Anchor2 --> Target
```

---

## 4. Грамматические Категории и Режим Амулетов (`formulas.json`)

```mermaid
graph TD
    classDef mainFormula fill:#2E7D32,stroke:#A5D6A7,stroke-width:2px,color:#fff;
    classDef posNoun fill:#4CAF50,stroke:#2E7D32,color:#fff;
    classDef posVerb fill:#F44336,stroke:#B71C1C,color:#fff;
    classDef posModal fill:#E91E63,stroke:#880E4F,color:#fff;
    classDef posAdj fill:#FF9800,stroke:#E65100,color:#fff;
    classDef posPart fill:#607D8B,stroke:#263238,color:#fff;

    FormulaSVO["<b>🔮 Трафарет Заклинания SVO</b><br>Субъект + Глагол + Объект"]:::mainFormula

    subgraph GrammaticalTags["🏷️ Грамматические Теги (partOfSpeech)"]
        Noun["<b>Существительное (noun)</b><br>名词 (ming2ci2) • 木, 林, 茶, 心"]:::posNoun
        Verb["<b>Глагол (verb)</b><br>动词 (dong4ci2) • 焚, 喝, 爱, 看"]:::posVerb
        Modal["<b>Модальный глагол (modal_verb)</b><br>能愿动词 (neng2yuan4 dong4ci2) • 想, 要, 能"]:::posModal
        Adj["<b>Прилагательное (adjective)</b><br>形容词 (xing2rong2ci2) • 吉, 喆, 好, 大"]:::posAdj
        Particle["<b>Частица (particle)</b><br>助词 (zhu4ci2) • 的, 了, 吗"]:::posPart
    end

    Noun -->|Роль: S / O| FormulaSVO
    Modal -->|Роль: V| FormulaSVO
    Verb -->|Роль: V| FormulaSVO
    Adj -->|Модификатор| Noun
```

---

## 5. Цикл Исполнения Заказов Клиентов (`customers.json`)

```mermaid
sequenceDiagram
    autonumber
    actor Customer as 👨‍🌾 Крестьянин Ли (NPC-farmer-01)
    participant Shop as ⛩️ Лавка Алхимика (Игрок)
    participant DB as 📜 База Данных (JSON)

    Customer->>Shop: Приходит в лавку (minReputation >= 0)
    Customer->>Shop: Диалог: "Деревня страдает от лесного пожара! Нужна магия!"
    Note over Customer,Shop: Требования:<br>1. requiredMeaningTags: ["water", "protection"]<br>или 2. acceptedItemIds: ["R-shui", "C-dan"]
    
    alt У игрока есть подходящий предмет (R-shui / C-dan)
        Shop->>Customer: Передает предмет из инвентаря
        Customer->>Shop: Оплата & Награда (15 меди, +5 репутации)
    else Составление нового Амулета / Вызов дождя
        Shop->>DB: Алхимия: Крафт символов Воды (R-shui)
        DB-->>Shop: Создан символ / Амулет
        Shop->>Customer: Передает созданный амулет
        Customer->>Shop: Оплата & Награда (15 меди, +5 репутации)
    end
```
