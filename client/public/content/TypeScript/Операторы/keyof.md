В _TypeScript_ существует возможность выводить все публичные, нестатические, принадлежащие типу ключи и на их основе создавать литеральный объединенный тип (`Union`). Для получения ключей нужно указать оператор `keyof`, после которого указывается тип, чьи ключи будут объединены в тип объединение `keyof Type`.

Оператор `keyof` может применяться к любому типу данных.

```ts
type AliasType = { f1: number; f2: string };

interface IInterfaceType {
  f1: number;
  f2: string;
}

class ClassType {
  f1: number;
  f2: string;
}

let v1: keyof AliasType; // v1: "f1" | "f2"
let v2: keyof IInterfaceType; // v2: "f1" | "f2"
let v3: keyof ClassType; // v3: "f1" | "f2"
let v4: keyof number; // v4: "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
```

Как уже было замечено, оператор `keyof` выводит только публичные нестатические ключи типа.
```ts
class Type {
  public static fieldClass: number;
  public static methodClass(): void {}

  private privateField: number;
  protected protectedField: string;
  public publicField: boolean;

  public constructor() {}

  public get property(): number {
    return NaN;
  }
  public set property(value: number) {}
  public instanceMethod(): void {}
}

let v1: keyof Type; // a: "publicField" | "property" | "instanceMethod"
```

В случае, если тип данных не содержит публичных ключей, оператор `keyof` выведет тип `never`.
```ts
type AliasType = {};

interface IInterfaceType {}

class ClassType {
  private f1: number;
  protected f2: string;
}

let v1: keyof AliasType; // v1: never
let v2: keyof IInterfaceType; // v2: never
let v3: keyof ClassType; // v3: never
let v4: keyof object; // v4: never
```

Оператор `keyof` также может использоваться в объявлении обобщенного типа данных. Точнее, с помощью оператора `keyof` можно получить тип, а затем расширить его параметром типа. Важно понимать, что в качестве значения по умолчанию может выступать только тип, совместимый с объединенным типом, полученным на основе ключей.

```ts
function f1<T, U extends keyof T = keyof T>(): void {}
```

Напоследок стоит упомянуть об одном неочевидном моменте: оператор `keyof` можно совмещать с оператором `typeof` (_Type Queries_).

```ts
class Animal {
  public name: string;
  public age: number;
}

let animal = new Animal();

let type: typeof animal; // type: { name: string; age: number; }
let union: keyof typeof animal; // union: "name" | "age"
```