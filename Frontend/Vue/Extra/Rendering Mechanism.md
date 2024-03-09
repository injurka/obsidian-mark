## Virtual DOM

Вы наверняка слышали о термине "виртуальный DOM", на котором основана система рендеринга Vue.

Виртуальный DOM (VDOM) - это концепция программирования, в которой идеальное, или "виртуальное", представление пользовательского интерфейса хранится в памяти и синхронизируется с "реальным" DOM. Пионером этой концепции стал React, а затем она была принята во многих других фреймворках с различными реализациями, включая Vue.

Virtual DOM - это скорее паттерн, чем конкретная технология, поэтому не существует единой канонической реализации. Мы можем проиллюстрировать идею на простом примере:

```js
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* more vnodes */
  ]
}
```

Здесь vnode - это обычный объект JavaScript ("виртуальный узел"), представляющий элемент `<div>`. Он содержит всю информацию, необходимую для создания реального элемента. Он также содержит больше дочерних vnode, что делает его корнем виртуального дерева DOM.

Рендерер во время выполнения может пройтись по виртуальному DOM-дереву и построить из него реальное DOM-дерево. Этот процесс называется монтированием.

Если у нас есть две копии виртуальных деревьев DOM, рендерер также может пройтись и сравнить эти два дерева, определить различия и применить эти изменения к реальному DOM. Этот процесс называется патчем, также известным как `diffing` или `reconciliation`.

Основное преимущество виртуального DOM заключается в том, что он дает разработчику возможность программно создавать, проверять и компоновать желаемые структуры пользовательского интерфейса декларативным способом, оставляя непосредственную работу с DOM рендереру.


---

## Render Pipeline

На высоком уровне вот что происходит, когда монтируется компонент Vue:

1. **Compile**: Шаблоны Vue компилируются в **render functions**: функции, возвращающие виртуальные деревья DOM. Этот шаг может быть выполнен либо заранее с помощью шага сборки, либо "на лету" с помощью компилятора времени выполнения.
    
2. **Mount**: Рендерер во время выполнения вызывает функции рендеринга, просматривает возвращаемое виртуальное дерево DOM и создает на его основе реальные узлы DOM. Этот шаг выполняется как [[Reactivity in Depth |реактивный эффект]], поэтому он отслеживает все реактивные зависимости, которые были использованы.
    
3. **Patch**: Когда зависимость, использованная во время монтирования, изменяется, эффект запускается повторно. На этот раз создается новое, обновленное виртуальное дерево DOM. Рендерер во время выполнения просматривает новое дерево, сравнивает его со старым и применяет необходимые обновления к реальному DOM.

![[phases.png]]


---

## Шаблоны против функций рендеринга 

Шаблоны Vue компилируются в виртуальные функции рендеринга DOM. Vue также предоставляет API, которые позволяют нам пропустить этап компиляции шаблонов и напрямую создавать функции рендеринга. Функции рендеринга более гибкие, чем шаблоны, когда речь идет о высокодинамичной логике, потому что вы можете работать с vnodes, используя всю мощь JavaScript.

Почему же Vue по умолчанию рекомендует использовать шаблоны? На это есть несколько причин:

1. Шаблоны ближе к реальному HTML. Это облегчает повторное использование существующих HTML-сниппетов, применение лучших практик доступности, стилизацию с помощью CSS, а также понимание и модификацию дизайнерами.
    
2. Шаблоны легче поддаются статистическому анализу благодаря более детерминированному синтаксису. Это позволяет компилятору шаблонов Vue применять множество оптимизаций во время компиляции для повышения производительности виртуальной DOM (о чем мы поговорим ниже).

На практике шаблонов достаточно для большинства случаев использования в приложениях. Функции рендеринга обычно используются только в многократно используемых компонентах, которые должны иметь дело с высокодинамичной логикой рендеринга. Более подробно использование функций рендеринга рассматривается в [Render Functions & JSX](https://vuejs.org/guide/extras/render-function).


---

## Compiler-Informed Virtual DOM ~ ВVirtual DOM на основе данных компилятора

Реализация виртуального DOM в React и большинстве других реализаций виртуального DOM является чисто исполнительной: алгоритм согласования не может делать никаких предположений о входящем виртуальном DOM-дереве, поэтому для обеспечения корректности ему приходится полностью обходить это дерево и дифферинцировать реквизиты каждого vnode. Кроме того, даже если часть дерева никогда не изменяется, для нее всегда создаются новые vnode при каждом повторном рендеринге, что приводит к излишней нагрузке на память. Это один из наиболее критикуемых аспектов виртуального DOM: в процессе согласования, осуществляемого грубой силой, эффективность приносится в жертву декларативности и корректности.

Но это не обязательно должно быть так. В Vue фреймворк контролирует и компилятор, и время выполнения. Это позволяет нам реализовать множество оптимизаций во время компиляции, которыми может воспользоваться только тесно связанный рендерер. Компилятор может статически анализировать шаблон и оставлять подсказки в сгенерированном коде, чтобы время выполнения могло использовать короткие пути, когда это возможно. В то же время мы сохраняем возможность для пользователя опускаться на уровень функций рендеринга для более прямого управления в крайних случаях. Мы называем этот гибридный подход **Compiler-Informed Virtual DOM**.

Ниже мы рассмотрим несколько основных оптимизаций, сделанных компилятором шаблонов Vue для повышения производительности виртуального DOM во время выполнения.

### Static Hoisting ~ Статический подъем

Довольно часто в шаблоне встречаются части, не содержащие динамических привязок:

**template**
```jsx
<div>
  <div>foo</div> <!-- hoisted -->
  <div>bar</div> <!-- hoisted -->
  <div>{{ dynamic }}</div>
</div>
```

**compiled template**
```jsx
import { createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createElementVNode("div", null, "foo", -1 /* HOISTED */)
const _hoisted_2 = /*#__PURE__*/_createElementVNode("div", null, "bar", -1 /* HOISTED */)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createCommentVNode(" hoisted "),
    _hoisted_2,
    _createCommentVNode(" hoisted "),
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```

**AST**
```json
{
  "type": 0,
  "source": "<div>\n  <div>foo</div> <!-- hoisted -->\n  <div>bar</div> <!-- hoisted -->\n  <div>{{ dynamic }}</div>\n</div>\n",
  "children": [
    {
      ...
    }
  ],
  "helpers": {},
  "components": [],
  "directives": [],
  "hoists": [
	{
		...
	}
  ],
  "imports": [],
  "cached": 0,
  "temps": 0,
  "codegenNode": {
    "type": 13,
    "tag": "\"div\"",
    "children": [
	 {
		...	
	 }
    ],
    "isBlock": true,
    "disableTracking": false,
    "isComponent": false,
    "loc": {
      "start": {
        "column": 1,
        "line": 1,
        "offset": 0
      },
      "end": {
        "column": 7,
        "line": 5,
        "offset": 107
      },
      "source": "<div>\n  <div>foo</div> <!-- hoisted -->\n  <div>bar</div> <!-- hoisted -->\n  <div>{{ dynamic }}</div>\n</div>"
    }
  },
  "loc": {
    "start": {
      "column": 1,
      "line": 1,
      "offset": 0
    },
    "end": {
      "column": 1,
      "line": 6,
      "offset": 108
    },
    "source": "<div>\n  <div>foo</div> <!-- hoisted -->\n  <div>bar</div> <!-- hoisted -->\n  <div>{{ dynamic }}</div>\n</div>\n"
  },
  "transformed": true,
  "filters": []
}
```

**Options**
```json
{
  "mode": "module",
  "filename": "Foo.vue",
  "prefixIdentifiers": false,
  "hoistStatic": true,
  "cacheHandlers": false,
  "scopeId": null,
  "inline": false,
  "ssrCssVars": "{ color }",
  "compatConfig": {
    "MODE": 3
  },
  "whitespace": "condense",
  "bindingMetadata": {
    "TestComponent": "setup-const",
    "setupRef": "setup-ref",
    "setupConst": "setup-const",
    "setupLet": "setup-let",
    "setupMaybeRef": "setup-maybe-ref",
    "setupProp": "props",
    "vMySetupDir": "setup-const"
  }
}
```


Дивы `foo` и `bar` статичны - повторное создание vnodes и их дифференциация при каждом рендере не нужны. Компилятор Vue автоматически выводит вызовы создания vnode из функции рендеринга и повторно использует те же vnode при каждом рендере. Рендерер также может полностью пропустить их дифференциацию, когда замечает, что старый и новый vnode - это один и тот же vnode.

Кроме того, при наличии достаточного количества последовательных статических элементов они сжимаются в один "статический vnode", который содержит простую HTML-строку для всех этих узлов (пример). Эти статические узлы монтируются путем непосредственного задания innerHTML. Они также кэшируют соответствующие им DOM-узлы при первоначальном монтировании - если тот же кусок контента будет повторно использован в другом месте приложения, новые DOM-узлы будут созданы с помощью встроенной функции cloneNode(), что очень эффективно.

**template**
```jsx
<div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div class="foo">foo</div>
  <div>{{ dynamic }}</div>
</div>
```

**compiled template**
```jsx
import { createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div><div class=\"foo\">foo</div>", 5)

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("div", null, [
    _hoisted_1,
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ]))
}
```


### Patch Flags ~ Флаги патчей

Для отдельного элемента с динамическими связями мы также можем извлечь из него много информации во время компиляции:

**template**
```jsx
<!-- class binding only -->
<div :class="{ active }"></div>

<!-- id and value bindings only -->
<input :id="id" :value="value">

<!-- text children only -->
<div>{{ dynamic }}</div>
```

**compiled template**
```jsx
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    _createElementVNode("div", {
      class: _normalizeClass({ active: _ctx.active })
    }, null, 2 /* CLASS */),
    _createElementVNode("input", {
      id: _ctx.id,
      value: _ctx.value
    }, null, 8 /* PROPS */, ["id", "value"]),
    _createElementVNode("div", null, _toDisplayString(_ctx.dynamic), 1 /* TEXT */)
  ], 64 /* STABLE_FRAGMENT */))
}
```

При генерации кода функции рендеринга для этих элементов Vue кодирует тип обновления, который требуется каждому из них, непосредственно в вызове создания vnode:

```jsx
createElementVNode("div", {
  class: _normalizeClass({ active: _ctx.active })
}, null, 2 /* CLASS */)
```


Последний аргумент, `2`, представляет собой [patch flag](https://github.com/vuejs/core/blob/main/packages/shared/src/patchFlags.ts). Элемент может иметь несколько флагов исправлений, которые будут объединены в одно число. Рендерер во время выполнения может проверить флаги с помощью [битовых операций](https://en.wikipedia.org/wiki/Bitwise_operation), чтобы определить, нужно ли ему выполнять определенную работу:

```jsx
if (vnode.patchFlag & PatchFlags.CLASS /* 2 */) {
  // update the element's class
}
```

Побитовые проверки выполняются чрезвычайно быстро. Благодаря флагам патча Vue может выполнять минимальный объем работы при обновлении элементов с динамическими привязками.

Vue также кодирует тип дочерних узлов. Например, шаблон, имеющий несколько корневых узлов, представляется как фрагмент. В большинстве случаев мы точно знаем, что порядок этих корневых узлов никогда не изменится, поэтому эта информация также может быть предоставлена среде выполнения в качестве флага исправления:

```jsx
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

Таким образом, время выполнения может полностью пропустить согласование дочерних порядков для корневого фрагмента.

### Tree Flattening ~ Сплющивание дерева

Если еще раз взглянуть на сгенерированный код из предыдущего примера, то можно заметить, что корень возвращаемого виртуального DOM-дерева создается с помощью специального вызова `createElementBlock()`:

```jsx
export function render() {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    /* children */
  ], 64 /* STABLE_FRAGMENT */))
}
```

Концептуально, "блок" - это часть шаблона, которая имеет стабильную внутреннюю структуру. В данном случае весь шаблон имеет один блок, поскольку не содержит структурных директив типа `v-if` и `v-for`.

Каждый блок отслеживает все узлы-потомки (не только прямые дочерние), имеющие флаги исправления. Например:

```jsx
<div> <!-- root block -->
  <div>...</div>         <!-- not tracked -->
  <div :id="id"></div>   <!-- tracked -->
  <div>                  <!-- not tracked -->
    <div>{{ bar }}</div> <!-- tracked -->
  </div>
</div>
```

В результате получается сглаженный массив, содержащий только динамические узлы-потомки:

```jsx
div (block root)
- div with :id binding
- div with {{ bar }} binding
```

Когда этому компоненту нужно перерисоваться, ему нужно обойти только сплющенное дерево, а не все дерево. Это называется **Сплющивание дерева**, и оно значительно сокращает количество узлов, которые нужно обойти во время виртуального согласования DOM. Любые статические части шаблона эффективно пропускаются.

Директивы `v-if` и `v-for` создают новые узлы блока:
```jsx
<div> <!-- root block -->
  <div>
    <div v-if> <!-- if block -->
      ...
    <div>
  </div>
</div>
```

Дочерний блок отслеживается внутри массива динамических потомков родительского блока. Это позволяет сохранить стабильную структуру родительского блока.

### Impact on SSR Hydration ~ Влияние на SSR Hydration

Флаги патчей и сплющивание деревьев также значительно улучшают производительность Vue [[Server-Side Rendering (SSR)]]:

- Одноэлементная гидратация может использовать быстрые пути, основанные на флаге патча соответствующего vnode.
    
- Во время гидратации нужно обходить только блочные узлы и их динамические потомки, что позволяет добиться частичной гидратации на уровне шаблона.

---

## Источники
- #### [vuejs](https://vuejs.org/guide/extras/rendering-mechanism)
- #### [habr](https://habr.com/ru/companies/nordclan/articles/699356/)
