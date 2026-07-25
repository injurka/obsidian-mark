# Promise и async await

## Описание

> [!info] 
> `Promise` (Обещание) — это объект, представляющий результат успешного или неудачного завершения асинхронной операции. `async/await` — это синтаксический сахар над промисами, позволяющий писать асинхронный код в синхронном стиле.

В TypeScript промисы являются дженериками (обобщенными типами) `Promise<T>`, где `T` — тип значения, которое промис вернет при успешном разрешении (`resolve`). Использование `async` автоматически оборачивает возвращаемое значение функции в `Promise`.

## Примеры использования

```typescript
// Определение интерфейса для данных
interface User {
  id: number;
  name: string;
}

// Функция, возвращающая Promise
function fetchUser(id: number): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "John Doe" });
      } else {
        reject(new Error("Invalid ID"));
      }
    }, 1000);
  });
}

// Использование async/await
async function getUserInfo(id: number): Promise<void> {
  try {
    console.log("Fetching user...");
    // await приостанавливает выполнение функции до разрешения промиса
    const user: User = await fetchUser(id);
    console.log(`User found: ${user.name}`);
  } catch (error) {
    // Обработка ошибок (reject)
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
  } finally {
    console.log("Fetch attempt finished.");
  }
}

getUserInfo(1);
```

## Особенности и нюансы

- Ошибки в `catch` блоке внутри `async/await` по умолчанию имеют тип `unknown` (или `any`), поэтому рекомендуется использовать тайпгварды (`instanceof Error`) для безопасной обработки.
- Не забывайте, что `await` блокирует только выполнение текущей `async` функции, но не блокирует основной поток JavaScript.
- Для параллельного выполнения нескольких независимых промисов следует использовать `Promise.all()` (или `Promise.allSettled()`), а не `await` в цикле один за другим.
- Функция, помеченная как `async`, всегда возвращает `Promise`, даже если внутри неё нет явного возврата промиса (она вернёт `Promise<void>`).

## Связанные темы
- [[Карта знаний TypeScript]]
