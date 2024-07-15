Отвечает за операции, запросы на которые приходят от пользователя, и может выполнять сценарии одного или нескольких вариантов использования (например, создание и удаление) Не выполняет работу самостоятельно, а делегирует компетентным исполнителям;

Может представлять собой:

- Систему в целом;
- Подсистему;
- Корневой объект;
- Устройство.


Пример, где `Controller` **соблюдается**:

```ts
class OrderController {
    private orderService: OrderService;

    constructor(orderService: OrderService) {
        this.orderService = orderService;
    }

    createOrder(order: Order) {
        this.orderService.createOrder(order);
    }

    deleteOrder(orderId: number) {
        this.orderService.deleteOrder(orderId);
    }
}

class OrderService {
    createOrder(order: Order) {
        // Logic to create an order
    }

    deleteOrder(orderId: number) {
        // Logic to delete an order
    }
}
```

В этом примере `OrderController` является `Controller`, так как он отвечает за операции, запросы на которые приходят от пользователя, и может выполнять сценарии создания и удаления заказа. Он не выполняет работу самостоятельно, а делегирует компетентным исполнителям (в данном случае `OrderService`).

---

Пример, где `Controller` **нарушается**:

```ts
class OrderController {
    createOrder(order: Order) {
        // Logic to create an order
    }

    deleteOrder(orderId: number) {
        // Logic to delete an order
    }
}
```

В этом примере `OrderController` не является `Controller`, так как он не отвечает за операции, запросы на которые приходят от пользователя, и не может выполнять сценарии создания и удаления заказа. Он выполняет работу самостоятельно, и это нарушает принцип `Controller`.