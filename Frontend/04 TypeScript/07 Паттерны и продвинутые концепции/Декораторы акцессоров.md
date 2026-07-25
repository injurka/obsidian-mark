Очень похожи на декораторы методов декораторы аксессоров, которые нацелены на геттеры и сеттеры:

```typescript
type ClassSetterDecorator = (target: Function, context: {
  kind: "setter"
  name: string | symbol
  access: { set(value: unknown): void }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void

type ClassGetterDecorator = (value: Function, context: {
  kind: "getter"
  name: string | symbol
  access: { get(): unknown }
  static: boolean
  private: boolean
  addInitializer(initializer: () => void): void
}) => Function | void
```

Определение декораторов аксессоров похоже на определение декораторов методов. Например, мы можем объединить наши декораторы `deprecatedMethod` и `deprecatedProperty` в одну функцию `deprecated`, которая также поддерживает геттеры и сеттеры:

```typescript
function deprecated(target, context) {
  const kind = context.kind
  const msg = `${context.name} is deprecated and will be removed in a future version.`
  if (kind === "method" || kind === "getter" || kind === "setter") {
    return function (...args: any[]) {
      console.log(msg)
      return target.apply(this, args)
    }
  } else if (kind === "field") {
    return function (initialValue: any) {
      console.log(msg)
      return initialValue
    }
  }
}
```

## Декораторы авто-аксессоров

Новое предложение по декораторам также ввело новый элемент под названием "авто-аксессор поле":

```typescript
class Test {
  accessor x: number
}
```

Транспайлер превратит поле `x` выше в пару методов геттера и сеттера, с приватным свойством за кулисами. Это полезно для представления простого аксессора и помогает избежать некоторых проблем, которые могут возникнуть при использовании декораторов на полях класса.