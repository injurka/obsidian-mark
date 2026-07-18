## Популярные фреймворки

- ### [[Vue]]
- ### [[Nuxt]]
- ### [[React]]
- ### [[Lit]]

## Фреймворки и их роль в разработке приложений

Термин «фреймворк» объединяет множество различных шаблонов, но все они в той или иной форме обеспечивают продуманную организационную структуру, в рамках которой могут формироваться сложные приложения. Использование фреймворка позволяет приложениям поддерживать согласованные условные обозначения кода при элегантном масштабировании по размеру и сложности. Они предлагают надежные механизмы для общих задач, таких как определение и повторное использование компонентов, управление потоком данных, маршрутизация и многие другие.

Все чаще JavaScript-фреймворки принимают форму одностраничного приложения (single page application, SPA). Одностраничные приложения используют API истории браузера HTML5 для предоставления всего пользовательского интерфейса приложения с маршрутизацией URL-адресов и только одной начальной загрузкой страницы. Фреймворк управляет состоянием приложения, а также всеми компонентами пользовательского интерфейса во время выполнения приложения.

У большинства популярных платформ SPA есть сильные сообщества разработчиков, а также множество сторонних расширений.


---

```text
Frameworks
├── Frameworks.md
├── 00 Framework Fundamentals
│   ├── Framework Fundamentals.md
│   ├── Rendering Paradigms
│   │   ├── CSR Client-Side Rendering.md
│   │   ├── SSR Server-Side Rendering.md
│   │   ├── SSG Static Site Generation.md
│   │   ├── ISR Incremental Static Regeneration.md
│   │   ├── DSG Deferred Static Generation.md
│   │   ├── Streaming SSR.md
│   │   ├── Edge Rendering.md
│   │   ├── Islands Architecture.md
│   │   ├── Partial Hydration.md
│   │   ├── Progressive Hydration.md
│   │   ├── Resumability.md
│   │   ├── SPA MPA MPA-like.md
│   │   └── Rendering Paradigms.md
│   ├── Reactivity Models
│   │   ├── Virtual DOM.md
│   │   ├── Fine-Grained Reactivity.md
│   │   ├── Signals.md
│   │   ├── Observable State.md
│   │   ├── Compiler-Based Reactivity.md
│   │   ├── Push vs Pull Reactivity.md
│   │   └── Reactivity Models.md
│   ├── Component Model
│   │   ├── Components.md
│   │   ├── Props.md
│   │   ├── Events.md
│   │   ├── Slots Children Composition.md
│   │   ├── Controlled vs Uncontrolled Components.md
│   │   ├── Component Lifecycle.md
│   │   ├── Component Communication.md
│   │   └── Component Model.md
│   ├── Framework Architecture
│   │   ├── Runtime vs Compiler.md
│   │   ├── File-Based Conventions.md
│   │   ├── Dependency Injection.md
│   │   ├── Plugin Systems.md
│   │   ├── Middleware.md
│   │   ├── Modules.md
│   │   ├── Monorepo Architecture.md
│   │   └── Framework Architecture.md
│   ├── Comparison
│   │   ├── React vs Vue.md
│   │   ├── React vs Angular.md
│   │   ├── React vs Svelte.md
│   │   ├── Vue vs Svelte.md
│   │   ├── Next vs Nuxt.md
│   │   ├── Next vs Remix.md
│   │   ├── SSR Framework Comparison.md
│   │   ├── State Management Comparison.md
│   │   ├── Performance Comparison.md
│   │   └── Framework Selection Guide.md
│   └── Glossary.md
├── 01 Cross-Framework Patterns
│   ├── Cross-Framework Patterns.md
│   ├── Routing
│   │   ├── Routing Fundamentals.md
│   │   ├── File-Based Routing.md
│   │   ├── Nested Routes.md
│   │   ├── Dynamic Routes.md
│   │   ├── Catch-All Routes.md
│   │   ├── Route Guards.md
│   │   ├── Loaders Resolvers.md
│   │   ├── Route-Level Code Splitting.md
│   │   ├── Navigation Lifecycle.md
│   │   └── URL Search Params.md
│   ├── Data Fetching
│   │   ├── Data Fetching.md
│   │   ├── Client Fetching.md
│   │   ├── Server Fetching.md
│   │   ├── Request Waterfalls.md
│   │   ├── Parallel Data Fetching.md
│   │   ├── Caching Strategies.md
│   │   ├── Cache Invalidation.md
│   │   ├── Optimistic Updates.md
│   │   ├── Pagination Infinite Scroll.md
│   │   ├── Error Handling.md
│   │   └── Loading States.md
│   ├── State Management
│   │   ├── State Management.md
│   │   ├── Local State.md
│   │   ├── Global State.md
│   │   ├── Server State.md
│   │   ├── URL State.md
│   │   ├── Form State.md
│   │   ├── Derived State.md
│   │   ├── State Machines.md
│   │   └── State Normalization.md
│   ├── Forms
│   │   ├── Forms.md
│   │   ├── Validation.md
│   │   ├── Schema Validation.md
│   │   ├── Server Validation.md
│   │   ├── Multi-Step Forms.md
│   │   ├── File Uploads.md
│   │   ├── Accessibility.md
│   │   └── Form Libraries.md
│   ├── Rendering and Hydration
│   │   ├── Hydration.md
│   │   ├── Hydration Mismatch.md
│   │   ├── Client Boundaries.md
│   │   ├── Server Boundaries.md
│   │   ├── Suspense.md
│   │   ├── Streaming.md
│   │   └── Progressive Enhancement.md
│   ├── Security
│   │   ├── Security.md
│   │   ├── XSS.md
│   │   ├── CSRF.md
│   │   ├── CSP.md
│   │   ├── Authentication.md
│   │   ├── Authorization.md
│   │   ├── Session Management.md
│   │   ├── OAuth OIDC.md
│   │   ├── Secrets Management.md
│   │   └── Supply Chain Security.md
│   ├── Performance
│   │   ├── Performance.md
│   │   ├── Core Web Vitals.md
│   │   ├── Bundle Analysis.md
│   │   ├── Tree Shaking.md
│   │   ├── Code Splitting.md
│   │   ├── Lazy Loading.md
│   │   ├── Image Optimization.md
│   │   ├── Font Optimization.md
│   │   ├── Script Loading.md
│   │   ├── Memory Leaks.md
│   │   └── Rendering Profiling.md
│   ├── Testing
│   │   ├── Testing.md
│   │   ├── Unit Testing.md
│   │   ├── Component Testing.md
│   │   ├── Integration Testing.md
│   │   ├── E2E Testing.md
│   │   ├── Visual Regression Testing.md
│   │   ├── Accessibility Testing.md
│   │   ├── Contract Testing.md
│   │   ├── Mocking Network.md
│   │   └── Testing SSR.md
│   ├── Accessibility
│   │   ├── Accessibility.md
│   │   ├── Semantic HTML.md
│   │   ├── Keyboard Navigation.md
│   │   ├── Focus Management.md
│   │   ├── ARIA.md
│   │   ├── Screen Readers.md
│   │   ├── Accessible Forms.md
│   │   ├── Accessible Modals.md
│   │   └── WCAG.md
│   ├── Internationalization
│   │   ├── Internationalization.md
│   │   ├── Locale Routing.md
│   │   ├── Translations.md
│   │   ├── ICU Message Format.md
│   │   ├── Date Number Currency.md
│   │   ├── Pluralization.md
│   │   ├── RTL.md
│   │   └── SEO for i18n.md
│   ├── SEO
│   │   ├── SEO.md
│   │   ├── Metadata.md
│   │   ├── Open Graph.md
│   │   ├── JSON-LD Structured Data.md
│   │   ├── Sitemap.md
│   │   ├── Robots.txt.md
│   │   ├── Canonical URLs.md
│   │   └── Social Preview.md
│   └── Observability
│       ├── Observability.md
│       ├── Logging.md
│       ├── Error Tracking.md
│       ├── Web Vitals Monitoring.md
│       ├── Tracing.md
│       ├── Analytics.md
│       └── Feature Flags.md
├── 02 React
│   ├── React.md
│   ├── History and Versions.md
│   ├── 01 Fundamentals
│   │   ├── Fundamentals.md
│   │   ├── JSX.md
│   │   ├── Components.md
│   │   ├── Props.md
│   │   ├── State.md
│   │   ├── Events.md
│   │   ├── Conditional Rendering.md
│   │   ├── Lists and Keys.md
│   │   ├── Reconciliation.md
│   │   ├── Virtual DOM.md
│   │   ├── Fiber Architecture.md
│   │   ├── Render and Commit Phases.md
│   │   └── Strict Mode.md
│   ├── 02 Hooks
│   │   ├── Hooks.md
│   │   ├── Rules of Hooks.md
│   │   ├── useState.md
│   │   ├── useReducer.md
│   │   ├── useEffect.md
│   │   ├── useLayoutEffect.md
│   │   ├── useInsertionEffect.md
│   │   ├── useRef.md
│   │   ├── useImperativeHandle.md
│   │   ├── useMemo.md
│   │   ├── useCallback.md
│   │   ├── useContext.md
│   │   ├── useId.md
│   │   ├── useSyncExternalStore.md
│   │   ├── useDebugValue.md
│   │   ├── Custom Hooks.md
│   │   └── Hook Anti-Patterns.md
│   ├── 03 Concurrent React
│   │   ├── Concurrent React.md
│   │   ├── Automatic Batching.md
│   │   ├── startTransition.md
│   │   ├── useTransition.md
│   │   ├── useDeferredValue.md
│   │   ├── Suspense.md
│   │   ├── SuspenseList.md
│   │   ├── Offscreen.md
│   │   └── Scheduling and Priorities.md
│   ├── 04 React 19
│   │   ├── React 19.md
│   │   ├── use.md
│   │   ├── Actions.md
│   │   ├── useActionState.md
│   │   ├── useOptimistic.md
│   │   ├── useFormStatus.md
│   │   ├── Ref as Prop.md
│   │   ├── Document Metadata.md
│   │   ├── Asset Loading.md
│   │   └── React Compiler.md
│   ├── 05 Server Components
│   │   ├── React Server Components.md
│   │   ├── Server vs Client Components.md
│   │   ├── use client.md
│   │   ├── use server.md
│   │   ├── Serialization Rules.md
│   │   ├── Server Data Fetching.md
│   │   ├── Server Actions.md
│   │   ├── Streaming RSC.md
│   │   └── RSC Security.md
│   ├── 06 State Management
│   │   ├── State Management.md
│   │   ├── Context API.md
│   │   ├── Redux Toolkit.md
│   │   ├── RTK Query.md
│   │   ├── Zustand.md
│   │   ├── Jotai.md
│   │   ├── Recoil.md
│   │   ├── MobX.md
│   │   ├── Valtio.md
│   │   ├── XState.md
│   │   └── TanStack Store.md
│   ├── 07 Data Fetching
│   │   ├── Data Fetching.md
│   │   ├── TanStack Query.md
│   │   ├── SWR.md
│   │   ├── Apollo Client.md
│   │   ├── Relay.md
│   │   ├── tRPC.md
│   │   ├── GraphQL.md
│   │   └── REST.md
│   ├── 08 Routing
│   │   ├── Routing.md
│   │   ├── React Router.md
│   │   ├── React Router Data APIs.md
│   │   ├── TanStack Router.md
│   │   ├── Wouter.md
│   │   └── Routing Patterns.md
│   ├── 09 Styling and UI
│   │   ├── Styling and UI.md
│   │   ├── CSS Modules.md
│   │   ├── Tailwind CSS.md
│   │   ├── CSS-in-JS.md
│   │   ├── Styled Components.md
│   │   ├── Emotion.md
│   │   ├── Vanilla Extract.md
│   │   ├── Panda CSS.md
│   │   ├── Radix UI.md
│   │   ├── shadcn-ui.md
│   │   ├── Material UI.md
│   │   ├── Chakra UI.md
│   │   └── Ant Design.md
│   ├── 10 Patterns and Architecture
│   │   ├── Patterns and Architecture.md
│   │   ├── Composition.md
│   │   ├── Compound Components.md
│   │   ├── Controlled Components.md
│   │   ├── Render Props.md
│   │   ├── Higher-Order Components.md
│   │   ├── Portals.md
│   │   ├── Error Boundaries.md
│   │   ├── Feature-Sliced Design.md
│   │   ├── Atomic Design.md
│   │   └── Container Presentational Pattern.md
│   ├── 11 Testing
│   │   ├── Testing.md
│   │   ├── React Testing Library.md
│   │   ├── Vitest.md
│   │   ├── Jest.md
│   │   ├── MSW.md
│   │   ├── Playwright.md
│   │   ├── Cypress.md
│   │   └── Storybook.md
│   ├── 12 Performance
│   │   ├── Performance.md
│   │   ├── memo.md
│   │   ├── Memoization.md
│   │   ├── Lazy and Suspense.md
│   │   ├── Profiler.md
│   │   ├── Why Did You Render.md
│   │   ├── React DevTools.md
│   │   └── Performance Anti-Patterns.md
│   ├── 13 React Native
│   │   ├── React Native.md
│   │   ├── Expo.md
│   │   ├── Navigation.md
│   │   ├── Styling.md
│   │   ├── Native Modules.md
│   │   ├── Performance.md
│   │   ├── Testing.md
│   │   └── Deployment.md
│   └── Handbook
│       ├── Handbook.md
│       ├── Custom Hooks.md
│       ├── Components.md
│       ├── Utilities.md
│       ├── Interview.md
│       └── Migration Guides.md
├── 03 Next.js
│   ├── Next.js.md
│   ├── Versions and Migration.md
│   ├── Architecture
│   │   ├── Architecture.md
│   │   ├── App Router.md
│   │   ├── Pages Router.md
│   │   ├── Turbopack.md
│   │   ├── Rust Compiler.md
│   │   └── Project Structure.md
│   ├── App Router
│   │   ├── App Router.md
│   │   ├── Layouts and Templates.md
│   │   ├── Pages.md
│   │   ├── Loading UI.md
│   │   ├── Error Handling.md
│   │   ├── Not Found.md
│   │   ├── Route Groups.md
│   │   ├── Dynamic Segments.md
│   │   ├── Parallel Routes.md
│   │   ├── Intercepting Routes.md
│   │   └── Route Handlers.md
│   ├── Rendering and Caching
│   │   ├── Rendering and Caching.md
│   │   ├── Static Rendering.md
│   │   ├── Dynamic Rendering.md
│   │   ├── Partial Prerendering.md
│   │   ├── Streaming.md
│   │   ├── Data Cache.md
│   │   ├── Full Route Cache.md
│   │   ├── Router Cache.md
│   │   ├── revalidatePath.md
│   │   ├── revalidateTag.md
│   │   └── Cache Components.md
│   ├── Data and Mutations
│   │   ├── Data and Mutations.md
│   │   ├── Fetching Data.md
│   │   ├── Server Actions.md
│   │   ├── Forms.md
│   │   ├── Cookies.md
│   │   ├── Headers.md
│   │   └── Redirects.md
│   ├── Middleware and Edge
│   │   ├── Middleware.md
│   │   ├── Edge Runtime.md
│   │   ├── Proxy.md
│   │   ├── Geo Personalization.md
│   │   └── Rate Limiting.md
│   ├── SEO and Assets
│   │   ├── Metadata API.md
│   │   ├── Image.md
│   │   ├── Font.md
│   │   ├── Script.md
│   │   ├── Sitemap.md
│   │   └── Robots.md
│   ├── Authentication.md
│   ├── Internationalization.md
│   ├── Testing.md
│   ├── Deployment
│   │   ├── Deployment.md
│   │   ├── Vercel.md
│   │   ├── Docker.md
│   │   ├── Self Hosting.md
│   │   └── Standalone Output.md
│   └── Migration
│       ├── Pages Router to App Router.md
│       ├── Next 12 to 13.md
│       ├── Next 13 to 14.md
│       └── Next 14 to 15.md
├── 04 Vue
│   ├── Vue.md
│   ├── History and Versions.md
│   ├── 01 Essentials
│   │   ├── Essentials.md
│   │   ├── Template Syntax.md
│   │   ├── Reactivity Fundamentals.md
│   │   ├── Computed Properties.md
│   │   ├── Class and Style Bindings.md
│   │   ├── Conditional Rendering.md
│   │   ├── List Rendering.md
│   │   ├── Event Handling.md
│   │   ├── Form Input Bindings.md
│   │   └── Lifecycle Hooks.md
│   ├── 02 Composition API
│   │   ├── Composition API.md
│   │   ├── setup.md
│   │   ├── ref.md
│   │   ├── reactive.md
│   │   ├── readonly.md
│   │   ├── computed.md
│   │   ├── watch.md
│   │   ├── watchEffect.md
│   │   ├── nextTick.md
│   │   ├── provide and inject.md
│   │   ├── Composables.md
│   │   └── Reactivity Utilities.md
│   ├── 03 Options API
│   │   ├── Options API.md
│   │   ├── data.md
│   │   ├── methods.md
│   │   ├── computed.md
│   │   ├── watch.md
│   │   ├── Lifecycle.md
│   │   └── Mixins.md
│   ├── 04 Components
│   │   ├── Components.md
│   │   ├── Props.md
│   │   ├── Emits.md
│   │   ├── Component v-model.md
│   │   ├── Fallthrough Attributes.md
│   │   ├── Slots.md
│   │   ├── Dynamic Components.md
│   │   ├── KeepAlive.md
│   │   ├── Teleport.md
│   │   ├── Async Components.md
│   │   └── Dependency Injection.md
│   ├── 05 SFC
│   │   ├── Single File Components.md
│   │   ├── script setup.md
│   │   ├── Scoped CSS.md
│   │   ├── CSS Modules.md
│   │   ├── CSS v-bind.md
│   │   ├── Top-Level await.md
│   │   └── SFC Syntax Specification.md
│   ├── 06 Compiler Macros
│   │   ├── Compiler Macros.md
│   │   ├── defineProps.md
│   │   ├── withDefaults.md
│   │   ├── defineEmits.md
│   │   ├── defineModel.md
│   │   ├── defineExpose.md
│   │   ├── defineOptions.md
│   │   ├── defineSlots.md
│   │   └── Generic Components.md
│   ├── 07 Advanced
│   │   ├── Advanced.md
│   │   ├── Custom Directives.md
│   │   ├── Render Functions.md
│   │   ├── JSX TSX.md
│   │   ├── Plugins.md
│   │   ├── Custom Elements.md
│   │   ├── Transitions.md
│   │   ├── TransitionGroup.md
│   │   ├── Suspense.md
│   │   ├── Error Handling.md
│   │   └── DevTools.md
│   ├── 08 State Management
│   │   ├── State Management.md
│   │   ├── Pinia.md
│   │   ├── Pinia Stores.md
│   │   ├── Pinia Plugins.md
│   │   ├── Vuex.md
│   │   └── State Management Patterns.md
│   ├── 09 Routing
│   │   ├── Vue Router.md
│   │   ├── Route Records.md
│   │   ├── Navigation Guards.md
│   │   ├── Route Meta.md
│   │   ├── Data Loaders.md
│   │   ├── Transitions.md
│   │   └── Typed Routes.md
│   ├── 10 Testing
│   │   ├── Testing.md
│   │   ├── Vue Test Utils.md
│   │   ├── Vitest.md
│   │   ├── Cypress.md
│   │   ├── Playwright.md
│   │   └── Storybook.md
│   ├── 11 Performance
│   │   ├── Performance.md
│   │   ├── Rendering Mechanism.md
│   │   ├── Virtual DOM.md
│   │   ├── Update Optimizations.md
│   │   ├── v-once.md
│   │   ├── v-memo.md
│   │   ├── Lazy Hydration.md
│   │   └── Vapor Mode.md
│   └── Migration
│       ├── Vue 2 to Vue 3.md
│       ├── Options API to Composition API.md
│       └── Vue 3 to Vue 4.md
├── 05 Nuxt
│   ├── Nuxt.md
│   ├── Versions and Migration.md
│   ├── Fundamentals
│   │   ├── Fundamentals.md
│   │   ├── Project Structure.md
│   │   ├── Configuration.md
│   │   ├── Auto Imports.md
│   │   ├── Components.md
│   │   ├── Composables.md
│   │   ├── Utils.md
│   │   ├── Plugins.md
│   │   ├── Middleware.md
│   │   └── Layers.md
│   ├── Routing
│   │   ├── File-Based Routing.md
│   │   ├── Pages.md
│   │   ├── Dynamic Routes.md
│   │   ├── Route Middleware.md
│   │   ├── Layouts.md
│   │   ├── Navigation.md
│   │   └── Route Rules.md
│   ├── Rendering
│   │   ├── Rendering.md
│   │   ├── Universal Rendering.md
│   │   ├── Client-Side Rendering.md
│   │   ├── Hybrid Rendering.md
│   │   ├── Prerendering.md
│   │   ├── Islands.md
│   │   ├── Lazy Hydration.md
│   │   └── Hydration.md
│   ├── Data Fetching
│   │   ├── Data Fetching.md
│   │   ├── useFetch.md
│   │   ├── useAsyncData.md
│   │   ├── useLazyFetch.md
│   │   ├── useLazyAsyncData.md
│   │   ├── $fetch.md
│   │   ├── Caching.md
│   │   ├── Refreshing Data.md
│   │   └── Error Handling.md
│   ├── State Management
│   │   ├── State Management.md
│   │   ├── useState.md
│   │   ├── Pinia.md
│   │   ├── SSR State.md
│   │   └── Persisted State.md
│   ├── Server Nitro
│   │   ├── Nitro.md
│   │   ├── Server Routes.md
│   │   ├── API Routes.md
│   │   ├── Server Middleware.md
│   │   ├── Storage.md
│   │   ├── Runtime Config.md
│   │   ├── Caching.md
│   │   ├── Tasks.md
│   │   └── Deployment Presets.md
│   ├── Modules
│   │   ├── Modules.md
│   │   ├── Authoring Modules.md
│   │   ├── Nuxt Content.md
│   │   ├── Nuxt Image.md
│   │   ├── Nuxt UI.md
│   │   ├── Nuxt i18n.md
│   │   ├── Nuxt Auth.md
│   │   ├── Nuxt Security.md
│   │   ├── Nuxt DevTools.md
│   │   └── Nuxt Scripts.md
│   ├── SEO and Assets
│   │   ├── SEO.md
│   │   ├── useHead.md
│   │   ├── useSeoMeta.md
│   │   ├── useServerSeoMeta.md
│   │   ├── Sitemap.md
│   │   ├── Robots.md
│   │   ├── Open Graph.md
│   │   └── Fonts.md
│   ├── Testing.md
│   ├── Performance.md
│   ├── Deployment.md
│   └── Migration
│       ├── Nuxt 2 to Nuxt 3.md
│       ├── Nuxt 3 to Nuxt 4.md
│       └── Bridge.md
├── 06 Angular
│   ├── Angular.md
│   ├── History and Versions.md
│   ├── Fundamentals
│   │   ├── Fundamentals.md
│   │   ├── Standalone Components.md
│   │   ├── NgModules.md
│   │   ├── Templates.md
│   │   ├── Data Binding.md
│   │   ├── Directives.md
│   │   ├── Pipes.md
│   │   ├── Control Flow.md
│   │   ├── Lifecycle.md
│   │   └── View Encapsulation.md
│   ├── Components
│   │   ├── Components.md
│   │   ├── Inputs.md
│   │   ├── Outputs.md
│   │   ├── Content Projection.md
│   │   ├── View Queries.md
│   │   ├── Dynamic Components.md
│   │   └── Host Elements.md
│   ├── Signals
│   │   ├── Signals.md
│   │   ├── signal.md
│   │   ├── computed.md
│   │   ├── effect.md
│   │   ├── input.md
│   │   ├── model.md
│   │   ├── Signal Forms.md
│   │   └── RxJS Interop.md
│   ├── Dependency Injection
│   │   ├── Dependency Injection.md
│   │   ├── Providers.md
│   │   ├── inject.md
│   │   ├── Injection Tokens.md
│   │   └── Hierarchical Injectors.md
│   ├── RxJS
│   │   ├── RxJS.md
│   │   ├── Observables.md
│   │   ├── Operators.md
│   │   ├── Subjects.md
│   │   ├── Error Handling.md
│   │   └── Unsubscription.md
│   ├── Routing
│   │   ├── Angular Router.md
│   │   ├── Lazy Loading.md
│   │   ├── Guards.md
│   │   ├── Resolvers.md
│   │   ├── Route Parameters.md
│   │   └── Component Input Binding.md
│   ├── Forms
│   │   ├── Forms.md
│   │   ├── Reactive Forms.md
│   │   ├── Template-Driven Forms.md
│   │   ├── Form Validation.md
│   │   └── Control Value Accessor.md
│   ├── HTTP and State
│   │   ├── HttpClient.md
│   │   ├── Interceptors.md
│   │   ├── NgRx.md
│   │   ├── NgRx Signal Store.md
│   │   ├── Akita.md
│   │   └── State Patterns.md
│   ├── SSR
│   │   ├── Angular SSR.md
│   │   ├── Angular Universal.md
│   │   ├── Hydration.md
│   │   ├── Incremental Hydration.md
│   │   └── Prerendering.md
│   ├── Testing
│   │   ├── Testing.md
│   │   ├── TestBed.md
│   │   ├── Jasmine.md
│   │   ├── Jest.md
│   │   ├── Cypress.md
│   │   └── Playwright.md
│   ├── Tooling
│   │   ├── Angular CLI.md
│   │   ├── Schematics.md
│   │   ├── Builders.md
│   │   ├── ESLint.md
│   │   └── Angular DevTools.md
│   └── Migration
│       ├── AngularJS to Angular.md
│       ├── NgModules to Standalone.md
│       └── Version Updates.md
├── 07 Svelte
│   ├── Svelte.md
│   ├── Svelte 5 Migration.md
│   ├── Fundamentals
│   │   ├── Fundamentals.md
│   │   ├── Components.md
│   │   ├── Template Syntax.md
│   │   ├── Props.md
│   │   ├── Events.md
│   │   ├── Bindings.md
│   │   ├── Control Flow.md
│   │   ├── Slots.md
│   │   ├── Lifecycle.md
│   │   └── Transitions.md
│   ├── Runes
│   │   ├── Runes.md
│   │   ├── $state.md
│   │   ├── $derived.md
│   │   ├── $effect.md
│   │   ├── $props.md
│   │   ├── $bindable.md
│   │   ├── $inspect.md
│   │   ├── $host.md
│   │   └── Snippets.md
│   ├── Advanced
│   │   ├── Advanced.md
│   │   ├── Actions.md
│   │   ├── Context.md
│   │   ├── Stores.md
│   │   ├── Motion.md
│   │   ├── Animations.md
│   │   ├── Custom Elements.md
│   │   └── Svelte Compiler.md
│   ├── Testing.md
│   ├── Performance.md
│   └── SvelteKit
│       ├── SvelteKit.md
│       ├── Routing.md
│       ├── Load Functions.md
│       ├── Form Actions.md
│       ├── Hooks.md
│       ├── Server and Client Boundaries.md
│       ├── Adapters.md
│       ├── SSR SSG CSR.md
│       ├── Deployment.md
│       └── Authentication.md
├── 08 Solid
│   ├── Solid.md
│   ├── Fundamentals
│   │   ├── Fundamentals.md
│   │   ├── Fine-Grained Reactivity.md
│   │   ├── createSignal.md
│   │   ├── createEffect.md
│   │   ├── createMemo.md
│   │   ├── createResource.md
│   │   ├── Stores.md
│   │   ├── Context.md
│   │   ├── Control Flow.md
│   │   └── Lifecycle.md
│   ├── Advanced
│   │   ├── Suspense.md
│   │   ├── Transitions.md
│   │   ├── Error Boundaries.md
│   │   ├── Portals.md
│   │   ├── Directives.md
│   │   └── Rendering.md
│   ├── SolidStart
│   │   ├── SolidStart.md
│   │   ├── File Routing.md
│   │   ├── Server Functions.md
│   │   ├── Data Loading.md
│   │   ├── Streaming.md
│   │   └── Deployment.md
│   └── Testing.md
├── 09 Qwik
│   ├── Qwik.md
│   ├── Fundamentals
│   │   ├── Resumability.md
│   │   ├── Components.md
│   │   ├── Signals.md
│   │   ├── Tasks.md
│   │   ├── Event Handling.md
│   │   ├── Slots.md
│   │   ├── Context.md
│   │   └── Lazy Loading.md
│   ├── Qwik City
│   │   ├── Qwik City.md
│   │   ├── Routing.md
│   │   ├── Loaders.md
│   │   ├── Actions.md
│   │   ├── Middleware.md
│   │   ├── Endpoints.md
│   │   └── Deployment.md
│   └── Testing.md
├── 10 Lit and Web Components
│   ├── Lit.md
│   ├── Web Components.md
│   ├── Standards
│   │   ├── Custom Elements.md
│   │   ├── Shadow DOM.md
│   │   ├── HTML Templates.md
│   │   ├── Slots.md
│   │   ├── Declarative Shadow DOM.md
│   │   └── Scoped Custom Element Registries.md
│   ├── Lit Fundamentals
│   │   ├── ReactiveElement.md
│   │   ├── LitElement.md
│   │   ├── Templates.md
│   │   ├── Directives.md
│   │   ├── Reactive Properties.md
│   │   ├── Lifecycle.md
│   │   ├── Styles.md
│   │   ├── Events.md
│   │   └── Context.md
│   ├── Integration
│   │   ├── React Integration.md
│   │   ├── Vue Integration.md
│   │   ├── Angular Integration.md
│   │   ├── SSR.md
│   │   └── Testing.md
│   └── Design Systems.md
├── 11 Astro
│   ├── Astro.md
│   ├── Fundamentals
│   │   ├── Islands Architecture.md
│   │   ├── Astro Components.md
│   │   ├── Templates.md
│   │   ├── Styling.md
│   │   ├── Content Collections.md
│   │   ├── View Transitions.md
│   │   └── Environment Variables.md
│   ├── Rendering
│   │   ├── Static Output.md
│   │   ├── Server Output.md
│   │   ├── Hybrid Output.md
│   │   ├── Client Directives.md
│   │   ├── Server Islands.md
│   │   └── Streaming.md
│   ├── Routing and Endpoints
│   │   ├── Routing.md
│   │   ├── Dynamic Routes.md
│   │   ├── API Endpoints.md
│   │   ├── Middleware.md
│   │   └── Actions.md
│   ├── Integrations
│   │   ├── React.md
│   │   ├── Vue.md
│   │   ├── Svelte.md
│   │   ├── Solid.md
│   │   ├── MDX.md
│   │   └── CMS.md
│   ├── Deployment.md
│   └── Testing.md
├── 12 Other Frameworks
│   ├── Other Frameworks.md
│   ├── Preact
│   │   ├── Preact.md
│   │   ├── Signals.md
│   │   ├── Compatibility with React.md
│   │   └── Preact CLI.md
│   ├── Alpine.js
│   │   ├── Alpine.js.md
│   │   ├── Directives.md
│   │   ├── Stores.md
│   │   └── Plugins.md
│   ├── HTMX
│   │   ├── HTMX.md
│   │   ├── Attributes.md
│   │   ├── Server-Driven UI.md
│   │   ├── Extensions.md
│   │   └── Hypermedia Patterns.md
│   ├── Ember
│   │   ├── Ember.md
│   │   ├── Glimmer.md
│   │   ├── Octane.md
│   │   └── Ember Data.md
│   ├── Mithril.md
│   ├── Hyperapp.md
│   ├── Marko.md
│   ├── Fresh.md
│   ├── Hono JSX.md
│   └── Blazor.md
├── 13 Meta-frameworks
│   ├── Meta-frameworks.md
│   ├── Remix
│   │   ├── Remix.md
│   │   ├── Routes.md
│   │   ├── Loaders.md
│   │   ├── Actions.md
│   │   ├── Nested Routes.md
│   │   ├── Error Boundaries.md
│   │   ├── Sessions.md
│   │   ├── Streaming.md
│   │   └── Deployment.md
│   ├── TanStack Start
│   │   ├── TanStack Start.md
│   │   ├── Router.md
│   │   ├── Query.md
│   │   ├── Server Functions.md
│   │   ├── SSR.md
│   │   └── Deployment.md
│   ├── RedwoodJS.md
│   ├── Waku.md
│   ├── Vike.md
│   └── Analog.md
├── 14 Microfrontends
│   ├── Microfrontends.md
│   ├── Architecture Patterns
│   │   ├── Runtime Integration.md
│   │   ├── Build-Time Integration.md
│   │   ├── Server-Side Composition.md
│   │   ├── Web Components Integration.md
│   │   └── Iframe Integration.md
│   ├── Module Federation
│   │   ├── Module Federation.md
│   │   ├── Webpack Module Federation.md
│   │   ├── Vite Module Federation.md
│   │   ├── Shared Dependencies.md
│   │   └── Runtime Plugins.md
│   ├── single-spa.md
│   ├── Piral.md
│   ├── Design System Strategy.md
│   ├── Shared State.md
│   ├── Shared Routing.md
│   ├── Deployment Strategy.md
│   └── Testing Strategy.md
├── 15 Build Tools and Tooling
│   ├── Build Tools and Tooling.md
│   ├── Vite
│   │   ├── Vite.md
│   │   ├── Configuration.md
│   │   ├── Plugins.md
│   │   ├── SSR.md
│   │   ├── Library Mode.md
│   │   └── Environment Variables.md
│   ├── Webpack
│   │   ├── Webpack.md
│   │   ├── Loaders.md
│   │   ├── Plugins.md
│   │   ├── Code Splitting.md
│   │   └── Module Federation.md
│   ├── Rspack.md
│   ├── Rolldown.md
│   ├── Rollup.md
│   ├── Parcel.md
│   ├── Babel.md
│   ├── SWC.md
│   ├── esbuild.md
│   ├── TypeScript
│   │   ├── TypeScript.md
│   │   ├── Framework Typing.md
│   │   ├── JSX Typing.md
│   │   ├── Component Props Typing.md
│   │   ├── Generic Components.md
│   │   └── tsconfig.md
│   ├── Linting and Formatting
│   │   ├── ESLint.md
│   │   ├── Prettier.md
│   │   ├── Stylelint.md
│   │   ├── Biome.md
│   │   └── Lefthook Husky.md
│   └── Package Managers
│       ├── npm.md
│       ├── pnpm.md
│       ├── Yarn.md
│       ├── Bun.md
│       └── Workspaces.md
├── 16 UI Systems
│   ├── UI Systems.md
│   ├── Design Systems
│   │   ├── Design Tokens.md
│   │   ├── Component API Design.md
│   │   ├── Theming.md
│   │   ├── Dark Mode.md
│   │   ├── Documentation.md
│   │   └── Versioning.md
│   ├── Headless UI
│   │   ├── Headless UI.md
│   │   ├── Radix.md
│   │   ├── React Aria.md
│   │   ├── Ark UI.md
│   │   └── Base UI.md
│   ├── Storybook
│   │   ├── Storybook.md
│   │   ├── CSF.md
│   │   ├── Args and Controls.md
│   │   ├── Interaction Testing.md
│   │   ├── Visual Testing.md
│   │   └── Chromatic.md
│   └── CSS Frameworks
│       ├── Tailwind CSS.md
│       ├── Bootstrap.md
│       ├── UnoCSS.md
│       ├── Bulma.md
│       └── Open Props.md
├── 17 Deployment and Infrastructure
│   ├── Deployment and Infrastructure.md
│   ├── Hosting Platforms
│   │   ├── Vercel.md
│   │   ├── Netlify.md
│   │   ├── Cloudflare Pages.md
│   │   ├── Cloudflare Workers.md
│   │   ├── AWS.md
│   │   ├── Firebase.md
│   │   ├── GitHub Pages.md
│   │   └── Render.md
│   ├── Containers
│   │   ├── Docker.md
│   │   ├── Docker Compose.md
│   │   ├── Nginx.md
│   │   └── Kubernetes.md
│   ├── CI CD
│   │   ├── CI CD.md
│   │   ├── GitHub Actions.md
│   │   ├── GitLab CI.md
│   │   ├── Preview Deployments.md
│   │   ├── Environment Strategy.md
│   │   └── Rollback Strategy.md
│   ├── Edge Computing.md
│   ├── CDN and Caching.md
│   └── Monitoring.md
└── 18 Handbook
    ├── Handbook.md
    ├── Architecture Decision Records.md
    ├── Project Templates.md
    ├── Boilerplates.md
    ├── Code Review Checklists.md
    ├── Performance Checklists.md
    ├── Accessibility Checklists.md
    ├── Security Checklists.md
    ├── SEO Checklists.md
    ├── Migration Checklists.md
    ├── Interview Questions
    │   ├── Interview Questions.md
    │   ├── React.md
    │   ├── Vue.md
    │   ├── Angular.md
    │   ├── Next.js.md
    │   ├── Nuxt.md
    │   ├── Svelte.md
    │   └── Architecture.md
    ├── Recipes
    │   ├── Recipes.md
    │   ├── Authentication.md
    │   ├── Infinite Scroll.md
    │   ├── Debounce and Throttle.md
    │   ├── Modal System.md
    │   ├── Toast System.md
    │   ├── Data Table.md
    │   ├── File Upload.md
    │   ├── WebSocket.md
    │   ├── Feature Flags.md
    │   └── Error Handling.md
    ├── Prompts.md
    ├── Useful Links.md
    └── Cheat Sheets.md
```