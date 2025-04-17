По умолчанию все видимые _пакеты_`@types` включены в вашу компиляцию. Пакеты в `node_modules/@types`любой из вмещающих папок считаются _видимыми_ . Например, это означает пакеты внутри `./node_modules/@types/`, `../node_modules/@types/`, `../../node_modules/@types/`и т. д.

Если `types`указано, в глобальную область будут включены только перечисленные пакеты. Например:

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "express"]
  }
}
```

## Пример использования

1. Добавьте файл `.d.ts` в каталог, который будет включен в глобальную область видимости. Например, вы можете поместить его в каталог `types` в корне вашего проекта.
    
```ts
/my-project
|-- types
|   |-- my-types.d.ts
|-- src
|   |-- file1.ts
|   |-- file2.ts
|-- tsconfig.json
```

1. В файле `my-types.d.ts` определите ваши типы:
    

```ts
// types/my-types.d.ts
declare interface MyInterface {
  // ...
}
```

1. В файле `tsconfig.json` добавьте путь к каталогу `types` в массив `"types"`:
    
```json
{
  "compilerOptions": {
    // ...
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ],
  "types": ["types/my-types"]
}
```

Теперь, когда вы будете импортировать `MyInterface` в любом файле вашего проекта, TypeScript будет знать о его существовании, и вы сможете использовать его без явного импорта.

```ts
// src/file1.ts
let myVar: MyInterface; // TypeScript будет знать о MyInterface
```

Обратите внимание, что в массиве `"types"` в `tsconfig.json` вы должны указывать только базовое имя файла без расширения `.d.ts`. TypeScript автоматически добавляет расширение при поиске файла.