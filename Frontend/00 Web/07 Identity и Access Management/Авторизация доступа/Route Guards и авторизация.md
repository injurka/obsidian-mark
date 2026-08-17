# Route Guards и Авторизация

**Route Guards (Защитники маршрутов)** — это механизмы контроля навигации в веб-приложениях (SPA и SSR), которые перехватывают попытки перехода пользователя на определенный URL-адрес и проверяют условия аутентификации и авторизации.

---

## 1. Главное правило безопасности

> [!danger] КРИТИЧЕСКИ ВАЖНО
> **Route Guard на клиенте — это исключительно UX-механизм (улучшение пользовательского опыта), а НЕ безопасность!**
> Любой код на клиенте (JavaScript в браузере) может быть изменен пользователем через DevTools. Истинная защита данных и контроль доступа **всегда осуществляются на бэкенде / API**.
> 
> Клиентский Guard нужен для того, чтобы:
> 1. Не показывать пользователю пустые страницы и не слать заведомо провальные запросы к API.
> 2. Удобно перенаправлять неавторизованных пользователей на `/login` с сохранением обратного пути (`returnUrl`).
> 3. Отображать информативную страницу `403 Forbidden` вместо поломанного интерфейса.

---

## 2. Уровни защиты маршрутов

```mermaid
flowchart TD
    Nav["🌐 Переход на URL (/admin/dashboard)"]
    
    AuthGuard{"1. Auth Guard<br/>Пользователь аутентифицирован?"}
    LoginRedirect["🔄 Редирект на /login?returnUrl=..."]
    
    RoleGuard{"2. RBAC / ABAC Guard<br/>Есть ли необходимая роль / права?"}
    Forbidden403["⛔ Редирект на /403 Forbidden"]
    
    DataGuard{"3. Resource Owner Guard<br/>Доступен ли конкретный объект?"}
    NotFound404["❓ Редирект на /404 Not Found"]
    
    RenderPage["✨ Отрисовка защищенной страницы"]

    Nav --> AuthGuard
    AuthGuard -->|НЕТ (401)| LoginRedirect
    AuthGuard -->|ДА| RoleGuard
    
    RoleGuard -->|НЕТ (403)| Forbidden403
    RoleGuard -->|ДА| DataGuard
    
    DataGuard -->|НЕТ (404/403)| NotFound404
    DataGuard -->|ДА| RenderPage
```

---

## 3. Паттерны реализации

### 3.1. React (React Router v6 / v7)

В React Router защита реализуется через паттерн обертки `<ProtectedRoute>` или с помощью `loader`:

```tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  requiredPermission?: string;
  requiredRole?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermission,
  requiredRole,
}) => {
  const { isAuthenticated, user, hasPermission, isLoading } = useAuth();
  const location = useLocation();

  // Пока идет начальная проверка токена / профиля — показываем спиннер
  if (isLoading) {
    return <div className="spinner">Загрузка профиля...</div>;
  }

  // 1. Проверка аутентификации (401)
  if (!isAuthenticated) {
    // Сохраняем исходный путь в state, чтобы вернуть пользователя после успешного логина
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Проверка ролей и прав доступа (403)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/forbidden" replace />;
  }

  // Все проверки пройдены — рендерим дочерние маршруты
  return <Outlet />;
};
```

#### Использование в конфигурации роутера:
```tsx
export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forbidden', element: <Forbidden403Page /> },
  
  // Защищенная зона для всех авторизованных пользователей
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/profile', element: <ProfilePage /> },
    ],
  },

  // Зона только для администраторов
  {
    element: <ProtectedRoute requiredRole="admin" />,
    children: [
      { path: '/admin/users', element: <AdminUsersPage /> },
      { path: '/admin/settings', element: <AdminSettingsPage /> },
    ],
  },
]);
```

---

### 3.2. Next.js App Router (Edge Middleware)

В SSR / Next.js защита маршрутов выполняется на сервере **до** рендеринга страницы с помощью `middleware.ts`:

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'];
const ADMIN_ROUTES = ['/admin'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('accessToken')?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

  if (!isProtectedRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  // 1. Проверка наличия и валидности токена
  const payload = token ? await verifyJwtToken(token) : null;

  if (!payload) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Проверка прав администратора
  if (isAdminRoute && payload.role !== 'admin') {
    return NextResponse.redirect(new URL('/403', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

---

## 4. UX-практики при авторизации на фронтенде

1. **Сохранение целевого URL (`returnUrl`)**:
   - При неавторизованном редиректе сохраняйте текущий путь: `/login?returnUrl=/orders/123`.
   - После успешного входа возвращайте пользователя туда, куда он шел.
2. **Разница между 401 и 403**:
   - `401 Unauthorized` $\to$ редирект на экран логина.
   - `403 Forbidden` $\to$ показ страницы *"У вас нет прав для доступа к этому разделу"* с кнопкой *"Назад"* (не перенаправлять на логин, чтобы не создавать бесконечный цикл).
3. **Гранулярный UI (Conditional Rendering)**:
   - Если у пользователя нет прав на действие, скрывайте кнопку или делайте ее `disabled` с подсказкой (`Tooltip`), объясняющей причину.

---

## 5. Связанные заметки
- [[Авторизация: роли и permissions]] — архитектура прав и permissions в приложении.
- [[RBAC]] — ролевая модель доступа.
- [[ABAC]] — динамическая атрибутивная авторизация.
- [[Access Token vs ID Token]] — токены и их назначение.
