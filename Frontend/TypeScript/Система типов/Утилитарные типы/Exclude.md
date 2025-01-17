>исключает из `T` признаки присущие `U`

В результате разрешения условный тип `Exclude<T, U>` будет представлять разницу типа `T` относительно типа `U`. Параметры типа `T` и `U` могут быть представлены как единичным типом, так и множеством `union`.

```ts
// @filename: lib.d.ts

type Exclude<T, U> = T extends U ? never : T;
```

Простыми словами, из типа `T` будут исключены признаки (ключи), присущие также и типу `U`.

```ts
let v0: Exclude<number | string, number | boolean>; // let v0: string
let v1: Exclude<number | string, boolean | object>; // let v1: string|number
let v2: Exclude<'a' | 'b', 'a' | 'c'>; // let v2: "b"
```

В случае, если оба аргумента типа принадлежат к одному и тому же типу данных, `Exclude<T, U>` будет представлен типом `never`.

```ts
let v4: Exclude<number | string, number | string>; // let v4: never
```

Его реальную пользу лучше всего продемонстрировать на реализации функции, которая на входе получает два разных объекта, а на выходе возвращает новый объект, состоящий из членов, присутствующих в первом объекте, но отсутствующих во втором. Аналог функции `difference` из широко известной библиотеки _lodash_.

```ts
declare function difference<T, U>(
  a: T,
  b: U
): Pick<T, Exclude<keyof T, keyof U>>;

interface IA {
  a: number;
  b: string;
}
interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}

let v0: IDifference = difference(a, b); // Ok
// Error -> Property 'a' is missing in type 'Pick<IA, "b">' but required in type 'IA'.
let v1: IA = difference(a, b);
// Error -> Type 'Pick ' is missing the following properties from type 'IB': a, c
let v2: IB = difference(a, b);
```