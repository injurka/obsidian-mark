В Vue 3 функции `track` и `trigger` являются частью внутренней реализации реактивности и обычно не используются напрямую в пользовательском коде. Однако для демонстрации принципа работы `ref` с использованием Proxy в TypeScript, мы можем создать упрощенный пример:

## Пример реализации:

```typescript
type Ref<T> = {
  value: T;
};

function ref<T>(value: T): Ref<T> {
  const wrapper: Ref<T> = {
    value
  };

  return new Proxy(wrapper, {
    get(target, key) {
      if (key === 'value') {
        // Здесь могла бы быть логика отслеживания зависимостей
        // track(target, 'value');
        console.log('Getting value');
      }
      return target[key as keyof Ref<T>];
    },
    set(target, key, newValue) {
      if (key === 'value') {
        // Здесь могла бы быть логика уведомления об изменениях
        // trigger(target, 'value');
        console.log('Setting value');
        target[key as keyof Ref<T>] = newValue;
      }
      return true;
    }
  });
}

// Пример использования
const count = ref(0);
console.log(count.value); // Вывод: Getting value, 0
count.value = 1; // Вывод: Setting value
console.log(count.value); // Вывод: Getting value, 1
```

В этом примере:

1. Мы определяем тип `Ref<T>`, который представляет объект с одним свойством `value`.
2. Функция `ref<T>(value: T): Ref<T>` создает объект `wrapper` с типом `Ref<T>` и возвращает Proxy для этого объекта.
3. В обработчиках `get` и `set` Proxy мы добавляем логику для отслеживания доступа и изменения значения `value`.


---

**shallowRef** можно использовать для оптимизации реактивности вашего приложения *Vue*. Как вы уже догадались, `shallowRef` - это неглубокая версия **ref()**.

```ts
<script setup lang="ts">
import { shallowRef } from 'vue'

const state = shallowRef({
  count: 0,
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
</template>
```

> Нет реакции при изменении
> 
```ts
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const state = shallowRef({
  count: 0,
})

const increment = () => {
  state.value.count = 2 // ⚠️ doesn't trigger change (watcher & UI update)
}

watch(state, (newState) => {
  console.log('new state', newState)
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
  <button @click="increment">Increment count</button>
</template>
```

> [!WARNING] Важно
> При нажатии на кнопку «Увеличить счет» счетчик в пользовательском интерфейсе не обновляется и наблюдатель не запускается.

В отличие от `ref()`, внутреннее значение неглубокой ссылки хранится и раскрывается как есть, и не будет сделано глубоко реактивным. Реактивным является только доступ к `.value`.

Реактивность корректно срабатывает, если мы передаем полностью новое значение в свойство `.value`:

```ts
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const state = shallowRef({
  count: 0,
})

const setNewValue = () => {
  state.value = { count: 2 } // triggers change
}

watch(state, (newState) => {
  console.log('new state', newState)
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
  <button @click="setNewValue">Set new .value</button>
</template>
```

`shallowRef()` обычно используется для оптимизации производительности больших структур данных или интеграции с внешними системами управления состоянием.

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/optimize-performance-using-shallow-ref)
