Top-level await можно использовать внутри `<script setup>`. Результирующий код будет скомпилирован как `async setup()`:

```ts
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

Кроме того, ожидаемое выражение будет автоматически скомпилировано в формате, который сохраняет текущий контекст экземпляра компонента после `await`.