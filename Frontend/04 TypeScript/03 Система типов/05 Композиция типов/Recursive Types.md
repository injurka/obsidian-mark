# Recursive Types

## Описание

> [!info]
> Рекурсивные типы (Recursive Types) — это типы в TypeScript, которые ссылаются сами на себя. Они необходимы для описания древовидных или вложенных структур данных произвольной глубины.

Типичные примеры, где нужны рекурсивные типы: JSON объекты, файловые системы, абстрактные синтаксические деревья (AST), HTML-подобные узлы.

## Примеры использования

```typescript
// Описание структуры JSON
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

// Описание древовидного меню
interface TreeNode {
  name: string;
  children?: TreeNode[]; // Ссылка на тот же интерфейс
}

const menu: TreeNode = {
  name: "Root",
  children: [
    { name: "Child 1" },
    { name: "Child 2", children: [{ name: "Grandchild" }] }
  ]
};
```

## Особенности и нюансы

- В более старых версиях TypeScript рекурсивные `type` alias имели серьезные ограничения и требовали хаков с интерфейсами. Начиная с TypeScript 3.7, рекурсивные Type Aliases поддерживаются полноценно (если они не вычисляются бесконечно).
- Следует избегать "бесконечной" рекурсии на уровне вычисления типов (Circular constraints), так как это приведет к ошибке компилятора: `Type instantiation is excessively deep and possibly infinite`.
- Часто используются вместе с generic типами для создания утилит, например, `DeepReadonly<T>`.

## Связанные темы
- [[Карта знаний TypeScript]]
