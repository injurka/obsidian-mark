> динамически определить поле в объектном типе

Сопоставимый тип `Record<K, T>` предназначен для динамического определения полей в объектном типе. Данный тип определяет два параметра типа. В качестве первого параметра ожидается множество ключей, представленных множеством `string` или `Literal String` - `Record<"a", T>` или `Record<"a" | "b", T>`. В качестве второго параметра ожидается конкретный тип данных, который будет ассоциирован с каждым ключом.

```ts
// lib.es6.d.ts

type Record<K extends string, T> = {
  [P in K]: T;
};
```

Самый простой пример, который первым приходит в голову, это замена индексных сигнатур.

```ts
/**
 * Поле payload определено как объект
 * с индексной сигнатурой, что позволит
 * динамически записывать в него поля.
 */
interface IConfigurationIndexSignature {
  payload: {
    [key: string]: string;
  };
}

/**
 * Поле payload определено как
 * Record<string, string>, что аналогично
 * предыдущему варианту, но выглядит более
 * декларативно.
 */
interface IConfigurationWithRecord {
  payload: Record<string, string>;
}

let configA: IConfigurationIndexSignature = {
  payload: {
    a: `a`,
    b: `b`,
  },
}; // Ok
let configB: IConfigurationWithRecord = {
  payload: {
    a: `a`,
    b: `b`,
  },
}; // Ok
```

Но, в отличие от индексной сигнатуры типа `Record<K, T>` может ограничить диапазон ключей.

```ts
type WwwConfig = Record<'port' | 'domain', string>;

let wwwConfig: WwwConfig = {
  port: '80',
  domain: 'https://domain.com',

  user: 'User', // Error -> Object literal may only specify known properties, and 'user' does not exist in type 'Record<"port" | "domain", string>'.
};
```

В данном случае было бы даже более корректным использовать `Record<K, T>` в совокупности с ранее рассмотренным типом `Partial<T>`.

```ts
type WwwConfig = Partial<Record<'port' | 'domain', string>>;

let wwwConfig: WwwConfig = {
  port: '80',
  // Ok -> поле domain теперь необязательное
  user: 'User', // Error -> Object literal may only specify known properties, and 'user' does not exist in type 'Record<"port" | "domain", string>'.
};
```

Также не будет лишним упомянуть, что поведение данного типа при определении в объекте с предопределенными членами, идентификаторы которых ассоциированы с типами, отличными от типа, указанного в качестве второго параметра, идентично поведению индексной сигнатуры. Напомню, что при попытке определить в объекте члены, идентификаторы которых будут ассоциированы с типами, отличными от указанных в индексной сигнатуре, возникнет ошибка.

```ts
/**
 * Ok -> поле a ассоциированно с таким
 * же типом, что указан в индексной сигнатуре.
 */
interface T0 {
  a: number;

  [key: string]: number;
}

/**
 * Error -> тип поля a не совпадает с типом,
 * указанным в индексной сигнатуре.
 */
interface T1 {
  a: string; // Error -> Property 'a' of type 'string' is not assignable to string index type 'number'.

  [key: string]: number;
}
```

Данный пример можно переписать с использованием типа пересечения.

```ts
interface IValue {
  a: number;
}

interface IDynamic {
  [key: string]: string;
}

type T = IDynamic & IValue;

/**
 * Error ->
 * Type '{ a: number; }' is not assignable to type 'IDynamic'.
 * Property 'a' is incompatible with index signature.
 * Type 'number' is not assignable to type 'string'.
 */
let t: T = {
  a: 0,
};
```

Аналогичное поведение будет и для пересечения, определяемого типом `Record<K, T>`.

```ts
interface IValue {
  a: number;
}

type T = Record<string, string> & IValue;

/**
 * Error ->
 * Type '{ a: number; }' is not assignable to type 'Record<string, string>'.
 * Property 'a' is incompatible with index signature.
 * Type 'number' is not assignable to type 'string'.
 */
let t: T = {
  a: 0,
};
```