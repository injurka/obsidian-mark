---
title: Lit
tags:
  - lit
  - web-components
  - frontend
---

## Что такое Lit и зачем он нужен

**Lit** — минималистичная библиотека от Google (~5 КБ gzip) для создания **Web Components**. Она не является фреймворком в классическом смысле: Lit не абстрагирует браузерный API, а надстраивается над стандартами платформы — Custom Elements, Shadow DOM и HTML Templates.

### Нативные Web Components и их проблемы

Браузер позволяет создавать кастомные элементы без каких-либо зависимостей:

```javascript
class MyCounter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>Count: 0</button>`;
  }
}
customElements.define('my-counter', MyCounter);
```

Однако нативный API имеет существенные недостатки:
- **Шаблонизация** — вручную через `innerHTML` или DOM-манипуляции, нет реактивности
- **Реактивность** — нет встроенного механизма: нужно вручную вызывать `render()` при изменении данных
- **Атрибуты** — нужно реализовывать `observedAttributes` + `attributeChangedCallback` для каждого свойства
- **Стили** — `adoptedStyleSheets` или `<style>` внутри shadow root без sharing

### Что решает Lit

| Проблема | Нативный API | Lit |
|---|---|---|
| Шаблоны | `innerHTML` / DOM API | `html\`...\`` — tagged templates с диффингом |
| Реактивность | вручную | `@property()` / `@state()` — автоматический ре-рендер |
| Стили | повторяющийся код | `css\`...\`` — sharing через `CSSStyleSheet` |
| TypeScript | нет поддержки | декораторы, типизация из коробки |

Lit-компонент остаётся настоящим Custom Element — его можно использовать в любом фреймворке или без него.

---

## Установка и быстрый старт

### Установка через npm

```bash
npm install lit
```

### Минимальный компонент

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-greeting')
class MyGreeting extends LitElement {
  @property() name = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

```html
<!-- Использование в HTML -->
<my-greeting name="Lit"></my-greeting>
```

### Без декораторов (чистый JS)

```javascript
import { LitElement, html } from 'lit';

class MyGreeting extends LitElement {
  static properties = { name: { type: String } };

  constructor() {
    super();
    this.name = 'World';
  }

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
customElements.define('my-greeting', MyGreeting);
```

---

## LitElement и @customElement

`LitElement` — базовый класс, от которого наследуются все Lit-компоненты. Он расширяет `HTMLElement`, добавляя:
- Систему реактивных свойств
- Планировщик обновлений (батчинг через микрозадачи)
- Жизненный цикл обновления
- Управление стилями через Shadow DOM

### Декоратор `@customElement`

`@customElement('tag-name')` — сокращение для вызова `customElements.define()`. Имя тега **обязательно** содержит дефис (требование спецификации Custom Elements).

```typescript
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('user-card')
class UserCard extends LitElement {
  render() {
    return html`<div class="card">User Card</div>`;
  }
}

// Эквивалентно:
// customElements.define('user-card', UserCard);
```

---

## Шаблоны: html`...` и директивы

Lit использует **tagged template literals** для описания шаблонов. При первом рендере создаётся DOM-структура; при последующих обновлениях Lit обновляет **только изменившиеся части** — без Virtual DOM, напрямую.

### Базовый синтаксис

```typescript
render() {
  return html`
    <!-- Текстовый контент -->
    <p>${this.message}</p>

    <!-- Атрибуты -->
    <input type="text" .value=${this.value} />

    <!-- Свойства DOM (dot-нотация) -->
    <input .checked=${this.isChecked} />

    <!-- Булевы атрибуты (? prefix) -->
    <button ?disabled=${this.loading}>Submit</button>

    <!-- Обработчики событий (@ prefix) -->
    <button @click=${this.handleClick}>Click me</button>

    <!-- Условный рендеринг -->
    ${this.isVisible ? html`<span>Visible</span>` : ''}

    <!-- Списки -->
    <ul>
      ${this.items.map(item => html`<li>${item.name}</li>`)}
    </ul>
  `;
}
```

### Директивы

Директивы — специальные функции, расширяющие возможности шаблонов:

```typescript
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ref } from 'lit/directives/ref.js';

render() {
  return html`
    <!-- repeat: оптимизированный рендер списков с ключами -->
    <ul>
      ${repeat(
        this.items,
        item => item.id,
        item => html`<li>${item.name}</li>`
      )}
    </ul>

    <!-- classMap: условные классы -->
    <div class=${classMap({ active: this.isActive, disabled: this.isDisabled })}>
      Content
    </div>

    <!-- styleMap: инлайн-стили -->
    <p style=${styleMap({ color: this.color, fontSize: '14px' })}>Text</p>

    <!-- ifDefined: атрибут устанавливается только если значение определено -->
    <input placeholder=${ifDefined(this.hint)} />

    <!-- ref: получение ссылки на DOM-элемент -->
    <canvas ${ref(this.canvasRef)}></canvas>
  `;
}
```

### Вложенные шаблоны

```typescript
// Выносите части шаблона в отдельные методы
private renderHeader() {
  return html`<header><h1>${this.title}</h1></header>`;
}

render() {
  return html`
    ${this.renderHeader()}
    <main>${this.content}</main>
  `;
}
```

---

## Реактивные свойства: @property() и @state()

### `@property()` — внешние свойства

Декоратор `@property()` объявляет **публичное реактивное свойство**. Изменение свойства снаружи (`element.name = 'new'`) или атрибута (`<my-el name="new">`) автоматически запускает обновление.

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('user-profile')
class UserProfile extends LitElement {
  // Простое свойство
  @property() name = 'Anonymous';

  // С явными опциями
  @property({ type: Number }) age = 0;

  // Атрибут и свойство с разными именами
  @property({ attribute: 'max-count', type: Number }) maxCount = 10;

  // Без отражения в атрибут
  @property({ reflect: false }) internalData = null;

  // Кастомный конвертер
  @property({
    converter: {
      fromAttribute: (val) => val?.split(',') ?? [],
      toAttribute: (val) => val?.join(',') ?? ''
    }
  })
  tags: string[] = [];

  render() {
    return html`<p>${this.name}, ${this.age} лет</p>`;
  }
}
```

**Опции `@property()`:**

| Опция | Тип | По умолчанию | Описание |
|---|---|---|---|
| `type` | `String \| Number \| Boolean \| Array \| Object` | `String` | Тип для конвертации атрибута |
| `attribute` | `string \| false` | имя свойства в kebab-case | Имя HTML-атрибута |
| `reflect` | `boolean` | `false` | Отражать ли значение обратно в атрибут |
| `converter` | `object` | встроенный | Кастомная конвертация атрибут ↔ свойство |
| `hasChanged` | `function` | строгое `!==` | Кастомная проверка изменения |

### `@state()` — внутреннее состояние

`@state()` объявляет **приватное реактивное состояние**. Оно не доступно снаружи как атрибут, не отражается в DOM.

```typescript
import { LitElement, html } from 'lit';
import { customElement, state, property } from 'lit/decorators.js';

@customElement('toggle-button')
class ToggleButton extends LitElement {
  @property() label = 'Toggle';

  // Внутреннее состояние — не видно снаружи
  @state() private _isOn = false;
  @state() private _clickCount = 0;

  private _toggle() {
    this._isOn = !this._isOn;
    this._clickCount++;
  }

  render() {
    return html`
      <button @click=${this._toggle} class=${this._isOn ? 'on' : 'off'}>
        ${this.label}: ${this._isOn ? 'ON' : 'OFF'}
      </button>
      <small>Нажатий: ${this._clickCount}</small>
    `;
  }
}
```

### Прямое обновление без декораторов

Для объектов и массивов необходимо сообщить Lit об изменении явно:

```typescript
// Неправильно — Lit не заметит мутацию
this.items.push(newItem);

// Правильно — создаём новый массив
this.items = [...this.items, newItem];

// Или явный запрос обновления
this.items.push(newItem);
this.requestUpdate('items');
```

---

## Жизненный цикл

Lit расширяет жизненный цикл Custom Elements собственными хуками обновления:

```
connectedCallback()
  ↓
[изменение свойства] → scheduleUpdate() → performUpdate()
  ↓                                           ↓
disconnectedCallback()                    shouldUpdate()
                                              ↓
                                          update() → render()
                                              ↓
                                          firstUpdated() (только первый раз)
                                              ↓
                                          updated()
```

### `connectedCallback` / `disconnectedCallback`

Стандартные хуки Custom Elements — вызываются при добавлении/удалении элемента из DOM:

```typescript
@customElement('data-fetcher')
class DataFetcher extends LitElement {
  @state() private _data: string[] = [];
  private _intervalId?: number;

  connectedCallback() {
    super.connectedCallback(); // обязательно вызывать super!
    this._intervalId = window.setInterval(() => this._fetchData(), 5000);
    this._fetchData();
  }

  disconnectedCallback() {
    super.disconnectedCallback(); // обязательно вызывать super!
    clearInterval(this._intervalId);
  }

  private async _fetchData() {
    const res = await fetch('/api/data');
    this._data = await res.json();
  }

  render() {
    return html`<ul>${this._data.map(d => html`<li>${d}</li>`)}</ul>`;
  }
}
```

### `firstUpdated`

Вызывается **один раз** после первого рендера. Используется для работы с DOM-элементами (фокус, измерения, интеграция с внешними библиотеками):

```typescript
import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('auto-focus-input')
class AutoFocusInput extends LitElement {
  @query('input') private _input!: HTMLInputElement;

  firstUpdated() {
    // DOM уже доступен
    this._input.focus();
  }

  render() {
    return html`<input type="text" placeholder="Автофокус..." />`;
  }
}
```

### `updated`

Вызывается **после каждого обновления**. Получает `Map` с изменёнными свойствами:

```typescript
updated(changedProperties: Map<string, unknown>) {
  if (changedProperties.has('userId')) {
    this._loadUserData(this.userId);
  }

  if (changedProperties.has('theme')) {
    document.body.setAttribute('data-theme', this.theme);
  }
}
```

### `willUpdate` и `shouldUpdate`

```typescript
// willUpdate — вычисление производных значений до рендера
willUpdate(changedProperties: Map<string, unknown>) {
  if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
    this._fullName = `${this.firstName} ${this.lastName}`;
  }
}

// shouldUpdate — отмена ре-рендера при определённых условиях
shouldUpdate(changedProperties: Map<string, unknown>): boolean {
  return this._isReady;
}
```

---

## Стили: css`...` и Shadow DOM

### Инкапсуляция через Shadow DOM

Каждый Lit-компонент по умолчанию использует **Shadow DOM**: его стили не вытекают наружу, внешние стили не проникают внутрь.

```typescript
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('styled-card')
class StyledCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    :host([variant='outlined']) {
      box-shadow: none;
      border: 1px solid #e0e0e0;
    }

    :host(:hover) {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    .card-body {
      padding: 16px;
    }

    h2 {
      margin: 0 0 8px;
      font-size: 1.25rem;
    }
  `;

  render() {
    return html`
      <div class="card-body">
        <h2><slot name="title"></slot></h2>
        <slot></slot>
      </div>
    `;
  }
}
```

### Переиспользование и массив стилей

```typescript
// shared-styles.ts — общие стили для нескольких компонентов
import { css } from 'lit';

export const buttonStyles = css`
  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;
```

```typescript
import { buttonStyles } from './shared-styles.js';

@customElement('my-button')
class MyButton extends LitElement {
  // Массив стилей — объединяются в правильном порядке
  static styles = [
    buttonStyles,
    css`
      :host { display: inline-block; }
      button { background: var(--primary-color, #6200ea); color: white; }
    `
  ];

  render() {
    return html`<button><slot></slot></button>`;
  }
}
```

### CSS Custom Properties — точки настройки

Внешние стили не проникают в Shadow DOM, но **CSS custom properties** проникают. Это основной способ кастомизации компонентов:

```css
/* Внешний CSS */
my-card {
  --card-bg: #f5f5f5;
  --card-radius: 12px;
  --card-padding: 24px;
}
```

```typescript
static styles = css`
  :host {
    background: var(--card-bg, white);
    border-radius: var(--card-radius, 8px);
    padding: var(--card-padding, 16px);
  }
`;
```

### `::slotted` и `::part`

```typescript
static styles = css`
  /* Стилизация содержимого в slot */
  ::slotted(p) {
    color: #555;
    line-height: 1.6;
  }
`;

render() {
  return html`
    <!-- part позволяет внешнему CSS стилизовать элемент -->
    <h2 part="title">Title</h2>
    <slot></slot>
  `;
}
```

```css
/* Внешний CSS может стилизовать часть через ::part() */
my-card::part(title) {
  color: #6200ea;
  text-transform: uppercase;
}
```

---

## События

### Dispatching событий

```typescript
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('count-button')
class CountButton extends LitElement {
  @property({ type: Number }) count = 0;

  private _increment() {
    this.count++;

    this.dispatchEvent(new CustomEvent('count-changed', {
      detail: { count: this.count },
      bubbles: true,   // всплывает вверх по DOM
      composed: true,  // пересекает границу Shadow DOM
    }));
  }

  render() {
    return html`
      <button @click=${this._increment}>
        Нажато: ${this.count}
      </button>
    `;
  }
}
```

`composed: true` необходим, чтобы событие вышло из Shadow DOM. Без этого флага событие остановится на `shadow root` и не достигнет родительского дерева.

### Слушатели событий

```typescript
// В шаблоне — через @ синтаксис
render() {
  return html`
    <button @click=${this._onClick}>OK</button>
    <input @input=${this._onInput} />
  `;
}

// На внешний элемент — через connectedCallback/disconnectedCallback
connectedCallback() {
  super.connectedCallback();
  this._onResize = this._onResize.bind(this);
  window.addEventListener('resize', this._onResize);
}

disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('resize', this._onResize);
}
```

### Декоратор `@eventOptions`

```typescript
import { eventOptions } from 'lit/decorators.js';

// Пассивный слушатель для оптимизации прокрутки
@eventOptions({ passive: true })
private _onScroll(event: Event) {
  this._scrollY = (event.target as Element).scrollTop;
}

render() {
  return html`
    <div @scroll=${this._onScroll} style="overflow:auto;height:200px">
      <slot></slot>
    </div>
  `;
}
```

---

## Lit vs React / Vue

Ключевое различие: React и Vue — **JavaScript-фреймворки** с собственной компонентной моделью, Lit создаёт **нативные Custom Elements**, встроенные в браузер.

### Архитектурные различия

| Критерий | React / Vue | Lit |
|---|---|---|
| **Компонентная модель** | Своя (React.Component / defineComponent) | Нативная (Custom Elements v1) |
| **Рендеринг** | Virtual DOM + reconciliation | Lit-HTML — точечные DOM-обновления |
| **Стили** | CSS Modules / styled-components / scoped | Shadow DOM — нативная инкапсуляция |
| **Интероперабельность** | Сложно использовать вне экосистемы | Работает в любом фреймворке и без него |
| **Размер runtime** | React ~40 КБ, Vue ~30 КБ | Lit ~5 КБ |
| **State Management** | Redux / Pinia / Vuex / Context | Нет встроенного (внешние: MobX, Redux) |
| **SSR** | Полная поддержка | Declarative Shadow DOM (частично) |

### Когда выбирать Lit

- **Design System / UI-библиотека** — компоненты нужны во множестве проектов на разных стеках
- **Micro-frontends** — независимые команды используют разные фреймворки
- **Встраивание в CMS / legacy-проекты** — нет возможности подключить фреймворк
- **Виджеты на статическом сайте** — небольшая интерактивность без тяжёлого runtime

### Когда выбирать React / Vue

- **Сложные SPA** — роутинг, SSR, глобальный стейт, зрелая экосистема
- **Большая команда** — React/Vue имеют обширную документацию и тулинг
- **Серверный рендеринг** — Next.js / Nuxt с полноценной гидрацией

### Один компонент — три реализации

```typescript
// Lit — Custom Element, работает везде
@customElement('hello-world')
class HelloWorld extends LitElement {
  @property() name = 'World';
  render() { return html`<h1>Hello, ${this.name}!</h1>`; }
}
```

```jsx
// React — только в React-дереве
function HelloWorld({ name = 'World' }) {
  return <h1>Hello, {name}!</h1>;
}
```

```vue
<!-- Vue — только в Vue-дереве -->
<template>
  <h1>Hello, {{ name }}!</h1>
</template>
<script setup>
const props = defineProps({ name: { default: 'World' } });
</script>
```

Lit-компонент можно использовать как `<hello-world name="Lit">` в любом из вышеперечисленных фреймворков без какой-либо адаптации.

---

## Источники
- #### [pwadev](https://pwadev.ru/lit/)
