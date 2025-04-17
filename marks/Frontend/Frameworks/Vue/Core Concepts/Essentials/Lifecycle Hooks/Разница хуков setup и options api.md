| Options API       | Hook inside `setup` |
| ----------------- | ------------------- |
| `beforeCreate`    | Not needed*         |
| `created`         | Not needed*         |
| `beforeMount`     | `onBeforeMount`     |
| `mounted`         | `onMounted`         |
| `beforeUpdate`    | `onBeforeUpdate`    |
| `updated`         | `onUpdated`         |
| `beforeUnmount`   | `onBeforeUnmount`   |
| `unmounted`       | `onUnmounted`       |
| `errorCaptured`   | `onErrorCaptured`   |
| `renderTracked`   | `onRenderTracked`   |
| `renderTriggered` | `onRenderTriggered` |
| `activated`       | `onActivated`       |
| `deactivated`     | `onDeactivated`     |
> [!INFO] СОВЕТ
> Поскольку функция `setup` выполняется вокруг хуков жизненного цикла `beforeCreate` и `created`, вам не нужно явно определять их. Другими словами, любой код, который был бы написан внутри этих хуков, должен быть написан непосредственно в функции `setup`.

---

## Общая схема работы
![[1.png]]