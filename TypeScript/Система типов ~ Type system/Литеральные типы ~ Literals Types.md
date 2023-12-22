> Литералы являются точной переменной, предоставляемой самим JavaScript

## Числовой литерал

это число или выражение, которое представляет число, и которое, по сути, является значением типа

```ts
let myNumber: 42;
```

здесь мы создали переменную с именем `myNumber`, которая принимает только одну переменную, буквальное значение которой равно `42`:

## Строковый литерал

```ts
let myString: "hello";
```

## Логический литерал

```ts
let myBoolean: true;
```

## Литеральный тип массива

это тип массива, для которого известны все элементы.

```ts
let myArray: [number, boolean] = [42, true];
```

## Литеральный тип объекта

это тип объекта, для которого известны все свойства.

```ts
let myObject: {name: string, age: number} = {name: "John", age: 30};
```

  
# Вывод

Довольно часто вы получаете сообщение об ошибке типа `Type string is not assignable to type 'foo'`. Следующий пример демонстрирует это:

```ts
function iTakeFoo(foo: 'foo') {}
const test = {
	someProp: 'foo'
};

iTakeFoo(test.someProp); // Error: Argument of type string is not assignable to parameter of type 'foo'

```

Это потому, что `test` выводится как `{ someProp: string }`, мы можем использовать утверждение простого типа, чтобы сообщить TypeScript литералы, которые вы хотите вывести:

```ts
function iTakeFoo(foo: 'foo') {}

// через as
const test = {
	someProp: 'foo' as 'foo'
};

// либо через const
const test = {
	someProp: 'foo'
} as const
  

iTakeFoo(test.someProp); // ok
```

Или используйте аннотации типов, чтобы помочь TypeScript вывести правильный тип:

```ts
function iTakeFoo(foo: 'foo') {}

type Test = {
	someProp: 'foo';
};

const test: Test = {
	// Предположим, что 'someProp' всегда 'foo'
	someProp: 'foo'
};

iTakeFoo(test.someProp); // ok
```

# Примеры

Типы перечислений TypeScript основаны на числах. Вы можете использовать типы объединения со строковыми литералами для имитации типа перечисления на основе строк, так же как и `CardinalDirection`, предложенный выше. Вы даже можете использовать следующие функции для генерации структуры `key: value`:

```ts
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
```

Затем вы можете использовать `keyof`, `typeof` для генерации типа объединения строки. Вот полный пример:

```ts
// Функция для создания списка строк, сопоставленных с `K: V`
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

// Создание K: V
const Direction = strEnum(['North', 'South', 'East', 'West']);

// Создание типа
type Direction = keyof typeof Direction;

// Прост в использовании
let sample: Direction;

sample = Direction.North; // Okay
sample = 'North'; // Okay
sample = 'AnythingElse'; // ERROR!
```