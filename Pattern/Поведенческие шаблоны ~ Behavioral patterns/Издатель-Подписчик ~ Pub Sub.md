
"Издатель-Подписчик" — это парадигма обмена сообщениями, в которой отправители сообщений (называемые издателями) не отправляют сообщения конкретным получателям (называемым подписчиками) напрямую. Вместо этого, опубликованные сообщения группируются по категориям и отправляются разным подписчикам. Подписчики могут интересоваться одной или несколькими категориями сообщений и получать только такие сообщения, не зная о существовании издателей.

В "Издателе-Подписчике" существует три основные роли: Издатель/Publisher, Канал передачи сообщений/Channel и Подписчик/Subscriber.

![Alt text](./assets/Издатель-Подписчик%20~%20Pub%20Sub.png)


### Пример реализации

```ts
type EventHandler = (...args: any[]) => any;

class EventEmitter {
  private c = new Map<string, EventHandler[]>();

  subscribe(topic: string, ...handlers: EventHandler[]) {
    let topics = this.c.get(topic);

    if (!topics) {
      this.c.set(topic, (topics = []));
    }

    topics.push(...handlers);
  }

  unsubscribe(topic: string, handler?: EventHandler): boolean {
    if (!handler) {
      return this.c.delete(topic);
    }

    const topics = this.c.get(topic);

    if (!topics) {
      return false;
    }

    const index = topics.indexOf(handler);

    if (index < 0) {
      return false;
    }

    topics.splice(index, 1);

    if (topics.length === 0) {
      this.c.delete(topic);
    }

    return true;
  }

  publish(topic: string, ...args: any[]): any[] | null {
    const topics = this.c.get(topic);

    if (!topics) {
      return null;
    }

    return topics.map((handler) => {
      try {
        return handler(...args);
      } catch (e) {
        console.error(e);
        return null;
      }
    });
  }
}


// Using
const eventEmitter = new EventEmitter();

eventEmitter.subscribe("ts", (msg) => console.log(`Получено：${msg}`));

eventEmitter.publish("ts", `Паттерн "Наблюдатель"`);

eventEmitter.unsubscribe("ts");

eventEmitter.publish("ts", `Паттерн "Издатель/Подписчик"`);
```


На приведенной диаграмме Издатель — это Bytefer, тема A и тема B в Каналах соответствуют JavaScript и TypeScript, а Подписчики — Chris1993, Bytefish и др.

В событийно-ориентированной архитектуре паттерн "Издатель-Подписчик" играет важную роль. Конкретная реализация данного паттерна может использоваться в качестве шины событий (Event Hub) для реализации обмена сообщениями между различными компонентами или модулями одной системы.
