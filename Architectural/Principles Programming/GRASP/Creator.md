Создавать экземпляры класса должен класс, которому они нужны

Класс должен создавать экземпляры тех классов, которые он может:

- Содержать или агрегировать
- Записывать
- Использовать
- Инициализировать, имея нужные данные

Альтернатива — шаблон «Фабрика» (создание объектов концентрируется в отдельном классе).

Пример, где Creator **соблюдается**:

```ts
class Order {
    private payment: Payment;

    constructor(paymentType: string) {
        this.payment = PaymentFactory.createPayment(paymentType);
    }

    public processOrder() {
        this.payment.processPayment();
    }
}

class PaymentFactory {
    public static createPayment(paymentType: string): Payment {
        if (paymentType === 'credit') {
            return new CreditCardPayment();
        } else if (paymentType === 'debit') {
            return new DebitCardPayment();
        } else {
            throw new Error('Invalid payment type');
        }
    }
}

interface Payment {
    processPayment(): void;
}

class CreditCardPayment implements Payment {
    public processPayment(): void {
        console.log('Processing credit card payment');
    }
}

class DebitCardPayment implements Payment {
    public processPayment(): void {
        console.log('Processing debit card payment');
    }
}
```

В этом примере класс `Order` отвечает за создание объектов `Payment`, используя фабричный метод `PaymentFactory.createPayment()`. Это соблюдение принципа `Creator`.

---

Пример, где Creator **нарушается**:

```ts
class Order {
    private payment: Payment;

    constructor(paymentType: string) {
        if (paymentType === 'credit') {
            this.payment = new CreditCardPayment();
        } else if (paymentType === 'debit') {
            this.payment = new DebitCardPayment();
        } else {
            throw new Error('Invalid payment type');
        }
    }

    public processOrder() {
        this.payment.processPayment();
    }
}

// ... остальной код остается без изменений ...
```

В этом примере класс `Order` не создает объекты `Payment`, а получает их извне. Это нарушает принцип `Creator`, так как класс `Order` не должен ответственен за создание объектов, которые он использует.