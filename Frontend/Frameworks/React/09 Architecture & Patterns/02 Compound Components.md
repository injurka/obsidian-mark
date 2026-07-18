
Паттерн **Compound Components** используется для создания группы компонентов, которые принадлежат друг другу и работают сообща, имея общее неявное состояние.

Классический пример из HTML — это `<select>` и `<option>`. Они не имеют смысла друг без друга, и `<select>` неявно управляет состоянием выбранного `<option>`.

## 1. Проблема "Компонента-Бога"
Без этого паттерна разработчики часто создают гигантские компоненты с десятками пропсов (Prop Hell).

**❌ ПЛОХО: Монолитный подход**
```jsx
// Что если я хочу иконку слева? А что если текст должен быть красным?
<Dropdown 
  items={[{id: 1, text: 'Профиль'}, {id: 2, text: 'Выход'}]}
  onSelect={handleSelect}
  showIcon={true}
  iconPosition="right"
  dividerAfterIndex={0}
/>
```

## 2. Решение: Compound Components
Паттерн предполагает создание родительского компонента-обертки (который хранит состояние через `Context API`) и нескольких дочерних компонентов (которые используют этот контекст для отображения и взаимодействия).

**✅ ХОРОШО: Compound подход**
```jsx
// Декларативно, гибко, легко кастомизировать!
<Dropdown>
  <Dropdown.Trigger>
    <Button>Меню</Button>
  </Dropdown.Trigger>
  <Dropdown.Menu>
    <Dropdown.Item onSelect={() => goToProfile()}>
      <IconUser /> Профиль
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item className="text-red-500" onSelect={() => logout()}>
      Выход
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
```

## 3. Как это реализуется под капотом
Вся магия строится на React Context.

```jsx
// 1. Создаем контекст
const DropdownContext = createContext();

// 2. Родительский компонент хранит стейт (открыт/закрыт)
export function Dropdown({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="dropdown">{children}</div>
    </DropdownContext.Provider>
  );
}

// 3. Дочерние компоненты используют контекст
Dropdown.Trigger = function DropdownTrigger({ children }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);
  return <div onClick={() => setIsOpen(!isOpen)}>{children}</div>;
};

Dropdown.Menu = function DropdownMenu({ children }) {
  const { isOpen } = useContext(DropdownContext);
  return isOpen ? <div className="dropdown-menu">{children}</div> : null;
};
```

## 4. Почему это Индустриальный Стандарт?
Все современные UI-библиотеки (Radix UI, Shadcn UI, Headless UI, Chakra UI) построены исключительно на паттерне Compound Components. Это дает разработчику максимальную свободу (Inversion of Control) — вы сами решаете, в каком порядке располагать элементы и какие классы на них вешать, при этом вся сложная логика (ARIA-атрибуты, фокус клавиатуры) скрыта внутри библиотеки.
