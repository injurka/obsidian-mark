
Порождающий паттерн, который гарантирует, что для определенного класса будет создан только один объект, а также предоставит к этому объекту точку доступа.

### Когда использовать?

- Когда необходимо, чтобы для класса существовал только один экземпляр.

Синглтон позволяет создать объект только при его необходимости. Если объект не нужен, то он не будет создан. В этом отличие синглтона от глобальных переменных.

---

## Пример реализации

### TS ~ Class

```ts
class Singleton {
  private static instance: Singleton;

  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public someBusinessLogic() {
    console.log('>...');
  }
}

const singletonInstance1 = Singleton.getInstance();
const singletonInstance2 = Singleton.getInstance();

console.log(singletonInstance1 === singletonInstance2); // Выведет true
singletonInstance1.someBusinessLogic()

const fn = (a: number)=>{
  const b = a + 1

  return b
}
```

### JS ~ Function

```js
const Singleton = (function () {
    let instance;
 
    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const object1 = singleton.getInstance();
const object2 = singleton.getInstance();

console.log(object1 === object2); //true
```