
Принципы SOLID изначально проектировались для ООП-языков (Java, C++), но их идеи отлично перекладываются на современный функционально-компонентный фронтенд (React, Vue, TypeScript).

---

## 1. S — Single Responsibility Principle (Принцип единственной ответственности)
> У модуля/компонента должна быть только одна причина для изменения.

### Плохая практика:
Компонент, который сам загружает данные по сети, управляет состоянием, фильтрует массив и рендерит UI. При изменении API-эндпоинта, логики фильтрации или стилей кнопки нам придется переписывать этот файл.

### Хорошая практика:
Разбиваем компонент на:
1.  Кастомный хук `useUsers` (отвечает только за получение данных).
2.  Чистую функцию `filterUsers` (отвечает только за бизнес-логику фильтрации).
3.  Компонент списка `UserList` (отвечает только за отрисовку структуры).

---

## 2. O — Open/Closed Principle (Принцип открытости/закрытости)
> Программные сущности должны быть открыты для расширения, но закрыты для модификации.

Мы должны расширять поведение компонента без редактирования его внутреннего кода.

### Плохая практика:
Внедрение флагов внутрь компонента при каждом новом требовании:
```tsx
// Приходится править код компонента при добавлении новой иконки или поведения
function Button({ label, isLink, hasIcon, isAdmin }: Props) {
  if (isLink) return <a href="#">{label}</a>;
  if (isAdmin) return <button className="red">{label} (Admin)</button>;
  return <button>{label}</button>;
}
```

### Хорошая практика (Композиция / Render Props / Children):
```tsx
// Компонент закрыт для изменений, но открыт для расширения через children
function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props}>{children}</button>;
}
// Использование: <Button><Icon /> Купить</Button>
```

---

## 3. L — Liskov Substitution Principle (Принцип подстановки Барбары Лисков)
> Наследники должны дополнять, а не ломать поведение базовых классов/элементов.

В веб-компонентах это означает, что кастомный оберточный элемент должен безболезненно заменять стандартный HTML-тег.

### Хорошая практика:
Создавая компонент `CustomInput`, мы должны расширять базовый тип инпута и прокидывать все атрибуты на нативный элемент, не ломая стандартное поведение (например, фокус или автозаполнение).

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function CustomInput({ label, ...restProps }: InputProps) {
  return (
    <label>
      <span>{label}</span>
      {/* Прокидываем все нативные атрибуты: placeholder, disabled, onChange и т.д. */}
      <input {...restProps} />
    </label>
  );
}
```

---

## 4. I — Interface Segregation Principle (Принцип разделения интерфейса)
> Клиенты не должны зависеть от интерфейсов/данных, которые они не используют.

### Плохая практика:
Передача огромного объекта данных (например, сущности User со 100 полями) внутрь мелкого компонента `Avatar`, которому нужна только ссылка на фото.
```tsx
// Если структура объекта User поменяется на бэкенде, нам придется переписывать Avatar
function Avatar({ user }: { user: User }) {
  return <img src={user.profile.details.avatarUrl} />;
}
```

### Хорошая практика:
Компонент должен требовать только те пропсы, которые ему необходимы для рендеринга.
```tsx
function Avatar({ avatarUrl }: { avatarUrl: string }) {
  return <img src={avatarUrl} alt="Avatar" />;
}
```

---

## 5. D — Dependency Inversion Principle (Принцип инверсии зависимостей)
> Модули верхних уровней не должны зависеть от модулей нижних уровней. Оба должны зависеть от абстракций.

### Плохая практика:
Компонент импортирует конкретную глобальную библиотеку аналитики напрямую:
```tsx
import { googleAnalytics } from './vendors/ga';

function BuyButton() {
  // Жесткая связь. Нельзя заменить на Yandex Metrika без переписывания кнопки
  const handleClick = () => googleAnalytics.track('click_buy');
  return <button onClick={handleClick}>Купить</button>;
}
```

### Хорошая практика:
Абстрагируем сервис отправки аналитики через React Context (или пропсы). Компонент зависит от интерфейса трекера, а не от конкретной библиотеки.

```tsx
// 1. Описываем абстрактный контракт
interface AnalyticsTracker {
  trackEvent(event: string): void;
}

// 2. Внедряем через контекст
const AnalyticsContext = React.createContext<AnalyticsTracker | null>(null);

function BuyButton() {
  const tracker = useContext(AnalyticsContext);
  
  const handleClick = () => {
    tracker?.trackEvent('click_buy');
  };

  return <button onClick={handleClick}>Купить</button>;
}
```
