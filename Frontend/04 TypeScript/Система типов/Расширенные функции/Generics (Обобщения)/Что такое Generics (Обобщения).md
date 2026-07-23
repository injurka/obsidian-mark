Generics (обобщения) — это механизм, который позволяет создавать функции, классы и интерфейсы, которые могут работать с любыми типами данных, не теряя при этом информации о типах. Вместо того чтобы жестко задавать конкретный тип, Generics позволяют параметризовать тип, чтобы он мог быть указан позже.

## Зачем нужны Generics?

- **Переиспользуемость кода**: Generics позволяют писать универсальные функции и классы, которые могут работать с разными типами данных.
- **Безопасность типов**: Generics обеспечивают проверку типов на этапе компиляции, что помогает избежать ошибок.
- **Упрощение кода**: Вместо написания множества перегруженных функций или классов для разных типов, можно использовать Generics.

## Пример использования Generics

### Пример 1: Простая функция с Generics

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("Hello"); // Тип T = string
let output2 = identity<number>(42);      // Тип T = number
```

- `T` — это параметр типа, который будет заменен на конкретный тип при вызове функции.
- Функция `identity` возвращает значение того же типа, что и входной аргумент.

### Пример 2: Массив с Generics

```typescript
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

let firstString = getFirstElement<string>(["a", "b", "c"]); // Тип T = string
let firstNumber = getFirstElement<number>([1, 2, 3]);       // Тип T = number
```

## Generics в классах

Generics также могут использоваться в классах для создания универсальных компонентов.

```typescript
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

let box1 = new Box<string>("Hello");
let box2 = new Box<number>(42);

console.log(box1.getValue()); // "Hello"
console.log(box2.getValue()); // 42
```

## Generics в интерфейсах

Generics могут быть использованы в интерфейсах для создания гибких контрактов.

```typescript
interface Pair<T, U> {
    first: T;
    second: U;
}

let pair1: Pair<string, number> = { first: "age", second: 30 };
let pair2: Pair<boolean, string> = { first: true, second: "active" };
```

## Ограничения Generics (Generic Constraints)

Иногда нужно ограничить типы, которые могут быть использованы в Generics. Для этого используются **Generic Constraints**.

```typescript
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(arg: T): void {
    console.log(arg.length);
}

logLength("Hello"); // 5
logLength([1, 2, 3]); // 3
logLength({ length: 10 }); // 10
```

- `T extends HasLength` означает, что тип `T` должен иметь свойство `length`.=
