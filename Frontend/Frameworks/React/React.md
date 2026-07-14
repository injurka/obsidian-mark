# React: Архитектура, Экосистема и Подготовка к Собеседованиям (2026)

Добро пожаловать в главную базу знаний по React. Этот раздел структурирован от базовых концепций под капотом до продвинутых тем и архитектурных паттернов. Вся информация актуализирована с учетом стандартов 2026 года (React Compiler, Server Components, современный инструментарий).

---

## 🧭 Навигация по Базе Знаний

### 🧠 1. Core Concepts (Ядро)
Базовые механизмы работы React, без понимания которых невозможно стать Senior разработчиком.
* [[01 Virtual DOM & Fiber Architecture]] — Эвристики Diffing-алгоритма, Fiber-дерево и двойная буферизация.
* [[02 Components (Server vs Client)]] — RSC (React Server Components) и границы директив `"use client"`.
* [[03 Props vs State]] — Однонаправленный поток данных, State как "снимок" (Snapshot).
* [[04 Lifecycle & Hooks Intro]] — Смена парадигмы с жизненного цикла на "Синхронизацию". Правила хуков.

### 🪝 2. Hooks (Глубокое погружение)
Внутреннее устройство и Edge Cases всех встроенных хуков.
* [[01 useState & useReducer]] — Ленивая инициализация, батчинг и уход от устаревших замыканий.
* [[02 useEffect & useLayoutEffect]] — Фазы рендера, очистка эффектов, борьба со Stale Closures и бесконечными циклами.
* [[03 useRef & useImperativeHandle]] — "Latest Ref Pattern" и инкапсуляция DOM-методов.
* [[04 useMemo & useCallback]] — Налог на мемоизацию (Overhead) и правила ссылочной идентичности.
* [[05 useContext]] — Проблема "рендер-шторма" и почему контекст — это не глобальный стейт.
* [[06 Custom Hooks]] — Разделение логики (но не состояния!). Примеры `useFetch`, `useLocalStorage`.
* [[07 Concurrent Hooks (useTransition, useDeferredValue)]] — Конкурентный рендер, фоновая отрисовка тяжелых UI.
* [[08 New Hooks (use, useOptimistic, useActionState, useFormStatus)]] — Хуки React 19+. Чтение контекста в `if`, работа с Server Actions.

### 🌐 3. React Server Components & Actions
То, как пишут React приложения сегодня (на базе Next.js/Remix).
* [[01 Introduction to RSC]] — Отличие SSR от RSC, нулевой размер бандла.
* [[02 Data Fetching with RSC]] — Проблема Waterfall, дедупликация `fetch`, борьба с Data Leaking (безопасность).
* [[03 Server Actions & Mutations]] — RPC в React, Progressive Enhancement (работа форм без JS).
* [[04 Streaming & Suspense]] — Потоковая передача HTML, границы загрузки и SEO.

### 📦 4. State Management (Управление состоянием)
Выбор правильного инструмента под конкретную задачу.
* [[01 Context API]] — Dependency Injection, паттерн State + Dispatch.
* [[02 Redux Toolkit (RTK) & RTK Query]] — Immer.js (мутабельная иммутабельность), Flux, запрет на несериализуемые данные.
* [[03 Zustand]] — Лидер 2026 года. Внешние сторы, Transient Updates (без ре-рендера UI).
* [[04 Jotai & Recoil]] — Атомарный стейт (Снизу-вверх). Для Figma-клонов и Canvas.
* [[05 MobX]] — ООП подход. Прокси, наблюдатели и проблема Early Dereference.
* [[06 XState]] — Конечные автоматы. Спасение от невозможных состояний.

### 🛣️ 5. Routing (Маршрутизация)
* [[01 React Router v7]] — Паттерн "Fetch-then-Render" через Loaders, Actions, ErrorBoundary.
* [[02 TanStack Router]] — 100% Type-Safe роутинг, Search Params как стейт (валидация Zod).

### 💅 6. Styling & UI (Стилизация)
* [[01 Tailwind CSS]] — Утилитарный подход, утилита `cn` (clsx + tailwind-merge) для динамики.
* [[02 CSS Modules]] — Локальный Scope, `:export`, идеальная совместимость с Server Components.
* [[03 CSS-in-JS (Emotion, Styled Components)]] — Почему Runtime CSS-in-JS умирает. Zero-Runtime (Vanilla Extract).
* [[04 Component Libraries (Shadcn UI, Radix, MUI)]] — Headless UI, паттерн Copy-Paste, CVA (Class Variance Authority).

### 🚀 7. Performance Optimization (Оптимизация)
* [[01 Memoization]] — Работа `React.memo` под капотом, когда это полезно, а когда вредно.
* [[02 Code Splitting & Lazy Loading]] — Разделение чанков, `React.lazy`, Error Boundaries при разрыве сети.
* [[03 React Compiler (React Forget)]] — Авто-мемоизация. Что он может, а где архитектурно бессилен.
* [[04 Profiler & DevTools]] — Flamegraph, "Why did this render?", профилирование Dev vs Prod.

### 🧪 8. Testing (Тестирование)
* [[01 Vitest & Jest]] — Моки, Шпионы, борьба с ложноположительными асинхронными тестами.
* [[02 React Testing Library (RTL)]] — Тестирование поведения, а не деталей. `getByRole`, `userEvent`.
* [[03 E2E Testing (Playwright, Cypress)]] — Auto-waiting в Playwright, Page Object Model (POM), Flaky Tests.

### 🏗️ 9. Architecture & Patterns (Архитектура)
* [[01 Error Boundaries]] — Защита от падений. Ограничения (не ловит асинхронщину и события).
* [[02 Compound Components]] — Паттерн контекстной композиции (в стиле `<Select>` и `<Option>`).
* [[03 HOCs & Render Props]] — Наследие (Wrapper Hell, Callback Hell) и почему Хуки лучше.
* [[04 Micro-frontends]] — Module Federation. Плюсы и критические недостатки (версионирование, утечки).

### 🌌 10. Ecosystem & Meta-frameworks (Экосистема)
* [[01 Next.js]] — App Router, 4-уровневое кэширование, SSR/SSG/ISR, Edge Computing.
* [[02 Remix]] — Web Standards, упор на HTTP-кэширование, отсутствие SSG.
* [[03 Expo (React Native)]] — Continuous Native Generation (CNG), EAS Updates (OTA-релизы).
* [[04 Vite]] — Замена Webpack, Native ESM, Esbuild vs Rollup.

### 💾 11. Data Fetching & Caching
* [[01 TanStack Query (React Query)]] — Управление серверным стейтом, `staleTime` vs `gcTime`, зависимые запросы.
* [[02 SWR]] — Паттерн Stale-While-Revalidate, фоновые рефетчи.
* [[03 Apollo Client (GraphQL)]] — Нормализованный кэш. Как он автоматически синхронизирует сущности по ID.

### 🎓 12. Advanced Topics (Продвинутые темы)
* [[01 WebSockets & Real-time]] — `useSyncExternalStore`, правильный Cleanup, избегание утечек памяти.
* [[02 Web Workers]] — Разгрузка Main Thread, библиотека `Comlink`, ограничения сериализации (нельзя передать функции).
* [[03 Accessibility (a11y)]] — ARIA, Focus Trap, `aria-live` для динамического React.
* [[04 Internationalization (i18n)]] — Плюрализация (ICU), Cumulative Layout Shift (CLS).
* [[05 Authentication & Authorization]] — Где хранить JWT (LocalStorage vs HttpOnly Cookie). Route Guards, RBAC на бекенде.

---
> **Совет:** Используйте этот файл как оглавление. Заходите в нужный раздел, повторяйте материал перед интервью или при проектировании архитектуры приложения. Удачи!
