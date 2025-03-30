Можно ли использовать getter в getter хранилища Pinia?

```ts
export const useCounterStore = defineStore('counter', {
  state: () => {
    count: 0
  },
  getters: {
    doubleCount() {
      return state.count * 2
    },
    doublePlusOne() {
      return this.doubleCount + 2
    }
  }
})
```

> [!INFO]- Ответ
> >
>
> Мы обязаны указывать тип возвращаемого значения при вызове getter внутри getter. Это связано с 
> ограничением TypeScript и не затрагивает геттеры, определенные через стрелочной функции, а также 
> геттеры, не использующие this 
>
> ```ts
> export const useCounterStore = defineStore('counter', {
>   state: () => {
>     count: 0
>   },
>   getters: {
>     // автоматически определяет тип как число
>     doubleCount() {
>       return state.count * 2
>     },
>     // тип возвращаемого значения **должен** быть явно задан
>     doublePlusOne(): number {
>       return this.doubleCount + 2
>     }
>   }
> })
> ```
