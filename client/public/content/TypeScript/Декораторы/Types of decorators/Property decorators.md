Декораторы свойств очень похожи на декораторы методов:

```typescript
type ClassPropertyDecorator = (target: undefined, context: {
  kind: "field"
  name: string | symbol
  access: { get(): unknown, set(value: unknown): void }
  static: boolean
  private: boolean
}) => (initialValue: unknown) => unknown | void
```

Неудивительно, что случаи использования декораторов свойств очень похожи на случаи использования декораторов методов. Например, мы можем отслеживать доступы к свойству или помечать его как устаревшее:

```typescript
function deprecatedProperty(_: any, context) {
  if (context.kind === "field") {
    return function (initialValue: any) {
      console.log(`${context.name} is deprecated and will be removed in a future version.`)
      return initialValue
    }
  }
}
```

Код очень похож на декоратор `deprecatedMethod`, который мы определили для методов, и его использование также аналогично.