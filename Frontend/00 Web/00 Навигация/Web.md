# Web

Навигация по базе знаний Web.

## Разделы

### [[Общее о Web|01. Основы Web]]
Как работает Web: браузер, HTTP, доставка ресурсов.
- [[Обзор Web|Обзор Web]] — [[Виды веб-приложений]], [[MPA]], [[SPA]], [[PWA]], [[Web 1.0, Web 2.0 и Web 3.0]]
- [[Как работает браузер|Как работает Web]] — [[Что происходит при открытии URL]], [[Браузерный event loop]], [[Справочник браузерных событий]]
- [[HTTP-кэширование|HTTP и доставка ресурсов]] — [[HTTP]], [[HTTP methods и status codes]], [[HTTP headers]], [[Cookies]], [[CDN и edge delivery]]

### [[Рендеринг|02. Рендеринг браузера]]
Как браузер строит и отображает страницу.
- [[Движки рендеринга]], [[Как браузер рендерит страницу]], [[Критический путь рендеринга (CRP)]]
- [[Reflow, Repaint и Composite]], [[Virtual DOM]]
- [[DOM, CSSOM и Render Tree]], [[Layout и Paint]], [[Композитинг и слои]]

### [[Обзор стратегий рендеринга|03. Рендеринг и доставка приложений]]
Как приложение получает HTML и становится интерактивным.
- **Базовые стратегии:** [[CSR — Client-Side Rendering]], [[SSR — Server-Side Rendering]], [[SSG — Static Site Generation]], [[ISR — Incremental Static Regeneration]], [[Edge Rendering]]
- **Гидратация:** [[Hydration]], [[Partial Hydration]], [[Progressive Hydration]], [[Islands Architecture]], [[Resumability]], [[Streaming SSR]], [[Server Components]], [[Server Actions]]
- **Выбор стратегии:** [[Выбор стратегии рендеринга]], [[Static и Dynamic Content]], [[SEO и рендеринг]], [[Персонализация и рендеринг]], [[Производительность и рендеринг]]

### [[Архитектура клиентского приложения|04. Архитектура клиентских приложений]]
Как устроены SPA, PWA, роутинг и UI.
- **Роутинг:** [[Архитектура роутинга]], [[File-based Routing]], [[Dynamic Routes]], [[Nested Routes]], [[Layout Routes]], [[Route Guards]], [[Data Loaders]], [[Route-level Code Splitting]], [[Redirects]], [[404 Routes]], [[Error Routes]], [[Deep Linking]]
- **UI-архитектура:** [[Virtual DOM]], [[Состояние приложения]], [[Управление состоянием]], [[Компонентная архитектура]]
- **PWA:** [[PWA]], [[Web App Manifest]], [[Service Workers]], [[Offline-first]]

### [[Производительность Web|05. Производительность]]
Как измерять и улучшать скорость.
- [[Core Web Vitals]] — LCP, CLS, INP
- **Загрузка:** [[Code Splitting]], [[Lazy Loading]], [[Оптимизация JavaScript]], [[Оптимизация CSS]], [[Оптимизация изображений]], [[Оптимизация шрифтов]]
- **Рендеринг:** [[Reflow, Repaint и Composite]], [[Long Tasks]], [[Main Thread]]
- **Кэширование:** [[HTTP-кэширование]], [[Кэширование на клиенте]], [[CDN-кэширование]]
- **Измерение:** [[Performance API]], [[Chrome DevTools Performance]], [[Lighthouse]]

### [[Безопасность Web|06. Безопасность и приватность]]
Как защищать приложение и данные.
- [[Same-Origin Policy]], [[CORS]], [[CSP]], [[Modern Web Security]]
- **Уязвимости:** [[Уязвимости Web|XSS, CSRF]], [[Clickjacking]], [[Open Redirect]], [[Supply Chain Security]]
- **Защита данных:** [[Cookies: Secure, HttpOnly, SameSite]], [[Хранение токенов в браузере]], [[Privacy Sandbox]]

### [[IAM: обзор|07. Identity и Access Management]]
Как устроены вход, токены, OAuth, SSO и права.
- **Аутентификация:** [[Basic Authentication]], [[Digest Authentication]], [[Kerberos]], [[LDAP]], [[WebAuthn и Passkeys]], [[Многофакторная аутентификация (MFA)]]
- **Токены и сессии:** [[JWT]], [[JWT Auth]], [[Refresh Tokens]], [[Сессии и cookies]], [[Access Token vs ID Token]]
- **Делегирование и федерация:** [[OAuth 1.0]], [[OAuth 2.0]], [[OpenID Connect]], [[SAML]], [[SSO]]
- **Авторизация доступа:** [[Авторизация: роли и permissions]], [[RBAC]], [[ABAC]], [[Route Guards и авторизация]]

### [[Accessibility|08. Accessibility (a11y)]]
Как делать интерфейс доступным.
- [[WCAG]], [[WAI-ARIA]], [[Семантический HTML]]
- [[Управление фокусом и клавиатурная навигация]], [[Скринридеры и тестирование]]
- [[Формы и доступность]], [[Доступные компоненты]], [[Инструменты аудита доступности]]

### 09. Инструменты и стандарты
Как управлять зависимостями, стандартами и совместимостью.
- **Управление зависимостями:** [[SemVer]], [[Lock-файлы]], [[package.json]]
- [[Web-стандарты и спецификации]], [[Совместимость браузеров]]

---

## Служебное

- [[Карта знаний Web]]
- [[Глоссарий Web]]
- [[Полезные ссылки]]
- [[Правила оформления заметок]]
- [[История миграции]]
