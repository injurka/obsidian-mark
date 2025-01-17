> сделать члены объекта только для чтени

Сопоставимый тип `Readonly<T>` добавляет каждому члену объекта модификатор `readonly`, делая их тем самым доступными только для чтения.

```ts
// lib.es6.d.ts

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Наиболее частое применение данного типа можно встретить при определении функций и методов, параметры которых принадлежат к объектным типам. Поскольку объектные типы передаются по ссылке, то с высокой долей вероятности случайное изменение члена объекта может привести к непредсказуемым последствиям.

```ts
interface IPerson {
  name: string;
  age: number;
}

/**
 * Функция, параметр которой не
 * защищен от случайного изменения.
 *
 * Поскольку объектные типы передаются
 * по ссылке, то с высокой долей вероятности
 * случайное изменение поля name нарушит ожидаемый
 * ход выполнения программы.
 */
function mutableAction(person: IPerson) {
  person.name = 'NewName'; // Ok
}

/**
 * Надежная функция, защищающая свои
 * параметры от изменения, не требуя описания
 * нового неизменяемого типа.
 */
function immutableAction(person: Readonly<IPerson>) {
  person.name = 'NewName'; // Error -> Cannot assign to 'name' because it is a read-only property.
}
```

Тип сопоставления `Readonly<T>` является гомоморфным и добавляя свой модификатор `readonly` не влияет на уже существующие модификаторы. Сохранение исходным типом своих первоначальных характеристик (в данном случае — модификаторы), делает сопоставленный тип `Readonly<T>` гомоморфным.

```ts
interface IPerson {
  gender?: string;
}

type Person = Readonly<IPerson>; // type Person = { readonly gender?: string; }
```

В качестве примера можно привести часто встречающейся на практике случай, в котором универсальный интерфейс описывает объект, предназначенный для работы с данными. Поскольку в львиной доле данные представляются объектными типами, интерфейс декларирует их как неизменяемые, что в дальнейшем при его реализации избавит разработчика от типизации конструкций и тем самым сэкономит для него время на более увлекательные задачи.

```ts
/**
 * Интерфейс необходим для описания экземпляра
 * провайдеров, с которыми будет сопряжено
 * приложение. Кроме того, интерфейс описывает
 * поставляемые данные как только для чтения,
 * что в будущем может сэкономить время.
 */
interface IDataProvider<OutputData, InputData = null> {
  getData(): Readonly<OutputData>;
}

/**
 * Абстрактный класс описание, определяющий
 * поле data, доступный только потомкам как
 * только для чтения. Это позволит предотвратить
 * случайное изменение данных в классах потомках.
 */
abstract class DataProvider<InputData, OutputData = null>
  implements IDataProvider<InputData, OutputData> {
  constructor(protected data?: Readonly<OutputData>) {}

  abstract getData(): Readonly<InputData>;
}

interface IPerson {
  firstName: string;
  lastName: string;
}

interface IPersonDataProvider {
  name: string;
}

class PersonDataProvider extends DataProvider<
  IPerson,
  IPersonDataProvider
> {
  getData() {
    /**
     * Работая в теле потомков DataProvider,
     * будет не так просто случайно изменить
     * данные, доступные через ссылку this.data
     */
    let [firstName, lastName] = this.data.name.split(` `);
    let result = { firstName, lastName };

    return result;
  }
}

let provider = new PersonDataProvider({
  name: `Ivan Ivanov`,
});
```