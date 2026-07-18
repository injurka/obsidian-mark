# Навигация по исходному коду (Source Code Navigation)

Памятка по тому, где искать реализацию ключевых механизмов в репозитории `vuejs/core`.

## Где искать:

- **Реактивность**: `packages/reactivity/src`
  - `reactive.ts`, `ref.ts` — создание реактивных объектов.
  - `effect.ts` — логика `track` и `trigger`, а также класс `ReactiveEffect`.
  
- **Виртуальный DOM и Рендеринг**: `packages/runtime-core/src`
  - `renderer.ts` — самая большая часть кода. Здесь находится функция `render`, функция `patch` и алгоритм сравнения (Diff algorithm).
  - `vnode.ts` — создание и структура VNode (`createVNode`).
  
- **Компоненты**: `packages/runtime-core/src`
  - `component.ts` — создание инстанса компонента, вызов `setup()`.
  - `apiLifecycle.ts` — хуки жизненного цикла (`onMounted` и др.).

- **Компилятор**: `packages/compiler-core/src`
  - `parse.ts` — парсинг строки шаблона в AST.
  - `transform.ts` — оптимизация и преобразование AST.
  - `codegen.ts` — генерация JavaScript кода render-функции из AST.
