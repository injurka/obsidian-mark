# Разделение слоев (Domain, Infrastructure, UI)

Чистая архитектура (Clean Architecture) во фронтенде направлена на разделение бизнес-логики приложения и деталей реализации (библиотек, UI-фреймворка, API-клиентов). Это делает код расширяемым, легким в тестировании и независимым от изменений внешних библиотек.

## 1. Архитектурные Слои

Современный фронтенд можно разделить на три независимых слоя:

```text
               ┌──────────────────────────────────────┐
               │              UI Layer                │
               │ (React Components, Hooks, Views)     │
               └──────────────────┬───────────────────┘
                                  │ (Использует)
                                  ▼
               ┌──────────────────────────────────────┐
               │            Domain Layer              │
               │ (Entities, Use Cases, Core Logic)    │
               └──────────────────▲───────────────────┘
                                  │ (Реализует порты)
                                  ▼
               ┌──────────────────────────────────────┐
               │         Infrastructure Layer         │
               │ (API Clients, LocalStorage, SDKs)    │
               └──────────────────────────────────────┘
```

### 1.1. Domain Layer (Бизнес-логика)
Ядро приложения. Содержит только чистые функции и типы TypeScript.
* **Правило:** Domain-слой **не должен импортировать** ничего из внешнего мира (никаких `react`, `axios`, `window.localStorage` или UI-компонентов).
* **Что внутри:** 
  * **Entities (Сущности):** бизнес-модели (например, интерфейс `User` или класс `Cart`).
  * **Use Cases (Сценарии):** функции, реализующие бизнес-сценарии (например, `calculateCartDiscount` или `validatePassword`).
  * **Ports (Интерфейсы сервисов):** описания типов для внешних интеграций (например, `interface UserRepository`).

### 1.2. Infrastructure Layer (Инфраструктура)
Слой внешних деталей. Реализует интерфейсы (порты), описанные в доменном слое.
* **Что внутри:** API-клиенты (Axios/Fetch), обертки над LocalStorage/IndexedDB, интеграции с внешними SDK (например, Firebase, Stripe).
* **Пример:** Класс `ApiUserRepository`, реализующий интерфейс `UserRepository`.

### 1.3. UI Layer (Презентация)
Визуальное отображение и обработка действий пользователя.
* **Что внутри:** Компоненты (React/Vue), стили, клиентский стейт-менеджмент (Zustand/Redux), роутинг.
* **Специфика:** UI-компоненты вызывают сценарии (Use Cases) или обращаются к репозиториям через контекст/пропсы, не зная, как именно под капотом устроены сетевые запросы.

---

## 2. Практический пример: Корзина интернет-магазина

### 2.1. Доменный слой (`domain/cart.ts`)
```typescript
// Сущности
export interface CartItem {
  productId: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}

// Сценарий использования (Use Case) — чистая функция без побочных эффектов
export function calculateTotal(cart: Cart, discountCode?: string): number {
  const sum = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (discountCode === 'SENIOR_LEAD') {
    return sum * 0.9; // 10% скидка
  }
  return sum;
}
```

### 2.2. Инфраструктурный слой (`infrastructure/api.ts`)
```typescript
import { Cart } from '../domain/cart';

// Интерфейс порта для работы с API (может лежать в domain/ports.ts)
export interface CartRepository {
  fetchCart(): Promise<Cart>;
}

// Реализация инфраструктуры
export class HttpCartRepository implements CartRepository {
  async fetchCart(): Promise<Cart> {
    const response = await fetch('/api/cart');
    if (!response.ok) throw new Error('Ошибка загрузки корзины');
    return response.json();
  }
}
```

### 2.3. UI слой (`ui/CartComponent.tsx`)
```tsx
import React, { useEffect, useState } from 'react';
import { Cart, calculateTotal } from '../domain/cart';
import { CartRepository } from '../infrastructure/api';

interface Props {
  repository: CartRepository;
}

export function CartView({ repository }: Props) {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    repository.fetchCart().then(setCart).catch(console.error);
  }, [repository]);

  if (!cart) return <div>Загрузка...</div>;

  const total = calculateTotal(cart, 'SENIOR_LEAD');

  return (
    <div>
      <h2>Корзина</h2>
      <p>Итого к оплате (со скидкой): {total} руб.</p>
    </div>
  );
}
```

## 3. Преимущества подхода
* **Изолированное тестирование:** Вы можете протестировать функцию `calculateTotal` обычным юнит-тестом без необходимости мокать fetch или рендерить компоненты.
* **Легкая смена библиотек:** Если вы решите перейти с Axios на Fetch, изменения коснутся только инфраструктурного слоя. Domain и UI останутся нетронутыми.
* **Независимость от фреймворка:** Если завтра компания перейдет с React на Svelte, бизнес-логика (Domain) переносится в новый проект простым копированием файлов.
