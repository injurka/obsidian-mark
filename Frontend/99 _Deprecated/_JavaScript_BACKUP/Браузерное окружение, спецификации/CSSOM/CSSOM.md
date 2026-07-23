**CSSOM, или CSS Object Model**, представляет собой мост между миром CSS и JavaScript. Это набор API, который позволяет **манипулировать CSS через JS**, делая веб-разработку более динамичной и интерактивной. Если вы знакомы с DOM (Document Object Model), который позволяет работать с HTML, то CSSOM – это его аналог, но для работы со стилями.

## Как работать с CSSOM

Основой работы с **CSSOM** является понимание того, как **читать и изменять CSS стили** динамически. Для этого существует несколько ключевых методов и свойств.

- **getComputedStyle()** позволяет получить все стили, примененные к элементу, включая те, что заданы во внешних CSS файлах.
- **element.style** обращается к инлайн-стилям элемента, позволяя их читать и изменять.
- **CSSStyleSheet API** дает возможность работать с целыми таблицами стилей, добавляя или удаляя CSS правила.

**CSSOM (CSS Object Model)** — это программный интерфейс, который предоставляет доступ к CSS-стилям документа и позволяет динамически изменять их с помощью JavaScript. CSSOM является частью DOM (Document Object Model), но специализируется на работе с CSS. Он позволяет манипулировать стилями, добавлять, удалять или изменять правила, а также получать информацию о текущих стилях элементов.

## Основные компоненты CSSOM

1. **`document.styleSheets`**:
   - Это коллекция всех таблиц стилей (CSSStyleSheet), подключенных к документу.
   - Каждая таблица стилей представлена объектом `CSSStyleSheet`.
   - Пример:
     ```javascript
     const stylesheets = document.styleSheets;
     console.log(stylesheets); // Выведет список всех таблиц стилей
     ```

2. **`CSSStyleSheet`**:
   - Представляет отдельную таблицу стилей.
   - Содержит список правил (CSSRuleList), которые можно изменять.
   - Основные свойства и методы:
     - **`cssRules`**: Список всех CSS-правил в таблице стилей.
     - **`insertRule(rule, index)`**: Добавляет новое правило в таблицу стилей.
     - **`deleteRule(index)`**: Удаляет правило по указанному индексу.
   - Пример:
     ```javascript
     const stylesheet = document.styleSheets[0];
     console.log(stylesheet.cssRules); // Выведет список всех правил в первой таблице стилей
     ```

3. **`CSSRule`**:
   - Представляет отдельное CSS-правило.
   - Существуют различные типы правил, например:
     - **`CSSStyleRule`**: Обычное правило, например, `div { color: red; }`.
     - **`CSSMediaRule`**: Правило для медиа-запросов, например, `@media (max-width: 600px) { ... }`.
     - **`CSSKeyframesRule`**: Правило для анимаций, например, `@keyframes slide { ... }`.
   - Основные свойства:
     - **`cssText`**: Текстовое представление правила.
     - **`style`**: Объект, представляющий стили внутри правила (аналогично `element.style`).
   - Пример:
     ```javascript
     const rule = document.styleSheets[0].cssRules[0];
     console.log(rule.cssText); // Выведет текст правила, например, "div { color: red; }"
     ```

4. **`CSSStyleDeclaration`**:
   - Представляет набор стилей, связанных с элементом или правилом.
   - Используется в:
     - `element.style` (инлайн-стили элемента).
     - `CSSRule.style` (стили внутри CSS-правила).
   - Основные методы:
     - **`getPropertyValue(property)`**: Возвращает значение указанного свойства.
     - **`setProperty(property, value, priority)`**: Устанавливает значение свойства.
     - **`removeProperty(property)`**: Удаляет свойство.
   - Пример:
     ```javascript
     const element = document.querySelector('div');
     element.style.setProperty('color', 'blue', 'important');
     console.log(element.style.getPropertyValue('color')); // Выведет "blue"
     ```

## Примеры использования CSSOM

### 1. Добавление нового CSS-правила
```javascript
const stylesheet = document.styleSheets[0];
stylesheet.insertRule('body { background-color: lightblue; }', 0);
```

### 2. Удаление CSS-правила
```javascript
const stylesheet = document.styleSheets[0];
stylesheet.deleteRule(0); // Удаляет первое правило
```

### 3. Изменение существующего правила
```javascript
const rule = document.styleSheets[0].cssRules[0];
rule.style.backgroundColor = 'yellow';
```

### 4. Получение всех стилей элемента
```javascript
const element = document.querySelector('div');
const computedStyles = window.getComputedStyle(element);
console.log(computedStyles.color); // Выведет вычисленное значение цвета
```

### 5. Динамическое создание таблицы стилей
```javascript
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const stylesheet = styleElement.sheet;
stylesheet.insertRule('p { font-size: 20px; }', 0);
```

## Важные особенности CSSOM

1. **Безопасность**:
   - Изменение CSSOM через JavaScript может быть ограничено политикой CORS (Cross-Origin Resource Sharing). Например, если таблица стилей загружена с другого домена, доступ к её правилам может быть запрещён.

2. **Производительность**:
   - Частые изменения CSSOM могут привести к повторным вычислениям стилей и перерисовке страницы, что негативно сказывается на производительности. Рекомендуется минимизировать количество изменений.

3. **Специфичность**:
   - Изменения, внесённые через CSSOM, имеют ту же специфичность, что и обычные CSS-правила. Однако инлайн-стили (через `element.style`) имеют более высокий приоритет.

4. **Поддержка медиа-запросов**:
   - CSSOM позволяет работать с медиа-запросами через объект `CSSMediaRule`. Например:
     ```javascript
     const mediaRule = document.styleSheets[0].cssRules[0];
     if (mediaRule.media.mediaText === '(max-width: 600px)') {
       console.log('Это правило для узких экранов');
     }
     ```

## Разница между CSSOM и `element.style`

- **CSSOM**:
  - Работает с таблицами стилей и правилами.
  - Позволяет изменять глобальные стили документа.
  - Пример: `document.styleSheets[0].cssRules[0].style.color = 'red'`.

- **`element.style`**:
  - Работает с инлайн-стилями конкретного элемента.
  - Имеет более высокий приоритет, чем CSSOM.
  - Пример: `element.style.color = 'blue'`.
