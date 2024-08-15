## Введение

В течение долгого времени для анимации на основе JavaScript использовались таймеры и интервалы. Однако с появлением CSS-переходов и анимации, а также развитием технологий, таких как `<canvas>`, возникла необходимость в более эффективных и плавных анимациях. В Firefox 4 был введен новый API для анимации JavaScript под названием `mozRequestAnimationFrame()`, который позже стал стандартизирован как `requestAnimationFrame()`.

## Ранние анимационные циклы

Раньше анимации создавались с использованием `setInterval()`:

```javascript
(function() {
  function updateAnimations() {
    doAnimation1();
    doAnimation2();
    // и т. д.
  }
  setInterval(updateAnimations, 100);
})();
```

Этот метод имел ряд недостатков, таких как неточность интервалов и проблемы с производительностью, особенно при работе с `<canvas>` и браузерными играми.

## Проблемы с интервалами

- **Неточность интервалов**: Задержка, указанная в `setInterval()`, не гарантирует точного времени выполнения кода.
- **Разрешение таймера**: Различные браузеры имеют разные разрешения таймеров (например, Internet Explorer 8 и более ранние версии имеют разрешение 15,625 мс).
- **Фоновые вкладки**: Браузеры регулируют таймеры для вкладок, которые находятся в фоновом режиме или неактивны.

## requestAnimationFrame

`requestAnimationFrame()` решает эти проблемы, позволяя браузеру знать, что происходит анимация, и оптимизировать перерисовку:

```javascript
function updateProgress() {
  var div = document.getElementById("status");
  div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
  if (div.style.left != "100%") {
    requestAnimationFrame(updateProgress);
  }
}
requestAnimationFrame(updateProgress);
```

Этот метод принимает функцию, которая вызывается перед перерисовкой экрана, и гарантирует, что анимация будет плавной и эффективной.

## cancelAnimationFrame

`requestAnimationFrame()` возвращает идентификатор запроса, который можно использовать для отмены запроса с помощью `cancelAnimationFrame()`:

```javascript
let requestID = window.requestAnimationFrame(() => {
  console.log('Repaint!');
});
window.cancelAnimationFrame(requestID);
```

## Управление производительностью

`requestAnimationFrame()` можно использовать для управления производительностью, ограничивая частоту выполнения дорогостоящих операций:

```javascript
let enabled = true;
function expensiveOperation() {
  console.log('Invoked at', Date.now());
}
window.addEventListener('scroll', () => {
  if (enabled) {
    enabled = false;
    window.requestAnimationFrame(expensiveOperation);
    window.setTimeout(() => enabled = true, 50);
  }
});
```

Этот код гарантирует, что `expensiveOperation` выполняется не чаще одного раза каждые 50 мс и только перед перерисовкой.

## Заключение

`requestAnimationFrame()` является мощным инструментом для создания плавных и эффективных анимаций в JavaScript, особенно при работе с `<canvas>` и сложными интерфейсами. Он решает многие проблемы, связанные с таймерами и интервалами, и позволяет браузеру оптимизировать процесс перерисовки.