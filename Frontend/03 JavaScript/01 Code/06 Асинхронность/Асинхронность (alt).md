# Асинхронность (Оглавление)

- ### [[Promise]]
- ### [[async-await|async~await]]

---

## Визуализация асинхронности в JS (Event Loop)

JavaScript — однопоточный язык программирования. Чтобы не блокировать основной поток выполнения (например, при сетевых запросах или таймерах), он использует механизм **Event Loop (Цикл событий)**.

```mermaid
graph TD
    A["Call Stack (Стек вызовов)"] -->|Вызов асинхронного Web API| B["Web API / Node C++"]
    B -->|По завершении| C["Task Queue / Microtask Queue"]
    
    C -.->|Event Loop переносит коллбеки| A
    
    note1["Event Loop проверяет:<br/>Пуст ли Call Stack?<br/>Если да, берет задачу из очереди"] -.-> C
```

- **Microtasks** (Микрозадачи): `Promise.then`, `queueMicrotask`. Имеют наивысший приоритет.
- **Macrotasks** (Макрозадачи): `setTimeout`, `setInterval`, события DOM. Выполняются после очистки очереди микрозадач.