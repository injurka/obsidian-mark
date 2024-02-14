Макрос позволяет объявлять опции компонента непосредственно в `<script setup>`, не требуя отдельного блока `<script>:`

```ts
<script setup>
defineOptions({ inheritAttrs: false })
</script>
```