# Настройка пайплайнов (GitHub Actions, GitLab CI)

Пайплайны непрерывной интеграции и доставки (CI/CD) во фронтенде автоматизируют рутинные проверки: тестирование, линтинг, статический анализ типов, сборку и развертывание (деплой). Качественный пайплайн должен быть быстрым (до 5–7 минут), стабильным и защищать продакшен от багов.

---

## 1. Этапы (Stages) классического фронтенд-пайплайна

Качественный пайплайн разделяется на логические шаги:

```text
[Push / PR] ──► 1. Install ──► 2. Lint & Typecheck ──► 3. Test (Unit/E2E) ──► 4. Build ──► 5. Deploy
```

1.  **Install (Установка):** Загрузка зависимостей. На этом этапе критически важно кэшировать пакеты, чтобы не скачивать их заново при каждом коммите.
2.  **Lint & Typecheck (Статический анализ):** Запуск линтеров (`eslint`, `prettier`) и компилятора TypeScript в режиме проверки типов (`tsc --noEmit`). Если типы сломаны, нет смысла гонять тяжелые тесты.
3.  **Test (Тестирование):** Запуск модульных тестов (`jest`, `vitest`) и интеграционных/E2E сценариев (`playwright`, `cypress`).
4.  **Build (Сборка):** Компиляция минифицированного продакшен-бандла.
5.  **Deploy (Деплой):** Загрузка собранных файлов (статики) на CDN (AWS S3, Cloudflare Pages) или запуск сборки контейнера для SSR.

---

## 2. Реализация на GitHub Actions (GHA)

GitHub Actions использует декларативный YAML-синтаксис. Конфигурация описывается в файлах `.github/workflows/*.yml`.

### Пример: Производственный CI-пайплайн для pnpm и Vite/Next.js

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      # 1. Скачиваем репозиторий
      - name: Checkout Repository
        uses: actions/checkout@v4

      # 2. Устанавливаем Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      # 3. Устанавливаем pnpm с автоматическим кэшированием глобального кэша
      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 9
          run_install: false # Управляем установкой вручную для тонкой настройки

      - name: Get pnpm store directory
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

      # 4. Настраиваем кэширование pnpm store
      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ env.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      # 5. Устанавливаем зависимости
      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      # 6. Проверяем типы и линтим параллельно (если настроено в скриптах)
      - name: Lint and Typecheck
        run: |
          pnpm lint
          pnpm tsc --noEmit

      # 7. Запускаем тесты
      - name: Run Unit Tests
        run: pnpm test

      # 8. Сборка приложения
      - name: Build Application
        run: pnpm build
```

---

## 3. Реализация на GitLab CI/CD

В GitLab CI/CD конфигурация описывается в файле `.gitlab-ci.yml` в корне проекта. В отличие от GHA, GitLab CI строго делит задачи на стадии (stages), которые по умолчанию передают результаты работы (артефакты) следующим шагам.

### Пример: Пайплайн с разделением на Stages и кэшированием

```yaml
stages:
  - install
  - test
  - build

# Описываем глобальный кэш для node_modules
default:
  image: node:20-alpine
  cache:
    key:
      files:
        - package-lock.json
    paths:
      - .npm/

# Шаг установки зависимостей
install_dependencies:
  stage: install
  script:
    - npm ci --cache .npm --prefer-offline
  artifacts:
    paths:
      - node_modules/
    expire_in: 1 hour

# Шаг тестирования и проверки типов (запускаются параллельно)
lint_and_test:
  stage: test
  dependencies:
    - install_dependencies # Берем node_modules из предыдущего шага
  script:
    - npm run lint
    - npx tsc --noEmit
    - npm run test

# Шаг сборки
build_project:
  stage: build
  dependencies:
    - install_dependencies
  script:
    - npm run build
  artifacts:
    name: "dist-package"
    paths:
      - dist/ # Сохраняем собранный билд для последующего деплоя
    expire_in: 1 week
```

---

## 4. Оптимизация скорости пайплайнов (Lead-подход)

Долгие пайплайны снижают продуктивность команды (разработчики часами ждут мержа PR). Способы ускорить CI/CD:

### 4.1. Кэширование кэша сборщиков (Compiler Cache)
Помимо `node_modules`, кэшируйте папки сборщиков, которые хранят результаты предыдущих сборок (инкрементальный билд):
*   **Next.js:** `.next/cache`
*   **Gatsby:** `.cache` и `public`
*   **Turborepo/Nx:** `.turbo` или `.nx`

### 4.2. Использование монорепозиторных оптимизаций (Affected)
Если у вас монорепозиторий (Turborepo или Nx), запускайте проверки только для измененных пакетов:
```bash
# Запустит тесты только для тех пакетов, которые изменились по сравнению с веткой main
npx turbo test --filter=[...origin/main]
```

### 4.3. Параллелизация E2E тестов
E2E тесты (Playwright) занимают больше всего времени. Разделяйте их выполнение на несколько виртуальных машин (Matrix builds в GitHub Actions):

```yaml
# Пример матрицы в GHA
strategy:
  matrix:
    shard: [1/3, 2/3, 3/3]
steps:
  - name: Run Playwright tests
    run: npx playwright test --shard=${{ matrix.shard }}
```
Это позволит запустить тесты параллельно на трех серверах, сократив время прохождения шага почти в 3 раза.
