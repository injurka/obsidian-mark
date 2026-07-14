# Server Actions & Mutations (Мутации)

Server Actions — это механизм, позволяющий вызывать серверные функции напрямую из клиентского кода (или из серверных компонентов) без необходимости вручную создавать API-эндпоинты (REST или GraphQL роуты). По сути, это встроенный в React RPC (Remote Procedure Call).

## 1. Как объявляются Server Actions
Серверная функция должна быть помечена директивой `"use server"`. Эту директиву можно написать внутри функции (если она в серверном компоненте) или на самом верху отдельного файла.

```tsx
// actions.ts
'use server'; // Все экспортируемые функции в этом файле станут Server Actions

import db from '@/lib/db';

export async function updateUser(formData: FormData) {
  const name = formData.get('name');
  await db.user.update({ name });
  // Возвращаем результат
  return { success: true }; 
}
```

## 2. Как вызывать Server Actions

### А. Из форм (Progressive Enhancement)
Самый мощный способ — передать Action прямо в атрибут `action` тега `<form>`.

```tsx
import { updateUser } from './actions';

export default function Profile() {
  return (
    // При сабмите формы React сам сериализует поля и отправит их на сервер
    <form action={updateUser}>
      <input name="name" type="text" />
      <button type="submit">Обновить</button>
    </form>
  );
}
```
**Главный плюс (Edge Case):** Это работает **даже если JavaScript в браузере отключен** или еще не успел загрузиться! Браузер просто выполнит нативный POST-запрос, а мета-фреймворк его перехватит. Это называется *Progressive Enhancement (Постепенное улучшение)*.

### Б. Из клиентских обработчиков (onClick, useEffect)
Вы можете вызывать их как обычные асинхронные функции из Client Components.

```tsx
'use client';
import { deleteItem } from './actions';

export function DeleteBtn({ id }) {
  return (
    <button onClick={async () => {
      await deleteItem(id);
      alert('Удалено!');
    }}>
      Удалить
    </button>
  );
}
```

## 3. Ревалидация (Обновление интерфейса после мутации)
После того, как вы изменили данные в базе (например, обновили имя пользователя), вам нужно сказать фреймворку (например, Next.js), что кэш страницы устарел, чтобы он перерисовал UI с новыми данными.

```tsx
'use server';
import { revalidatePath } from 'next/cache';

export async function updateUser(formData) {
  await db.user.update(formData);
  // Говорим Next.js: "Сбрось кэш для страницы профиля и отрендери её заново на сервере"
  revalidatePath('/profile'); 
}
```
**Как это работает:** При вызове `revalidatePath`, сервер генерирует свежий RSC Payload с обновленным именем пользователя и отправляет его в браузер. Браузер "бесшовно" обновляет только ту часть DOM, которая изменилась, сохраняя состояние клиентских компонентов (например, фокус в инпутах)!

## 4. ⚠️ Критические вопросы безопасности (Must know!)
Server Actions публично доступны. Если вы создали Server Action, злоумышленник может открыть консоль браузера и просто сделать POST-запрос к вашему приложению с нужным Payload, симулируя вызов функции.

**Ошибки новичков (Антипаттерны):**
1. **Доверие клиенту:** Нельзя доверять данным, которые приходят в аргументах. **Всегда** валидируйте их (например, с помощью библиотеки Zod).
2. **Отсутствие проверок авторизации:** Тот факт, что кнопка с Server Action не отрендерилась для гостя, не означает, что гость не может вызвать этот Action вручную. Вы **обязаны** проверять сессию внутри самого Action.

```tsx
// ❌ ПЛОХО: Нет защиты
export async function deleteUser(userId) {
  await db.user.delete(userId); // Кто угодно может подставить любой ID
}

// ✅ ХОРОШО: Проверка авторизации и валидация
export async function deleteUser(userId) {
  const session = await getSession(); // Проверяем, кто вызывает функцию
  if (!session || session.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  
  if (session.id === userId) {
     throw new Error('Нельзя удалить самого себя');
  }

  await db.user.delete(userId);
}
```
