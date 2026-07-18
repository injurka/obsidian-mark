
## 1. useRef
Хук `useRef` возвращает мутабельный объект (ref object) со свойством `.current`. У него есть два основных применения:

### А. Доступ к DOM-элементам
Самый частый кейс — получение прямой ссылки на DOM-узел для императивных действий (фокус на инпуте, скролл, интеграция со сторонними библиотеками типа D3 или Chart.js).
```jsx
const inputRef = useRef(null);
return <input ref={inputRef} />;
// Позже можно вызвать inputRef.current.focus()
```

### Б. Хранилище мутабельных данных (Секретное оружие)
В отличие от `useState`, **изменение `ref.current` НЕ вызывает ре-рендер**. И в отличие от обычных переменных (которые обнуляются при ре-рендере), значение `ref` **сохраняется** между рендерами.

Это делает `useRef` идеальным для хранения интервалов, флагов "компонент смонтирован", или для обхода Stale Closures (Устаревших замыканий).

> **Edge Case: Обход Stale Closures с помощью useRef (Latest Ref Pattern)**
Если вам нужно передать функцию-коллбэк в нереактивный слушатель событий (или таймер), но вы не хотите, чтобы эффект пересоздавался:
```jsx
const [state, setState] = useState(0);
const stateRef = useRef(state);

// Синхронизируем реф с актуальным стейтом на каждом рендере (без ре-рендеров)
useEffect(() => {
  stateRef.current = state;
}, [state]);

useEffect(() => {
  const interval = setInterval(() => {
    // Внутри интервала всегда будет свежее значение!
    console.log(stateRef.current); 
  }, 1000);
}, []); // Пустой массив, интервал не пересоздается
```

---

## 2. forwardRef & useImperativeHandle
По умолчанию вы не можете передать `ref` в кастомный функциональный компонент. Чтобы это работало, нужно обернуть дочерний компонент в `forwardRef`.

Но что, если вы не хотите давать родителю доступ ко **всему** DOM-узлу дочернего компонента? Что, если вы хотите предоставить родителю только пару безопасных методов (например, `play()`, `pause()` для видео-плеера)?

Для этого нужен **`useImperativeHandle`**.

### Пример
```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

// Дочерний компонент
const CustomVideoPlayer = forwardRef((props, ref) => {
  const videoRef = useRef(null);

  // Настраиваем, ЧТО именно будет доступно в ref.current у родителя
  useImperativeHandle(ref, () => ({
    playVideo: () => {
      videoRef.current.play();
    },
    focusPlayer: () => {
      videoRef.current.focus();
    }
    // Родитель НЕ сможет вызвать videoRef.current.remove() или изменить стили напрямую
  }));

  return <video ref={videoRef} src="video.mp4" />;
});

// Родитель
function App() {
  const playerRef = useRef(null);

  return (
    <>
      <CustomVideoPlayer ref={playerRef} />
      {/* Родитель использует только разрешенные методы */}
      <button onClick={() => playerRef.current.playVideo()}>Play</button>
    </>
  );
}
```

### Когда использовать?
`useImperativeHandle` следует использовать крайне редко. Императивный код противоречит декларативной природе React. Применяйте его только для:
- Управления фокусом, выделением текста.
- Управления медиа-элементами (Audio/Video).
- Интеграции с императивными библиотеками (например, вызов методов JQuery-плагина или Canvas API).
