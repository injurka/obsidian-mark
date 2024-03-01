Оператор `...` интерпретируется по-разному, в зависимости от контекста применения. _Spread_ используется для разделения коллекций на отдельные элементы, а _rest_, наоборот, для соединения отдельных значений в массив.

```javascript
var log = function(a, b, ...rest) {
  console.log(a, b, rest);
};

log('Basic', 'rest', 'operator', 'usage'); // Basic rest ['operator', usage]
```

Используя параметр `...rest` в функции `log` вы говорите интерпретатору: “собери все _оставшиеся_ элементы в массив с именем `rest`”. Разумеется, если вы не передадите в функцию других именновах параметров, то `...` соберёт все аргументы:

```javascript
var log = function(...args) {
  conole.log(args);
};

log(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
```

Таким образом, больше нет необходимости переводить псевдо-массив `arguments` функций в настоящий массив − оператор _rest_ сделает это сам:

```javascript
// Раньше
var sum = function() {
  var args = [].slice.call(arguments);
  return args.reduce(function(s, num) {
    return s += num;
  }, 0);
};

// Теперь
var sum = function(...args) {
  return args.reduce(function(s, num) {
    return s + num;
  }, 0);
};

// Ещё короче с использованием стрелочных функций
var sum = (...args) => args.reduce((s, num) => s + num, 0);
```