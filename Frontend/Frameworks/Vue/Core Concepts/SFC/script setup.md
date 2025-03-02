`<script setup>` — синтаксический сахар, обрабатываемый на этапе компиляции, для использования [Composition API](https://v3.ru.vuejs.org/ru/api/composition-api.html) в однофайловых компонентах (SFC). Это рекомендуемый синтаксис при использовании однофайловых компонентов и Composition API. Он предлагает ряд преимуществ по сравнению с обычным синтаксисом `<script>`:

- Более лаконичный код с меньшим количеством boilerplate-кода
- Возможность объявлять входные параметры и генерируемые события с использованием чистого TypeScript
- Лучшая производительность во время выполнения (шаблон компилируется в render-функцию в той же области видимости, без промежуточной прокси)
- Лучшая производительность IDE при определении типов (меньше работы для языкового сервера по извлечению типов из кода)

## Базовый синтаксис

Чтобы использовать синтаксис, добавьте атрибут `setup` в секцию `<script>`:

```tsx
<script setup>
console.log('привет синтаксис script setup')
</script>
```

Код внутри компилируется как содержимое функции компонента `setup()`. Это означает, что в отличие от обычного `<script>`, который выполняется только один раз при первом импорте компонента, код внутри `<script setup>` будет **выполняться каждый раз при создании экземпляра компонента**.

## Привязки верхнего уровня будут доступны в шаблоне

При использовании `<script setup>`же «проводу», то отправит ARP-ответ.
же «проводу», то отправит ARP-ответ.
 любые привязки верхнего уровня (в т.ч. переменные, объявления функций и импорты) объявленные внутри `<script setup>` будут доступны напрямую в шаблоне:

```tsx
<script setup>
// переменная
const msg = 'Hello!'

// функция
function log() {
  console.log(msg)
}
</script>

<template>
  <div @click="log">{{ msg }}</div>
</template>
```

Импорты объявляются таким же образом. Это означает, что можно напрямую использовать импортированную вспомогательную функцию в выражениях шаблона, без необходимости объявлять её через опцию `methods`:

```tsx
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## Реактивность

Реактивное состояние нужно явно создавать с помощью [API реактивности](https://v3.ru.vuejs.org/ru/api/basic-reactivity.html). Аналогично значениям, возвращаемым из функции `setup()`, ref-ссылки автоматически разворачиваются, когда на них ссылаются в шаблонах:

```tsx
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## Использование компонентов

Значения в области видимости `<script setup>` также могут быть использованы непосредственно в качестве имён тегов пользовательских компонентов:

```tsx
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

Считайте, что на `MyComponent` ссылаются как на переменную. Если использовали JSX, то ментальная модель тут аналогична. Эквивалент в kebab-case `<my-component>` работает и в шаблоне — но настоятельно рекомендуем писать теги в PascalCase для консистентности. Это также помогает отличить их от нативных пользовательских элементов.

## Динамические компоненты

Поскольку на компоненты ссылаются как на переменные, а не регистрируют их под строковыми ключами, то внутри `<script setup>` при использовании динамических компонентов потребуется использовать динамическую привязку с помощью `:is`:

```tsx
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

Обратите внимание, как компоненты могут использоваться в качестве переменных в тернарном выражении.

## Рекурсивные компоненты

Однофайловые компоненты могут неявно ссылаться сами на себя с помощью имени файла. Например, файл с именем `FooBar.vue` может ссылаться на себя как `<FooBar/>` в своём шаблоне.

Обратите внимание, что это имеет более низкий приоритет, чем у импортированных компонентов. Если есть именованный импорт, который конфликтует с предполагаемым именем компонента от имени файла, то можно задать псевдоним для импортируемого:

```tsx
import { FooBar as FooBarChild } from './components'
```

## Компоненты с пространством имён

Можно использовать теги компонентов с точками, например `<Foo.Bar>`, чтобы ссылаться на компоненты, вложенные в свойства объекта. Это полезно при импорте нескольких компонентов из одного файла:

```tsx
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## Использование пользовательских директив

Пользовательские директивы зарегистрированные глобально работают как обычно, а зарегистрированные локально можно использовать напрямую в шаблоне, как объяснялось выше для компонентов.

Но есть одно ограничение, о котором следует знать: необходимо именовать локальные пользовательские директивы в соответствии со следующей схемой: `vNameOfDirective`, чтобы их можно было использовать напрямую в шаблоне.

```tsx
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // сделать что-нибудь с элементом
  }
}
</script>

<template>
  <h1 v-my-directive>Какой-то заголовок</h1>
</template>
```

```tsx
<script setup>
  // импорт также работает, его можно переименовать для соответствия схеме именования
  import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```
