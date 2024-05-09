Оператор `for (переменная) of (сущность)` позволяет пройти в цикле по свойствам сущности. Оператор работает только с итерируемыми сущностями. В начале цикла оператор достаёт из сущности итератор. Каждая итерация цикла – это вызов метода `.next()` итератора. 

Вот несколько сущностей, с которыми работает `for...of`:

1. **Массивы**: Все встроенные массивы в JavaScript являются итерируемыми, поэтому `for...of` может работать с ними.
    
	```js
	let arr = [1, 2, 3, 4, 5];
	for (let value of arr) {
	  console.log(value);
	}
	```

1. **Строки**: Строки в JavaScript также являются итерируемыми, и `for...of` может работать с ними.
   
	```js
	let str = "Hello, world!";
	for (let char of str) {
	  console.log(char);
	}
	```

1. **Map и Set**: Эти структуры данных в JavaScript также являются итерируемыми, и `for...of` может работать с ними.
    
	```js
	let map = new Map();
	map.set('name', 'John');
	map.set('age', 30);
	for (let [key, value] of map) {
	  console.log(`${key}: ${value}`);
	}
	```

1. **Аргументы функции**: В функции можно использовать `for...of` для итерации по аргументам функции.
	    
	```js
	function logArgs() {
	  for (let arg of arguments) {
	    console.log(arg);
	  }
	}
	logArgs(1, 2, 3);
	```

1. **NodeList**: В браузерном окружении, когда вы используете `document.querySelectorAll()`, который возвращает NodeList, который является итерируемым, `for...of` может работать с ним.
    
	```js
	let elements = document.querySelectorAll('p');
	for (let el of elements) {
	  console.log(el);
	}
	```

1. **Генераторы**: Генераторы, которые создаются с помощью функции `function*`, также являются итерируемыми, и `for...of` может работать с ними.
    
	```js
	function* generator() {
	  yield 1;
	  yield 2;
	  yield 3;
	}
	for (let value of generator()) {
	  console.log(value);
	}
	```

Обратите внимание, что `for...of` не работает с обычными объектами, потому что они не являются итерируемыми.

---

## Источник
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of)
