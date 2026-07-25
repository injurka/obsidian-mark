# Readonly

## Описание

> [!info] Readonly<Type>
> Утилитарный тип `Readonly<Type>` конструирует тип, в котором все свойства исходного типа `Type` становятся доступными только для чтения. При попытке переназначить эти свойства компилятор TypeScript выдаст ошибку.

Этот тип решает проблему иммутабельности. Когда объект передается в функцию или замораживается (`Object.freeze()`), необходимо гарантировать на уровне типов, что его свойства не будут изменены по ошибке.

## Примеры использования

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Купить молоко",
};

// Ошибка: Невозможно присвоить значение 'title',
// так как это свойство доступно только для чтения.
todo.title = "Купить хлеб"; 
```

Типизация замороженных объектов:
```typescript
function freezeObj<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const frozen = freezeObj({ name: "Bob" });
// frozen.name = "Alice"; // Ошибка TS
```

## Особенности и нюансы

- **Поверхностное действие (Shallow)**: Как и большинство утилитарных типов, `Readonly` делает поля доступными только для чтения на верхнем уровне. Свойства вложенных объектов могут быть изменены.
  ```typescript
  interface State { nested: { count: number } }
  const s: Readonly<State> = { nested: { count: 1 } };
  s.nested.count = 2; // Нет ошибки!
  ```
- **Под капотом**: Реализовано с помощью Mapped Types путем добавления модификатора `readonly` к каждому ключу типа:
  ```typescript
  type Readonly<T> = {
      readonly [P in keyof T]: T[P];
  };
  ```
- **Противоположность (снятие readonly)**: Если потребуется снять модификатор, можно написать кастомный тип с `-readonly`:
  ```typescript
  type Mutable<T> = {
      -readonly [P in keyof T]: T[P];
  };
  ```

## Связанные темы
- [[Карта знаний TypeScript]]
