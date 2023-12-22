это особый тип данных, который позволяет ускорить поиск и сортировку данных. Они работают путем создания дополнительных структур данных, которые ускоряют поиск определенных значений в базе данных.

```ts
type Age = Person["age"];
type I1 = Person["age" | "name"];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];
type Person = typeof MyArray[number];
```