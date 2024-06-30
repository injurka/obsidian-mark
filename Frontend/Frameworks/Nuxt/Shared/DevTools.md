Первый вариант регистрации пользовательской вкладки - использовать набор утилит, предоставляемый *Nuxt* DevTools:

```ts
import { addCustomTab } from '@nuxt/devtools-kit'

addCustomTab({
  // unique identifier
  name: 'my-module',
  // title to display in the tab
  title: 'My Module',
  // any icon from Iconify, or a URL to an image
  icon: 'carbon:apps',
  // iframe view
  view: {
    type: 'iframe',
    src: '/url-to-your-module-view',
  },
})
```

В качестве альтернативы можно использовать крючки *Nuxt*:

```ts
nuxt.hook('devtools:customTabs', (tabs) => {
  tabs.push({
    // unique identifier
    name: 'my-module',
    // title to display in the tab
    title: 'My Module',
    // any icon from Iconify, or a URL to an image
    icon: 'carbon:apps',
    // iframe view
    view: {
      type: 'iframe',
      src: '/url-to-your-module-view',
    },
  })
})
```

> nuxt.config.ts

```ts
export default defineNuxtConfig({
  dev: {
    enabled: true,
  },
  modules: [
    '@nuxt/devtools',
    (inlineOptions, nuxt) => {
      nuxt.hook('devtools:customTabs', (tabs) => {
        tabs.push({
          name: 'doom',
          title: 'Doom',
          icon: 'carbon:apps',
          view: {
            type: 'iframe',
            src: 'https://silentspacemarine.com/',
          },
        })
      })
    },
  ],
})
```

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/add-custom-iframe-tab-to-nuxt-dev-tools)
