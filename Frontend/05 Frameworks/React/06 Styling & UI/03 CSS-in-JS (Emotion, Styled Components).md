
С 2018 по 2022 годы CSS-in-JS был королем React-разработки. Инструменты вроде **Styled Components** и **Emotion** позволяли писать CSS прямо внутри JS-файлов, используя шаблонные строки (Tagged Template Literals).

## 1. Как это выглядит
```jsx
import styled from 'styled-components';

// Создаем React-компонент, который сразу оборачивает HTML-тег стилями
const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 10px 20px;
  border-radius: 5px;
`;

export function App() {
  return <Button primary>Отправить</Button>;
}
```

## 2. Почему от этого отказываются в 2026 году? (Критический вопрос на собеседовании)

Если вы скажете на собеседовании, что Styled Components — ваш выбор по умолчанию для нового проекта в 2026 году, это вызовет много вопросов. Индустрия массово отходит от классического CSS-in-JS (Runtime).

**Главные причины (Edge Cases & Проблемы):**

1. **Несовместимость с React Server Components (RSC):**
   Styled Components и Emotion полагаются на React Context (для тем оформления) и генерируют стили *в браузере во время рендера (Runtime)*. Серверные компоненты не имеют контекста и не выполняют хуки. Если вы используете RSC (например, в Next.js App Router), вам придется вешать директиву `"use client"` на ВСЕ ваши компоненты, убивая всю суть серверного рендеринга.
   
2. **Накладные расходы на производительность (Runtime Overhead):**
   При каждом изменении пропсов (например, при анимации) библиотека должна заново распарсить строку, сгенерировать CSS, создать новый хеш класса и вставить тег `<style>` в `<head>` документа. Это вызывает "тормоза" (блокировку главного потока).

## 3. Новая волна: Zero-Runtime CSS-in-JS
Понимая проблемы старых подходов, сообщество создало новые инструменты, такие как **Vanilla Extract**, **Panda CSS** и **Linaria**.

Они предлагают похожий Developer Experience (вы пишете стили в JS/TS), но они вычисляются **исключительно на этапе сборки (Build-time)**. 
В браузер пользователя отправляется чистый, статический `.css` файл, а в JS остаются только сгенерированные строки с именами классов. Никакой генерации в рантайме!

**Пример Vanilla Extract:**
```typescript
import { style } from '@vanilla-extract/css';

// Вычисляется при сборке!
export const buttonClass = style({
  backgroundColor: 'blue',
  ':hover': {
    backgroundColor: 'darkblue'
  }
});
```

**Резюме:** Старый CSS-in-JS (Styled Components) поддерживается в legacy-проектах. Для новых проектов выбирают либо Tailwind CSS, либо Zero-Runtime решения (Panda CSS / Vanilla Extract).
