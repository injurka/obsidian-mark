> удаляет типы `null` и `undefined`

Условный тип `NonNullable<T>` служит для исключения из типа признаков типов `null` и `undefined`. Единственный параметр типа может принадлежать как к обычному типу, так и множеству определяемого тип `union`.

```ts
// @filename: lib.d.ts

type NonNullable<T> = T extends null | undefined
  ? never
  : T;
```

Простыми словами, данный тип удаляет из аннотации типа такие типы, как `null` и `undefined`.

```ts
let v0: NonNullable<string | number | null>; // let v0: string | number
let v1: NonNullable<string | undefined | null>; // let v1: string
let v2: NonNullable<string | number | undefined | null>; // let v2: string | number
```

В случае, когда тип, выступающий в роли единственного аргумента типа, принадлежит только к типам `null` и\или `undefined`, `NonNullable<T>` представляет тип `never`.

```ts
let v3: NonNullable<undefined | null>; // let v3: never
```