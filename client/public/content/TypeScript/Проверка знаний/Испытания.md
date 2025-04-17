### Pick

Реализуйте тип `MyPick<T, K>`, который выбирает только те свойства из объекта `T`, которые находятся в типе `K`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type PersonNameAndAge = MyPick<ExampleObject, 'name' | 'age'>; // Берет поля name и age из ExampleObject
// Результат: { name: string; age: number }
```

#### Реализация

```ts
type Pick<T, K extends keyof T> = {
  [Key in K]: T[Key];
};
```

- `type Pick<T, K extends keyof T>`: Здесь мы определяем обобщенный тип `Pick`, который принимает два параметра. `T` представляет исходный тип, из которого мы хотим выбрать свойства, а `K` представляет набор ключей, которые мы хотим выбрать из `T`. Ограничение `K extends keyof T` гарантирует, что ключи `K` являются действительными ключами для типа `T`.
- `{ [P in K]: T[P] }`: Это выражение определяет новый тип, который будет содержать только выбранные свойства. Мы используем цикл `in` для итерации по каждому ключу `P` из набора ключей `K`. Затем мы указываем тип значения для каждого ключа `P` как `T[P]`, что означает, что тип значения будет таким же, как тип значения для соответствующего ключа в исходном типе `T`.

---

### Exlude

Реализуйте тип `MyExclude<T, U>`, который исключает из `T` все типы, которые являются подтипами `U`.

```ts
type SomeType = string | number | boolean;

type MyExcludedType = MyExclude<SomeType, boolean>; // Исключает boolean из SomeType
// Результат: type MyExcludedType = string | number
```

#### Реализация
```ts
type MyExclude<T, U> = T extends U ? never : T;
```

В этом примере мы используем условный тип `T extends U ? never : T`, чтобы проверить, является ли тип `T` подтипом `U`. Если это так, то тип `never` возвращается, что означает, что `T` должен быть исключен из результирующего типа. Если `T` не является подтипом `U`, то `T` возвращается без изменений.

---

### Omit

Реализуйте тип `MyOmit<T, K>`, который удаляет из объекта `T` все свойства, перечисленные в `K`.

```ts
interface ExampleObject {
  id: string;
  username: string;
  password: string;
}

type UserWithoutId = MyOmit<ExampleObject, 'id'>; // Исключает поле id из ExampleObject
// Результат: { password: string; username: string }
```

#### Реализация

> 1 native ts

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key];
};
```

- `type MyOmit<T, K extends keyof T>`: Здесь мы объявляем обобщенный тип `MyOmit`, который принимает два параметра: `T` и `K`. `T` представляет исходный тип, из которого мы будем исключать свойства, а `K` представляет тип ключей, которые мы хотим исключить.

- `[Key in keyof T as Key extends K ? never : Key]: T[K]`: Это объявление нового типа, который будет содержать исключенные свойства. Здесь мы используем синтаксис `key in keyof T` для перебора всех ключей исходного типа `T`. Затем мы используем условное выражение `key extends K ? never : key`, чтобы определить, должны ли мы исключить текущий ключ `key`. Если ключ `key` является подтипом `K`, то мы используем тип `never`, чтобы исключить его из нового типа. В противном случае, мы оставляем ключ без изменений. Значение типа для каждого ключа `key` в новом типе будет `T[K]`, что означает, что свойство с ключом `key` будет иметь тип значения, соответствующего ключу `K` в исходном типе `T`.

> 2 with Pick and Exclude

```ts
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

- Внутри определения типа `MyOmit` мы используем два встроенных типа TypeScript: `Pick` и `Exclude`.

- `keyof T` возвращает объединение всех ключей (свойств) типа `T`. Это означает, что `keyof T` будет содержать все возможные свойства типа `T`.

- `Exclude<keyof T, K>` создает новый тип, исключая из `keyof T` все ключи, которые присутствуют в типе `K`. То есть, мы исключаем из объединения всех ключей типа `T` те ключи, которые указаны в типе `K`.

- Наконец, `Pick<T, Exclude<keyof T, K>>` используется для создания нового типа, который содержит только те свойства из типа `T`, которые не были исключены с помощью типа `K`. То есть, мы выбираем только те свойства из исходного типа `T`, которые не указаны в типе `K`.

> 3 with only Exclude

```ts
type MyOmit<T, K extends keyof T> = {
  [Key in Exclude<keyof T, K>]: T[Key];
};
```

---

### KebabToPascalCase

Реализуйте тип `CamelToKebabCase<T>`, который преобразует строку в `CamelCase` в строку в `Kebab-Case`.

```ts
type KebabCaseString = 'my-example-string';
type PascalCaseString = KebabToPascalCase<KebabCaseString>;
// Результат: 'MyExampleString'
```

#### Реализация

> 1

```ts
type KebabToPascalCase<T> = T extends `${infer A}-${infer B}${infer C}`
  ? `${Capitalize<A>}${Uppercase<B>}${KebabToPascalCase<C>}`
  : T;
```

- `T` - это обобщенный тип, который принимает входную строку в формате kebab-case.

- `T extends ${infer A}-${infer B}${infer C}` - это условие проверки типа, которое разбивает входную строку на три части: `A`, `B` и `C`. Они представляют собой части строки до первого дефиса, между первым и вторым дефисами и после второго дефиса соответственно.

- `? ${Capitalize<A>}${Uppercase<B>}${KebabToPascalCase<C>}` - это тернарный оператор, который определяет, что происходит, если условие `T extends ${infer A}-${infer B}${infer C}` истинно. В этом случае происходит рекурсивный вызов типа `KebabToPascalCase<C>`, чтобы преобразовать оставшуюся часть строки `C`. Затем используются функции `Capitalize` и `Uppercase` для преобразования `A` и `B` соответственно. Результатом является объединение этих трех частей в формате PascalCase.

- `: T` - это ветка альтернативы тернарного оператора, которая указывает, что происходит, если условие `T extends ${infer A}-${infer B}${infer C}` ложно. В этом случае возвращается исходная строка без изменений.

---

### KebabToCamel

Реализуйте тип `KebabToCamel<T>`, который преобразует строку в формате `kebab-case` в формат `CamelCase`.

```ts
type KebabCase = 'my-example-string';
type CamelCase = KebabToCamel<KebabCase>;
// Результат: myExampleString
```

#### Реализация

> 1

```ts
type KebabToCamel<T> = T extends `${infer A}-${infer B}${infer C}`
  ? `${A}${Uppercase<B>}${KebabToCamel<C>}`
  : T;
```

- `T extends ${infer A}-${infer B}${infer C}`
  Эта часть кода использует условный тип в TypeScript для проверки, соответствует ли тип `T` шаблону `${infer A}-${infer B}${infer C}`. Шаблон `${infer A}-${infer B}${infer C}` представляет собой строку, состоящую из трех частей, разделенных дефисом.

- `? ${A}${Uppercase<B>}${KebabToCamel<C>} : T;`
  Если тип `T` соответствует шаблону `${infer A}-${infer B}${infer C}`, то выполняется следующая часть кода. Здесь происходит преобразование строки из kebab-case в camelCase.

  - `${A}` представляет собой первую часть строки до первого дефиса и остается без изменений.
  - `Uppercase<B>` преобразует вторую часть строки в верхний регистр. Например, если вторая часть строки была "foo", то она будет преобразована в "FOO".
  - `KebabToCamel<C>` рекурсивно вызывает тип `KebabToCamel` для оставшейся части строки после первого дефиса. Это позволяет преобразовывать все остальные части строки из kebab-case в camelCase.

  Если тип `T` не соответствует шаблону `${infer A}-${infer B}${infer C}`, то возвращается исходный тип `T` без изменений.

---

### ScreamSnakeCase

Реализуйте тип `ScreamSnakeCaseKeys<T>`, который делает все ключи объекта `T` в верхнем регистре и преобразует их в формат `SCREAM_SNAKE_CASE`.

```ts
type MyString = 'hello_world_example';
type ScreamSnakeCase = ScreamSnakeCase<MyString>;
// Результат: 'HELLO_WORLD_EXAMPLE'
```

#### Реализация

> 1

```ts
type ScreamSnakeCase<T extends string> = T extends `${infer A}_${infer B}`
  ? `${Uppercase<A>}_${ScreamSnakeCase<B>}`
  : Uppercase<T>;
```

- `type ScreamSnakeCase<T extends string> = ...`: Здесь мы объявляем тип `ScreamSnakeCase`, который принимает обобщенный параметр `T`, ограниченный типом `string`. Это означает, что `T` должен быть строковым типом.

- `T extends ${infer A}_${infer B} ? ... : ...`: Это условное выражение, которое проверяет, соответствует ли `T` шаблону `${infer A}_${infer B}`. Шаблон `${infer A}_${infer B}` означает, что `T` должен быть в формате "что-то*еще*что-то". Если `T` соответствует этому шаблону, выполняется код после `?`, иначе выполняется код после `:`.

- `${Uppercase<A>}_${ScreamSnakeCase<B>}`: Если `T` соответствует шаблону `${infer A}_${infer B}`, то мы преобразуем `A` в верхний регистр с помощью встроенного TypeScript-оператора `Uppercase`. Затем мы рекурсивно вызываем тип `ScreamSnakeCase` для `B` и объединяем результат с преобразованным `A` с помощью символа `_`. Это позволяет обрабатывать строки с несколькими частями, разделенными символом `_`.

- `Uppercase<T>`: Если `T` не соответствует шаблону `${infer A}_${infer B}`, то мы просто преобразуем `T` в верхний регистр с помощью `Uppercase`. Это применяется к частям строки, которые не содержат символ `_`.

---

### LastInArray

Реализуйте тип `LastInArray<T>`, который извлекает последний элемент из массива `T`.

```ts
type ExampleArray = [1, 2, 3];

type LastElement = LastInArray<ExampleArray>;
// Результат: 3
```

#### Реализация

```ts
type LastInArray<T extends any[]> = T extends [...infer _, infer LastElement] ? LastElement : never;
```

- `T extends any[]`: Это ограничение типа, которое гарантирует, что `T` является массивом типов. Это означает, что `T` должен быть кортежем или массивом в TypeScript.

- `T extends [...infer _, infer LastElement] ? LastElement : never`: Это условный тип, который проверяет, можно ли разложить `T` в массив с помощью оператора расширения (`...`). Если это возможно, то тип `T` будет разложен в массив `infer _` (любые элементы, которые мы не интересуемся) и `infer LastElement` (последний элемент, который нас интересует). Затем условный тип возвращает `LastElement` в качестве результата. Если разложение невозможно (например, если `T` не является массивом), то возвращается тип `never`.

---

### LastEntryInObject

Реализуйте тип `LastEntryInObject<T>`, который извлекает тип последнего элемента записи (entry) из объекта `T`. Запись в объекте представляет собой пару ключ-значение.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type LastEntryObject = LastEntryInObject<ExampleObject>;
// Результат: ['address', string]
```

#### Реализация

```ts
type LastEntryInObject<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
```

1. `type LastEntryInObject<T> = { ... }`: Здесь мы объявляем новый тип `LastEntryInObject<T>`, который будет зависеть от обобщённого типа `T`.

2. `[K in keyof T]: [K, T[K]]`: Эта часть кода представляет собой индексную сигнатуру, которая перебирает все свойства `K` в типе `T` и создаёт новый тип, состоящий из пар ключ-значение `[K, T[K]]`. То есть, для каждого свойства `K` в `T`, мы создаём пару `[K, T[K]]`.

3. `{ ... }[keyof T]`: Здесь мы обращаемся к типу, определённому в предыдущем шаге, и выбираем одно из его свойств. `keyof T` возвращает объединение всех ключей `K` в типе `T`. Таким образом, мы выбираем одну из пар ключ-значение из типа, созданного в предыдущем шаге.

---

### FirstEntryInObject

Реализуйте тип `FirstEntryInObject<T>`, который извлекает тип первого элемента записи (entry) из объекта `T`. Запись в объекте представляет собой пару ключ-значение.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type FirstEntryObject = FirstEntryInObject<ExampleObject>;
// Результат: ['name', string]
```

**Примечение:** Реализуйте задачу без Utility Types
#### Реализация

```ts
type FirstEntryInObject<T> = T extends { [K: string]: infer V }
  ? [Extract<keyof T, string>, V]
  : never;
```

1. `T extends { [K: string]: infer V }`
   Здесь мы используем условный тип `T extends { [K: string]: infer V }`, чтобы проверить, является ли тип `T` объектом с индексной сигнатурой, где ключи являются строками, а значения могут быть любого типа. Если это условие выполняется, то тип `T` сопоставляется с объектом, и тип значения извлекается в переменную `V` с помощью ключевого слова `infer`.

2. `[Extract<keyof T, string>, V]`
   Если условие `T extends { [K: string]: infer V }` истинно, то мы создаем кортеж `[Extract<keyof T, string>, V]`. Здесь `keyof T` извлекает все ключи из типа `T`, а `Extract<keyof T, string>` фильтрует только те ключи, которые являются строками. Таким образом, первый элемент кортежа будет типом ключа извлеченного объекта, а второй элемент будет типом значения, извлеченного с помощью индексной сигнатуры.

3. `: never`
   Если условие `T extends { [K: string]: infer V }` не выполняется, то тип `FirstEntryInObject<T>` будет `never`. Это означает, что если `T` не является объектом с индексной сигнатурой, то тип `FirstEntryInObject<T>` будет недоступен или неопределен.

Таким образом, тип `FirstEntryInObject<T>` позволяет извлекать первую запись (первый ключ и соответствующее значение) из объекта с индексной сигнатурой, где ключи являются строками. Если тип `T` не соответствует этому условию, то тип `FirstEntryInObject<T>` будет `never`.

---

### Flatten

Реализуйте тип `Flatten<T>`, который "разворачивает" вложенные массивы в массиве `T` до одного уровня глубины.

```ts
type ExampleArray = [1, [2, 3], [[4]], [[[5]]]];

type FlattenedArray = Flatten<ExampleArray>;
// Результат: [1, 2, 3, [4], [[5]]]
```

#### Реализация

```ts
type Flatten<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...Flatten<First>, ...Flatten<Rest>]
    : [First, ...Flatten<Rest>]
  : T;
```

1. `type Flatten<T extends any[]>`: Это объявление типа `Flatten`, который принимает обобщенный параметр `T`, ограниченный типом `any[]`. Это означает, что `T` должен быть массивом любого типа.

2. `T extends [infer First, ...infer Rest] ? ... : ...`: Это условное выражение, которое проверяет, является ли `T` массивом с хотя бы одним элементом. Если это так, то выполняется первая часть условия, иначе выполняется вторая часть.

3. `First extends any[] ? ... : ...`: Это еще одно условное выражение, которое проверяет, является ли `First` элементом массива. Если это так, то выполняется первая часть условия, иначе выполняется вторая часть.

4. `...Flatten<First>, ...Flatten<Rest>`: Если `First` является массивом, то рекурсивно вызывается тип `Flatten` для `First` и `Rest`, а затем объединяются результаты с помощью оператора `...`. Это позволяет "разглаживать" вложенные массивы.

5. `[First, ...Flatten<Rest>]`: Если `First` не является массивом, то он добавляется в результат как отдельный элемент, а затем рекурсивно вызывается тип `Flatten` для `Rest`. Это позволяет сохранить не-массивные элементы в одномерном массиве.

6. `: T;`: Если `T` не является массивом с хотя бы одним элементом, то возвращается исходный тип `T` без изменений.

---

### Trim

Реализуйте тип `Trim<S>`, который удаляет пробелы в начале и конце строки `S`.

```ts
type ExampleString = '   Hello, TypeScript!   ';

type TrimmedString = Trim<ExampleString>;
// Результат: 'Hello, TypeScript!'
```

#### Реализация

```ts
type Trim<S extends string> = S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;
```

1. `S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;`
   Эта строка является условным выражением типа. Она проверяет, соответствует ли тип `S` шаблону, состоящему из пробела и переменной `Rest`, или шаблону, состоящему из переменной `Rest` и пробела. Если условие выполняется, то вызывается рекурсивный вызов `Trim<Rest>`, иначе возвращается исходный тип `S`.

2. `S extends ` ${infer Rest}` | `${infer Rest} ` ? Trim<Rest> : S;`
   Здесь используется шаблон строк `${infer Rest}` для извлечения остатка строки после пробела. Если строка `S` начинается с пробела, то `Rest` будет содержать остаток строки после пробела. Аналогично, если строка `S` заканчивается пробелом, то `Rest` будет содержать остаток строки до пробела.

3. `Trim<Rest>`
   Если условие выполняется, то вызывается рекурсивный вызов `Trim<Rest>`. Это означает, что функция `Trim` будет вызываться рекурсивно до тех пор, пока не будет достигнута строка без пробелов.

4. `: S;`
   Если условие не выполняется, то возвращается исходный тип `S` без изменений.

---

### ObjectKeys

Реализуйте тип `ObjectKeys<T>`, который извлекает все ключи из объекта `T` в виде объединения строковых литералов.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type ObjectKeysExample = ObjectKeys<ExampleObject>;
// Результат: 'name' | 'age' | 'address'
```

#### Реализация

```ts
type ObjectKeys<T> = T extends object ? keyof T : never;
```

1. `type ObjectKeys<T>` - это объявление нового типа с именем `ObjectKeys`, который принимает один параметр типа `T`.

2. `T extends object ? keyof T : never` - это условное выражение, которое проверяет, является ли тип `T` объектом. Если `T` является объектом, то возвращается тип `keyof T`, который представляет объединение всех ключей объекта `T`. Если `T` не является объектом, то возвращается тип `never`.

---

### StringToUnion

Реализуйте тип `StringToUnion<S>`, который преобразует строку `S` в объединение символов строки.

```ts
type ExampleString = 'hello';

type ExampleUnion = StringToUnion<ExampleString>;
// Результат: 'h' | 'e' | 'l' | 'o'
```

#### Реализация

```ts
type StringToUnion<S extends string> = S extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never;
```

1. `type StringToUnion<S extends string> = ...`
   Здесь мы объявляем тип `StringToUnion`, который принимает обобщенный параметр `S`, ограниченный типом `string`. Это означает, что `S` должен быть строковым типом.

2. `S extends `${infer First}${infer Rest}` ? ... : never;`
   Здесь мы используем условный оператор `extends` для проверки, можно ли разделить строку `S` на две части: первый символ `First` и оставшуюся часть `Rest`. Мы используем шаблонную строку с помощью обратных кавычек и двух обобщенных параметров `${infer First}` и `${infer Rest}`.

3. `First | StringToUnion<Rest>`
   Если строка `S` может быть разделена на `First` и `Rest`, то мы возвращаем объединение типов `First | StringToUnion<Rest>`. Это означает, что тип `StringToUnion<S>` будет состоять из `First` и всех остальных типов, полученных рекурсивным вызовом `StringToUnion` для `Rest`.

4. `: never;`
   Если строка `S` не может быть разделена на `First` и `Rest`, то мы возвращаем тип `never`. Это означает, что тип `StringToUnion<S>` будет пустым типом.

---

### UnionToDifference

Реализуйте тип `UnionToDifference<U>`, который извлекает только те члены `U`, которые находятся в одном типе объединения и не принадлежат другим типам.

```ts
type ExampleUnion = 'a' | 'b' | 'c' | 'b' | 'd';

type ExampleDifference = UnionToDifference<ExampleUnion>;
// Результат: 'a' | 'c' | 'd'
```

#### Реализация

```ts
type UnionToDifference<U> = (U extends any ? (arg: U) => void : never) extends (
  arg: infer I
) => void
  ? Exclude<U, I>
  : never;
```

1. `U` - это обобщенный тип, который представляет объединение нескольких типов.

2. `(U extends any ? (arg: U) => void : never)` - это условный тип, который проверяет, можно ли присвоить аргумент типа `U` функции `(arg: U) => void`. Если это возможно для любого типа `U`, то возвращается функция `(arg: U) => void`, иначе возвращается тип `never`.

3. `(arg: infer I) => void` - это тип функции, который принимает аргумент типа `I` и не возвращает ничего (`void`). Здесь `infer I` используется для вывода типа `I` из аргумента функции.

4. `Exclude<U, I>` - это встроенный TypeScript-тип, который создает новое объединение типов, исключая из типа `U` все типы, которые являются подтипами `I`. Это означает, что `Exclude<U, I>` содержит только те типы из `U`, которые не могут быть присвоены типу `I`.

5. `Exclude<U, I>` возвращается, если `(U extends any ? (arg: U) => void : never)` действительно является типом `(arg: infer I) => void`. В противном случае возвращается тип `never`.

---

### CapitalizeKeys

Реализуйте тип `CapitalizeKeys<T>`, который делает все ключи объекта `T` в верхнем регистре.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: string;
}

type CapitalizedKeysObject = CapitalizeKeys<ExampleObject>;
/*
Результат:
{
  NAME: string;
  AGE: number;
  ADDRESS: string;
}
*/
```

#### Реализация

```ts
type CapitalizeKeys<T> = {
  [K in keyof T as Capitalize<string & K>]: T[K];
};
```

1. `type CapitalizeKeys<T> = { ... };`: Здесь мы объявляем новый тип `CapitalizeKeys<T>`, который будет преобразовывать ключи объекта `T`.

2. `[K in keyof T as Capitalize<string & K>]: T[K];`: Это часть кода, где мы определяем новые ключи для объекта `CapitalizeKeys<T>`. Здесь используется конструкция `keyof T`, которая получает все ключи типа `T`. Затем мы используем оператор `as` для определения нового ключа, который будет результатом применения функции `Capitalize` к каждому ключу `K`. Функция `Capitalize` преобразует первую букву строки в верхний регистр.

   - `Capitalize<string & K>`: Здесь мы применяем функцию `Capitalize` к типу `string & K`. Тип `string & K` представляет собой пересечение типа `string` и типа `K`. В результате получается строковый тип, который будет преобразован в верхний регистр.

   - `: T[K];`: Здесь мы указываем, что значение нового ключа будет соответствовать значению исходного ключа `K` в объекте `T`.
   
---

### DeepReadonly

Реализуйте тип `DeepReadonly<T>`, который делает все свойства вложенных объектов в `T` только для чтения (т.е. неизменяемыми).

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type ReadonlyObject = DeepReadonly<ExampleObject>;
/*
Результат:
{
  readonly name: string;
  readonly age: number;
  readonly address: {
    readonly street: string;
    readonly city: string;
  };
}
*/
```

#### Реализация

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

1. `DeepReadonly<T>` - это обобщенный тип, который принимает тип `T` в качестве параметра. Он будет использоваться для преобразования типа `T` в его неизменяемую версию.

2. `[K in keyof T]` - это цикл по всем ключам `K` типа `T`. `keyof T` возвращает объединение всех ключей типа `T`, а `[K in keyof T]` означает, что мы выполняем итерацию по каждому ключу типа `T`.

3. `T[K] extends object ? DeepReadonly<T[K]> : T[K]` - это условное выражение, которое проверяет, является ли тип значения `T[K]` объектом. Если `T[K]` является объектом, то мы рекурсивно применяем `DeepReadonly` к типу `T[K]`, чтобы преобразовать его свойства в неизменяемые. В противном случае, если `T[K]` не является объектом, мы оставляем его без изменений.

4. `readonly [K in keyof T]` - это синтаксис TypeScript для создания неизменяемых (только для чтения) свойств объекта. Он указывает, что все свойства типа `T` должны быть только для чтения.

---

### DeepReadonlyArray

Реализуйте тип `DeepReadonlyArray<T>`, который делает все элементы вложенных массивов в типе `T` только для чтения (т.е. неизменяемыми), включая все уровни вложенности.

```ts
type ExampleArray = [string, [number, boolean]];

type ReadonlyArray = DeepReadonlyArray<ExampleArray>;
// Результат: readonly [readonly string, readonly [readonly number, readonly boolean]]
```

#### Реализация

```ts
type DeepReadonlyArray<T> = ReadonlyArray<
  T[number] extends Array<any> ? DeepReadonlyArray<T[number]> : T[number]
>;
```

1. `type DeepReadonlyArray<T> = ...` - Здесь мы определяем новый тип `DeepReadonlyArray<T>`, который принимает один параметр типа `T`. Этот параметр `T` будет представлять тип элементов в исходном массиве.

2. `ReadonlyArray<...>` - `ReadonlyArray` - это встроенный в TypeScript тип, который представляет неизменяемый массив. Мы используем его в определении типа `DeepReadonlyArray<T>`, чтобы создать неизменяемый массив.

3. `T[number]` - `T[number]` - это индексный доступ к типу `T`. Он позволяет получить тип элемента, содержащегося в `T`. Например, если `T` - это `number[]`, то `T[number]` будет представлять тип `number`.

4. `T[number] extends Array<any> ? DeepReadonlyArray<T[number]> : T[number]` - Это условное выражение, которое проверяет, является ли тип `T[number]` массивом. Если это так, то мы рекурсивно применяем тип `DeepReadonlyArray` к типу `T[number]`, чтобы создать глубоко неизменяемый массив. Если `T[number]` не является массивом, то мы просто используем `T[number]` без изменений.

---

### DeepPick

Реализуйте тип `DeepPick<T, K>`, который выбирает только те свойства из объекта `T`, указанные в пути к свойству `K`. Путь к свойству `K` представлен в виде точечной нотации, например, "path.to.property".

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
  tags: string[];
}

type PickedObject = DeepPick<ExampleObject, 'address.city' | 'tags'>;
// Результат: { address: { city: string }; tags: string[]; }
```

#### Реализация

```ts
type IDeepPick<T, K extends string> = K extends `${infer FirstKey}.${infer RestKeys}`
  ? FirstKey extends keyof T
    ? { [P in FirstKey]: IDeepPick<T[FirstKey], RestKeys> }
    : never
  : K extends keyof T
  ? { [P in K]: T[K] }
  : never;
```

1. `type IDeepPick<T, K extends string> = ...` - Здесь определяется тип `IDeepPick` с двумя параметрами: `T` и `K`. Параметр `T` представляет тип данных, из которого мы будем выбирать свойства, а параметр `K` представляет строку, которая указывает путь к свойству, которое мы хотим извлечь.

2. `K extends `${infer FirstKey}.${infer RestKeys}` ? ... : ...` - Это условное выражение, которое проверяет, является ли значение параметра `K` составным путем, разделенным точками. Если это так, то код в блоке `?` будет выполнен, в противном случае будет выполнен код в блоке `:`.

3. `FirstKey extends keyof T ? ... : never` - Здесь проверяется, является ли `FirstKey` ключом в типе `T`. Если это так, то код в блоке `?` будет выполнен, в противном случае будет возвращен тип `never`.

4. `{ [P in FirstKey]: IDeepPick<T[FirstKey], RestKeys> }` - Это рекурсивное определение типа, которое создает новый объект типа, содержащий только одно свойство `FirstKey`, а значение этого свойства будет типом `IDeepPick`, примененным к типу `T[FirstKey]` (т.е. типу значения, соответствующего ключу `FirstKey` в `T`), и `RestKeys` (оставшаяся часть пути).

5. `K extends keyof T ? ... : never` - Если значение параметра `K` не является составным путем, то здесь проверяется, является ли `K` ключом в типе `T`. Если это так, то код в блоке `?` будет выполнен, в противном случае будет возвращен тип `never`.

6. `{ [P in K]: T[K] }` - Здесь создается новый объект типа, содержащий только одно свойство `K`, а значение этого свойства будет типом значения, соответствующего ключу `K` в `T`.

Таким образом, тип `IDeepPick` позволяет выбирать и извлекать свойства из вложенных структур данных, указывая путь к свойству в виде строки разделенной точками. Если путь состоит из нескольких частей, то тип `IDeepPick` будет рекурсивно применяться для каждой части пути, чтобы извлечь вложенные свойства.

---

### PromiseRace

Реализуйте тип `PromiseRace<T>`, который принимает массив промисов типа `T` и возвращает промис, который разрешается с результатом первого промиса, который завершается (либо разрешается, либо отклоняется).

```ts
type Promises = [Promise<string>, Promise<number>, Promise<boolean>];

type ResultPromise = PromiseRace<Promises>;
// Результат: Promise<string | number | boolean>
```

#### Реализация

```ts
type PromiseRace<T extends Promise<any>[]> = T extends Array<infer R> ? Promise<R> : never;
```

1. `type PromiseRace<T extends Promise<any>[]>` - Это объявление типа `PromiseRace`, которое принимает тип `T`, ограниченный массивом промисов (`T extends Promise<any>[]`).

2. `T extends Array<infer R> ? Promise<R> : never` - Это условное выражение, которое проверяет, является ли `T` массивом (`T extends Array<infer R>`). Если это так, то тип `PromiseRace<T>` будет `Promise<R>`, где `R` - это тип элемента массива `T`. Если `T` не является массивом, то тип `PromiseRace<T>` будет `never`.

Таким образом, `PromiseRace<T>` принимает массив промисов `T` и возвращает новый промис, который разрешается с результатом первого завершившегося промиса из массива `T`. Если `T` не является массивом, то тип `PromiseRace<T>` будет `never`.

---

### Diff

Реализуйте тип `Diff<T, U>`, который вычисляет разницу между типами `T` и `U`, т.е. возвращает те члены `T`, которые не принадлежат типу `U`.

```ts
type T = 'a' | 'b' | 'c';
type U = 'b' | 'c' | 'd';

type Difference = Diff<T, U>;
// Результат: 'a'
```

#### Реализация

```ts
type Diff<T, U> = T extends U ? never : T;
```

Предположим, у нас есть два типа: `T` и `U`. Когда мы используем `Diff<T, U>`, происходит проверка, является ли тип `T` подтипом или эквивалентным типом `U`. Если это так, то условие `T extends U` будет истинным, и результатом будет тип `never`. Тип `never` представляет невозможность наличия значений и используется, когда функция или выражение никогда не завершается или не возвращает значение.

Если же тип `T` не является подтипом или эквивалентным типом `U`, то условие `T extends U` будет ложным, и результатом будет сам тип `T`. Это означает, что если `T` и `U` различаются, то `Diff<T, U>` будет представлять тип `T`.

Таким образом, обобщенный тип `Diff<T, U>` позволяет нам получить разницу между двумя типами `T` и `U`, представляя только те части `T`, которые не являются подтипами или эквивалентными типу `U`.

---

### FunctionParams

Реализуйте тип `FunctionParams<T>`, который извлекает тип параметров функции `T`.

```ts
type ExampleFunction = (a: number, b: string) => void;

type Params = FunctionParams<ExampleFunction>;
// Результат: [number, string]
```

#### Реализация
```ts
type FunctionParams<T> = T extends (...args: infer Params) => any ? Params : never;
```

1. `type FunctionParams<T> = ...` - Здесь мы объявляем обобщенный тип `FunctionParams`, который принимает тип `T` в качестве параметра.

2. `T extends (...args: infer Params) => any ? Params : never` - Это условное выражение, которое проверяет, является ли тип `T` функцией. Если `T` является функцией, то мы извлекаем типы ее аргументов и присваиваем их переменной `Params`. Если `T` не является функцией, то тип `never` возвращается.

3. `(...args: infer Params) => any` - Это тип функции, который описывает функцию с аргументами типа `Params` и возвращающую значение типа `any`. Здесь `...args` представляет собой синтаксис rest-параметра, который позволяет функции принимать переменное количество аргументов.

4. `? Params : never` - Это условный оператор, который возвращает тип `Params`, если `T` является функцией, иначе возвращает тип `never`. Тип `never` представляет собой тип, который никогда не может возникнуть, и обычно используется для обозначения недостижимого кода или ошибок компиляции.

---

### ReplaceKeys

Реализуйте тип `ReplaceKeys<T, U>`, который заменяет все ключи типа `T` на соответствующие ключи типа `U`.

```ts
interface ExampleObject {
  name: string;
  age: number;
}

type ReplacedObject = ReplaceKeys<ExampleObject, 'username' | 'years'>;
/*
Результат:
{
  username: string;
  years: number;
}
*/
```

#### Реализация
```ts
type ReplaceKeys<T, U extends keyof T, NewKey = string> = {
  [K in keyof T as K extends U ? NewKey : K]: T[K];
};
```

- `ReplaceKeys<T, U extends keyof T, NewKey = string>` - это объявление шаблона типа `ReplaceKeys`. Он принимает три параметра:

  - `T` - тип объекта, ключи которого будут заменены.
  - `U` - тип ключа, который будет заменен.
  - `NewKey` - тип нового ключа, на который будет заменен ключ `U`. По умолчанию установлен тип `string`.

- `{ [K in keyof T as K extends U ? NewKey : K]: T[K] }` - это выражение, которое определяет новый тип, полученный путем замены ключей в объекте типа `T`.

  - `K in keyof T` - это цикл по всем ключам `K` в объекте типа `T`.
  - `K extends U ? NewKey : K` - это условное выражение, которое проверяет, является ли текущий ключ `K` равным `U`. Если это так, то ключ `K` заменяется на `NewKey`, иначе ключ остается без изменений.
  - `: T[K]` - это тип значения, соответствующего ключу `K` в объекте типа `T`. Он остается неизменным.

---

### Promisify

Реализуйте тип `Promisify<T>`, который преобразует тип функции в тип функции, возвращающей промис.

```ts
type ExampleFunction = (a: number, b: string) => void;

type PromisifiedFunction = Promisify<ExampleFunction>;
// Результат: (a: number, b: string) => Promise<void>
```

#### Реализация
```ts
type Promisify<T> = T extends (...args: infer Params) => infer Result
  ? (...args: Params) => Promise<Result>
  : never;
```

1. `T` - это обобщенный тип, который будет передан в `Promisify<T>`. Он может быть любым типом, но в данном случае ожидается, что `T` будет функцией.

2. `T extends (...args: infer Params) => infer Result` - это условие, которое проверяет, является ли тип `T` функцией. Если это так, то условие выполняется, и мы переходим к следующей части.

3. `(...args: Params) => Promise<Result>` - это тип, который будет возвращен, если условие в пункте 2 истинно. Он представляет собой функцию, которая принимает аргументы типа `Params` и возвращает `Promise<Result>`. Здесь `Params` - это кортеж типов аргументов функции `T`, а `Result` - это тип возвращаемого значения функции `T`.

4. `: never` - это тип, который будет возвращен, если условие в пункте 2 ложно. В данном случае, если `T` не является функцией, то тип `never` будет возвращен.

---

### PromiseAll

Реализуйте тип `PromiseAll<T>`, который принимает массив промисов типа `T` и возвращает промис, который разрешается в массив результатов соответствующих промисов.

```ts
type Promises = [Promise<string>, Promise<number>, Promise<boolean>];

type ResultPromise = PromiseAll<Promises>;
// Результат: Promise<[string, number, boolean]>
```

<details><summary>Подсказка</summary>
Для реализации следует использовать инференс типа `infer` для вывода типа результата промиса `R`. Затем используя манипуляции с типами, создать новый массив
</details>

#### Реализация
```ts
type PromiseAll<T extends Promise<any>[]> = Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : never;
}>;
```

Давайте разберем код по частям:

```typescript
type PromiseAll<T extends Promise<any>[]> = ...
```

Здесь мы определяем обобщенный тип `PromiseAll`, который принимает массив промисов `T`. `T` должен быть массивом промисов, где каждый промис может иметь любой тип значения.

```typescript
Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : never;
}>;
```

Эта часть определяет тип значения, возвращаемого `PromiseAll`. Мы используем `Promise<...>` для определения, что возвращаемое значение является промисом. Внутри `Promise<...>` мы используем объект типа, который будет иметь свойства, соответствующие индексам массива `T`.

```typescript
[K in keyof T]: T[K] extends Promise<infer R> ? R : never;
```

Здесь мы используем индексный тип `[K in keyof T]`, чтобы пройтись по каждому индексу массива `T` и определить тип значения для каждого индекса.

`T[K] extends Promise<infer R> ? R : never` - это условное выражение, которое проверяет, является ли элемент массива `T[K]` промисом. Если это так, то тип значения `R` будет извлечен из промиса с помощью ключевого слова `infer`. В противном случае, если `T[K]` не является промисом, тип значения будет `never`.

Таким образом, в итоге `PromiseAll` возвращает промис, который разрешается в массив значений, соответствующих разрешенным значениям исходных промисов. Каждое значение в массиве будет иметь тип `R`, который является типом значения, извлеченным из соответствующего промиса.

---

### PromisifyFunction

Реализуйте тип `PromisifyFunction<T>`, который преобразует тип функции `T` в тип функции, возвращающей промис с типом возвращаемого значения функции `T`.

```ts
type ExampleFunction = (a: number, b: string) => void;

type PromisifiedFunction = PromisifyFunction<ExampleFunction>;
// Результат: (a: number, b: string) => Promise<void>
```

#### Реализация
```ts
type PromisifyFunction<T> = (...args: Parameters<T>) => Promise<ReturnType<T>>;
```

1. `type PromisifyFunction<T>` - это объявление нового типа с именем `PromisifyFunction`, который принимает один параметр типа `T`.

2. `(...args: Parameters<T>)` - это сигнатура функции, которая принимает аргументы, соответствующие параметрам функции `T`. `Parameters<T>` - это встроенный тип TypeScript, который извлекает типы параметров из функции `T`.

3. `=> Promise<ReturnType<T>>` - это тип возвращаемого значения функции `PromisifyFunction`. `ReturnType<T>` - это встроенный тип TypeScript, который извлекает тип возвращаемого значения из функции `T`. Здесь мы указываем, что функция `PromisifyFunction` будет возвращать промис, содержащий тип возвращаемого значения функции `T`.

Таким образом, `PromisifyFunction<T>` принимает функцию `T` и преобразует ее в асинхронную функцию, которая возвращает промис с типом, соответствующим возвращаемому значению функции `T`.

---

### NonNullableKeys

Реализуйте тип `NonNullableKeys<T>`, который извлекает ключи объекта `T`, значения которых не могут быть `null` или `undefined`.

```ts
interface ExampleObject {
  name: string | null;
  age: number | undefined;
  address: string;
}

type NonNullableKeysObject = NonNullableKeys<ExampleObject>;
// Результат: 'address'
```

#### Реализация
```ts
type NonNullableKeys<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : K;
}[keyof T];
```

1. `type NonNullableKeys<T> = ...` - Здесь мы объявляем новый тип `NonNullableKeys<T>`, который будет принимать параметр типа `T`.

2. `[K in keyof T]: ...` - Это цикл по всем ключам `K` объекта `T`. `keyof T` возвращает объединение всех ключей объекта `T`.

3. `T[K] extends null | undefined ? never : K` - Здесь мы проверяем, является ли тип значения `T[K]` `null` или `undefined`. Если это так, то возвращаем тип `never`, который представляет недостижимый тип. В противном случае, возвращаем сам ключ `K`.

4. `{...}[keyof T]` - После цикла мы получаем тип, который содержит все значения, возвращенные на предыдущем шаге. Затем мы используем индексный доступ `[keyof T]`, чтобы получить объединение всех значений типа.

---

### DeepPartialArray

Реализуйте тип `DeepPartialArray<T>`, который делает все элементы вложенных массивов в `T` необязательными (делает их тип `undefined | T`).

```ts
type ExampleArray = [string, [number, boolean]];

type PartialArray = DeepPartialArray<ExampleArray>;
// Результат: [string?, [number?, boolean?]]
```

#### Реализация
```ts
type DeepPartialArray<T> = T extends (infer Element)[]
  ? DeepPartial<Element>[]
  : T extends readonly (infer Element)[]
  ? readonly DeepPartial<Element>[]
  : never;
```

1. `T extends (infer Element)[] ? DeepPartial<Element>[] : ...`
   В этой части кода мы проверяем, является ли тип `T` массивом. Если это так, то мы продолжаем с `DeepPartial<Element>[]`, где `Element` - это тип элемента массива `T`. `infer` используется для вывода типа элемента массива.

2. `DeepPartial<Element>[]`
   Здесь мы применяем рекурсивное определение типа `DeepPartial` к каждому элементу массива `T`. `DeepPartial` - это другой тип, который глубоко копирует каждый элемент массива.

3. `T extends readonly (infer Element)[] ? readonly DeepPartial<Element>[] : ...`
   Эта часть кода аналогична предыдущей, но проверяет, является ли тип `T` неизменяемым (readonly) массивом. Если это так, то возвращается `readonly DeepPartial<Element>[]`.

4. `never`
   Если тип `T` не является массивом или неизменяемым массивом, то возвращается тип `never`. `never` представляет собой тип, который никогда не может быть достигнут, и обычно используется для обработки непредвиденных ситуаций или ошибок.

---

### JoinStrings

Реализуйте тип `JoinStrings<T>` для объединения всех строковых литералов из типа `T` в единую строку.

```ts
type ExampleType = 'Hello' | ' ' | 'World' | '!';

type JoinedString = JoinStrings<ExampleType>;
// Результат: 'Hello World!'
```

#### Реализация
```ts
type JoinStrings<T> = T extends string ? `${T}` : never;
```

1. `type JoinStrings<T>`: Это объявление условного типа с именем `JoinStrings`, который принимает один параметр типа `T`.

2. `T extends string ? ${T} : never;`: Это условное выражение, которое проверяет, является ли тип `T` подтипом `string`. Если это так, то тип `JoinStrings<T>` будет равен шаблонной строке `${T}`. В противном случае, тип `JoinStrings<T>`будет равен`never`.

3. `${T}`: Это шаблонная строка, которая используется для объединения типа `T` со строкой. В результате, если `T` является строковым типом, то `JoinStrings<T>` будет равен типу, представленному шаблонной строкой `${T}`. Например, если `T` равно `"hello"`, то `JoinStrings<T>` будет равен типу `"hello"`.

4. `never`: Это тип `never`, который представляет недостижимое значение. Если `T` не является подтипом `string`, то `JoinStrings<T>` будет равен `never`. Это означает, что для неподходящих типов `T` нельзя создать экземпляр типа `JoinStrings<T>`.

### Prop

Реализуйте тип `Prop<T, K>`, который извлекает тип значения свойства `K` из типа `T`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  address: {
    street: string;
    city: string;
  };
}

type AddressStreet = Prop<ExampleObject, 'address.street'>;
// Результат: string
```

#### Реализация
```ts
type Prop<T, K extends keyof any> = K extends keyof T ? T[K] : never;
```

1. `T` - это обобщенный параметр, который представляет тип объекта, для которого мы хотим получить свойство.
2. `K extends keyof any` - это обобщенный параметр, который представляет ключ свойства, которое мы хотим получить из объекта `T`. Ограничение `keyof any` означает, что `K` может быть любым ключом, который может существовать в любом типе.

Теперь давайте рассмотрим тело типа `Prop<T, K extends keyof any>`:

1. `K extends keyof T` - это условие проверки, которое проверяет, является ли `K` ключом в типе `T`. Если это так, то тип `T[K]` будет возвращен.
2. `T[K]` - это обращение к свойству `K` в типе `T`. Если `K` является ключом в типе `T`, то тип `T[K]` будет возвращен. Это означает, что тип `Prop<T, K>` будет равен типу значения свойства `K` в объекте `T`.
3. `never` - это альтернативное значение, которое будет возвращено, если `K` не является ключом в типе `T`. Если `K` не является ключом в типе `T`, то тип `Prop<T, K>` будет равен `never`.

Таким образом, тип `Prop<T, K>` позволяет получить тип значения свойства `K` из объекта `T`. Если `K` не является ключом в типе `T`, то тип `never` будет возвращен. Это полезно, когда мы хотим получить тип конкретного свойства из объекта, но не знаем, существует ли такое свойство в типе.

---

### Length

Реализуйте тип `Length<T>`, который определяет длину (количество элементов) типа `T`, подразумевая, что `T` может быть массивом или строкой.

```ts
type ExampleArray = [1, 2, 3, 4];

type ArrayLength = Length<ExampleArray>;
// Результат: 4

type ExampleString = 'Hello, TypeScript!';

type StringLength = Length<ExampleString>;
// Результат: 18
```

#### Реализация
```ts
type Length<T extends any[]> = T['length'];

type Length<T extends string> = T['length'];
```

1. `Length<T extends any[]>`:
   Этот тип принимает параметр `T`, который должен быть массивом (`T extends any[]`). Затем мы используем индексный доступ к свойству `length` массива `T`, чтобы получить его длину. Таким образом, тип `Length<T>` будет равен длине массива `T`.

   Например, если у нас есть тип `type MyArray = [number, string, boolean]`, мы можем использовать `Length<MyArray>` для получения типа, представляющего длину массива `MyArray`. В этом случае `Length<MyArray>` будет равен типу `3`, так как массив `MyArray` содержит три элемента.

2. `Length<T extends string>`:
   Этот тип принимает параметр `T`, который должен быть строкой (`T extends string`). Затем мы используем индексный доступ к свойству `length` строки `T`, чтобы получить ее длину. Таким образом, тип `Length<T>` будет равен длине строки `T`.

   Например, если у нас есть тип `type MyString = 'Hello'`, мы можем использовать `Length<MyString>` для получения типа, представляющего длину строки `MyString`. В этом случае `Length<MyString>` будет равен типу `5`, так как строка `MyString` содержит пять символов.

---

### OptionalKeys

Реализуйте тип `OptionalKeys<T>`, который извлекает ключи с необязательными свойствами из типа `T`.

```ts
interface ExampleObject {
  name: string;
  age?: number;
  address?: string;
}

type OptionalObjectKeys = OptionalKeys<ExampleObject>;
// Результат: 'age' | 'address'
```

#### Реализация
```ts
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];
```

1. `type OptionalKeys<T> = { ... }` - Здесь мы начинаем определение типа `OptionalKeys<T>`, который будет принимать обобщенный тип `T` в качестве параметра.

2. `[K in keyof T]-?: {} extends Pick<T, K> ? K : never;` - Это выражение является индексной манипуляцией типов, которая проходит через все ключи `K` типа `T`.

3. `keyof T` - `keyof T` возвращает объединение всех ключей типа `T`. Это означает, что `K` будет принимать каждый ключ типа `T` по очереди.

4. `-?: {} extends Pick<T, K> ? K : never;` - Здесь мы используем отрицательный модификатор `-?`, чтобы указать, что свойство является необязательным. Это означает, что свойство может быть пропущено или иметь значение `undefined`.

5. `Pick<T, K>` - `Pick<T, K>` создает новый тип, выбирая только свойство `K` из типа `T`. Это позволяет нам проверить, является ли свойство `K` определенным в типе `T`.

6. `{}` - Пустой объект используется для сравнения с `Pick<T, K>`. Если `Pick<T, K>` является подтипом пустого объекта, это означает, что свойство `K` является необязательным.

7. `{} extends Pick<T, K> ? K : never;` - Если `Pick<T, K>` является подтипом пустого объекта, то возвращается `K`, иначе возвращается тип `never`. Тип `never` указывает на недостижимость и означает, что свойство `K` является обязательным.

8. `[keyof T]` - В конце выражения мы обращаемся к типу, полученному после индексной манипуляции типов, используя `[keyof T]`. Это приводит к объединению всех типов `K`, которые были возвращены на предыдущем шаге.

Таким образом, тип `OptionalKeys<T>` возвращает объединение имен всех необязательных свойств типа `T`. Это полезно, когда вам нужно работать только с необязательными свойствами в обобщенном типе.

---

### Filter

Реализуйте тип `Filter<T, U>`, который фильтрует тип `T`, оставляя только те свойства, значения которых присваиваемы типу `U`.

```ts
interface ExampleObject {
  name: string;
  age: number;
  enabled: boolean;
}

type FilteredObject = Filter<ExampleObject, string | boolean>;
/*
Результат:
{
  name: string;
  enabled: boolean;
}
*/
```

#### Реализация
```ts
type Filter<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};
```

- Тип `Filter<T, U>` использует конструкцию `keyof T` для получения всех ключей типа `T`. Затем, с помощью оператора `as`, мы проходимся по каждому ключу `K` в `keyof T` и проверяем, удовлетворяет ли тип значения `T[K]` условию `T[K] extends U`. Если это условие выполняется, то ключ `K` сохраняется в типе результата, иначе ключ `K` заменяется на тип `never`.

- Тип `never` представляет недостижимое значение и используется для указания, что никакие значения не могут иметь этот тип. В данном случае, если тип значения `T[K]` не удовлетворяет условию `T[K] extends U`, то ключ `K` заменяется на тип `never`, что приводит к исключению этого ключа из результирующего типа.

Таким образом, тип `Filter<T, U>` возвращает новый тип, который содержит только те ключи из типа `T`, значения которых удовлетворяют условию `T[K] extends U`. Все остальные ключи исключаются из результирующего типа.

### ConcatArrays

Реализуйте тип `ConcatArrays<T, U>`, который объединяет два массива типов `T` и `U` в один массив.

```ts
type Array1 = [1, 2, 3];
type Array2 = [4, 5, 6];

type ConcatenatedArray = ConcatArrays<Array1, Array2>;
// Результат: [1, 2, 3, 4, 5, 6]
```

#### Реализация
```ts
type ConcatArrays<T extends any[], U extends any[]> = [...T, ...U];
```

1. `T extends any[]` и `U extends any[]`:

   - `T` и `U` - это параметры типа, которые ограничены типом массива (`any[]`).
   - Ограничение `extends any[]` гарантирует, что `T` и `U` должны быть массивами или подтипами массивов.

2. `[...T, ...U]`:
   - Оператор расширения (`...`) используется для расширения массивов `T` и `U`.
   - `...T` расширяет массив `T`, разбирая его элементы и добавляя их в новый массив.
   - `...U` расширяет массив `U`, разбирая его элементы и добавляя их в новый массив.
   - Результатом является новый массив, содержащий все элементы из `T` и `U` в порядке их объединения.

Таким образом, тип `ConcatArrays<T, U>` представляет собой новый массив, который содержит все элементы из массива `T`, за которыми следуют все элементы из массива `U`.

---

### FunctionComposition

Реализуйте тип `FunctionComposition<F, G>`, который принимает две функции `F` и `G` и возвращает функцию, которая является композицией этих двух функций.

```ts
type Increment = (x: number) => number;
type Double = (x: number) => number;

type ComposedFunction = FunctionComposition<Increment, Double>;
// Результат: (x: number) => number, где ComposedFunction(x) = Increment(Double(x))
```

#### Реализация
```ts
type FunctionComposition<F, G> = (x: Parameters<G>[0]) => ReturnType<F>;
```

Тип `FunctionComposition` принимает два параметра типа `F` и `G`, которые представляют собой типы функций. `F` представляет тип функции, принимающей один аргумент, а `G` представляет тип функции, принимающей ноль или более аргументов.

Тип `FunctionComposition` определяет новый тип функции, которая принимает аргумент типа `Parameters<G>[0]` и возвращает результат типа `ReturnType<F>`.

- `Parameters<G>` - это встроенный тип TypeScript, который извлекает типы аргументов функции `G`. `[0]` указывает на первый аргумент функции `G`.
- `ReturnType<F>` - это встроенный тип TypeScript, который извлекает тип возвращаемого значения функции `F`.

Таким образом, тип `FunctionComposition` описывает функцию, которая принимает аргумент, соответствующий первому аргументу функции `G`, и возвращает результат, соответствующий типу возвращаемого значения функции `F`. Это позволяет композировать функции `F` и `G`, где результат выполнения функции `G` передается в качестве аргумента функции `F`.

---

### ReverseArgs

Реализуйте тип `ReverseArgs<T>`, который преобразует тип функции `T`, меняя порядок типов ее аргументов на противоположный.

```ts
type ExampleFunction = (a: number, b: string, c: boolean) => void;

type ReversedFunction = ReverseArgs<ExampleFunction>;
// Результат: (c: boolean, b: string, a: number) => void
```

#### Реализация
```ts
type ReverseArgs<T extends (...args: any[]) => any> = (
  ...args: Reverse<Parameters<T>>
) => ReturnType<T>;

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : T;
```

Тип `ReverseArgs` принимает в качестве параметра функцию `T`, которая принимает произвольное количество аргументов и возвращает значение. `ReverseArgs` сам является функцией, которая принимает аргументы в обратном порядке по сравнению с функцией `T` и возвращает то же самое значение, которое возвращает функция `T`.

Тип `Reverse` принимает в качестве параметра массив `T` с произвольными элементами. Он рекурсивно переставляет элементы массива в обратном порядке. Для этого он использует условный тип и рекурсию. Если массив `T` содержит хотя бы два элемента, то тип `Reverse` разбивает его на первый элемент `First` и остаток `Rest`. Затем он рекурсивно вызывает сам себя для `Rest` и добавляет `First` в конец результирующего массива. Этот процесс продолжается до тех пор, пока не останется один элемент, после чего массив возвращается без изменений.

Таким образом, тип `ReverseArgs` использует тип `Reverse` для перестановки аргументов функции в обратном порядке. Это может быть полезно, например, при создании оберток функций или при работе с функциями, которые ожидают аргументы в обратном порядке.

---

### Chainable

Реализуйте тип `Chainable<T>`, который позволяет вызывать методы объекта цепочкой (чейнинг), применяя строгую типизацию для каждого вызова метода.

```ts
interface ExampleObject {
  value: number;
  increment: (x: number) => ExampleObject;
  multiply: (x: number) => ExampleObject;
  get: () => number;
}

const obj: Chainable<ExampleObject> = {
  value: 1,
  increment(x) {
    this.value += x;
    return this;
  },
  multiply(x) {
    this.value *= x;
    return this;
  },
  get() {
    return this.value;
  }
};

const result = obj.increment(5).multiply(2).get();
// Результат: 12
```

#### Реализация
```ts
type Chainable<T> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => T & ThisType<T & ReturnType<T[K]>>;
};
```

Данный код представляет собой определение типа `Chainable<T>`, который используется для создания цепочки вызовов методов на объекте определенного типа `T`. Давайте разберем его по частям:

`type Chainable<T> = { ... };`

Здесь мы объявляем тип `Chainable<T>`, который принимает обобщенный тип `T`. Этот тип будет представлять объект, на котором мы хотим создать цепочку вызовов методов.

`[K in keyof T]: (...args: Parameters<T[K]>) => T & ThisType<T & ReturnType<T[K]>>;`

Эта часть определения типа использует индексированный тип `[K in keyof T]`, чтобы перебрать все свойства `T` и создать новые свойства с теми же именами, но с измененными типами.

`(...args: Parameters<T[K]>) => T & ThisType<T & ReturnType<T[K]>>;`

Здесь мы определяем тип функции, который будет ассоциирован с каждым свойством объекта `T`. Он принимает аргументы, соответствующие параметрам функции `T[K]`, и возвращает объект типа `T` с добавленными типами `ThisType<T & ReturnType<T[K]>>`.

`Parameters<T[K]>`

`Parameters<T[K]>` представляет тип аргументов функции `T[K]`. Он извлекает типы аргументов из функции `T[K]` и использует их в определении типа функции `(...args: Parameters<T[K]>) => ...`.

`ReturnType<T[K]>`

`ReturnType<T[K]>` представляет тип возвращаемого значения функции `T[K]`. Он извлекает тип возвращаемого значения из функции `T[K]` и использует его в определении типа функции `(...args: Parameters<T[K]>) => ...`.

`T & ThisType<T & ReturnType<T[K]>>`

Здесь мы объединяем тип `T` с `ThisType<T & ReturnType<T[K]>>`. `ThisType` - это встроенный тип TypeScript, который позволяет указать контекст `this` для методов объекта. В данном случае, мы указываем, что контекст `this` должен быть типа `T & ReturnType<T[K]>`, то есть объектом типа `T`, который также включает в себя тип возвращаемого значения функции `T[K]`.

Таким образом, тип `Chainable<T>` позволяет создавать цепочку вызовов методов на объекте типа `T`, где каждый вызов метода возвращает объект с типами, соответствующими параметрам и возвращаемому значению этого метода. Это обеспечивает типобезопасность при использовании цепочки вызовов методов.

**Примечание:**
В данной реализации мы используем конструкцию `ThisType` для обеспечения строгой типизации для каждого вызова метода так, чтобы `this` указывал на текущий контекст объекта `T`. Оператор `&` используется для объединения типа текущего объекта `T` с типом возвращаемого значения метода `ReturnType<T[K]>`, чтобы сохранить цепочку методов с учетом изменений состояния объекта.

---

### Constructable

Реализуйте тип `Constructable<T>`, который принимает тип функции-конструктора `T` и создает объект с теми же типами аргументов конструктора. Тип `Constructable<T>` представляет собой конструктор, который может быть вызван с аргументами того же типа, что и у конструктора `T`.

```ts
class ExampleClass {
  constructor(
    public name: string,
    public age: number
  ) {}
}

type ExampleConstructor = Constructable<typeof ExampleClass>;
// Результат: new (name: string, age: number) => ExampleClass
```

#### Реализация
```ts
type Constructable<T> = new (...args: ConstructorParameters<T>) => InstanceType<T>;
```

1. `type Constructable<T>` - это объявление пользовательского типа с именем `Constructable`, который принимает один параметр типа `T`.

2. `new (...args: ConstructorParameters<T>)` - это конструктор типа, который принимает переменное количество аргументов. Он использует `...args` для указания, что количество аргументов может быть произвольным. `ConstructorParameters<T>` - это встроенный тип TypeScript, который извлекает типы параметров конструктора для типа `T`. То есть, он извлекает типы аргументов, которые ожидаются при создании экземпляра типа `T`.

3. `=> InstanceType<T>` - это указывает, что тип `Constructable<T>` возвращает тип `InstanceType<T>`. `InstanceType<T>` - это встроенный тип TypeScript, который извлекает тип экземпляра для типа `T`. То есть, он представляет тип, который будет создан при вызове конструктора типа `T`.

Таким образом, тип `Constructable<T>` описывает конструктор, который может принимать аргументы, соответствующие параметрам конструктора типа `T`, и возвращает тип экземпляра, создаваемого при вызове этого конструктора.

---

### TupleToObject

Реализуйте тип `TupleToObject<T>`, который принимает кортеж типов `T` и создает объект, где ключи объекта берутся из элементов кортежа, а значениями являются соответствующие индексы элементов кортежа.

```ts
type ExampleTuple = ['a', 'b', 'c'];

type ExampleObject = TupleToObject<ExampleTuple>;
// Результат: { '0': 'a', '1': 'b', '2': 'c' }
```

**Примечение:** Реализуйте задачу без использования `keyof` и `in` операторов
#### Реализация
```ts
type TupleToObject<T extends any[]> = {
  [K in Extract<keyof T, `${number}`>]: T[K];
};
```

- `TupleToObject<T extends any[]>` - это объявление типа `TupleToObject`, который принимает обобщенный параметр `T`, ограниченный типом `any[]`. Это означает, что `T` должен быть массивом любого типа.

- `[K in Extract<keyof T, `${number}`>]` - это индексная сигнатура, которая перебирает все ключи `K` из типа `T`. `keyof T` возвращает объединение всех ключей типа `T`, а `Extract<keyof T, `${number}`>` фильтрует только те ключи, которые являются строковыми представлениями чисел. Например, если `T` имеет тип `[string, number, boolean]`, то `Extract<keyof T, `${number}`>` вернет `"1" | "2"`.

- `: T[K]` - это тип значения, соответствующего ключу `K` в типе `T`. Это означает, что тип значения в объекте будет соответствовать типу значения в исходном кортеже.

Таким образом, `TupleToObject` преобразует кортеж в объект, где ключами объекта являются индексы элементов кортежа (в виде строковых представлений чисел), а значениями - сами элементы кортежа.

---
