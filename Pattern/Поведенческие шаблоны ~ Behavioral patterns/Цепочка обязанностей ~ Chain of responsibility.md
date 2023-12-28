
Поведенческий шаблон проектирования, который позволяет избежать жесткой привязки отправителя запроса к получателю. Все возможные обработчики запроса образуют цепочку, а сам запрос перемещается по этой цепочке. Каждый объект в этой цепочке при получении запроса выбирает, либо закончить обработку запроса, либо передать запрос на обработку следующему по цепочке объекту.

### Когда применяется цепочка обязанностей?

- Когда имеется более одного объекта, который может обработать определенный запрос

- Когда надо передать запрос на выполнение одному из нескольких объект, точно не определяя, какому именно объекту

- Когда набор объектов задается динамически

<hr />

Паттерн "Цепочка обязанностей" (далее также - "Цепочка") позволяет избежать тесной связи и взаимного влияния между отправителем и получателем запроса, предоставляя нескольким объектам возможность последовательно обрабатывать запрос. В рассматриваемом паттерне многочисленные объекты ссылаются друг на друга, формируя цепочку объектов. Запрос передаются по цепочке до тех пор, пока один из объектов не осуществит его окончательную обработку.

Возьмем, к примеру, процедуру согласования отпуска в нашей компании: когда мне нужен выходной, я обращаюсь только к тимлиду, такой запрос не требуется передавать его вышестоящему руководителю и директору. Разные должности в компании предполагают разные обязанности и полномочия. Если звено в цепочке не может обработать текущий запрос и имеется следующее звено, запрос будет перенап[[Цепочка обязанностей ~ Chain of responsibility]]равлен в это звено для дальнейшей обработки.

При разработке программного обеспечения распространенным сценарием применения "Цепочки" является посредник (промежуточное ПО, middleware).

![Alt text](Цепочка%20обязанностей%20~%20Chain%20of%20responsibility.png)

### Пример реализации

```ts
// Мы определяем интерфейс Handler.
// Данный интерфейс, в свою очередь, определяет следующие методы:

// use(h: Handler): Handler - для регистрации обработчика (посредника);
// get(url: string, callback: (data: any) => void): void - для вызова обработчика.

interface Handler {
  use(h: Handler): Handler;
  get(url: string, callback: (data: any) => void): void;
}

  

// Далее определяется абстрактный класс AbstractHandler, который инкапсулирует логику обработки запроса.
//  Этот класс соединяет обработчики в цепочку последовательных ссылок:
abstract class AbstractHandler implements Handler {
  next!: Handler;
  
  use(h: Handler) {
    this.next = h;
    return this.next;
  }
  
  get(url: string, callback: (data: any) => void) {
    if (this.next) {
      return this.next.get(url, callback);
    }
  }
}

  

// На основе AbstractHandler определяются классы AuthMiddleware и LoggerMiddleware.
// Посредник AuthMiddleware используется для обработки аутентификации пользователей,
// а посредник LoggerMiddleware - для вывода информации о запросе:
class AuthMiddleware extends AbstractHandler {
  isAuthenticated: boolean;

  constructor(username: string, password: string) {
    super();
    
    this.isAuthenticated = false;
    
    if (username === "login" && password === "123") {
      this.isAuthenticated = true;
    }
  }

  get(url: string, callback: (data: any) => void) {
    if (this.isAuthenticated) {
      return super.get(url, callback);
    } else {
      throw new Error("Не авторизован!");
    }
  }
}

class LoggerMiddleware extends AbstractHandler {
  get(url: string, callback: (data: any) => void) {
    console.log(`Адрес запроса: ${url}.`);

    return super.get(url, callback);
  }
}

class Route extends AbstractHandler {
  urlDataMap: { [key: string]: any };
  
  constructor() {

    super();

    this.urlDataMap = {
      "/api/todo": [{ title: "Изучение паттернов проектирования" }],
      "/api/random": () => Math.random(),
    };
  }

 get(url: string, callback: (data: any) => void) {
  super.get(url, callback);

  if (this.urlDataMap.hasOwnProperty(url)) {
      const value = this.urlDataMap[url];
      const result = typeof value === "function" ? value() : value;
      callback(result);
    }
  }
}

// Using
const route = new Route();

route.use(new AuthMiddleware("login", "123")).use(new LoggerMiddleware());

route.get("/api/todo", (data) => {
  console.log(JSON.stringify(data, null, 2));
});

route.get("/api/random", (data) => {
  console.log(data);
});
```


Случаи использования паттерна "Цепочка обязанностей":

- когда необходимо отправить запрос одному из нескольких объектов без явного указания получателя;

- когда существует несколько объектов для обработки запроса, и выбор конкретного объекта для окончательной обработки запроса можно произвести динамически во время выполнения кода.
