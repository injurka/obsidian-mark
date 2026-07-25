# Omit

## Описание

> [!info] Omit<Type, Keys>
> Утилитарный тип `Omit<Type, Keys>` создает новый тип путем исключения определенного набора свойств `Keys` из существующего типа `Type`. По сути, он противоположен `Pick`.

`Omit` невероятно полезен, когда у вас есть большой интерфейс, и вам нужен точно такой же, но без пары конкретных полей (например, исключить конфиденциальные данные, такие как пароль, при отправке объекта или убрать технические поля вроде `createdAt` при создании объекта).

## Примеры использования

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

// Убираем одно поле
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Убраться дома",
  completed: false,
  createdAt: 1615544252770
};

// Или убираем сразу несколько полей через Union
type TodoCreateInfo = Omit<Todo, "completed" | "createdAt">;
const newTodo: TodoCreateInfo = {
  title: "Купить хлеб",
  description: "Обязательно белый"
};
```

## Особенности и нюансы

- **Нет строгой проверки ключей**: В отличие от `Pick`, TypeScript исторически не так строго проверял, что ключи для исключения действительно существуют в типе `T`. Вы можете передать в `Omit` ключ, которого нет в исходном типе, и тип не сломается, а просто останется прежним.
- **Под капотом**: `Omit` объединяет два других утилитарных типа: `Pick` и `Exclude`.
  ```typescript
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  ```
  Сначала `Exclude<keyof T, K>` вычитает ненужные ключи `K` из списка всех ключей `T`. А затем `Pick` выбирает оставшиеся.

## Связанные темы
- [[Карта знаний TypeScript]]
