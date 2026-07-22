=== Project File Structure ===
├── 01 Core Concepts
│   ├── Core Concepts.md
│   ├── Vue Application & createApp.md
│   ├── Template Syntax & Data Binding.md
│   ├── Rendering Mechanism.md
│   ├── Virtual DOM, Compiler & Scheduler.md
│   ├── Reactivity vs Virtual DOM Lifecycle.md
│   │
│   ├── Essentials
│   │   ├── Essentials.md
│   │   ├── Conditional Rendering.md
│   │   ├── List Rendering & key.md
│   │   ├── Event Handling.md
│   │   ├── Form Input Bindings & v-model.md
│   │   ├── Class & Style Bindings.md
│   │   │
│   │   ├── API Styles
│   │   │   ├── API Styles.md
│   │   │   ├── Composition API (Modern).md
│   │   │   ├── Options API (Classic).md
│   │   │   └── setup() function.md
│   │   │
│   │   └── Directives
│   │       ├── Directives.md
│   │       ├── Built-in Directives.md
│   │       ├── Custom Directives.md
│   │       ├── Directive Priority.md
│   │       └── Arguments & Modifiers.md
│   │
│   ├── Components
│   │   ├── Components.md
│   │   ├── Props & One-Way Data Flow.md
│   │   ├── Component Events & Emits.md
│   │   ├── Component v-model.md
│   │   ├── Slots & Scoped Slots.md
│   │   ├── Provide & Inject.md
│   │   ├── Fallthrough Attributes & $attrs.md
│   │   ├── Dynamic Components.md
│   │   ├── KeepAlive.md
│   │   ├── Teleport.md
│   │   ├── defineComponent.md
│   │   └── defineAsyncComponent.md
│   │
│   ├── SFC (Single-File Components)
│   │   ├── SFC.md
│   │   ├── script setup.md
│   │   ├── Top-level await.md
│   │   ├── SFC Style Blocks.md
│   │   └── Macros
│   │       ├── Macros.md
│   │       ├── defineProps (Destructure & Defaults).md
│   │       ├── defineEmits.md
│   │       ├── defineExpose.md
│   │       ├── defineModel.md
│   │       ├── defineOptions.md
│   │       └── defineSlots.md
│   │
│   ├── Lifecycle Hooks
│   │   ├── Lifecycle Hooks.md
│   │   ├── Composition API Hooks.md
│   │   ├── Options API Hooks.md
│   │   └── Server-Side Lifecycle (SSR).md
│   │
│   ├── Render Function & JSX
│   │   ├── Render Function.md
│   │   ├── h() function.md
│   │   ├── Vue JSX (Babel).md
│   │   └── VNodes & Template Compilation.md
│   │
│   └── Legacy & Migration (Archive)
│       ├── Mixins & Filters.md
│       └── Vue 2 to Vue 3 Migration.md
│
├── 02 Composition API, Reactivity & Composables
│   ├── Composition API & Reactivity.md
│   ├── Reactivity in Depth.md
│   ├── nextTick().md
│   │
│   ├── Reactivity System
│   │   ├── Reactivity System.md
│   │   ├── ref & shallowRef.md
│   │   ├── reactive & shallowReactive.md
│   │   ├── computed.md
│   │   ├── readonly & shallowReadonly.md
│   │   ├── customRef & triggerRef.md
│   │   ├── toRef, toRefs, toValue & unref.md
│   │   ├── markRaw.md
│   │   ├── isRef & isReactive.md
│   │   └── Effect Scope & onScopeDispose.md
│   │
│   ├── Watchers
│   │   ├── watch.md
│   │   ├── watchEffect.md
│   │   ├── watchPostEffect & watchSyncEffect.md
│   │   ├── Deep & Immediate Watchers.md
│   │   ├── Cleanup & onWatcherCleanup.md
│   │   └── Debugging Reactivity.md
│   │
│   ├── Refs
│   │   ├── Template Refs.md
│   │   ├── useTemplateRef.md
│   │   └── Component Refs & defineExpose.md
│   │
│   └── Composables
│       ├── Composables.md
│       ├── Rules for Composables.md
│       ├── Stateful vs Stateless Composables.md
│       ├── Async Composables.md
│       └── Composable Design Patterns.md
│
├── 03 Async UI, Suspense, SSR & SSG
│   ├── Async UI & Hydration.md
│   ├── Suspense (Stable).md
│   ├── Client-Side Rendering (CSR).md
│   ├── Server-Side Rendering (SSR).md
│   ├── Streaming SSR.md
│   ├── Hydration Strategies & Lazy Hydration (Vue 3.5+).md
│   ├── Hydration Mismatches (Debugging).md
│   ├── Islands Architecture.md
│   └── Server Components (Vue RSC Experimental).md
│
├── 04 State Management
│   ├── State Management Patterns.md
│   ├── Local State vs Provide/Inject vs Global.md
│   ├── Shared State with Composables.md
│   │
│   ├── Pinia
│   │   ├── Pinia.md
│   │   ├── Option Stores vs Setup Stores.md
│   │   ├── State, Getters & Actions.md
│   │   ├── Store Plugins.md
│   │   ├── pinia-plugin-persistedstate.md
│   │   ├── SSR with Pinia.md
│   │   └── Testing Pinia Stores.md
│   │
│   └── External State Libraries
│       ├── XState & State Machines.md
│       ├── Nanostores.md
│       └── Vuex (Legacy Archive).md
│
├── 05 Routing
│   ├── Vue Router 4.md
│   ├── Router Setup & createRouter.md
│   ├── Route Records, Params & Query.md
│   ├── Nested & Dynamic Routes.md
│   ├── Programmatic Navigation.md
│   ├── Navigation Guards.md
│   ├── Route Meta Fields & Scroll Behavior.md
│   ├── Lazy Loading Routes.md
│   ├── Typed Routes (unplugin-vue-router).md
│   ├── Data Loaders (Vue Router 4.4+).md
│   └── Nuxt File-Based Routing.md
│
├── 06 Styling & UI
│   ├── CSS Features (Scoped, Modules, :deep, :slotted).md
│   ├── v-bind in CSS (Dynamic Styles).md
│   ├── Tailwind CSS & UnoCSS.md
│   ├── CSS-in-JS in Vue.md
│   ├── Transitions & TransitionGroup.md
│   ├── Animation Libraries (VueUse Motion, GSAP).md
│   │
│   └── Component Libraries
│       ├── Component Libraries.md
│       ├── shadcn-vue.md
│       ├── Nuxt UI (Tailwind-based).md
│       ├── Reka UI (formerly Radix Vue).md
│       ├── PrimeVue.md
│       ├── Vuetify.md
│       └── Element Plus & Naive UI.md
│
├── 07 Performance Optimization
│   ├── Performance Optimization.md
│   ├── Compiler Optimizations & Static Hoisting.md
│   ├── v-once & v-memo.md
│   ├── Vapor Mode (No Virtual DOM).md
│   ├── Props Stability & Component Updates.md
│   ├── Optimizing Large Reactive Objects.md
│   ├── Virtual Scrolling & Large Lists.md
│   ├── Code Splitting & Chunking.md
│   └── Vue DevTools Profiler & Web Vitals.md
│
├── 08 Testing
│   ├── Testing Strategy.md
│   ├── Vitest.md
│   ├── Vue Test Utils (VTU).md
│   ├── Vue Testing Library.md
│   ├── Component Testing.md
│   ├── Testing Composables.md
│   ├── Mocking API (MSW).md
│   ├── E2E Testing (Playwright, Cypress).md
│   └── Visual & A11y Testing (Storybook).md
│
├── 09 Architecture & Patterns
│   ├── Application Architecture.md
│   ├── Error Handling (onErrorCaptured & app.config).md
│   ├── Smart vs Presentational Components.md
│   ├── Renderless Components.md
│   ├── Compound Components.md
│   ├── Dependency Injection (Provide/Inject Pattern).md
│   ├── Plugin Architecture.md
│   ├── Feature-Sliced Design (FSD) in Vue.md
│   └── Micro-frontends with Vue.md
│
├── 10 Ecosystem, Tooling & Meta-frameworks
│   ├── Vite & Rolldown.md
│   ├── Vite Plugins (unplugin-auto-import, unplugin-vue-components).md
│   ├── Nuxt 3+.md
│   ├── Nuxt Server (Nitro) & Modules.md
│   ├── VueUse (The Standard Library).md
│   ├── Vue DevTools (Standalone & Vite Plugin).md
│   │
│   ├── TypeScript & IDE
│   │   ├── TypeScript with Vue.md
│   │   ├── Vue Language Tools (Volar).md
│   │   ├── vue-tsc (Type Checking).md
│   │   └── Generic Components.md
│   │
│   ├── Code Quality
│   │   ├── ESLint (eslint-plugin-vue) & Prettier.md
│   │   ├── Git Hooks (Husky, lint-staged).md
│   │   └── Monorepo (pnpm workspace, Turborepo).md
│   │
│   ├── Documentation
│   │   ├── VitePress.md
│   │   ├── Storybook for Vue.md
│   │   └── Histoire.md
│   │
│   └── Cross-Platform
│       ├── Capacitor & Ionic Vue (Mobile).md
│       └── Tauri & Electron (Desktop).md
│
├── 11 Data Fetching & Caching
│   ├── Data Fetching Fundamentals.md
│   ├── Fetch API, Axios & Ofetch.md
│   ├── TanStack Query (Vue Query).md
│   ├── Pinia Colada (Official Async State).md
│   ├── GraphQL (Apollo Client & urql).md
│   ├── Pagination & Infinite Queries.md
│   ├── Cache Invalidation & Optimistic Updates.md
│   └── Nuxt Fetching (useFetch, useAsyncData).md
│
├── 12 Advanced Topics
│   ├── Advanced Topics.md
│   ├── WebSockets, Socket.IO & SSE.md
│   ├── Web Workers & Comlink.md
│   ├── Service Workers & PWA (Vite PWA).md
│   ├── Accessibility (a11y) & vue-a11y.md
│   ├── Internationalization (vue-i18n).md
│   ├── Authentication & Authorization.md
│   ├── Forms & Validation (VeeValidate, FormKit, Zod).md
│   ├── Security: XSS, CSRF & CSP.md
│   ├── Web Components & defineCustomElement.md
│   └── Custom Renderers & createRenderer.md
│
├── 13 Handbook
│   ├── Handbook.md
│   ├── Prompt.md
│   ├── Debugging Recipes.md
│   │
│   ├── Components (Snippets)
│   │   ├── Carousel.md
│   │   ├── Picture similarity.md
│   │   └── TextArea CustomScroll.md
│   │
│   ├── Composables (Custom)
│   │   ├── Composables.md
│   │   ├── use-parallax.ts.md
│   │   ├── use-render.ts.md
│   │   └── use-sync-props.ts.md
│   │
│   ├── Interview Questions
│   │   ├── Interview.md
│   │   ├── reactivity-mechanisms.md
│   │   ├── custom-directive.md
│   │   ├── custom-v-model.md
│   │   ├── slots-vs-props.md
│   │   └── lifecycle-order.md
│   │
│   └── Utils
│       ├── Utils.md
│       └── lazy-load-component-if-visible.md
│
├── Vue.md
├── История версий.md
├── Полезные ссылки.md
└── Глоссарий.md
============================
