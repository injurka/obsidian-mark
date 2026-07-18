# Error Boundaries (Границы ошибок)

## Суть и решаемая боль
В компонентных фреймворках (React, Vue) если один дочерний компонент падает с JS-ошибкой во время рендера (например, `Cannot read property 'map' of undefined`), фреймворк размонтирует **всё** дерево компонентов. Боль: из-за упавшего счетчика лайков пользователь видит "Белый экран смерти" на всей странице.

**Error Boundaries** — это паттерн, который изолирует сбой. Вы оборачиваете нестабильные части UI (например, сторонние виджеты или блоки с динамическими данными) в специальный компонент. Если внутри него происходит ошибка, он "ловит" её, не давая приложению упасть целиком, и показывает запасной UI (Fallback).

## Как это работает на практике

Архитектура строится по принципу отсеков в подводной лодке. Если один отсек затопило, мы закрываем шлюз, и остальная лодка продолжает плыть.

```mermaid
graph TD
    App[App (Root)] --> Header[Header]
    App --> Main[Main Content]
    
    Main --> Sidebar[Sidebar]
    Main --> Feed[News Feed]
    
    subgraph Error Boundary
        Feed --> Post1[Post 1]
        Feed --> Post2[Post 2 - 💥 CRASH!]
    end
    
    Note over Error Boundary: Ловит ошибку от Post 2.<br/>Рендерит Fallback UI только для Feed.<br/>Header и Sidebar продолжают работать!
```

## Примеры кода

**Антипаттерн (Отсутствие изоляции):**
```tsx
const Dashboard = ({ data }) => (
  <div>
    <Header />
    <Sidebar />
    {/* Если widgets[0] undefined, упадет всё приложение */}
    <WidgetPanel widgets={data.widgets.map(w => w)} /> 
  </div>
);
```

**Правильное решение (Использование Error Boundary):**
```tsx
// В React Error Boundary пишется только на классах (пока что)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Переключаем стейт для Fallback
  }

  componentDidCatch(error, info) {
    logToSentry(error, info); // Отправляем ошибку мониторингу
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI message="Виджет временно недоступен" />;
    }
    return this.props.children;
  }
}

// Использование:
const Dashboard = ({ data }) => (
  <div>
    <Header />
    <ErrorBoundary>
       <WidgetPanel widgets={data.widgets} />
    </ErrorBoundary>
  </div>
);
```

## Неочевидные нюансы и границы применимости
- **Что Error Boundaries НЕ ловят:** Они ловят только ошибки рендеринга и методов жизненного цикла. Они **не ловят** ошибки в обработчиках событий (клики), асинхронном коде (`setTimeout`, `fetch`) и SSR. Для них нужны стандартные `try/catch`.
- **Гранулярность:** Оборачивать каждый `<div/>` в Error Boundary — это ужасный оверхед для производительности и кода. Обычно оборачивают: 1) Глобально весь App, 2) Независимые страницы (Route), 3) Сложные изолированные виджеты.
- **Восстановление (Recovery):** Хороший Error Boundary дает пользователю кнопку "Попробовать снова". При клике стейт `hasError` сбрасывается в `false`, и фреймворк пытается отрендерить упавший компонент заново.
