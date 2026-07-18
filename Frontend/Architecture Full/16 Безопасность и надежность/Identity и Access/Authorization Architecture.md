# Архитектура Авторизации (Authorization Architecture)

## Суть и решаемая боль
Если аутентификация (AuthN) отвечает на вопрос "Кто ты?", то авторизация (AuthZ) отвечает на вопрос "А можно ли тебе это делать?". Боль возникает, когда UI и Backend рассинхронизируются: кнопка "Удалить" показывается, но при клике падает 403 Forbidden. Либо наоборот — кнопка скрыта из-за кривой логики на фронте, хотя бэкенд позволяет действие.

Архитектура авторизации на фронтенде — это механизм **декларативного** отображения UI и защиты роутов на основе прав пользователя. Главная задача — инкапсулировать логику проверок так, чтобы бизнес-логика не превращалась в лапшу из `if-else`.

## Как это работает на практике

Авторизация пронизывает фронтенд на трех уровнях:
1. **Routing:** Можно ли пользователю зайти на этот URL? (Route Guards).
2. **Components:** Должен ли пользователь видеть этот блок/кнопку? (Conditional Rendering).
3. **Data Fetching:** Фильтрация данных на стороне клиента (чаще должен делать бэкенд, но фронт адаптирует UI).

```mermaid
graph TD
    User((User)) -->|Navigates to /admin| Router Guard
    User -->|Views Article| Component Guard
    
    subgraph Frontend Authorization Architecture
        Router Guard -->|Check /admin| PolicyEngine{Policy Engine}
        Component Guard -->|Check 'delete' btn| PolicyEngine
        
        PolicyEngine -->|Has Role/Permission?| AuthContext[Auth Context / State]
    end
    
    AuthContext -.->|Syncs permissions| BackendAPI[Backend API /me]
    
    PolicyEngine -->|Allow| Render[Render Route/UI]
    PolicyEngine -->|Deny| Redirect[Redirect / Hide UI / Show 403]
```

## Примеры кода

**Антипаттерн (Лапша из ролей прямо в UI):**
```tsx
// Разработчику нужно помнить все комбинации ролей. Изменение ролей приведет к рефакторингу всего приложения.
const AdminPanel = ({ user }) => {
  if (user.role !== 'admin' && user.role !== 'superadmin' && user.permissions.includes('view_panel')) {
    return <AccessDenied />;
  }
  return <div>Admin Panel</div>;
}
```

**Правильное решение (Использование компонента-обертки и маппинг прав):**
```tsx
// Централизованная проверка прав (Permission-based)
const Can = ({ permission, children, fallback = null }) => {
  const { hasPermission } = useAuthZ(); // Хук, который лезет в Context
  return hasPermission(permission) ? children : fallback;
};

// Использование в UI чистое и декларативное
const UserProfile = () => {
  return (
    <div>
      <h1>Profile</h1>
      <Can permission="user:delete">
        <button>Удалить пользователя</button>
      </Can>
    </div>
  );
};
```

## Неочевидные нюансы и трейдоффы
- **Frontend Authorization — это UX, а не безопасность!** Скрытие кнопки "Удалить" не мешает злоумышленнику отправить POST/DELETE запрос через DevTools. Бэкенд **обязан** дублировать все проверки. Фронтенд лишь создает комфортный интерфейс, чтобы юзер не тыкал в кнопки, которые ему недоступны.
- **Гранулярность прав (Role vs Permissions):** Если привязаться к жестким ролям (`role === 'admin'`), то при добавлении новой роли (например, `moderator`) придется переписывать половину фронта. Архитектура должна строиться на `Permissions` (правах). Бэкенд отдает список разрешенных действий (`['article:edit', 'user:delete']`), а фронтенд проверяет именно их.
- **Offline и инвалидация стейта:** Если права юзера изменили в админке, фронтенд об этом не узнает, пока не обновит токен/сессию. Часто требуется реализовывать polling, WebSocket события или обрабатывать 403 ошибки в интерцепторах для принудительного обновления прав в стейте.
