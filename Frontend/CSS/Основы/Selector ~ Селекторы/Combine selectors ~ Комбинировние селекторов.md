## Общее
Селекторы — это шаблоны, которые используются для привязки стилевых свойств к элементам в документе. Вы можете задать стиль для всех элементов или сократить выбор с помощью определённого селектора. ([полный список CSS стилей](https://www.w3.org/Style/CSS/all-properties.en.html)).

|Селектор|Пример|Описание примера|
|---|---|---|
|[`*`](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector) |`*` |Все элементы.|
|[`#id`](https://wp-kama.ru/id_5875/30-css-selektorov.html#id-selector) |`#firstname` |Элемент с id="firstname".|
|[`.class`](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector) |`.intro` |Все элементы с class="intro".|
|[`.class1.class2`](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector) |`.name1.name2` |Все элементы с class="name1 name2".|
|[`.class1 .class2`](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector) |`.name1 .name2` |Все элементы с class="name2" у которых родитель с class="name1".|
|[`tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#tag-selector) |`p` |Все `<p>` элементы. |
|[`tag.class`](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector) |`p.intro` |Все `<p>` элементы с `class="intro`". |
|[`tag, tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#comma) |`div, p` |Все `<div>` и все `<p>` элементы. |
|[`tag tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#space) |`div p` |Все `<p>` внутри всех `<div>`. |
|[`tag > tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#gt) |`div > p` |Все `<p>` прямой родитель которых `<div>`. |
|[`tag + tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#plus) |`div + p` |`<p>` который находятся сразу после `<div>`. |
|[`tag ~ tag`](https://wp-kama.ru/id_5875/30-css-selektorov.html#tilde) |`div ~ p` |Все `<p>` которые находятся после `<div>`. |
|[`[attribute]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr) |`[target]` |Все элементы с target="что-либо".|
|[`[attribute = value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-value) |`[target=_blank]` |Все элементы с target="_blank".|
|[`[attribute ^= value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-start-value) |`a[href^="https"]` |Каждый <a> атрибут href которого начинается с "https".|
|[`[attribute $= value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-end-value) |`a[href$=".pdf"]` |Каждый <a> атрибут href которого заканчивается ".pdf".|
|[`[attribute *= value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-float-value) |`a[href*="w3schools"]` |Каждый <a> атрибут href которого содержит подстроку "w3schools".|
|[`[attribute ~= value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-oneof-value) |`[title~=flower]` |Все элементы в атрибуте title которых есть слово "flower".|
|[`[attribute \|= value]`](https://wp-kama.ru/id_5875/30-css-selektorov.html#attr-start-equal) |`[lang\|=en]` |Все элементы атрибут lang которых начинается с "en".|
|[`:active`](https://wp-kama.ru/id_5875/30-css-selektorov.html#link) |`a:active` |Активная ссылка.|
|[`::after`](https://wp-kama.ru/id_5875/30-css-selektorov.html#after) |`p::after` |Вставляет псевод-элемент в начале каждого <p> элемента.|
|[`::before`](https://wp-kama.ru/id_5875/30-css-selektorov.html#before) |`p::before` |Вставляет псевод-элемент в конце каждого <p> элемента.|
|[`:checked`](https://wp-kama.ru/id_5875/30-css-selektorov.html#checked) |`input:checked` |Все выбранные <input type="checkbox"> элементы.|
|[`:default`](https://wp-kama.ru/id_5875/30-css-selektorov.html#default) |`input:default` |Все `<input>` элементы. |
|[`:disabled`](https://wp-kama.ru/id_5875/30-css-selektorov.html#disabled) |`input:disabled` |Все `<input disabled>` элементы. |
|[`:empty`](https://wp-kama.ru/id_5875/30-css-selektorov.html#empty) |`p:empty` |Все пустые `<p>`, в которых нет пробелом, текста или других элементов. |
|[`:enabled`](https://wp-kama.ru/id_5875/30-css-selektorov.html#enabled) |`input:enabled` |Все активные (не disabled) элементы `<input>`. |
|[`:first-child`](https://wp-kama.ru/id_5875/30-css-selektorov.html#first-child) |`p:first-child` |Первый элемент в списке родительского элемента.|
|[`:first-of-type`](https://wp-kama.ru/id_5875/30-css-selektorov.html#first-of-type) |`p:first-of-type` |Первый `<p>` элемент в списке родительского элемента. |
|[`::first-letter`](https://wp-kama.ru/id_5875/30-css-selektorov.html#first-letter) |`p::first-letter` |Первая буква каждого `<p>` элемента. |
|[`::first-line`](https://wp-kama.ru/id_5875/30-css-selektorov.html#first-letter) |`p::first-line` |Первая линия каждого `<p>` элемента. |
|[`:focus`](https://wp-kama.ru/id_5875/30-css-selektorov.html#focus) |`input:focus` |`<input>` в котором находится курсор. |
|[`:focus-visible`](https://wp-kama.ru/id_5875/30-css-selektorov.html#focus-visible) |`a:focus-visible` |Фокус сработает, только если на кнопку перешли с клавиатуры через TAB.|
|[`:focus-within`](https://wp-kama.ru/id_5875/30-css-selektorov.html#focus-within) |`div:focus-within` |Сработает на блоке, когда его внутренний элемент находится в фокусе.|
|[`:hover`](https://wp-kama.ru/id_5875/30-css-selektorov.html#hover) |`a:hover` |Сслыка на которую наведена мышка.|
|[`:in-range`](https://wp-kama.ru/id_5875/30-css-selektorov.html#in-range) |`input:in-range` |Все `<input>` со значением в пределах указанного в min/max диапазона. |
|[`:out-of-range`](https://wp-kama.ru/id_5875/30-css-selektorov.html#out-of-range) |`input:out-of-range` |Все `<input>` со значением за пределами указанного в min/max диапазона. |
|`:indeterminate` |`input:indeterminate` |Все `<input>` в статусе indeterminate. |
|`:invalid` |`input:invalid` |Все `<input>` с недопустимым значением. |
|`:lang(language)` |`p:lang(it)` |Все `<p>` с `lang="it"`. |
|[`:last-child`](https://wp-kama.ru/id_5875/30-css-selektorov.html#last-child) |`p:last-child` |Последний элемент в списке родительского элемента.|
|[`:last-of-type`](https://wp-kama.ru/id_5875/30-css-selektorov.html#first-of-type) |`p:last-of-type` |Последний `<p>` в списке родительского элемента. |
|[`:link`](https://wp-kama.ru/id_5875/30-css-selektorov.html#link) |`a:link` |Все непосещенные ссылки.|
|[`:not(selector)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#not-selector) |`:not(p)` |Все не `<p>` элементы. |
|[`:not(:only-child)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#not-only-child) |`div:not(:only-child)` |Все `<div>` внутри которых больше одного элемента. |
|[`:nth-child(n)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#nth-child) |`p:nth-child(2)` |Второй элемент в списке родительского элемента.|
|[`:nth-of-type(n)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#nth-of-type) |`p:nth-of-type(2)` |Второй `<p>` в списке родительского элемента. |
|[`:nth-last-child(n)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#nth-last-child) |`p:nth-last-child(2)` |Второй элемент в списке родительского элемента (счет идет с конца).|
|[`:nth-last-of-type(n)`](https://wp-kama.ru/id_5875/30-css-selektorov.html#nth-last-of-type) |`p:nth-last-of-type(2)` |Второй `<p>` в списке родительского элемента (счет идет с конца). |
|[`:only-child`](https://wp-kama.ru/id_5875/30-css-selektorov.html#only-child) |`p:only-child` |Единственный `<p>` у родителя (других элементов быть не может). |
|[`:only-of-type`](https://wp-kama.ru/id_5875/30-css-selektorov.html#only-of-type) |`p:only-of-type` |Один `<p>` у родителя (других элементы могут быть). |
|`:optional` |`input:optional` |Все `<input>` у которых нет артибута "required". |
|`:required` |`input:required` |Все `<input>` у которых указан атрибут "required". |
|`:out-of-range` |`input:out-of-range` |Все `<input>` со значением выходящим за указанный рэндж. |
|`::placeholder` |`input::placeholder` |Все `<input>` у которых указан атрибут "placeholder". |
|`:read-only` |`input:read-only` |Все `<input>` у которых указан атрибут "readonly". |
|`:read-write` |`input:read-write` |Все `<input>` у которых не указан атрибут "readonly". |
|`:root` |`:root` |Корен документа.|
|`::selection` |`::selection` |Выберет текущее выделение текста мышкой.|
|[`:target`](https://wp-kama.ru/id_5875/30-css-selektorov.html#target) |`#news:target` |Выберет элемент с id="news" когда к нему пришил по клику.|
|`:valid` |`input:valid` |Все `<input>` с валидным значением. |
|[`:visited`](https://wp-kama.ru/id_5875/30-css-selektorov.html#link) |`a:visited` |Все посещенные ссылки.|
|`:where()` |`:where(.foo, .bar) a` |Тоже что и .foo a, .bar a, но вес селектора в скобках не учитывается.|
|:`is()` |`:is(.foo, .bar) a` |Тоже что и .foo a, .bar a. Удобен для записи больших селекторов компактно.|
## Описание CSS селекторов

### `*`
Выбирает абсолютно все элементы. Например, такой код обнуляет внутренние и внешние отступы у всех элементов на странице:

* { margin:0; padding:0; }

`*` можно использовать в связке с другими селекторами. Например, выделим все дочерние элементы `#container` сплошной черной рамкой шириной 1px.

```css
#container * { border: 1px solid black; }
```

`*` создает повышенную нагрузку на скорость работы браузера, поэтому используйте его только по необходимости.

---

### `.class`

Выбирает элемент у которого есть атрибут class с указанным значением: `class="myclass"`.

Название класса, может состоять из латинских букв (`a-zA-Z`), цифр (`0-9`), символа дефиса и подчеркивания (`- _`).

Следующий код устанавливает красный цвет текста для всех элементов с классом error -

```css
<div class="error">

.error { color: red; }
```

> У одного элемента может быть несколько классов (через пробел): `<div class="error myclass">`


### `#id`

Выбирает элемент у которого есть атрибут id с указанным значением: `id="myid"`.

Идентификатор может быть присвоен только одному элементу на странице (если присвоить несколько, то мир не рухнет, но так делать не принято).

Идентификатор должен состоять из латинских букв (`a-zA-Z`), цифр (`0-9`), символа дефиса или подчеркивания: `- _`. Начинается он только с буквы!

Следующий код устанавливает ширину и отступ элемента с идентификатором:
```html
<div id="container">

#container { width: 960px; margin: auto; }
```

> Селектор по ID имеет больший приоритет над селектором по классу (см. [начало статьи](https://wp-kama.ru/id_5875/30-css-selektorov.html#css-prioritety)). Поэтому по возможности используйте [селекторы класса](https://wp-kama.ru/id_5875/30-css-selektorov.html#class-selector), это считается правилом хорошего тона и позволит при необходимости без лишних усилий "перебить" стили.

---

### `tag`

Селектор HTML тега. Применяться ко всем указанным элементам в документе. Часто используется для задания цвета, фона, шрифта и др.

Следующий код задает цвет текста для всех ссылок и отступы для UL списков:
```css
a { color: red; }
ul { margin-left: 0; }
```

---

### `X, Y`

**Объединяет несколько селекторов**, так чтобы указать всем выбранным селекторам одинаковые стили.

Следующий код задает цвет текста для заголовков `h2` и ссылок в теге `li`:
```css
h2,
li a { color: red; }
```

---

### `X Y`

Выбирает **элементы Y, которые являются дочерними к X**. Может состоять из нескольких селекторов: `X Y Z`. Сначала обязательно указывается родитель, а после него дочерние элементы. Их количество может быть любым. Свойства стилей будут применены только к последнему элементу.

Например, следующий код выбирает любой элемент `<а>`, являющийся потомком элемента
```html
<li><a href="ссылка">текст</a></li>

li a { text-decoration: none; }
```    

> Это правило можно сочетать с идентификаторами и классами: `body.opera a{ color:blue; }`.

---

### `Х > Y`

Выбирает **элементы Y, которые являются дочерними к X**. Выбирается только первый уровень дочерних элементов.

Пример:
```css
.parent > li{ border: 1px solid red; }
```


Добавит отступ для `li` первого уровня, т.е. тех который является прямым потомком элемента `ul`:
```html
<ul class="parent">
	<li> список1
		<ul class="child">
			<li>список11</li>
			<li>список12</li>
		</ul>
	</li><!-- затронет -->
	<li>список2</li><!-- затронет -->
	<li>список3</li><!-- затронет -->
</ul>
```
> Это правило не коснется `<ul class="child">`.

Результат:
<ul class="parentxy">
	<li> список1
		<ul class="child">
			<li>список11</li>
			<li>список12</li>
		</ul>
	</li><!-- затронет -->
	<li>список2</li><!-- затронет -->
	<li>список3</li><!-- затронет -->
</ul>

---

### `Х ~ Y`

Выбирает все элементы Y, которые расположены после X (на том же уровне). По поведению похож на `X + Y`. Разница в том, что будут выбраны все следующие элементы, а не только первый.

Например, в указанном коде будут выбраны все элементы `p`, которые расположены после `div`:

```css
div ~ p { color: red; }
```

> Окрасит "текст 2" и "текст 3":
```html
<div>текст</div>
<p>текст 2</p><!-- color: red; -->
<p>текст 3</p><!-- color: red; -->
```

Результат:
<section class="parentxy2">
	<div>текст 1</div>
	<p>текст 2</p>
	<p>текст 3</p>
	<div>текст 4</div>
	<p>текст 5</p>
	<p>текст 6</p>
</section>

---

### `Х + Y`

Выбирает **первый элемент Y, который находится после X** (не вложен, а рядом). Стили будут применяться только к последнему элементу X.

Например, следующий код устанавливает красный цвет текста в абзаце `p`, который расположен сразу после `div`:

```css
div + p { color: red; }
```

Итог:
```html
<div>текст</div>
<p>текст 2</p><!-- color: red; -->
<p>текст 3</p>
<div>текст</div>
<p>текст 4</p><!-- color: red; -->
<p>текст 5</p>
<p>текст 6</p>
```

Результат:
<section class="parentxy3">
	<div>текст</div>
	<p>текст 2</p><!-- color: red; -->
	<p>текст 3</p>
	<div>текст</div>
	<p>текст 4</p><!-- color: red; -->
	<p>текст 5</p>
	<p>текст 6</p>
</section>

---

### `a:link, a:visited, a:hover, a:active, a:focus`

Выбирает элементы (обычно это поля формы или ссылки) в зависимости от их состояния.

- `a:link` — выбирает обычную (не посещенную) ссылку. Обычно этот селектор записывается просто как `a`.
- `a:visited` — выбирает уже посещенную ссылку.
- `a:hover` — выбирает ссылку на которую наведена мышка (под курсором).
- `a:active` — выбирает активную ссылку (на которую был сделан клик, пока еще никуда не кликали или когда на ссылку переключились при передвижении табом с клавиатуры).
- `a:focus` — выбирает активную ссылку (на которую кликнули, но еще не отпустили кнопку мышки).

```css
a:link   { color: red; }    /* можно просто а{  } */ /* все не посещенные ссылки */
a:visted { color: purple; } /* все посещенные ссылки */
a:hover  { color: green; }  /* ссылка под курсором */
a:active { color: blue; }   /* нажатая ссылка */
a:focus  { color: dark; }   /* ссылка в момент нажатия */
```

---

### `[attr]`

Выбирает элементы, **которые содержат указанный атрибут**. Селектор атрибутов.
```css
a[title] { color: red; }
```

Окрасит только "текст":
```html
<a href="" title="описание">текст</a> <!-- color: red; -->
<a href="">текст 2</a>
```

---

### `[attr = value]`

Выбирает элементы, **у которых есть атрибут с указанным значением**. Селектор атрибутов с точным значением.
```css
a[href="http://example.com"] { color: red; }
```

Окрасит только "текст":
```html
<a href="http://example.com">текст</a><!-- color: red; -->
<a href="http://example.com/article">текст 2</a>
```

---

### `[attr *= value]`

Выбирает элементы, у которых **в значении указанного атрибута встречается указанная подстрока**. Селектор атрибутов с плавающим значением.
```css
a[href*="example"] { color: red; }
```

Окрасит "текст" и "текст 2":
```html
<a href="http://example.com">текст</a><!-- color: red; -->
<a href="http://example.com/article">текст 2</a><!-- color: red; -->
<a href="http://xxx.ru/article">текст 2</a>
```

---

### `[attr ^= value]`

Выбирает элементы, у которых значение атрибута **начинается с указанной строки**. Селектор атрибутов со значением в начале.
```css
a[href^="http"] {
   background: url(path/to/external/icon.png) no-repeat;
   padding-left: 10px;
}
```

Установит фоновую картинку только для "текст":
```html
<a href="http://example.com">текст</a>
<a href="/article">текст 2</a>
```

---

### `[attr $= value]`

Выбирает элементы, у которых значение атрибута **заканчивается на указанную строку**. Селектор атрибутов **со значением в конце**.

Например, выберем элементы, которые ссылаются на файлы определенного расширения.
```css
a[href$=".jpg"] { color: red; }
```

Выберет ссылки `a`, ссылающиеся на изображения формата `.jpg`. Окрасит только "текст":
```html
<a href="http://example.com/foto.jpg">текст</a>
<a href="http://example.com/foto2.png">текст 2</a>
```

---

### `[attr ~= value]`

Выбирает элементы, у которых в значении атрибута есть указанное слово. Селектор атрибутов **с одним из значений разделенных пробелом**.

Он чем-то похож на `*=`, разница вот в чем:

- `*=` — ищет home в любом месте значения. Найдет homeland.
- `~=` — ищет home разделеный пробелом. Найдет home land.

```css
a[data-info ~= "external"] { color: red; }
a[data-info ~= "image"] { border: 1px solid black; }
```

Отработает так:
```html
<a href="http://example.com" data-info="external">текст</a><!-- окрасит в красный -->
<a href="http://nettuts.com">текст 2</a><!-- не тронет -->
<a href="http://example.com" data-info="external image">текст 3</a><!-- окрасит и установит рамку -->
<a href="http://example.com" data-info="image">текст 4</a><!-- установит рамку -->
```
> Об этом селекторе не многие знают, а ведь он иногда очень удобен.

---

### `[attr |= value]`

Выбирает элементы, у которых значение атрибута **равно указанной строке или начинается с неё**.

Пример: [lang |= ru] - элементы с атрибутом lang, значение которого равно ru или начинается с ru-, например "ru-RU". Но он практически не используется и его заменяет комбинация: [lang = ru], [lang ^= ru-].

---

### `:target`

Выделяет активный якорь в HTML. Допустим у нас ссылка ссылается на внутренний якорь `<a href="#anchor">` на странице, тогда при клике по этой ссылке этот селектор выделить элемент имеющий атрибут `id="anchor"`.
```css
:target { color: red; }
```

Получим:
```html
<a href="#anchor1">Перейти на якорь 1</a>
<a href="#anchor2">Перейти на якорь 2</a>

<!-- При клике по этим ссылкам выберется соответствующий элемент ниже -->

<p id="anchor1">Элемент 1</p>
<p id="anchor2">Элемент 2</p>

```

---

### `:checked`

Стилизует выбранные radio / checkbox. Может использоваться с тегом input или option или без них: `input:checked`, `option:checked` или `:checked`.

Например, следующий код выделяет сплошной черной рамкой в 1px область возле включенного флажка:
```css
input[type=radio]:checked { border:1px solid black; }
```

---

### `:default`

Выбирает элемент формы, который считается элементом по умолчанию. Работает с тегами `<button>`, `<input>`, `<option>`.
```html
<form>
	<input type="submit"><!-- будет выбран -->
	<input type="submit">
	<input type="reset">
</form>
```

- `<option>` считается дефолтным (:default), если это элемент с атрибутом selected или первый enabled (NOT disabled) элемент по порядку DOM элементов. Для `<select multiple>` каждый selected элемент будет считаться дефолтным.
    
- `<input type="checkbox">` и `<input type="radio">` считаются дефолтными, если они выбраны (имеют атрибут checked).
    
- `<button>` считается дефолтной, если это базовая кнопка сабмита формы (`<form>`) — это первая в форме кнопка по порядку DOM элементов. Это также справедливо и для типов `<input type="submit">`.

---

### `:disabled`

Выбирает любой disabled (отключенный) элемент.

Элемент считается отключенным, когда с ним нельзя взаимодействовать (выбрать, кликнуть, сфокусироваться, вписать что-либо и т.д.). Если элемент не `disabled`, то на нём по-умолчанию установлен статус `enabled`.

Установим цвет фона для всех отключенных полей формы с типом text: `<input type="text">`:
```css
input[type="text"]:disabled {
	background: red;
}
```

```html
<form action="#">
	<legend>Заголовок</legend>
	<input disabled type="text" placeholder="Имя">
	<input type="text" placeholder="Адрес">
</form>
```

Результат:
<form class="form" action="#">
	<legend>Заголовок</legend>
	<input  disabled type="text" placeholder="Имя">
	<input type="text" placeholder="Адрес">
</form>

Установим цвет фона элементов `<select class="country" disabled>` — все отключенные элементы SELECT с классом COUNTRY:
```css
select.country:disabled {
	background: #dddddd;
}
```

---

### `:empty`

Выбирает любой пустой элемент. Пустой значит в нём не должно быть ничего (ни одной node): ни пробелов, ни текста, ни других элементов. HTML комментарии, CSS код не повлияют на то что элемент будет считать не пустой.
```css
.box {
	background: red;
	height: 200px;
	width: 200px;
}

.box:empty {
	background: lime;
}
```

```html
<div class="box"><!-- пустой --></div>
<div class="box">Я буду красным</div>
<div class="box">
	<!-- Я буду красным, так как перед комментарием стоят пробелы -->
</div>
```

---

### `::before`

`X::before` добавляет псевдо-элемент в начало X (внутрь тега). Работает вместе со свойством `X::before{ content:'' }`, которое указывает содержание добавленного элемента. content нужно указывать даже если содержание пустое (`content:''`), т.к. элемент должен хоть что-то содержать.

Например с помощью таких стилей, можно указать значок для LI списка:
```css
li:before {
	content: '-';
	display: inline-block;
	margin-right: .5em;
}
```

Получим:
```
- элемент 1
- элемент 2
```

> Когда-то все браузеры реализовали эти псевдо-элементы с одним двоеточием: `:after :before`. Но стандарт с тех пор изменился и сейчас все, кроме IE8, понимают также современную запись с двумя двоеточиями. Для IE8 нужно по-прежнему одно.

---

### `:after`

`X:after` добавляет псевдо-элемент в конец X (внутрь тега). Работать только совместно со свойством `X::after{ content:'' }`, которое указывает содержание добавленного элемента. content нужно указывать даже если содержание пустое (`content:''`), т.к. элемент должен хоть что-то содержать.

Например с помощью таких стилей, можно создать блок который будет очищать все вышестоящие обтекающие элементы. Частый прием в верстке:
```css
.clear:after {
	content: '';
	display: table;
	clear: both;
}
```


---
## Источники
- #### [playground](https://www.w3schools.com/cssref/trysel.php?)
- #### [kama](https://wp-kama.ru/id_5875/30-css-selektorov.html)