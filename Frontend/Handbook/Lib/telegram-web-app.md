## Install

Install type package `ni @types/telegram-web-app -D`

```json
"compilerOptions": {
	"types": [
		"telegram-web-app"
	]
}
```
## Presets
### Vue + Vite

> index.html

```html
<head>
	<script src="https://telegram.org/js/telegram-web-app.js"></script>
</head>
```

### Nuxt

> app.config.ts

```ts
export default defineAppConfig({
  script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
})
```

> app.vue

```ts
<script lang="ts" setup>
const app = useAppConfig()

useHead(app)
</script>
```

## Usage

```ts
window?.Telegram.WebApp
```