
Вычислительная сложность алгоритма описывает, как выполняемый алгоритмом объём работы зависит от размера входных данных.

> Более точный термин для вычислительной сложности алгоритма — _асимптотическая сложность_. Это значит, что оценка верна для _достаточно большого_ количества входных данных, но не обязательно верна для небольшого. Точное определение найдёте [в Википедии](https://ru.wikipedia.org/wiki/%D0%92%D1%8B%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F_%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C).

Обычно у алгоритмов бывает две сложности:

- _временная сложность_ — как количество операций, которые выполняются при работе алгоритма, связано с объёмом входных данных;
- _сложность по памяти_ — как количество памяти, которое нужно алгоритму, связано с размером входных данных.

В обоих случаях оцениваем, как связаны используемые алгоритмом ресурсы (время или память) с количеством входных данных. Может показаться, что алгоритм медленнее работает и потребляет больше памяти, когда размер входных данных большой. Это не всегда так. К примеру, скорее всего время работы функции `const doNothing = (...asManyDataAsYouLike) => { }` не будет зависеть от количества переданных ей аргументов. Оценка сложности этой функции — O(1). Попробуем разобраться, что это значит.

---

## Способы оценки сложности (обозначения)

Есть несколько способов оценки сложности алгоритмов. Их основная идея – получить ограничение для функции, которая связывает размер входных данных и количество операций или размер памяти. Не стоит определять эту функцию точно, нам нужна именно оценка.

Теперь разберём некоторые способы оценки сложности алгоритма.

### O

_O_, читается как «О», «О-большое» или «биг (big) О», описывает оценку сложности сверху. То есть максимальное количество операций, которое алгоритм может выполнить в худшем случае. В скобках после О указывают функцию, которая ограничивает сложность. Например, O(n) означает, что сложность алгоритма растёт линейно. Это означает, что время выполнения алгоритма увеличивается прямо пропорционально размеру входных данных (к примеру, есть список из 10 элементов, алгоритм займёт определённое время. Но если будет 20 элементов, то алгоритм займёт в два раза больше времени). При этом как именно линейно не важно. Давайте рассмотрим несколько примеров.

Вычислительная сложность этого алгоритма — O(n). Мы обрабатываем каждый элемент один раз. Если в нашем массиве n элементов, мы выполним тело функции `reduce` n раз.
```js
const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0)
```

Вычислительная сложность этого алгоритма тоже будет O(n). Мы обрабатываем каждый элемент два раза. Если в нашем массиве n элементов, то выполним тело функции `reduce` 2 × n раз. n раз для суммирования и n раз для произведения. Это описывает формула O(k × n) = O(n). В нашем случае коэффициент не имеет значения, так как он не зависит от размера входных данных.

```js
const sumAndProd = (someArray) => {
  const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0)
  const prod = (someArray) => someArray.reduce((prod, value) => prod * value, 1)
  return sum * prod
}
```

Асимптотический анализ показывает порядок роста алгоритма - как увеличивается время работы алгоритма при увеличении объема входных данных. По факту измеряем не время, а число операций, например - сравнения,присваивания,выделение памяти. Обычно измеряется наихудший случай выполнения, если не оговорено иное. Записывается, как O(n) (О нотация, О большое) . Примеры:

- Константный — O(1)
- Линейный — O(n)
- Логарифмический — O( log n)
- Линеарифметический — O(n·log n)
- Квадратичный — O(n 2)

### Ω

_Ω_, читается как «Сигма» или «Сигма-большая», описывает оценку сложности снизу. То есть минимальное количество операций, которое алгоритм будет выполнять в лучшем случае. В скобках после Ω указывают функцию, которая ограничивает сложность. Например Ω(n) означает, что сложность растёт так же или быстрее, чем линейно. Например, квадратичная сложность n × n — это тоже Ω(n).

### Θ

Θ, читается как «Тета» или «Тета-большая», описывает плотную оценку алгоритма. В скобках после ϴ указывают функцию, которая ограничивает сложность как сверху, так и снизу. Рассмотрим предыдущий пример:

```js
const sumAndProd = (someArray) => {
  const sum = (someArray) => someArray.reduce((sum, value) => sum + value, 0)
  const prod = (someArray) => someArray.reduce((prod, value) => prod * value, 1)
  return sum * prod
}
```

Алгоритм выполняет 2 × n операций — n сложений и n умножений. Это значит, что количество операция сверху ограничено функцией от n или 2 × n < 3 × n, а снизу — функцией от n или 2 × n > n.

Для полноты картины приведём точные формулировки для каждого из определений.

- O — _f(n) = O(g(n))_. Есть положительное число `c`, которое, начиная с `n`, всегда выполняет условие 0 <= f(n) < c × g(n).
- Сигма — _f(n) = Ω(g(n))_. Есть положительное число `c` , которое, начиная с `n`, всегда выполняет условие 0 <= f(n) <= c × g(n).
- Тета — _f(n) = ϴ(g(n))_. Есть два положительных числа `c1` и `c2`, которые, начиная с `n`, всегда выполняют условие c1 × g(n) <= f(n) <= c2 × n.

Также есть алгоритмы, у которых вычислительная сложность по памяти — O(1). Их называют _алгоритмами на месте (in-place)_. Они могут использовать дополнительную память, но её размер не зависит от количества входных данных. Например, чтобы посчитать сумму всех чисел, используем переменную с их суммой. Эта переменная занимает место, но не зависит количества складываемых чисел.