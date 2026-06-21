# Testing Library

**Testing Library** (часто используется в связке с `Vue Test Utils` или React Testing Library) — это набор утилит для тестирования компонентов пользовательского интерфейса (UI), который продвигает философию тестирования поведения с точки зрения пользователя, а не деталей реализации.

## Основная философия
> "Чем больше ваши тесты похожи на то, как используется ваша программа, тем больше уверенности они могут вам дать." — *Kent C. Dodds (создатель Testing Library)*

Вместо того чтобы искать элементы по внутренним CSS-классам, ID или проверять внутреннее состояние компонента (например, `component.data().count`), Testing Library предлагает искать элементы так, как это делает пользователь:
- По тексту на экране (`getByText('Отправить')`)
- По роли (`getByRole('button', { name: /отправить/i })`)
- По placeholder'у или label (`getByLabelText('Имя пользователя')`)

## Зачем это нужно?
1. **Тесты устойчивы к рефакторингу:** Если вы измените CSS-класс кнопки с `.btn-primary` на `.btn-red`, или перенесете состояние из `ref` в Pinia, но кнопка по-прежнему будет называться "Отправить" и выполнять свою функцию — тест **не упадет**.
2. **Доступность (Accessibility / a11y):** Поскольку вы используете запросы вроде `getByRole`, вы косвенно тестируете, доступно ли ваше приложение для скринридеров (пользователей с нарушениями зрения). Если у кнопки нет имени или роли, тест не сможет ее найти, как и скринридер.

## Пример (Vue Test Utils vs Vue Testing Library)

**Плохой тест (детали реализации):**
```javascript
// Тест проверяет внутренности
const wrapper = mount(Counter)
await wrapper.find('.increment-btn').trigger('click')
expect(wrapper.vm.count).toBe(1)
```

**Хороший тест (Testing Library):**
```javascript
import { render, screen, fireEvent } from '@testing-library/vue'

// Тест проверяет поведение (то, что видит пользователь)
render(Counter)
const button = screen.getByRole('button', { name: /увеличить/i })
await fireEvent.click(button)

// Пользователь должен увидеть текст "1" на экране
expect(screen.getByText('Счет: 1')).toBeTruthy()
```

## Экосистема
Testing Library работает поверх тестовых раннеров (таких как Jest или Vitest) и предоставляет адаптеры для множества фреймворков: `@testing-library/react`, `@testing-library/vue`, `@testing-library/svelte` и т.д.
