# Обработка ошибок: try..catch..finally в JavaScript

## 1. Зачем нужна обработка ошибок
Любые runtime-ошибки (ошибки выполнения, такие как обращение к несуществующей переменной или сбой сети) прерывают выполнение скрипта. Конструкция `try...catch` позволяет изолировать потенциально нестабильный код и обработать возникшие исключения без падения всего приложения.

---

## 2. Базовая конструкция `try...catch`
Синтаксис состоит из двух основных блоков: `try` (попытка выполнить код) и `catch` (обработка ошибки, если она возникла).

### Синтаксис
```javascript
try {
  // Код, который может вызвать ошибку
} catch (error) {
  // Код, выполняемый только в случае ошибки
}
```

### Пример 1: Обработка ошибок при работе с JSON.parse
Наиболее классический пример — разбор строки JSON, полученной из внешнего источника.
```javascript
const jsonString = '{ "name": "Анна", "age": 28 '; // Невалидный JSON (нет закрывающей скобки)

try {
  const user = JSON.parse(jsonString);
  console.log(`Имя пользователя: ${user.name}`);
} catch (error) {
  console.error("Произошла ошибка при парсинге JSON!");
  console.error(`Тип ошибки: ${error.name}`);
  console.error(`Сообщение: ${error.message}`);
}
```

### Свойства встроенного объекта Error:
- `name` — тип ошибки (например, `SyntaxError`, `ReferenceError`, `TypeError`).
- `message` — текстовое описание ошибки.
- `stack` — стек вызовов на момент создания ошибки (полезно для отладки).

### Опциональный catch binding (ES2019)
Если сам объект ошибки не нужен для логики обработки, круглые скобки после `catch` можно опустить:
```javascript
try {
  // Попытка операции
} catch {
  console.log("Что-то пошло не так, но детали нам не важны.");
}
```

---

## 3. Блок `finally` и его гарантии
Блок `finally` выполняется **всегда**, вне зависимости от того, завершился ли блок `try` успешно или в нем произошла ошибка, перехваченная в `catch`.

### Гарантия выполнения при return
Даже если внутри блоков `try` или `catch` вызывается инструкция `return`, управление сначала передается в блок `finally`, и только после его завершения происходит фактический возврат из функции.

```javascript
function calculate() {
  try {
    console.log("Выполнение в блоке try");
    return "Результат из try";
  } catch (err) {
    return "Результат из catch";
  } finally {
    console.log("Блок finally выполняется ВСЕГДА!");
  }
}

const result = calculate();
console.log(result);
// Вывод:
// 1. Выполнение в блоке try
// 2. Блок finally выполняется ВСЕГДА!
// 3. Результат из try
```

### Переопределение возвращаемого значения в `finally`
*Внимание:* Если в блоке `finally` написать собственный `return`, он перезапишет возвращаемое значение из блоков `try` или `catch`. Это считается плохой практикой, но об этом важно помнить.
```javascript
function badPractice() {
  try {
    return "Первый";
  } finally {
    return "Второй"; // Перезапишет "Первый"
  }
}
console.log(badPractice()); // Выведет "Второй"
```

### Типичное применение `finally`
Очистка ресурсов, закрытие файловых дескрипторов, сетевых соединений или отключение индикаторов загрузки (loading) в веб-интерфейсах:
```javascript
let isLoading = true;

try {
  // Имитация сетевого запроса
  if (Math.random() > 0.5) throw new Error("Сбой сети");
  console.log("Данные загружены");
} catch (err) {
  console.error("Ошибка загрузки данных:", err.message);
} finally {
  isLoading = false; // Состояние загрузки сбросится в любом случае
  console.log(`Загрузка завершена. isLoading = ${isLoading}`);
}
```

---

## 4. Ограничения `try...catch` и асинхронный код

### Синхронность конструкции
`try...catch` работает только с синхронным кодом. Если ошибка возникает в асинхронном контексте (например, внутри `setTimeout`), `try...catch` ее не поймает.

```javascript
// ОШИБКА: try...catch завершится до того, как сработает коллбэк setTimeout
try {
  setTimeout(() => {
    throw new Error("Асинхронная ошибка!"); // Не будет перехвачена этим catch
  }, 1000);
} catch (error) {
  console.error("Этого сообщения не будет в консоли");
}
```

### Решение для асинхронного кода
1. Помещать `try...catch` непосредственно внутрь асинхронного коллбэка.
2. Использовать `async/await` конструкции, которые позволяют обрабатывать асинхронные ошибки как синхронные.

```javascript
// Правильный подход с async/await:
async function fetchData() {
  try {
    const response = await fetch("https://invalid-api-url.xyz");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Перехвачена асинхронная ошибка fetch:", error.message);
  }
}
fetchData();
```

---

## 5. Генерация собственных ошибок (`throw`) и проброс (Rethrowing)

### Оператор `throw`
С помощью оператора `throw` можно сгенерировать ошибку принудительно. В качестве аргумента можно передать любой тип данных, но хорошей практикой является использование стандартных объектов ошибок (или унаследованных от них).
```javascript
const userJson = '{ "age": 30 }'; // Нет обязательного поля "name"

try {
  const user = JSON.parse(userJson);
  if (!user.name) {
    throw new SyntaxError("Данные неполные: отсутствует имя"); // Генерируем стандартную ошибку
  }
} catch (err) {
  console.error(`Ошибка валидации: ${err.message}`);
}
```

### Проброс ошибок (Rethrowing)
Блок `catch` должен обрабатывать только те ошибки, о которых он знает. Все остальные непредвиденные ошибки (например, программные опечатки) следует пробрасывать дальше, чтобы они всплывали на уровень выше.

```javascript
function processUserData(json) {
  try {
    const user = JSON.parse(json);
    if (!user.name) {
      throw new ValidationError("Отсутствует имя"); // Наша кастомная ошибка валидации
    }
  } catch (err) {
    if (err instanceof SyntaxError || err.name === "ValidationError") {
      console.log(`Корректно обработанная ошибка: ${err.message}`);
    } else {
      console.warn("Неизвестная ошибка! Пробрасываем дальше.");
      throw err; // Проброс ошибки
    }
  }
}

try {
  // Вызов функции с ошибкой ReferenceError внутри (например, обращение к несуществующей переменной)
  processUserData('{ "name": "Иван" }'); // Ошибка ReferenceError будет проброшена наружу
} catch (err) {
  console.error(`Перехвачена глобальная ошибка: ${err.name} -> ${err.message}`);
}
```

---

## 6. Связанные заметки
- [[Пользовательские ошибки]] — Создание собственных классов ошибок.
- [[Асинхронность/async~await|async~await]] — Синтаксический сахар над промисами и обработка ошибок в них.
- [[Асинхронность/Promise/Promise|Promise]] — Обработка ошибок с помощью метода `.catch()`.

## 7. Источники
- [MDN Web Docs: Инструкция try...catch](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN Web Docs: Оператор throw](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/throw)
- [Learn.javascript.ru: Обработка ошибок, "try..catch"](https://learn.javascript.ru/try-catch)
