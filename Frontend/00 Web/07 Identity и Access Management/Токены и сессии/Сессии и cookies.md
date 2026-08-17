# Сессии и Cookies (Stateful Authentication)

**Сессионная аутентификация (Session-based Authentication)** — это классическая *stateful* модель управления состоянием входа, при которой сервер сохраняет данные о пользователе и его активной сессии в хранилище, а клиенту передается только случайный уникальный идентификатор (**Session ID**) в виде HTTP Cookie.

---

## 1. Как работает сессионная аутентификация

```mermaid
sequenceDiagram
    autonumber
    actor User as Пользователь / Браузер
    participant Server as Сервер (API)
    participant Redis as Хранилище сессий (Redis)

    Note over User,Redis: 1. Логин пользователя
    User->>Server: POST /login (username, password)
    Server->>Server: Валидация пароля в БД
    Server->>Redis: Сохранить "s_9f8a7c2" ──► { userId: 42, role: "admin" }
    Server-->>User: 200 OK (Set-Cookie: sid=s_9f8a7c2; HttpOnly; Secure; SameSite=Lax)

    Note over User,Redis: 2. Запрос к защищенному API
    User->>Server: GET /api/profile (Cookie: sid=s_9f8a7c2)
    Server->>Redis: Получить сессию по "s_9f8a7c2"
    Redis-->>Server: { userId: 42, role: "admin" }
    Server-->>User: 200 OK { user: { id: 42, name: "Alice" } }

    Note over User,Redis: 3. Выход из системы (Logout)
    User->>Server: POST /logout (Cookie: sid=s_9f8a7c2)
    Server->>Redis: Удалить ключ "s_9f8a7c2"
    Server-->>User: 200 OK (Set-Cookie: sid=; Expires=Thu, 01 Jan 1970...)
```

---

## 2. Безопасность Cookies: Ключевые флаги

Браузерные cookies автоматически прикрепляются ко всем HTTP-запросам на целевой домен. Для защиты от атак их необходимо правильно конфигурировать:

| Флаг | Значение и защита | Описание |
| :--- | :--- | :--- |
| **`HttpOnly`** | 🛡️ **Защита от XSS** | Запрещает доступ к Cookie из JavaScript (`document.cookie`). Даже если сайт подвержен XSS, скрипт атакующего не сможет украсть сессионную куку. |
| **`Secure`** | 🔒 **Защита от перехвата (MitM)** | Кука передается **только по защищенному протоколу HTTPS**. При HTTP-запросах браузер ее не отправит. |
| **`SameSite`** | 🛡️ **Защита от CSRF** | Определяет, будет ли кука отправляться при кросс-доменных переходах (см. ниже). |
| **`Max-Age` / `Expires`** | ⏳ **Срок жизни** | Устанавливает абсолютное время жизни. Без этого флага кука является *Session Cookie* и удаляется при закрытии вкладки/браузера. |
| **`Domain` & `Path`** | 🎯 **Область видимости** | Ограничивает домены и URL-пути, на которые кука будет отправляться (например, `Domain=.example.com; Path=/`). |

### Режимы `SameSite`:
- **`SameSite=Strict`**: Кука передается **только** если переход инициирован с того же самого сайта. При клике по ссылке из Telegram/Google кука не отправится (пользователь откроет сайт как неавторизованный).
- **`SameSite=Lax`** *(стандарт по умолчанию в современных браузерах)*: Кука не отправляется при кросс-доменных POST/PUT/DELETE запросах, но передается при безопасных навигационных GET-переходах (например, переход по внешней ссылке).
- **`SameSite=None; Secure`**: Кука передается при любых кросс-доменных запросах (обязателен флаг `Secure`). Используется для iframe и сторонних сервисов.

---

## 3. Хранение сессий на сервере

| Хранилище | Плюсы | Минусы | Применение |
| :--- | :--- | :--- | :--- |
| **In-Memory (Node.js RAM)** | Максимальная скорость, не требует сторонних сервисов | Теряется при перезапуске сервера, невозможно масштабировать на несколько инстансов | Только локальная разработка |
| **Redis / KeyDB (In-Memory K/V)** | Экстремально быстрый доступ, встроенный TTL (авто-экспирация ключей), легко масштабируется | Дополнительный сервис в инфраструктуре | **Индустриальный стандарт** |
| **Реляционная БД (PostgreSQL / MySQL)** | Персистентность, простота транзакций | Нагрузка на диск/соединения БД при каждом входящем HTTP-запросе | Небольшие проекты без Redis |

---

## 4. Сравнение: Sessions vs JWT (Stateful vs Stateless)

| Критерий | Сессии (Session + Cookie) | Токены (JWT / Bearer Token) |
| :--- | :--- | :--- |
| **Хранение состояния** | **Stateful**: на сервере (Redis/БД) | **Stateless**: всё внутри самого токена |
| **Размер данных** | Минимальный (~32–64 байта: случайная строка `sid`) | Большой (~300–1000+ байт: JSON + подпись) |
| **Мгновенный отзыв (Revocation)** | 🟢 **Просто**: удалить ключ из Redis, сессия аннулируется моментально | 🔴 **Сложно**: валидный JWT действует до даты `exp`. Нужен Blacklist в Redis (что превращает его обратно в stateful) |
| **Масштабирование (Horizontally)** | Требуется общее хранилище сессий (Redis Cluster) | 🟢 Не требует общего хранилища, валидируется криптографически |
| **Мобильные приложения / CLI** | 🟡 Сложнее управлять cookies вручную | 🟢 Естественно ложится в заголовок `Authorization: Bearer` |
| **Защита от XSS / CSRF** | • `HttpOnly` полностью защищает от XSS<br>• Требуется `SameSite` или CSRF-токены | • В `localStorage` уязвим к XSS<br>• В `HttpOnly Cookie` имеет те же плюсы/минусы, что и сессии |
| **SSR (Server-Side Rendering)** | 🟢 Кука автоматически передается на Node.js сервер при первом запросе страницы | 🟢 Доступен через куки в Next.js/Remix |

---

## 5. Пример реализации (Node.js + Express + Redis)

```typescript
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const app = express();
const redisClient = createClient({ url: process.env.REDIS_URL });
await redisClient.connect();

app.use(
  session({
    store: new RedisStore({ client: redisClient, prefix: 'sess:' }),
    name: 'sessionId', // Кастомное имя куки (не раскрывает технологию)
    secret: process.env.SESSION_SECRET!,
    resave: false, // Не перезаписывать сессию, если она не менялась
    saveUninitialized: false, // Не сохранять пустые сессии гостей
    cookie: {
      httpOnly: true, // Защита от кражи через XSS
      secure: process.env.NODE_ENV === 'production', // Только по HTTPS
      sameSite: 'lax', // Защита от CSRF
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 дней
    },
  })
);

// Логин
app.post('/api/login', async (req, res) => {
  const user = await authenticateUser(req.body.login, req.body.password);
  if (!user) return res.status(401).json({ error: 'Неверные данные' });

  // Запись в сессию (Express сохранит это в Redis и выставит Set-Cookie)
  req.session.userId = user.id;
  req.session.role = user.role;

  res.json({ message: 'Успешный вход' });
});

// Логаут (моментальное удаление из Redis)
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send('Ошибка выхода');
    res.clearCookie('sessionId');
    res.json({ message: 'Сессия завершена' });
  });
});
```

---

## 6. Связанные заметки
- [[JWT]] — альтернативный stateless подход к токенам.
- [[Refresh Tokens]] — гибридная схема ротации токенов.
- [[Access Token vs ID Token]] — разница между типами токенов в современных протоколах.
