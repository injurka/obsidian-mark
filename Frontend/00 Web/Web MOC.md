=== Project File Structure ===
├── 00 Навигация
│   ├── Web.md
│   ├── Глоссарий Web.md
│   ├── Карта знаний Web.md
│   ├── Полезные ссылки.md
│   └── Правила оформления заметок.md
├── 01 Основы Web
│   ├── HTTP и доставка ресурсов
│   │   ├── CDN и edge delivery.md
│   │   ├── Cookies.md
│   │   ├── HTTP (HTTP и доставка ресурсов).md
│   │   ├── HTTP headers.md
│   │   ├── HTTP methods и status codes.md
│   │   └── HTTP-кэширование.md
│   ├── Как работает Web
│   │   ├── Архитектура браузера.md
│   │   ├── Архитектура и механика цикла событий.md
│   │   ├── Браузерный event loop.md
│   │   ├── Как работает браузер.md
│   │   ├── Справочник браузерных событий.md
│   │   └── Что происходит при открытии URL.md
│   └── Обзор Web
│       ├── MPA.md
│       ├── SPA.md
│       ├── Web 1.0, Web 2.0 и Web 3.0.md
│       ├── Виды веб-приложений.md
│       └── Общее о Web.md
├── 02 Рендеринг браузера
│   ├── DOM, CSSOM и Render Tree.md
│   ├── Layout и Paint.md
│   ├── Reflow, Repaint и Composite.md
│   ├── Virtual DOM.md
│   ├── Движки рендеринга.md
│   ├── Как браузер рендерит страницу.md
│   ├── Композитинг и слои.md
│   ├── Критический путь рендеринга (CRP).md
│   └── Рендеринг.md
├── 03 Рендеринг и доставка приложений
│   ├── Базовые стратегии
│   │   ├── CSR — Client-Side Rendering.md
│   │   ├── Edge Rendering.md
│   │   ├── ISR — Incremental Static Regeneration.md
│   │   ├── SSG — Static Site Generation.md
│   │   └── SSR — Server-Side Rendering.md
│   ├── Выбор стратегии
│   │   ├── SEO и рендеринг.md
│   │   ├── Static и Dynamic Content.md
│   │   ├── Выбор стратегии рендеринга.md
│   │   ├── Персонализация и рендеринг.md
│   │   └── Производительность и рендеринг.md
│   ├── Гидратация и серверные UI-модели
│   │   ├── Hydration.md
│   │   ├── Islands Architecture.md
│   │   ├── Partial Hydration.md
│   │   ├── Progressive Hydration.md
│   │   ├── Resumability.md
│   │   ├── Server Actions.md
│   │   ├── Server Components.md
│   │   └── Streaming SSR.md
│   └── Обзор стратегий рендеринга.md
├── 04 Архитектура клиентских приложений
│   ├── Progressive Web Apps
│   │   ├── Offline-first.md
│   │   ├── PWA.md
│   │   ├── Service Workers.md
│   │   └── Web App Manifest.md
│   ├── UI-архитектура
│   │   ├── Virtual DOM (UI-архитектура).md
│   │   ├── Компонентная архитектура.md
│   │   ├── Состояние приложения.md
│   │   └── Управление состоянием.md
│   ├── Роутинг
│   │   ├── 404 Routes.md
│   │   ├── Client-side и server-side routing.md
│   │   ├── Configuration-based Routing.md
│   │   ├── Data Loaders.md
│   │   ├── Deep Linking.md
│   │   ├── Dynamic Routes.md
│   │   ├── Error Routes.md
│   │   ├── File-based Routing.md
│   │   ├── Layout Routes.md
│   │   ├── Nested Routes.md
│   │   ├── Redirects.md
│   │   ├── Route Guards.md
│   │   ├── Route-level Code Splitting.md
│   │   └── Архитектура роутинга.md
│   └── Архитектура клиентского приложения.md
├── 05 Производительность
│   ├── Измерение и профилирование
│   │   ├── Chrome DevTools Performance.md
│   │   ├── Lighthouse.md
│   │   └── Performance API.md
│   ├── Кэширование
│   │   ├── CDN-кэширование.md
│   │   ├── HTTP-кэширование (Кэширование).md
│   │   └── Кэширование на клиенте.md
│   ├── Производительность загрузки
│   │   ├── Code Splitting.md
│   │   ├── Lazy Loading.md
│   │   ├── Оптимизация CSS (Производительность загрузки).md
│   │   ├── Оптимизация JavaScript.md
│   │   ├── Оптимизация изображений.md
│   │   └── Оптимизация шрифтов.md
│   ├── Производительность рендеринга
│   │   ├── Long Tasks.md
│   │   ├── Main Thread.md
│   │   └── Reflow, Repaint и Composite (Производительность рендеринга).md
│   ├── Core Web Vitals.md
│   └── Производительность Web.md
├── 06 Безопасность и приватность
│   ├── Защита данных
│   │   ├── Cookies: Secure, HttpOnly, SameSite.md
│   │   ├── Privacy Sandbox.md
│   │   └── Хранение токенов в браузере.md
│   ├── Уязвимости Web
│   │   ├── Clickjacking.md
│   │   ├── CSRF (Уязвимости Web).md
│   │   ├── Open Redirect.md
│   │   ├── Supply Chain Security.md
│   │   ├── XSS (Уязвимости Web).md
│   │   └── Уязвимости Web.md
│   ├── CORS (Безопасность и приватность).md
│   ├── CSP.md
│   ├── Modern Web Security.md
│   ├── Same-Origin Policy.md
│   ├── Безопасность Web.md
│   └── Модель безопасности браузера.md
├── 07 Identity и Access Management
│   ├── Авторизация доступа
│   │   ├── ABAC.md
│   │   ├── RBAC.md
│   │   ├── Route Guards и авторизация.md
│   │   └── Авторизация: роли и permissions.md
│   ├── Аутентификация
│   │   ├── Basic Authentication.md
│   │   ├── Digest Authentication.md
│   │   ├── Kerberos.md
│   │   ├── LDAP.md
│   │   ├── WebAuthn и Passkeys.md
│   │   └── Многофакторная аутентификация (MFA).md
│   ├── Делегирование и федерация
│   │   ├── OAuth 1.0.md
│   │   ├── OAuth 2.0.md
│   │   ├── OpenID Connect.md
│   │   ├── SAML.md
│   │   └── SSO.md
│   ├── Токены и сессии
│   │   ├── Access Token vs ID Token.md
│   │   ├── JWT.md
│   │   ├── Refresh Tokens.md
│   │   └── Сессии и cookies.md
│   ├── IAM: обзор.md
│   └── Термины: identity, authentication, authorization.md
├── 08 Accessibility
│   ├── Accessibility.md
│   ├── WAI-ARIA.md
│   ├── WCAG.md
│   ├── Доступные компоненты.md
│   ├── Инструменты аудита доступности.md
│   ├── Семантический HTML.md
│   ├── Скринридеры и тестирование.md
│   ├── Управление фокусом и клавиатурная навигация.md
│   └── Формы и доступность.md
└── 09 Инструменты и стандарты
    ├── Управление зависимостями
    │   ├── Lock-файлы.md
    │   ├── package.json.md
    │   └── SemVer.md
    ├── Web-стандарты и спецификации.md
    └── Совместимость браузеров.md
============================
