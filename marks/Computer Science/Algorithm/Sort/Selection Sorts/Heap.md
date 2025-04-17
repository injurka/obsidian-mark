Использует структуру данных "куча" (heap) для эффективной сортировки элементов. Он обладает временной сложностью O(n log n) в худшем и среднем случаях.

**Как реализуется:**

1. Построение кучи (heapify): Преобразование массива элементов в кучу. Это делается путем просеивания вниз (sift down) начиная с последнего узла, который не является листовым.
2. Сортировка: После построения кучи, наибольший элемент (в случае сортировки по возрастанию) находится в корне кучи. Этот элемент меняется местами с последним элементом в куче, затем куча уменьшается на 1 элемент и восстанавливается свойство кучи. Этот процесс повторяется до тех пор, пока в куче не останется один элемент.

```ts
function heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr: number[]): number[] {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i >= 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
}

let arr = [12, 11, 13, 5, 6, 7];
console.log(heapSort(arr)); // Output: [5, 6, 7, 11, 12, 13]
```