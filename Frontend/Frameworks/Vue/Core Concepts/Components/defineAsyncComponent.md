# defineAsyncComponent

`defineAsyncComponent` позволяет лениво (асинхронно) загружать компоненты во Vue. Компонент будет загружен только тогда, когда он реально потребуется для рендеринга. Это мощный инструмент для **Code Splitting** (разделения кода) и уменьшения начального размера бандла.

## Базовое использование

```javascript
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

## Продвинутое использование (с опциями)

```javascript
const AsyncComp = defineAsyncComponent({
  // Фабрика загрузки
  loader: () => import('./components/MyComponent.vue'),

  // Компонент, отображаемый во время загрузки
  loadingComponent: LoadingComponent,
  // Задержка перед показом loading-компонента (по умолчанию 200мс)
  delay: 200,

  // Компонент, отображаемый при ошибке
  errorComponent: ErrorComponent,
  // Таймаут загрузки, после которого покажется ошибка (по умолчанию Infinity)
  timeout: 3000,
  
  // Функция для повторной попытки при ошибке загрузки
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry() // Повторная попытка
    } else {
      fail() // Прекращение попыток
    }
  }
})
```

## Главные преимущества
- Ускорение First Contentful Paint (FCP).
- Интеграция с `Suspense` для обработки асинхронных зависимостей дерева компонентов.