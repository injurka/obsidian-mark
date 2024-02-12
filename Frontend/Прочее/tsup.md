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