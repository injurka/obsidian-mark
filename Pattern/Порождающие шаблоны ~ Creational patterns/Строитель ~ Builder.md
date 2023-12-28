
Шаблон проектирования, который инкапсулирует создание объекта и позволяет разделить его на различные этапы.

### Когда использовать паттерн Строитель?

- Когда процесс создания нового объекта не должен зависеть от того, из каких частей этот объект состоит и как эти части связаны между собой

- Когда необходимо обеспечить получение различных вариаций объекта в процессе его создания

<hr />

Представьте, что вам нужно собрать из крошечных деталей лего нечто, похожее на дом. Есть несколько разных способов сгруппировать их в различные представления.

Базовый дом будет иметь дверь, ноль или более окон и крышу с окружающими стенами. Некоторые могут даже иметь гараж, а некоторые — бассейн. Мы хотели бы, чтобы процесс был более простым и гибким, чтобы можно было вносить изменения.

Пошаговая сборка деталей лего, имеющихся в вашем распоряжении, составляет суть паттерна Строитель.

Таким образом, объекты конструируются в соответствии с последовательностью шагов один за другим, а не достигаются сразу.

Объекты JavaScript - это набор свойств и методов. Свойства - это поля или переменные, связанные с объектом. А методы — это функции, которые вы собираетесь вызывать для управления полями. Свойства объектов тесно связаны друг с другом, по крайней мере, в худшем случае семантически.

```js
const Employee = {
  isAdmin: false,
  getRole: function() {
	  return this.isAdmin ? 'Admin' : 'RegularEmp';
  };
};

const emp1 = Object.create(Employee);
emp1.getRole(); //'RegularEmp'

const emp2 = Object.create(Employee);
emp2.isAdmin = true;
emp2.getRole(); //'Admin'
```
Похоже, что уже существует несколько способов создания объектов в JavaScript. Зачем нам изобретать что-то другое?

Рассмотрим два важных вопроса:

- Что делать, если вам нужно создать сложный объект, содержащий слишком - полей и свойств?
- Что, если вам нужно создать несколько экземпляров почти одного и того же объекта?

Литерал объекта - не лучший выбор, поскольку он не помогает повторно использовать код. Каждый раз, когда вам нужен новый объект, вам придется снова и снова перечислять все его поля.

Конструктор до некоторой степени решил бы проблему, но это было бы громоздко. Вам нужно будет запомнить входные данные для него, некоторые из которых являются обязательными, а другие нет.

### Паттерн Строитель

Что, если бы у вас был способ решить только две вышеупомянутые проблемы, скрывая внутреннее представление от всех, кто его использует?

В реальной жизни объекты окружают нас повсюду. И вы можете сравнивать с ними объекты JavaScript.

Например, автомобиль бывает разного цвета или с разным количеством сидений. В доме может быть разное количество дверей, окон и дымоходов. Различия есть везде, но есть некоторые сходства.

Шаблон Builder позволяет упростить создание сложного объекта, отделив его от его представления.

Этот шаблон упрощает создание объекта, выполняя процесс поэтапно, а также инкапсулируя (скрывая) детали реализации этих шагов.

### Пример реализации

```ts
// Пример класса, который мы будем строить с помощью паттерна Строитель
class Product {
  part1: string = '';
  part2: string = '';
}

// Интерфейс Строителя
interface Builder {
  buildPart1(): void;
  buildPart2(): void;
  
  getResult(): Product;
}

// Конкретный строитель
class ConcreteBuilder implements Builder {
  private product: Product;

  constructor() {
    this.product = new Product();
  }

  buildPart1(): void {
    this.product.part1 = 'Part 1 is built';
  }

  buildPart2(): void {
    this.product.part2 = 'Part 2 is built';
  }

  getResult(): Product {
    return this.product;
  }
}

// Директор, который управляет процессом построения
class Director {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  construct(): Product {
    this.builder.buildPart1();
    this.builder.buildPart2();

    return this.builder.getResult();
  }
}

// Пример использования
const builder = new ConcreteBuilder();
const director = new Director(builder);
const product = director.construct();
console.log(product);


// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------------------- //

class Bread {
  public flour: string | null = null
  public salt: number | null = null
  public additives: string | null = null
}

// абстрактный класс строителя
abstract class BreadBuilder {
  public bread!: Bread

  public createBread() {
    this.bread = new Bread()
  }

  public abstract setFlour(): void
  public abstract setSalt(): void
  public abstract setAdditives(): void
}

// пекарь
class Baker {
  public bake(breadBuilder: BreadBuilder) {
    breadBuilder.createBread()
    
    breadBuilder.setFlour?.()
    breadBuilder.setSalt?.()
    breadBuilder.setAdditives?.()

    return breadBuilder.bread
  }
}

// строитель для ржаного хлеба
class RyeBreadBuilder extends BreadBuilder {
  public setFlour() {
    this.bread.flour = 'Ржаная мука 1 сорт'
  }

  public setSalt() {
    this.bread.salt = 10
  }

  public setAdditives() {
    // не используется
  }
}
// строитель для пшеничного хлеба
class WheatBreadBuilder extends BreadBuilder {
  public setFlour() {
    this.bread.flour = 'Пшеничная мука высший сорт'
  }

  public setSalt() {
    // не используется
  }

  public setAdditives() {
    this.bread.additives = 'Улучшитель хлебопекарный'
  }
}

const baker = new Baker()
let breadBuilder = new RyeBreadBuilder()
const ryeBread = baker.bake(breadBuilder)
console.log('>', ryeBread)

breadBuilder = new WheatBreadBuilder()
const wheatBread = baker.bake(breadBuilder)
console.log('>', wheatBread)

```