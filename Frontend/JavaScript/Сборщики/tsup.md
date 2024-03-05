## С сохранением оригинальной структуры папок и файлов в них

> tsup.config.ts
```ts
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/**/*.ts'],
    splitting: true,
    format: 'esm',
    dts: true,
    treeshake: true,
    bundle: false,
  },
])
```


---
## Источник
- #### [github](https://github.com/egoist/tsup)
- #### [tsup.egoist.dev](https://tsup.egoist.dev/#typescript--javascript)
