# Vanilla Extract

## Суть концепции
Vanilla Extract — это современная библиотека CSS-in-TypeScript. Её главная "киллер-фича" в том, что она является **Zero-Runtime**. Вы пишете стили на TypeScript (с автокомплитом, типами и импортами переменных из других JS-файлов), но во время сборки проекта (build time) весь этот код компилируется в обычные статические `.css` файлы. 

В браузере нет никакого JavaScript-движка, парсящего стили, что делает Vanilla Extract невероятно быстрым по сравнению с Emotion или Styled Components.

## Какую боль мы решаем
Исторически мы выбирали: либо удобство CSS-in-JS (типизация, переменные, компоненты), но тормоза в браузере (Runtime overhead); либо скорость обычных CSS-файлов (или CSS Modules), но без строгой типизации и удобного шаринга констант между JS и CSS. Vanilla Extract объединяет лучшее из обоих миров.

## Как это работает

```mermaid
graph TD
    A[styles.css.ts] -->|Contains TS Objects| B(Vite/Webpack + VE Plugin)
    
    B -->|Extracts Styles| C(Static styles.css)
    B -->|Returns Class Hashes| D(styles.js)
    
    C --> E[.hash123 { color: red; }]
    D --> F[export const button = 'hash123';]
    
    F --> G[React Component]
    G -->|<button class={styles.button}>| H[Browser DOM]
```

## Примеры кода

**❌ Антипаттерн: Попытка передать динамические пропсы (Runtime logic)**
```typescript
// Это не сработает в Vanilla Extract! Стили собираются на этапе билда.
// Вы не можете передать сюда стейт из React-компонента.
export const dynamicBox = style({
  width: `${window.innerWidth}px` // Ошибка компиляции
});
```

**✅ Правильное решение: Статические рецепты (Recipes)**
```typescript
// button.css.ts (Обязательно расширение .css.ts)
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

// Создаем статический скоупированный класс
export const baseButton = style({
  padding: '10px 20px',
  borderRadius: '8px',
  transition: 'background 0.2s'
});

// Создаем "рецепт" (аналог API из Stitches) для разных вариантов
export const buttonRecipe = recipe({
  base: baseButton,
  variants: {
    color: {
      primary: { background: 'blue', color: 'white' },
      danger: { background: 'red', color: 'white' }
    }
  },
  defaultVariants: { color: 'primary' }
});
```
```tsx
// Button.tsx
import { buttonRecipe } from './button.css.ts';

export const Button = ({ variant }) => (
  // React просто переключает статические классы
  <button className={buttonRecipe({ color: variant })}>Click</button>
);
```

## Неочевидные нюансы и границы применимости
- **Интеграция со сборщиками:** В отличие от Emotion, который работает "из коробки", Vanilla Extract требует настройки плагинов для Vite, Webpack или Next.js, чтобы перехватывать файлы `.css.ts`.
- **CSS Variables First:** Так как стили статичны, единственный способ передать динамику из JS (например, позицию курсора мыши) в CSS — это использовать инлайн-стили с CSS-переменными (`style={{ '--mouse-x': x }}`), а в Vanilla Extract подхватить эту переменную.
- **Идеально для Server Components:** Так как стили генерируются в статические CSS-файлы, Vanilla Extract полностью совместим с React Server Components (Next.js App Router).
