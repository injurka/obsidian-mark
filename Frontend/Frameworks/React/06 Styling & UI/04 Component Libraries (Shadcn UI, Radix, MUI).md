
Подход к UI-библиотекам в React претерпел серьезную эволюцию. Сегодня на рынке доминируют две противоположные концепции: "Тяжелые" библиотеки с готовым дизайном (MUI) и "Headless" (безголовые) компоненты (Radix, Shadcn UI).

## 1. Традиционные библиотеки (Material UI / MUI, Ant Design)
Это гиганты "все-в-одном". Вы импортируете компонент, и он сразу выглядит "как в Google" или "как в Apple".

```jsx
import { Button } from '@mui/material';

function App() {
  return <Button variant="contained" color="primary">Клик</Button>;
}
```

**Плюсы:** Невероятно быстрый старт для админок и внутренних тулзов.
**Минусы (Edge Cases):** 
1. **Кастомизация — это ад.** Если дизайн вашего проекта сильно отличается от Material Design, переопределять вложенные стили MUI (через `sx` проп или темы) очень сложно. Вы будете бороться с библиотекой, а не писать код.
2. **Размер бандла:** Они могут быть тяжелыми, если неправильно настроить Tree-shaking.

---

## 2. Headless UI Революция (Radix UI, Headless UI)
**Headless (Безголовые)** компоненты предоставляют 100% логики и доступности (a11y), но **0% стилей**.

Например, создание правильного выпадающего списка (Dropdown) — это сложно: обработка фокуса клавиатуры, закрытие по `Esc`, закрытие при клике вне области, позиционирование, ARIA-атрибуты для скринридеров. 
Radix UI решает всю эту логику за вас, но не рендерит никаких стилей. Вы сами навешиваете классы (например, Tailwind) на предоставленные компоненты-обертки.

```jsx
// Логика от Radix, внешний вид - от вас
import * as Dialog from '@radix-ui/react-dialog';

export default () => (
  <Dialog.Root>
    <Dialog.Trigger className="bg-blue-500 text-white">Открыть</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed bg-white p-6 rounded-lg">
        <h1>Заголовок</h1>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

---

## 3. Индустриальный стандарт 2026: Shadcn UI

**Shadcn UI** — это не npm-пакет. Это концепция **"Copy-Paste"** (копировать и вставить).

Он берет логику от **Radix UI**, объединяет ее с дизайном на основе **Tailwind CSS** и с помощью CLI-команды копирует исходный код компонента прямо в ваш проект (в папку `components/ui/button.tsx`).

**Почему это гениально? (Частый вопрос)**
Потому что вы получаете **полный контроль над исходным кодом**. 
- В MUI, чтобы изменить отступ внутри кнопки, вам нужно читать документацию по Theme Override.
- В Shadcn UI вы просто открываете локальный файл `button.tsx` и меняете Tailwind-класс `px-4` на `px-6`. Код компонента принадлежит ВАМ.

### CVA (Class Variance Authority)
Внутри компонентов Shadcn почти всегда используется библиотека CVA. Она позволяет декларативно описывать "варианты" компонента на основе Tailwind.

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors", // Базовые классы
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Использование: className={buttonVariants({ variant: "destructive", size: "sm" })}
```
