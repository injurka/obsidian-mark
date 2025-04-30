**Web Transport** — это современный API браузера, который предоставляет высокопроизводительную, двунаправленную, безопасную связь между клиентом и сервером. Он основан на протоколе HTTP/3 и предназначен для приложений, которым требуется низкая задержка и высокая надежность передачи данных, таких как онлайн-игры, потоковое видео, финансовые транзакции и другие.

## Основные особенности Web Transport:

1. **Двунаправленность**: Клиент и сервер могут отправлять данные друг другу одновременно.
2. **Низкая задержка**: Благодаря использованию HTTP/3 и QUIC, WebTransport обеспечивает быструю передачу данных.
3. **Безопасность**: Все соединения шифруются с использованием TLS.
4. **Многопоточность**: Поддерживает множество потоков данных (streams), что позволяет изолировать разные типы трафика.
5. **Надежность**: QUIC обеспечивает быстрое восстановление соединения в случае потери пакетов.

## Как использовать Web Transport:

1. **Создание соединения**:
```javascript
const transport = new WebTransport('https://example.com/webtransport');
```

2. **Ожидание установки соединения**:
```javascript
await transport.ready;
```

3. **Отправка данных**:
```javascript
const stream = await transport.createBidirectionalStream();
const writer = stream.writable.getWriter();
writer.write(new TextEncoder().encode('Hello, server!'));
writer.close();
```

4. **Получение данных**:
```javascript
transport.datagrams.readable.getReader().read().then(({ value, done }) => {
 if (!done) {
   console.log('Received datagram:', new TextDecoder().decode(value));
 }
});
```

5. **Обработка ошибок**:
```javascript
transport.closed.catch((error) => {
 console.error('WebTransport closed:', error);
});
```

### Пример полного кода:

```javascript
async function connect() {
  const transport = new WebTransport('https://example.com/webtransport');

  try {
    await transport.ready;
    console.log('Connection established');

    const stream = await transport.createBidirectionalStream();
    const writer = stream.writable.getWriter();
    writer.write(new TextEncoder().encode('Hello, server!'));
    writer.close();

    transport.datagrams.readable.getReader().read().then(({ value, done }) => {
      if (!done) {
        console.log('Received datagram:', new TextDecoder().decode(value));
      }
    });
  } catch (error) {
    console.error('Connection failed:', error);
  }

  transport.closed.catch((error) => {
    console.error('WebTransport closed:', error);
  });
}

connect();
```

## Особенности и ограничения:

1. **Поддержка браузерами**: WebTransport является относительно новым API, и его поддержка может быть ограничена. Убедитесь, что ваш браузер поддерживает этот API.
2. **Серверная поддержка**: Для работы WebTransport требуется сервер, который поддерживает протокол HTTP/3 и QUIC.
3. **Производительность**: WebTransport оптимизирован для низкой задержки и высокой производительности, что делает его отличным выбором для приложений, требующих быстрой передачи данных.

## Источники
- #### [mdn](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport)