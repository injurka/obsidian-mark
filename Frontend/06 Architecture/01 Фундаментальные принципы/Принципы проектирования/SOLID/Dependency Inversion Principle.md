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