
С выходом React 19 (в рамках Server Actions и улучшенной работы с асинхронностью) появилось несколько мощных хуков.

## 1. `use`
Это уникальный API, который ломает старые правила хуков. **`use` можно вызывать внутри условий (`if`) и циклов!**

Он может "читать" две вещи:
1. **Промисы (Promises):** Приостанавливает (suspend) рендер компонента до разрешения промиса (работает в паре с `<Suspense>`).
2. **Контекст (Context):** Заменяет `useContext`.

```jsx
import { use, Suspense } from 'react';

// Чтение контекста в условии
function Header({ themePromise, isPremium }) {
  if (isPremium) {
    const theme = use(ThemeContext); // Работает!
  }

  // Чтение промиса (без useEffect и состояний загрузки!)
  const data = use(themePromise); 
  return <div>{data.title}</div>;
}

// Родитель должен обернуть компонент в Suspense
// <Suspense fallback={<Spinner />}><Header themePromise={fetchData()} /></Suspense>
```

---

## 2. `useOptimistic`
Служит для создания "оптимистичных интерфейсов" — когда вы мгновенно обновляете UI, не дожидаясь ответа от сервера. Если сервер выдаст ошибку, состояние автоматически "откатится" назад.

**Пример: Лайк поста.**
```tsx
import { useOptimistic } from 'react';

function LikeButton({ post, onLikeAction }) {
  // 1-й аргумент: базовое состояние (из пропсов или БД)
  // 2-й аргумент: функция обновления (текущее + оптимистичное добавление)
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (currentLikes, amount) => currentLikes + amount
  );

  const handleAction = async () => {
    // 1. Мгновенно обновляем UI
    addOptimisticLike(1); 
    // 2. Отправляем запрос на сервер (Server Action)
    await onLikeAction(post.id); 
    // Если onLikeAction упадет, optimisticLikes автоматически вернется к post.likes!
  };

  return <button onClick={handleAction}>Лайки: {optimisticLikes}</button>;
}
```

---

## 3. `useActionState` (ранее `useFormState`)
Используется для управления состоянием форм, работающих через **Server Actions**. Позволяет легко обрабатывать ошибки валидации с сервера и получать стейт формы без сложных `onSubmit` с `e.preventDefault()`.

```tsx
import { useActionState } from 'react';
import { updateProfile } from './actions'; // Серверная функция

function ProfileForm() {
  // updateProfile - Server Action
  // null - начальное состояние (initial state)
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  return (
    <form action={formAction}>
      <input name="username" />
      <button disabled={isPending}>
        {isPending ? 'Сохранение...' : 'Сохранить'}
      </button>
      
      {/* Если сервер вернул ошибку, выводим ее */}
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
```

---

## 4. `useFormStatus`
Используется **внутри** дочерних компонентов формы для получения ее статуса (`pending`, `data`, `method`, `action`), не прибегая к Props Drilling или Context.

**Edge Case / Правило:** `useFormStatus` работает ТОЛЬКО если компонент отрендерен ВНУТРИ тега `<form>`. В компоненте, который сам содержит тег `<form>`, он работать не будет (будет всегда возвращать `pending: false`).

```tsx
import { useFormStatus } from 'react-dom';

// Выносим кнопку в отдельный компонент
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button disabled={pending}>
      {pending ? 'Отправка данных...' : 'Отправить'}
    </button>
  );
}

// Форма
function AppForm() {
  return (
    <form action={myServerAction}>
      <input type="text" name="name" />
      <SubmitButton /> {/* Кнопка сама узнает статус родительской формы! */}
    </form>
  );
}
```
