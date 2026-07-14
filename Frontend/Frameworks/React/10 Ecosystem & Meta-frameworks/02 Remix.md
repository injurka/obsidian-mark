# Remix (React Router v7)

Remix — это мета-фреймворк, созданный авторами оригинального React Router. В 2026 году граница между Remix и React Router стерлась (Remix по сути стал React Router v7).

## 1. Философия: Использование веб-стандартов
В то время как Next.js придумывает свои собственные абстракции (например, патчит глобальную функцию `fetch`, добавляя туда свои параметры кэширования), Remix использует чистые **Web Fetch API** стандарты.

В Remix функции получают объекты `Request` и возвращают объекты `Response`. Тот же код можно запустить в браузере, в Node.js, в Cloudflare Workers или Deno без изменений.

## 2. Разница в рендеринге (Нет SSG/ISR)
Частый вопрос на собеседовании: *"Как сделать SSG в Remix?"*
**Ответ:** Никак. Создатели Remix принципиально отказались от SSG (генерации статики при сборке).

Remix **всегда** использует SSR (динамический серверный рендер).
**Как же достигается скорость?**
Через правильное использование HTTP-заголовков кэширования (на уровне CDN). Вы возвращаете заголовок `Cache-Control: s-maxage=60, stale-while-revalidate=300`. CDN закэширует ответ, и он будет отдаваться пользователям так же быстро, как статика в Next.js.

## 3. Архитектура: Loaders и Actions
Эта архитектура теперь является основой React Router v7 (см. соответствующий файл в папке Routing).

- **`loader`** — выполняется на сервере для получения данных (GET-запросы).
- **`action`** — выполняется на сервере для изменения данных (POST, PUT, DELETE).

```tsx
// loader: Читаем сессию и базу
export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  return json(user); // Возвращаем стандартный Response
}

// action: Обрабатываем форму
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  await updateProfile(formData);
  return redirect('/profile');
}
```

## 4. ⚠️ Edge Case: Progressive Enhancement (Постепенное улучшение)
Главная фишка Remix. 
Поскольку мутации (Actions) вызываются через обычный тег `<Form>`, ваше приложение **будет работать даже с полностью отключенным JavaScript** в браузере.
Браузер сам сделает POST-запрос, сервер обработает `action` и вернет новую HTML-страницу.
Когда JS включен (и загружен), Remix просто перехватывает это событие (через `e.preventDefault()`) и делает то же самое через `fetch`, не перезагружая страницу (SPA-навигация).
