# defineComponent

`defineComponent` — это утилита во Vue 3, которая служит оберткой при определении компонента. Она не выполняет сложной логики во время выполнения (возвращает переданный ей объект), но имеет **критическое значение для вывода типов (Type Inference)** в TypeScript и при использовании IDE (Volur).

## Зачем использовать?

1. **Типизация:** При использовании Options API или Setup-функции без `<script setup>`, `defineComponent` позволяет TypeScript правильно вывести типы для `props`, `emits`, `computed`, `methods` и т.д.
2. **IDE Поддержка:** Обеспечивает автокомплит и подсветку ошибок в редакторе (например, в VS Code с расширением Vue/Volar).

## Примеры

### С Options API:
```typescript
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: String
  },
  data() {
    return { count: 0 }
  },
  mounted() {
    console.log(this.msg, this.count) // Типы выведены корректно
  }
})
```

### С функцией Setup (Composition API):
```typescript
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    message: { type: String, required: true }
  },
  setup(props) {
    const count = ref(0)
    console.log(props.message) // message имеет тип string
    return { count }
  }
})
```

*Примечание:* При использовании `<script setup>` вызов `defineComponent` происходит под капотом компилятором Vue, поэтому вручную его писать не нужно.