
## Хуки жизненного цикла директивы

Для жизненного цикла директивы можно указать следующие хуки (все они опциональны):

- `created`: вызывается до привязки атрибутов или слушателей событий к элементу. Это полезно в тех случаях, когда директиве необходимо привязать слушатели событий, которые должны вызываться перед обычными слушателями событий `v-on`.
    
- `beforeMount`: вызывается при первой привязке директивы к элементу и перед монтированием родительского компонента. В нём можно выполнять какую-то единоразовую инициализацию.
    
- `mounted`: вызывается перед монтированием родительского компонента, к элементу которого привязана директива.
    
- `beforeUpdate`: вызывается перед обновлением VNode содержащего компонента.
    
- `updated`: вызывается после того как обновлены VNode содержащего компонента **и все VNode его дочерних элементов**.
    
- `beforeUnmount`: вызывается перед размонтированием родительского компонента, к элементу которого привязана директива.
    
- `unmounted`: вызывается только один раз, когда директива отвязывается от элемента и родительский компонент размонтирован.

### Пример на коде

```ts
import type { Directive } from 'vue'

const customDirective: Directive = {
  created(el, binding, vnode) {
    // Вызывается до привязки атрибутов или слушателей событий к элементу
  },
  beforeMount(el, binding, vnode) {
    // Вызывается перед монтированием компонента, в котором находится элемент с директивой
  },
  mounted(el, binding, vnode) {
    // Вызывается после монтирования компонента, в котором находится элемент с директивой
  },
  beforeUpdate(el, binding, vnode, prevVnode) {
    // Вызывается перед обновлением VNode родительского компонента
  },
  updated(el, binding, vnode, prevVnode) {
    // Вызывается после обновления VNode родительского компонента и VNodes его дочерних элементов
  },
  beforeUnmount(el, binding, vnode) {
    // Вызывается перед тем, как будет размонтирован родительский компонент
  },
  unmounted(el, binding, vnode) {
    // Вызывается после того, как будет размонтирован родительский компонент
  },
}

export default customDirective
```

---

## Аргументы для хуков жизненного цикла директивы

#### el

Элемент, к которому привязывается директива. Можно использовать для прямого манипулирования DOM.

#### binding

Объект, содержащий следующие свойства:

- `instance`: Экземпляр компонента, где используется директива.
    Обратите внимание, что `instance` будет доступен только в том случае, если директива применяется к компоненту Vue. Если директива применяется к обычному DOM-элементу, `instance` будет `undefined`
<br />
- `value`: Значение, переданное в директиву. Например, для `v-my-directive="1 + 1"` значением будет `2`.
<br />
- `oldValue`: Предыдущее значение доступно только в хуках `beforeUpdate` и `updated`. Свойство доступно независимо от того, изменялось ли значение.
<br />
- `arg`: Аргумент, передаваемый с директивой (если указан). Например, для `v-my-directive:foo` аргументом будет `"foo"`.
<br />
- `modifiers`: Объект, содержащий модификаторы (если указаны). Например, для `v-my-directive.foo.bar` объект будет таким: `{ foo: true, bar: true }`.
<br />
- `dir`: Объект, который передавался в качестве параметра при регистрации директивы. Например, для директивы:

#### vnode

Схема реального DOM-элемента, полученного выше в качестве аргумента `el`.

#### prevNode

Предыдущая виртуальная нода. Доступна только в хуках `beforeUpdate` и `updated`.

### Пример на коде

> hook-arguments.ts
```ts
import type { Directive } from 'vue'

export const hookArguments: Directive = {
  mounted(el, binding, vnode) {
    const s = JSON.stringify

    el.innerHTML
      = `instance: ${s(binding.instance)}<br><br>`
      + `value: ${s(binding.value)}<br><br>`
      + `oldValue: ${s(binding.oldValue)}<br><br>`
      + `argument: ${s(binding.arg)}<br><br>`
      + `modifiers: ${s(binding.modifiers)}<br><br>`
      + `dir: ${s(binding.dir)}<br><br>`
      + `vnode keys: ${Object.keys(vnode).join(', ')}`
  },
}
```

> hook-arguments.vue
```tsx
<template>
  <div v-hook-arguments:foo.a.b="'message'" />
</template>
```

---

## Динамические аргументы директивы

Аргументы директивы могут быть динамическими. Для v-mydirective:[argument]="value" например, argument может обновляться в зависимости от свойства данных экземпляра компонента! Это позволяет сделать пользовательские директивы более гибкими при использовании в приложении.

Допустим, необходимо создать собственную директиву, которая позволит закрепить элемент на странице с помощью фиксированного позиционирования. Можно создать пользовательскую директиву, где значение определяет вертикальный отступ в пикселях:


```ts
<div id="dynamic-arguments-example" class="demo">
  <p>Прокрутите страницу вниз</p>
  <p v-pin="200">Элемент зафиксирован в 200px от начала страницы</p>
</div>
```

```ts
const app = Vue.createApp({})

app.directive('pin', {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = 'fixed'
    // binding.value — передаваемое в директиву значение, в этом случае 200
    el.style.top = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

Это закрепит элемент в 200px от начала страницы. Но что если возникнет случай, когда потребуется закрепить элемент не сверху, а слева? Для этого пригодится динамический аргумент директивы, который можно определить для каждого экземпляра компонента:

```ts
<div id="dynamicexample">
  <h3>Прокрутите страницу вниз</h3>
  <p v-pin:[direction]="200">Зафиксировать в 200px от {{ direction }} страницы</p>
</div>
```

```ts
const app = Vue.createApp({
  data() {
    return {
      direction: 'right'
    }
  }
})

app.directive('pin', {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.position = 'fixed'
    // binding.arg — передаваемый в директиву аргумент
    const s = binding.arg || 'top'
    el.style[s] = binding.value + 'px'
  }
})

app.mount('#dynamic-arguments-example')
```

---

## Сокращённая запись

Как в примере выше, можно получить одинаковую логику в `mounted` и `updated` и не использовать другие хуки. В таких случаях функцию можно сразу передать в директиву:

```ts
app.directive('pin', (el: HTMLElement, binding: DirectiveBinding) => {
  el.style.position = 'fixed'
  const s = binding.arg || 'top'
  el.style[s] = binding.value + 'px'
})
```

---

## Локальное объявление

### defineComponent

```ts
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  directives: {
    focus: {
      // Когда привязанный элемент будет примонтирован в DOM...
      mounted(el) {
        // Переключаем фокус на элемент
        el.focus()
      },
    },
  },
})
</script>

<template>
  <input v-focus value="input">
</template>
```

### Setup

```ts
<script setup lang="ts">
import type { Directive } from 'vue'

const focusDirective: Directive = {
  // Когда привязанный элемент будет примонтирован в DOM...
  mounted(el) {
    // Переключаем фокус на элемент
    el.focus()
  },
}

// Используйте директиву внутри компонента
const vFocus = focusDirective
</script>

<template>
  <input v-focus value="input">
</template>

```