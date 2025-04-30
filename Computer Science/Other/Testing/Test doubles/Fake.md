**Fake**(подделка) — это объект, который реализует ту же логику, что и реальный объект, но в упрощенном виде. Он используется для ускорения тестов или для упрощения логики.

Эти элементы фактически выглядят и работают, как настоящий код нашей системы. Однако представленная в них реализация является своего рода флагом, который используется для модульного тестирования, но совсем не подходит для использования в продакшене. Например, объект базы данных, который мы можем использовать исключительно в тестовых сценариях, в то время как в продакшене используются реальные данные из БД.

**Пример использования:**

```ts
import { expect, test } from 'vitest';

interface Item {
  id: number;
  name: string;
}

class FakeDatabase {
  private data: Item[];

  constructor() {
    this.data = [];
  }

  save(item: Item): void {
    this.data.push(item);
  }

  getAll(): Item[] {
    return this.data;
  }
}

test('should save item to fake database', () => {
  const db = new FakeDatabase();
  db.save({ id: 1, name: 'Test' });
  expect(db.getAll()).toEqual([{ id: 1, name: 'Test' }]);
});
```