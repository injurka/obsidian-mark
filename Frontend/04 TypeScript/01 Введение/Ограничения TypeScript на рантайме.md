# Ограничения TypeScript на рантайме

## Описание

> [!info] 
> Главное ограничение TypeScript заключается в том, что он не существует во время выполнения программы (рантайме). Все проверки типов происходят исключительно во время компиляции. В рантайме выполняется обычный JavaScript, который ничего не знает о типах TS.

Следствием этого является иллюзия типобезопасности: если данные приходят из неконтролируемого внешнего источника (REST API, локальное хранилище, пользовательский ввод) и мы используем утверждение типа (Type Assertion, например `as User`), TypeScript будет "верить" нам, но в реальности структура данных может не совпадать. Это приведет к ошибкам TypeError в рантайме.

## Примеры использования

```typescript
interface User {
    id: number;
    name: string;
}

// Плохая практика: мы "обманываем" компилятор
async function fetchUser(): Promise<User> {
    const response = await fetch('/api/user');
    // Мы говорим TS: "верь мне, там User", но API может вернуть что угодно
    const data = await response.json() as User; 
    return data;
}

// Хорошая практика: валидация в рантайме с помощью Type Guards
function isUser(obj: any): obj is User {
    return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj;
}

async function fetchUserSafe(): Promise<User> {
    const response = await fetch('/api/user');
    const data = await response.json();
    
    if (!isUser(data)) {
        throw new Error("Invalid payload");
    }
    return data;
}
```

## Особенности и нюансы

- **Отсутствие рефлексии типов**: Встроенных способов получить информацию о типах интерфейса в рантайме нет (в отличие от C# или Java). Нельзя итерироваться по ключам интерфейса.
- **Type Casting vs Type Assertion**: TypeScript не делает приведение типов (Casting) на уровне значений, он лишь делает "утверждение" (Assertion) для компилятора (`as Type`). Реальное значение объекта при этом не меняется.
- **Подводный камень (Any и Unknown)**: Злоупотребление `any` полностью отключает статический анализ. Внешние данные лучше типизировать как `unknown` и валидировать перед использованием.

## Связанные темы
- [[Карта знаний TypeScript]]
