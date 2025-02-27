Вот таблица асимптотики сложности для различных алгоритмов сортировки:

| Name        | Best       | Average       | Worst         | Memory   | Stable |
| ----------- | ---------- | ------------- | ------------- | -------- | ------ |
| Bubble      | O(n)       | O(n^2)        | O(n^2)        | O(1)     | Yes    |
| Quick       | O(n log n) | O(n log n)    | O(n^2)        | O(log n) | No     |
| Cocktail    | O(n)       | O(n^2)        | O(n^2)        | O(1)     | Yes    |
| Comb        | O(n log n) | O(n^2)        | O(n^2)        | O(1)     | Yes    |
| Selection   | O(n^2)     | O(n^2)        | O(n^2)        | O(1)     | No     |
| Heap        | O(n log n) | O(n log n)    | O(n log n)    | O(1)     | No     |
| Insertion   | O(n)       | O(n^2)        | O(n^2)        | O(1)     | Yes    |
| Shell       | O(n log n) | O(n(log n)^2) | O(n(log n)^2) | O(1)     | No     |
| Gnome       | O(n)       | O(n^2)        | O(n^2)        | O(1)     | Yes    |
| Merge       | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| 3-way Merge | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| Bucket      | O(n+k)     | O(n+k)        | O(n^2)        | O(n+k)   | Yes    |
| Counting    | O(n+k)     | O(n+k)        | O(n+k)        | O(n+k)   | Yes    |
| Radix       | O(nk)      | O(nk)         | O(nk)         | O(n+k)   | Yes    |
| Pigeonhole  | O(n+k)     | O(n+k)        | O(n+k)        | O(n+k)   | Yes    |
| Tim         | O(n)       | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| Bingo       | O(n^2)     | O(n^2)        | O(n^2)        | O(1)     | No     |
| Cycle       | O(n^2)     | O(n^2)        | O(n^2)        | O(1)     | No     |
| Strand      | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| Bitonic     | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | No     |
| Pancake     | O(n)       | O(n^2)        | O(n^2)        | O(1)     | No     |
| Bogo        | O(n)       | O(n!)         | O(n!)         | O(1)     | No     |
| Sleep       | O(n)       | O(n)          | O(n)          | O(1)     | No     |
| Stooge      | O(n^2.7)   | O(n^2.7)      | O(n^2.7)      | O(n)     | No     |
| Tag         | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| Tree        | O(n log n) | O(n log n)    | O(n log n)    | O(n)     | Yes    |
| Odd-Even    | O(n^2)     | O(n^2)        | O(n^2)        | O(1)     | Yes    |

Обозначения:
- **Best**: Лучший случай
- **Average**: Средний случай
- **Worst**: Худший случай
- **Memory**: Требуемая память
- **Stable**: Стабильность (сортировка сохраняет относительный порядок равных элементов)

