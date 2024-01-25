
Паттерн "Наблюдатель" (Observer) представляет поведенческий шаблон проектирования, который использует отношение "один ко многим". В этом отношении есть один наблюдаемый объект и множество наблюдателей. И при изменении наблюдаемого объекта автоматически происходит оповещение всех наблюдателей.

Данный паттерн еще называют Publisher-Subscriber (издатель-подписчик), поскольку отношения издателя и подписчиков характеризуют действие данного паттерна: подписчики подписываются email-рассылку определенного сайта. Сайт-издатель с помощью email-рассылки уведомляет всех подписчиков о изменениях. А подписчики получают изменения и производят определенные действия: могут зайти на сайт, могут проигнорировать уведомления и т.д.

### Когда использовать?

- Когда система состоит из множества классов, объекты которых должны находиться в согласованных состояниях

- Когда общая схема взаимодействия объектов предполагает две стороны: одна рассылает сообщения и является главным, другая получает сообщения и реагирует на них. Отделение логики обеих сторон позволяет их рассматривать независимо и использовать отдельно друга от друга.

- Когда существует один объект, рассылающий сообщения, и множество подписчиков, которые получают сообщения. При этом точное число подписчиков заранее неизвестно и процессе работы программы может изменяться.

---

Паттерн "Наблюдатель" широко используется в веб-приложениях - `MutationObserver`, `IntersectionObserver`, `PerformanceObserver`, `ResizeObserver`, `ReportingObserver`. Все эти API можно рассматривать как примеры применения "Наблюдателя". Кроме того, данный паттерн также используется для перманентного мониторинга событий и реагирования на модификацию данных.

В "Наблюдателе" существует две основные роли: Субъект/Subject и Наблюдатель/Observer.

Паттерн "Наблюдатель" определяет отношение один ко многим (one-to-many), позволяя нескольким объектам-наблюдателям одновременно следить за наблюдаемым субъектом. При изменении состояния наблюдаемого субъекта об этом уведомляются все объекты-наблюдатели, чтобы они, в свою очередь, могли обновить собственное состояние.

![Alt text](./assets/Наблюдатель%20~%20Observer.png)

### Пример реализации

```ts
interface Article {
  author: string
  title: string
  url: string
}

interface Observer {
  notify(article: Article): void;
}

interface Subject {
  observers: Observer[];

  addObserver(observer: Observer): void;

  deleteObserver(observer: Observer): void;

  notifyObservers(article: Article): void;
}

class ConcreteObserver implements Observer {
  constructor(private name: string) {}

  notify(article: Article) {
    console.log(`"Статья: ${article.title}" была отправлена  ${this.name}.`);
  }
}

class ConcreteSubject implements Subject {
  public observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  public deleteObserver(observer: Observer): void {
    const n: number = this.observers.indexOf(observer);

    n != -1 && this.observers.splice(n, 1);
  }

  public notifyObservers(article: Article): void {
    this.observers.forEach((observer) => observer.notify(article));
  }
}

// Using

const subject: Subject = new ConcreteSubject();

const chris1993 = new ConcreteObserver("Chris1993");
const bytefish = new ConcreteObserver("Bytefish");

subject.addObserver(chris1993);
subject.addObserver(bytefish);

subject.notifyObservers({
  author: "Bytefer",
  title: "Observer Pattern in TypeScript",
  url: "https://medium.com/***",
});

subject.deleteObserver(bytefish);

subject.notifyObservers({
  author: "Bytefer",
  title: "Adapter Pattern in TypeScript",
  url: "https://medium.com/***",
});
```
> observer.ts

## Издатель-Подписчик / Pub/Sub

"Издатель-Подписчик" — это парадигма обмена сообщениями, в которой отправители сообщений (называемые издателями) не отправляют сообщения конкретным получателям (называемым подписчиками) напрямую. Вместо этого, опубликованные сообщения группируются по категориям и отправляются разным подписчикам. Подписчики могут интересоваться одной или несколькими категориями сообщений и получать только такие сообщения, не зная о существовании издателей.

В "Издателе-Подписчике" существует три основные роли: Издатель/Publisher, Канал передачи сообщений/Channel и Подписчик/Subscriber.

![Alt text](Издатель-Подписчик%20~%20Pub%20Sub.png)

> pub_sub.ts

На приведенной диаграмме Издатель — это Bytefer, тема A и тема B в Каналах соответствуют JavaScript и TypeScript, а Подписчики — Chris1993, Bytefish и др.

В событийно-ориентированной архитектуре паттерн "Издатель-Подписчик" играет важную роль. Конкретная реализация данного паттерна может использоваться в качестве шины событий (Event Hub) для реализации обмена сообщениями между различными компонентами или модулями одной системы.
