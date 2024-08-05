Это техника, позволяющая добавлять и изменять поведение части кода системы прямо во время его выполнения без изменения исходного кода.

Таким образом, в нашем примере мы мокаем реализацию функции `getWinner` после её импорта, а затем восстанавливаем оригинальную реализацию после завершения теста.

Однако так делать не рекомендуется, поскольку мы присваиваем значение методу импортированного модуля, что нарушает правило `eslint – import/namespace`.

**Примечание:** Jest, по сути, делает то же самое при мокинге, но выполняет некоторую “магию” на фоне и мокирует целую систему модулей, что позволяет коду оставаться совместимым и избегать предупреждений/ошибок от компилятора .

### Когда используют Monkey Patching в тестировании:

1. **Изоляция тестов**: Чтобы убедиться, что тесты не зависят от внешних факторов, таких как сетевые запросы, файловые системы или сторонние сервисы.
    
2. **Контроль состояния**: Для управления возвращаемыми значениями функций или методов, чтобы тесты всегда работали предсказуемо.
    
3. **Ускорение тестов**: Замена медленных или ресурсоемких операций на быстрые и легкие для тестирования.

### Примеры Monkey Patching в тестировании:

#### Пример 1: Замена метода в модуле

Предположим, у нас есть модуль `api.ts`, который делает сетевой запрос:

```typescript
// api.ts
export function fetchData(): Promise<any> {
    return fetch('https://api.example.com/data')
        .then(response => response.json());
}
```

Мы хотим протестировать функцию, которая использует `fetchData`, но не хотим делать реальный сетевой запрос. Мы можем использовать monkey patching, чтобы заменить `fetchData` на mock-функцию:

```typescript
// test.ts
import * as api from './api';
import { vi, expect, test } from 'vitest';

test('fetchData should return mocked data', async () => {
    const originalFetchData = api.fetchData;
    const mockedData = { key: 'value' };

    api.fetchData = vi.fn(() => Promise.resolve(mockedData));

    const data = await api.fetchData();
    expect(data).toEqual(mockedData);

    api.fetchData = originalFetchData; // Восстанавливаем оригинальную функцию
});
```

#### Пример 2: Замена глобального объекта

Предположим, у нас есть функция, которая использует глобальный объект `Date`:

```typescript
// dateUtils.ts
export function getCurrentDate(): Date {
    return new Date();
}
```

Мы хотим протестировать эту функцию, но не хотим зависеть от текущего времени. Мы можем использовать monkey patching, чтобы заменить `Date` на mock-объект:

```typescript
// test.ts
import { getCurrentDate } from './dateUtils';
import { vi, expect, test } from 'vitest';

test('getCurrentDate should return mocked date', () => {
    const mockedDate = new Date('2023-10-01T00:00:00Z');
    const OriginalDate = Date;

    global.Date = vi.fn(() => mockedDate) as any;

    const result = getCurrentDate();
    expect(result).toEqual(mockedDate);

    global.Date = OriginalDate; // Восстанавливаем оригинальный Date
});
```

