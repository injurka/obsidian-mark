# Гексагональная архитектура (Порты и Адаптеры)

Гексагональная архитектура (Hexagonal Architecture / Ports and Adapters) — это паттерн проектирования, который ставит в центр приложения бизнес-логику (гексагон) и изолирует её от внешних систем с помощью **портов** (интерфейсов) и **адаптеров** (конкретных реализаций).

## 1. Суть паттерна: Порты и Адаптеры

Главная цель — сделать так, чтобы бизнес-логика не зависела от того, откуда приходят данные (API, LocalStorage, моки для тестов) и куда они выводятся (React-экран, CLI, PDF-генератор).

```text
                    ┌──────────────────────────────────────────────┐
                    │               Инфраструктура                 │
                    │                                              │
  Клиент ──────────►│ [Входящий адаптер] ──► [Входящий порт]       │
  (React / UI)      │                          │                   │
                    │                          ▼                   │
                    │                  ┌───────────────┐           │
                    │                  │ Бизнес-логика │           │
                    │                  └───────┬───────┘           │
                    │                          │                   │
                    │                          ▼                   │
  База данных ◄─────│ [Исходящий адаптер] ◄── [Исходящий порт]     │
  (API / Storage)   │                                              │
                    └──────────────────────────────────────────────┘
```

*   **Порты (Ports):** Это абстрактные интерфейсы, определяющие, *как* внешние модули могут общаться с ядром приложения (входящие) и *как* ядро общается с внешним миром (исходящие).
*   **Адаптеры (Adapters):** Это конкретные реализации. Входящий адаптер (например, React-компонент) вызывает методы порта. Исходящий адаптер (например, HTTP-клиент) реализует исходящий порт, общаясь с базой данных или сетью.

---

## 2. Практическая реализация на фронтенде

Представим систему авторизации. Нам нужно получить токен пользователя.

### 2.1. Исходящий порт (Описывается в ядре / Domain)
Мы создаем интерфейс `AuthService`, который описывает контракт для работы с авторизацией:

```typescript
// domain/ports/AuthService.ts
export interface UserSession {
  userId: string;
  token: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<UserSession>;
  logout(): Promise<void>;
}
```

### 2.2. Адаптеры (Инфраструктурный слой)
Мы можем реализовать этот порт несколькими способами.

#### Адаптер №1: Продакшен API (GraphQL/REST)
```typescript
// infrastructure/adapters/HttpAuthService.ts
import { AuthService, UserSession } from '../../domain/ports/AuthService';

export class HttpAuthService implements AuthService {
  async login(email: string, password: string): Promise<UserSession> {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Unauthorized');
    return response.json();
  }

  async logout(): Promise<void> {
    await fetch('/api/logout', { method: 'POST' });
  }
}
```

#### Адаптер №2: Мок-сервис для локальной разработки и тестов
```typescript
// infrastructure/adapters/MockAuthService.ts
import { AuthService, UserSession } from '../../domain/ports/AuthService';

export class MockAuthService implements AuthService {
  async login(email: string): Promise<UserSession> {
    // Мгновенный ответ без сетевых запросов
    return {
      userId: 'mock-id-999',
      token: 'mock-jwt-token-xyz'
    };
  }

  async logout(): Promise<void> {
    console.log('Mock logout called');
  }
}
```

### 2.3. Внедрение зависимостей (Dependency Inversion / DI) в UI
React-компонент общается только с интерфейсом `AuthService`. Конкретную реализацию мы передаем через Context или пропсы.

```tsx
// ui/LoginController.tsx
import React, { useState } from 'react';
import { AuthService } from '../domain/ports/AuthService';

interface Props {
  authService: AuthService; // Зависим только от порта (интерфейса)
}

export function LoginForm({ authService }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const session = await authService.login(email, password);
      console.log('Успешный вход, токен:', session.token);
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Войти</button>
    </form>
  );
}
```

---

## 3. В чем ценность для Lead-инженера?

1.  **Параллельная разработка:** Фронтенд-разработчик может написать интерфейсы (порты) и `MockAuthService`, полностью собрать весь UI и протестировать его до того, как бэкендеры настроят серверные эндпоинты. Когда бэкенд готов, мы просто заменяем адаптер.
2.  **Дешевые тесты:** Вместо настройки тяжелых моков для fetch/axios в Jest, мы просто прокидываем облегченный инстанс `MockAuthService` в тестируемый компонент.
3.  **Гибкость миграций:** Если проект мигрирует с REST на gRPC или AWS Amplify, мы переписываем только один класс-адаптер. Весь UI-код и бизнес-сценарии остаются абсолютно неизменными.
