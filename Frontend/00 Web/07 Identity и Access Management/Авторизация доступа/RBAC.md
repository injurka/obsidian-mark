# RBAC (Role-Based Access Control)

**RBAC (Управление доступом на основе ролей)** — это классическая модель разграничения доступа, при которой права назначаются не отдельным пользователям, а **ролям**. Пользователи привязываются к одной или нескольким ролям и получают все связанные с ними привилегии.

---

## 1. Базовый принцип RBAC

```mermaid
flowchart LR
    subgraph Users["👤 Пользователи"]
        U1["Иван (Менеджер)"]
        U2["Анна (Админ)"]
        U3["Петр (Клиент)"]
    end

    subgraph Roles["🏷️ Роли"]
        R1["Admin"]
        R2["Manager"]
        R3["Customer"]
    end

    subgraph Permissions["🔑 Разрешения"]
        P1["orders:read"]
        P2["orders:create"]
        P3["orders:delete"]
        P4["users:manage"]
    end

    U1 --> R2
    U2 --> R1
    U3 --> R3

    R1 --> P1 & P2 & P3 & P4
    R2 --> P1 & P2
    R3 --> P1
```

---

## 2. Уровни стандарта NIST RBAC

Стандарт NIST (Национальный институт стандартов и технологий США) определяет 4 уровня зрелости RBAC:

### 2.1. Flat RBAC (Базовый / Core RBAC)
- Пользователи привязываются к ролям, роли — к разрешениям.
- Нет наследования и взаимных ограничений.

### 2.2. Hierarchical RBAC (Иерархический RBAC)
- Роли поддерживают древовидное наследование.
- Дочерняя роль автоматически получает все разрешения родительских ролей:
  $$\text{SuperAdmin} \supset \text{Admin} \supset \text{Moderator} \supset \text{User}$$

```mermaid
flowchart TD
    SA["👑 SuperAdmin<br/><i>(Все права + Биллинг + Аудит)</i>"]
    A["🛡️ Admin<br/><i>(Управление пользователями и контентом)</i>"]
    M["✏️ Moderator<br/><i>(Модерация постов и комментариев)</i>"]
    U["👤 User<br/><i>(Создание постов, чтение)</i>"]

    SA --> A
    A --> M
    M --> U
```

### 2.3. Constrained RBAC (RBAC с разделением обязанностей — SoD)
- **Static Separation of Duties (SSD)**: Пользователю запрещено иметь две конфликтующие роли одновременно (например, `Accountant` и `Auditor`).
- **Dynamic Separation of Duties (DSD)**: Пользователь может иметь обе роли, но не может активировать их в рамках одной сессии.

---

## 3. Схема базы данных (ERD)

Для реализации классического гибкого RBAC используется нормализованная схема со связями "многие-ко-многим":

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : assigned_to
    ROLES ||--o{ ROLE_PERMISSIONS : includes
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : granted_to

    USERS {
        uuid id PK
        string email
        string password_hash
    }

    USER_ROLES {
        uuid user_id FK
        uuid role_id FK
    }

    ROLES {
        uuid id PK
        string name "admin, manager"
        string description
    }

    ROLE_PERMISSIONS {
        uuid role_id FK
        uuid permission_id FK
    }

    PERMISSIONS {
        uuid id PK
        string action "articles:delete"
        string description
    }
```

---

## 4. Пример реализации на TypeScript

```typescript
// Определение типов разрешений и иерархии
type Permission = 
  | 'articles:read'
  | 'articles:create'
  | 'articles:edit'
  | 'articles:delete'
  | 'users:ban';

type Role = 'guest' | 'author' | 'moderator' | 'admin';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  guest: ['articles:read'],
  author: ['articles:read', 'articles:create', 'articles:edit'],
  moderator: ['articles:read', 'articles:edit', 'articles:delete'],
  admin: [
    'articles:read',
    'articles:create',
    'articles:edit',
    'articles:delete',
    'users:ban',
  ],
};

// Функция проверки прав
export function hasPermission(
  userRoles: Role[],
  requiredPermission: Permission
): boolean {
  return userRoles.some((role) =>
    ROLE_PERMISSIONS[role]?.includes(requiredPermission)
  );
}

// Пример Middleware для Express
export function requirePermission(permission: Permission) {
  return (req: any, res: any, next: any) => {
    const user = req.user;
    if (!user || !hasPermission(user.roles, permission)) {
      return res.status(403).json({ error: 'Доступ запрещен: недостаточно прав' });
    }
    next();
  };
}
```

---

## 5. Преимущества и недостатки RBAC

### Плюсы:
- 🟢 **Простота понимания и аудита**: Легко понять, кто и к чему имеет доступ в компании.
- 🟢 **Централизованное управление**: Изменение прав роли моментально применяется ко всем пользователям с этой ролью.
- 🟢 **Производительность**: Проверка роли или списка прав в JWT/Redis выполняется практически мгновенно.

### Минусы и ограничения:
- 🔴 **Проблема "Взрыва ролей" (Role Explosion)**: При попытке учесть контекст количество ролей разрастается лавинообразно (`Editor_Department_A_Morning_Shift`, `Editor_Department_B_Night_Shift`).
- 🔴 **Отсутствие контекста**: RBAC не умеет учитывать динамические факторы: время суток, геолокацию, принадлежность ресурса (например: *"пользователь может редактировать только СВОЮ статью"*).
- 👉 *Для решения этих ограничений применяется [[ABAC]]*.

---

## 6. Связанные заметки
- [[Авторизация: роли и permissions]] — общие концепции и термины авторизации.
- [[ABAC]] — атрибутивная модель доступа для сложных контекстных правил.
- [[Route Guards и авторизация]] — применение ролей и permissions в роутинге веб-приложений.
