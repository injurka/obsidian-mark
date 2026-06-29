# Строгая типизация API (tRPC, gRPC-Web)

Сквозная типизация (End-to-End Type Safety) гарантирует, что любые изменения в типах данных на бэкенде мгновенно вызовут ошибку сборки на фронтенде. Это полностью исключает класс ошибок, связанных с несоответствием структуры API (например, когда бэкенд переименовал поле `user_id` в `userId`, а фронтенд продолжил слать старое имя).

Два главных современных инструмента для достижения этой цели — **tRPC** и **gRPC-Web**.

---

## 1. tRPC (TypeScript Remote Procedure Call)

**tRPC** позволяет строить строго типизированные API без необходимости компиляции, кодогенерации (code-gen) или описания схем. Единственное условие: и фронтенд, и бэкенд должны быть написаны на TypeScript (идеально для монорепозиториев).

```text
[Бэкенд: Node.js/TS] ──(Экспорт типа AppRouter)──► [Фронтенд: React/TS]
  - Описание процедур                                - Автокомплит запросов
  - Валидация через Zod                              - Проверка типов на этапе сборки
```

### 1.1. Как это работает под капотом
tRPC использует мощную систему типов TypeScript для шаринга структуры API. На клиенте импортируется **только тип** бэкенд-роутера. Сам JS-код сервера на клиент не попадает, благодаря чему бандл не раздувается.

### 1.2. Пример реализации

1.  **На стороне бэкенда (`server.ts`):**
    ```typescript
    import { initTRPC } from '@trpc/server';
    import { z } from 'zod';

    const t = initTRPC.create();

    export const appRouter = t.router({
      // Процедура получения пользователя по ID
      getUserById: t.procedure
        .input(z.string()) // Валидация входных данных через Zod
        .query(async (opts) => {
          const { input } = opts;
          return { id: input, name: 'Алексей', email: 'alex@example.com' };
        }),
    });

    // Экспортируем только ТИП роутера
    export type AppRouter = typeof appRouter;
    ```

2.  **На стороне клиента (`client.ts`):**
    ```typescript
    import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
    // Импортируем ТИП из папки бэкенда
    import type { AppRouter } from '../server/server';

    const client = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({ url: 'http://localhost:3000/trpc' }),
      ],
    });

    // TypeScript знает, что:
    // 1. Метод называется именно `getUserById`.
    // 2. Аргумент на входе должен быть строго `string`.
    // 3. Возвращаемый объект имеет поля `id`, `name`, `email`.
    const user = await client.getUserById.query('user-123');
    ```

---

## 2. gRPC-Web

gRPC (Google Remote Procedure Call) — это высокопроизводительный протокол, использующий **Protocol Buffers (Protobuf)** в качестве языка описания интерфейсов (IDL) и бинарный формат сериализации данных.

В браузере использовать нативный gRPC (HTTP/2 gRPC) напрямую невозможно, поскольку браузерные API (Fetch, XHR) не предоставляют достаточного контроля над HTTP/2 кадрами. Для этого используется **gRPC-Web**.

### 2.1. Архитектура gRPC-Web с прокси (Envoy)
Поскольку браузер не может общаться с gRPC-сервером напрямую по HTTP/2, между ними ставится легковесный прокси-сервер (обычно Envoy), который транслирует HTTP/1.1 gRPC-Web запросы от браузера в бинарные HTTP/2 gRPC запросы к бэкенду.

```text
Браузер ──(gRPC-Web / HTTP 1.1)──► Прокси Envoy ──(gRPC / HTTP 2)──► Микросервисы (Go/Rust/C++)
```

### 2.2. Описание схемы и кодогенерация
Контракт описывается в независимом `.proto` файле:

```protobuf
syntax = "proto3";

package user;

message UserRequest {
  string id = 1;
}

message UserResponse {
  string id = 1;
  string name = 2;
  string email = 3;
}

service UserService {
  rpc GetUserById (UserRequest) returns (UserResponse);
}
```

С помощью утилиты `protoc` или библиотеки `ts-proto` этот файл компилируется в готовые TypeScript-классы для клиента:

```typescript
import { UserServiceClient } from './generated/user_pb_service';
import { UserRequest } from './generated/user_pb';

const client = new UserServiceClient('http://localhost:8080');

const request = new UserRequest();
request.setId('user-123');

client.getUserById(request, {}, (err, response) => {
  if (!err && response) {
    console.log(response.getName()); // Строго типизированный ответ
  }
});
```

---

## 3. Сравнение: tRPC vs gRPC-Web

| Критерий | tRPC | gRPC-Web |
| :--- | :--- | :--- |
| **Единый стек** | Да (только TypeScript). | Нет (мультиязычный: бэкенд на Go/Python/Rust, клиент на TS). |
| **Кодогенерация** | **Не требуется** (все завязано на TS типы напрямую). | **Обязательна** (компиляция `.proto` файлов). |
| **Формат данных** | JSON (текстовый). | Protobuf (компактный бинарный). |
| **Инфраструктура** | Простая (обычный HTTP-сервер Node.js). | Сложная (требует настройки Envoy Proxy). |
| **Подходит для** | Fullstack TS приложений и монорепозиториев. | Крупных микросервисных архитектур. |
