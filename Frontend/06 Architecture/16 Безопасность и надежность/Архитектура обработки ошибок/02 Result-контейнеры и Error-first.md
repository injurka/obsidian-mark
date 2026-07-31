# Result-контейнеры (Monadic / Result objects) и Error-first pattern

## 1. Основная идея

Ожидаемые ошибки (доменные и инфраструктурные) — это не авария (не краш приложения), а **полноправный вариант развития событий**, то есть обычные данные. 

Вместо того чтобы прерывать выполнение через `throw`, функция «упаковывает» свой ответ в специальный контейнер. В этом контейнере лежит либо успешно вычисленный результат, либо информация об ошибке. 

**Главное преимущество:** Вызывающий код больше не может «случайно забыть» обернуть вызов в `try-catch`. Контейнер заставляет разработчика **явно** распаковать его и обработать оба сценария (успех и провал), прежде чем он сможет получить доступ к данным.

---

## 2. Типизированный Result-контейнер (`Result<TOk, TErr>`)

Этот паттерн раскрывает всю свою мощь при использовании **TypeScript**. Мы создаем тип, который может находиться только в одном из двух состояний (*discriminated union* — размеченное объединение).

### Пример реализации типов:

```typescript
// Описываем структуру успешного результата
type Success<T> = { ok: true; value: T };

// Описываем структуру ошибки
type Failure<E> = { ok: false; error: E };

// Контейнер — это либо одно, либо другое
type Result<T, E> = Success<T> | Failure<E>;

// Фабричные функции для удобного создания контейнеров
const Result = {
  success: <T>(value: T): Success<T> => ({ ok: true, value }),
  failure: <E>(error: E): Failure<E> => ({ ok: false, error })
};
```

### Пример использования:

Допустим, мы пишем функцию перевода денег. Недостаток средств — это ожидаемое бизнес-правило (доменная ошибка).

```typescript
// Явно описываем возможные ошибки домена
type TransferError = 'INSUFFICIENT_FUNDS' | 'ACCOUNT_BLOCKED';

// Сигнатура КРИЧИТ о том, что может пойти не так:
function transferMoney(amount: number, account: Account): Result<Transaction, TransferError> {
  if (account.isBlocked) {
    return Result.failure('ACCOUNT_BLOCKED'); // Возвращаем ошибку как значение
  }
  
  if (account.balance < amount) {
    return Result.failure('INSUFFICIENT_FUNDS');
  }

  const tx = executeTransaction(account, amount);
  return Result.success(tx);
}
```

### Распаковка контейнера вызывающим кодом:

```typescript
function handleUserAction() {
  // Мы получаем контейнер. Мы пока не имеем доступа к транзакции.
  const result = transferMoney(100, userAccount);

  // TypeScript не даст нам написать `result.value.id`, 
  // потому что мы не проверили состояние контейнера!

  if (!result.ok) {
    // Внутри этого блока TypeScript точно знает, что это Failure.
    // Автокомплит покажет `result.error` с типами 'INSUFFICIENT_FUNDS' | 'ACCOUNT_BLOCKED'
    if (result.error === 'INSUFFICIENT_FUNDS') {
      ui.showWarning("У вас недостаточно средств");
    } else {
      ui.showError("Ваш аккаунт заблокирован");
    }
    return; // Завершаем выполнение (Fail Fast)
  }

  // Если мы дошли сюда, TypeScript знает, что `result.ok` === true.
  // Теперь нам безопасно доступно `result.value`.
  ui.showSuccess(`Перевод успешен! ID: ${result.value.id}`);
}
```

> *В реальных проектах часто используют библиотеки `neverthrow` (в ней классы `ok` и `err`) или `fp-ts` (тип `Either`).*

---

## 3. Error-first pattern (Go-style / Node.js style)

Если `Result<T, E>` кажется слишком громоздким или проект написан на чистом JavaScript без строгой типизации, разработчики часто используют упрощенную версию контейнера — **кортежи (tuples)**.

Этот подход вдохновлен языком Go (где функции возвращают `value, error`) и коллбеками Node.js (`function(err, data)`). В мире `async/await` он используется для "выпрямления" асинхронного кода и избавления от глубокой вложенности `try-catch`.

**Суть паттерна:** Функция (или обертка) возвращает массив из двух элементов: `[ошибка, результат]`. Если первый элемент не пустой — значит, случилась проблема.

### Пример реализации утилиты-обертки:

```javascript
// Утилита, которая ловит Promise и упаковывает его в кортеж
async function safeAwait(promise) {
  try {
    const data = await promise;
    return [null, data]; // Успех: ошибка = null, данные = data
  } catch (error) {
    return [error, null]; // Провал: ошибка = error, данные = null
  }
}
```

### Пример использования (Go-style):

```javascript
async function getUserProfile(id) {
  // Деструктурируем кортеж
  const [userError, user] = await safeAwait(fetchUser(id));
  if (userError) {
    logger.error("Ошибка загрузки пользователя", userError);
    return null; // Прерываемся (Fail Fast)
  }

  // Если мы здесь, значит user загружен успешно
  const [postsError, posts] = await safeAwait(fetchPosts(user.id));
  if (postsError) {
    logger.error("Ошибка загрузки постов", postsError);
    return { ...user, posts: [] }; // Фолбэк сценарий
  }

  return { ...user, posts };
}
```

---

## 4. Плюсы и минусы Result-контейнеров

### Плюсы:
* **Идеальная документация в коде:** По сигнатуре функции сразу видно, какие конкретно ожидаемые ошибки она может вернуть.
* **Безопасность типов (в TS):** Компилятор заставляет написать обработку ошибки. Забыть обработать сбой невозможно.
* **Предсказуемый поток управления:** Выполнение программы не "прыгает" в блоки `catch`, а идет линейно.

### Минусы:
* **Многословность (Boilerplate):** Приходится писать много проверок `if (!result.ok) return result.error;` при последовательных вызовах.
* **Несовместимость с внешними API:** Встроенные функции JS (`JSON.parse`, `fetch`, `DOM API`) выбрасывают паники через `throw`. Для работы в парадигме Result-контейнеров требуются адаптеры.

---

## 5. Связанные заметки
- [[00 Обзор и таксономия ошибок]]
- [[03 Railway Oriented Programming (ROP)]]
- [[04 Гибридная архитектура обработки]]
