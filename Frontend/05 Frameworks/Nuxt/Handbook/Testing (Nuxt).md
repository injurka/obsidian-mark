# Тестирование в Nuxt

Тестирование в экосистеме Nuxt опирается на официальный модуль `@nuxt/test-utils` и тест-раннер `Vitest`.

## Установка

```bash
npm install -D vitest @vue/test-utils @nuxt/test-utils
```

## @nuxt/test-utils

Этот модуль позволяет монтировать Nuxt-окружение внутри тестов. Он поддерживает тестирование компонентов, composables и серверных API.

Пример настройки `vitest.config.ts`:
```ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  // Настройки Vitest
  test: {
    environment: 'nuxt',
  }
})
```

## Тестирование компонентов

Для монтирования компонентов используется функция `mountSuspended` (которая корректно обрабатывает асинхронные зависимости Nuxt).

Пример `components/MyButton.spec.ts`:
```ts
import { it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MyButton from './MyButton.vue'

it('рендерит кнопку', async () => {
  const wrapper = await mountSuspended(MyButton, {
    slots: {
      default: () => 'Кликни'
    }
  })
  expect(wrapper.text()).toContain('Кликни')
})
```

## E2E Тестирование (End-to-End)

Для интеграционных тестов Nuxt может запустить реальный сервер.

Пример серверного теста:
```ts
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('Мой API', async () => {
  await setup({
    server: true
  })

  it('отвечает на GET запрос', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Главная страница')
  })
})
```
