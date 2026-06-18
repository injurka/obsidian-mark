
Вы можете использовать символы в качестве ключей для свойств объектов. Символы, которые JavaScript обрабатывает особым образом, называются [хорошо известными символами (Well-known Symbols)](http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols). Эти символы используются встроенными алгоритмами JavaScript. Например, **Symbol.iterator** используется для перебора элементов массивов, строк. Его также можно использовать для определения собственных функций-итераторов.  
  
Данные символы играют важную роль, поскольку позволяют осуществлять тонкую настройку поведения объектов.  
  
Будучи уникальными, использование символов в качестве ключей объектов (вместо строк) позволяет легко добавлять объектам новый функционал. При этом, не нужно беспокоиться о возникновении коллизий между ключами (поскольку каждый символ уникален), что может стать проблемой при использовании строк.  
  
В целях небольшого упрощения синтаксис хорошо известных символов Symbol.`<name>` представлен в формате `@@<name>`. Например, *Symbol.iterator* представлен как **@@iterator**, *Symbol.toPrimitive* — как **@@toPrimitive** и т.д.  
  
Если мы говорим о том, что объект имеет метод **@@iterator**, значит, объект содержит свойство под названием Symbol.iterator, представленное функцией: 
```js
{ [Symbol.iterator]: function() { } }.
```

| Specification Name | Description | Value and Purpose |
| ---- | ---- | ---- |
| [[#@@hasInstance]] | `"Symbol.hasInstance"` | Метод, определяющий, распознает ли объект конструктора объект как один из экземпляров конструктора. Вызывается семантикой оператора `instanceof`. |
| [[#@@isConcatSpreadable]] | `"Symbol.isConcatSpreadable"` | Свойство с булевым значением, которое при значении true указывает, что объект должен быть сплющен до элементов массива с помощью `Array.prototype.concat`. |
| [[#@@iterator]] | `"Symbol.iterator"` | Метод, возвращающий итератор по умолчанию для объекта. Вызывается в соответствии с семантикой оператора for-of. |
| [[#@@match, @@replace, @@search и @@split\|@@match]] | `"Symbol.match"` | Метод регулярного выражения, который сопоставляет регулярное выражение со строкой. Вызывается функцией `String.prototype.match`. |
| [[#@@match, @@replace, @@search и @@split\|@@replace]] | `"Symbol.replace"` | Метод регулярного выражения, который заменяет совпадающие подстроки строки. Вызывается методом `String.prototype.replace`. |
| [[#@@match, @@replace, @@search и @@split\|@@search]] | `"Symbol.search"` | Метод регулярного выражения, который возвращает индекс в строке, соответствующий регулярному выражению. Вызывается методом `String.prototype.search`. |
| [[#@@match, @@replace, @@search и @@split\|@@split]] | `"Symbol.split"` | Метод регулярного выражения, который разделяет строку по индексам, соответствующим регулярному выражению. Вызывается методом `String.prototype.split`. |
| [[#@@species]] | `"Symbol.species"` | Свойство, оцениваемое функцией, которое является функцией-конструктором, используемой для создания производных объектов. |
| [[#@@toPrimitive]] | `"Symbol.toPrimitive"` | Метод, преобразующий объект в соответствующее примитивное значение. Вызывается абстрактной операцией [ToPrimitive](https://262.ecma-international.org/6.0/#sec-toprimitive). |
| [[#@@toStringTag]] | `"Symbol.toStringTag"` | Свойство со значением String, которое используется при создании строкового описания объекта по умолчанию. Доступ к нему осуществляется встроенным методом `Object.prototype.toString. |
| [[#@@unscopables DEPRECATED\|@@unscopables]] | `"Symbol.unscopables"` | Свойство, оцениваемое объектом, чьи собственные имена свойств являются именами свойств, которые исключены из привязок окружения `with` связанного объекта. |

## @@hasInstance

По умолчанию оператор `obj instanceof Constructor` проверяет, имеется ли в цепочке прототипов `obj` объект `Constructor.prototype`. 

### Примеры

```js
function Constructor() {
  // ...
}
const obj = new Constructor()
const objProto = Object.getPrototypeOf(obj)

objProto === Constructor.prototype // true
obj instanceof Constructor // true
obj instanceof Object // true
```

`obj instanceof Constructor` возвращает `true`, поскольку прототипом `obj` является `Constructor.prototype` (как результат вызова конструктора). `instanceof` при необходимости обращается к цепочке прототипов, поэтому `obj instanceof Object` также возвращает `true`.

  
Иногда в приложении требуется более строгая проверка экземпляров.  
  
К счастью, у нас имеется возможность определить метод `@@hasInstance` для изменения поведения `instanceof`. `obj instanceof Type` является эквивалентом `TypeSymbol.hasInstance`:

```js
class Iterable {
  static [Symbol.hasInstance](obj) {
    return typeof obj[Symbol.iterator] === 'function'
  }
}

const arr = [1, 3, 5]
const str = 'Hi'
const num = 21
arr instanceof Iterable // true
str instanceof Iterable // true
num instanceof Iterable // false
```

Класс `Iterable` содержит статический метод `@@hasInstance`. Данный метод проверяет, является ли `obj` перебираемым, т.е. содержит ли он свойство `Symbol.iterator`. arr `и` `str` являются итерируемыми, а `num` нет.

---

## @@isConcatSpreadable

`Symbol.isConcatSpreadable` представляет собой логическое значение, указывающее на возможность преобразования объекта в массив с помощью метода `Array.prototype.concat()`.  
  
По умолчанию, метод `concat()` извлекает элементы массива (раскладывает массив на элементы, из которых он состоит) при объединении массивов:  
  
```js
const letters = ['a', 'b']
const otherLetters = ['c', 'd']
otherLetters.concat('e', letters) // ['c', 'd', 'e', 'a', 'b']
```

Для объединения двух массивов **letters** передается в качестве аргумента методу `concat()`. Элементы массива **letters** становятся частью результата объединения: `['c', 'd', 'e', 'a', 'b']`.  
  
Для того, чтобы предотвратить разложение массива на элементы и сделать массив частью результата объединения как есть, свойству **@@isConcatSpreadable** следует присвоить значение **false**:  
  
```j
const letters = ['a', 'b']
letters[Symbol.isConcatSpreadable] = false
const otherLetters = ['c', 'd']
otherLetters.concat('e', letters) // ['c', 'd', 'e', ['a', 'b']]
```

  
В противоположность массиву, метод `concat()` не раскладывает на элементы массивоподобные объекты. Это поведение также можно изменить с помощью **@@isConcatSpreadable**:  

```js
const letters = { 0: 'a', 1: 'b', length: 2 }
const otherLetters = ['c', 'd']
otherLetters.concat('e', letters)
// ['c', 'd', 'e', {0: 'a', 1: 'b', length: 2}]
letters[Symbol.isConcatSpreadable] = true
otherLetters.concat('e', letters) // ['c', 'd', 'e', 'a', 'b']
```

---

## @@iterator

`Symbol.iterator` — это, пожалуй, наиболее известный символ. Он позволяет определять, как объект должен перебираться с помощью инструкции [[for...of]] или [[spread|spread-оператора]] (и должен ли он перебираться вообще).  
  
Многие встроенные типы, такие как строки, массивы, карты (`maps`), наборы или коллекции (`sets`) являются итерируемыми по умолчанию, поскольку у них есть метод **@@iterator**:

Если примитивный тип или объект содержит **@@iterator**, он может быть использован в следующих сценариях:
- Перебор элементов с помощью for-of
- Создание массива элементов с помощью spread-оператора
- Создание массива с помощью Array.from(iterableObject)
- В выражении yield* для передачи другому генератору
- В конструкторах Map(), WeakMap(), Set() и WeakSet()
- В статических методах Promise.all(), Promise.race() и т.д.

### Примеры
1.
```js
const myStr = 'Hi'
typeof myStr[Symbol.iterator] // function
for (const char of myStr) {
  console.log(char) // по символу на каждой итерации: сначала 'H', затем 'i'
}
[...myStr] // ['H', 'i']
```

Переменная myStr содержит примитивную строку, у которой имеется свойство `Symbol.iterator`. Данное свойство содержит функцию, используемую для перебора символов строки.  
  
Объект, в котором определяется метод Symbol.iterator, должен соответствовать [[The Iterator protocol ~ Протокол Итератора|протоколу перебора (итератора)]].

2.
В следующем примере мы создаем итерируемый объект `myMethods`, позволяющий перебирать его методы:
```js
function methodsIterator() {
  let index = 0
  const methods = Object.keys(this)
    .filter(key => typeof this[key] === 'function')

    return {
      next: () => ({
        done: index === methods.length,
        value: methods[index++]
      })
    }
}

const myMethods = {
  toString: () => '[object myMethods]',
  sum: (a, b) => a + b,
  numbers: [1, 3, 5],
  [Symbol.iterator]: methodsIterator
}

for (const method of myMethods) {
  console.log(method) // toString, sum
}
```

`methodsIterator()` — это функция, которая возвращает итератор `{ next: function() { } }`. В объекте `myMethods` определяется вычисляемое свойство `[Symbol.iterator]` со значением `methodsIterator`. Это делает объект перебираемым с помощью цикла `for-of`. Методы объекта также можно получить с помощью `[...myMethods]`. Такой объект можно преобразовать в массив с помощью `Array.from(myMethods)`.

Создание итерируемого объекта можно упростить с помощью [[generator|функции-генератора]]. Данная функция возвращает объект `[Generator]`, соответствующий протоколу 
перебора:
```js
const myMethods = {
  toString: () => '[object myMethods]',
  sum: (a, b) => a + b,
  numbers: [1, 3, 5],
  [Symbol.iterator]: function* () {
    for (const key in this) {
      if (typeof this[key] === 'function') {
        yield key;
      }
    }
  }
}

for (const method of myMethods) {
  console.log(method); // toString, sum
}
```

3. 
Создадим класс Fibonacci с методом `@@iterator`, генерирующим последовательность чисел Фибоначчи:
```js
class Fibonacci {
  constructor(n) {
    this.n = n
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1, index = 0
    while (index < this.n) {
      index++
      let current = a
      a = b
      b = current + a
      yield current
    }
  }
}

const sequence = new Fibonacci(6)
const numbers = [...sequence]
console.log(numbers) // [0, 1, 1, 2, 3, 5]
```

`*[Symbol.iterator]() { }` определяет метод класса — [[generator|функцию-генератор]]. Экземпляр Fibonacci соответствует протоколу перебора. [[spread|spread-оператор]] вызывает метод **@@iterator** для создания массива чисел.


## @@match, @@replace, @@search и @@split

Прототип строки содержит 4 метода, принимающих регулярные выражения в качестве аргумента:  
- String.prototype.match(regExp)
- String.prototype.replace(regExp, newSubstr)
- String.prototype.search(regExp)
- String.prototype.split(regExp, limit)

ES6 позволяет этим методам принимать другие типы при условии определения соответствующих вычисляемых свойств: **@@match**, **@@replace**, **@@search** и **@@split**.  
Любопытно, что прототип **RegExp** содержит указанные методы, также определенные с помощью символов:  

```js
typeof RegExp.prototype[Symbol.match]   // function
typeof RegExp.prototype[Symbol.replace] // function
typeof RegExp.prototype[Symbol.search]  // function
typeof RegExp.prototype[Symbol.split]   // function
```

В следующем примере мы определяем класс, который может использоваться вместо регулярного выражения:  

```js
class Expression {
  constructor(pattern) {
    this.pattern = pattern
  }
  [Symbol.match](str) {
    return str.includes(this.pattern)
  }
  [Symbol.replace](str, replace) {
    return str.split(this.pattern).join(replace)
  }
  [Symbol.search](str) {
    return str.indexOf(this.pattern)
  }
  [Symbol.split](str) {
    return str.split(this.pattern)
  }
}

const sunExp = new Expression('солнечный')

'солнечный день'.match(sunExp) // true
'дождливый день'.match(sunExp) // false
'солнечный day'.replace(sunExp, 'дождливый') // 'дождливый день'
'обещают солнечный день'.search(sunExp) // 8
'оченьсолнечныйдень'.split(sunExp) // ['очень', 'день']
```

  
В классе `Expression` определяются методы **@@match**, **@@replace**, **@@search** и **@@split**. Затем экземпляр этого класса — sunExp используется в соответствующих методах вместо регулярного выражения.

## @@species

Используйте `Symbol.species` для определения свойства, значением которого является функция-конструктор, используемая для создания производных объектов.

Вычисляемое свойство **@@species** используется методами массивов и типизированных массивов, такими как `map()`, `concat()`, `slice()`, `splice()`, возвращающими производные объекты. Использование данного свойства может быть полезным для расширения карт, регулярных выражений или промисов с сохранением оригинального конструктора.

Значением **@@species** многих конструкторов являются сами конструкторы:

```js
Array[Symbol.species] === Array   // true
Map[Symbol.species] === Map       // true
RegExp[Symbol.species] === RegExp // true
```

Во-первых, обратите внимание, что производным называется объект, возвращаемый после совершения определенной операции с исходным объектом. Например, вызов `map()` возвращает производный объект — результат преобразования элементов массива.  
  
Обычно, производные объекты ссылаются на тот же конструктор, что и исходные объекты. Но порой возникает необходимость в определении другого конструктора (возможно, одного из стандартных классов): вот где может помочь **@@species**.  
  
Предположим, что мы расширяем конструктор **Array** с помощью дочернего класса `MyArray` для добавления некоторых полезных методов. При этом мы хотим, чтобы конструктором производных объектов экземпляра `MyArray` был **Array**. Для этого необходимо определить вычисляемое свойство `@@species` со значением **Array**:

```js
class MyArray extends Array {
  isEmpty() {
    return this.length === 0
  }
  static get [Symbol.species]() {
    return Array
  }
}
const array = new MyArray(2, 3, 5)
array.isEmpty() // false
const odds = array.filter(item => item % 2 === 1)
odds instanceof Array // true
odds instanceof MyArray // false
```

В `MyArray` определено статическое вычисляемое свойство `Symbol.species`. Оно указывает, что конструктором производных объектов должен быть конструктор Array. Позже при фильтрации элементов массива `array.filter()` возвращает Array.  
  

## @@toPrimitive

Статическое свойство данных **`Symbol.toPrimitive`** представляет [известный символ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols) `@@toPrimitive`. Все алгоритмы [type coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion) ищут этот символ в объектах для метода, который принимает предпочтительный тип (hint) и возвращает примитивное представление объекта, прежде чем вернуться к использованию методов `valueOf()` и `toString()` объекта. 

Метод `@@toPrimitive` используется для представления объекта в виде примитивного типа:  
- При использовании оператора нестрогого (абстрактного) равенства: **object** == **primitive**
- При использовании оператора сложения/конкатенации: **object** + **primitive**
- При использовании оператора вычитания: **object** — **primitive**
- В различных ситуациях преобразования объекта в примитив: `String(object)`, `Number(object)` и т.д.

### Примеры

1. 
Общий вид
```javascript
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};

// демонстрация результатов преобразований:
alert(user); // hint: string -> {name: "John"}
alert(+user); // hint: number -> 1000
alert(user + 500); // hint: default -> 1500
```

2. 
Усовершенствуем преобразование массива:
```js
function arrayToPrimitive(hint) {
  if (hint === 'number') {
    return this.reduce((x, y) => x + y)
  } else if (hint === 'string') {
    return `[${this.join(', ')}]`
  } else {
    // hint имеет значение по умолчанию
    return this.toString()
  }
}

const array = [1, 3, 5]
array[Symbol.toPrimitive] = arrayToPrimitive

// преобразуем массив в число. hint является числом
+ array // 9
// преобразуем массив в строку. hint является строкой
`array is ${array}` // array is [1, 3, 5]
// преобразование по умолчанию. hint имеет значение default
'array elements: ' + array // array elements: 1,3,5
```

`arrayToPrimitive(hint)` — это функция, преобразующая массив в примитив на основе значения **hint**. Присвоение `array[Symbol.toPrimitive]` значения `arrayToPrimitive` заставляет массив использовать новый метод преобразования. Выполнение + array вызывает `@@toPrimitive` со значением hint, равным number. Возвращается сумма элементов массива. array is ${array} вызывает `@@toPrimitive` с **hint** = **string**. Массив преобразуется в строку `'[1, 3, 5]'`. Наконец `'array elements: '` + **array** использует **hint** = `default` для преобразования. Массив преобразуется в `'1,3,5'`.

## @@toStringTag

Используйте `Symbol.toStringTag` для определения свойства, значением которого является строка, описывающая тип объекта. Метод `@@toStringTag` используется `Object.prototype.toString()`.  
  
[Спецификация](http://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring) определяет значения, возвращаемые `Object.prototype.toString()` по умолчанию, для многих типов:

```js
const toString = Object.prototype.toString
toString.call(undefined) // [object Undefined]
toString.call(null)      // [object Null]
toString.call([1, 4])    // [object Array]
toString.call('Hello')   // [object String]
toString.call(15)        // [object Number]
toString.call(true)      // [object Boolean]
// Function, Arguments, Error, Date, RegExp и т.д.
toString.call({})        // [object Object]
```

Эти типы не имеют свойства `Symbol.toStringTag`, поскольку алгоритм `Object.prototype.toString()` оценивает их особым образом.  
  
Рассматриваемое свойство определяется в таких типах, как [[Symbol]], [[generator]], Map, Promise и др. Рассмотрим пример:

```js
const noop = function() { }

Symbol.iterator[Symbol.toStringTag]   // Symbol
(function* () {})[Symbol.toStringTag] // GeneratorFunction
new Map()[Symbol.toStringTag]         // Map
new Promise(noop)[Symbol.toStringTag] // Promise

const toString = Object.prototype.toString

toString.call(Symbol.iterator)   // [object Symbol]
toString.call(function* () {})   // [object GeneratorFunction]
toString.call(new Map())         // [object Map]
toString.call(new Promise(noop)) // [object Promise]
```

  
В случае, когда объект не относится к группе со стандартным типом и не содержит свойства `@@toStringTag`, возвращается `Object`. Разумеется, мы можем это изменить:

```js
const toString = Object.prototype.toString

class SimpleClass { }
toString.call(new SimpleClass) // [object Object]

class MyTypeClass {
  constructor() {
    this[Symbol.toStringTag] = 'MyType'
  }
}

toString.call(new MyTypeClass) // [object MyType]
```

Экземпляр класса `SimpleClass` не имеет свойства `@@toStringTag`, поэтому `Object.prototype.toString()` возвращает `[object Object]`. В конструкторе класса `MyTypeClass` экземпляру присваивается свойство `@@toStringTag` со значением `MyType`, поэтому `Object.prototype.toString()` возвращает `[object MyType]`.  
  
Обратите внимание, что `@@toStringTag` был введен в целях обеспечения обратной совместимости. Его использование нежелательно. Для определения типа объекта лучше использоваить `instanceof` (совместно с `@@hasInstance`) или `typeof`.

## @@unscopables **DEPRECATED**

`Symbol.unscopables` — это вычисляемое свойство, собственные имена свойств которого исключаются из объекта, добавляемого в начало цепочки областей видимости с помощью инструкции **with**. Свойство **@@unscopables** имеет следующий формат:
```js
{ propertyName: <boolean_exclude_binding> }
```
  
ES6 определяет **@@unscopables** только для массивов. Это сделано в целях сокрытия новых методов, которые могут перезаписать одноименные переменные в старом коде:  

```js
Array.prototype[Symbol.unscopables]
// { copyWithin: true, entries: true, fill: true,
//   find: true, findIndex: true, keys: true }
let numbers = [1, 3, 5]
with (numbers) {
  concat(7) // [1, 3, 5, 7]
  entries // ReferenceError: entries is not defined
}
```

Мы можем получить доступ к методу `concat()` в теле **with**, поскольку данный метод не содержится в свойстве **@@unscopables**. Метод `entries()` указан в этом свойстве и имеет значение **true**, что делает его недоступным внутри **with**.  
  
**@@unscopables** был введен исключительно для обеспечения обратной совместимости со старым кодом, где используется инструкция **with** (которая признана устаревшей и запрещена в строгом режиме).

## Источник
- #### [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol)
- #### [Well-known Symbol](https://262.ecma-international.org/6.0/#sec-well-known-symbols)
