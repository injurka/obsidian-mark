
CSS Modules — это классический и невероятно надежный способ стилизации, встроенный "из коробки" в большинство сборщиков (Vite, Next.js, Create React App).

## 1. Как это работает
Вы создаете файл с суффиксом `.module.css`. Главная фича CSS Modules — **локальная область видимости (Local Scope)**.
При сборке каждый класс получает уникальный хеш.

```css
/* Button.module.css */
.btn {
  background: blue;
}
.error {
  background: red;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

export function Button() {
  // В браузере это превратится в нечто вроде <button class="Button_btn__a1B2c">
  return <button className={styles.btn}>Кликни</button>; 
}
```

**Преимущества:**
- **Никаких коллизий имен:** Вы можете иметь класс `.btn` в ста разных файлах, и они никогда не пересекутся.
- **Статический CSS:** В отличие от Styled Components, CSS Modules не требуют JavaScript для работы. Браузер получает обычный, быстрый `.css` файл.

## 2. Идеальная синергия с React Server Components (RSC)
К 2026 году CSS Modules переживают вторую молодость. Почему?
Потому что Server Components не могут выполнять клиентский JavaScript. Библиотеки CSS-in-JS (Emotion, Styled Components) в них ломаются. А вот CSS Modules работают идеально, так как они вычисляются на этапе сборки и отдают чистый HTML с хэшированными классами.

## 3. Необычная ситуация (Edge Case): Передача переменных из CSS в JS
Иногда вам нужно синхронизировать значения (например, брейкпоинты для ресайза) между вашим CSS и логикой React.
В CSS Modules для этого есть специальный (и малоизвестный) синтаксис `:export`.

```css
/* theme.module.css */
:export {
  primaryColor: #3498db;
  mobileBreakpoint: 768px;
}
```

```jsx
import theme from './theme.module.css';

function ResponsiveWidget() {
  const isMobile = window.innerWidth < parseInt(theme.mobileBreakpoint);
  
  return <div style={{ color: theme.primaryColor }}>Виджет</div>;
}
```

## 4. Глобальные стили внутри модулей
Если вам нужно применить глобальный стиль (например, к классу, который генерируется сторонней библиотекой), находясь внутри `.module.css`, используйте псевдокласс `:global()`.

```css
/* Стилизуем локальный контейнер */
.container {
  padding: 20px;
}

/* Но внутри него переопределяем глобальный класс библиотеки Swiper.js */
.container :global(.swiper-pagination-bullet) {
  background-color: red;
}
```
