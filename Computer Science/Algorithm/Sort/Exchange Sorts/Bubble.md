Многократно проходит по списку элементов и сравнивает соседние элементы, меняя их местами, если они находятся в неправильном порядке. Этот процесс продолжается до тех пор, пока все элементы не будут отсортированы.

**Как реализуется:**

1. Пройти по всем элементам списка, начиная с первого.
2. Сравнивать каждый элемент с его соседним элементом.
3. Если элементы находятся в неправильном порядке, поменять их местами.
4. Продолжать проход по списку до тех пор, пока не будет выполнено ни одно обменное действие на протяжении прохода по всем элементам.
5. Повторять шаги 1-4 до тех пор, пока весь список не будет отсортирован.

```ts
function bubbleSort(arr: number[]): number[] {
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 1; j <= i; j++) {
            if (arr[j-1] > arr[j]) {
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    
    return arr;
}

let arr = [5, 3, 8, 4, 6];
console.log(bubbleSort(arr)); // Output: [3, 4, 5, 6, 8]
```