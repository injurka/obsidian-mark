# Self Referential Types

## Описание

> [!info]
> Self Referential Types (Самоссылающиеся типы) — это техника, когда класс или интерфейс возвращает (или использует) тип `this`, ссылаясь на самого себя. В классах это часто называют "Polymorphic `this` type".

Они полезны для паттернов вроде "Builder" (Строитель) или для fluent интерфейсов (цепочек вызовов), где методы возвращают текущий экземпляр класса, и этот экземпляр должен правильно типизироваться даже при наследовании.

## Примеры использования

```typescript
class BasicCalculator {
  protected value = 0;

  add(amount: number): this { // Возвращает Polymorphic 'this'
    this.value += amount;
    return this;
  }
}

class ScientificCalculator extends BasicCalculator {
  sin(): this { // Возвращает Polymorphic 'this'
    this.value = Math.sin(this.value);
    return this;
  }
}

const calc = new ScientificCalculator();
// TypeScript понимает, что add() возвращает ScientificCalculator,
// поэтому мы можем вызвать sin() после add()!
calc.add(10).sin().add(5); 
```

## Особенности и нюансы

- Возвращаемый тип `this` динамически привязывается к типу текущего экземпляра. Если бы мы написали `add(amount: number): BasicCalculator`, то при вызове `calc.add(10)` мы бы получили тип `BasicCalculator`, и не смогли бы вызвать `sin()`.
- Использование `this` также применяется в интерфейсах для рекурсивных структур, хотя там это ближе к обычным Recursive Types.
- Это фундаментально важно для создания удобных API библиотек.

## Связанные темы
- [[Карта знаний TypeScript]]
