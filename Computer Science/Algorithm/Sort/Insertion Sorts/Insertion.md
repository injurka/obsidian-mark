Используется для упорядочивания элементов в массиве. Он работает путем поочередного вставления каждого элемента на свое место в уже отсортированной части массива.

**Как реализуется:**

1. Начинаем со второго элемента массива.
2. Сравниваем этот элемент с предыдущим элементом.
3. Если текущий элемент меньше предыдущего, то продолжаем сдвигать предыдущие элементы вправо, пока не найдем подходящее место для текущего элемента.
4. Вставляем текущий элемент на найденное место.
5. Повторяем шаги 2-4 для всех оставшихся элементов массива.

```ts
function insertionSort(arr: number[]): number[] {
    let n = arr.length;

    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }

        arr[j + 1] = key;
    }

    return arr;
}

let arr = [12, 11, 13, 5, 6];
console.log(insertionSort(arr)); // Output: [5, 6, 11, 12, 13]
```