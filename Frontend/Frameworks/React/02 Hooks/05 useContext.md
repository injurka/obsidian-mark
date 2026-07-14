# useContext

Хук `useContext` позволяет читать данные из React Context и подписываться на их изменения. Основная цель контекста — решение проблемы **Props Drilling** (передачи пропсов сквозь множество слоев компонентов).

## 1. Как это работает (3 шага)
1. **Создание:** `const ThemeContext = createContext('light');`
2. **Провайдер:** Обернуть часть дерева в `<ThemeContext.Provider value="dark">`
3. **Потребление:** Вызвать `const theme = useContext(ThemeContext);` в любом дочернем компоненте.

## 2. ⚠️ Главная проблема Контекста (Edge Case: Рендер-шторм)
Контекст — это отличный инструмент для редко меняющихся данных (тема, язык, авторизация пользователя). Но он **плохо подходит для часто меняющегося состояния**.

**Почему?** 
Потому что **ЛЮБОЙ** компонент, вызывающий `useContext(MyContext)`, будет **ре-рендериться каждый раз**, когда изменяется `value` в Провайдере, независимо от того, какая именно часть значения изменилась.

```jsx
const AppContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Alex' });

  // ❌ ПЛОХО: Изменение theme вызовет пересоздание всего объекта value!
  return (
    <AppContext.Provider value={{ theme, user, setTheme, setUser }}>
      <Navbar /> {/* Использует только user */}
      <ThemeToggle /> {/* Использует только theme */}
    </AppContext.Provider>
  );
}
```
В примере выше, если вы переключите тему, `<Navbar />` все равно сделает ре-рендер, хотя `user` не изменился!

### Как решать эту проблему?
1. **Мемоизация Value (Частичное решение):**
   ```jsx
   const value = useMemo(() => ({ theme, user }), [theme, user]);
   ```
2. **Разделение контекстов (Правильное решение для React):**
   Создавать отдельные контексты: `<ThemeProvider>` и `<UserProvider>`.
3. **Использование менеджеров состояний (Zustand, Redux):**
   Если у вас сложное состояние (много полей), лучше взять Zustand. Он позволяет компонентам подписываться только на конкретный "кусочек" (slice) состояния, избегая лишних ре-рендеров.

---

## 3. Использование `use` (React 19) вместо `useContext`
В React 19 появился новый хук `use()`, который может заменить `useContext`. 

**Главная особенность `use(Context)`:**
Его **МОЖНО** вызывать внутри условий (`if`) и циклов! Обычный `useContext` должен строго подчиняться правилам хуков и вызываться только на верхнем уровне.

```jsx
import { use } from 'react';

function Header({ isPremium }) {
  if (isPremium) {
    // В React 18 с useContext это вызвало бы ошибку! В React 19 с use() это работает.
    const premiumData = use(PremiumContext); 
    return <div>{premiumData.badge}</div>;
  }
  return <div>Standard</div>;
}
```
