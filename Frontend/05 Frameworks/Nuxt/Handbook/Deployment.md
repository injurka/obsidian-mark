# Развертывание (Deployment)

Благодаря движку Nitro, Nuxt приложения могут быть развернуты в различных средах с использованием оптимальных пресетов.

## Режимы сборки

Nuxt поддерживает несколько подходов к рендерингу:
- **SSR (Server-Side Rendering)**: Динамический рендеринг страниц по запросу (по умолчанию).
- **SSG (Static Site Generation)**: Пререндер всех страниц во время сборки (`npx nuxt generate`).
- **SPA (Single Page Application)**: Отключение SSR для всего приложения (настройка `ssr: false`).
- **Hybrid Rendering**: Настройка различных стратегий рендеринга (SSR, SSG, SWR, SPA) для конкретных маршрутов через `routeRules`.

## Команды

Для Node.js хостингов (например, VPS или Docker):
```bash
# Сборка проекта
npm run build
# Запуск собранного сервера (находится в .output/server/index.mjs)
node .output/server/index.mjs
```

Для статического хостинга (GitHub Pages, Netlify Static):
```bash
# Генерация статики
npm run generate
# Загрузка папки .output/public/ на хостинг
```

## Пресеты Nitro

Nitro автоматически определяет среду развертывания (Vercel, Netlify, Cloudflare), но пресет можно задать и вручную.

Пример принудительного выбора пресета Vercel в `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel'
  }
})
```
Либо через переменную окружения:
```bash
NITRO_PRESET=vercel npm run build
```

## Развертывание в Docker

Минимальный Dockerfile для Node-окружения:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
ENV HOST=0.0.0.0 PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```
