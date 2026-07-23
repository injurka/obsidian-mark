Метод `getElementsByClassName` в JavaScript возвращает объект, содержащий все элементы с указанными именами классов в документе. Каждый элемент в возвращаемом объекте может быть доступен по его индексу, начинающемуся с 0. Этот метод может быть вызван для любого отдельного элемента, чтобы найти его дочерние элементы с указанными именами классов.

**Синтаксис:**
```javascript
document.getElementsByClassName(classnames);
```

**Параметры:**
Этот метод принимает один обязательный параметр, который является строкой, содержащей имена классов элементов, которые нужно найти, разделенные пробелами. Для поиска с несколькими именами классов они должны быть разделены пробелами.

**Примечание:** Свойство `length` возвращает количество всех HTML элементов в документе для указанного имени класса. Перебирая HTML элементы, можно получить нужную информацию.

**Примеры использования:**

1. **Доступ к HTML элементу по его классу:**
```js
document.getElementsByClassName('greenBorder example')[0].style.border = "10px solid green";
document.getElementsByClassName('yellowBorder example')[0].style.border = "10px solid yellow";
```

**Объяснение:**
- В примере используется метод `getElementsByClassName` для доступа к элементам с классами `greenBorder example` и `yellowBorder example`.
- Изменяется стиль границы этих элементов на зеленую и желтую соответственно.

2. **Изменение цвета кнопок при нажатии:**
```js
function red() {
	document.getElementsByClassName('red')[0].style.backgroundColor = 'red';
}
function blue() {
	document.getElementsByClassName('blue')[0].style.backgroundColor = 'blue';
}
function yellow() {
	document.getElementsByClassName('yellow')[0].style.backgroundColor = 'yellow';
}
function black() {
	var elements = document.getElementsByClassName('black');
	for(var i = 0; i < elements.length; i++) {
		elements[i].style.backgroundColor = 'black';
	}
}
```

**Объяснение:**
- В примере используются функции, которые изменяют цвет фона кнопок при нажатии.
- Метод `getElementsByClassName` используется для доступа к кнопкам с определенными классами и изменения их стиля.
- Последняя кнопка сбрасывает цвета всех кнопок к начальному состоянию.