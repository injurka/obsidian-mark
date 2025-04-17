## Что это?

Тип объединения позволяет переменной, параметру функции или свойству объекта принимать значения *одного из нескольких* указанных типов. Используется символ `|` (вертикальная черта) для разделения типов.

## Зачем нужно?

Для моделирования ситуаций, когда значение может иметь разные, но предсказуемые формы. Например, функция может принимать либо ID в виде строки, либо в виде числа. Или API может возвращать данные или `null`.

## Как работает?

*   Переменной типа `A | B` можно присвоить значение типа `A` или значение типа `B`.
*   При работе со значением типа `A | B`, вы можете безопасно использовать только те свойства или методы, которые являются *общими* для *обоих* типов (`A` и `B`).
*   Чтобы получить доступ к свойствам/методам, уникальным для `A` или `B`, необходимо использовать *сужение типа* (Type Narrowing) с помощью защитников типа (Type Guards), таких как `typeof`, `instanceof`, `in`, или пользовательских.

## Примеры:

```typescript
// Переменная может быть строкой или числом
let userId: string | number;
userId = 123;      // OK
userId = "user-abc"; // OK
// userId = true;  // Ошибка: Type 'boolean' is not assignable to type 'string | number'.

// Функция, принимающая разные типы
function printId(id: string | number) {
  console.log(`ID: ${id}`);
  // console.log(id.toUpperCase()); // Ошибка: Property 'toUpperCase' does not exist on type 'string | number'.

  // Используем type guard для сужения
  if (typeof id === "string") {
    // Здесь id имеет тип string
    console.log(id.toUpperCase());
  } else {
    // Здесь id имеет тип number
    console.log(id.toFixed(0));
  }
}

printId("abc-123");
printId(404);

// Возвращаемое значение может быть объектом или null
function findUser(id: number): { name: string } | null {
  if (id === 1) {
    return { name: "Alice" };
  }
  return null;
}

const user = findUser(1);
if (user) { // Проверка на null сужает тип до { name: string }
  console.log(user.name);
}
```
