# Progressive Hydration

## Что это и какую боль решаем?
Прогрессивная гидратация — это стратегия, при которой процесс оживления (гидратации) страницы разбивается на части и выполняется постепенно с течением времени или по мере необходимости.
**Боль:** Даже при частичной гидратации, если интерактивных элементов много, браузер может "поперхнуться" выполнением всего JS в один момент, блокируя Main Thread и ухудшая метрику FID (First Input Delay) / INP (Interaction to Next Paint).

## Как это работает?
Вместо того чтобы гидрировать всё сразу на событии `DOMContentLoaded`, мы расставляем приоритеты:
1. Гидрируем видимую часть (Above the fold).
2. Гидрируем невидимые части при скролле (Intersection Observer).
3. Гидрируем элементы при наведении (hover) или клике.
4. Откладываем гидратацию тяжелых компонентов (Idle).

## Архитектура
```mermaid
gantt
    title Progressive Hydration Timeline
    dateFormat  YYYY-MM-DD
    axisFormat %S
    
    section Network
    Download HTML       :done,    2023-01-01, 1ds
    Download JS Bundle  :active,  1s, 3s
    
    section Main Thread
    Hydrate Hero Section (Priority 1) :crit, 3s, 4s
    Hydrate Footer (On Scroll)        :      6s, 7s
    Hydrate Modal (On Hover/Click)    :      9s, 10s
```

## Примеры кода

### React (Intersection Observer wrapper)

```tsx
import { useState, useEffect, useRef } from 'react';

function withProgressiveHydration(Component) {
  return function HydrationWrapper(props) {
    const [shouldHydrate, setShouldHydrate] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setShouldHydrate(true);
          observer.disconnect();
        }
      });
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    // До гидратации возвращаем статический HTML (от SSR), 
    // после - полноценный компонент
    return (
      <div ref={ref} suppressHydrationWarning>
        {shouldHydrate ? <Component {...props} /> : <div dangerouslySetInnerHTML={{ __html: '' }} />}
      </div>
    );
  };
}
```

### Vue 3 / Nuxt 3 (defineAsyncComponent + Hydration Strategies)

В Vue 3.5+ появилась встроенная поддержка стратегий прогрессивной гидратации через `defineAsyncComponent`:

```vue
<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, hydrateOnIdle, hydrateOnInteraction } from 'vue'

// 1. Гидратация при попадании элемента в видимую область (Intersection Observer)
const LazyFooter = defineAsyncComponent({
  loader: () => import('./Footer.vue'),
  hydrate: hydrateOnVisible()
})

// 2. Гидратация при появлении свободного времени в Main Thread (requestIdleCallback)
const LazyAnalyticsChart = defineAsyncComponent({
  loader: () => import('./AnalyticsChart.vue'),
  hydrate: hydrateOnIdle()
})

// 3. Гидратация только при клике или наведении мыши
const LazyComplexModal = defineAsyncComponent({
  loader: () => import('./ComplexModal.vue'),
  hydrate: hydrateOnInteraction(['click', 'mouseenter'])
})
</script>

<template>
  <div>
    <Header />
    <LazyAnalyticsChart />
    <LazyFooter />
  </div>
</template>
```

В **Nuxt 3** отложенные компоненты префиксуются словом `Lazy` (например, `<LazyFooter />`), что автоматически выносит их в отдельные ленивые чанки.

## Неочевидные нюансы и трейдоффы
- **Потерянные события (Lost Clicks):** Если пользователь кликнет на кнопку до того, как компонент успел гидрироваться (например, скрипт загружался по наведению, но пользователь кликнул очень быстро), событие пропадет. Решение: библиотеки-перехватчики (event replaying), которые запоминают клики и воспроизводят их после гидратации.
- **Сложность реализации:** Нативная поддержка во фреймворках (кроме базового Suspense) часто ограничена, приходится писать сложные обертки или использовать специфичные инструменты (Vue 3 поддерживает ленивую гидратацию из коробки).
- **Layout Shifts:** Если отложенный компонент рендерится на клиенте иначе, чем на сервере, произойдет сдвиг верстки.
