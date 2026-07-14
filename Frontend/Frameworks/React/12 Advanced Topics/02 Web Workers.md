# Web Workers (Веб-воркеры)

JavaScript работает в одном потоке (Single-threaded). Если вы запустите цикл `for` на 10 миллиардов итераций внутри React-компонента (например, для парсинга гигантского CSV-файла, криптографии или обработки изображений), интерфейс "заморозится". Пользователь не сможет нажимать кнопки, а анимации остановятся.

**Web Workers** позволяют вынести тяжелые вычисления в отдельный фоновый поток, не блокируя UI (Main Thread).

## 1. Как работают Воркеры
Воркеры не имеют доступа к DOM (в них нельзя использовать `document.getElementById` или React-компоненты). Они общаются с главным потоком только посредством передачи сообщений (`postMessage`).

**worker.js (Отдельный файл):**
```javascript
// Слушаем сообщения из главного потока
self.onmessage = function(event) {
  const data = event.data;
  // Делаем тяжелую математику...
  const result = heavyMath(data);
  // Отправляем результат обратно
  self.postMessage(result);
}
```

## 2. Интеграция с React (Без библиотек)
```jsx
import { useEffect, useRef, useState } from 'react';

function DataProcessor() {
  const [result, setResult] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    // 1. Создаем воркер (путь зависит от вашего сборщика Vite/Next.js)
    workerRef.current = new Worker(new URL('./worker.js', import.meta.url));
    
    // 2. Слушаем ответы
    workerRef.current.onmessage = (event) => {
      setResult(event.data);
    };

    // 3. CLEANUP: Обязательно "убиваем" воркер при размонтировании
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleStart = () => {
    // Отправляем задачу в фоновый поток
    workerRef.current.postMessage({ type: 'START', payload: 1000000 });
  };

  return (
    <div>
      <button onClick={handleStart}>Начать расчет</button>
      <p>Результат: {result}</p>
    </div>
  );
}
```

## 3. Современный стандарт 2026: Comlink
Писать логику через `postMessage` и `onmessage` очень больно — это не типизировано и выглядит как спагетти-код.
Индустрия использует библиотеку **Comlink** (от Google). Она превращает Воркер в обычный объект, чьи методы возвращают Промисы.

**worker.js:**
```javascript
import * as Comlink from 'comlink';

const obj = {
  heavyMath(num) { return num * 1000; }
};

Comlink.expose(obj); // Экспортируем воркер
```

**React-компонент:**
```jsx
import * as Comlink from 'comlink';

// Подключаем воркер как обычный модуль!
const worker = new Worker(new URL('./worker.js', import.meta.url));
const api = Comlink.wrap(worker);

async function handleStart() {
  // Выглядит как обычный асинхронный вызов функции!
  const result = await api.heavyMath(42); 
  setResult(result);
}
```

## 4. ⚠️ Edge Case: Сериализация
Главное правило Воркеров: **данные при передаче через `postMessage` клонируются (Structured Clone Algorithm)**.
Вы НЕ МОЖЕТЕ передать в воркер:
1. Функции (коллбэки).
2. Классы (передадутся только их свойства, но не методы).
3. DOM-узлы.

Если вы попытаетесь передать функцию `worker.postMessage({ callback: () => {} })`, приложение упадет с ошибкой `DataCloneError`.
