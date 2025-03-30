`watch` — это функция, которая принимает один или несколько источников данных (реактивные переменные, вычисляемые свойства или функции) и колбэк, который выполняется при изменении этих данных. Она позволяет вам реагировать на изменения в данных и выполнять произвольную логику.

## **Когда использовать `watch`?**

`watch` полезен в следующих случаях:
1. **Отслеживание изменений реактивных данных**: Например, когда нужно выполнить действие при изменении значения переменной.
2. **Побочные эффекты**: Например, вызов API, обновление DOM или изменение других реактивных данных.
3. **Сложная логика**: Когда вам нужно выполнить несколько действий в ответ на изменение данных.
4. **Отслеживание нескольких источников**: Когда нужно отслеживать изменения нескольких переменных одновременно.

## **Примеры использования `watch`**

#### 1. Отслеживание одного реактивного значения
```typescript
<script setup lang="ts">
import { ref, watch } from 'vue';

const count = ref(0);

// Отслеживаем изменения count
watch(count, (newValue, oldValue) => {
  console.log(`count изменился с ${oldValue} на ${newValue}`);
});

function increment() {
  count.value++;
}
</script>

<template>
  <div>
    <p>Счетчик: {{ count }}</p>
    <button @click="increment">Увеличить</button>
  </div>
</template>
```

**Объяснение:**
- Мы создаем реактивную переменную `count` с помощью `ref`.
- Используем `watch`, чтобы отслеживать изменения `count`.
- Когда `count` изменяется, выполняется колбэк, который выводит новое и старое значение в консоль.


### 2. Отслеживание объекта с глубоким наблюдением

Если вы отслеживаете объект, по умолчанию `watch` не будет отслеживать изменения вложенных свойств. Для этого нужно включить опцию `deep: true`.

```typescript
<script setup lang="ts">
import { reactive, watch } from 'vue';

const user = reactive({
  name: 'Иван',
  address: {
    city: 'Москва',
  },
});

// Отслеживаем изменения user с глубоким наблюдением
watch(
  user,
  (newValue, oldValue) => {
    console.log('user изменился:', newValue);
  },
  { deep: true }
);

function updateCity() {
  user.address.city = 'Санкт-Петербург'; // Изменение вложенного свойства
}
</script>

<template>
  <div>
    <p>Имя: {{ user.name }}</p>
    <p>Город: {{ user.address.city }}</p>
    <button @click="updateCity">Изменить город</button>
  </div>
</template>
```

**Объяснение:**
- Мы создаем реактивный объект `user`.
- Используем `watch` с опцией `deep: true`, чтобы отслеживать изменения вложенных свойств.
- Когда изменяется `user.address.city`, колбэк выполняется и выводит обновленный объект в консоль.

### 3. Отслеживание нескольких источников

`watch` может отслеживать несколько источников одновременно. В этом случае колбэк получает массивы новых и старых значений.

```typescript
<script setup lang="ts">
import { ref, watch } from 'vue';

const firstName = ref('Иван');
const lastName = ref('Иванов');

// Отслеживаем изменения firstName и lastName
watch(
 [firstName, lastName], 
 ([newFirstName, newLastName], [oldFirstName, oldLastName]) => {
  console.log(`Имя изменилось с ${oldFirstName} на ${newFirstName}`);
  console.log(`Фамилия изменилось с ${oldLastName} на ${newLastName}`);
});

function updateName() {
  firstName.value = 'Петр';
  lastName.value = 'Петров';
}
</script>

<template>
  <div>
    <p>Имя: {{ firstName }} {{ lastName }}</p>
    <button @click="updateName">Изменить имя</button>
  </div>
</template>
```

**Объяснение:**
- Мы создаем две реактивные переменные: `firstName` и `lastName`.
- Используем `watch`, чтобы отслеживать изменения обеих переменных.
- Когда любая из переменных изменяется, колбэк выполняется и выводит новые и старые значения.

### 4. Отслеживание с немедленным вызовом (`immediate`)

По умолчанию `watch` выполняет колбэк только при изменении данных. Если вам нужно выполнить колбэк сразу после создания наблюдателя, используйте опцию `immediate: true`.

```typescript
<script setup lang="ts">
import { ref, watch } from 'vue';

const message = ref('Привет, Vue!');

// Отслеживаем изменения message с немедленным вызовом
watch(
  message,
  (newValue, oldValue) => {
    console.log(`message изменился с ${oldValue} на ${newValue}`);
  },
  { immediate: true }
);

function updateMessage() {
  message.value = 'Привет, мир!';
}
</script>

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">Изменить сообщение</button>
  </div>
</template>
```

**Объяснение:**
- Мы создаем реактивную переменную `message`.
- Используем `watch` с опцией `immediate: true`, чтобы колбэк выполнился сразу после создания наблюдателя.
- При изменении `message` колбэк также выполняется.


### 5. Отслеживание вычисляемых свойств

`watch` можно использовать для отслеживания вычисляемых свойств (computed properties).

```typescript
<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const price = ref(100);
const quantity = ref(2);

const total = computed(() => price.value * quantity.value);

// Отслеживаем изменения total
watch(total, (newValue, oldValue) => {
  console.log(`Общая сумма изменилась с ${oldValue} на ${newValue}`);
});

function increaseQuantity() {
  quantity.value++;
}
</script>

<template>
  <div>
    <p>Цена: {{ price }}</p>
    <p>Количество: {{ quantity }}</p>
    <p>Общая сумма: {{ total }}</p>
    <button @click="increaseQuantity">Увеличить количество</button>
  </div>
</template>
```

**Объяснение:**
- Мы создаем вычисляемое свойство `total`, которое зависит от `price` и `quantity`.
- Используем `watch`, чтобы отслеживать изменения `total`.
- Когда `total` изменяется, колбэк выполняется и выводит новое значение.

## **Практические рекомендации**

1. **Используйте `watch` для побочных эффектов**: Например, вызовы API, обновление DOM или изменение других реактивных данных.
2. **Избегайте избыточного использования**: Если вам нужно просто обновить данные на основе других данных, используйте `computed`.
3. **Оптимизируйте производительность**: Используйте опции `deep` и `immediate` только при необходимости, чтобы избежать лишних вычислений.