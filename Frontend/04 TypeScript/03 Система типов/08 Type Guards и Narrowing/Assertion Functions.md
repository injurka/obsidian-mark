# Assertion Functions

## Описание

> [!info] 
> Assertion Functions (функции утверждения) — это специальные функции в TypeScript, которые выбрасывают исключение, если условие не выполняется. Они используют сигнатуру `asserts condition` или `asserts value is Type`.

Подобно встроенной функции `assert` в Node.js, эти функции прерывают выполнение программы в случае ошибки. TypeScript может использовать этот факт: если код продолжает выполняться *после* вызова функции утверждения, компилятор применяет сужение типа до конца текущего блока.

## Примеры использования

```typescript
// Простая проверка условия
function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

// Проверка и сужение конкретного типа
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new Error("Not a string!");
  }
}

function yell(str: any) {
  assertIsString(str);
  // Если мы дошли до этой строки, TypeScript знает, что str - это string
  console.log(str.toUpperCase());
}
```

## Особенности и нюансы

- **Отличие от Type Predicates**: Предикаты `is Type` возвращают `boolean` и используются в конструкциях `if/else`. Assertion Functions ничего не возвращают (`void`), а работают за счет прерывания Control Flow (выбрасывают ошибку).
- **Синтаксис**: Существует два вида. `asserts condition` сужает типы на основе переданного логического выражения. `asserts value is Type` работает как User Defined Type Predicate, но для функции, бросающей ошибку.
- **Явность типов**: Для функций-утверждений часто требуется явно указывать тип возвращаемого значения, иначе TS не сможет использовать их для Control Flow Analysis.

## Связанные темы
- [[Карта знаний TypeScript]]
