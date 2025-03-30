Generic Constraints (ограничения Generics) — это механизм в TypeScript, который позволяет ограничивать типы, которые могут быть использованы в Generics. Это полезно, когда нужно гарантировать, что тип, переданный в Generics, имеет определенные свойства или методы.

Generic Constraints — это способ указать, что тип, используемый в Generics, должен соответствовать определенному интерфейсу или иметь определенные свойства. Это позволяет использовать свойства или методы этого типа внутри функции или класса.

---

## Пример использования Generic Constraints

### Пример 1: Ограничение на наличие свойства

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

- `T extends HasLength` означает, что тип `T` должен иметь свойство `length`.
- Функция `logLength` может быть вызвана только с аргументами, которые имеют свойство `length`.

### Пример 2: Ограничение на тип значения

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let person = { name: "Alice", age: 30 };
console.log(getProperty(person, "name")); // "Alice"
console.log(getProperty(person, "age"));  // 30
```

- `K extends keyof T` означает, что `K` должен быть ключом объекта `T`.
- Функция `getProperty` возвращает значение свойства `key` объекта `obj`.
