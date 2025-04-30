
Представляет шаблон проектирования, который определяет набор алгоритмов, инкапсулирует каждый из них и обеспечивает их взаимозаменяемость. В зависимости от ситуации мы можем легко заменить один используемый алгоритм другим. При этом замена алгоритма происходит независимо от объекта, который использует данный алгоритм.

### Когда использовать?

- Когда есть несколько родственных классов, которые отличаются поведением. Можно задать один основной класс, а разные варианты поведения вынести в отдельные классы и при необходимости их применять

- Когда необходимо обеспечить выбор из нескольких вариантов алгоритмов, которые можно легко менять в зависимости от условий

- Когда необходимо менять поведение объектов на стадии выполнения программы

- Когда класс, применяющий определенную функциональность, ничего не должен знать о ее реализации

---

Важным функционалом почти любого веб-приложения является регистрация пользователя (аутентификация) и выполнение пользователем входа в систему (авторизация). Наиболее распространенными способами регистрации являются следующие: учетная запись (логин) / пароль, электронная почта или номер мобильного телефона. После успешной регистрации пользователь может использовать соответствующий метод входа в систему.

Иногда приложение может поддерживать другие методы аутентификации и авторизации, например, в дополнение к электронной почте, страница авторизации Medium поддерживает сторонних провайдеров аутентификации, таких как Google, Facebook, Apple и Twitter.

Для поддержки новых методов нам потребуется снова и снова изменять и дополнять функцию login:

```ts
function login(mode) {
  if (mode === "account") {
    loginWithPassword();
  } else if (mode === "email") {
    loginWithEmail();
  } else if (mode === "mobile") {
    loginWithMobile();
  } else if (mode === "google") {
    loginWithGoogle();
  } else if (mode === "facebook") {
    loginWithFacebook();
  } else if (mode === "apple") {
    loginWithApple();
  } else if (mode === "twitter") {
    loginWithTwitter();
  }
}
```

Со временем обнаружится, что эту функцию все труднее поддерживать. Для решения данной проблемы можно применить паттерн "Стратегия", позволяющий инкапсулировать различные методы авторизации в разных стратегиях.

![Alt text](Стратегия%20~%20Strategy.png) 

```ts
interface Strategy {
  authenticate(args: any[]): boolean;
}

// First strategy
class TwitterStrategy implements Strategy {
  authenticate(args: any[]) {
    const [token] = args;

    if (token !== "tw123") {
      console.error("Аутентификация с помощью аккаунта Twitter провалилась!");
      return false;
    }

    console.log("Аутентификация с помощью аккаунта Twitter выполнена успешно!");

    return true;
  }
}

// Second strategy
class LocalStrategy implements Strategy {
  authenticate(args: any[]) {
    const [username, password] = args;

    if (username !== "login" && password !== "666") {
      console.log("Неправильное имя пользователя или пароль!");
      return false;
    }

    console.log("Аутентификация с помощью логина и пароля выполнена успешно!");
    return true;
  }
}

// Combine strategy
class Authenticator {
  strategies: Record<string, Strategy> = {};

  use(name: string, strategy: Strategy) {
    this.strategies[name] = strategy;
  }

  authenticate(name: string, ...args: any) {
    if (!this.strategies[name]) {
      console.error("Политика аутентификации не установлена!");
      return false;
    }

    return this.strategies[name].authenticate.apply(null, args);
  }
}

// Using
const auth = new Authenticator();

auth.use("twitter", new TwitterStrategy());
auth.use("local", new LocalStrategy());

function login(mode: string, ...args: any) {
  return auth.authenticate(mode, args);
}

login("twitter", "123");
login("local", "login", "123");

```

Случаи использования паттерна "Стратегия":

- когда необходим динамический выбор одного из нескольких доступных алгоритмов. Как правило, каждый алгоритм инкапсулируется в отдельной стратегии (классе);

- когда имеется несколько классов, которые отличаются только поведением, и выбор конкретного поведения можно произвести динамически во время выполнения кода.
