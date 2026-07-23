# Написание плагинов (Vite, Rollup)

Система плагинов Vite построена на основе системы плагинов Rollup, расширяя её собственными специфичными для Vite хуками. Понимание жизненного цикла плагинов позволяет разработчику создавать кастомные загрузчики, оптимизаторы и генераторы кода под нужды проекта.

---

## 1. Жизненный цикл плагина Rollup (Ключевые хуки)

Хуки делятся на два этапа: **Сборка графа (Build)** и **Генерация бандла (Output)**.

```text
Build Phase (Хуки сборки):
[Входной файл] ──► resolveId ──► load ──► transform ──► (Рекурсивный анализ импортов) ──► buildEnd
                     │ (Найти путь)  │ (Прочесть) │ (Изменить код)
                     
Output Phase (Хуки генерации):
renderStart ──► renderChunk ──► generateBundle ──► writeBundle (Запись на диск)
                                 │ (Доступ к ассетам)
```

### 1.1. Основные хуки сборки (Build Hooks):
*   **`resolveId(source, importer)`:**
    Отвечает за разрешение путей импорта. Вы можете перехватить импорт определенного файла и перенаправить его на другой путь, либо объявить его «виртуальным модулем».
*   **`load(id)`:**
    Загружает содержимое файла. Вы можете вернуть кастомный текстовый код (JS/TS) для перехваченного `id`.
*   **`transform(code, id)`:**
    **Самый используемый хук**. Применяется для преобразования кода (например, компиляция SASS в CSS, SVG в React-компонент, минификация кода). Принимает строку кода и возвращает измененный код вместе с source map.

---

## 2. Специфичные хуки Vite

Vite расширяет Rollup, добавляя хуки для управления Dev-сервером, горячей перезагрузкой (HMR) и модификацией HTML:

*   **`config(config, env)`:**
    Позволяет изменять или дополнять конфигурацию Vite до её окончательного разрешения.
*   **`configureServer(server)`:**
    Предоставляет доступ к инстансу Dev-сервера Vite. Позволяет добавлять собственные мидлвары (middlewares) для обработки кастомных HTTP-запросов во время разработки.
*   **`transformIndexHtml(html)`:**
    Позволяет динамически модифицировать содержимое файла `index.html` (например, встраивать скрипты аналитики, менять метатеги).
*   **`handleHotUpdate(ctx)`:**
    Вызывается при изменении файлов во время разработки. Позволяет тонко настраивать HMR (например, перезагружать только определенные модули при изменении файлов данных).

---

## 3. Практические примеры написания плагинов

### Пример 1: Простой плагин замены строк (Аналог @rollup/plugin-replace)
Плагин заменяет подстроку `__BUILD_DATE__` на реальную дату сборки.

```javascript
// vite-plugin-build-date.js
export default function buildDatePlugin() {
  return {
    name: 'vite-plugin-build-date', // Уникальное имя плагина

    // Хук трансформации кода
    transform(code, id) {
      // Игнорируем node_modules
      if (id.includes('node_modules')) return null;

      if (code.includes('__BUILD_DATE__')) {
        const date = new Date().toISOString();
        const transformedCode = code.replace(/__BUILD_DATE__/g, `"${date}"`);
        
        return {
          code: transformedCode,
          map: null // В простом примере опускаем source map
        };
      }
      return null;
    }
  };
}
```

---

### Пример 2: Плагин виртуального модуля
Виртуальный модуль — это модуль, которого физически нет на диске, но импортировать его в JS-коде можно. Например, мы хотим импортировать информацию о версии приложения.

```javascript
// vite-plugin-version.js
export default function versionPlugin() {
  const virtualModuleId = 'virtual:app-version';
  const resolvedVirtualModuleId = '\0' + virtualModuleId; // Префикс \0 используется в Rollup для скрытия виртуальных модулей от других плагинов

  return {
    name: 'vite-plugin-version',

    // Разрешаем виртуальный ID
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
      return null;
    },

    // Загружаем содержимое виртуального модуля
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const version = process.env.npm_package_version || '1.0.0';
        return `export const version = "${version}";`;
      }
      return null;
    }
  };
}
```

*Использование в коде приложения:*
```typescript
import { version } from 'virtual:app-version';
console.log('Текущая версия:', version);
```
*(Для корректной работы TypeScript потребуется объявить модуль в файле `.d.ts`)*
