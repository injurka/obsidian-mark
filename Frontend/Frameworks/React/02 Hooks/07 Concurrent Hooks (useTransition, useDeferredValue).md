
Эти хуки появились в React 18 в рамках **Concurrent React (Конкурентного режима)**. Они решают проблему блокировки интерфейса (когда тяжелые вычисления или долгий рендер "замораживают" анимации и ввод текста).

Идея: разделить обновления состояния на **срочные (Urgent)** и **несрочные (Transitions)**.

## 1. useTransition
Позволяет пометить обновление состояния как несрочное (переходное).
Возвращает кортеж `[isPending, startTransition]`.

**Кейс:** Представьте строку поиска, которая фильтрует огромный список из 10 000 элементов. Без конкурентности каждое нажатие клавиши будет вызывать тяжелый рендер списка, и ввод текста будет безбожно лагать.

*Как работает разделение приоритетов при вводе текста:*
```mermaid
flowchart LR
    Input["Ввод текста юзером"] --> Handler["Событие onChange"]
    
    Handler --> Urgent["Срочное состояние: setQuery"]
    Urgent --> UI_Fast["Мгновенная перерисовка инпута"]
    
    Handler --> NonUrgent["Несрочное: startTransition"]
    NonUrgent --> UI_Slow["Фоновый рендер тяжелого списка"]
    
    style Urgent fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px
    style NonUrgent fill:#fff9c4,stroke:#fbc02d,stroke-width:2px
```

```jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState(''); // Срочное состояние (то, что в инпуте)
  const [filterText, setFilterText] = useState(''); // Несрочное состояние (для списка)
  
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 1. Срочное обновление. Пользователь мгновенно увидит букву в инпуте.
    setQuery(e.target.value); 

    // 2. Несрочное обновление. React отрисует список "в фоновом режиме", 
    // не блокируя главный поток.
    startTransition(() => {
      setFilterText(e.target.value);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Пока идет фоновый рендер списка, isPending будет true. Можно показать спиннер или заблюрить старый список */}
      {isPending && <span>Обновление списка...</span>}
      <SlowList text={filterText} /> 
    </div>
  );
}
```

## 2. useDeferredValue
Делает то же самое, что и `useTransition`, но применяется **не к функции обновления состояния (сеттеру), а к самим данным (пропсам)**.

Идеально подходит для случаев, когда вы получаете данные "сверху" (через пропсы) и не контролируете вызов `setState`.

*Механика работы useDeferredValue под капотом:*
```mermaid
flowchart TD
    Parent["Новые пропсы text приходят сверху"] --> Component["Компонент SlowList"]
    
    Component --> IsStale{"text === deferredText"}
    
    IsStale -->|Нет - данные отстают| StaleUI["Рендер старого списка с opacity 0.5"]
    IsStale -->|Да - данные синхронизированы| FreshUI["Обычный рендер списка"]
    
    StaleUI --> Background["React в фоне рендерит новый список"]
    Background --> FreshUI
```

```jsx
import { useDeferredValue, memo } from 'react';

function SlowList({ text }) {
  // deferredText будет "отставать" от text. 
  // React сначала отрендерит легкие части дерева с новым text,
  // а потом в фоновом режиме отрендерит этот тяжелый компонент с deferredText.
  const deferredText = useDeferredValue(text);
  
  // Можно определить, устарели ли данные на экране
  const isStale = text !== deferredText;

  return (
    <ul style={{ opacity: isStale ? 0.5 : 1 }}>
      {/* Рендеринг 10000 элементов на основе deferredText */}
    </ul>
  );
}
```

## 3. Важное отличие (Edge Case) от Debounce / Throttle
Частый вопрос на собеседованиях: *"Зачем useTransition, если есть старый добрый lodash.debounce?"*

*Разница подходов (искусственная задержка против умного планирования):*
```mermaid
flowchart TD
    subgraph LodashDebounce [Классический Debounce]
        D_Event["Нажатие клавиши"] --> D_Wait["Жесткое ожидание таймера"]
        D_Wait --> D_Render["Тяжелый блокирующий рендер"]
    end

    subgraph ReactTransition [React useTransition]
        T_Event["Нажатие клавиши"] --> T_Render["Рендер начинается сразу"]
        T_Render --> T_Yield["Юзер снова нажал клавишу - рендер ставится на паузу"]
        T_Yield --> T_Resume["Рендер возобновляется в свободное время"]
    end

    style D_Wait fill:#ffccbc,stroke:#d84315,stroke-width:2px
    style T_Yield fill:#b3e5fc,stroke:#0288d1,stroke-width:2px
```

- **Debounce:** Искусственно ждет фиксированное время (например, 300мс). Если компьютер пользователя мощный, он все равно будет ждать 300мс.
- **useTransition:** Вообще **НЕ ждет**. Он начинает фоновый рендер *сразу же*. Если устройство мощное, список обновится мгновенно. Если слабое — React будет рендерить список кусками (Fiber architecture), прерываясь на обработку ввода пользователя. `useTransition` динамически адаптируется под мощность устройства пользователя!
