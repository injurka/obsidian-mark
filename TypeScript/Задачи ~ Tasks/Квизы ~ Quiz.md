### Какие типы выведет TS?

```typescript
const a = false;
```

<details>
	<summary>Ответ</summary>
	Тип переменной `a` будет выведен как `false`.
</details>

<hr />

```typescript
const b = {
  a: 12
};
```

<details>
	<summary>Ответ</summary>
	Тип переменной `b` будет выведен как объект с одним свойством `a`, имеющим тип `number`.
</details>

<hr />

```typescript
const c = 'pineapples';
```

<details>
	<summary>Ответ</summary>
	Тип переменной `c` будет выведен как `pineapples`.
</details>

<hr />

```typescript
const a = 'some';
const b = a;
let c = b;
```

<details>
	<summary>Ответ</summary>
	Тип переменной `b` будет `some`, так как она присваивается значению переменной `a`, которая имеет тип const `string`. Тип переменной `с` будет выведен как `string`.
</details>

<hr />

### Выведется ли ошибка?

```typescript
const num1: never = 1;
```

<details>
	<summary>Ответ</summary>
	Здесь будет ошибка, так как тип `never` представляет недостижимое значение, и нельзя присвоить ему значение типа `number`.
</details>

<hr />

```typescript
const num2: 1 = 1 as never;
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как тип `1` представляет конкретное значение `1`, и приведение типа `never` к `1` является допустимым.
</details>

<hr />

```typescript
const nums1: number[] = [1, 2];
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как переменная `nums1` объявлена как массив чисел(кортеж) (`number[]`), и ей присваивается массив `[1, 2]`, состоящий из чисел.
</details>

<hr />

```typescript
const nums2: [number, number] = [1, 2, 3];
```

<details>
	<summary>Ответ</summary>
	Здесь будет ошибка, так как переменная `nums2` объявлена как кортеж с двумя элементами (`[number, number]`), но ей присваивается массив `[1, 2, 3]`, содержащий три элемента.
</details>

<hr />

```typescript
const str: (string | number)[] = ['text', 1];
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как переменная `str` объявлена как массив, содержащий элементы типа `string` или `number`, и ей присваивается массив `["text", 1]`, который соответствует этому типу.
</details>

<hr />

```typescript
const arr: unknown[] = [1, 2, 3];
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как переменная `arr` объявлена как массив, содержащий элементы неизвестного типа (`unknown`), и ей присваивается массив `[1, 2, 3]`, который может быть присвоен любому типу.
</details>

<hr />

```typescript
const anotherArr: string[] = arr;
```

<details>
	<summary>Ответ</summary>
	Здесь будет ошибка, так как переменная `anotherArr` объявлена как массив строк (`string[]`), но ей присваивается массив `arr`, который имеет тип `unknown[]`. Нельзя присвоить массиву неизвестного типа массив строк.
</details>

<hr />

```typescript
const fn: (param1: number | string) => null = (param1: number | string | boolean) => null;
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как переменная `fn` объявлена как функция, принимающая параметр типа `number` или `string` и возвращающая `null`, и ей присваивается функция, принимающая параметр типа `number`, `string` или `boolean` и также возвращающая `null`. Функция с более широким типом параметра может быть присвоена функции с более узким типом параметра.
</details>

<hr />

```typescript
const strs: string[] = [] as unknown[];
```

<details>
	<summary>Ответ</summary>
	Здесь не будет ошибки, так как переменная `strs` объявлена как массив строк (`string[]`), и ей присваивается пустой массив, приведенный к типу `unknown[]`. Приведение типа пустого массива к `unknown[]` является допустимым.
</details>

<hr />