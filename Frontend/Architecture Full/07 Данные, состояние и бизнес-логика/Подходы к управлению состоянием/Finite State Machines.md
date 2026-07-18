## State — Состояние

**State** позволяет объекту менять своё поведение в зависимости от текущего внутреннего состояния.

Например:

- заказ: `new → paid → shipped → delivered`;
- загрузка: `idle → loading → success/error`;
- плеер: `playing / paused / stopped`;
- форма: `editing / submitting / submitted / failed`.

### Простой вариант через `switch`

```ts
type RequestStatus = "idle" | "loading" | "success" | "error";

function getButtonText(status: RequestStatus) {
  switch (status) {
    case "idle":
      return "Отправить";

    case "loading":
      return "Загрузка...";

    case "success":
      return "Отправлено";

    case "error":
      return "Повторить";
  }
}
```

Для простых случаев этого достаточно.

### Полноценный State-паттерн

Рассмотрим заказ.

```ts
interface OrderState {
  pay(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
  getName(): string;
}
```

Состояние нового заказа:

```ts
class NewOrderState implements OrderState {
  pay(order: Order): void {
    order.setState(new PaidOrderState());
  }

  ship(): void {
    throw new Error("Cannot ship an unpaid order");
  }

  deliver(): void {
    throw new Error("Cannot deliver an unshipped order");
  }

  getName(): string {
    return "new";
  }
}
```

Оплаченный заказ:

```ts
class PaidOrderState implements OrderState {
  pay(): void {
    throw new Error("Order is already paid");
  }

  ship(order: Order): void {
    order.setState(new ShippedOrderState());
  }

  deliver(): void {
    throw new Error("Cannot deliver an unshipped order");
  }

  getName(): string {
    return "paid";
  }
}
```

Отправленный заказ:

```ts
class ShippedOrderState implements OrderState {
  pay(): void {
    throw new Error("Order is already paid");
  }

  ship(): void {
    throw new Error("Order is already shipped");
  }

  deliver(order: Order): void {
    order.setState(new DeliveredOrderState());
  }

  getName(): string {
    return "shipped";
  }
}
```

Доставленный заказ:

```ts
class DeliveredOrderState implements OrderState {
  pay(): void {
    throw new Error("Order is already delivered");
  }

  ship(): void {
    throw new Error("Order is already delivered");
  }

  deliver(): void {
    throw new Error("Order is already delivered");
  }

  getName(): string {
    return "delivered";
  }
}
```

Контекст — сам заказ:

```ts
class Order {
  private state: OrderState = new NewOrderState();

  setState(state: OrderState) {
    this.state = state;
    console.log(`Order state changed to: ${state.getName()}`);
  }

  pay() {
    this.state.pay(this);
  }

  ship() {
    this.state.ship(this);
  }

  deliver() {
    this.state.deliver(this);
  }

  getStatus() {
    return this.state.getName();
  }
}
```

Использование:

```ts
const order = new Order();

console.log(order.getStatus()); // new

order.pay();     // paid
order.ship();    // shipped
order.deliver(); // delivered

console.log(order.getStatus()); // delivered
```