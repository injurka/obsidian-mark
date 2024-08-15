Декораторы классов позволяют модифицировать поведение класса. При инициализации класса они вызываются и получают доступ к конструктору класса, методам и свойствам.

Когда вы присоединяете функцию к классу в качестве декоратора, вы получаете конструктор класса в качестве первого параметра:

```typescript
type ClassDecorator = (value: Function, context: {
  kind: "class"
  name: string | undefined
  addInitializer(initializer: () => void): void
}) => Function | void
```

## Пример использования

Предположим, мы хотим использовать декоратор для добавления двух свойств, `fuel` и `isEmpty()`, к классу `Rocket`. В этом случае мы можем написать следующую функцию:

```typescript
function WithFuel(target: typeof Rocket, context): typeof Rocket {
  if (context.kind === "class") {
    return class extends target {
      fuel: number = 50
      isEmpty(): boolean {
        return this.fuel == 0
      }
    }
  }
}
```

После того как мы убедились, что тип декорируемого элемента действительно `class`, мы возвращаем новый класс с двумя дополнительными свойствами. В качестве альтернативы мы могли бы использовать прототипные объекты для динамического добавления новых методов:

```typescript
function WithFuel(target: typeof Rocket, context): typeof Rocket {
  if (context.kind === "class") {
    target.prototype.fuel = 50
    target.prototype.isEmpty = (): boolean => {
      return this.fuel == 0
    }
  }
}
```

Мы можем использовать `WithFuel` следующим образом:

```typescript
@WithFuel
class Rocket {}

const rocket = new Rocket()
console.log((rocket as any).fuel)
console.log(`Is the rocket empty? ${(rocket as any).isEmpty()}`)
/* Prints:
50
Is the rocket empty? false
*/
```

Возможно, вы заметили, что нам пришлось привести `rocket` к `any`, чтобы получить доступ к новым свойствам. Это потому, что декораторы не могут влиять на структуру типа.

Если оригинальный класс определяет свойство, которое позже декорируется, декоратор переопределяет оригинальное значение. Например, если у `Rocket` есть свойство `fuel` с другим значением, `WithFuel` переопределит такое значение:

```typescript
function WithFuel(target: typeof Rocket, context): typeof Rocket {
  if (context.kind === "class") {
    return class extends target {
      fuel: number = 50
      isEmpty(): boolean {
        return this.fuel == 0
      }
    }
  }
}
@WithFuel
class Rocket {
  fuel: number = 75
}

const rocket = new Rocket()
console.log((rocket as any).fuel)
// prints 50
```

## Другое использование декораторов классов

Другое использование декораторов классов — это расширение существующих методов класса. Допустим, у нас есть метод `addFuel` в классе `Rocket`:

```typescript
class Rocket {
  fuel: number = 11;
  addFuel(amount: number) {
    this.fuel += amount;
  }
}
```

Мы можем расширить метод `addFuel`, применив новый декоратор класса: `logFuel`:

```typescript
function logFuel(target: Function, context) {
  const original = target.prototype.addFuel;
  target.prototype.addFuel = function (message: string) {
    console.log(`Before adding fuel, total fuel: ${this.fuel}`);
    original.apply(this, arguments);
    console.log(`After adding fuel, total fuel: ${this.fuel}`);
  };
}
```

Вышеупомянутый декоратор добавляет функциональность логирования вокруг метода `addFuel` класса, позволяя нам отслеживать изменения уровня топлива до и после каждой операции добавления топлива. Теперь, когда мы добавляем его к классу `Rocket` как показано ниже, изменение количества топлива будет выведено в консоль:

```typescript
@logFuel
class Rocket {
  fuel: number = 11;
  addFuel(amount: number) {
    this.fuel += amount;
  }
}
const rocket = new Rocket();
rocket.addFuel(10);
/*
Before adding fuel, total fuel: 11
After adding fuel, total fuel: 21
*/
```