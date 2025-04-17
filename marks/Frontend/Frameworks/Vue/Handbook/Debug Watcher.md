Подобно `computed()`, наблюдатели также поддерживают опции `onTrack` и `onTrigger` для отладки поведения наблюдателя:

>Component.vue

```ts
<script setup>
watch(source, callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  },
})

watchEffect(callback, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  },
})
</script>
```

- `onTrack` будет вызван, когда реактивное свойство или ссылка отслеживается как зависимость.

- `onTrigger` будет вызван, когда обратный вызов наблюдателя будет вызван мутацией зависимости.

Обратные вызовы получают событие отладчика, содержащее информацию о зависимости. Если поместить внутри обратного вызова оператор `debugger`, можно интерактивно проверить зависимость.

> [!INFO] Памятка
> Опции `onTrack` и `onTrigger` watcher работают только в режиме разработки.

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/debug-watcher)
