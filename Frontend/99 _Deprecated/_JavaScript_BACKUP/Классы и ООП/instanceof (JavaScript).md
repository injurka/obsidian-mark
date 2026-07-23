
В динамически типизированном языке JavaScript проверка типов данных является важной задачей. Для проверки принадлежности объекта к определенному классу или функции-конструктору используется оператор `instanceof`. Он учитывает наследование и проверяет всю цепочку прототипов объекта.

В этом руководстве мы разберем, как устроен `instanceof` под капотом, какие у него есть особенности и ограничения, а также альтернативные методы проверки типов.

---

## 1. Назначение оператора instanceof

Оператор `instanceof` возвращает `true`, если проверяемый объект принадлежит указанному классу (или его наследникам), и `false` в противном случае. 

Синтаксис:
```javascript
obj instanceof Class
```

### Пример базового использования и наследования:

```javascript
class Animal {}
class Rabbit extends Animal {}

const rabbit = new Rabbit();
console.log(rabbit instanceof Rabbit); // true (экземпляр класса Rabbit)
console.log(rabbit instanceof Animal); // true (Rabbit наследует от Animal)
console.log(rabbit instanceof Object); // true (все объекты наследуют от Object)
```

---

## 2. Как работает instanceof: поиск по прототипам

Алгоритм работы `instanceof` устроен следующим образом:

1. **Проверка `Symbol.hasInstance`**:
   Если у класса/функции есть статический метод с именем `Symbol.hasInstance`, то `instanceof` вызывает его: `Class[Symbol.hasInstance] (obj)`. Метод должен вернуть `true` или `false`. Это позволяет переопределить стандартное поведение оператора.
2. **Поиск по цепочке прототипов**:
   Если метода `Symbol.hasInstance` нет, то оператор сравнивает прототип объекта с `prototype` класса/функции. Он берет `obj.__proto__` (или `Object.getPrototypeOf(obj)`) и сравнивает его с `Class.prototype`.
   * Если они равны, возвращается `true`.
   * Если нет, то берется прототип следующего уровня: `obj.__proto__.__proto__`, и проверка повторяется.
   * Поиск продолжается до тех пор, пока цепочка прототипов не закончится (достигнет `null`), в этом случае возвращается `false`.

### Настройка кастомной проверки через Symbol.hasInstance:

```javascript
class Flyable {
  static [Symbol.hasInstance] (instance) {
    return instance && typeof instance.fly === 'function';
  }
}

const bird = { fly() { console.log("Лечу!"); } };
const car = { drive() { console.log("Еду!"); } };

console.log(bird instanceof Flyable); // true (у объекта bird есть метод fly)
console.log(car instanceof Flyable); // false
```

### Имитация работы instanceof (поиск по цепочке прототипов):

```javascript
function manualInstanceOf(obj, targetClass) {
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return false;
  }
  
  let proto = Object.getPrototypeOf(obj);
  const targetProto = targetClass.prototype;

  while (proto) {
    if (proto === targetProto) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class A {}
class B extends A {}
const inst = new B();
console.log(manualInstanceOf(inst, A)); // true
console.log(manualInstanceOf(inst, B)); // true
```

---

## 3. Альтернативные методы проверки типов

В JavaScript существуют другие способы определения типов, каждый из которых имеет свою сферу применения:

1. **`typeof`**:
   Используется для работы с примитивными типами данных. Для объектов он всегда возвращает `"object"` (за исключением функций, для которых возвращается `"function"`), поэтому для различения классов он не подходит.
2. **`Array.isArray(value)`**:
   Специализированная встроенная функция для надежной проверки массивов.
3. **`Object.prototype.toString.call(value)`**:
   Возвращает строку вида `"[object Type]"` (например, `"[object Date]"` или `"[object Array]"`), что позволяет точно определять типы встроенных объектов.

### Проблема iframe и нескольких контекстов (Realms)

Одной из классических проблем `instanceof` является работа с несколькими контекстами исполнения (например, если в браузере открыто несколько iframe).
У каждого iframe есть собственное окружение с собственными глобальными объектами: свой `Array`, свой `Date` и т.д.
Если массив создан в одном iframe, а проверяется в другом с помощью `instanceof Array`, проверка вернет `false`, так как прототип этого массива ссылается на `Array.prototype` из родного iframe, а не текущего.

Поэтому для проверки массивов всегда рекомендуется использовать `Array.isArray()` вместо `instanceof Array`.

### Проверка массивов и встроенных типов:

```javascript
const arr = [];
console.log(arr instanceof Array); // true
console.log(Array.isArray(arr)); // true

const date = new Date();
console.log(Object.prototype.toString.call(date)); // "[object Date]"
```

---

## 4. Ограничения и граничные случаи

1. **Поведение с примитивными значениями**:
   Оператор `instanceof` работает только с объектами. Если слева указано примитивное значение (например, строка), то проверка вернет `false`.
2. **Объекты без прототипа**:
   Если объект создан с помощью `Object.create(null)`, у него нет прототипа (`__proto__` равен `undefined`). При попытке проверить его через `instanceof` оператор вернет `false`, так как цепочка прототипов пуста.
3. **Динамическое изменение прототипа**:
   Поскольку `instanceof` производит поиск по цепочке прототипов в реальном времени, изменение прототипа объекта с помощью `Object.setPrototypeOf` приведет к изменению результата проверки.

### Пример ограничений:

```javascript
console.log("привет" instanceof String); // false (примитив)
console.log(new String("привет") instanceof String); // true (объект-обертка)

const nullProtoObj = Object.create(null);
console.log(nullProtoObj instanceof Object); // false

class Dog {}
class Cat {}
const pet = new Dog();
console.log(pet instanceof Dog); // true

// Динамически меняем прототип объекта
Object.setPrototypeOf(pet, Cat.prototype);
console.log(pet instanceof Dog); // false
console.log(pet instanceof Cat); // true
```

---

## 5. Резюме

* **`instanceof`** проверяет, принадлежит ли объект к классу или его наследникам, проходя по всей цепочке прототипов.
* **Кастомизация**: С помощью статического метода `Symbol.hasInstance` можно переопределить логику проверки оператора для конкретного класса.
* **Ограничение Realms**: Не работает корректно для встроенных типов (например, `Array`), если объекты передаются между разными окнами или iframe.
* **Примитивы**: Всегда возвращает `false` для примитивных типов данных.

---

## См. также

* [[Синтаксис классов]] — основы синтаксиса классов в JavaScript.
* [[Наследование классов]] — наследование классов и ключевое слово `extends`.
* [[Прототипное наследование]] — основы прототипов и прототипных цепочек.

---

## Источники

* [Оператор instanceof на learn.javascript.ru](https://learn.javascript.ru/instanceof)
* [instanceof на MDN Web Docs](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/instanceof)
