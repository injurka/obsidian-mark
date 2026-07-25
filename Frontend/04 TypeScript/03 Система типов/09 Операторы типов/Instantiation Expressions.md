# Instantiation Expressions

## Описание

> [!info] 
> Instantiation Expressions (Выражения инстанцирования) — это возможность указать аргументы типа (Type Arguments) для обобщенной функции или класса без их немедленного вызова. Это создает новую сущность (функцию или класс) с более узкими типами.

Ранее, если у вас была обобщенная функция `function make<T>()`, и вы хотели передать кому-то эту функцию, но так, чтобы она работала только с типом `string`, вам приходилось писать функцию-обертку. С появлением Instantiation Expressions (в TS 4.7) вы можете просто передать параметры типа прямо в имя переменной при присваивании: `make<string>`.

## Примеры использования

```typescript
// Обобщенная функция
function makeBox<T>(value: T) {
  return { value };
}

// Раньше: создание обертки
const makeStringBoxWrapper = (value: string) => makeBox(value);

// Теперь: Instantiation Expression
const makeStringBox = makeBox<string>;
const makeNumberBox = makeBox<number>;

const strBox = makeStringBox("hello"); // Ок
// makeStringBox(123); // Ошибка: ожидается string

// Использование с классами
class ErrorMap<T> extends Map<string, T> {}

const NumberErrorMap = ErrorMap<number>;
const myMap = new NumberErrorMap(); // Создает Map<string, number>
```

## Особенности и нюансы

- **Используется для сужения**: Выражения инстанцирования — это великолепный способ взять универсальный инструмент (функцию, класс) и адаптировать его под конкретную узкую задачу для использования в качестве колбэка или обработчика.
- **Работает с typeof**: Вы можете использовать этот синтаксис внутри оператора `typeof` для получения конкретного типа. Например: `type StringMakeBox = typeof makeBox<string>;`.
- **Без потери рантайм-контекста**: Этот синтаксис не создает новую функцию в рантайме. Во время выполнения кода это будет та же самая ссылка на исходную функцию, но на уровне типов TypeScript будет рассматривать её как суженную.

## Связанные темы
- [[Карта знаний TypeScript]]
