
В React, если компонент выбрасывает необработанное исключение во время рендера, React "убивает" всё дерево компонентов, и пользователь видит белый экран смерти. **Error Boundaries** решают эту проблему, изолируя падение и показывая запасной интерфейс (Fallback UI).

## 1. Как это работает под капотом

*Разница между обычным падением приложения и использованием Error Boundary:*
```mermaid
flowchart TD
    subgraph WithoutBoundary [Без Error Boundary - Падает всё приложение]
        Root1["Корневой компонент"] --> Safe1["Рабочий компонент"]
        Root1 --> Crash1["Компонент с ошибкой"]
        Crash1 -.->|Убивает всё дерево| Root1
    end

    subgraph WithBoundary [С Error Boundary - Изоляция ошибки]
        Root2["Корневой компонент"] --> Safe2["Рабочий компонент"]
        Root2 --> EB["ErrorBoundary"]
        EB --> Crash2["Компонент с ошибкой"]
        Crash2 -.->|Перехват ошибки| EB
        EB -->|Показ Fallback| FallbackUI["Запасной UI"]
    end

    style Root1 fill:#ffcdd2,stroke:#c62828,stroke-width:2px;
    style Crash1 fill:#e53935,stroke:#b71c1c,stroke-width:2px;
    style Root2 fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px;
    style Safe2 fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px;
    style EB fill:#ffe0b2,stroke:#f57c00,stroke-width:2px;
    style Crash2 fill:#e53935,stroke:#b71c1c,stroke-width:2px;
    style FallbackUI fill:#fff9c4,stroke:#fbc02d,stroke-width:2px;
```

К 2026 году Error Boundaries — это **единственный случай**, когда вам все еще приходится писать **Классовые компоненты** в React (если вы не используете сторонние библиотеки-обертки).

Для создания границы компонент должен реализовать хотя бы один из двух методов:
- `static getDerivedStateFromError(error)` — для обновления стейта и показа запасного UI.
- `componentDidCatch(error, errorInfo)` — для логирования ошибки в сервисы аналитики (например, Sentry).

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Следующий рендер покажет fallback
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children; 
  }
}

// Использование:
<ErrorBoundary fallback={<p>Ошибка загрузки виджета</p>}>
  <ComplexWidget />
</ErrorBoundary>
```

## 2. ⚠️ Что Error Boundaries НЕ ловят (Важный Edge Case)
Это один из самых частых вопросов на собеседованиях. Error Boundaries ловят ошибки **только во время фазы рендера**, в методах жизненного цикла и в конструкторах дерева.

*Схема обработки ошибок в React: где нужен Error Boundary, а где классический try-catch:*
```mermaid
flowchart LR
    ErrorEvent["Произошла ошибка"] --> CheckType{"В каком месте?"}
    
    CheckType -->|Во время рендера| RenderPhase["Рендер или Жизненный цикл"]
    CheckType -->|При клике| EventHandler["Обработчик onClick"]
    CheckType -->|В таймере| AsyncCode["Асинхронный код"]
    
    RenderPhase --> Caught["Ловится Error Boundary"]
    EventHandler --> Missed["Нужен обычный try catch"]
    AsyncCode --> Missed
    
    style Caught fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px;
    style Missed fill:#ffcdd2,stroke:#c62828,stroke-width:2px;
    style RenderPhase fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
```

Они **НЕ ЛОВЯТ** ошибки в следующих местах:
1. **Обработчики событий (`onClick`, `onChange`):** Если ошибка произойдет при нажатии кнопки, приложение не упадет (потому что рендер уже завершен). Вам нужен обычный `try/catch`.
2. **Асинхронный код:** Ошибки внутри `setTimeout` или `requestAnimationFrame`.
3. **Server-Side Rendering (SSR):** На сервере Error Boundaries не работают.
4. **Ошибки в самой границе:** Если падает метод `render` самого ErrorBoundary, ошибка пробрасывается выше (к следующей границе).

## 3. Современное решение: `react-error-boundary`
Так как писать классы никто не хочет, индустрия использует библиотеку `react-error-boundary`.
Она предоставляет компонент-обертку и крутую фичу **Reset (Восстановление)**, позволяя пользователю нажать кнопку "Попробовать снова", которая сбрасывает состояние ошибки и пытается отрендерить упавший компонент заново.

*Цикл восстановления работы компонента после сбоя:*
```mermaid
flowchart TD
    Render["Рендер компонента"] --> ErrorCrash["Возникла ошибка"]
    ErrorCrash --> ShowFallback["Показ Fallback UI"]
    ShowFallback --> UserClick["Юзер жмет Попробовать снова"]
    UserClick --> ResetLogic["Вызов onReset - очистка кэша"]
    ResetLogic --> Render
    
    style ErrorCrash fill:#ffcdd2,stroke:#c62828,stroke-width:2px;
    style ShowFallback fill:#ffe0b2,stroke:#f57c00,stroke-width:2px;
    style UserClick fill:#bbdefb,stroke:#1976d2,stroke-width:2px;
    style ResetLogic fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px;
```

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Произошла ошибка:</p>
      <pre>{error.message}</pre>
      {/* Кнопка сбросит ошибку и заново отрендерит children */}
      <button onClick={resetErrorBoundary}>Попробовать снова</button>
    </div>
  );
}

<ErrorBoundary 
  FallbackComponent={Fallback} 
  onReset={() => clearCache()} // Очищаем кэш перед повторным рендером
>
  <MyComponent />
</ErrorBoundary>
```
