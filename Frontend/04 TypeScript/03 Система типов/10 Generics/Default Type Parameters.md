# Default Type Parameters

## Описание

> [!info] 
> **Параметры типа по умолчанию (Default Type Parameters)** позволяют задать резервный (фолбэк) тип для дженерика на случай, если этот параметр типа не указан явно и его невозможно вывести автоматически.

Синтаксис похож на значения по умолчанию для аргументов функций, но используется символ `=` внутри угловых скобок: `<T = DefaultType>`. Это делает использование обобщенных компонентов более гибким, позволяя опускать типы там, где нас устраивает поведение по умолчанию.

## Примеры использования

```typescript
// Обобщенный интерфейс с типом по умолчанию
interface ComponentProps<T = any> {
    id: string;
    data: T;
}

// Использование без явного указания типа - подставится any (по умолчанию)
const propsAny: ComponentProps = { id: "1", data: { arbitrary: "data" } };

// Использование с явным указанием типа
const propsStr: ComponentProps<string> = { id: "2", data: "Hello" };

// Функция с типом по умолчанию
function createContainer<T = string>(): { value: T | null } {
    return { value: null };
}

const stringContainer = createContainer(); // { value: string | null }
const numberContainer = createContainer<number>(); // { value: number | null }
```

## Особенности и нюансы

- Параметры типа со значениями по умолчанию всегда должны располагаться **после** параметров типа без значений по умолчанию. `interface MyType<T, U = string>` — правильно. `interface MyType<U = string, T>` — ошибка.
- Значение по умолчанию может ссылаться на предыдущие параметры типа: `<T, U = T[]>`.
- Значения по умолчанию можно комбинировать с ограничениями: `<T extends HTMLElement = HTMLDivElement>`. Это гарантирует, что тип по умолчанию удовлетворяет ограничению.

## Связанные темы
- [[Карта знаний TypeScript]]
