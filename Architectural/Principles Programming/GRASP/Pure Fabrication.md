Это шаблон проектирования, который предполагает создание новых классов или компонентов для решения проблем, которые не могут быть или не должны быть решены другими классами. Этот шаблон используется, когда существующие классы не могут быть изменены для решения проблемы.

Не относится к предметной области, но:

- Уменьшает зацепление;
- Повышает связность;
- Упрощает повторное использование.

«Pure Fabrication» отражает концепцию сервисов в модели проблемно-ориентированного проектирования.

Пример задачи: Не используя средства класса «А», внести его объекты в базу данных.

Решение: Создать класс «Б» для записи объектов класса «А» (смотрите также: «Data Access Object»).

Примеры, где `Pure Fabrication` **соблюдается**:

1. Создание класса `Logger` для логирования действий в приложении:

```ts
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class UserService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  // Методы для работы с пользователями, использующие Logger
  createUser(user: User) {
    this.logger.log(`Creating user: ${user.name}`);
    // Логика создания пользователя
  }
}
```

В этом примере класс `Logger` создается для логирования действий в приложении. Этот класс используется в `UserService` для логирования действий, связанных с пользователями.

1. Создание класса `Configuration` для управления конфигурацией приложения:

```ts
class Configuration {
  getDatabaseConnectionString() {
    return 'mongodb://localhost:27017/mydb';
  }
}

class DatabaseService {
  private config: Configuration;

  constructor() {
    this.config = new Configuration();
  }

  // Методы для работы с базой данных, использующие Configuration
  connect() {
    const connectionString = this.config.getDatabaseConnectionString();
    // Логика подключения к базе данных
  }
}
```

В этом примере класс `Configuration` создается для управления конфигурацией приложения. Этот класс используется в `DatabaseService` для получения строки подключения к базе данных.

---

Примеры, где `Pure Fabrication` **нарушается**:

1. Создание класса `User` без необходимости:

```ts
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  // Методы для работы с пользователями
}
```

В этом примеле класс `User` создается без необходимости. Он не имеет зависимостей, которые могут быть выделены в отдельный класс.

1. Создание класса `DatabaseService` без необходимости:

```ts
class DatabaseService {
  private connectionString: string;

  constructor() {
    this.connectionString = 'mongodb://localhost:27017/mydb';
  }

  // Методы для работы с базой данных
  connect() {
    // Логика подключения к базе данных
  }
}
```

В этом примере класс `DatabaseService` создается без необходимости. Он не имеет зависимостей, которые могут быть выделены в отдельный класс.