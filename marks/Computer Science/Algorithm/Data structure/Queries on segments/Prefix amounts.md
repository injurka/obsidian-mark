## Определение

Префиксными суммами массива `[a0, a1, a2, ..., an-1]` называется массив `[s0, s1, s2, ..., sn]`, определенный следующим образом:

- `s0 = 0`
- `s1 = a0`
- `s2 = a0 + a1`
- `s3 = a0 + a1 + a2`
- `...`
- `sn = a0 + a1 + ... + an-1`

Обратите внимание, что в такой индексации:

- `sk` равен сумме первых `k` элементов массива `a` не включая `ak`,
- длина `s` на единицу больше длины `a`,
- `s0` всегда равен нулю.

Иногда префиксные суммы определяют включая правый конец и без нулевого элемента, то есть как `sk = a0 + a1 + ... + ak`, но по той же причине, почему отрезки почти всегда менее удобны, чем полуинтервалы, мы всегда будем работать с «полуинтрвальными» префиксными суммами из определения.

Формулу для `sk` можно записать рекуррентно как `sk+1 = sk + ak`, что сразу дает метод подсчета префиксных сумм за линейное время:

```javascript
function calculatePrefixSums(a) {
    const n = a.length;
    const s = new Array(n + 1).fill(0);
    s[0] = 0;
    for (let i = 0; i < n; i++) {
        s[i + 1] = s[i] + a[i];
    }
    return s;
}
```

## Задача

Дан массив целых чисел, и приходят запросы вида «найти сумму на полуинтервале с позиции `l` до позиции `r`». Нужно отвечать на запросы за `O(1)`.

Пред подсчитаем перед ответами на запросы массив префиксных сумм для исходного массива. Тогда если бы во всех запросах `l` было равно нулю, то ответом на запрос была бы просто префиксная сумма `sr`. Но как действовать, если `l ≠ 0`?

В префиксной сумме `sr` содержатся все нужные нам элементы, однако есть еще лишние, а именно `a0, a1, ..., al-1`. Заметим, что такая сумма в свою очередь равна уже посчитанной префиксной сумме `sl`. Таким образом, выполнено тождество:

```ts
al + al+1 + ... + ar-1 = sr - sl
```

Для ответа на запрос поиска суммы на произвольном полуинтервале нужно просто вычесть друг из друга две предподсчитанные префиксные суммы.

```javascript
function querySum(s, l, r) {
    return s[r] - s[l];
}
```

## Другие операции

Подобный прием можно использовать не только для сложения, но и для других операций.

Что нам на самом деле здесь нужно было от сложения? Только то, что у сложения есть обратная операция — вычитание — с помощью которой можно по двум префиксам восстановить значение на отрезке, «отменив» `sl`. Сумма обратима, но например минимум или максимум необратимы — по значениям минимумов на префиксах в общем случае невозможно получить значение минимума на отрезке (в чем несложно убедиться, рассмотрев случай, когда первый элемент массива минимальный, и все префиксные суммы будут ему равны, все зависимости от остальных значений).

Помимо сложения, есть и другие операции, которые являются обратимыми:

- побитовое исключающее «или», также известное как xor и обозначаемое `⊕`,
- сложение по модулю,
- умножение и умножение по модулю (обратное — деление).

Помимо обычной суммой, самая популярная из них — xor, которая считается ещё проще:

```
al ⊕ al+1 ⊕ ... ⊕ ar-1 = sr ⊕ sl
```

## Задачи на префиксные суммы

### Задача 1: Подотрезок заданной суммы

```javascript
function hasSubarrayWithSum(arr, targetSum) {
    let currentSum = 0;
    let start = 0;

    for (let end = 0; end < arr.length; end++) {
        currentSum += arr[end];

        while (currentSum > targetSum) {
            currentSum -= arr[start];
            start++;
        }

        if (currentSum === targetSum) {
            return true;
        }
    }

    return false;
}

// Пример использования:
const arr1 = [1, 2, 3, 4, 5];
const targetSum1 = 9;
console.log(hasSubarrayWithSum(arr1, targetSum1)); // true
```

### Задача 2: Совпадающие суммы на подотрезках

```javascript
function findCommonSubarraySum(arr1, arr2) {
    const n = arr1.length;
    const prefixSum1 = new Array(n + 1).fill(0);
    const prefixSum2 = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum1[i + 1] = prefixSum1[i] + arr1[i];
        prefixSum2[i + 1] = prefixSum2[i] + arr2[i];
    }

    for (let length = 1; length <= n; length++) {
        const sumMap = new Map();

        for (let i = 0; i <= n - length; i++) {
            const sum1 = prefixSum1[i + length] - prefixSum1[i];
            const sum2 = prefixSum2[i + length] - prefixSum2[i];

            if (sum1 === sum2) {
                return [i, i + length - 1];
            }

            if (!sumMap.has(sum1)) {
                sumMap.set(sum1, i);
            }

            if (sumMap.has(sum2)) {
                return [sumMap.get(sum2), i + length - 1];
            }
        }
    }

    return null;
}

// Пример использования:
const arr2_1 = [1, 2, 3, 4, 5];
const arr2_2 = [5, 4, 3, 2, 1];
console.log(findCommonSubarraySum(arr2_1, arr2_2)); // [0, 4]
```

### Задача 3: Подмножество с суммой, делящейся на `n`

```javascript
function findSubsetWithSumDivisibleByN(arr, n) {
    const prefixSums = new Array(n).fill(0);
    prefixSums[0] = 1; // Для пустого подмножества

    let currentSum = 0;

    for (let i = 0; i < arr.length; i++) {
        currentSum += arr[i];
        currentSum %= n;

        if (prefixSums[currentSum]) {
            return true;
        }

        prefixSums[currentSum] = 1;
    }

    return false;
}

// Пример использования:
const arr3 = [1, 2, 3, 4, 5];
const n = 5;
console.log(findSubsetWithSumDivisibleByN(arr3, n)); // true
```

Эти функции решают каждую из указанных задач за линейное время, используя префиксные суммы и другие оптимизации.

## Источники
- #### [algorithmica](https://ru.algorithmica.org/cs/range-queries/prefix-sum/)
