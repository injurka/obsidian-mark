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
type Props = {
	modelValue: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const dialog = useSyncProps<boolean>(props, 'modelValue', emit);
```