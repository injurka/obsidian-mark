# Key Remapping as

## Описание

> [!info] 
> Key Remapping via `as` — это мощная возможность в Mapped Types (отображенных типах), позволяющая динамически изменять, фильтровать или переименовывать ключи при создании нового типа.

До версии TypeScript 4.1 для изменения ключей в Mapped Types приходилось использовать сложные цепочки утилит-типов. Теперь, используя ключевое слово `as` внутри квадратных скобок `[K in keyof T as ...]`, вы можете применить Template Literal Types для переименования ключа или `never` для его удаления.

## Примеры использования

```typescript
type Person = {
  name: string;
  age: number;
  location: string;
};

// 1. Переименование ключей (добавление префикса get)
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};
type PersonGetters = Getters<Person>;
// Получаем: { getName: () => string; getAge: () => number; getLocation: () => string; }

// 2. Фильтрация ключей (удаляем ключи, содержащие "age")
type ExcludeAge<T> = {
  [K in keyof T as K extends "age" ? never : K]: T[K]
};
type AgelessPerson = ExcludeAge<Person>;
// Получаем: { name: string; location: string; }
```

## Особенности и нюансы

- **Использование `never` для фильтрации**: Если в результате `as` возвращается тип `never`, ключ полностью удаляется из итогового объекта. Это делает встроенные утилиты типа `Omit` и `Pick` реализуемыми внутри одного Mapped Type.
- **Ограничение типов для строк**: При работе с `Capitalize` и другими строковыми утилитами, ключи (`K`) могут быть не только строками, но и `number` или `symbol`. Поэтому часто требуется пересечение: `K & string`.
- **Мощность**: Эта фича часто используется для создания сложной логики типизации ORM (генерация методов `findBy<Property>`), API-клиентов и стейт-менеджеров.

## Связанные темы
- [[Карта знаний TypeScript]]
