# WebSockets & Real-time

Работа с веб-сокетами в React часто становится причиной утечек памяти (Memory Leaks) и странного поведения интерфейса из-за неправильного понимания жизненного цикла компонентов.

## 1. Правильное подключение через `useEffect`
Главное правило: **Подключение должно устанавливаться один раз**, а при размонтировании компонента сокет должен **обязательно закрываться**.

```jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 1. Создаем подключение
    const socket = io('https://api.example.com');
    
    // 2. Присоединяемся к комнате
    socket.emit('join', roomId);

    // 3. Слушаем события
    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };
    socket.on('message', handleNewMessage);

    // 4. CLEANUP (Критически важно!)
    return () => {
      socket.off('message', handleNewMessage); // Отписываемся от события
      socket.disconnect(); // Закрываем соединение
    };
  }, [roomId]); // Переподключаемся, если изменилась комната

  return <div>{/* Рендер сообщений */}</div>;
}
```

## 2. ⚠️ Edge Case: Stale Closures (Устаревшие замыкания) в обработчиках
Если в примере выше вместо `setMessages(prev => [...prev, msg])` вы напишете `setMessages([...messages, msg])`, ваш обработчик события `socket.on` навсегда "запомнит" массив `messages` пустым (таким, каким он был при первом рендере). 
**Решение:** Всегда использовать функциональное обновление стейта (`prev => ...`) или паттерн `useRef` (Latest Ref Pattern), описанный в разделе про `useRef`.

## 3. Современный подход: `useSyncExternalStore`
В React 18 появился хук `useSyncExternalStore`. Веб-сокет — это идеальный пример "внешнего хранилища", с которым нужно синхронизироваться.
Этот хук позволяет подписываться на сокет-события без использования `useEffect` и `useState`, гарантируя, что UI не "рассинхронизируется" при конкурентном рендеринге (Concurrent Mode).

```jsx
import { useSyncExternalStore } from 'react';
import { socketStore } from './socketStore'; // Внешний файл, где инициализирован сокет

function LiveTracker() {
  // Подписываемся на данные напрямую
  const data = useSyncExternalStore(
    socketStore.subscribe, // Функция подписки
    socketStore.getSnapshot  // Функция получения текущих данных
  );

  return <div>Текущая цена: {data.price}</div>;
}
```

## 4. Архитектура: Глобальный сокет
В крупных приложениях не стоит создавать `new WebSocket()` внутри компонентов. Если компонент размонтируется, соединение разорвется. 
**Best Practice:** Инициализировать сокет вне React (в глобальной области видимости, в Zustand-сторе или в Redux Middleware) и позволять компонентам просто *подписываться* на нужные им события.
