# WebSocket углубленно: Паттерны надежности

Стандартный API браузера `new WebSocket('ws://...')` слишком примитивен для реальных продакшен-приложений. Он не умеет справляться с нестабильным мобильным интернетом, тихими разрывами связи и лимитами на открытые соединения. Для построения надежного real-time транспорта применяются специализированные паттерны.

---

## 1. Паттерн Reconnection с Exponential Backoff и Jitter

Если соединение разорвалось (пользователь зашел в лифт или сменил Wi-Fi на LTE), обычный сокет просто перейдет в состояние `CLOSED`. Нам нужно автоматически переподключиться.

### Проблема Thundering Herd (Грохочущая толпа)
Если у вас 100 000 пользователей в онлайне и ваш сервер перезагружается, все клиенты одновременно потеряют связь. Если все они начнут переподключаться каждую секунду, они устроят DDoS-атаку на ваш собственный сервер (Thundering Herd Problem).

### Решение: Экспоненциальный откат (Exponential Backoff) + Случайность (Jitter)
Мы увеличиваем интервал между попытками в геометрической прогрессии и добавляем случайный сдвиг (джиттер), чтобы распределить нагрузку на сервер во времени.

```javascript
class ReconnectingWebSocket {
  constructor(url) {
    this.url = url;
    this.attempt = 0;
    this.maxDelay = 30000; // Максимальная задержка 30 секунд
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('Соединение установлено');
      this.attempt = 0; // Сбрасываем попытки при успешном подключении
    };

    this.ws.onclose = () => {
      this.scheduleReconnect();
    };
  }

  scheduleReconnect() {
    this.attempt++;
    
    // Экспоненциальный расчет: 1с, 2с, 4с, 8с...
    const baseDelay = Math.min(this.maxDelay, Math.pow(2, this.attempt) * 1000);
    
    // Добавляем Jitter (случайное отклонение +/- 20%)
    const jitter = (Math.random() - 0.5) * 0.2 * baseDelay;
    const finalDelay = baseDelay + jitter;

    console.log(`Переподключение через ${Math.round(finalDelay)} мс (попытка ${this.attempt})`);
    
    setTimeout(() => this.connect(), finalDelay);
  }
}
```

---

## 2. Паттерн Heartbeat (Ping/Pong для выявления "тихой смерти")

Иногда интернет-соединение рвется «тихо» (например, роутер сбросил таблицу трансляции NAT, или промежуточный прокси-сервер оборвал неактивную сессию). При этом сокет считает, что он все еще подключен, а события `onclose` или `onerror` не срабатывают.

Для контроля «жизнеспособности» соединения настраивают циклическую проверку **Heartbeat (биение сердца)**.

```text
КЛИЕНТ                                             СЕРВЕР
  │ ───► Ping (Каждые 30 сек) ──────────────────────► │ (Сокет жив)
  │ ◄─── Pong (Ответ в течение 5 сек) ─────────────── │
  │                                                   │
  │ ───► Ping ──────────────────────────────────────► │ (Потеря пакетов)
  │      [Таймаут ожидания Pong истек!]               │ 
  │ ───► Принудительный разрыв сокета (client.close)  │ 
  │ ───► Запуск процесса Reconnection                 │
```

### Код реализации Heartbeat на клиенте:
```javascript
class HeartbeatWebSocket {
  constructor(url) {
    this.url = url;
    this.pingInterval = 30000; // 30 секунд
    this.pongTimeout = 5000;   // Ожидание ответа 5 секунд
    this.pingTimer = null;
    this.pongTimer = null;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.startHeartbeat();
    this.ws.onmessage = () => this.resetHeartbeat(); // Любое сообщение подтверждает связь
    this.ws.onclose = () => this.stopHeartbeat();
  }

  startHeartbeat() {
    this.pingTimer = setInterval(() => {
      this.ws.send(JSON.stringify({ type: 'ping' }));
      
      // Запускаем таймер ожидания ответа
      this.pongTimer = setTimeout(() => {
        console.warn('Сервер не ответил на пинг. Закрываем сокет.');
        this.ws.close(); // Спровоцирует reconnect
      }, this.pongTimeout);
      
    }, this.pingInterval);
  }

  resetHeartbeat() {
    clearTimeout(this.pongTimer); // Сервер прислал ответ (pong или данные), отменяем таймаут
  }

  stopHeartbeat() {
    clearInterval(this.pingTimer);
    clearTimeout(this.pongTimer);
  }
}
```

---

## 3. Паттерн Multiplexing (Мультиплексирование каналов)

Браузеры имеют ограничение на количество одновременных постоянных соединений к одному домену. Открывать отдельный WebSocket для чата, отдельный для уведомлений и отдельный для котировок — расточительно и накладно по ресурсам сервера.

**Мультиплексирование** позволяет использовать **один физический сокет** для передачи логически независимых потоков данных (каналов).

### Структура фрейма сообщений
Для разделения потоков все сообщения упаковываются в специальный JSON-конверт, содержащий идентификатор канала (topic/channel):

```json
{
  "topic": "chat:room_105",
  "event": "new_message",
  "payload": {
    "text": "Привет всем!",
    "user": "Алексей"
  }
}
```

### Схема работы мультиплексора:
```text
                  ┌──► Модуль Чат (Подписан на "chat:*")
[Единый WebSocket]┼──► Модуль Уведомления (Подписан на "notifications")
                  └──► Модуль Аналитика (Подписан на "analytics")
```
Клиент отправляет сообщение `subscribe` на определенный топик, а сервер начинает стримить события с этим топиком в общий сокет. На клиенте диспетчер (dispatcher) парсит входящий `topic` и распределяет событие по нужным подписчикам.

---

## 4. Буферизация сообщений в оффлайне (Offline Message Queue)

Если пользователь пытается отправить сообщение, когда сокет находится в режиме переподключения, вызов `ws.send()` бросит ошибку.

Для решения этой проблемы создается локальный буфер сообщений.

```javascript
class BufferedWebSocket {
  constructor(url) {
    this.url = url;
    this.queue = [];
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.flushQueue();
  }

  // Публичный метод отправки вместо ws.send
  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.log('Сокет закрыт. Сообщение добавлено в очередь.');
      this.queue.push(data);
    }
  }

  flushQueue() {
    while (this.queue.length > 0) {
      const data = this.queue.shift();
      this.ws.send(JSON.stringify(data));
    }
  }
}
```
Для критически важных данных (например, несохраненные черновики писем) этот буфер можно дополнительно сохранять в `IndexedDB` или `LocalStorage`, чтобы сообщения не потерялись при полной перезагрузке вкладки пользователем.
