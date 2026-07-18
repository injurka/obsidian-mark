# Configuration Based Routing (Конфигурационный роутинг)

## Что это и какую боль решаем?
В противовес "магическому" File Based Routing, конфигурационный подход (React Router, Vue Router) заставляет описывать все маршруты явно, в коде (массивах объектов или JSX-деревьях). Это дает максимальный контроль над приложением. Боль, которую мы решаем — необходимость гибкой, программной настройки, условного рендеринга маршрутов (например, роуты, доступные только админам) и явной инъекции зависимостей (Guards, Loaders).

## Как это работает
Разработчик описывает декларативное дерево маршрутов. При инициализации приложения роутер парсит эту конфигурацию, строит внутренний граф и сопоставляет текущий `window.location` с подходящим узлом.

```mermaid
flowchart LR
    A[Config Array / JSX] --> B[Router Parser]
    B --> C[Route Matcher]
    C --> D{Текущий URL}
    D --> E[Вызов Loader/Guard]
    E -->|Успех| F[Рендер Компонента]
    E -->|Отказ| G[Редирект на /login]
```

## Показательные примеры

**Паттерн: Декларативный конфиг (React Router v6)**
```javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "projects", element: <Projects /> },
      { 
        path: "admin", 
        element: <AdminPanel />,
        // Легко добавить Guard прямо в конфиг
        loader: async () => checkAdminPrivileges() 
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

**Антипаттерн: Раздувание конфига (God Object)**
```javascript
// Плохо: хранить все тысячи роутов гигантского приложения в одном файле.
// Это убивает Code Splitting и замедляет загрузку приложения.
const routes = [ /* 10 000 строк кода с импортами всех страниц */ ];
```

**Паттерн: Code Splitting в конфиге**
```javascript
// Хорошо: ленивая загрузка (Lazy Loading) страниц
const LazyProfile = React.lazy(() => import('./Profile'));

const routes = [
  { path: "/profile", element: <React.Suspense fallback={<Spinner/>}><LazyProfile /></React.Suspense> }
];
```

## Неочевидные нюансы
1. **Оверхед на бойлерплейт**: Приходится вручную импортировать каждый компонент и прописывать пути. Вероятность опечатки выше, чем в File-based подходе.
2. **Code Splitting (Разделение кода)**: В отличие от File-based фреймворков, которые делают разделение кода из коробки для каждой страницы, здесь вам нужно явно использовать `React.lazy` (или `lazy` проп в React Router v6.4+), иначе весь код со всех страниц попадет в один бандл.
3. **Сложность слияния**: В крупных командах файл с конфигурацией роутов часто становится точкой конфликтов (Merge Conflicts) в Git.
