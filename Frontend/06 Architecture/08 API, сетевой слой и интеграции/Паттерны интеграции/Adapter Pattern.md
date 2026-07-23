## Adapter — Адаптер

**Adapter** позволяет работать с объектами, интерфейсы которых несовместимы.

Частый фронтенд-сценарий: старый API возвращает данные в одном формате, а приложение ожидает другой.

### Старый API

```ts
interface LegacyUserResponse {
  user_id: number;
  full_name: string;
  registered_at: string;
}
```

### Новый формат внутри приложения

```ts
interface User {
  id: string;
  name: string;
  registeredAt: Date;
}
```

### Адаптер

```ts
function adaptLegacyUser(response: LegacyUserResponse): User {
  return {
    id: String(response.user_id),
    name: response.full_name,
    registeredAt: new Date(response.registered_at),
  };
}
```

Использование:

```ts
const legacyResponse: LegacyUserResponse = {
  user_id: 42,
  full_name: "Иван Петров",
  registered_at: "2025-01-10T12:00:00Z",
};

const user = adaptLegacyUser(legacyResponse);

console.log(user);
// {
//   id: "42",
//   name: "Иван Петров",
//   registeredAt: Date(...)
// }
```

### Пример: адаптация библиотеки

Допустим, приложение ожидает метод `notify`, а сторонняя библиотека предоставляет `showToast`.

```ts
class ThirdPartyToastLibrary {
  showToast(text: string, kind: "success" | "error") {
    console.log(`[${kind.toUpperCase()}] ${text}`);
  }
}
```

Нужный приложению интерфейс:

```ts
interface Notifier {
  success(message: string): void;
  error(message: string): void;
}
```

Адаптер:

```ts
class ToastNotifierAdapter implements Notifier {
  constructor(private toastLibrary: ThirdPartyToastLibrary) {}

  success(message: string): void {
    this.toastLibrary.showToast(message, "success");
  }

  error(message: string): void {
    this.toastLibrary.showToast(message, "error");
  }
}
```

---