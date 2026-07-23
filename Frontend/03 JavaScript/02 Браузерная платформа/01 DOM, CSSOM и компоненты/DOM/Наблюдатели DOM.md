## Описание

**Наблюдатели (Observers)** — это встроенные браузерные API, позволяющие асинхронно отслеживать изменения в DOM, размерах элементов, пересечениях с областью видимости и метриках производительности, не прибегая к «грязным» опросам через `setInterval`.

---

## MutationObserver

Отслеживает изменения в DOM-дереве: добавление/удаление узлов, изменение атрибутов или текстового содержимого.

### Синтаксис

```javascript
const observer = new MutationObserver(callback);
observer.observe(targetNode, options);
```

### Параметры `observe`

| Опция                   | Тип       | Описание                                               |
| ----------------------- | --------- | ------------------------------------------------------ |
| `childList`             | `boolean` | Следить за добавлением/удалением дочерних узлов        |
| `attributes`            | `boolean` | Следить за изменением атрибутов                        |
| `characterData`         | `boolean` | Следить за изменением текстового содержимого           |
| `subtree`               | `boolean` | Применять наблюдение ко всему поддереву                |
| `attributeOldValue`     | `boolean` | Сохранять старое значение атрибута в записи мутации    |
| `characterDataOldValue` | `boolean` | Сохранять старое текстовое значение в записи мутации   |
| `attributeFilter`       | `Array`   | Список конкретных атрибутов для наблюдения             |

### Объект `MutationRecord`

Каждая запись в массиве callback содержит:

| Свойство           | Описание                                        |
| ------------------ | ----------------------------------------------- |
| `type`             | `"childList"`, `"attributes"`, `"characterData"` |
| `target`           | Узел, в котором произошла мутация               |
| `addedNodes`       | `NodeList` добавленных узлов                    |
| `removedNodes`     | `NodeList` удалённых узлов                      |
| `attributeName`    | Имя изменённого атрибута                        |
| `oldValue`         | Старое значение (если включена соответствующая опция) |
| `previousSibling`  | Предыдущий сосед добавленного/удалённого узла   |
| `nextSibling`      | Следующий сосед добавленного/удалённого узла    |

### Методы

| Метод                   | Описание                                                   |
| ----------------------- | ---------------------------------------------------------- |
| `observe(node, config)` | Начать наблюдение за `node`                                |
| `disconnect()`          | Остановить наблюдение и очистить очередь                  |
| `takeRecords()`         | Получить накопленные записи мутаций и очистить очередь     |

### Пример: отслеживание добавления узлов

```javascript
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        console.log('Добавлен узел:', node);
      });
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Остановить наблюдение
observer.disconnect();
```

### Пример: отслеживание изменения атрибута

```javascript
const btn = document.querySelector('#myBtn');

const observer = new MutationObserver((mutations) => {
  for (const { attributeName, oldValue, target } of mutations) {
    console.log(`Атрибут "${attributeName}" изменён:`, oldValue, '→', target.getAttribute(attributeName));
  }
});

observer.observe(btn, {
  attributes: true,
  attributeOldValue: true,
  attributeFilter: ['class', 'disabled'],
});
```

### Типичные применения

- Реакция на динамически внедряемый контент (реклама, виджеты)
- Отслеживание изменений атрибутов для синхронизации состояния
- Реализация `connectedCallback`-подобной логики без Web Components
- Детектирование изменений в чужом коде (legacy, сторонние скрипты)

---

## IntersectionObserver

Асинхронно отслеживает пересечение элемента с **областью видимости** (viewport) или другим элементом-контейнером.

### Синтаксис

```javascript
const observer = new IntersectionObserver(callback, options);
observer.observe(targetElement);
```

### Параметры `options`

| Опция        | Тип                  | Описание                                                                       |
| ------------ | -------------------- | ------------------------------------------------------------------------------ |
| `root`       | `Element \| null`    | Контейнер для пересечения. `null` — viewport                                   |
| `rootMargin` | `string`             | Отступы вокруг root (аналог CSS margin), напр. `"0px 0px -100px 0px"`         |
| `threshold`  | `number \| number[]` | Порог(и) пересечения от `0` до `1`. `0.5` — сработает при 50% видимости       |

### Объект `IntersectionObserverEntry`

| Свойство             | Описание                                                          |
| -------------------- | ----------------------------------------------------------------- |
| `isIntersecting`     | `true` если элемент пересекается с root                           |
| `intersectionRatio`  | Доля видимой области (0–1)                                        |
| `boundingClientRect` | Прямоугольник элемента                                            |
| `intersectionRect`   | Видимая часть элемента                                            |
| `rootBounds`         | Прямоугольник root                                                |
| `target`             | Наблюдаемый элемент                                               |
| `time`               | Метка времени пересечения                                         |

### Методы

| Метод               | Описание                          |
| ------------------- | --------------------------------- |
| `observe(el)`       | Начать наблюдение за элементом    |
| `unobserve(el)`     | Остановить наблюдение за элементом|
| `disconnect()`      | Остановить наблюдение за всеми    |
| `takeRecords()`     | Получить накопленные записи       |

### Пример: ленивая загрузка изображений

```javascript
const observer = new IntersectionObserver((entries, obs) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      obs.unobserve(img); // больше не следить
    }
  }
}, { threshold: 0.1 });

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```

### Пример: бесконечная прокрутка

```javascript
const sentinel = document.querySelector('#load-more');

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, { rootMargin: '0px 0px 200px 0px' }); // триггер за 200px до края

observer.observe(sentinel);
```

### Типичные применения

- Ленивая загрузка изображений / видео
- Бесконечная прокрутка
- Анимации при появлении в области видимости
- Аналитика видимости элементов (трекинг показов рекламы)
- «Sticky»-эффекты (детектирование фиксации хедера)

---

## ResizeObserver

Отслеживает изменения **размеров** (`content box` или `border box`) элементов. Является заменой паттерна `window.addEventListener('resize', ...)` для отдельных элементов.

### Синтаксис

```javascript
const observer = new ResizeObserver(callback);
observer.observe(targetElement, options);
```

### Параметры `observe`

| Опция    | Значения                                         | Описание                               |
| -------- | ------------------------------------------------ | -------------------------------------- |
| `box`    | `"content-box"` \| `"border-box"` \| `"device-pixel-content-box"` | Тип отслеживаемого box-модели |

### Объект `ResizeObserverEntry`

| Свойство              | Описание                                             |
| --------------------- | ---------------------------------------------------- |
| `target`              | Наблюдаемый элемент                                  |
| `contentRect`         | `DOMRectReadOnly` — размер `content box`             |
| `borderBoxSize`       | Массив `ResizeObserverSize` для `border-box`         |
| `contentBoxSize`      | Массив `ResizeObserverSize` для `content-box`        |
| `devicePixelContentBoxSize` | Массив размеров в пикселях устройства         |

> `ResizeObserverSize` содержит: `inlineSize` (ширина) и `blockSize` (высота).

### Пример

```javascript
const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    console.log(`Новый размер: ${width}px × ${height}px`);
  }
});

observer.observe(document.querySelector('.resizable'), { box: 'border-box' });
```

### Типичные применения

- Адаптивные компоненты (Canvas, SVG, графики), зависящие от размера контейнера
- Реализация **container queries** до нативной поддержки
- Пересчёт позиционирования попапов / тултипов при изменении контента

---

## PerformanceObserver

Отслеживает записи о производительности браузера (метрики загрузки, анимации, пользовательского взаимодействия).

### Синтаксис

```javascript
const observer = new PerformanceObserver(callback);
observer.observe({ type: 'measure', buffered: true });
```

### Типы записей (`entryTypes`)

| Тип                     | Описание                                             |
| ----------------------- | ---------------------------------------------------- |
| `"navigation"`          | Метрики загрузки страницы (TTFB, DOMContentLoaded и др.) |
| `"resource"`            | Загрузка ресурсов (скрипты, стили, изображения)      |
| `"mark"`                | Пользовательские метки `performance.mark()`          |
| `"measure"`             | Пользовательские измерения `performance.measure()`   |
| `"longtask"`            | Задачи > 50 мс, блокирующие главный поток            |
| `"paint"`               | `"first-paint"`, `"first-contentful-paint"` (FCP)    |
| `"largest-contentful-paint"` | LCP — самый большой видимый элемент            |
| `"layout-shift"`        | CLS — накопленный сдвиг раскладки                    |
| `"first-input"`         | FID — задержка первого ввода                         |
| `"event"`               | Задержки обработки пользовательских событий (INP)    |

### Объект `PerformanceEntry`

| Свойство     | Описание                            |
| ------------ | ----------------------------------- |
| `name`       | Название записи                     |
| `entryType`  | Тип записи                          |
| `startTime`  | Время начала (мс от navigationStart)|
| `duration`   | Длительность в мс                   |

### Пример: измерение Core Web Vitals

```javascript
// LCP
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcp = entries.at(-1); // последний — самый актуальный
  console.log('LCP:', lcp.startTime.toFixed(2), 'мс');
}).observe({ type: 'largest-contentful-paint', buffered: true });

// CLS
let clsValue = 0;
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  }
  console.log('CLS:', clsValue.toFixed(4));
}).observe({ type: 'layout-shift', buffered: true });

// FID / INP
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`Задержка события "${entry.name}":`, entry.processingStart - entry.startTime, 'мс');
  }
}).observe({ type: 'first-input', buffered: true });
```

### Пример: пользовательские метки

```javascript
performance.mark('start-fetch');
await fetch('/api/data');
performance.mark('end-fetch');
performance.measure('fetch-duration', 'start-fetch', 'end-fetch');

new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)} мс`);
  }
}).observe({ type: 'measure', buffered: true });
```

### Типичные применения

- Сбор Core Web Vitals (LCP, CLS, INP) для RUM-аналитики
- Профилирование пользовательских операций
- Детектирование long tasks и оптимизация TTI
- Отладка производительности загрузки ресурсов

---

## Сравнительная таблица

| Observer               | Что отслеживает                        | Главный use-case                          |
| ---------------------- | -------------------------------------- | ----------------------------------------- |
| `MutationObserver`     | Изменения DOM (узлы, атрибуты, текст)  | Реакция на динамические изменения DOM     |
| `IntersectionObserver` | Пересечение элемента с viewport/root   | Ленивая загрузка, infinite scroll         |
| `ResizeObserver`       | Изменение размеров элемента            | Адаптивные компоненты                     |
| `PerformanceObserver`  | Метрики производительности браузера    | Core Web Vitals, RUM                      |

---

## Общие паттерны

### Всегда отключать наблюдение

```javascript
// Ошибка: утечка памяти
const obs = new MutationObserver(cb);
obs.observe(el, { childList: true });
// obs.disconnect() забыто

// Правильно
class MyComponent {
  #observer = new MutationObserver(this.#onMutation.bind(this));

  connect() {
    this.#observer.observe(this.el, { childList: true, subtree: true });
  }

  disconnect() {
    this.#observer.disconnect(); // очистка при удалении компонента
  }
}
```

### Дебаунс в ResizeObserver

```javascript
let rafId;
const observer = new ResizeObserver(() => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    // тяжёлые вычисления только раз за кадр
    recalcLayout();
  });
});
```

---

## Источники

- #### [MDN — MutationObserver](https://developer.mozilla.org/ru/docs/Web/API/MutationObserver)
- #### [MDN — IntersectionObserver](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API)
- #### [MDN — ResizeObserver](https://developer.mozilla.org/ru/docs/Web/API/ResizeObserver)
- #### [MDN — PerformanceObserver](https://developer.mozilla.org/ru/docs/Web/API/PerformanceObserver)
- #### [web.dev — Core Web Vitals](https://web.dev/vitals/)
- #### [learn.javascript.ru — MutationObserver](https://learn.javascript.ru/mutation-observer)
