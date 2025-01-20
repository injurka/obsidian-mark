Создаёт пользовательский ref-объект с возможностью явно контролировать отслеживание зависимостей и управлять вызовом обновлений.

## Тип

```ts
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```

## Подробности

`customRef()` ожидает функцию-фабрику, которая получает в качестве аргументов функции `track` и `trigger` и должна возвращать объект с методами `get` и `set`.

В общем случае `track()` следует вызывать внутри `get()`, а `trigger()` - внутри `set()`. Однако вы имеете полный контроль над тем, когда их следует вызывать и следует ли вызывать вообще.

##  Базовый пример

Создание `debounce` ref-объекта, который обновляет значение только по истечении определенного времени после последнего вызова set:

```ts
import { customRef } from 'vue'

export function useDebouncedRef<T>(initialValue: T, delay: number = 200) {
  let timeout: ReturnType<typeof setTimeout>

  return customRef<T>((track, trigger) => {
    let innerValue: T = initialValue;
    
    return {
      get() {
        track()
        return innerValue
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          innerValue = newValue
          trigger()
        }, delay)
      }
    }
  })
}
```

### Использование в компоненте:

```ts
<script setup>
import { useDebouncedRef } from './debounced-ref'
const debouncedValue = useDebouncedRef<string>('initial value', 300)

</script>

<template>
  <input v-model="debouncedValue" />
</template>
```