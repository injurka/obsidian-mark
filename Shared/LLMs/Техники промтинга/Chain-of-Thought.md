![[cot.png]]

**CoT** позволяет выполнять сложные рассуждения с помощью промежуточных шагов рассуждения. Можно комбинировать ее с *few-shot*, чтобы получить лучшие результаты в более сложных задачах, требующих рассуждения перед ответом.

_Запрос:_

```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.
A: Adding all the odd numbers (17, 19) gives 36. The answer is True.

The odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.
A: Adding all the odd numbers (11, 13) gives 24. The answer is True.

The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
A: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1. 
A:
```

_Результат:_

```
Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```

Достаточно одного примера:

_Запрос:_

```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1. 
A:
```

_Результат:_

```
Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.
```

Также можно свести все `Let's think step by step` - [[Zero-shot Chain-of-Thought]]

## Источники
- #### [promptingguide](https://www.promptingguide.ai/ru/techniques/cot)