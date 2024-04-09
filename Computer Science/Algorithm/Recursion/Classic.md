Классическая реализация рекурсивного вычисления факториала

```typescript
function factorial (n: number): number {
	return n
		? n * factorial(n - 1)
		: 1
}
```

Классическая реализация рекурсивного вычисления фибоначчи

```typescript
function fib(n: number): number {
	return n <= 1
		? n
		: fib(n - 1) + fib(n - 2)
}
```


Из за большого количества вызовов функции может произойти ошибка: 
*Range Error: Maximum call stack size exceeded*
