# React Router v7

React Router — это исторический стандарт маршрутизации в React. Однако версия 7 (впитавшая в себя наработки фреймворка Remix) кардинально изменила подход к архитектуре. Теперь это не просто инструмент для переключения компонентов по URL, а мощный движок для управления данными.

## 1. Главная фича: Loaders и Actions
До появления этих концепций мы использовали паттерн **"Render-then-Fetch"**:
1. Пользователь переходит на `/profile`.
2. Компонент `<Profile />` рендерится (показывает спиннер).
3. Срабатывает `useEffect`, делает запрос за данными.
4. Данные приходят, происходит ре-рендер, показывается профиль.

**В React Router v7 используется паттерн "Fetch-then-Render":**
Вы привязываете функцию `loader` к маршруту. Роутер **сначала** вызывает `loader` параллельно с загрузкой JS-бандла, и только после получения данных рендерит компонент.

```jsx
import { createBrowserRouter, useLoaderData } from 'react-router-dom';

// 1. Функция загрузки данных (выполняется ДО рендера)
async function profileLoader({ params }) {
  const user = await fetchUser(params.id);
  if (!user) throw new Response("Not Found", { status: 404 });
  return user;
}

// 2. Компонент (синхронно получает готовые данные)
function Profile() {
  const user = useLoaderData(); // Данные уже здесь! Никаких useEffect!
  return <h1>{user.name}</h1>;
}

// 3. Конфигурация
const router = createBrowserRouter([
  {
    path: "/profile/:id",
    element: <Profile />,
    loader: profileLoader,
  }
]);
```

## 2. Мутации через Actions и `<Form>`
Вместо ручного управления состояниями (e.preventDefault, fetch, стейт загрузки), React Router предлагает использовать компонент `<Form>`.

```jsx
// Функция мутации (вызывается при отправке формы)
async function profileAction({ request }) {
  const formData = await request.formData();
  await updateUser(formData.get("name"));
  return redirect("/dashboard");
}

function EditProfile() {
  return (
    // Это не обычный HTML <form>, это компонент роутера
    <Form method="post">
      <input name="name" />
      <button type="submit">Save</button>
    </Form>
  );
}
```
**Магия (Edge Case):** Когда `action` успешно завершается, React Router **автоматически инвалидирует (вызывает заново)** все активные `loader`-ы на текущей странице! Вам не нужно вручную обновлять глобальный стейт, UI обновится сам свежими данными с сервера.

## 3. Обработка ошибок (Error Boundaries)
В старом React ошибки в рендере ломали все приложение (белый экран), если не было классовых Error Boundaries.
В React Router v7 вы вешаете `errorElement` прямо на маршрут.

```jsx
const router = createBrowserRouter([
  {
    path: "/invoices",
    element: <Invoices />,
    loader: invoicesLoader,
    errorElement: <ErrorBoundary />, // Поймает ошибки и из loader, и из рендера!
  }
]);
```
Если сервер вернул 500 в `loader`, или компонент выбросил исключение, весь остальной сайт (хедер, сайдбар) продолжит работать, а вместо `<Invoices />` отрисуется `<ErrorBoundary />`.

## 4. Nested Routing (Вложенный роутинг) и `<Outlet />`
Позволяет вкладывать маршруты друг в друга. Дочерний компонент рендерится на месте компонента `<Outlet />` внутри родителя.
Это основа для создания сложных Layout (макетов), где шапка и боковое меню остаются нетронутыми, а меняется только контент в центре.
