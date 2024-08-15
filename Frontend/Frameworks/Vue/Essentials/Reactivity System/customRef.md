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

Создание debounce ref-объекта, который обновляет значение только по истечении определенного времени после последнего вызова set:

```ts
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
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
import { useDebouncedRef } from './debouncedRef'
const text = useDebouncedRef('hello')
</script>

<template>
  <input v-model="text" />
</template>
```

##  Пример с одним реактивным полем

Для того чтобы сделать только поле `field2` реактивным в объекте `someData`, можно использовать `customRef` из Vue. Это позволит вам контролировать, какие части объекта будут отслеживаться и обновляться.

```ts
import { customRef, reactive } from 'vue';

// Функция для создания реактивного поля
function useReactiveField<T>(initialValue: T) {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return initialValue;
      },
      set(newValue: T) {
        initialValue = newValue;
        trigger();
      }
    };
  });
}

// Функция для создания объекта с одним реактивным полем
function useReactiveObject<T extends object>(obj: T, reactiveField: keyof T) {
  const reactiveObj = reactive(obj);
  const reactiveFieldValue = useReactiveField(reactiveObj[reactiveField]);

  Object.defineProperty(reactiveObj, reactiveField, {
    get() {
      return reactiveFieldValue.value;
    },
    set(newValue) {
      reactiveFieldValue.value = newValue;
    }
  });

  return reactiveObj;
}

// Использование в компоненте
const someData = useReactiveObject({
  field1: 123,
  field2: 123, // Реактивное поле
  field3: {
    subField1: 123,
    subField2: 123,
  },
}, 'field2');

// Пример использования в компоненте
<script setup>
import { useReactiveObject } from './useReactiveObject';

const someData = useReactiveObject({
  field1: 123,
  field2: 123, // Реактивное поле
  field3: {
    subField1: 123,
    subField2: 123,
  },
}, 'field2');
</script>

<template>
  <div>
    <p>Field1: {{ someData.field1 }}</p>
    <p>Field2: {{ someData.field2 }}</p>
    <p>Field3 SubField1: {{ someData.field3.subField1 }}</p>
    <p>Field3 SubField2: {{ someData.field3.subField2 }}</p>
    <input v-model="someData.field2" />
  </div>
</template>
```
В этом примере:

- `useReactiveField` — это функция, которая создает реактивное поле с использованием `customRef`.
- `useReactiveObject` — это функция, которая принимает объект и ключ поля, которое должно быть реактивным. Она оборачивает объект в `reactive` и переопределяет указанное поле с помощью `customRef`.
- `someData` — это объект, где только `field2` является реактивным благодаря `useReactiveObject`.
- В шаблоне компонента вы можете использовать `someData` как обычно, и только изменения в `field2` будут вызывать обновления.