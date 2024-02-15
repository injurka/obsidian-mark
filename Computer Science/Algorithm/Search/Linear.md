```ts
function linearSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }

    return -1;
}

let arr = [2, 3, 4, 10, 40];
console.log(linearSearch(arr, 10)); // Output: 3
```