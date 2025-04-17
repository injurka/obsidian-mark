### Литерал числа

Когда вы пишете `const a = 123;`, TypeScript автоматически выводит тип переменной `a` на основе значения, которое вы присваиваете ей при объявлении. В данном случае, значение `123` является литералом числового типа, поэтому TypeScript выводит тип переменной `a` как `number`.

```ts
const a = 123; // a имеет тип `a: 123`
```

---

### Литерал строки

Когда вы пишете `const a = "123";`, TypeScript автоматически выводит тип переменной `a` на основе значения, которое вы присваиваете ей при объявлении. В данном случае, значение `"123"` является литералом строки, поэтому TypeScript выводит тип переменной `a` как `string`.

Выражение `const b: "123"` указывает, что переменная `b` имеет тип `"123"`, что является строковым литералом. Однако, такой синтаксис указывает на конкретное значение, а не на тип переменной `a`.

```ts
const a = '123'; // a имеет тип `a: '123'`
```

```ts
const b = false; // b имеет тип `b: false`
```

---

### Тип утверждения `as`

```ts
const a = '1'; // a имеет тип `'1'`
const b = '1' as string; // b имеет тип `string`
const c = <string>'1'; // b имеет тип `string`
```

> двойное утверждение

```ts
const d = '1' as unknown as number; // b имеет тип `number` (без unknown была бы ошибка - Conversion of type 'string' to type 'number')

function handler(event: Event) {
  const element = event as unknown as HTMLElement; // ok
}
```

---

### Interface

Пример типизации через interface

```ts
interface IProps {
  id: string;
  name: string;
}
```

---

### Type

Пример типизации через type

```ts
type Props = {
  id: string;
  name: string;
};
```

> `Литеральные тип`
>
> В TypeScript литеральный тип представляет собой тип, который ограничивается набором конкретных значений.
>
> Литеральные типы позволяют явно указывать возможные значения переменных или параметров функций.

```ts
type Direction = 'left' | 'right' | 'up' | 'down';
```

---

### Дополнение типа

```ts
interface IProps {
  id: string;
  name: string;
}

interface IProps {
  lastname: string;
}

// Итого - IProps
// {
// id: string;
// name: string;
// lastname: string;
// }
```

---

### Расширения interface

```ts
interface Shape {
  color: string;
  area: () => number;
}

interface Rectangle extends Shape {
  width: number;
  height: number;
}

// Итого - Rectangle
// {
// color: 'blue',
// width: 10,
// height: 20,
// area: () => 123
// }
```

---

### Расширения type

```ts
type Person = {
  name: string;
  age: number;
};

type Employee = {
  company: string;
  position: string;
};

type EmployeePerson = Person & Employee & { id: string };


// Итого - EmployeePerson
// {
// id: ' ',
// name: 'John Doe',
// age: 30,
// company: 'ABC Corp',
// position: 'Manager'
// };
```

---

### Generic / дженерики / обобщения

В TypeScript, "generic" (или "обобщение") относится к возможности создания обобщенных типов, функций или классов, которые могут работать с различными типами данных. Обобщения позволяют создавать компоненты, которые могут быть параметризованы типами, а затем использоваться с различными типами данных, сохраняя при этом безопасность типов.

С помощью обобщений вы можете создавать шаблоны типов, которые работают с различными типами данных, но обеспечивают типовую проверку на этапе компиляции. Это позволяет повысить безопасность и гибкость вашего кода.

Для объявления обобщенного типа в TypeScript используется параметр типа, который указывается в угловых скобках `<>`. Например, вот пример объявления обобщенной функции, которая возвращает массив элементов заданного типа:

```ts
function toArray<T>(arg: T): T[] {
  return [arg];
}
```

В этом примере `T` является параметром типа, который может принимать любой тип данных. При вызове функции `toArray` будет автоматически определен тип T на основе переданного аргумента.

```ts
const arr = toArray('Hello'); // arr имеет тип string[]
```

---

### Обобщенние интерфейса

```typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = {
  value: 42
};

const stringBox: Box<string> = {
  value: 'Hello'
};
```

`Box<T>` - обобщенный интерфейс, где `T` - параметр типа. Мы создаем два экземпляра интерфейса `Box`, `numberBox` и `stringBox`, используя различные типы данных (`number` и `string`). Каждый экземпляр имеет свойство `value`, соответствующее указанному типу данных.

---

### Обобщенние типа

```ts
type Box<T> = {
  value: T;
};

const numberBox: Box<number> = {
  value: 42
};

const stringBox: Box<string> = {
  value: 'Hello'
};
```

---

### Обобщенние функции

```ts
function toArray<T>(arg: T): T[] {
  return [arg];
}

const numberArray: number[] = toArray(42);
const stringArray: string[] = toArray('Hello');
```

---

# Более крутые штуки, но не такие распространенные

### Условные типы / Conditional Types

```ts
T extends U ? T1 : T2
```

Это типы, способные принимать одно из двух значений, основываясь на принадлежности одного типу к другому. Условные типы семантически схожи с тернарным оператором.

В блоке выражения с помощью ключевого слова extends устанавливается принадлежность к заданному типу. Если тип, указанный слева от ключевого слова extends, совместим с типом, указанным по правую сторону, то условный тип будет принадлежать к типу `T1`, иначе — к типу `T2`. Стоит заметить, что в качестве типов `T1` и `T2` могут выступать, в том числе и другие условные типы, что в свою очередь создаст цепочку условий определения типа.

Помимо того, что невозможно переоценить пользу от условных типов, очень сложно придумать минимальный пример, который бы эту пользу проиллюстрировал. Поэтому в этой главе будут приведены лишь бессмысленные примеры, демонстрирующие принцип их работы.

```ts
type T0<T> = T extends number ? string : boolean;

let v0: T0<5>; // let v0: string
let v1: T0<'text'>; // let v1: boolean

type T1<T> = T extends number | string ? object : never;

let v2: T1<5>; // let v2: object
let v3: T1<'text'>; // let v3: object
let v4: T1<true>; // let v2: never

type T2<T> = T extends number ? 'Ok' : 'Oops';

let v5: T2<5>; // let v5: "Ok"
let v6: T2<'text'>; // let v6: "oops"

// вложенные условные типы

type T3<T> = T extends number ? 'IsNumber' : T extends string ? 'IsString' : 'Oops';

let v7: T3<5>; // let v7: "IsNumber"
let v8: T3<'text'>; // let v8: "IsString"
let v9: T3<true>; // let v9: "Oops"
```

### Составляющие типы / Mapped Types

```ts
type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false
};
```

### Индексные типы

```ts
type Age = Person['age'];
type I1 = Person['age' | 'name'];

type AliveOrName = 'alive' | 'name';
type I3 = Person[AliveOrName];

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 }
];
type Person = (typeof MyArray)[number];
```

### Вывод типов в условном типе

Условные типы позволяют в блоке выражения объявлять переменные, тип которых будет устанавливать вывод типов. Переменная типа объявляется с помощью ключевого слова infer и, как уже говорилось, может быть объявлена исключительно в типе, указанном в блоке выражения расположенном правее оператора extends

```ts
type ParamType<T> = T extends (p: infer U) => void ? U : undefined;

function f0(param: number): void {}
function f1(param: string): void {}
function f2(): void {}
function f3(p0: number, p1: string): void {}
function f4(param: number[]): void {}

let v0: ParamType<typeof f0>; // let v0: number
let v1: ParamType<typeof f1>; // let v1: string
let v2: ParamType<typeof f2>; // let v2: {}
let v3: ParamType<typeof f3>; // let v3: undefined
let v4: ParamType<typeof f4>; // let v4: number[]. Oops, ожидалось тип number вместо number[]

// определяем новый тип, что бы разрешить последний случай

type WithoutArrayParamType<T> = T extends (p: (infer U)[]) => void
  ? U
  : T extends (p: infer U) => void
  ? U
  : undefined;

let v5: WithoutArrayParamType<typeof f4>; // let v5: number. Ok
```

Ограничение infer с помощью extends

Приме, когда нужно сделать тип который совместим только с типом string

```ts
type FirstNumberItem<T> = T extends [infer S, ...unknown[]]
  ? S extends number
    ? S
    : never
  : never;
```

Есть механизм позволяющий ограничивать переменные типа infer конкретным типом при помощи ключевого слова extends.

```ts
type FirstNumberItem<T> = T extends [infer S extends number, ...unknown[]] ? S : never;
```
