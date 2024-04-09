Интерфейс **`BroadcastChannel`** представляет собой именованный канал, на который может подписаться любой [browser context](https://developer.mozilla.org/en-US/docs/Glossary/Browsing_context) данного [origin.](https://developer.mozilla.org/en-US/docs/Glossary/Origin) Он позволяет осуществлять связь между разными документами (в разных окнах, вкладках, фреймах или iframe) одного и того же происхождения. Сообщения передаются через [`message`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/message_event "сообщение")событие, запускаемое для всех `BroadcastChannel`объектов, прослушивающих канал, кроме объекта, отправившего сообщение. По причинам безопасности контексты, обменивающиеся данными, должны принадлежать одному источнику (same origin). Один источник означает одинаковый протокол, домен и порт.

> [!INFO] **Note:** Эта функция доступна в [[Web Workers]]

<svg viewBox="-1 -1 650 42" preserveAspectRatio="xMinYMin meet">
  <a style="text-decoration: none;" xlink:href="/en-US/docs/Web/API/EventTarget">
    <rect x="0" y="0" width="88" height="25" fill="#fff" stroke="#D4DDE4" stroke-width="2px"></rect>
    <text x="44" y="16" font-size="10px" fill="#4D4E53" text-anchor="middle">
      EventTarget
    </text>
  </a>
  <line x1="88" y1="14" x2="118" y2="14" stroke="#D4DDE4"></line>
  <polyline points="88,14 98,9 98,19 88,14" stroke="#D4DDE4" fill="#fff"></polyline>
  <a style="text-decoration: none;" xlink:href="/en-US/docs/Web/API/BroadcastChannel" aria-current="page">
    <rect x="118" y="0" width="128" height="25" fill="#F4F7F8" stroke="#D4DDE4" stroke-width="2px"></rect>
    <text x="182" y="16" font-size="10px" fill="#4D4E53" text-anchor="middle">
      BroadcastChannel
    </text>
  </a></svg>

---
## Случаи использования

`Broadcast Channel API` обычно используется для синхронизации окон и вкладок браузера для улучшения пользовательского опыта или повышения безопасности. Он также может применяться для уведомления одного контекста о завершении процесса в другом контексте. Другие примеры:

- авторизация пользователя во всех вкладках;
- отображение загруженного ресурса во всех вкладках;
- запуск [[Web Workers]] для выполнения фоновой задачи.

---
## Интерфейс

### Синтаксис

```ts
new BroadcastChannel(channelName)
```

`Broadcast Channel API` предоставляет объект `BroadcastChannel`, позволяющий обмениваться сообщениями с другими контекстами. Конструктор этого объекта принимает единственный аргумент: строку - идентификатор канала (**channel identifier**):
```ts
const channel = new BroadcastChannel("channel_identifier");
```

### Методы

#### `postMessage()`

> позволяет отправлять сообщения всем подключенным контекстам. В качестве аргумента данный метод принимает любой тип данных:

```ts
channel.postMessage("Example message");
```

#### `close()`

> закрываем канал коммуникации, что позволяет браузеру выполнить сборку мусора.

```ts
// Connect to a channel
const channel = new BroadcastChannel("test_channel");

// More operations (like postMessage, …)

// When done, disconnect from the channel
channel.close();
```

При получении сообщения возникает событие `message`. Это событие содержит свойство `data` с отправленными данными, а также другие свойства, позволяющие идентифицировать отправителя, такие как `origin`, `lastEventId`, `source` и `ports`:

```ts
channel.addEventListener("message", ({ data, origin }) => {  
	console.log(`${origin} says ${data}`);
});
```

---

## Пример использования

> Tab 1
```ts
const broadcastChannel = new BroadcastChannel("quote_channel");

broadcastChannel.addEventListener("message", ({ data, origin }) => {  
	console.log(`${origin} says ${data}`);
	// Save `data`
});
```

> Tab 2
```ts
const broadcastChannel = new BroadcastChannel("quote_channel");

const getQuote = async () => {
  if (document.visibilityState !== "visible") return;

  try {
    const quote = 'NICE'
    broadcastChannel.postMessage(quote);
  } catch (e) {
    console.error(e);
  }
};
```

<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=broadcastchannel" frameborder="0" width="100%" height="510px"></iframe>

---

## Источники
- #### [mdn](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel)
- #### [habr](https://habr.com/ru/companies/timeweb/articles/691992/)