**Рекурсия** – это когда функция вызывает сама себя(напрямую или через функцию посредника), как правило, с другими аргументами. Рекурсия помогает писать код более компактно и понятно, однако имеет оверхэд по памяти из-за необходимости хранить стек вызова. Для оптимизации можно переписать алгоритм используя циклы - любая рекурсия может быть переделана в цикл, как правило, вариант с циклом будет эффективнее. Также есть хвостовая рекурсия.

Хвостовая рекурсия — частный случай рекурсии, при котором любой рекурсивный вызов является последней операцией перед возвратом из функции. Подобный вид рекурсии примечателен тем, что может быть легко заменён на итерацию путём формальной и гарантированно корректной перестройки кода функции. Оптимизация хвостовой рекурсии путём преобразования её в плоскую итерацию реализована во многих оптимизирующих компиляторах. В некоторых функциональных языках программирования спецификация гарантирует обязательную оптимизацию хвостовой рекурсии.

- ### [[Classic]]
- ### [[Tail]]
- ### [[Trampoline]]

## Источники
- #### [dzen](https://dzen.ru/a/Xolo6d3I5SBnPc6Y)
