# Variance и бивариантность

## Описание

> [!info] 
> Variance (Вариантность) описывает правила, по которым сложные типы (например, классы, массивы, функции) соотносятся друг с другом на основе отношения их базовых типов.

В TypeScript существуют следующие виды вариантности:
- **Ковариантность (Covariance):** Если `A` является подтипом `B`, то `T<A>` является подтипом `T<B>`. (Например, массивы и возвращаемые значения функций).
- **Контравариантность (Contravariance):** Если `A` является подтипом `B`, то `T<B>` является подтипом `T<A>`. (Например, аргументы функций при `strictFunctionTypes: true`).
- **Бивариантность (Bivariance):** Тип работает и как ковариантный, и как контравариантный одновременно.
- **Инвариантность (Invariance):** Отсутствие совместимости. `T<A>` и `T<B>` несовместимы, даже если `A` и `B` совместимы.

## Примеры использования

### Ковариантность (Возвращаемые значения)

```typescript
interface Animal {}
interface Dog extends Animal { bark(): void; }

type AnimalGetter = () => Animal;
type DogGetter = () => Dog;

let getAnimal: AnimalGetter;
let getDog: DogGetter = () => ({ bark: () => {} });

// Допустимо. Функция, возвращающая Dog, может использоваться там, 
// где ожидается функция, возвращающая Animal.
getAnimal = getDog; 
```

### Контравариантность (Аргументы функций)

При включенном `strictFunctionTypes: true`:

```typescript
type AnimalHandler = (a: Animal) => void;
type DogHandler = (d: Dog) => void;

let handleAnimal: AnimalHandler = (a) => console.log(a);
let handleDog: DogHandler = (d) => d.bark();

// Допустимо. Функция, умеющая работать с Animal, может обработать и Dog.
handleDog = handleAnimal; 

// Ошибка. Функция, умеющая работать только с Dog (ожидающая метод bark),
// не может обработать обычного Animal, у которого нет bark.
// handleAnimal = handleDog;
```

## Бивариантность в TypeScript

В TypeScript до версии 2.6 (и если `strictFunctionTypes: false`) параметры функций были **бивариантны**.
Это означало, что параметры функций можно было присваивать в обоих направлениях. Это приводило к проблемам (unsoundness).
Но даже со `strictFunctionTypes: true`, **методы** объектов и интерфейсов остаются бивариантными, чтобы не ломать распространенные паттерны в JavaScript (например, работу с массивами).

```typescript
interface Comparer<T> {
  compare(a: T, b: T): number; // Бивариантный метод
}

interface ComparerStrict<T> {
  compare: (a: T, b: T) => number; // Контравариантное свойство-функция (при strictFunctionTypes)
}
```

## Связанные темы
- [[Карта знаний TypeScript]]
- [[Присваиваемость и совместимость]]
