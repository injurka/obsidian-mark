Еще одно хорошее место для присоединения декоратора — это методы класса. В этом случае тип функции декоратора выглядит следующим образом:

```typescript
type ClassMethodDecorator = (target: Function, context: {
  kind: "method"
  name: string | symbol
  access: { get(): unknown }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void
```

Мы можем использовать декораторы методов, когда хотим, чтобы что-то происходило до или после вызова декорируемого метода.

Например, во время разработки может быть полезно логировать вызовы с использованием данного метода или проверять предварительные/последующие условия до/после вызова. Кроме того, мы можем влиять на то, как вызывается метод, например, задерживая его выполнение или ограничивая количество вызовов в заданный промежуток времени.

Наконец, мы можем использовать декораторы методов для пометки метода как устаревшего, логируя сообщение, чтобы предупредить пользователя и сообщить, какой метод использовать вместо него:

```typescript
function deprecatedMethod(target: Function, context) {
  if (context.kind === "method") {
    return function (...args: any[]) {
      console.log(`${context.name} is deprecated and will be removed in a future version.`)
      return target.apply(this, args)
    }
  }
}
```

Опять же, первый параметр функции `deprecatedMethod` в данном случае — это метод, который мы декорируем. Убедившись, что это действительно метод (`context.kind === "method"`), мы возвращаем новую функцию, которая оборачивает декорируемый метод и логирует предупреждающее сообщение перед вызовом фактического метода.

Мы можем использовать наш новый декоратор следующим образом:

```typescript
@WithFuel
class Rocket {
  fuel: number = 75
  @deprecatedMethod
  isReadyForLaunch(): Boolean {
    return !(this as any).isEmpty()
  }
}

const rocket = new Rocket()
console.log(`Is the rocket ready for launch? ${rocket.isReadyForLaunch()}`)
```

В методе `isReadyForLaunch()` мы обращаемся к методу `isEmpty`, который добавили через декоратор `WithFuel`. Обратите внимание, как нам пришлось привести `this` к экземпляру `any`, как мы делали раньше. Когда мы вызываем `isReadyForLaunch()`, мы увидим следующий вывод, показывающий, что предупреждение корректно выводится:

```
isReadyForLaunch is deprecated and will be removed in a future version.
Is the rocket ready for launch? true
```

Декораторы методов могут быть полезны, если вы хотите расширить функциональность наших методов, что мы рассмотрим позже.