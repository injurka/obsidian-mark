> сделать все необязательные члены обязательными

Сопоставимый тип `Required<T>` удаляет все необязательные модификаторы `?:`, приводя члены объекта к обязательным. Достигается это путем удаления необязательных модификаторов при помощи механизма _префиксов - и +_ рассматриваемого в главе [Оператор keyof, Lookup Types, Mapped Types, Mapped Types - префиксы + и -](https://scriptdev.ru/guide/042/)).

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

Тип сопоставления `Required<T>` является полной противоположностью типу сопоставления `Partial<T>`.

```ts
interface IConfig {
  domain: string;
  port: '80' | '90';
}

/**
 * Partial добавил членам IConfig
 * необязательный модификатор ->
 *
 * type T0 = {
 *  domain?: string;
 *  port?: "80" | "90";
 * }
 */
type T0 = Partial<IConfig>;

/**
 * Required удалил необязательные модификаторы
 * у типа T0 ->
 *
 * type T1 = {
 *  domain: string;
 *  port: "80" | "90";
 * }
 */
type T1 = Required<T0>;
```

Тип сопоставления `Required<T>` является гомоморфным и не влияет на модификаторы, отличные от необязательных.

```ts
interface IT {
  readonly a?: number;
  readonly b?: string;
}

/**
 * Модификаторы readonly остались
 * на месте ->
 *
 * type T0 = {
 *  readonly a: number;
 *  readonly b: string;
 * }
 */
type T0 = Required<IT>;
```