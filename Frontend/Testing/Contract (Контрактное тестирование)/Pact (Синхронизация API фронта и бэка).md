# Pact (Синхронизация API фронта и бэка)

Контрактное тестирование (Contract Testing) — это методология тестирования интеграции между двумя сервисами (например, фронтенд-клиентом — Consumer и бэкенд-сервисом — Provider) на основе согласованного **контракта**, описывающего структуру запросов и ответов.

---

## 1. Концепция Consumer-Driven Contracts

В традиционном подходе бэкенд диктует структуру API, а фронтенд под нее подстраивается. При изменении API на бэкенде тесты фронтенда часто не замечают этого, и баги всплывают в продакшене.

**Consumer-Driven Contracts (Контракты, управляемые потребителем)** переворачивают схему:
1.  **Фронтенд (Consumer)** описывает свои требования к API: какие эндпоинты он вызывает, какие параметры шлет и какие именно поля (и какого типа) ожидает получить в ответ.
2.  Фронтенд запускает контрактный тест. Тест генерирует артефакт — **Pact JSON-файл** (контракт).
3.  Этот контракт отправляется на бэкенд.
4.  **Бэкенд (Provider)** запускает тест верификации контракта. Тест берет Pact-файл, отправляет описанные там запросы на реальный бэкенд и проверяет, что ответы соответствуют ожиданиям фронтенда.

```text
[Фронтенд (Consumer)] ──► 1. Запуск теста ──► 2. Генерация Pact JSON (Контракт)
                                                    │
                                                    ▼ (Публикация)
[Бэкенд (Provider)]  ◄── 4. Проверка контракта ◄── 3. Pact Broker (Хранилище)
```

---

## 2. Написание контрактного теста на фронтенде (Pact JS)

Для создания контракта на фронтенде мы настраиваем мок-сервер Pact, который перехватывает запросы и записывает ожидания.

```typescript
import { Pact } from '@pact-foundation/pact';
import path from 'path';

// 1. Настройка Pact Mock Provider
const provider = new Pact({
  consumer: 'Frontend-App',
  provider: 'User-Service',
  port: 1234,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'), // Сюда запишется JSON контракт
  spec: 2,
});

describe('User API Contract Test', () => {
  beforeAll(() => provider.setup());
  afterAll(() => provider.finalize());

  describe('when a request for user details is made', () => {
    beforeAll(() => {
      // 2. Описываем ожидаемое взаимодействие (Interaction)
      return provider.addInteraction({
        state: 'user with ID 105 exists',
        uponReceiving: 'a request for user 105',
        withRequest: {
          method: 'GET',
          path: '/users/105',
        },
        withResponse: {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          // Используем Pact Matchers для валидации ТИПОВ данных, а не жестких значений
          body: {
            id: 105,
            name: 'Алексей',
            email: 'alex@example.com'
          },
        },
      });
    });

    it('should receive user details matching the contract', async () => {
      // 3. Вызываем наш реальный API-клиент, направив его на мок-сервер Pact
      const response = await fetch('http://localhost:1234/users/105').then(res => res.json());
      
      expect(response.id).toEqual(105);
      expect(response.name).toEqual('Алексей');
      
      // 4. Проверяем, что мок-сервер зафиксировал успешный вызов
      await provider.verify();
    });
  });
});
```

---

## 3. Pact Broker и проверка в CI/CD (can-i-deploy)

**Pact Broker** — это централизованный сервер (обычно поднимается в Docker или используется облачный PactFlow), где хранятся все сгенерированные контракты.

### Интеграция в CI/CD:
1.  При сборке фронтенда в CI запускаются контрактные тесты, генерируется Pact-файл и публикуется в Pact Broker.
2.  При сборке бэкенда в CI скачиваются актуальные контракты от фронтенда, проверяются на сервере, результаты проверки (успешно/ошибка) отправляются обратно в Broker.
3.  Перед деплоем в продакшен любого из сервисов запускается утилита **`can-i-deploy`**:
    ```bash
    pact-broker can-i-deploy       --pacticipant Frontend-App --version $GIT_COMMIT       --pacticipant User-Service --to-environment production
    ```
    Утилита проверяет матрицу совместимости в брокере. Если бэкенд провалил верификацию контракта этой версии фронтенда, `can-i-deploy` вернет код ошибки и **заблокирует деплой**, предотвращая падение продакшена.
