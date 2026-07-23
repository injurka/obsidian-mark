# CSS Grid Layout

**CSS Grid Layout** — это двумерная (2D) система сеток в CSS, позволяющая разработчикам одновременно управлять как колонками (columns), так и строками (rows), создавая сложные макеты страниц без использования костылей.

---

## 1. Базовые свойства Grid-контейнера

Для создания грид-контейнера элементу задается свойство `display: grid` или `display: inline-grid`.

```css
.grid-container {
  display: grid;
  /* Определяем три колонки: 200px, оставшаяся доля, и авто-размер */
  grid-template-columns: 200px 1fr auto;
  
  /* Определяем две строки */
  grid-template-rows: 80px 1fr;
  
  /* Отступы между ячейками */
  gap: 16px;
}
```

### Единица измерения `fr` (Fraction)
`fr` представляет долю свободного пространства в грид-контейнере. Если задано `grid-template-columns: 1fr 2fr`, свободное место разделится на 3 части: первая колонка получит 1/3, вторая — 2/3.

---

## 2. Функции repeat() и minmax()

### 2.1. repeat()
Позволяет сократить запись повторяющихся колонок/строк:
```css
/* Эквивалентно: 1fr 1fr 1fr 1fr */
grid-template-columns: repeat(4, 1fr);
```

### 2.2. minmax()
Задает минимальные и максимальные границы размеров колонки:
```css
/* Колонка не сожмется меньше 200px, но растянется до 1fr */
grid-template-columns: repeat(3, minmax(200px, 1fr));
```

---

## 3. Адаптивность без медиа-запросов: auto-fill vs auto-fit

Используя `repeat` совместно с ключевыми словами `auto-fill` или `auto-fit`, можно создавать полностью адаптивные сетки карточек без единого медиа-запроса `@media`.

```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
```

### Разница между `auto-fill` и `auto-fit`:
*   **`auto-fill` (авто-заполнение):** Браузер пытается создать как можно больше колонок шириной 250px. Если свободное место остается, а элементов больше нет, колонки все равно будут созданы и останутся пустыми.
*   **`auto-fit` (авто-встраивание):** Браузер также рассчитывает колонки, но пустые колонки сжимаются до нуля (`0px`), отдавая свое свободное пространство под расширение существующих элементов.

---

## 4. Декларативная разметка: grid-template-areas

Этот паттерн позволяет визуально описать макет страницы прямо в CSS с помощью строк.

```css
.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  height: 100vh;
}

/* Привязываем элементы к именованным областям */
.app-header  { grid-area: header; }
.app-sidebar { grid-area: sidebar; }
.app-main    { grid-area: main; }
.app-footer  { grid-area: footer; }
```
