# Frontend Architecture MOC

> [!info] Карта знаний
> Добро пожаловать в полную карту знаний (Map of Content) по Frontend архитектуре. Здесь собраны все разделы и материалы для навигации.


## 00. Навигация и мета

- [[README]]
- [[Roadmap изучения]]
- [[Антипаттерны]]
- [[Глоссарий]]
- [[Карта знаний]]
- [[Матрица архитектурных решений]]
- [[Термины и сокращения]]
- [[Чеклист архитектурного ревью]]
- [[Чеклист выбора архитектуры]]

## 01. Фундаментальные принципы


### Качество дизайна

- [[Abstraction Leakage]]
- [[Afferent и Efferent Coupling]]
- [[Cohesion и Coupling]]
- [[Design for Change]]
- [[Instability]]
- [[Преждевременная абстракция]]
- [[Преждевременная оптимизация]]
- [[Технический долг]]

### Компромиссы

- [[Абстракция против читаемости]]
- [[Когда не нужна сложная архитектура]]
- [[Переиспользование против связности]]
- [[Простота против гибкости]]
- [[Универсальность против предметности]]

### Принципы проектирования


#### SOLID

- [[Dependency Inversion Principle]]
- [[Interface Segregation Principle]]
- [[Liskov Substitution Principle]]
- [[Open Closed Principle]]
- [[Single Responsibility Principle]]
- [[SOLID во Frontend]]
- [[Composition over Inheritance]]
- [[Convention over Configuration]]
- [[DRY]]
- [[Explicit over Implicit]]
- [[GRASP]]
- [[KISS]]
- [[Law of Demeter]]
- [[Principle of Least Knowledge]]
- [[Separation of Concerns]]
- [[Single Source of Truth]]
- [[YAGNI]]
- [[README]]

## 02. Архитектурные стили и подходы


### Clean Architecture семейство

- [[Clean Architecture]]
- [[Dependency Rule]]
- [[Hexagonal Architecture]]
- [[Inbound Ports]]
- [[Onion Architecture]]
- [[Outbound Ports]]
- [[Ports and Adapters]]
- [[Use Cases]]
- [[Практика Clean Architecture во Frontend]]

### Domain Driven Design

- [[Aggregate]]
- [[Anti Corruption Layer]]
- [[Bounded Context]]
- [[DDD во Frontend]]
- [[Domain Event]]
- [[Domain Model]]
- [[Domain Service]]
- [[Entity]]
- [[Repository]]
- [[Ubiquitous Language]]
- [[Value Object]]

### Выбор архитектурного стиля

- [[Архитектура Enterprise приложения]]
- [[Архитектура малого приложения]]
- [[Архитектура среднего приложения]]
- [[Критерии выбора]]
- [[Сравнение архитектурных стилей]]
- [[Эволюция архитектуры]]

### Модульные подходы

- [[Microkernel Architecture]]
- [[Modular Architecture]]
- [[Plugin Architecture]]
- [[Screaming Architecture]]
- [[Self Contained Systems]]
- [[Vertical Slice Architecture]]

### Потоковые и событийные подходы

- [[Actor Model]]
- [[CQRS]]
- [[Event Bus]]
- [[Event Driven Architecture]]
- [[Event Sourcing]]
- [[Observer Pattern]]
- [[Pub Sub]]
- [[Reactive Architecture]]

### Слоистые архитектуры

- [[Layered Architecture]]
- [[N Tier Architecture]]
- [[Presentation Application Domain Infrastructure]]
- [[Нарушения слоистой архитектуры]]
- [[Правила зависимостей между слоями]]
- [[README]]

## 03. Границы приложения и модульность


### Границы и декомпозиция

- [[Bounded Context во Frontend]]
- [[Shared Kernel]]
- [[Вертикальная декомпозиция]]
- [[Горизонтальная декомпозиция]]
- [[Границы модулей]]
- [[Декомпозиция по доменам]]
- [[Декомпозиция по командам]]
- [[Декомпозиция по слоям]]
- [[Декомпозиция по фичам]]

### Контракты модулей

- [[Anti Corruption Layer]]
- [[DTO]]
- [[Facade Pattern]]
- [[Internal API модуля]]
- [[Mapping между моделями]]
- [[Public API модуля]]
- [[Версионирование контрактов]]
- [[Контракты и инварианты]]

### Контроль границ

- [[Dependency Cruiser]]
- [[ESLint Boundaries]]
- [[Nx Module Boundaries]]
- [[Архитектурные тесты]]
- [[Визуализация графа зависимостей]]

### Управление зависимостями

- [[Barrel Exports]]
- [[Composition Root]]
- [[Dependency Constraints]]
- [[Dependency Graph]]
- [[Dependency Injection]]
- [[Dependency Inversion]]
- [[Path Aliases]]
- [[Service Locator]]
- [[Направление зависимостей]]
- [[Циклические зависимости]]
- [[README]]

## 04. Методологии организации Frontend-кода


### Atomic Design

- [[Atomic Design и Design System]]
- [[Atoms]]
- [[Molecules]]
- [[Organisms]]
- [[Pages]]
- [[README]]
- [[Templates]]
- [[Ограничения Atomic Design]]

### Feature Sliced Design


#### Слои.md

- [[App]]
- [[Entities]]
- [[Features]]
- [[Pages]]
- [[Processes]]
- [[Shared]]
- [[Widgets]]
- [[Cross Imports]]
- [[Public API]]
- [[README]]
- [[Антипаттерны FSD]]
- [[Миграция на FSD]]
- [[Обзор FSD]]
- [[Основные концепции]]
- [[Правило импортов]]
- [[Сегменты]]
- [[Слайсы]]

### Альтернативные подходы

- [[Bulletproof React]]
- [[Colocation]]
- [[Ducks Pattern]]
- [[Feature Folders]]
- [[Package by Feature]]
- [[Package by Layer]]
- [[Pragmatic Architecture]]

### Сравнение методологий

- [[FSD против Atomic Design]]
- [[FSD против DDD]]
- [[Layer First против Feature First]]
- [[Выбор структуры проекта]]
- [[README]]

## 05. Компонентная архитектура


### React архитектура

- [[Context API]]
- [[Custom Hooks]]
- [[Error Boundaries]]
- [[Hooks как архитектурный слой]]
- [[Portals]]
- [[Props Drilling]]
- [[React Component Model]]
- [[Server Actions]]
- [[Server Components]]
- [[Suspense Boundaries]]

### Жизненный цикл UI

- [[Animation Architecture]]
- [[Empty States]]
- [[Error States]]
- [[Loading States]]
- [[Optimistic UI]]
- [[Partial States]]
- [[Skeleton Architecture]]

### Паттерны композиции

- [[Composition over Configuration]]
- [[Compound Components]]
- [[Controlled Props Pattern]]
- [[Flexible Compound Components]]
- [[Headless Components]]
- [[Higher Order Components]]
- [[Provider Pattern]]
- [[Render Props]]
- [[Slots]]
- [[State Reducer Pattern]]

### Проектирование компонентов

- [[Component API Design]]
- [[Container и Presentational Components]]
- [[Controlled и Uncontrolled Components]]
- [[Events Design]]
- [[Imperative API]]
- [[Props Design]]
- [[Smart и Dumb Components]]
- [[Stateful и Stateless Components]]
- [[Границы компонентов]]
- [[Ответственность компонента]]
- [[Полиморфные компоненты]]
- [[Универсальные и предметные компоненты]]
- [[README]]

## 06. Design System и UI Platform


### Инструменты

- [[Design to Code]]
- [[Documentation as Code]]
- [[Figma Integration]]
- [[Storybook]]
- [[Visual Regression Testing]]

### Система компонентов

- [[Components]]
- [[Form System]]
- [[Foundations]]
- [[Icons System]]
- [[Illustrations System]]
- [[Layout System]]
- [[Patterns]]
- [[Primitives]]

### Стратегия дизайн-системы

- [[Adoption Strategy]]
- [[Contribution Model]]
- [[Governance]]
- [[UI Kit и Design System]]
- [[Версионирование]]
- [[Зачем нужна Design System]]
- [[Миграция между версиями]]

### Темизация и бренды

- [[Dark Mode]]
- [[Multi Brand Architecture]]
- [[Multi Theme Architecture]]
- [[Runtime Theming]]
- [[Theming]]
- [[White Label]]

### Токены

- [[Component Tokens]]
- [[Design Token Formats]]
- [[Design Tokens]]
- [[Primitive Tokens]]
- [[Semantic Tokens]]
- [[Token Naming]]
- [[Token Transformations]]
- [[README]]

## 07. Данные, состояние и бизнес-логика


### Библиотеки

- [[Effector]]
- [[Jotai]]
- [[MobX]]
- [[Recoil]]
- [[Redux Toolkit]]
- [[Redux]]
- [[RTK Query]]
- [[SWR]]
- [[TanStack Query]]
- [[XState]]
- [[Zustand]]

### Модель состояния

- [[Derived State]]
- [[Ephemeral State]]
- [[Form State]]
- [[Global Client State]]
- [[Local UI State]]
- [[Normalized State]]
- [[Persisted State]]
- [[Server State]]
- [[Single Source of Truth]]
- [[State Ownership]]
- [[URL State]]

### Подходы к управлению состоянием

- [[Actor Model]]
- [[CQRS для Frontend]]
- [[Event Driven State]]
- [[Finite State Machines]]
- [[Flux Architecture]]
- [[Reactive State]]
- [[Redux Architecture]]
- [[Signals]]
- [[State Machines]]

### Синхронизация состояния

- [[Conflict Resolution]]
- [[Conflict-free Replicated Data Types (CRDT)]]
- [[Cross Tab Synchronization]]
- [[Eventual Consistency]]
- [[Offline First]]
- [[Optimistic Updates]]
- [[Pessimistic Updates]]
- [[Race Conditions]]
- [[State Persistence]]

### Формы

- [[Form Architecture]]
- [[Form State Management]]
- [[Multi Step Forms]]
- [[React Hook Form]]
- [[Schema Validation]]
- [[Validation]]

### Хранение данных на клиенте

- [[Local Storage vs Session Storage vs Cookies]]
- [[ORM для IndexedDB]]
- [[Управление квотами браузера]]
- [[README]]

## 08. API, сетевой слой и интеграции


### AI и интеграция с LLM

- [[Architecting AI Interfaces]]
- [[Local AI и WebNN]]
- [[Streaming Responses]]

### API стили

- [[GraphQL]]
- [[gRPC Web]]
- [[REST]]
- [[RPC]]
- [[Server Sent Events]]
- [[Webhooks]]
- [[WebRTC Architecture]]
- [[WebSocket]]

### Контракты и модели

- [[API Models]]
- [[API Versioning]]
- [[Code Generation]]
- [[Contract First]]
- [[Domain Models]]
- [[DTO]]
- [[GraphQL Schema]]
- [[Mapping]]
- [[OpenAPI]]
- [[Runtime Validation]]
- [[Schema Evolution]]

### Паттерны интеграции

- [[Adapter Pattern]]
- [[Aggregator Pattern]]
- [[Anti Corruption Layer]]
- [[API Composition]]
- [[API Gateway]]
- [[BFF Backend For Frontend]]
- [[Strangler Fig Pattern]]

### Сетевой слой

- [[Axios]]
- [[Fetch]]
- [[HTTP Client Abstraction]]
- [[Interceptors]]
- [[Rate Limiting]]
- [[Request Cancellation]]
- [[Request Deduplication]]
- [[Request Middleware]]
- [[Response Middleware]]
- [[Retry и Backoff]]
- [[Timeout Strategy]]
- [[Архитектура API Client]]

### Типовые сценарии

- [[Background Requests]]
- [[File Download]]
- [[File Upload]]
- [[Infinite Scroll]]
- [[Pagination]]
- [[Polling]]
- [[Real Time Updates]]
- [[Streaming]]
- [[README]]

## 09. Кэширование и офлайн-архитектура


### Offline First

- [[Background Sync]]
- [[Cache Storage]]
- [[Conflict Resolution]]
- [[Conflict-free Replicated Data Types (CRDT)]]
- [[IndexedDB]]
- [[Offline First Architecture]]
- [[Offline First]]
- [[Offline Mutations]]
- [[Service Workers]]
- [[Sync Queue]]

### PWA и Мобильный Web

- [[PWA Architecture]]
- [[PWA]]
- [[Web Push Notifications]]
- [[Разделение Web и WebView]]

### Стратегии

- [[Cache Aside]]
- [[Cache First]]
- [[Cache Only]]
- [[Network First]]
- [[Network Only]]
- [[Stale While Revalidate]]
- [[Write Through Cache]]
- [[Стратегии кэширования]]

### Управление кэшем

- [[Cache Busting]]
- [[Cache Invalidation]]
- [[Cache Keys]]
- [[Cache Tags]]
- [[Cache TTL]]
- [[Prefetching]]
- [[Preloading]]
- [[Speculative Fetching]]
- [[Инвалидация кэша]]

### Уровни кэширования

- [[Application Cache]]
- [[Browser Cache]]
- [[Cache Hierarchy]]
- [[CDN Cache]]
- [[HTTP Cache]]
- [[Server State Cache]]
- [[Service Worker Cache]]
- [[Уровни кэширования]]
- [[README]]

## 10. Роутинг, rendering и доставка UI


### Framework-specific архитектура

- [[Angular Universal]]
- [[Astro Architecture]]
- [[Next.js Architecture]]
- [[Nuxt Architecture]]
- [[Remix Architecture]]
- [[SvelteKit Architecture]]

### Rendering стратегии

- [[CSR]]
- [[Edge Rendering]]
- [[Hydration]]
- [[Islands Architecture]]
- [[ISR]]
- [[Partial Hydration]]
- [[Progressive Hydration]]
- [[Resumability]]
- [[Server Actions]]
- [[Server Components]]
- [[SSG]]
- [[SSR]]
- [[Streaming SSR]]

### Выбор стратегии

- [[Dynamic и Static Content]]
- [[Performance и Rendering]]
- [[Personalization]]
- [[Rendering Strategy Selection]]
- [[SEO и Rendering]]

### Роутинг

- [[404 Routes]]
- [[Configuration Based Routing]]
- [[Data Loaders]]
- [[Deep Linking]]
- [[Dynamic Routes]]
- [[Error Routes]]
- [[File Based Routing]]
- [[Layout Routes]]
- [[Nested Routes]]
- [[Redirects]]
- [[Route Guards]]
- [[Route Level Code Splitting]]
- [[Архитектура роутинга]]
- [[README]]

## 11. CSS и архитектура стилизации


### Адаптивность и темы

- [[Container Queries]]
- [[CSS Custom Properties]]
- [[Dark Mode]]
- [[Logical Properties]]
- [[Mobile First]]
- [[Responsive Design]]
- [[RTL]]
- [[Theming]]

### Методологии

- [[BEM]]
- [[CUBE CSS]]
- [[ITCSS]]
- [[OOCSS]]
- [[RSCSS]]
- [[SMACSS]]
- [[Utility First CSS]]

### Основы CSS-архитектуры

- [[Cascade Layers]]
- [[Cascade]]
- [[CSS Architecture]]
- [[CSS Scope]]
- [[Naming Conventions]]
- [[Reset и Normalize]]
- [[Specificity]]
- [[Style Isolation]]
- [[Z-Index и Stacking Contexts]]
- [[Глобальные стили]]

### Способы стилизации

- [[CSS in JS]]
- [[CSS Modules]]
- [[Emotion]]
- [[PostCSS]]
- [[Sass Architecture]]
- [[Styled Components]]
- [[Tailwind CSS]]
- [[Vanilla Extract]]
- [[Zero Runtime CSS]]
- [[README]]

## 12. Производительность


### JavaScript и сборка

- [[Bundle Analysis]]
- [[Chunking Strategy]]
- [[Code Splitting]]
- [[Dynamic Imports]]
- [[JavaScript Cost]]
- [[Lazy Loading]]
- [[Third Party Scripts]]
- [[Tree Shaking]]

### Rendering

- [[Concurrent Rendering]]
- [[Critical Rendering Path]]
- [[Long Tasks]]
- [[Memoization]]
- [[Reflows и Repaints]]
- [[Rendering Waterfalls]]
- [[Virtualization]]

### Метрики и бюджеты

- [[Core Web Vitals]]
- [[Lighthouse]]
- [[Performance Budget]]
- [[RAIL Model]]
- [[Real User Monitoring]]
- [[WebPageTest]]

### Платформенные возможности

- [[OffscreenCanvas]]
- [[Service Workers]]
- [[Shared Workers]]
- [[Web Workers]]
- [[WebAssembly]]
- [[WebGPU]]

### Ресурсы

- [[CDN Optimization]]
- [[Font Loading]]
- [[Image Optimization]]
- [[preconnect]]
- [[prefetch]]
- [[preload]]
- [[Resource Hints]]
- [[README]]

## 13. Microfrontends и Frontend Platform


### Delivery и эксплуатация

- [[Contract Testing]]
- [[E2E Testing]]
- [[Error Isolation]]
- [[Independent Deployment]]
- [[Independent Versioning]]
- [[Local Development]]
- [[Migration to Microfrontends]]

### Module Federation

- [[Dynamic Remotes]]
- [[Host и Remote]]
- [[Module Federation Pitfalls]]
- [[Runtime Plugins]]
- [[Shared Dependencies]]
- [[Singleton Dependencies]]
- [[Version Compatibility]]

### Общие платформенные части

- [[Cross App Communication]]
- [[Shared Authentication]]
- [[Shared Configuration]]
- [[Shared Design System]]
- [[Shared Observability]]
- [[Shared Routing]]
- [[Shared State]]
- [[Shell Application]]

### Основы Microfrontends

- [[Conway Law]]
- [[Team Topologies]]
- [[Вертикальные Microfrontends]]
- [[Горизонтальные Microfrontends]]
- [[Когда не нужны Microfrontends]]
- [[Когда нужны Microfrontends]]
- [[Что такое Microfrontends]]

### Способы интеграции

- [[Build Time Integration]]
- [[Client Side Composition]]
- [[Edge Side Composition]]
- [[iframe Integration]]
- [[Module Federation]]
- [[Run Time Integration]]
- [[Server Side Composition]]
- [[Web Components]]
- [[README]]

## 14. Monorepo, пакеты и Build System


### Build System

- [[Build Architecture]]
- [[Build Reproducibility]]
- [[Bundling]]
- [[Environment Variables]]
- [[ESM и CommonJS]]
- [[Import Maps]]
- [[Module Resolution]]
- [[Source Maps]]
- [[Transpilation]]

### Bundlers и компиляторы

- [[Babel]]
- [[esbuild]]
- [[Parcel]]
- [[Rollup]]
- [[Rspack]]
- [[SWC]]
- [[TypeScript Compiler]]
- [[Vite]]
- [[Webpack]]

### Monorepo

- [[Affected Projects]]
- [[Apps и Packages]]
- [[Dependency Constraints]]
- [[Internal Packages]]
- [[Monorepo Architecture]]
- [[Monorepo против Polyrepo]]
- [[Package Boundaries]]
- [[Remote Cache]]
- [[Shared Libraries]]
- [[Workspace Structure]]

### Версионирование и публикация

- [[Changesets]]
- [[Fixed Versioning]]
- [[Independent Versioning]]
- [[Package Publishing]]
- [[Private Packages]]
- [[Semantic Versioning]]

### Инструменты Monorepo

- [[Lerna]]
- [[npm Workspaces]]
- [[Nx]]
- [[pnpm Workspaces]]
- [[Rush]]
- [[Turborepo]]
- [[Yarn Workspaces]]
- [[README]]

## 15. TypeScript как архитектурный инструмент


### Безопасность типов

- [[Assertion Functions]]
- [[io-ts]]
- [[Runtime Validation]]
- [[Strict Mode]]
- [[Type Guards]]
- [[unknown против any]]
- [[Valibot]]
- [[Zod]]

### Контракты

- [[API Type Generation]]
- [[GraphQL Code Generation]]
- [[OpenAPI Type Generation]]
- [[Schema First Development]]
- [[Type Level Tests]]

### Моделирование предметной области

- [[Algebraic Data Types]]
- [[Branded Types]]
- [[Discriminated Unions]]
- [[Domain Types]]
- [[Exhaustiveness Checking]]
- [[Option Maybe Type]]
- [[Result Type]]
- [[Value Objects]]

### Продвинутые типы

- [[Conditional Types]]
- [[Generics]]
- [[Mapped Types]]
- [[Template Literal Types]]
- [[Type Level Programming]]
- [[Utility Types]]
- [[README]]

## 16. Безопасность и надежность


### Identity и Access

- [[ABAC]]
- [[Authentication Architecture]]
- [[Authorization Architecture]]
- [[JWT]]
- [[OAuth 2.0]]
- [[OpenID Connect]]
- [[Permission Based UI]]
- [[PKCE]]
- [[RBAC]]
- [[Session Based Authentication]]
- [[Token Based Authentication]]
- [[Token Storage]]

### Resilience

- [[Circuit Breaker]]
- [[Error Boundaries]]
- [[Error Taxonomy]]
- [[Fallback UI]]
- [[Global Error Handling]]
- [[Graceful Degradation]]
- [[Idempotency]]
- [[Progressive Enhancement]]
- [[Resilience Patterns]]
- [[Retry Strategies]]

### Supply Chain Security

- [[Build Security]]
- [[CI Security]]
- [[Dependency Auditing]]
- [[Lockfiles]]
- [[Package Integrity]]
- [[Secrets Management]]

### Web Security

- [[Clickjacking]]
- [[Content Security Policy]]
- [[CORS]]
- [[CSRF]]
- [[Security Headers]]
- [[Subresource Integrity]]
- [[Threat Modeling]]
- [[Trusted Types]]
- [[XSS]]
- [[README]]

## 17. Тестирование и качество


### Виды тестов

- [[Accessibility Testing]]
- [[Component Testing]]
- [[Contract Testing]]
- [[End to End Testing]]
- [[Integration Testing]]
- [[Load Testing]]
- [[Mutation Testing]]
- [[Performance Testing]]
- [[Unit Testing]]
- [[Visual Regression Testing]]

### Инструменты

- [[Cypress]]
- [[Jest]]
- [[Playwright]]
- [[Storybook Tests]]
- [[Testing Library]]
- [[Vitest]]

### Стратегия тестирования

- [[Quality Gates]]
- [[Shift Left Testing]]
- [[Testability by Design]]
- [[Testing Pyramid]]
- [[Testing Trophy]]

### Тестовые данные и окружение

- [[API Mocking]]
- [[Deterministic Tests]]
- [[Factories]]
- [[Fixtures]]
- [[Mock Service Worker]]
- [[Test Data Management]]
- [[Test Environments]]
- [[README]]

## 18. Observability, аналитика и эксплуатация


### Feature Management

- [[A B Testing]]
- [[Canary Releases]]
- [[Feature Flags]]
- [[Feature Toggle Patterns]]
- [[Kill Switch]]
- [[Remote Configuration]]

### Observability

- [[Alerting]]
- [[Distributed Tracing]]
- [[Error Tracking]]
- [[Frontend Observability]]
- [[Logging]]
- [[Metrics]]
- [[Session Replay]]
- [[Structured Logging]]
- [[Tracing]]
- [[Web Vitals Monitoring]]

### Product Analytics

- [[Analytics Architecture]]
- [[Consent Management]]
- [[Data Layer]]
- [[Event Naming]]
- [[Event Taxonomy]]
- [[Experiment Analytics]]
- [[Privacy Friendly Analytics]]
- [[README]]

## 19. CI CD, инфраструктура и delivery


### CD

- [[Artifact Management]]
- [[Blue Green Deployment]]
- [[Canary Deployment]]
- [[CD Architecture]]
- [[Environment Strategy]]
- [[Preview Environments]]
- [[Production]]
- [[Release Trains]]
- [[Rollback Strategy]]
- [[Staging]]

### CI

- [[Build Cache]]
- [[CI Architecture]]
- [[CI Quality Gates]]
- [[GitHub Actions]]
- [[GitLab CI]]
- [[Parallelization]]
- [[Pipeline Stages]]

### Hosting и доставка

- [[Cache Invalidation]]
- [[CDN]]
- [[Edge Computing]]
- [[Multi Region Delivery]]
- [[Serverless Hosting]]
- [[Static Hosting]]

### Infrastructure as Code

- [[Infrastructure as Code]]
- [[Kubernetes для Frontend]]
- [[Pulumi]]
- [[Secrets in Infrastructure]]
- [[Terraform]]
- [[README]]

## 20. System Design для Frontend


### Документирование

- [[Architecture Decision Records]]
- [[C4 Model]]
- [[Component Diagram]]
- [[Container Diagram]]
- [[Context Diagram]]
- [[Diagrams as Code]]
- [[RFC]]
- [[Sequence Diagram]]

### Масштабирование

- [[Availability]]
- [[CDN Strategy]]
- [[Concurrent Users]]
- [[Cost Optimization]]
- [[Edge Strategy]]
- [[Latency Budget]]
- [[RPS]]
- [[Scalability]]
- [[Оценка нагрузки]]

### Процесс проектирования

- [[Архитектурные компромиссы]]
- [[Допущения]]
- [[Нефункциональные требования]]
- [[Ограничения]]
- [[План эволюции]]
- [[Сбор требований]]
- [[Функциональные требования]]

### Типовые задачи

- [[Архитектура админ-панели]]
- [[Архитектура дашборда]]
- [[Архитектура интернет-магазина]]
- [[Архитектура личного кабинета]]
- [[Архитектура медиа-платформы]]
- [[Архитектура офлайн-приложения]]
- [[Архитектура редактора]]
- [[Архитектура социальной сети]]
- [[Архитектура чата]]
- [[README]]

## 21. Доступность и интернационализация


### Accessibility

- [[Accessibility Architecture]]
- [[Accessibility Testing]]
- [[Accessible Forms]]
- [[Accessible Modals]]
- [[Accessible Notifications]]
- [[Focus Management]]
- [[Keyboard Navigation]]
- [[Screen Readers]]
- [[Semantic HTML]]
- [[WAI ARIA]]
- [[WCAG]]

### Internationalization

- [[Date Time Currency Formatting]]
- [[ICU Message Format]]
- [[Internationalization Architecture]]
- [[Locale Routing]]
- [[Localization]]
- [[Pluralization]]
- [[RTL Layout]]
- [[Translation Management]]
- [[README]]

## 22. Архитектурное управление


### Документация

- [[ADR]]
- [[Documentation as Code]]
- [[README Driven Development]]
- [[RFC Process]]
- [[Технические стандарты]]

### Командные практики

- [[Code Ownership]]
- [[CODEOWNERS]]
- [[Frontend Platform Team]]
- [[Knowledge Sharing]]
- [[Onboarding]]
- [[Team Topologies]]

### Процессы

- [[API Review]]
- [[Architecture Review]]
- [[Dependency Review]]
- [[Design Review]]
- [[Performance Review]]
- [[Security Review]]

### Эволюция и миграции

- [[Incremental Migration]]
- [[Legacy Modernization]]
- [[Migration Playbook]]
- [[Strangler Fig Pattern]]
- [[Измерение качества архитектуры]]
- [[Управление техническим долгом]]
- [[README]]
