> получить через тип класса тип его экземпляра

Условный тип `InstanceType<T>` предназначен для получения типа экземпляра на основе типа, представляющего класс. Параметр типа `T` должен обязательно принадлежать к _типу класса_.

```ts
// @filename: lib.d.ts

type InstanceType<
  T extends new (...args: any) => any
> = T extends new (...args: any) => infer R ? R : any;
```

В большинстве случаев идентификатор класса задействован в приложении в качестве типа его экземпляра.

```ts
class Animal {
  move(): void {}
}

/**
 * Тип Animal представляет объект класса,
 * то есть его экземпляр, полученный при
 * помощи оператора new.
 */
function f(animal: Animal) {
  type Param = typeof Animal;

  // здесь Param представляет экземпляр типа Animal
}
```

Но сложные приложения часто требуют динамического создания своих компонентов. В таких случаях фабричные функции работают не с экземплярами классов, а непосредственно с самими классами.

Стоит напомнить, что в _JavaScript_ классы это всего лишь _синтаксический сахар_ над старой доброй _функцией конструктором_. И, как известно, объект функции конструктора представляет объект класса, содержащего ссылку на прототип, который и представляет экземпляр. Другими словами, в _TypeScript_ идентификатор класса, указанный в аннотации типа, представляет описание прототипа. Чтобы получить тип самого класса, необходимо выполнить над идентификатором класса _запрос типа_.

```ts
class Animal {
  move(): void {}
}

type Instance = Animal;
type Class = typeof Animal;

type MoveFromInstance = Instance['move']; // Ok ->() => void
type MoveFromClass = Class['move']; // Error -> Property 'move' does not exist on type 'typeof Animal'.
```

Таким образом, грамотно вычислить тип экземпляра в фабричной функции можно при помощи типа `InstanceType<T>`.

```ts
class Animal {
  move(): void {}
}

function factory(Class: typeof Animal) {
  type Instance = InstanceType<typeof Class>;

  let instance: Instance = new Class(); // Ok -> let instance: Animal
}
```

Хотя можно прибегнуть и к менее декларативному способу - к запросу типа свойства класса `prototype`.

```ts
function factory(Class: typeof Animal) {
  type Instance = typeof Class['prototype'];

  let instance: Instance = new Class(); // Ok -> let instance: Animal
}
```

И последнее, о чем стоит упомянуть, что результат получения типа непосредственно через `any` и `never` будет представлен ими же. Остальные случаи приведут к возникновению ошибки.

```ts
class Animal {}

let v0: InstanceType<any>; // let v0: any
let v1: InstanceType<never>; // let v1: never
let v2: InstanceType<number>; // Error
```