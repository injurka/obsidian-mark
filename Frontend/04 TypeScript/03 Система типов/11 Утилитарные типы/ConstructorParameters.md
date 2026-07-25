# ConstructorParameters

## Описание

> [!info] ConstructorParameters<Type>
> Утилитарный тип `ConstructorParameters<Type>` извлекает типы параметров из типа функции-конструктора (или класса) `Type` и возвращает их в виде кортежа. Является аналогом `Parameters`, но работает для конструкторов.

Он используется для написания фабрик (factory functions), декораторов классов или оберток (например, DI-контейнеров), которые должны уметь создавать экземпляры различных классов, пробрасывая в их конструктор правильные аргументы и сохраняя строгую типизацию.

## Примеры использования

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

// Получаем типы параметров конструктора класса Person
type PersonConstructorParams = ConstructorParameters<typeof Person>;
// type PersonConstructorParams = [name: string, age: number]

// Фабричная функция, которая типизируется автоматически
function createPerson(...args: PersonConstructorParams) {
  return new Person(...args);
}

const p = createPerson("John", 25);
```

С типами из стандартной библиотеки:
```typescript
type ErrorParams = ConstructorParameters<typeof Error>;
// type ErrorParams = [message?: string | undefined, options?: ErrorOptions | undefined]
```

## Особенности и нюансы

- **Тип `typeof ClassName`**: Обратите внимание, что нужно передавать тип *самого конструктора* (класса), то есть `typeof Person`, а не экземплярный тип `Person`. `typeof Person` описывает функцию-конструктор.
- **Под капотом**: Реализация очень похожа на `Parameters`, но с ключевым словом `new`:
  ```typescript
  type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
  ```
  Использование `abstract new` позволяет извлекать параметры даже у абстрактных классов (которые нельзя напрямую инстанцировать с помощью `new`, но можно наследовать).
- **Возвращает кортеж**: Как и `Parameters`, тип возвращает tuple.

## Связанные темы
- [[Карта знаний TypeScript]]
