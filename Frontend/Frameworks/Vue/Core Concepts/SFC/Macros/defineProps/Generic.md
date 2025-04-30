
```ts
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'

defineProps<{
  id: T
  list: U[]
}>()
</script>
```
