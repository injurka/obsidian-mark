**Web Push API** — это технология, позволяющая веб-приложениям отправлять push-уведомления пользователям, даже когда браузер закрыт или приложение не активно. Это улучшает взаимодействие с пользователем и повышает вовлеченность.

## Как использовать Web Push API

1. **Подписка на push-уведомления**:
   Для начала пользователь должен дать согласие на получение push-уведомлений. Это делается через метод `subscribe` объекта `PushManager`.

```javascript
navigator.serviceWorker.ready.then(function(registration) {
   registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(applicationServerPublicKey)
   }).then(function(subscription) {
      console.log('Подписка успешно создана:', subscription);
   }).catch(function(error) {
      console.error('Не удалось создать подписку:', error);
   });
});
```

2. **Отправка push-уведомления**:
   Для отправки push-уведомления на сервере используется `PushSubscription` объект, полученный на предыдущем шаге.

```javascript
fetch('/api/send-push-notification', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json'
   },
   body: JSON.stringify(subscription)
}).then(function(response) {
   console.log('Push-уведомление отправлено');
}).catch(function(error) {
   console.error('Не удалось отправить push-уведомление:', error);
});
```

3. **Обработка push-уведомления на клиенте**:
   В сервис-воркере необходимо обработать событие `push`, чтобы показать уведомление пользователю.

```javascript
self.addEventListener('push', function(event) {
   if (event.data) {
      const notificationData = event.data.json();
      event.waitUntil(
         self.registration.showNotification(notificationData.title, {
            body: notificationData.body,
            icon: notificationData.icon
         })
      );
   }
});
```

4. **Обработка действий пользователя**:
   Можно обрабатывать действия пользователя по клику на уведомление через событие `notificationclick`.

```javascript
self.addEventListener('notificationclick', function(event) {
   event.notification.close();
   event.waitUntil(
      clients.openWindow('https://your-website.com')
   );
});
```

## Особенности Web Push API

1. **Безопасность**:
   Web Push API требует использования HTTPS для обеспечения безопасности передачи данных.

2. **Согласие пользователя**:
   Пользователь должен явно дать согласие на получение push-уведомлений, что повышает уровень конфиденциальности и уважения к пользователю.

3. **Производительность**:
   Push-уведомления могут быть отправлены даже когда браузер закрыт, что улучшает взаимодействие с пользователем и повышает вовлеченность.

4. **Гибкость**:
   API предоставляет возможность настройки содержания и внешнего вида уведомлений, а также обработки действий пользователя.

5. **Совместимость**:
   Web Push API поддерживается большинством современных браузеров, но всегда стоит проверять поддержку перед использованием. Для старых браузеров могут потребоваться полифилы.


<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=push-api" frameborder="0" width="100%" height="510px"></iframe>

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/API/Push_API)
- #### [web-dev](https://web.dev/explore/notifications)