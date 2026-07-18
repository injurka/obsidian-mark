# Secrets Management (Управление секретами)

## Суть и решаемая боль
Фронтенд должен общаться с API, Stripe, Sentry или Firebase. Для этого ему нужны ключи. Самая частая и фатальная ошибка новичков — захардкодить `STRIPE_SECRET_KEY="sk_live_123"` прямо в коде или закоммитить файл `.env` в репозиторий. Хакеры пишут ботов, которые мониторят публичные GitHub-репозитории в реальном времени, и крадут ключи за 2 секунды после пуша.
Боль: как передать секреты в приложение так, чтобы они не утекли?

**Secrets Management** — это архитектурный подход к безопасному хранению, инъекции и ротации секретных данных на этапах разработки, сборки и рантайма.

## Как это работает на практике

Главное правило фронтенда: **На фронтенде нет секретов.** Любой ключ, который попал в финальный бандл (HTML/JS), публичен и может быть извлечен через DevTools. 

Секреты делятся на два типа:
1. **Public Keys (Безопасные):** `NEXT_PUBLIC_STRIPE_KEY="pk_live_123"`. Их можно и нужно зашивать в бандл. Они предназначены только для идентификации вашего приложения.
2. **Private Keys (Секретные):** `DATABASE_URL`, `STRIPE_SECRET`. Они должны жить **только на бэкенде** или в CI-пайплайне.

```mermaid
graph TD
    Dev[Локальная разработка] -->|Читает локальный .env| App
    CI[CI/CD Pipeline] -->|Читает GitHub Secrets| Build[Сборка (Webpack)]
    
    Build -->|Вшивает ТОЛЬКО PUBLIC ключи| Bundle[bundle.js (Client)]
    Build -->|Прокидывает PRIVATE ключи| Server[Node.js / Next.js Server]
    
    Server -->|Аутентифицируется| DB[(Database)]
    Bundle -->|Отправляет только Public Key| Stripe(Stripe API)
```

## Примеры кода

**Антипаттерн (Утечка секретного ключа в бандл):**
```tsx
// React компонент. Переменная REACT_APP_SUPER_SECRET попадет в итоговый JS.
// Хакер откроет вкладку Network, скачает main.js и найдет там эту строку.
const chargeCard = async () => {
  const res = await fetch('https://api.stripe.com/charge', {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_SUPER_SECRET}` }
  });
}
```

**Правильное решение (Использование Backend-For-Frontend / API Routes):**
```tsx
// 1. Фронтенд (Client-side) отправляет запрос на СВОЙ бэкенд, без секретов
const chargeCard = async () => {
  await fetch('/api/charge', { method: 'POST', body: data });
}

// 2. Бэкенд (Node.js / Next.js API Route) берет секрет из своего безопасного окружения
// и делает реальный запрос в Stripe
export default async function handler(req, res) {
  const secret = process.env.STRIPE_SECRET_KEY; // Безопасно, код исполняется на сервере
  await stripe.charge(req.body, secret);
}
```

## Неочевидные нюансы и границы применимости
- **Dynamic vs Static Env Variables:** В SPA (Vite/CRA) переменные окружения зашиваются в бандл на этапе сборки (build time). Если вы хотите изменить API URL для стейджинга и продакшена, вам придется собирать проект дважды! В SSR (Next.js/Remix) переменные читаются динамически в рантайме сервера (runtime), что позволяет использовать один и тот же Docker-образ для разных сред.
- **Хранилища секретов:** В Enterprise компаниях секреты не хранят даже в файлах `.env` на продакшене. Используются системы вроде **HashiCorp Vault**, AWS Secrets Manager или Azure Key Vault. Приложение запрашивает секреты по сети при старте.
- **Компрометация логов:** Следите за тем, чтобы не залогировать секрет на сервере. `console.log(req.headers)` может случайно отправить Authorization токен юзера в DataDog/Sentry, где его увидят десятки разработчиков.
