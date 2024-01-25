Одно из нововведений стандарта ECMAScript 2015 - протоколы перебора, которые могут реализованы любым объектом, соблюдая при этом определённые правила.

## [Протоколы перебора](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Iteration_protocols#протоколы_перебора)

Протоколы перебора включают [the "iterable" protocol](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Iteration_protocols#the_.22iterable.22_protocol) и [the "iterator" protocol](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Iteration_protocols#the_.22iterator.22_protocol).

### Протокол "Итерируемый"

Протокол "**Итерируемый**" позволяет JavaScript объектам определять или настраивать поведение перебора, например, то какие значения перебираются в конструкции [`for..of`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of). Некоторые встроенные типы, такие как [`Array`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array) или [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Currently only available in English (US)"), имеют поведение перебора по умолчанию, в то время как другие типы (такие как [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object)) его не имеют

Для того, чтобы объект был **итерируемым**, в нем должен быть реализован метод **@@iterator**, т.е. этот объект (или любой из объектов из его [prototype chain](https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)) должен иметь свойство с именем [`Symbol`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol)`.iterator`:

|Свойство|Значение|
|---|---|
|`[Symbol.iterator]`|Функция без аргументов, возвращающая объект, соответствующий [iterator protocol](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Iteration_protocols#the_.22iterator.22_protocol).|
Всякий раз, когда объект подлежит перебору (например, когда в коде встречается цикл `for..of`), вызывается его метод `@@iterator` без аргументов, и возвращаемый **iterator** используется для получения перебираемых значений.

### Протокол "Итератор"

Протокол "**Итератор**" определяет стандартный способ получения последовательности значений (конечной или бесконечной).

Объект является итератором, если в нем определён метод **next()** , реализующий следующую логику:

|Свойство|Значение|
|---|---|
|`next`|Функция без аргументов, возвращающая объект с двумя свойствами:<br><br>- `done` (boolean)<br>    - Принимает значение `true` если итератор достиг конца итерируемой последовательности. В этом случае свойство `value` может определять _возвращаемое значение_ итератора. Возвращаемые значения объясняются более подробно [here](https://www.2ality.com/2013/06/iterators-generators.html#generators-as-threads).<br>    - Принимает значение `false` если итератор может генерировать следующее значение последовательности. Это эквивалентно не указанному done.<br><br>- `value` - любое JavaScript значение, возвращаемое итератором. Может быть опущено, если `done имеет значение` `true`. |
Некоторые итераторы, в свою очередь, итерабельны:

```js
var someArray = [1, 5, 7];
var someArrayEntries = someArray.entries();

someArrayEntries.toString(); // "[object Array Iterator]"
someArrayEntries === someArrayEntries[Symbol.iterator](); // true
```

### Примеры использования протокола "итератора"

[`String`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String) является примером встроенного итерабельного объекта:

```js
var someString = "hi";
typeof someString[Symbol.iterator]; // "function"
```

По умолчанию итератор строки возвращает символы строки друг за другом:

```js
var iterator = someString[Symbol.iterator]();
iterator + ""; // "[object String Iterator]"

iterator.next(); // { value: "h", done: false }
iterator.next(); // { value: "i", done: false }
iterator.next(); // { value: undefined, done: true }
```

Некоторые встроенные конструкции языка, например, [spread operator](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax), используют в своей внутренней реализации тот же протокол итерации:

```js
[...someString]; // ["h", "i"]
```

Поведение итератора можно переопределить применив собственный `@@iterator`:

```js
var someString = new String("hi"); // need to construct a String object explicitly to avoid auto-boxing

someString[Symbol.iterator] = function () {
  return {
    // this is the iterator object, returning a single element, the string "bye"
    next: function () {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true,
  };
};
```

Обратите внимание, как переопределение `@@iterator` влияет на поведение встроенных конструкций, использующих протокол итерации:

```js
[...someString]; // ["bye"]
someString + ""; // "hi"
```

---

## Встроенная итерируемость

[`String`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String), [`Array`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array), [`TypedArray`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [`Map` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Currently only available in English (US)") и [`Set`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set) итерируемы, так как их прототипы содержат `@@iterator` метод, а [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object) нет, так как прототип [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object) не содержит метода `@@iterator`

---

## Итерируемость определённая пользователем

Мы можем создать итерируемый объект сами:

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]; // [1, 2, 3]
```

---

## Builtin APIs need iterables

`Map([iterable])` `WeakMap([iterable])`, `Set([iterable])` и `WeakSet([iterable])`

```js
var myObj = {};
new Map([
  [1, "a"],
  [2, "b"],
  [3, "c"],
]).get(2); // "b"
new WeakMap([
  [{}, "a"],
  [myObj, "b"],
  [{}, "c"],
]).get(myObj); // "b"
new Set([1, 2, 3]).has(3); // true
new Set("123").has("2"); // true
new WeakSet(
  (function* () {
    yield {};
    yield myObj;
    yield {};
  })(),
).has(myObj); // true
```

и [`Promise.all(iterable)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all), [`Promise.race(iterable)`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/race), [`Array.from()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

---

## Синтаксис предполагающий итерируемость
[for-of](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of), [spread](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax), yield*, destructing - использование данного синтаксиса возможно только если типы данных, к которым он применяется, итерируемы:

```js
for (let value of ["a", "b", "c"]) {
  console.log(value);
}
// "a"
// "b"
// "c"

[..."abc"]; // ["a", "b", "c"]

function* gen() {
  yield* ["a", "b", "c"];
}

gen().next()[(a, b, c)] = // { value:"a", done:false }
  new Set(["a", "b", "c"]);
a; // "a"
```

## Non-well-formed iterables

Если метод `@@iterator` итерируемого объекта не возвращает объект итератора, то это некорректно сформированный итератор, и его использование как таковое может привести к исключениям во время выполнения или ошибочному поведению:

```js
var nonWellFormedIterable = {}
nonWellFormedIterable[Symbol.iterator] = () => 1
[...nonWellFormedIterable] // TypeError: [] is not a function
```

---

## Объект-генератор является итератором или итерируемым?
И тем и другим

```js
var aGeneratorObject = function*(){
    yield 1;
    yield 2;
    yield 3;
}()
typeof aGeneratorObject.next
// "function", because it has a next method, so it's an iterator
typeof aGeneratorObject[Symbol.iterator]
// "function", because it has an @@iterator method, so it's an iterable
aGeneratorObject[Symbol.iterator]() === aGeneratorObject
// true, because its @@iterator method return its self (an iterator), so it's an well-formed iterable
[...aGeneratorObject]
// [1, 2, 3]
```

---

## Примеры

### Простой итератор

```js
function makeIterator(array) {
  var nextIndex = 0;

  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
  };
}

var it = makeIterator(["yo", "ya"]);

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done); // true
```

### Бесконечный итератор

```js
function idMaker() {
  var index = 0;

  return {
    next: function () {
      return { value: index++, done: false };
    },
  };
}

var it = idMaker();

console.log(it.next().value); // '0'
console.log(it.next().value); // '1'
console.log(it.next().value); // '2'
// ...
```

### С генератором

```js
function* makeSimpleGenerator(array) {
  var nextIndex = 0;

  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(["yo", "ya"]);

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done); // true

function* idMaker() {
  var index = 0;
  while (true) yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // '0'
console.log(gen.next().value); // '1'
console.log(gen.next().value); // '2'
// ...
```

---

## Спецификация
|Specification|
|---|
|[ECMAScript Language Specification](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iteration) |

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol)