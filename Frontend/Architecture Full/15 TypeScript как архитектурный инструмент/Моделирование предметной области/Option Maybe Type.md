# Option / Maybe Type

## История и суть

Проблема "NullPointerException" (или в мире JS — `Uncaught TypeError: Cannot read property 'foo' of undefined`) известна как "ошибка на миллиард долларов". В JavaScript принято использовать `null` или `undefined` для обозначения отсутствия значения. Однако это часто приводит к глубоким и уродливым проверкам: `if (user && user.address && user.address.street)`.

В функциональном программировании (Haskell, Rust, Scala) эту проблему решают типом **Option** (или **Maybe**). Это контейнер, который либо содержит значение (`Some`), либо не содержит ничего (`None`). 

Использование Option в TypeScript заставляет программиста явно обрабатывать случай отсутствия данных на уровне системы типов, делая невозможным случайное обращение к `null`.

## Визуализация

```mermaid
graph LR
    A[Попытка получить данные] --> B{Option Type}
    B -->|Есть значение| C(Some)
    B -->|Нет значения| D(None)
    
    C --> E[Безопасное извлечение значения]
    D --> F[Явная обработка отсутствия]
```

## Примеры кода

### ❌ Анти-паттерн: Использование null/undefined

```typescript
function findUser(id: string): User | undefined {
  // ...
}

const user = findUser("123");
// Если забыть проверку, словим баг в рантайме
console.log(user.name); // TS может ругнуться (strictNullChecks), но часто спасаются через ! или ?
```

### ✅ Как надо: Контейнер Option

```typescript
// Простейшая реализация
type Some<T> = { _tag: 'Some'; value: T };
type None = { _tag: 'None' };
type Option<T> = Some<T> | None;

const some = <T>(value: T): Option<T> => ({ _tag: 'Some', value });
const none = (): Option<never> => ({ _tag: 'None' });

function findUserOpt(id: string): Option<User> {
  const user = db.find(id);
  return user ? some(user) : none();
}

const userOpt = findUserOpt("123");

// Мы вынуждены сделать явный матчинг:
if (userOpt._tag === 'Some') {
  console.log(userOpt.value.name);
} else {
  console.log("User not found");
}
```

*Примечание: В реальных проектах используют библиотеки fp-ts или effect, которые предоставляют методы `map`, `flatMap`, `getOrElse` для работы с Option без явных `if/else`.*

## Неочевидные нюансы и границы применимости

- **Идиоматика TypeScript**: TypeScript обладает встроенными механизмами: Optional Chaining (`?.`) и Nullish Coalescing (`??`), а также `strictNullChecks`. Для 90% задач фронтенда встроенных фич достаточно. Внедрение `Option/Some/None` может показаться чужеродным для JS-разработчиков.
- **Оверхед на упаковку**: Оборачивание значений в объекты `Some`/`None` создает нагрузку на сборщик мусора (GC).
- **Сложность композиции**: Без использования специальных библиотек (которые предоставляют монадические операции `flatMap`), код с множественными Option превращается в "callback hell" из проверок `_tag`.
- **Где применимо**: В ядрах сложной бизнес-логики, где нужно строить цепочки вычислений, которые могут прерваться на любом шаге из-за отсутствия данных.
