# Data Fetching with RSC (Получение данных)

С приходом React Server Components получение данных (Data Fetching) сильно упростилось. Мы вернулись к парадигме простого серверного программирования без необходимости использования `useEffect` для запросов.

## 1. Асинхронные компоненты
Поскольку Server Components выполняются на сервере (в Node.js), они могут быть полноценными `async` функциями.

```tsx
// Это работает прямо "из коробки"
import db from '@/lib/db';

export default async function UserDashboard({ userId }) {
  // Прямой вызов базы данных (никаких fetch/API роутов!)
  const user = await db.user.findById(userId); 
  const notifications = await db.notifications.getForUser(userId);

  return (
    <div>
      <h1>Привет, {user.name}</h1>
      <ul>
        {notifications.map(n => <li key={n.id}>{n.text}</li>)}
      </ul>
    </div>
  );
}
```

## 2. Проблема Waterfall (Каскадных запросов) и её решение
**Waterfall** происходит, когда запросы выполняются последовательно, хотя могли бы идти параллельно.

**❌ ПЛОХО (Waterfall):**
В примере выше `db.notifications` ждет, пока выполнится `db.user`. Если каждый запрос занимает 1 секунду, общий рендер займет 2 секунды.

**✅ ХОРОШО (Параллельные запросы):**
Если запросы независимы, их нужно запускать параллельно с помощью `Promise.all`:

```tsx
export default async function UserDashboard({ userId }) {
  const userPromise = db.user.findById(userId); 
  const notificationsPromise = db.notifications.getForUser(userId);

  // Оба запроса стартуют одновременно. Время рендера = времени самого долгого запроса (1 сек).
  const [user, notifications] = await Promise.all([userPromise, notificationsPromise]);

  // ... рендер
}
```

## 3. Расширенный `fetch` API
В экосистемах типа Next.js глобальный `fetch` расширен для поддержки мощного кэширования на уровне сервера.

```tsx
// Force Cache (SSG) - Запрос закешируется при сборке навсегда
const res = await fetch('https://api.example.com/data', { cache: 'force-cache' });

// No Store (SSR) - Запрос будет выполняться при каждом обновлении страницы
const res = await fetch('https://api.example.com/data', { cache: 'no-store' });

// ISR (Incremental Static Regeneration) - Кэш живет 60 секунд
const res = await fetch('https://api.example.com/data', { 
  next: { revalidate: 60 } 
});
```

### Дедупликация запросов (Request Memoization)
**Edge Case:** Что если компонент `<Header />` и компонент `<Sidebar />` делают одинаковый `fetch('/api/user')`? Мы получим два запроса к бекенду?
**Ответ:** Нет. В течение одного рендера React автоматически мемоизирует (дедуплицирует) вызовы `fetch` с одинаковыми параметрами. Запрос физически уйдет только один раз. Вы можете смело вызывать `fetch` в тех компонентах, где нужны данные, не занимаясь Props Drilling.

## 4. ⚠️ Критический баг безопасности (Data Leaking)
Поскольку вы напрямую обращаетесь к БД в компоненте, вы получаете "жирные" объекты (сущности базы данных).

```tsx
export default async function Profile({ id }) {
  const user = await db.user.findById(id); 
  // Объект user содержит: id, name, email, passwordHash, role

  return <ClientProfileEditor user={user} />;
}
```
**ЧТО ЗДЕСЬ НЕ ТАК?**
Вы передали весь объект `user` (включая **passwordHash** и скрытую **роль**) в качестве пропа в **Client Component** (`ClientProfileEditor`).
Когда серверный компонент передает пропсы клиентскому, эти пропсы сериализуются и вшиваются в HTML документа (в тег `<script>`). Злоумышленник просто откроет "Исходный код страницы" и увидит хэш пароля!

**Правило (Best Practice):** Всегда создавайте DTO (Data Transfer Object) или вручную выбирайте только те поля, которые действительно нужны клиенту, перед передачей их через границу Server -> Client.
```tsx
const safeUser = { id: user.id, name: user.name };
return <ClientProfileEditor user={safeUser} />;
```
