## Классическая реализация

```ts
<script>
export default {
  data() {
    return {
      message: 'Hello, Vue!'
    };
  },
  methods: {
    changeMessage() {
      this.message = 'Hello, World!';
    }
  }
};
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="changeMessage">Change Message</button>
  </div>
</template>
```

## Через множество `defineComponent`

```ts
<script lang="ts">
import { defineComponent } from 'vue';

const Button1 = defineComponent({
  name: 'Button1',
  template: `<button>Button 1</button>`
});

const Button2 = defineComponent({
  name: 'Button2',
  template: `<button>Button 2</button>`
});

export default {
  components: {
    Button1,
    Button2
  }
};
</script>

<template>
  <div>
    <Button1 />
    <Button2 />
  </div>
</template>
```

## Через `defineComponent` и `components`

```ts
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    Button1: defineComponent({
      name: 'Button1',
      template: `<button @click="handleClick">Button 1</button>`,
      methods: {
        handleClick() {
          alert('Button 1 clicked');
        }
      }
    }),
    Button2: defineComponent({
      name: 'Button2',
      template: `<button @click="handleClick">Button 2</button>`,
      methods: {
        handleClick() {
          alert('Button 2 clicked');
        }
      }
    })
  }
});
</script>

<template>
  <div>
    <Button1 />
    <Button2 />
  </div>
</template>
```
