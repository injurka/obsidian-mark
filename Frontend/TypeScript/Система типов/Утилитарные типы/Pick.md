> отфильтровать объектный тип

Сопоставимый тип `Pick<T, K>` предназначен для фильтрации объектного типа, ожидаемого в качестве первого параметра типа. Фильтрация происходит на основе ключей, представленных множеством литеральных строковых типов, ожидаемых в качестве второго параметра типа.

```ts
// lib.es6.d.ts

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

Простыми словами, результатом преобразования `Pick<T, K>` будет являться тип, состоящий из членов первого параметра, идентификаторы которых указаны во втором параметре.

```ts
interface IT {
  a: number;
  b: string;
  c: boolean;
}

/**
 * Поле "с" отфильтровано ->
 *
 * type T0 = { a: number; b: string; }
 */
type T0 = Pick<IT, 'a' | 'b'>;
```

Стоит заметить, что в случае указания несуществующих ключей возникнет ошибка.

```ts
interface IT {
  a: number;
  b: string;
  c: boolean;
}

/**
 * Error ->
 *
 * Type '"a" | "U"' does not satisfy the constraint '"a" | "b" | "c"'.
 * Type '"U"' is not assignable to type '"a" | "b" | "c"'.
 */
type T1 = Pick<IT, 'a' | 'U'>;
```

Тип сопоставления `Pick<T, K>` является гомоморфным и не влияет на существующие модификаторы, а лишь расширяет модификаторы конкретного типа.

```ts
interface IT {
  readonly a?: number;
  readonly b?: string;
  readonly c?: boolean;
}

/**
 * Модификаторы readonly и ? сохранены ->
 *
 * type T2 = { readonly a?: number; }
 */
type T2 = Pick<IT, 'a'>;
```

Примером, который самым первым приходит в голову, является функция `pick`, в задачу которой входит создавать новый объект путем фильтрации членов существующего.

```ts
function pick<T, K extends string & keyof T>(
  object: T,
  ...keys: K[]
) {
  return Object.entries(object) // преобразуем объект в массив [идентификатор, значение]
    .filter(([key]: Array<K>) => keys.includes(key)) // фильтруем
    .reduce(
      (result, [key, value]) => ({
        ...result,
        [key]: value,
      }),
      {} as Pick<T, K>
    ); // собираем объект из прошедших фильтрацию членов
}

let person = pick(
  {
    a: 0,
    b: ``,
    c: true,
  },
  `a`,
  `b`
);

person.a; // Ok
person.b; // Ok
person.c; // Error -> Property 'c' does not exist on type 'Pick<{ a: number; b: string; c: boolean; }, "a" | "b">'.
```
