```ts
  hooks: {
    // Remove `dev` pages
    'pages:extend': function (pages) {
      function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
        const pagesToRemove = []
        for (const page of pages) {
          if (pattern.test(page.path)) {
            pagesToRemove.push(page)
          }
          else {
            removePagesMatching(pattern, page.children)
          }
        }
        for (const page of pagesToRemove) {
          pages.splice(pages.indexOf(page), 1)
        }
      }
      if (import.meta.env.NODE_ENV === 'production')
        removePagesMatching(/^\/dev\/.*/, pages)
    },
  },
```