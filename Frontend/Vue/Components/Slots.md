## Passing Slots

В некоторых случаях вы хотите передать дочернему компоненту все слоты из родительского компонента. Это особенно полезно при создании компонента-обертки, который добавляет некоторую функциональность в дочерний компонент.

В этой статье предположим, что у нас есть компонент `Child.vue` с двумя именованными слотами, `top` и `bottom`:

> Child.vue

```ts
<template>
  <div>
    <h2>Child</h2>
    <slot name="top" />
    <slot name="bottom" />
  </div>
</template>
```

`Child.vue` оборачивается компонентом `Parent.vue`, который должен передать все слоты своему дочернему компоненту. Сначала посмотрим, как заполняются именованные слоты в компоненте `App.vue`:

> App.vue

```ts
<template>
  <Parent>
    <template #top>
      <span>Top</span>
    </template>
    <template #bottom>
      <span>Bottom</span>
    </template>
  </Parent>
</template>
```

Наконец, давайте посмотрим, как компонент `Parent.vue` передает все слоты своему дочернему компоненту:

> Parent.vue

```ts
<template>
  <div>
    <h1>Parent</h1>
    <Child>
      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </Child>
  </div>
</template>
```

Мы перебираем объект `$slots` и создаем элемент `slot` для каждого слота. Элемент `slot` имеет атрибут `:name`, который привязан к переменной `slotName`.

## Источники
- #### [ALL HERE](https://vuejs.org/guide/components/slots.html)
- #### [vue tips](https://mokkapps.de/vue-tips/passing-slots-to-child-components)
