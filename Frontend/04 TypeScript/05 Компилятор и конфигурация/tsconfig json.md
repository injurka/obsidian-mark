# tsconfig.json

> [!info]
> `tsconfig.json` — это корневой файл конфигурации проекта TypeScript, который указывает компилятору `tsc`, какие файлы следует включить в проект, а также задает опции компиляции (Compiler Options).

## Суть концепции

Когда компилятор TypeScript запускается в директории, он ищет файл `tsconfig.json` (или `jsconfig.json` для JavaScript проектов). Наличие этого файла указывает, что директория является корнем TypeScript-проекта. В нем настраивается поведение компилятора: куда складывать скомпилированные файлы, какой уровень синтаксиса использовать, и насколько строго проверять типы.

### Пример конфигурации `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Флаги строгости (Strict Mode) и окружение
Включение флага `"strict": true` является лучшей практикой. Это активирует целый набор проверок, таких как `strictNullChecks` и `noImplicitAny`, защищающих от многих runtime-ошибок.
Также в `tsconfig.json` определяются пути для поиска файлов деклараций (`.d.ts`), содержащих ambient-контекст (`declare`), с помощью опций `typeRoots` и `types`.

***

- **Связи:** [[Карта знаний TypeScript]]