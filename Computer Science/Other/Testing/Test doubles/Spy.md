**Spy**(шпион) — это объект, который позволяет проверять вызовы методов, не изменяя их поведение. Он используется для отслеживания взаимодействия между объектами.

По сути это те же заглушки, но записывающие информацию о том, кто, как и когда их вызвал. Для примера снова подойдет сервис отправки сообщений по электронной почты, который фиксирует количество отправленных сообщений.

**Пример использования:**

```js
import { vi, expect, test } from 'vitest';

interface MyService {
  getData: () => void;
}

const myServiceSpy: MyService = {
  getData: vi.fn()
};

test('should call getData method', () => {
  someFunction(myServiceSpy);
  expect(myServiceSpy.getData).toHaveBeenCalled();
});

// Пример функции someFunction, которую мы тестируем
function someFunction(service: MyService): void {
  service.getData();
}
```
