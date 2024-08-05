**Stub**(заглушка) — это объект, который предоставляет заранее определенные ответы на вызовы методов, не выполняя никакой логики. Заглушки используются, когда мы не можем или не хотим вовлекать сервисы, которые будут отвечать на наши запросы реальными данными.

Допустим, у нас есть объект, который при вызове метода должен получить данные из базы данных для ответа. Вместо реального модуля мы можем использовать заглушку , которая вернет захардкоженные данные.

**Пример использования:**

```ts
import { expect, test } from 'vitest';

interface DataResponse {
  status: string;
  data: any[];
}

const myServiceStub = {
  getData: (): DataResponse => {
    return { status: 'success', data: [] };
  }
};

test('should handle success response', () => {
  const result = myServiceStub.getData();
  expect(result.status).toBe('success');
});
```
