Шаблон защищает элементы от изменения другими элементами (объектами или подсистемами) с помощью вынесения взаимодействия в фиксированный интерфейс, через который (и только через который) возможно взаимодействие между элементами. Поведение может варьироваться лишь через создание другой реализации интерфейса.

Пример, где `Protected Variations` **соблюдается**:

```ts
interface Database {
  connect(): void;
  query(sql: string): any;
}

class MySQLDatabase implements Database {
  connect(): void {
    // implementation
  }

  query(sql: string): any {
    // implementation
  }
}

class PostgreSQLDatabase implements Database {
  connect(): void {
    // implementation
  }

  query(sql: string): any {
    // implementation
  }
}

class Application {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  runQuery(sql: string): any {
    this.database.connect();
    return this.database.query(sql);
  }
}
```

В этом примере, если мы решим изменить базу данных (например, на MongoDB), мы можем сделать это, не изменяя код класса `Application`, так как он зависит только от интерфейса `Database`.

Теперь пример, где `Protected Variations` **нарушается**:

```ts
class MySQLDatabase {
  connect(): void {
    // implementation
  }

  query(sql: string): any {
    // implementation
  }
}

class Application {
  private database: MySQLDatabase;

  constructor() {
    this.database = new MySQLDatabase();
  }

  runQuery(sql: string): any {
    this.database.connect();
    return this.database.query(sql);
  }
}
```

В этом примере, если мы решим изменить базу данных (например, на MongoDB), мы должны будем изменить код класса `Application`, что нарушает `Protected Variations`, так как класс `Application` зависит от конкретной реализации `MySQLDatabase`.