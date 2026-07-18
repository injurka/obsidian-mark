
# Vue Internals MOC

> [!info] 🧭 Навигация по внутренностям Vue (Map of Content)
> Этот документ является главной точкой входа (**Map of Content**) для изучения архитектуры, концепций и исходного кода фреймворка Vue.js. Здесь структурирована вся база знаний: от концептуальных основ до разбора конкретных подсистем, таких как компилятор, система реактивности и рендерер.

---

## 🗂️ Оглавление базы знаний

### 🧩 00. Мета и Введение (Meta & Intro)
*Общая информация, roadmap и архитектурный обзор.*
- [[00-learning-roadmap|🗺️ Learning Roadmap]] — План изучения исходного кода Vue.
- [[01-mental-model|🧠 Mental Model]] — Ментальная модель фреймворка.
- [[02-glossary|📖 Glossary]] — Словарь терминов.
- [[03-architecture-map|🗺️ Architecture Map]] — Карта архитектуры ядра.
- [[04-source-code-navigation|🧭 Source Code Navigation]] — Как ориентироваться в исходном коде.
- [[05-rfc-and-prs-index|📝 RFCs & PRs Index]] — Индекс важных обсуждений и Pull Requests.

### 🏗️ 01. Фундаментальные концепции (Foundations)
*Основные философские и архитектурные решения, лежащие в основе Vue.*
- [[00-framework-philosophy|🏛️ Framework Philosophy]]
- [[01-reactivity-first-design|⚡ Reactivity First Design]]
- [[02-compiler-informed-runtime|⚙️ Compiler-Informed Runtime]]
- [[03-platform-agnostic-design|🌐 Platform Agnostic Design]]
- [[04-tree-shaking-mechanisms|🌲 Tree-Shaking Mechanisms]]
- [[05-dev-vs-prod-builds|🛠️ Dev vs Prod Builds]]
- [[06-feature-flags-architecture|🚩 Feature Flags Architecture]]

### 📦 02. Монорепозиторий и Инструменты (Monorepo & Tooling)
*Внутреннее устройство проекта: пакеты, сборка, тесты.*
- [[00-pnpm-workspaces-graph|📦 pnpm Workspaces Graph]]
- [[01-package-boundaries|🧱 Package Boundaries]] — *Как пакеты импортируют друг друга*
- [[02-rollup-build-pipeline|🚀 Rollup Build Pipeline]]
- [[03-bundle-formats-esm-cjs-iife|🗃️ Bundle Formats (ESM, CJS, IIFE)]]
- [[04-typescript-internal-setup|📘 TypeScript Internal Setup]]
- [[05-vitest-testing-setup|🧪 Vitest Testing Setup]]
- [[06-ecosystem-ci|🤖 Ecosystem CI]] — *Проверки совместимости с Nuxt/Vuetify*
- [[07-size-regression-checks|⚖️ Size Regression Checks]]

### ⚡ 03. Система Реактивности (Reactivity System)
*Сердце Vue. Раздел содержит обновления архитектуры для **Vue 3.4+**.*
- [[00-reactivity-architecture|🏗️ Reactivity Architecture]]
- [[01-proxies-and-reflect|🪞 Proxies & Reflect]]
- [[02-dependency-tracking-v3.4+|🔍 Dependency Tracking (v3.4+)]]
- [[03-linked-list-subscribers|🔗 Linked List Subscribers]] — *Связь Dep и Effect*
- [[04-version-counting|🔢 Version Counting]] — *Оптимизация триггеров*
- [[05-dirty-levels|📉 Dirty Levels]] — *Статусы обновления (Dirty, MaybeDirty)*
- **Reactive Proxy Handlers:**
  - [[base-handlers|Base Handlers]] | [[collection-handlers|Collection Handlers]] | [[array-instrumentations|Array Instrumentations]]
- **Ref System:**
  - [[ref-vs-reactive-internals|Ref vs Reactive Internals]] | [[custom-ref|Custom Ref]]
- **Computed Internals:**
  - [[lazy-evaluation-caching|Lazy Evaluation & Caching]] | [[computed-in-vue-3.4|Computed in Vue 3.4+]]
- **Watchers:**
  - [[watch-api-scheduler|Watch API Scheduler]] | [[deep-traversal-perf|Deep Traversal Perf]] | [[on-cleanup|onCleanup API]]
- [[10-effect-scopes|🔭 Effect Scopes]]
- [[11-reactivity-transform-legacy|⏳ Reactivity Transform (Legacy)]]
- [[12-memory-leaks-prevention|🛡️ Memory Leaks Prevention]]

### ⚙️ 04. Runtime Core
*Платформонезависимая логика рендеринга и работы компонентов.*
- [[00-runtime-architecture|🏗️ Runtime Architecture]]
- **App Initialization:**
  - [[create-app-context|Create App Context]] | [[plugin-system-internals|Plugin System Internals]]
- **VNode System:**
  - [[vnode-shape-and-types|VNode Shape & Types]] | [[shape-flags-bitwise-ops|Shape Flags (Bitwise Ops)]]
  - [[block-tree-and-dynamic-children|Block Tree & Dynamic Children]] | [[normalize-vnode|Normalize VNode]]
- **Renderer Pipeline:**
  - [[create-renderer-factory|Create Renderer Factory]] | [[mount-vs-patch|Mount vs Patch]]
  - [[diffing-algorithms|Diffing Algorithms]] | [[keyed-children-lis-algorithm|Keyed Children (LIS Algorithm)]]
  - [[unmount-and-teardown|Unmount & Teardown]] | [[render-effect-setup|Render Effect Setup]]
- **Component Instance:**
  - [[instance-creation-lifecycle|Instance Creation Lifecycle]] | [[setup-stateful-component|Setup Stateful Component]]
  - [[public-instance-proxy|Public Instance Proxy]] | [[props-initialization-and-updates|Props Initialization & Updates]]
  - [[emits-and-event-handling|Emits & Event Handling]] | [[slots-normalization|Slots Normalization]]
- [[05-provide-inject-chain|💉 Provide / Inject Chain]]
- **Scheduler & NextTick:**
  - [[job-queue-microtasks|Job Queue & Microtasks]] | [[pre-flush-vs-post-flush|Pre vs Post Flush]] | [[recursive-updates-guard|Recursive Updates Guard]]
- **Built-in Components:**
  - [[keep-alive-lru-cache|KeepAlive (LRU Cache)]] | [[teleport-target-resolution|Teleport Target Resolution]]
  - [[suspense-state-machine|Suspense State Machine]] | [[transition-state-hooks|Transition State Hooks]]
- [[08-async-components-loader|⏳ Async Components Loader]]
- [[09-error-handling-boundaries|🚨 Error Handling Boundaries]]
- [[10-custom-renderer-api|🎨 Custom Renderer API]]

### 🌐 05. Runtime DOM
*Специфичная для браузера логика рендеринга и работы с DOM.*
- [[00-dom-renderer-architecture|🏗️ DOM Renderer Architecture]]
- [[01-node-ops-implementation|🛠️ Node Ops Implementation]]
- **Patch Prop Internals:**
  - [[class-and-style|Class & Style]] | [[dom-properties-vs-attributes|DOM Properties vs Attributes]] | [[boolean-attributes-casting|Boolean Attributes Casting]]
- [[03-event-delegation-and-invokers|🎯 Event Delegation & Invokers]] — *Внутренняя кэширующая система (vei)*
- [[04-dom-directives-v-show-v-model|🔌 DOM Directives (v-show, v-model)]]
- [[05-web-components-custom-elements|🧩 Web Components (defineCustomElement)]]
- [[06-transition-css-animations|🎬 Transition & CSS Animations]]

### 🛠️ 06. Compiler Core
*Универсальный парсер и трансформатор шаблонов.*
- [[00-compiler-pipeline|⚙️ Compiler Pipeline]]
- **Parser (HTML to AST):**
  - [[tokenizer-state-machine|Tokenizer State Machine]] | [[handling-html-entities|Handling HTML Entities]] | [[error-recovery|Error Recovery]]
- [[02-ast-node-types-reference|🌳 AST Node Types Reference]]
- **Transform Phase:**
  - [[transform-context-and-traversal|Transform Context & Traversal]] | [[static-hoisting-analysis|Static Hoisting Analysis]]
  - [[structural-directives-v-if-v-for|Structural Directives (v-if/v-for)]] | [[expression-transformation|Expression Transformation]]
  - [[cache-handlers-v-memo|Cache Handlers (v-memo)]]
- **Codegen Phase:**
  - [[source-map-generation|Source Map Generation]] | [[module-vs-function-mode|Module vs Function Mode]] | [[preamble-and-helpers|Preamble & Helpers]]
- **Compiler Optimizations:**
  - [[patch-flags-generation|Patch Flags Generation]] | [[block-tracking-logic|Block Tracking Logic]]

### 📝 07. Compiler SFC (Single File Components)
*Внутренности компилятора `.vue` файлов.*
- [[00-sfc-architecture|🏗️ SFC Architecture]]
- [[01-parsing-sfc-blocks|🧱 Parsing SFC Blocks]]
- **Script Setup Compiler:**
  - [[babel-ast-integration|Babel AST Integration]] | [[define-props-emits-macros|Macros: defineProps & emits]]
  - [[define-model-macro-internals|Macro: defineModel (v3.4+)]] | [[generic-components-types|Generic Components Types]]
  - [[reactive-destructure-macro|Reactive Destructure Macro (v3.5+)]]
- **Style Compiler:**
  - [[scoped-css-rewrite|Scoped CSS Rewrite]] | [[css-modules|CSS Modules]] | [[v-bind-in-css-vars|v-bind in CSS Vars]]
- [[04-sfc-dev-tooling-hmr|🔥 SFC Dev Tooling & HMR (Hot Module Replacement)]]

### 🖥️ 08. SSR & Hydration
*Серверный рендеринг и процесс "оживления" интерфейса.*
- [[00-ssr-architecture|🏗️ SSR Architecture]]
- [[01-compiler-ssr-transforms|🔄 Compiler SSR Transforms]] — *Отличия от DOM-компилятора*
- [[02-render-to-string-stream|🌊 Render to String / Stream]]
- [[03-ssr-context-and-teleports|🌐 SSR Context & Teleports]]
- **Hydration Process:**
  - [[hydrate-node-element|Hydrate Node Element]] | [[mismatch-recovery-strategy|Mismatch Recovery Strategy]]
  - [[suspense-hydration|Suspense Hydration]] | [[lazy-hydration-vue-3.5+|Lazy Hydration (v3.5+)]]
- [[05-use-id-ssr-stable-ids|🆔 useId & SSR Stable IDs (v3.5+)]]

### 💨 09. Vapor Mode
*Инновационный подход к рендерингу без Virtual DOM (будущее Vue).*
- [[00-vapor-architecture|🏗️ Vapor Architecture]]
- **Compiler Vapor:**
  - [[ir-intermediate-representation|IR (Intermediate Representation)]] | [[compile-template-to-dom-ops|Compile Template to DOM Ops]] | [[static-html-hoisting|Static HTML Hoisting]]
- **Runtime Vapor:**
  - [[reactivity-bindings-no-vdom|Reactivity Bindings (No VDOM)]] | [[dom-operations-direct|Direct DOM Operations]]
  - [[effect-vs-rendereffect|Effect vs RenderEffect]] | [[event-delegation-vapor|Event Delegation Vapor]]
- [[03-vapor-components-and-props|🧩 Vapor Components & Props]]
- [[04-vapor-ssr|🖥️ Vapor SSR]]
- [[05-interop-vdom-and-vapor|🤝 Interop: VDOM & Vapor]]

### 📘 10. TypeScript and Types
*Интеграция TypeScript и сложное выведение типов под капотом.*
- [[00-type-system-architecture|🏗️ Type System Architecture]]
- **Complex Inferences:**
  - [[define-component-inference|defineComponent Inference]] | [[props-type-extraction|Props Type Extraction]] | [[generic-slots-inference|Generic Slots Inference]]
- [[02-tsx-jsx-typings|🧩 TSX / JSX Typings]]
- [[03-volar-language-tools-integration|🛠️ Volar & Language Tools Integration]]
- [[04-internal-utility-types|🔧 Internal Utility Types]]

### 🚀 11. Performance and Security
*Производительность, управление памятью и механизмы защиты.*
- [[00-performance-cost-model|📊 Performance Cost Model]]
- [[01-memory-management-profiling|🧠 Memory Management & Profiling]]
- [[02-vdom-diffing-benchmarks|⏱️ VDOM Diffing Benchmarks]]
- [[03-security-xss-v-html|🛡️ Security: XSS & v-html]]
- [[04-prototype-pollution-guards|🔒 Prototype Pollution Guards]]

### 🔌 12. Ecosystem Integration Points
*Как ядро взаимодействует с внешними инструментами.*
- [[00-vue-router-integration|🛣️ Vue Router Integration]] — *Механизм работы `<router-view>`*
- [[01-pinia-integration|🍍 Pinia Integration]] — *Использование `effectScope`*
- [[02-vue-devtools-hooks|🛠️ Vue Devtools Hooks]]
- [[03-bundler-plugins-unplugin|📦 Bundler Plugins & Unplugin]]

### ⏪ 13. Vue 2 Legacy & Compat
*Обратная совместимость и архитектура предыдущей версии.*
- [[00-vue2-architecture-recap|🏛️ Vue 2 Architecture Recap]]
- [[01-object-defineproperty-vs-proxy|🔄 Object.defineProperty vs Proxy]]
- [[02-migration-build-internals|🏗️ Migration Build Internals]]
- [[03-why-features-were-dropped|🗑️ Why Features Were Dropped]]

### 🔬 14. Source Code Tracing Guides
*Пошаговые руководства и трейсы по дебаггингу исходников.*
- [[00-how-to-debug-vue-core|🐛 How to Debug Vue Core]]
- [[01-trace-create-app-to-mount|🐾 Trace: `createApp` to `mount`]]
- [[02-trace-reactivity-trigger|🐾 Trace: Reactivity Trigger]]
- [[03-trace-sfc-compile-to-js|🐾 Trace: SFC Compile to JS]]
- [[04-trace-hydration-mismatch|🐾 Trace: Hydration Mismatch]]
- [[05-build-your-own-mini-vue|🛠️ Build Your Own Mini Vue]]

### 👨‍💻 15. Personal Research & Contributions
*Персональные заметки, сравнения и черновики.*
- [[00-ideas-and-hypotheses|💡 Ideas & Hypotheses]]
- [[01-reproducing-core-bugs|🐛 Reproducing Core Bugs]]
- [[02-pr-drafts|📝 PR Drafts]]
- **Comparisons:**
  - [[vs-react-fiber|⚛️ vs React Fiber]] | [[vs-solid-signals|🧊 vs Solid Signals]] | [[vs-svelte-runes|🔥 vs Svelte Runes]]
- [[04-my-benchmarks|📊 My Benchmarks]]

---

> [!tip] 💡 Совет по навигации
> Данный файл — живой документ (MOC). Используйте сочетание клавиш `Ctrl + Click` (или `Cmd + Click`) для быстрого перехода к нужной статье в Obsidian. Если вы добавляете новые файлы в папки, не забывайте линковать их здесь для поддержания связности графа знаний.
