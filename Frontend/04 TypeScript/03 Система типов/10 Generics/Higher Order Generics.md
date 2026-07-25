# Higher Order Generics

## Описание

> [!info] 
> **Обобщения высшего порядка (Higher Order Generics)** — это концепция, позволяющая передавать типы-дженерики в качестве параметров в другие типы, абстрагируясь не только от конкретных типов, но и от самих конструкторов типов.

В TypeScript нет прямой и полноценной поддержки "Higher-Kinded Types" (HKT) из коробки (как в Haskell или Scala). Нельзя написать что-то вроде `type Functor<F<~>>`. Однако с помощью продвинутых техник (таких как defunctionalization или использование интерфейсов-мапперов) разработчики могут эмулировать этот паттерн.

На практике под "Higher Order Generics" часто понимают функции или типы, которые работают с другими обобщенными функциями или типами, возвращая новые дженерики.

## Примеры использования

```typescript
// 1. Обобщенная функция, возвращающая другую обобщенную функцию (Currying generics)
function createFactory<T>() {
    // Возвращаем функцию, которая принимает другой параметр типа U
    return function<U>(arg: U): [T, U] {
        return [null as any as T, arg];
    };
}

const stringFactory = createFactory<string>();
const result = stringFactory<number>(42); // Тип: [string, number]

// 2. Эмуляция Higher-Kinded Types (через реестр типов - паттерн fp-ts)
interface URItoKind<A> {
    'Array': Array<A>;
    'Promise': Promise<A>;
}

type URIS = keyof URItoKind<any>;

type Kind<URI extends URIS, A> = URItoKind<A>[URI];

// Абстрактный маппер, который может работать и с Array, и с Promise
function map<URI extends URIS, A, B>(
    uri: URI, 
    fa: Kind<URI, A>, 
    f: (a: A) => B
): Kind<URI, B> {
    // Реализация опущена для краткости
    return null as any;
}
```

## Особенности и нюансы

- Эмуляция HKT в TypeScript очень сложна, увеличивает время компиляции и усложняет читаемость. Её используют в основном в библиотеках функционального программирования (например, `fp-ts`, `effect`).
- Более простой вид "высшего порядка" — это каррирование дженериков, когда вызов одной функции с дженериком возвращает другую функцию с собственным дженериком. До TypeScript 4.7 это был единственный способ частично применить параметры типа.

## Связанные темы
- [[Карта знаний TypeScript]]
