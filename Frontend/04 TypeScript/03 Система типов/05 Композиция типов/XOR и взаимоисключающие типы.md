# XOR и взаимоисключающие типы

## Описание

> [!info]
> Взаимоисключающие типы (XOR) в TypeScript описывают ситуацию, когда объект должен иметь либо один набор свойств, либо другой, но **не оба одновременно**.

Хотя в TypeScript есть Union Types (`A | B`), они по умолчанию допускают пересечение (т.е. объект может иметь свойства и от `A`, и от `B` одновременно). Чтобы реализовать строгое ИЛИ (XOR), требуются дополнительные манипуляции с типами (использование `never` и опциональных свойств).

## Примеры использования

```typescript
// Простой Union не работает как строгий XOR:
interface PetName { name: string; }
interface PetId { id: number; }
type Pet = PetName | PetId;
// Допустимо! Не строгий XOR
const pet: Pet = { name: "Rex", id: 1 }; 

// --- Реализация строгого XOR (Without и XOR) ---
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

type StrictPet = XOR<PetName, PetId>;

const validPet1: StrictPet = { name: "Rex" }; // OK
const validPet2: StrictPet = { id: 1 }; // OK

// Ошибка! Нельзя указать и name, и id одновременно
// const invalidPet: StrictPet = { name: "Rex", id: 1 }; 
```

## Особенности и нюансы

- Встроенного оператора XOR в TypeScript нет. Вышеописанный паттерн с `Without` и `XOR` (через `never`) является стандартным решением.
- Суть паттерна: если объект соответствует типу `A`, то все ключи из типа `B`, которых нет в `A`, объявляются как опциональные со значением `never` (что значит, что их наличие приведет к ошибке типов).
- Часто используется для типизации пропсов в React компонентах (например, у кнопки может быть либо `href`, либо `onClick`, но не оба).

## Связанные темы
- [[Карта знаний TypeScript]]
