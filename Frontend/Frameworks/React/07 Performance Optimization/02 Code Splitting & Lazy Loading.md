# Code Splitting & Lazy Loading (Разделение кода)

Даже самое оптимизированное React-приложение будет тормозить на старте, если его размер 5 Мегабайт. **Code Splitting (разделение кода)** позволяет разбивать монолитный бандл на мелкие чанки (куски) и загружать их только тогда, когда они реально нужны пользователю.

## 1. Route-based Splitting (По маршрутам)
Самый эффективный и простой способ. Зачем грузить код страницы "Настройки" или огромную библиотеку графиков, если пользователь находится на "Главной"?

**Как это делается в чистом React (с React Router):**
Используются функция `lazy()` и компонент `<Suspense>`.
```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Чанк с Settings.jsx скачается по сети ТОЛЬКО при переходе по роуту /settings
const SettingsPage = lazy(() => import('./pages/Settings'));

function App() {
  return (
    // Обязательно нужен Suspense, чтобы показать что-то, пока качается JS-файл
    <Suspense fallback={<div>Загрузка страницы...</div>}>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  );
}
```

## 2. Component-based Splitting (По компонентам)
Иногда на одной странице есть тяжелые компоненты, которые не видны сразу (модальные окна, нижняя часть длинного лендинга).

```jsx
const HeavyModal = lazy(() => import('./components/HeavyModal'));

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть</button>
      {/* HeavyModal скачается только ПОСЛЕ клика по кнопке */}
      {isOpen && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <HeavyModal />
        </Suspense>
      )}
    </>
  );
}
```

## 3. Meta-frameworks (Next.js / Remix)
В современных фреймворках Code Splitting по маршрутам работает **автоматически**. Каждый файл в папке `pages` или `app` автоматически становится отдельным JS-чанком.
Для разделения на уровне компонентов в Next.js используется `next/dynamic`:
```jsx
import dynamic from 'next/dynamic';
// Suspense встроен внутрь next/dynamic
const HeavyChart = dynamic(() => import('./HeavyChart'), { loading: () => <p>Loading...</p> });
```

## 4. ⚠️ Edge Case: Ошибка сети при загрузке чанка
Что произойдет, если пользователь нажал кнопку (сработал `lazy`), но в этот момент у него пропал интернет, или вы выкатили новую версию приложения, и старый чанк был удален с сервера?
Приложение выбросит фатальную ошибку рендера (белый экран).

**Решение:** Оборачивать `Suspense` с ленивыми компонентами в **Error Boundary** (Границу ошибок).
```jsx
<ErrorBoundary fallback={<h2>Не удалось загрузить модуль. Обновите страницу.</h2>}>
  <Suspense fallback={<Spinner />}>
    <HeavyModal />
  </Suspense>
</ErrorBoundary>
```
