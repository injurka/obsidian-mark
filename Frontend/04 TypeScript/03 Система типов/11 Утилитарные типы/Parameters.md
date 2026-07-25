# Parameters

## Описание

> [!info] Parameters<Type>
> Утилитарный тип `Parameters<Type>` извлекает типы параметров из типа функции `Type` и возвращает их в виде кортежа (tuple).

Это невероятно полезно, когда вам нужно написать обертку (wrapper) вокруг чужой функции, залогировать аргументы, или делегировать вызов. Вы можете гарантировать, что ваша функция-обертка принимает точно такие же аргументы, как и оригинальная функция, не дублируя их типы вручную.

## Примеры использования

```typescript
function greet(name: string, age: number): void {
  console.log(`Hello ${name}, you are ${age} years old.`);
}

// Извлекаем типы параметров в кортеж
type GreetParams = Parameters<typeof greet>;
// type GreetParams = [name: string, age: number]

// Используем эти параметры в другой функции (например, через rest-оператор)
function logAndGreet(...args: GreetParams) {
  console.log("Calling greet with", args);
  greet(...args);
}

logAndGreet("Alice", 30); // Ок
// logAndGreet("Bob"); // Ошибка: Ожидалось 2 аргументов, получено 1.
```

Пример с использованием стандартных функций:
```typescript
type T0 = Parameters<() => string>;
// type T0 = []

type T1 = Parameters<(s: string) => void>;
// type T1 = [s: string]
```

## Особенности и нюансы

- **Только для функций**: `Type` обязательно должен быть типом функции. Если передать туда не функцию (например, строку), TypeScript выдаст ошибку `Type 'string' does not satisfy the constraint '(...args: any) => any'`.
- **Возвращает кортеж (Tuple)**: Результат всегда представляет собой массив/кортеж типов аргументов (сохраняя их имена и опциональность).
- **Под капотом**: Тип `Parameters` реализуется через условные типы и ключевое слово `infer` (вывод типов):
  ```typescript
  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
  ```
  Здесь `infer P` захватывает типы всех аргументов в кортеж `P`.

## Связанные темы
- [[Карта знаний TypeScript]]
