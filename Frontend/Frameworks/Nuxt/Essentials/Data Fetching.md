С помощью режимов рендеринга Nuxt 3 вы можете выполнять вызовы API и рендерить страницы как на клиенте, так и на сервере, что сопряжено с определенными трудностями. Например, мы хотим избежать дублирования сетевых вызовов, обеспечить эффективное кэширование и гарантировать, что вызовы будут работать в разных средах. Для решения этих задач Nuxt предоставляет встроенную библиотеку выборки данных (`$fetch`) и две композитные (`useFetch` и `useAsyncData`).

## Data Fetching Library

Nuxt имеет встроенную библиотеку для получения данных: [ofetch](https://github.com/unjs/ofetch)

`ofetch` построена на основе [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) и предоставляет некоторые удобные возможности, такие как:

- Работает на ноде, в браузере и на рабочих станциях.
- Умный разбор JSON и нативных значений в ответе.
- Автоматически выбрасывает ошибки, если `response.ok` - `false`, с дружелюбным сообщением об ошибке и компактным стеком (скрывая внутренности).
- Автоматическое повторение запроса при возникновении ошибки.
- Вы можете предоставить асинхронные перехватчики для отслеживания событий жизненного цикла вызовов `ofetch`.

Вы можете использовать `ofetch` во всем приложении с помощью псевдонима `$fetch`:

```ts
const todos = await $fetch('/api/todos').catch((error) => error.data)
```

## useFetch

`useFetch` - это самый простой способ обработки данных в функции настройки компонента.

```ts
<script setup>
const { data, error, pending, refresh } = await useFetch('/api/todos')
</script>

<template>
  <span v-if="pending">Loading...</span>
  <span v-else-if="data">Todos: {{ data }}</span>
  <span v-else-if="error">Error: {{ error }}</span>
  <button @click="refresh">Refresh</button>
</template>
```

`useFetch` возвращает три реактивные переменные и функцию:

- `data`: реактивная переменная, содержащая результат работы переданной асинхронной функции.
- `error`: реактивный объект ошибки, содержащий информацию об ошибке запроса.
- `pending`: реактивная булева величина, указывающая, находится ли запрос в процессе выполнения.
- `refresh/execute`: функция для обновления данных, возвращенных функцией `handler`. По умолчанию Nuxt ждет, пока функция `refresh` не завершится, прежде чем ее можно будет выполнить снова.

Функция `useFetch` отвечает за пересылку данных клиенту, если вызов API был выполнен на сервере. Таким образом, клиенту не нужно повторно получать те же данные на стороне клиента, когда страница гидратируется. Вы можете просмотреть эту полезную нагрузку через `useNuxtApp.payload()`; [Nuxt DevTools](https://devtools.nuxtjs.org/) визуализирует эти данные на вкладке полезной нагрузки.

`useFetch` дополнительно сокращает количество вызовов API, используя ключ для кэширования ответов API. Ключ автоматически генерируется на основе URL и опций выборки. Композит `useFetch` автоматически импортируется и может использоваться в функциях `setup`, крючках жизненного цикла, а также в промежуточном ПО плагинов или маршрутов.

Вы можете использовать значение `ref` в строке URL, чтобы ваш компонент обновлялся при изменении реактивной переменной:

```ts
const todoId = ref('uuid')

const { data: tracks, pending, error } = useFetch(() => `/api/todos/${todoId.value}`)
```

### Опции

`useFetch` принимает набор опций в качестве последнего аргумента, которые могут быть использованы для управления поведением композита.

### Lazy

Композиты с выборкой данных будут автоматически ждать разрешения асинхронной функции перед переходом на новую страницу при использовании Vue's Suspense. Nuxt использует компонент Vue `<Suspense>` под капотом, чтобы предотвратить навигацию до того, как все асинхронные данные будут доступны представлению.

Однако, если вы хотите обойти это поведение при навигации на стороне клиента, вы можете использовать опцию `lazy`:

```ts
<script setup>
const { pending, data: todos } = useFetch('/api/todos', {
  lazy: true,
})
</script>

<template>
  <div v-if="pending">Loading ...</div>
  <div v-else>
    <div v-for="todo in todos">
      {{ todo.name }}
    </div>
  </div>
</template>
```

В таких случаях вам придется обрабатывать состояние загрузки вручную, используя значение `pending`.

В качестве альтернативы вы можете использовать `useLazyFetch`, который является удобным методом для достижения того же результата:

```ts
const { pending, data: todos } = useLazyFetch('/api/todos')
```

### Client-only

По умолчанию композиты для выборки данных выполняют свою асинхронную функцию как в клиентском, так и в серверном окружении. Чтобы ограничить выполнение только клиентской стороной, вы можете установить опцию `server` в значение `false`:

```ts
const { pending, data: posts } = useFetch('/api/comments', {
  lazy: true,
  server: false,
})
```

Это может быть особенно полезно в сочетании с опцией `lazy` для данных, которые не требуются при первоначальном рендеринге, например, для данных, не относящихся к SEO.

> [!WARNING]
> Если вы не получили данные на сервере, например, используя `server: false`, данные не будут получены до завершения процесса гидратации.
> 
> Это означает, что даже если вы ожидаете `useFetch` на стороне клиента, переменная `data` будет по-прежнему равна null внутри `<script setup>`.

### Минимизация размера полезной нагрузки

Опция `pick` помогает минимизировать размер полезной нагрузки, хранящейся в вашем HTML-документе, путем выбора полей, которые вы хотите вернуть из составных частей:

```ts
<script setup>
const { data: todos } = await useFetch('/api/todos', {
  pick: ['id', 'name'],
})
</script>

<template>
  <div v-for="todo in todos">
    <span>{{ todo.name }}</span>
    <span>{{ todo.id }}</span>
  </div>
</template>
```

Чтобы получить больше контроля или перебрать несколько объектов, вы можете использовать функцию `transform` для изменения результата запроса:

```ts
const { data: todos } = await useFetch('/api/todos', {
  transform: (todos) => {
    return todos.map((todo) => ({ name: todo.title, id: todo.description }))
  },
})
```

### Повторная выборка

Чтобы вручную получить или обновить данные, вы можете воспользоваться функцией `execute` или `refresh`, предлагаемой композитами:

```ts
<script setup>
const { data, error, execute, refresh } = await useFetch('/api/todos')
</script>

<template>
  <div>
    <p>{{ data }}</p>
    <button @click="refresh">Refresh data</button>
  </div>
</template>
```

Обе функции служат одной цели, но `execute` является псевдонимом для `refresh` и семантически более подходит, когда используется `immediate: false`. Когда опция `immediate` установлена в `false` (по умолчанию `true`), она предотвращает немедленное выполнение запроса.

Используйте опцию `watch` для повторного запуска функции выборки, когда другие реактивные значения в вашем приложении претерпевают изменения:

```ts
const count = ref(1)

const { data, error, refresh } = await useFetch('/api/todos', {
  watch: [count],
})
```

*Когда использовать функцию refresh, а не опцию watch?

Используйте `refresh()`, когда вы знаете, что данные на стороне сервера были изменены, и вам нужно соответствующим образом обновить данные на стороне клиента.

Когда пользователь изменяет параметры, которые должны быть отправлены на сервер, установите эти параметры в качестве источника watch. Например, если вы хотите фильтровать результаты API с помощью параметра поиска, установите этот параметр в качестве watch. Это гарантирует, что всякий раз, когда пользователь меняет свой запрос, из API будут перезагружаться свежие и точные данные.

### Параметры поиска в запросе

С помощью опции `query` вы можете включить в запрос параметры поиска:

```ts
const queryValue = ref('anyValue')

const { data, pending, error, refresh } = await useFetch('/api/todos', {
  query: { queryKey: queryValue, anotherQueryKey: 'anotherQueryValue' },
})
```

Эта опция является расширением [ofetch](https://github.com/unjs/ofetch) и использует [ufo](https://github.com/unjs/ufo) для генерации URL. Предоставленные объекты автоматически преобразуются в строковый формат.

### Перехватчики

Вы можете определить асинхронные перехватчики для отслеживания событий жизненного цикла вызова API:

```ts
const { data, pending, error, refresh } = await useFetch('/api/todo', {
  onRequest({ request, options }) {},
  onRequestError({ request, options, error }) {},
  onResponse({ request, response, options }) {},
  onResponseError({ request, response, options }) {},
})
```

Эти опции предоставляются встроенной библиотекой [ofetch](https://github.com/unjs/ofetch).

## useAsyncData

Функция `useFetch` предназначена для получения данных по заданному URL, в то время как `useAsyncData` позволяет реализовать более сложную логику. По сути, `useFetch(url)` практически эквивалентен `useAsyncData(url, () => $fetch(url))`, обеспечивая более оптимизированный опыт разработчика для наиболее распространенных случаев использования.

Однако бывают ситуации, когда использование композита `useFetch` может оказаться неприемлемым, например, когда CMS или сторонний сервис предлагают свой собственный слой запросов. В таких случаях вы можете использовать `useAsyncData` для инкапсуляции вызовов и при этом пользоваться преимуществами, предоставляемыми композитом:

```ts
const { data, error } = await useAsyncData('getTodos', () => fetchTodos())
```

В `useAsyncData` первый аргумент служит уникальным ключом для кэширования ответа, полученного от второго аргумента, который является функцией запроса. Однако при желании вы можете опустить этот аргумент и передать непосредственно саму функцию запроса. В этом случае уникальный ключ будет сгенерирован автоматически.

> [!INFO]
> И `useAsyncData`, и `useFetch` предоставляют один и тот же тип объекта в качестве возвращаемого значения и принимают общий набор опций в качестве последнего аргумента. Эти опции позволяют настраивать поведение компонент, включая такие возможности, как блокировка навигации, кэширование и контроль выполнения.

## Conclusion

- Функция `$fetch` - подходящий выбор, если вы собираетесь инициировать сетевой запрос на основе взаимодействия с пользователем. Рекомендуется использовать `$fetch` при отправке данных в обработчик событий, при выполнении исключительно клиентской логики или в сочетании с композитом `useAsyncData`.
- Композит `useFetch` - это самый простой подход к обработке получения данных в функции настройки компонента.
- Если вам требуется более точный контроль над процессом получения данных, вы можете выбрать `useAsyncData` в сочетании с `$fetch`.

## Источники
- #### [nuxt data fetching](https://nuxt.com/docs/getting-started/data-fetching)
- #### [vue tips](https://mokkapps.de/blog/a-comprehensive-guide-to-data-fetching-in-nuxt-3)