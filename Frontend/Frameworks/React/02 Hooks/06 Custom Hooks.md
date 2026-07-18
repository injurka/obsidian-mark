
Пользовательские хуки — это механизм переиспользования **логики, содержащей состояние** (stateful logic), между различными компонентами.

## 1. Правила Custom Hooks
- Имя функции **обязано** начинаться с префикса `use` (например, `useFetch`, `useWindowSize`). Это нужно для того, чтобы линтер React мог применять Правила Хуков (проверять отсутствие условий, порядок вызова) к вашей функции.
- Внутри кастомного хука можно (и нужно) вызывать встроенные хуки (`useState`, `useEffect` и др.).

## 2. Главное заблуждение (Edge Case)
**Кастомные хуки переиспользуют ЛОГИКУ, а не САМО СОСТОЯНИЕ.**

Если вы вызовете один и тот же кастомный хук в двух разных компонентах, они получат **абсолютно независимые** копии состояния.

```jsx
function useCounter() {
  const [count, setCount] = useState(0);
  return { count, increment: () => setCount(c => c + 1) };
}

function ComponentA() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>A: {count}</button>;
}

function ComponentB() {
  const { count, increment } = useCounter();
  return <button onClick={increment}>B: {count}</button>; // Нажатие здесь НЕ изменит count в ComponentA!
}
```
*Если вам нужно, чтобы состояние было общим (разделяемым) между компонентами, используйте Context или глобальный стейт-менеджер (Zustand).*

## 3. Популярные примеры

### А. `useFetch` (Извлечение данных)
Самый классический пример на собеседованиях. Демонстрирует объединение состояния загрузки, данных и ошибок.
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController нужен для отмены запроса, если компонент размонтируется
    const abortController = new AbortController(); 
    setLoading(true);
    
    fetch(url, { signal: abortController.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err);
      })
      .finally(() => setLoading(false));

    return () => abortController.abort(); // Cleanup
  }, [url]);

  return { data, loading, error };
}
```

### Б. `useLocalStorage` (Синхронизация с API браузера)
Демонстрирует ленивую инициализацию состояния.
```jsx
function useLocalStorage(key, initialValue) {
  // Ленивая инициализация, чтобы не читать localStorage каждый рендер
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```
