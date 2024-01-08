
Предназначен для преобразования интерфейса одного класса в интерфейс другого. Благодаря реализации данного паттерна мы можем использовать вместе классы с несовместимыми интерфейсами.

### Когда надо использовать Адаптер?

- Когда необходимо использовать имеющийся класс, но его интерфейс не соответствует потребностям

- Когда надо использовать уже существующий класс совместно с другими классами, интерфейсы которых не совместимы

<hr />

Цель "Адаптера" - обеспечить совместную работу объектов с несовместимыми интерфейсами. Это как клей, объединяющий два разных предметов в единое целое. В "Адаптере" существует четыре основных роли:

![Alt text](./assets/Адаптер%20~%20Adapter.png) 

### Пример реализации

```ts
abstract class Vehicle {
  abstract run(): void;
}

class SuperX01 extends Vehicle {
  run(): void {
    console.log("SuperX01 start");
  }
}

class SuperX02 extends Vehicle {
  run(): void {
    console.log("SuperX02 start");
  }
}

// фабричным метод
abstract class VehicleFactory {
  abstract produceVehicle(): Vehicle;
}

// фабричный класс
class SuperX01Factory extends VehicleFactory {
  produceVehicle(): Vehicle {
    return new SuperX01();
  }
}

// фабричный класс
class SuperX02Factory extends VehicleFactory {
  produceVehicle(): Vehicle {
    return new SuperX02();
  }
}

// Using
const superX01Factory = new SuperX01Factory();
const superX02Factory = new SuperX02Factory();

const superX01Vehicle = superX01Factory.produceVehicle();
const superX02Vehicle = superX02Factory.produceVehicle();

superX01Vehicle.run();
superX02Vehicle.run();
```

Случаи использования паттерна "Адаптер":

- когда интерфейс существующего класса не соответствует потребностям системы, т.е. когда интерфейс этого класса по каким-либо причинам несовместим с системой;

- при использовании стороннего сервиса, интерфейс которого несовместим с нашим кодом.
