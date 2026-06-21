# Render Function и функция `h()`

`h()` (сокращение от hyperscript) — это утилита во Vue для программного создания Virtual DOM узлов (VNodes). Шаблоны Vue (`<template>`) под капотом компилируются именно в вызовы функции `h()`.

## Зачем использовать `h()`?
Когда вам нужен полный контроль над созданием DOM средствами JavaScript, и стандартный синтаксис `<template>` не дает нужной гибкости (например, при создании высокодинамичных компонентов-оберток или библиотек компонентов).

## Сигнатура `h()`

```javascript
// h(type, propsOrChildren?, children?)
```
- `type`: Строка (имя HTML тега), компонент Vue, или асинхронный компонент (Обязательно).
- `props`: Объект с атрибутами, пропсами, событиями (`{ id: 'foo', class: 'bar', onClick: () => {} }`) (Опционально).
- `children`: Строка, массив дочерних VNodes, или объект слотов (Опционально).

## Пример использования

```javascript
import { h, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)

    // Возвращаем render-функцию
    return () => h(
      'div', 
      { class: 'counter', id: 'main-counter' }, 
      [
        h('span', `Счет: ${count.value}`),
        h('button', { onClick: () => count.value++ }, '+1')
      ]
    )
  }
})
```

## Особенности (замена директив)
Поскольку вы находитесь в JS, директивы Vue не используются. Вместо них применяется нативный код:
- `v-if`: Обычные операторы `if` или тернарный `? :`.
- `v-for`: Метод `Array.prototype.map()`.
- `v-on`: Ключи свойств, начинающиеся с `on` (`onClick`, `onUpdate:modelValue`).
- **Слоты**: Передаются через свойства компонента или объект `children` (`{ default: () => h('div') }`).