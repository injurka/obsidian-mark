# 🎨 Руководство по Форматированию Callouts, HTML и CSS Snippets в Obsidian

## 1. Типы Obsidian Callouts в Travel Vault

| Тип Callout | Синтаксис | Размещение | Назначение | Пример использования |
| :--- | :--- | :--- | :--- | :--- |
| **Совет / Лайфхак** | `> [!TIP]` | **Под активностью / локацией** | Секретные ракурсы, правила очередей, формулы заказа, лайфхаки, экипировка | Очередь в Simple Kaffa, терраса в A-Mei Tea House, упаковка на Сяолюцю |
| **Важное правило** | `> [!IMPORTANT]` | **В блоке «Важная подготовка»** | Необходимые документы, билеты TRA/THSR, тайминг, регистрация | Билеты TRA EMU3000, бронь отеля, миграционная карта TWAC |
| **Критический запрет**| `> [!CAUTION]` | **В подготовке / на локации** | Законы с гигантскими штрафами, опасности, депортация | Запрет мяса (АЧС), запрет вейпов, отбойные волны Цисинтаня |
| **Предупреждение** | `> [!WARNING]` | **В подготовке / на локации** | Погода, обезьяны, мошки, правила метро | Правило желтой линии в MRT, макаки на Шоушане |
| **Сводка / Резюме** | `> [!summary]+` | **В сводных отчетах** | Главные финансовые и маршрутные итоги | Бюджет поездки под ключ в `Финансы.md` |
| **Свернутая галерея** | `> [!INFO]- Картинки` | **Под локацией (после карт/TIP)** | Блок изображений внутри секций | Скриншоты карт, фото еды и достопримечательностей |
| **Справочная инфо** | `> [!NOTE]` | **По тексту / в подготовке** | Розетки, напряжение, статус троп | Статус тропы Хуэйдэ, розетки и напряжение |

---

### 📐 Золотое правило позиционирования Callouts:
1. **Глобальный блок подготовки (в начале дня):**
   * Содержит только системные и организационные требования дня: `[!IMPORTANT]` (билеты, класс поезда, где сидеть в вагоне, тайминг стыковок, отель) и `[!CAUTION]` (таможня, законодательные запреты).
2. **Контекстные коллауты `[!TIP]` (внутри таймлайна дня):**
   * Размещаются **строго под конкретным пунктом активности**, к которому относятся (например: совет по очереди за кофе `[!TIP]` ставится прямо под кофейней Simple Kaffa; совет по экипировке треккинга `[!TIP]` — прямо под хайкингом горы Лиюй; совет по блюду `[!TIP]` — прямо под рестораном). Не перегружайте начало файла локальными советами!

---

## 2. Код встраивания Google Maps iframe

Шаблон URL кодирования параметров:
```html
<iframe src="https://maps.google.com/maps?q=URL_ENCODED_QUERY&output=embed" style="width: 100%; min-width: 100%; height: 350px; display: block; border: 0; border-radius: 8px; margin-top: 10px; margin-bottom: 15px;" loading="lazy"></iframe>
```

---

## 3. Стилизация бейджей рейтинга (`travel-rating.css`)

В хранилище подключен кастомный CSS-сниппет `travel-rating.css` со следующей шкалой:

### Шкала градаций рейтинга:
- **9.0 – 10.0 : Must-Visit / Шедевр (Рубиново-пурпурный)**
  ```html
  <span class="tp-rate r-top"><b class="tp-score">9.8</b><span class="tp-tag">MUST</span></span>
  ```
- **8.0 – 8.9 : High / Топ-локация (Янтарно-оранжевый)**
  ```html
  <span class="tp-rate r-high"><b class="tp-score">8.7</b><span class="tp-tag">TOP</span></span>
  ```
- **7.0 – 7.9 : Recommended / Рекомендовано (Бирюзово-синий)**
  ```html
  <span class="tp-rate r-mid"><b class="tp-score">7.6</b><span class="tp-tag">GOOD</span></span>
  ```
- **5.5 – 6.9 : Vibe / Локальный колорит (Изумрудно-зеленый)**
  ```html
  <span class="tp-rate r-low"><b class="tp-score">6.5</b><span class="tp-tag">VIBE</span></span>
  ```
- **< 5.5 : Optional / Факультатив (Нейтральный серый)**
  ```html
  <span class="tp-rate r-opt"><b class="tp-score">5.2</b><span class="tp-tag">OPT</span></span>
  ```

### Дополнительные компоненты:
- **Легенда шкалы (Legend Bar):**
  ```html
  <div class="tp-legend">
    <span class="tp-legend-title">Шкала:</span>
    <span class="tp-legend-item"><span class="tp-rate r-top"><b class="tp-score">9.5+</b><span class="tp-tag">MUST</span></span> <b>Обязательно к посещению</b></span>
    <span class="tp-legend-item"><span class="tp-rate r-high"><b class="tp-score">8.5+</b><span class="tp-tag">TOP</span></span> <b>Высокий приоритет</b></span>
  </div>
  ```
- **Мета-чипы (Meta Chips):**
  ```html
  <span class="tp-meta">⏱️ 2.5 ч</span> <span class="tp-meta">🎟️ ~350 ₽</span>
  ```
- **Карточка локации (Place Card):**
  ```html
  <div class="tp-card">
    <div class="tp-card-head">
      <span class="tp-rate r-top"><b class="tp-score">9.8</b><span class="tp-tag">MUST</span></span>
      <span class="tp-card-name">Taipei 101</span>
    </div>
    <div class="tp-card-desc">Архитектурный шедевр в форме бамбука с демпфером.</div>
    <div class="tp-card-foot"><span>🚇 MRT Taipei 101</span><span>⏰ До 22:00</span></div>
  </div>
  ```

---

## 4. Организация медиа-вложений (`_/`)

Все скриншоты, фотографии и карты привязываются по структуре:
- `Personal Note/Travel/-- <Название>/_/all/` — общие фото региона, обложки заметок (`note_*.jpg`).
- `Personal Note/Travel/-- <Название>/_/01/`, `_/02/`... — фото к конкретным дням (`01_*.jpg`, `Pasted image *.png`).
- Вставка в текст осуществляется через Obsidian Wikilinks внутри свернутого коллаута:
  ```markdown
  > [!INFO]- Картинки
  > ![[01_dihua_street.jpg]]
  > ![[Pasted image 20260825141150.png]]
  ```
