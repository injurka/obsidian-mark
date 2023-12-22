Примитивные типы JavaScript также адаптированы к системе типов TypeScript, поэтому `string`, `number`, `boolean` также могут использоваться в качестве аннотаций типов:

```ts
let num: number;
let str: string;
let bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```