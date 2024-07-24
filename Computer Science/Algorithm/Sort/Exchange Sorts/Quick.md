Один из наиболее эффективных алгоритмов сортировки. Он используется для упорядочивания элементов в массиве или списке. Алгоритм работает следующим образом:

**Как реализуется:**

1. Выбирается опорный элемент из массива.
2. Остальные элементы разделяются на две геньеральные группы: элементы, меньшие опорного, и элементы, большие опорного.
3. Рекурсивно применяется алгоритм к каждой из двух групп.
4. Элементы объединяются в один массив в отсортированном порядке.

```ts
function partition(arr: number[], low: number, high: number): number {
    let pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSort(arr: number[], low: number, high: number): void {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function quickSortArray(arr: number[]): number[] {
    quickSort(arr, 0, arr.length - 1);
    return arr;
}

let arr = [10, 7, 8, 9, 1, 5];
console.log(quickSortArray(arr)); // Output: [1, 5, 7, 8, 9, 10]
```