# Awaited

## Описание

> [!info] Awaited<Type>
> Утилитарный тип `Awaited<Type>` предназначен для рекурсивного разворачивания (unwrap) типов `Promise`. Он позволяет получить тип, в который в конечном итоге разрешится промис, имитируя поведение операции `await` в асинхронных функциях.

Тип `Awaited` решает проблему извлечения типа значения из `Promise`, особенно когда промисы вложены друг в друга (например, `Promise<Promise<string>>`). До появления этого типа разработчикам приходилось писать сложные кастомные условные типы (Conditional Types) с использованием `infer`.

## Примеры использования

```typescript
// Обычный Promise
type A = Awaited<Promise<string>>;
// type A = string

// Вложенные Promise
type B = Awaited<Promise<Promise<number>>>;
// type B = number

// Смешанные типы, включая не-Promise
type C = Awaited<boolean | Promise<number>>;
// type C = number | boolean
```

Пример использования при типизации результатов функций:
```typescript
async function fetchUser() {
  return { id: 1, name: "Alice" };
}

// Получаем тип возвращаемого значения, развернув Promise
type User = Awaited<ReturnType<typeof fetchUser>>;
// type User = { id: number; name: string; }
```

## Особенности и нюансы

- **Рекурсивность**: Главная особенность `Awaited` в том, что он рекурсивно разворачивает тип до тех пор, пока не получит конечный тип (не-Promise).
- **Под капотом**: Он реализован с использованием условных типов (Conditional Types) и ключевого слова `infer`. Упрощенная версия того, как он работает под капотом:
  ```typescript
  type Awaited<T> = T extends null | undefined
      ? T // возвращаем как есть
      : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // проверяем на Thenable
          ? F extends ((value: infer V, ...args: infer _) => any)
              ? Awaited<V> // рекурсивно разворачиваем результат onfulfilled
              : never
          : T; // если не Thenable, возвращаем сам тип
  ```
- **Работа с "Thenable"**: `Awaited` работает не только со стандартным встроенным `Promise`, но и с любыми объектами, имеющими метод `then` (т.е. Thenable-объектами).

## Связанные темы
- [[Карта знаний TypeScript]]
