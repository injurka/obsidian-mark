Если возвести Low Coupling в абсолют, то достаточно быстро можно прийти к тому, чтобы разместить всю функциональность в одном единственном классе. В таком случае связей не будет вообще, но все при этом понимают, что что-то тут явно не так, ведь в этот класс попадет совершенно несвязанная между собой бизнес — логика. Принцип High Cohesion говорит нам следующее: классы должны содержать связанную бизнес — логику.

> Low Coupling и High Cohesion
> представляют из себя два связанных между собой паттерна, рассматривать которые имеет смысл только вместе. Их суть можно объединить следующим образом: система должна состоять и слабо связанных классов, которые содержать связанную бизнес — логику. Соблюдение этих принципов позволяет удобно переиспользовать созданные классы, не теряя понимания об их зоне ответственности.


Предметные области следует разделять по классам.

Связность класса — мера подобия предметных областей его методов:

«Высокая» степень — сфокусированные подсистемы (предметная область определена, управляема и понятна);

«Низкая» степень — абстрактные подсистемы. Затруднены:

- Восприятие;
- Повторное использование;
- Поддержка;
- Устойчивость к внешним изменениям.
 
`High Cohesion` обычно **соблюдается**, когда методы класса сфокусированы на определенной предметной области. Например, если у нас есть класс `User`, который отвечает за работу с пользователями, то все методы этого класса должны быть связаны с управлением пользователями.

```ts
class User {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    changeEmail(newEmail: string): void {
        this.email = newEmail;
    }
}
```

---

Однако, если `High Cohesion` **нарушается**, это может быть связано с размещением методов, которые не связаны с предметной областью класса. Например:

```ts
class User {
    private name: string;
    private email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    changeEmail(newEmail: string): void {
        this.email = newEmail;
    }

    // Этот метод не связан с управлением пользователями
    calculateSomethingComplex(a: number, b: number): number {
        return a * b;
    }
}
```

В этом примере метод `calculateSomethingComplex` не связан с управлением пользователями, поэтому `High Cohesion` нарушен.