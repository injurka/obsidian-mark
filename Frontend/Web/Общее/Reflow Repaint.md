---
dg-publish: true
---
# Перерисовка и переформатирование

- Перерисовка происходит, когда вносятся изменения во внешний вид элементов, которые изменяют видимость, но не влияют на макет. Например: Видимость, цвет фона, контур
- Переформатирование означает пересчет положений и геометрии элементов в документе. Перепрошивка происходит, когда в элементы вносятся изменения, которые влияют на макет части или всей страницы. Перепрошивка элемента приведет к последующему перепрошиванию всех дочерних и родительских элементов в DOM

Как перепрошивка, так и перерисовка являются дорогостоящей операцией

Согласно Opera, большинство перепрошивок, по сути, приводят к повторному отображению страницы:

> Перепрошивки очень дороги с точки зрения производительности и являются одной из основных причин медленных DOM-скриптов, особенно на устройствах с низкой  
> вычислительной мощностью, таких как телефоны. Во многих случаях они эквивалентны повторному размещению всей страницы целиком.

# Что вызывает переформатирование и перерисовку

- Переформатирование произойдет при добавлении, удалении, обновлении узлов DOM
- Скрытие элемента DOM с помощью `display: none` приведет как к переформатированию, так и к перерисовке
- Скрытие элемента DOM с помощью `visibility: hidden` приведет только к перерисовке, поскольку макет или положение не изменятся
- Перемещение, анимация узла DOM вызовет повторное отображение и перерисовку
- Изменение размера окна вызовет повторное отображение
- Изменение стиля шрифта изменяет геометрию элемента. Это означает, что это может повлиять на положение или размер других элементов на странице, для обоих из которых браузеру необходимо выполнить переформатирование. После завершения этих операций с макетом все поврежденные пиксели необходимо будет перекрасить
- Добавление или удаление таблицы стилей приведет к переформатированию /перерисовке
- Скрипт, манипулирующий DOM, является дорогостоящей операцией, потому что он пересчитывает каждый раз, когда документ или часть документа изменяются. Как мы видели из всего множества факторов, которые запускают перепрошивку, это может происходить тысячи и тысячи раз в секунду

```js
var bodyStyle = document.body.style; // cache

bodyStyle.padding = "20px"; // reflow, repaint
bodyStyle.border = "10px solid red"; // reflow, repaint

bodyStyle.color = "blue"; // repaint only, no dimensions changed
bstyle.backgroundColor = "#cc0000"; // repaint

bodyStyle.fontSize = "2em"; // reflow, repaint

// new DOM element - reflow, repaint
document.body.appendChild(document.createTextNode('Hello!'));
```

---

# Сведение к минимуму перерисовок и перепрофилирований

Стратегия уменьшения негативного влияния ** перепрофилирований /перерисовок ** на работу пользователя заключается в том, чтобы просто уменьшить количество перепрофилирований и перерисовок и запросов информации о стиле, чтобы браузер мог оптимизировать перепрофилирование. Как это сделать?

- Не меняйте отдельные стили один за другим. Лучше всего для разумности и удобства обслуживания изменять имена классов, а не стили. Если стили динамические, отредактируйте свойство **cssText**

```js
// bad
var left = 10,
    top = 10;
el.style.left = left + "px";
el.style.top  = top  + "px";

// better 
el.className += " theclassname";

// or when top and left are calculated dynamically...

// better
el.style.cssText += "; left: " + left + "px; top: " + top + "px;";
```

- Пакетные изменения DOM
    
    - Используйте `DocumentFragment` для хранения временных изменений
    - Клонируйте, обновляйте, заменяйте узел
    - Скройте элемент с помощью `display: none` (1 переформатирование, 1 перерисовка), добавьте 100 изменений, восстановите отображение (всего 2 переформатирования, 2 перерисовки)
- Не запрашивайте вычисленные стили повторно, кэшируйте их в переменную
    
    - Многократное чтение/запись (например, для свойства height элемента)
    - Запись, затем считывание из DOM, несколько раз, что приводит к переформатированию документа
    - Чтение (кэширование), запись (аннулирование макета), чтение (запуск макета).
    - Чтобы исправить: сначала прочитайте все, а затем запишите все

```js
var box2Height = document.getElementById('box2').clientHeight;
document.getElementById('box2').style.height = box2Height + 10 + 'px';

var box3Height = document.getElementById('box3').clientHeight;
document.getElementById('box3').style.height = box3Height + 10 + 'px';

var box4Height = document.getElementById('box4').clientHeight;
document.getElementById('box4').style.height = box4Height + 10 + 'px';

var box5Height = document.getElementById('box5').clientHeight;
document.getElementById('box5').style.height = box5Height + 10 + 'px';

var box6Height = document.getElementById('box6').clientHeight;
document.getElementById('box6').style.height = box6Height + 10 + 'px';
```

---

## Optimized Code

```js
var box1Height = document.getElementById('box1').clientHeight;
var box2Height = document.getElementById('box2').clientHeight;
var box3Height = document.getElementById('box3').clientHeight;
var box4Height = document.getElementById('box4').clientHeight;
var box5Height = document.getElementById('box5').clientHeight;
var box6Height = document.getElementById('box6').clientHeight;

document.getElementById('box1').style.height = box1Height + 10 + 'px';
document.getElementById('box2').style.height = box2Height + 10 + 'px';
document.getElementById('box3').style.height = box3Height + 10 + 'px';
document.getElementById('box4').style.height = box4Height + 10 + 'px';
document.getElementById('box5').style.height = box5Height + 10 + 'px';
document.getElementById('box6').style.height = box6Height + 10 + 'px';
```

---

## Источник
- #### [youtube](https://www.youtube.com/watch?v=QDQSj4__v_8&t=287s)
- #### [forced-reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
