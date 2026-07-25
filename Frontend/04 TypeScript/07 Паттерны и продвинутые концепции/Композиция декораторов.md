Композиция декораторов заключается в применении нескольких декораторов к одному классу, методу или свойству, что позволяет комбинировать различные поведения для достижения более динамичной функциональности. Мы можем составить декораторы, накладывая их один за другим, при этом каждый декоратор выполняется последовательно.

## Пример использования

Ниже приведен пример двух декораторов: `minimumFuel` и `maximumFuel`:

```typescript
function minimumFuel(fuel: number) {
  return function (target: Function, context) {
    if (context.kind === 'method') {
      return function (...args: any[]) {
        if (this.fuel > fuel) {
          console.log('fuel is more than mininum');
          return target.apply(this, args);
        } else {
          console.log(`Not enough fuel. Required: ${fuel}, got ${this.fuel}`);
        }
      };
    }
  };
}
function maximumFuel(fuel: number) {
  return function (target: Function, context) {
    if (context.kind === 'method') {
      return function (...args: any[]) {
        if (this.fuel < fuel) {
          console.log('fuel is less than maximum');
          return target.apply(this, args);
        } else {
          console.log(`excessive fuel. Maximum: ${fuel}, got ${this.fuel}`);
        }
      };
    }
  };
}
```

Мы можем применить оба декоратора к методу `launch`, чтобы обеспечить выполнение обоих условий: уровень топлива должен быть в пределах минимального и максимального значений перед запуском:

```typescript
class Rocket {
  fuel: number = 11;
  @maximumFuel(100)
  @minimumFuel(10)
  launch() {
    console.log('Launching in 3... 2... 1... 🚀');
  }
}
const rocket = new Rocket();
rocket.launch();
/*
fuel is less than maximum
fuel is more than mininum
Launching in 3... 2... 1... 🚀
*/
```

При использовании нескольких декораторов в комбинации важен порядок их применения. Декораторы выполняются в том порядке, в котором они перечислены. В данном случае сначала применяется декоратор `maximumFuel`, затем — `minimumFuel`.