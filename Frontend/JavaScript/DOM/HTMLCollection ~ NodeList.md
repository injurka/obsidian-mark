## Описание
`HTMLCollection` и `NodeList` — это очень похожие на массив коллекции. Они хранят элементы веб-страницы (узлы [DOM](https://doka.guide/js/dom/)). `NodeList` может хранить любые типы узлов, а `HTMLCollection` — только узлы HTML элементов. К элементам коллекций можно обращаться по индексу, но у них нет привычных [методов массива](https://doka.guide/js/arrays/).

`HTMLCollection` возвращают методы [`getElementsByTagName()`](https://doka.guide/js/getelementsbytagname/) и [`getElementsByClassName()`](https://doka.guide/js/getelementsbyclassname/).

`NodeList` возвращают метод [`querySelectorAll()`](https://doka.guide/js/query-selector-all/) и свойство `childNodes`.

Полный список всех методов, возвращающих типы `NodeList` или `HTMLCollection` можно узнать в [стандарте DOM](https://dom.spec.whatwg.org/#document).

## Как работает
`HTMLCollection` возвращают методы, которые работают с DOM — представлением HTML-кода страницы в JavaScript.

Полученная один раз коллекция всегда остаётся актуальной — JavaScript будет обновлять её в случае, если на странице появляется подходящий элемент. Поэтому `HTMLCollection` называют «живой» коллекцией.


`NodeList` работает почти так же, как и `HTMLCollection`.

Разница:
1. `NodeList` может хранить любые типы узлов, например текстовые узлы и комментарии, а `HTMLCollection` — только узлы HTML элементов;
2. `HTMLCollection` позволяет обращаться к элементам не только по индексу, но и по имени с помощью метода `namedItem`;
3. `NodeList` может быть не только «живой» коллекцией, но и статической. Такая коллекция не обновляется при появлении на странице новых элементов.

«Живой» `NodeList` возвращают метод `getElementsByName()` и свойство `childNodes`.

Статический `NodeList` возвращает метод `querySelectorAll()`.