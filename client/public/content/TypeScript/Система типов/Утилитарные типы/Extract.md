> общие для двух типов признаки

В результате разрешения условный тип `Extract<T, U>` будет представлять пересечение типа `T` относительно типа `U`. Оба параметра типа могут быть представлены как обычным типом, так и `union`.

```ts
// @filename: lib.d.ts

type Extract<T, U> = T extends U ? T : never;
```

Простыми словами, после разрешения `Extract<T, U>` будет принадлежать к типу определяемого признаками (ключами), присущими обоим типам. То есть, тип `Extract<T, U>` является противоположностью типа `Exclude<T, U>`.

```ts
let v0: Extract<number | string, number | string>; // let v0: string | number
let v1: Extract<number | string, number | boolean>; // let v1: number
let v2: Extract<'a' | 'b', 'a' | 'c'>; // let v2: "a"
```

В случае, когда общие признаки отсутствуют, тип `Extract<T, U>` будет представлять тип `never`.

```ts
let v3: Extract<number | string, boolean | object>; // let v3: never
```

Условный тип `Extract<T, U>` стоит рассмотреть на примере реализации функции, принимающей два объекта и возвращающей новый объект, состоящий из членов первого объекта, которые также присутствуют и во втором объекте.

```ts
declare function intersection<T, U>(
  a: T,
  b: U
): Pick<T, Extract<keyof T, keyof U>>;

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

interface IIntersection {
  a: number;
}

let v0: IIntersection = intersection(a, b); // Ok
// Error -> Property 'b' is missing in type 'Pick<IA, "a">' but required in type 'IA'.
let v1: IA = intersection(a, b);
// Error -> Property 'c' is missing in type 'Pick<IA, "a">' but required in type 'IB'.
let v2: IB = intersection(a, b);
```