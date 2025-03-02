## `<style scoped>`

Если использовать секцию `<style>` с атрибутом `scoped`, то CSS в ней будет применяться только к элементам текущего компонента. Это похоже на инкапсуляцию стилей в Shadow DOM. Есть некоторые оговорки, но зато не требуется никаких полифилов. Это достигается путём использования PostCSS для преобразования следующего:

```jsx
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">привет</div>
</template>
```

В следующее:
```jsx
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>привет</div>
</template>
```

### Корневые элементы дочернего компонента

При использовании `scoped`, стили родительского компонента не будут проникать в дочерние компоненты. Однако, корневой элемент дочернего компонента будет подвержен влиянию как родительского scoped CSS, так и дочернего scoped CSS. Это сделано специально, чтобы родитель мог стилизовать корневой элемент дочернего компонента в целях вёрстки

### Глубокие селекторы

Если требуется селектор в `scoped` стилях, который должен быть «глубоким», т.е. влиял на дочерние компоненты, то можно воспользоваться псевдо-классом `:deep()`:

```css
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

Указанное выше будет скомпилировано в:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

> [!INFO] Совет
Scoped стили не влияют на содержимое DOM, созданное с помощью `v-html`, но его всё равно можно стилизовать с помощью глубоких селекторов.

### Глобальные селекторы

Если требуется, чтобы одно правило применялось глобально, то можно использовать псевдо-класс `:global`, а не создавать отдельную секцию `<style>` (см. ниже):

```css
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Сочетание локальных и глобальных стилей

В одном компоненте можно вместе использовать как scoped, так и обычные секции style:

```jsx
<style>
/* глобальные стили */
</style>

<style scoped>
/* локальные стили */
</style>
```

### Советы по использованию scoped-стилей

- **Scoped стили не устраняют необходимость в классах**. Ввиду того, как браузеры отрисовывают различные CSS-селекторы, `p { color: red }` будет работать гораздо медленнее при использовании scoped (т.е. в сочетании с селектором атрибутов). Но если использовать классы или идентификаторы, например `.example { color: red }`, в таком случае практически исключаете этот провал в производительности.
    
- **Будьте осторожны с селекторами потомков в рекурсивных компонентах!** Для правила CSS с селектором `.a .b`, если элемент, соответствующий `.a`, содержит рекурсивный дочерний компонент, то все `.b` в этом дочернем компоненте будут соответствовать правилу

## `<style module>`

Секция `<style module>` компилируется как [CSS модуль](https://github.com/css-modules/css-modules)

[(css-modules)](https://github.com/css-modules/css-modules) и объявляет результирующие CSS-классы компоненту объектом под ключом `$style`:

```jsx
<template>
  <p :class="$style.red">
    Это должно быть красным
  </p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Полученные классы хэшируются во избежание коллизий, что позволяет добиться того же эффекта, что и при выборе scoped CSS только для текущего компонента.

Обращайтесь к [спецификации CSS-модулей](https://github.com/css-modules/css-modules) [](https://github.com/css-modules/css-modules)[(opens new window)](https://github.com/css-modules/css-modules) для получения более подробной информации, как например о [глобальных исключениях](https://github.com/css-modules/css-modules#exceptions) [](https://github.com/css-modules/css-modules#exceptions)[(opens new window)](https://github.com/css-modules/css-modules#exceptions) и [композиции](https://github.com/css-modules/css-modules#composition)[](https://github.com/css-modules/css-modules#composition)

### Внедрение пользовательского имени

Можно настроить ключ свойства объекта с внедряемыми классами, указав значение атрибуту `module`:

```jsx
<template>
  <p :class="classes.red">красный</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Использование с Composition API

Внедряемые классы доступны в `setup()` и `<script setup>` через API [`useCssModule`](https://v3.ru.vuejs.org/ru/api/global-api.html#usecssmodule). Для секций `<style module>` с пользовательским внедряемым именем, `useCssModule` принимает в качестве первого аргумента соответствующее значение атрибута `module`:

```jsx
// по умолчанию, возвращает классы для <style module>
useCssModule()

// при указании имени, возвращает классы для <style module="classes">
useCssModule('classes')
```

## Динамический CSS с учётом состояния

Однофайловые компоненты в секциях `<style>` поддерживают привязку значений CSS к динамическому состоянию компонента через CSS-функцию `v-bind`:

```jsx
<template>
  <div class="text">привет</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

Синтаксис работает с [`<script setup>`](https://v3.ru.vuejs.org/ru/api/sfc-script-setup.html) и поддерживает выражения JavaScript (должны быть обёрнуты в кавычки):

```jsx
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>привет</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

Фактическое значение будет скомпилировано в хэшированное пользовательское CSS-свойство, поэтому CSS останется статичным. Пользовательское свойство будет применено к корневому элементу компонента с помощью инлайн-стилей и будет реактивно обновляться при изменении исходного значения.

## Источники
- #### [vuejs](https://vuejs.org/api/sfc-css-features.html)
