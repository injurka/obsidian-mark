# Обработка ошибок

## Описание

> [!info] 
> Обработка ошибок — это механизм перехвата и управления исключительными ситуациями во время выполнения программы, позволяющий избежать её аварийного завершения и корректно реагировать на непредвиденные сценарии.

В JavaScript и TypeScript основным способом обработки синхронных ошибок является конструкция `try...catch...finally`. Ошибки генерируются с помощью оператора `throw`. В TypeScript есть важная особенность: начиная с версии 4.4, переменная перехваченной ошибки в блоке `catch` по умолчанию имеет тип `unknown` (а не `any`), что требует явного сужения типов (type narrowing) перед использованием её свойств (например, `error.message`).

## Примеры использования

```typescript
// Определение пользовательского класса ошибки
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

function processData(data: string) {
  if (!data) {
    throw new ValidationError("Данные не могут быть пустыми");
  }
  return data.toUpperCase();
}

try {
  processData("");
} catch (error: unknown) {
  // Сужение типа (type narrowing)
  if (error instanceof ValidationError) {
    console.error("Ошибка валидации:", error.message);
  } else if (error instanceof Error) {
    console.error("Стандартная ошибка:", error.message);
  } else {
    // Неизвестная ошибка (например, throw "строка")
    console.error("Неизвестная ошибка:", error);
  }
} finally {
  console.log("Очистка ресурсов, выполняется всегда");
}
```

## Особенности и нюансы

- **Тип `unknown` в `catch`**: Использование `unknown` (вместо `any`) заставляет разработчика проверять тип ошибки. В JavaScript можно выбросить что угодно (`throw "string"`, `throw 42`), поэтому нельзя гарантировать, что пойманная ошибка является экземпляром класса `Error`.
- **Асинхронные ошибки**: Конструкция `try...catch` работает только для синхронного кода или при использовании `await` в `async` функциях. Для Promise без `await` нужно использовать метод `.catch()`.
- **Создание кастомных ошибок**: При наследовании от встроенного класса `Error` (особенно при компиляции в ES5) может понадобиться вручную восстанавливать цепочку прототипов (`Object.setPrototypeOf(this, CustomError.prototype)`).

## Связанные темы
- [[Карта знаний TypeScript]]
