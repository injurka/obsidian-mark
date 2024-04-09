## Пример

```ts
class CustomList extends HTMLElement {
  constructor() {
    super();
    // элемент создан
  }

  connectedCallback() {
    // браузер вызывает этот метод при добавлении элемента в документ
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  disconnectedCallback() {
    // браузер вызывает этот метод при удалении элемента из документа
    // (может вызываться много раз, если элемент многократно добавляется/удаляется)
  }

  static get observedAttributes() {
    return [/* массив имён атрибутов для отслеживания их изменений */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // вызывается при изменении одного из перечисленных выше атрибутов
  }

  adoptedCallback() {
    // вызывается, когда элемент перемещается в новый документ
    // (происходит в document.adoptNode, используется очень редко)
  }

  // у элемента могут быть ещё другие методы и свойства
}

// сообщим браузеру, что <custom-list> обслуживается нашим новым классом
customElements.define("custom-list", CustomList, { extends: "ul" });
```

```html
<ul is="custom-list">
  ...
</ul>
```
> or
```html
<custom-list>
  ...
</custom-list>
```
---

## Использование lifecycle callbacks

Вы можете определить несколько разных колбэков в конструкторе пользовательских элементов, которые сработают на разных этапах жизненного цикла элемента:

- `connectedCallback`: Срабатывает, когда пользовательский элемент впервые добавляется в DOM.
- `disconnectedCallback`: Срабатывает, когда пользовательский элемент удаляется из DOM.
- `adoptedCallback`: Срабатывает, когда пользовательский элемент перемещён в новый документ.
- `attributeChangedCallback`: Срабатывает, когда пользовательскому элементу добавляют, удаляют или изменяют атрибут.


<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=custom-elementsv1" frameborder="0" width="100%" height="510px"></iframe>

---
## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/API/Web_components/Using_custom_elements)