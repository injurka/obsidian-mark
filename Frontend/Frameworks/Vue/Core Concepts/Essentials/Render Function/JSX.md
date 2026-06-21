# JSX во Vue

**JSX (JavaScript XML)** — это синтаксическое расширение для JavaScript, популяризованное React, которое позволяет писать HTML-подобный код внутри JS. Vue полностью поддерживает JSX через babel-плагин (или встроенную поддержку в Vite). 

JSX компилируется в вызовы Render-функции `h()`.

## Зачем использовать JSX во Vue?
1. **Динамичность:** Когда логика рендеринга очень сложна (множество `v-if`, `v-for`, динамические теги), JSX может быть выразительнее шаблонов.
2. **Типизация (TSX):** Отличная поддержка TypeScript. Полный контроль над типизацией свойств и событий на уровне JS.
3. **Функциональные компоненты:** Удобно для создания чистых компонентов без состояния.

## Синтаксис

В отличие от шаблонов Vue (`.vue`), в JSX нет директив вроде `v-if` или `v-for`. Используется нативный JavaScript:

```tsx
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const items = ['Яблоко', 'Банан']

    return () => (
      <div class="container">
        {/* v-model заменяется на чтение значения и обработчик onUpdate */}
        <button onClick={() => count.value++}>
          Счетчик: {count.value}
        </button>

        {/* v-if / v-else */}
        {count.value > 5 ? <p>Много!</p> : <p>Мало</p>}

        {/* v-for */}
        <ul>
          {items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }
})
```

## Особенности:
- **v-model** поддерживается через babel-плагин (можно писать `<input v-model={text.value} />`).
- **Слоты** передаются как объекты: `<MyComp>{ { default: () => <div>Slot</div> } }</MyComp>`.
- Стили и классы работают так же, как в `h()`, но можно передавать массивы или объекты напрямую: `<div class={['a', { b: true }]}>`.