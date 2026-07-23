# Контейнеризация SSR (Next.js/Nuxt) и статики (Nginx)

При контейнеризации фронтенда критически важно разделять два подхода: раздачу чистой статики (SPA/Jamstack) и запуск полноценного Node.js-сервера для Server-Side Rendering (SSR). Ошибки в Dockerfile могут привести к раздутым образам (более 1 ГБ) и уязвимостям безопасности.

---

## 1. Контейнеризация статики (SPA: React/Vue/Vite + Nginx)

Для приложений без SSR (собираемых в обычный набор HTML/JS/CSS файлов) нам не нужен Node.js в продакшене. Достаточно собрать проект на этапе сборки и положить его в ультралегкий веб-сервер Nginx.

Для этого используется **Multi-stage build (многоэтапная сборка)**:

```dockerfile
# --- Stage 1: Build ---
FROM node:20-alpine AS builder
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Копируем исходный код и собираем проект
COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html

# Удаляем дефолтные файлы Nginx
RUN rm -rf ./*

# Копируем собранную статику из Stage 1
COPY --from=builder /app/dist .

# Копируем кастомный конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Конфигурация Nginx для SPA (`nginx.conf`)
Обычный веб-сервер выдаст ошибку 404, если пользователь обновит страницу на внутреннем роуте (например, `/profile`), так как физического файла `profile.html` на диске нет. Нам нужно настроить перенаправление всех запросов на `index.html`:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        # Перенаправляем все запросы на index.html для клиентского роутинга
        try_files $uri $uri/ /index.html;
    }

    # Кэшируем статические ассеты (JS, CSS, картинки) на год
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        root /usr/share/nginx/html;
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

---

## 2. Контейнеризация SSR (Next.js / Nuxt)

Приложения с SSR требуют запущенного Node.js-сервера в продакшене. Если просто скопировать проект и все `node_modules`, размер образа превысит 1 ГБ.

### Standalone-сборка в Next.js
Современный Next.js умеет анализировать зависимости (через трейсинг файлов) и собирать только те файлы, которые нужны для запуска сервера, отбрасывая все лишние dev-зависимости.

Для этого в файле `next.config.js` нужно включить опцию:
```javascript
module.exports = {
  output: 'standalone',
};
```
После сборки Next.js создаст папку `.next/standalone`, которая содержит минимизированный Node.js-сервер и копию необходимых пакетов из `node_modules`.

### Оптимальный Dockerfile для Next.js (Размер образа ~120 МБ)

```dockerfile
# --- Stage 1: Зависимости ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# --- Stage 2: Сборка ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Сборщик сгенерирует папку .next/standalone
RUN npm run build

# --- Stage 3: Runner (Продакшен) ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Безопасность: запускаем процесс от имени не-root пользователя
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только необходимые файлы для запуска standalone сервера
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Запускаем сервер напрямую через Node.js
CMD ["node", "server.js"]
```

---

## 3. Сравнительный анализ подходов

| Параметр | Раздача статики (SPA + Nginx) | Серверный рендеринг (Next.js/Nuxt) |
| :--- | :--- | :--- |
| **Базовый образ** | `nginx:alpine` | `node:alpine` |
| **Размер образа** | **Маленький (~30-50 МБ)** | Средний (~120-150 МБ) |
| **Потребление памяти** | Минимальное (Nginx держит тысячи соединений). | Высокое (каждый Node.js процесс ест от 100+ МБ ОЗУ). |
| **Рендеринг** | На клиенте (CPU пользователя). | На сервере (наш хостинг-процессор). |
| **Конфигурация среды** | Переменные окружения внедряются на этапе сборки (build-time). | Переменные окружения можно читать динамически в рантайме. |
