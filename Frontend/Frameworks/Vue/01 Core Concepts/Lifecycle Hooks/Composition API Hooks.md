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

---

За исключением beforeCreate и Create (которые заменяются самим методом установки), существует 9 обработчиков жизненного цикла API параметров, к которым мы можем получить доступ в нашем методе установки.  
  
- `onBeforeMount` – вызывается перед началом монтирования   

- `onMounted` – вызывается, когда компонент смонтирован  

- `onBeforeUpdate` – вызывается при изменении реактивных данных и перед повторным рендерингом  

- `onUpdated` – вызывается после повторного рендеринга  

- `onBeforeUnmount` – вызывается перед уничтожением экземпляра Vue  

- `onUnmounted` – вызывается после уничтожения экземпляра  

- `onActivated` – вызывается, когда активируется компонент, поддерживающий активность.

- `onDeactivated` – вызывается, когда поддерживаемый компонент деактивируется.  

- `onErrorCaptured` – вызывается, когда ошибка фиксируется из дочернего компонента.

- `onRenderTracked` - *dev only* регистрирует перехватчик отладки, который будет вызываться, когда эффект рендеринга компонента отслеживает реактивную зависимость.  

- `onRenderTriggered` - *dev only* регистрирует перехватчик отладки, который будет вызываться, когда реактивная зависимость запускает повторный запуск эффекта рендеринга компонента.

- `onServerPrefetch` - *ssr only* регистрирует асинхронную функцию, которая должна быть разрешена перед отрисовкой экземпляра компонента на сервере.

## Источники
- #### [learnvue](https://learnvue.co/articles/vue-lifecycle-hooks-guide)
