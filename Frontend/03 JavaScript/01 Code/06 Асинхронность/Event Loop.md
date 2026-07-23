# Event Loop (Событийный цикл)

Event Loop — это механизм, который координирует выполнение кода, сбор событий и выполнение подзадач в однопоточном окружении JavaScript.

## Макрозадачи и Микрозадачи

### Microtasks (Микрозадачи)
- `Promise.then / catch / finally`
- `queueMicrotask`
- `MutationObserver`
- `process.nextTick` (в Node.js)

### Macrotasks (Макрозадачи)
- `setTimeout` / `setInterval`
- `setImmediate` (Node.js)
- `requestAnimationFrame` (перед отрисовкой)
- I/O операции, события мыши/клавиатуры

## Порядок выполнения
1. Выполняется текущая макрозадача (например, весь скрипт).
2. Выполняются **все** задачи из очереди микрозадач до ее полного опустошения.
3. При необходимости выполняется отрисовка кадра (Rendering).
4. Берется следующая макрозадача из очереди.

## Связанные темы
- [[01. JavaScript/06. Асинхронность/Promise|Promises]]
- [[01. JavaScript/06. Асинхронность/async-await|async/await]]
- [[01. JavaScript/02. Функции, область видимости и выполнение/Стек вызовов|Call Stack]]
