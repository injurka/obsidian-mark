Для настройки декораторов на различное поведение в определенных сценариях можно использовать концепцию фабрики декораторов. Фабрики декораторов — это функции, возвращающие декоратор. Это позволяет настраивать поведение декораторов, передавая параметры в фабрику.

## Пример использования

### Декоратор `fill`

```typescript
function fill(value: number) {
  return function(_, context) {
    if (context.kind === "field") {
      return function (initialValue: number) {
        return value + initialValue
      }
    }
  }
}
```

Декоратор `fill` генерирует декоратор, который можно применить к свойству. При применении он добавляет значение, предоставленное декоратору, к значению, предоставленному при инициализации поля:

```typescript
class Rocket {
  @fill(20)
  fuel: number = 50
}
const rocket = new Rocket()
console.log(rocket.fuel) // 70
```

### Декоратор `Throttle`

Можно также использовать фабрику декораторов для создания декоратора класса. Вот пример декоратора `Throttle`, который регулирует выполнение метода `launch`:

```typescript
function Throttle(delay: number) {
  return function (target: any, context: any) {
    const original = target.prototype.launch;
    let timeout = false;
    target.prototype.launch = function (message: string) {
      if (!timeout) {
        original.apply(this, arguments);
        timeout = true;
        setTimeout(() => {
          timeout = false;
        }, delay);
      } else {
        console.log(`Throttle, wait next time`);
      }
    };
  };
}

@Throttle(1000)
class Rocket {
  launch() {
    console.log('Launching in 3... 2... 1... 🚀');
  }
}
const rocket = new Rocket();
rocket.launch();
rocket.launch();
/* output
Launching in 3... 2... 1... 🚀
Throttle, wait next time
*/
```

В приведенном коде извлекается оригинальный метод `launch` из прототипа целевого класса, затем вызывается метод `launch`, если таймаут активен; в противном случае вызов пропускается.

В этом примере класс `Rocket` декорирован вновь созданным декоратором, указывая продолжительность регулирования в 1000 миллисекунд (одна секунда). Как показано в выводе консоли, первый вызов `launch` успешен, но второй вызов пропускается, так как он все еще находится в период таймаута.