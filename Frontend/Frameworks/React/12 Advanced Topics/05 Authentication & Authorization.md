# Authentication & Authorization (Auth)

Авторизация во Frontend — это минное поле безопасности. Главный вопрос, вокруг которого строятся все архитектурные решения: **Где хранить токены?**

## 1. Хранение токенов (JWT - JSON Web Tokens)
В SPA (Single Page Application) бэкенд обычно выдает 2 токена:
- `AccessToken` (короткоживущий, 15 минут).
- `RefreshToken` (долгоживущий, 30 дней).

### ❌ LocalStorage (Уязвимо к XSS)
Хранить токены в `localStorage` (или `sessionStorage`) **опасно**. Если злоумышленник внедрит на ваш сайт вредоносный скрипт (XSS - Cross-Site Scripting, например, через уязвимый NPM-пакет или комментарий), этот скрипт одной строчкой `localStorage.getItem('token')` украдет токен и отправит хакеру.

### ✅ HttpOnly Cookies (Защита от XSS, но риск CSRF)
Золотой стандарт индустрии. Бэкенд возвращает токен в заголовке `Set-Cookie` с флагами `HttpOnly; Secure; SameSite=Strict`.
- **HttpOnly:** Запрещает JavaScript (и React, и скриптам хакеров) читать куки!
- Браузер **автоматически** прикрепляет эту куку к каждому запросу на этот же домен. 
- *Риск CSRF (подделки межсайтовых запросов) решается флагом `SameSite` и CORS политиками на сервере.*

*Примечание:* Часто `RefreshToken` прячут в HttpOnly Cookie, а `AccessToken` хранят прямо в памяти (в замыкании или Zustand-сторе). Если пользователь обновит страницу (F5), память очистится, но приложение сделает тихий запрос на `POST /refresh-token`, и браузер автоматически отправит HttpOnly куку, получив в ответ новый `AccessToken` в память.

## 2. Архитектура: Route Guards (Защита маршрутов)
В React приложениях необходимо защищать приватные страницы (например, `/dashboard`) от неавторизованных пользователей.

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Компонент-обертка
export function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Проверка сессии...</div>;
  
  // Если юзера нет, редиректим на логин, сохраняя путь (state={{ from: location }})
  if (!user) return <Navigate to="/login" replace />;

  // Если всё ок, рендерим дочерний маршрут
  return <Outlet />;
}

// Использование в Роутере
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/settings" element={<Settings />} />
</Route>
```

## 3. Мета-фреймворки (NextAuth.js / Auth.js)
Если вы используете Next.js (или другие современные фреймворки), "костылить" логин вручную не принято. Стандарт индустрии — библиотека **Auth.js** (ранее NextAuth).

Она берет на себя самую сложную часть — интеграцию с **OAuth-провайдерами** (Войти через Google, GitHub, Apple) и управление HttpOnly сессиями.

```tsx
import { signIn, signOut, useSession } from "next-auth/react"

export default function App() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Привет {session.user.email} <br />
        <button onClick={() => signOut()}>Выйти</button>
      </>
    )
  }
  return (
    <>
      <button onClick={() => signIn('google')}>Войти через Google</button>
    </>
  )
}
```

## 4. Edge Case: Ролевая модель (RBAC - Role-Based Access Control)
Часто бывает, что пользователь авторизован, но у него нет прав на просмотр конкретного элемента (например, кнопки "Удалить пользователя", доступной только Админам).

Прятать кнопку с помощью `if (user.role === 'admin')` на фронтенде — **это не безопасность, это просто UX (пользовательский опыт)**. Хакер может легко открыть DevTools, изменить стейт React и сделать кнопку видимой.
**Главное правило авторизации:** Реальная проверка прав на совершение действия (удаление) должна происходить СТРОГО на бэкенде. Фронтенд скрывает кнопки только для того, чтобы не раздражать пользователя.
