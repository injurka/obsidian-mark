#### Определение изменяемых и неизменяемых
Изменчивый означает "может меняться". Неизменный означает "не может измениться". И эти значения остаются неизменными в мире технологий. Например, мутабельная строка может быть изменена, а неизменяемая - нет.

Важно отметить, что это относится не к переменной, а к значению. Константы не всегда неизменяемы, а неконстантные переменные не всегда изменяемы.

Например, объекты в JavaScript по умолчанию являются изменяемыми, даже если они присвоены константной переменной. Ниже приведен правильный вариант TypeScript:

```ts
const myObj = {
    one: 1,
    two: 2
};
// Here myObj is { one: 1, two: 2 }
myObj.three = 3;
// Here myObj is { one: 1, two: 2, three: 3 }
```

Единственное, что вы не можете сделать с константой, - это переназначить ее, например

```ts
const myObj = {
    one: 1,
    two: 2
};
// Here myObj is { one: 1, two: 2 }
myObj = {
    one: "one",
    two: "two"
}
// Uncaught TypeError: Assignment to constant variable
```

То же самое происходит и с массивами.

---

#### В чем проблема с изменяемыми переменными?
Самая большая проблема с мутабельными переменными заключается в том, что они не являются потокобезопасными. Потокобезопасный код определяется как: "Потокобезопасный код манипулирует общими структурами данных только таким образом, чтобы гарантировать, что все потоки ведут себя правильно и выполняют свои проектные спецификации без непреднамеренного взаимодействия.

Это означает, что потоки могут обращаться к структуре данных, не получая неожиданных результатов.

Возьмем этот пример из книги Statics & Thread Safety: Part I, например: Допустим, в местном магазине у меня есть корзина с 10 товарами. Я подхожу к кассе, и продавец берет каждый товар и кладет его в кассу, а затем подсчитывает мою стоимость. Если бы не человеческая ошибка, мы бы ожидали, что будет показана правильная сумма.

А теперь представьте, что у нас есть 5 касс, в каждой из которых работает один клерк, но только одна общая касса. Если несколько клерков будут одновременно вносить товары в кассу, никто не получит правильного итога.

Решение заключается в том, чтобы обеспечить доступ к кассе только одному клерку (замок), и чтобы другие клерки не могли пользоваться кассой, пока мои 10 товаров не будут отсканированы.

---

#### Как неизменяемость решает эту проблему?
Неизменность решает эту проблему, гарантируя, что структура данных не может быть изменена, только прочитана. Создать один раз, прочитать много раз. Что же делать, если вам нужно выполнить операцию над неизменяемой структурой данных? Вы вернете результат в новом неизменяемом экземпляре структуры данных.

Как же это выглядит в typescript?
```ts
class ImmutableUser {
    readonly name: string;
    readonly age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    increaseAgeByOne(): ImmutableUser {
        return new ImmutableUser(this.name, this.age + 1);
    }
}
```

Теперь всякий раз, когда мы хотим выполнить операцию (в данном случае увеличить возраст, например, в случае дня рождения), мы создаем новый экземпляр `ImmutableUser`, а не изменяем текущий. Мы также пометили `name` и `age` как `readonly`, чтобы убедиться, что конечный пользователь также не сможет изменять эти переменные.

Вот как будет выглядеть использование `ImmutableUser`

```ts
let testUser = new ImmutableUser("John Doe", 19); // instance A
// Increase age
testUser = testUser.increaseAgeByOne(); // instance B
```

Теперь в сценарии, когда поток 1 читает `instance A`, а поток 2 хочет увеличить возраст, ему придется сделать это, создав `instance B`, а не напрямую изменяя `instance A`, поэтому можно быть уверенным, что поток 1 будет вести себя ожидаемо.