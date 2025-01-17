> получить тип значения, возвращаемого функцией

Условный тип `ReturnType<T>` служит для установления возвращаемого из функции типа. В качестве параметра типа должен обязательно выступать _функциональный тип_.

```ts
// @filename: lib.d.ts

type ReturnType<
  T extends (...args: any) => any
> = T extends (...args: any) => infer R ? R : any;
```

На практике очень часто требуется получить тип, к которому принадлежит значение, возвращаемое из функции. Единственное, на что стоит обратить внимание, что в случаях, когда тип возвращаемого из функции значения является параметром типа, у которого отсутствуют хоть какие-то признаки, то тип `ReturnType<T>` будет представлен пустым объектным типом `{}`.

```ts
let v0: ReturnType<() => void>; // let v0: void
let v1: ReturnType<() => number | string>; // let v1: string|number
let v2: ReturnType<<T>() => T>; // let v2: {}
let v3: ReturnType<<
  T extends U,
  U extends string[]
>() => T>; // let v3: string[]
let v4: ReturnType<any>; // let v4: any
let v5: ReturnType<never>; // let v5: never
let v6: ReturnType<Function>; // Error
let v7: ReturnType<number>; // Error
```
