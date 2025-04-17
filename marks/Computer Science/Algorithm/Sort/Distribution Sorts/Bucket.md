Основан на идее разделения массива на несколько "ведер" (buckets), в которые помещаются элементы с определенным диапазоном значений. Затем элементы в каждом ведре сортируются, а затем объединяются в один отсортированный массив. Bucket sort эффективен в случае, когда входные данные равномерно распределены в заданном диапазоне значений. Он может быть полезен, когда известно, что входные данные находятся в определенном диапазоне, и когда требуется эффективная сортировка в таких условиях.

**Как реализуется:**

1. Создается массив ведер (buckets), количество ведер обычно выбирается исходя из размера входного массива и диапазона значений.
2. Каждый элемент входного массива распределяется в соответствующее ведро на основе некоторой функции распределения.
3. Каждое ведро сортируется, например, с помощью другого алгоритма сортировки (например, сортировки вставками).
4. Элементы из отсортированных ведер объединяются в один отсортированный массив.

```ts
function bucketSort(arr: number[]): number[] {
    if (arr.length === 0) {
        return arr;
    }

    // Find minimum and maximum values
    let minValue = arr[0];
    let maxValue = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < minValue) {
            minValue = arr[i];
        } else if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }

    // Initialize buckets
    const bucketCount = Math.floor((maxValue - minValue) / arr.length) + 1;
    const buckets: number[][] = new Array(bucketCount);
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }

    // Distribute input data into buckets
    for (let i = 0; i < arr.length; i++) {
        buckets[Math.floor((arr[i] - minValue) / bucketCount)].push(arr[i]);
    }

    arr.length = 0;
    for (let i = 0; i < bucketCount; i++) {
        if (buckets[i].length > 1) {
            buckets[i].sort((a, b) => a - b);
        }
        for (let j = 0; j < buckets[i].length; j++) {
            arr.push(buckets[i][j]);
        }
    }

    return arr;
}

let arr = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
console.log(bucketSort(arr)); // Output: [0.1234, 0.3434, 0.565, 0.656, 0.665, 0.897]
```