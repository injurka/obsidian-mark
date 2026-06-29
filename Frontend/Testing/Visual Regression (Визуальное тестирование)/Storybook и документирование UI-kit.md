# Storybook и документирование UI-kit

Storybook — это стандарт изолированной разработки UI-компонентов. Он служит связующим звеном между дизайнерами, разработчиками и тестировщиками, а также предоставляет автогенерируемую интерактивную документацию.

---

## 1. Написание историй (Component Story Format 3)

В версии Storybook 7+ стандартом стал формат **CSF 3 (Component Story Format)**, основанный на чистых объектах, что делает его лаконичным и расширяемым.

### Пример написания историй для компонента кнопки:

```typescript
// Button.stories.ts
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// 1. Конфигурация компонента
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Иерархия в боковом меню Storybook
  component: Button,
  tags: ['autodocs'], // Включает автогенерацию вкладки Docs
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Визуальный стиль кнопки',
    },
    onClick: { action: 'clicked' }, // Запись кликов во вкладку Actions
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 2. Описание дефолтной истории
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Отправить',
  },
};

// 3. Расширение истории для заблокированного состояния
export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};
```

---

## 2. Использование Play Function для интерактивных тестов

С помощью функции `play` мы можем писать сценарии поведения пользователя (клик, ввод текста) прямо внутри Storybook с использованием синтаксиса Testing Library. Это позволяет тестировать интерактивные компоненты (например, формы или модальные окна) без открытия Jest.

```typescript
// SignUpForm.stories.ts
import { userEvent, within } from '@storybook/test';
import { SignUpForm } from './SignUpForm';

export const SuccessSubmit = {
  component: SignUpForm,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Имитируем ввод почты
    await userEvent.type(canvas.getByTestId('email-input'), 'user@test.com');
    // Имитируем ввод пароля
    await userEvent.type(canvas.getByTestId('password-input'), 'super-secret-123');
    // Кликаем отправить
    await userEvent.click(canvas.getByRole('button', { name: 'Зарегистрироваться' }));

    // Проверяем, что появилось сообщение об успехе
    await canvas.findByText('Успешная регистрация!');
  },
};
```

---

## 3. Документирование UI-Kit с помощью MDX

Иногда автоматического описания пропсов недостаточно. Для создания полноценных гайдлайнов использования компонентов (дизайн-правила, do/dont примеры) используется формат **MDX** (смесь Markdown и React компонентов Storybook).

```mdx
{/* Button.mdx */}
import { Meta, Primary, Controls, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Компонент Button

Кнопки используются для запуска действий или переходов на другие страницы.

## Когда использовать
*   Для отправки форм.
*   Для подтверждения критических действий в модальных окнах.

## Не используйте
*   Вместо текстовых ссылок внутри параграфов текста.

<Canvas of={ButtonStories.Primary} />

## Доступные параметры (Props)
<Controls />
```
Такой подход гарантирует, что документация всегда актуальна, так как блоки `<Canvas>` и `<Controls>` рендерят реальный код компонентов напрямую из файлов историй.
