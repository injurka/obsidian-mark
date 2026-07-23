# Паттерны проектирования в JavaScript

JavaScript — динамический мультипарадигменный язык с первоклассными функциями (First-Class Functions). Из-за этого многие классические объектно-ориентированные паттерны проектирования банды четырех (GoF) реализуются в JS гораздо проще, без создания избыточных классов и интерфейсов.

---

## 1. Поведенческие паттерны (Behavioral)

Описывают алгоритмы и распределение обязанностей между объектами.

### 1.1. Observer (Наблюдатель / Издатель-Подписчик)
Основа реактивного программирования. Позволяет объектам подписываться на события, происходящие в другом объекте.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Подписка на событие
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Возвращаем функцию отписки (unsubscribe)
    return () => {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    };
  }

  // Публикация события (оповещение подписчиков)
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Использование
const eventBus = new EventEmitter();
const unsubscribe = eventBus.subscribe('user_login', (user) => console.log(`Привет, ${user}!`));

eventBus.emit('user_login', 'Алексей'); // Выведет: Привет, Алексей!
unsubscribe(); // Отписка
```

### 1.2. Strategy (Стратегия)
Позволяет менять алгоритмы прямо во время выполнения программы на основе переданных параметров. В JS реализуется простым словарем функций.

```javascript
// Разные стратегии расчета скидки
const discountStrategies = {
  regular: (price) => price,
  vip: (price) => price * 0.8,
  blackFriday: (price) => price * 0.5,
};

// Контекст использования
function calculatePrice(price, customerType) {
  const strategy = discountStrategies[customerType] || discountStrategies.regular;
  return strategy(price);
}

console.log(calculatePrice(1000, 'vip')); // 800
console.log(calculatePrice(1000, 'blackFriday')); // 500
```

---

## 2. Порождающие паттерны (Creational)

Управляют созданием новых объектов.

### 2.1. Singleton (Одиночка)
Гарантирует, что у класса есть только один экземпляр, и предоставляет к нему глобальную точку доступа.
*   **Специфика JS:** Механизм ES-модулей кэширует результаты импорта. Экспортируя инстанс объекта из файла, мы автоматически получаем Singleton из коробки.

```javascript
// api-client.js
class ApiClient {
  constructor() {
    this.token = null;
  }
  setToken(token) { this.token = token; }
  getData() { /* ... */ }
}

// Экспортируем INSTANCE, а не сам класс
export const apiClient = new ApiClient();
```

### 2.2. Factory (Фабрика)
Позволяет создавать объекты, инкапсулируя сложную логику инициализации внутри одной функции.

```javascript
const createUser = (role, name) => {
  const baseUser = { name, createdAt: new Date() };
  
  if (role === 'admin') {
    return { ...baseUser, role, permissions: ['read', 'write', 'delete'] };
  }
  return { ...baseUser, role, permissions: ['read'] };
};

const admin = createUser('admin', 'Иван');
```

---

## 3. Структурные паттерны (Structural)

Помогают строить иерархии из множества объектов.

### 3.1. Adapter (Адаптер)
Преобразует интерфейс одного модуля в интерфейс, который ожидает другой модуль. Часто используется при замене сторонних библиотек.

```javascript
// Устаревшая библиотека логирования
class LegacyLogger {
  logWarning(msg) { console.warn('WARNING: ' + msg); }
}

// Новый интерфейс, который мы хотим использовать в коде
interface NewLogger {
  warn(message: string): void;
}

// Класс-Адаптер
class LoggerAdapter implements NewLogger {
  constructor(private legacyLogger: LegacyLogger) {}

  warn(message: string) {
    this.legacyLogger.logWarning(message); // Перенаправляем вызов
  }
}
```

### 3.2. Proxy (Заместитель)
Позволяет перехватывать обращения к объекту, контролируя чтение и запись его свойств. Нативный API `Proxy` в JS лежит в основе реактивности фреймворков (например, Vue 3).

```javascript
const originalUser = { name: 'Алексей', age: 25 };

// Создаем прокси для валидации изменений
const userProxy = new Proxy(originalUser, {
  set(target, prop, value) {
    if (prop === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new TypeError('Возраст должен быть положительным числом');
      }
    }
    target[prop] = value;
    return true; // Подтверждаем успешную запись
  }
});

userProxy.age = 30; // Успешно
// userProxy.age = -5; // Бросит ошибку: TypeError
```
