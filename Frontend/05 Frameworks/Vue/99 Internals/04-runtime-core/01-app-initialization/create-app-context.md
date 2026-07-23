# App Context

## Концепция и Архитектура (Mental Model)

Во Vue 2 глобальная конфигурация (плагины, миксины, директивы) привязывалась к глобальному объекту `Vue.prototype` или `Vue.config`. Это создавало проблему в тестах и микрофронтендах: модификация глобального объекта влияла на все инстансы приложения на странице (Global Mutation Pollution). 

В Vue 3 концепция изменилась: появилось понятие **Application Context (Контекст Приложения)**. Каждый вызов `createApp()` создает изолированный инстанс приложения со своим собственным `AppContext`. Этот контекст шарится между всеми компонентами внутри этого конкретного дерева, обеспечивая инкапсуляцию. Контекст хранит зарегистрированные компоненты, директивы, provides, и опции конфигурации (например, глобальные обработчики ошибок).

## Визуализация (Mermaid)

```mermaid
stateDiagram-v2
    state "createApp()" as create
    state "AppContext" as ctx {
        config: app.config
        mixins: app.mixin()
        components: app.component()
        directives: app.directive()
        provides: app.provide()
    }
    state "ComponentInstance (Root)" as root
    state "ComponentInstance (Child)" as child

    create --> ctx: Создает изолированный инстанс
    create --> root: mount()
    root --> child: patch()
    
    ctx --> root: appContext (ссылка)
    ctx --> child: appContext (ссылка копируется при создании)
```

## Ссылки на исходный код (Source Code References)
- **Создание контекста:** `packages/runtime-core/src/apiCreateApp.ts`
- **Типизация:** `packages/runtime-core/src/apiCreateApp.ts` (interface `AppContext`)

## Разбор реализации (Code Deep Dive)

Внутри ядра функция `createAppContext()` создает простую структуру данных — обычный объект, который будет прикреплен к корневому VNode перед монтированием.

```typescript
// packages/runtime-core/src/apiCreateApp.ts

export interface AppContext {
  app: App // Обратная ссылка на публичный API (app)
  config: AppConfig
  mixins: ComponentOptions[]
  components: Record<string, Component>
  directives: Record<string, Directive>
  provides: Record<string | symbol, any>
  // ...
}

export function createAppContext(): AppContext {
  return {
    app: null as any,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: undefined,
      warnHandler: undefined,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null), // Прототип null для безопасности (нет свойства toString и т.д.)
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
```

Когда мы вызываем `mount()`, этот контекст внедряется в корневой VNode:
```typescript
const vnode = createVNode(rootComponent, rootProps)
// Привязываем контекст к корневому узлу
vnode.appContext = context
// Запускаем рендеринг
render(vnode, rootContainer, isSVG)
```
Затем, при создании каждого дочернего компонента (`createComponentInstance`), ссылка на `appContext` копируется из родительского компонента в дочерний.

## Оптимизации и Edge Cases (Подводные камни)

- **Кэширование (Caches):** В `AppContext` хранятся `WeakMap` для `optionsCache`, `propsCache` и `emitsCache`. Это позволяет ядру парсить опции компонента, пропсы и события только один раз при первом рендеринге компонента данного типа, а затем переиспользовать нормализованные данные для всех инстансов этого компонента в рамках приложения, экономя CPU. `WeakMap` используется для предотвращения утечек памяти (Memory Leaks), когда компонент удаляется.
- **Безопасность Provides:** `Object.create(null)` для `provides` используется повсеместно во внутренностях Vue. Это защищает от Prototype Pollution и коллизий ключей с методами прототипа Object (например, если кто-то сделает `app.provide('hasOwnProperty', true)`).
- **Изоляция:** Если вы монтируете несколько инстансов Vue на одной странице (например, независимые виджеты), их контексты полностью изолированы. Но если нужно пошарить данные между ними, придется выносить реактивное состояние (через `reactive`) в отдельный модуль.
