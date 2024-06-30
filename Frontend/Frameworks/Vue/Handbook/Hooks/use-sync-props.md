## Реализация

```ts
import type { WritableComputedRef } from 'vue';

export const useSyncProps = <T>(props: any, key: string, emit: any): WritableComputedRef<T> => {
  return computed({
    get() {
      return props[key];
    },
    set(value) {
      emit(`update:${key}`, value);
    }
  });
};
```

---

## Пример использования

```ts
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [void] }>()

const dialog = useSyncProps<boolean>(props, 'modelValue', emit);
```