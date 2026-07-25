# Lookup Types

## Описание

> [!info] 
> Lookup Types (или Indexed Access Types) — это механизм в TypeScript, позволяющий получить тип конкретного свойства из другого типа (аналогично доступу к свойству объекта через скобочную нотацию).

Используя синтаксис `Type["property"]`, мы можем извлечь тип, не дублируя его описание. Это невероятно полезно для DRY (Don't Repeat Yourself), особенно когда мы работаем со сложными ответами API или большими конфигурационными объектами, и нам нужен только тип вложенного поля.

## Примеры использования

```typescript
type User = {
  id: number;
  profile: {
    name: string;
    age: number;
    avatarUrl?: string;
  };
  roles: string[];
};

// Извлечение типа вложенного объекта
type Profile = User["profile"]; 
// Profile = { name: string; age: number; avatarUrl?: string; }

// Извлечение типа элемента массива
type Role = User["roles"][number]; 
// Role = string

// Извлечение нескольких типов сразу (получаем Union)
type ProfileOrId = User["profile" | "id"]; 
// ProfileOrId = number | { name: string; age: number; avatarUrl?: string; }
```

## Особенности и нюансы

- **Только типы в качестве индекса**: В индексной нотации вы можете использовать только другие типы (литералы строк, `keyof Type`, `number` для массивов), а не переменные, содержащие строки. То есть `const key = "age"; type T = User[key]` выдаст ошибку; нужно `type key = "age"`.
- **Доступ к элементам массива/кортежа**: Конструкция `Type[number]` является идиоматическим способом извлечь тип элементов из массива (Array Type) или Union тип из кортежа (Tuple).
- **Не работает с точечной нотацией**: Вы не можете использовать `User.profile` на уровне типов, только синтаксис квадратных скобок `User["profile"]`.

## Связанные темы
- [[Карта знаний TypeScript]]
