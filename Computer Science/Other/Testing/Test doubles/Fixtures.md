**Fixtures***(фикстуры) — это статические данные, которые используются для настройки тестовой среды или предоставления входных данных для тестов. Они помогают создать предсказуемую и управляемую среду для тестирования.

**Пример использования:**

```ts
import { expect, test } from 'vitest';

interface User {
  id: number;
  name: string;
  email: string;
}

const userFixture: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com'
};

test('should return user details', () => {
  const userService = {
    getUser: (id: number): User => {
      return userFixture;
    }
  };

  const user = userService.getUser(1);
  expect(user).toEqual(userFixture);
});
```