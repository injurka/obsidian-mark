# Record

## Описание

> [!info] Record<Keys, Type>
> Утилитарный тип `Record<Keys, Type>` создает тип объекта, чьи ключи соответствуют типу `Keys`, а значения — типу `Type`.

Он решает проблему типизации словарей (dictionaries) или мап (maps), когда мы заранее знаем, из какого множества будут состоять ключи (например, из определенного union-типа или просто все `string`), и какого типа будут значения.

## Примеры использования

```typescript
type Role = "admin" | "user" | "guest";

interface Permissions {
  canRead: boolean;
  canWrite: boolean;
}

// Создаем объект, где ключи - это роли, а значения - объекты с правами
const rolePermissions: Record<Role, Permissions> = {
  admin: { canRead: true, canWrite: true },
  user: { canRead: true, canWrite: false },
  guest: { canRead: false, canWrite: false }
};
```

Обычный словарь (ключ - строка, значение - число):
```typescript
const scores: Record<string, number> = {
  Alice: 100,
  Bob: 85
};
```

## Особенности и нюансы

- **Ограничение ключей**: Параметр `Keys` должен быть совместим с типом ключей, которые могут быть в объекте (`string | number | symbol`).
- **Строгая проверка полноты**: Если в качестве ключей передан union-тип строковых литералов (как `Role` в примере выше), TypeScript обяжет вас указать **все** возможные ключи при создании объекта.
- **Под капотом**: Реализовано с использованием Mapped Types и оператора `in`:
  ```typescript
  type Record<K extends keyof any, T> = {
      [P in K]: T;
  };
  ```
  `keyof any` в TypeScript резолвится в `string | number | symbol`.

## Связанные темы
- [[Карта знаний TypeScript]]
