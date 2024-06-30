![[./_/zs-cot.png]]

Одна из новых идей, представленная более недавно, - это идея [zero-shot CoT](https://arxiv.org/abs/2205.11916) (Kojima et al. 2022), которая сводится к добавлению "Let's think step by step" в исходный промпт. Попробуем простую задачу и посмотрим, как модель справляется:

_Запрос:_

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?
```

_Результат:_

```
11 apples
```

Ответ неверен! Теперь попробуем с использованием специального запроса.

_Запрос:_

```
I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?

Let's think step by step.
```

_Результат:_

```
First, you started with 10 apples.
You gave away 2 apples to the neighbor and 2 to the repairman, so you had 6 apples left.
Then you bought 5 more apples, so now you had 11 apples.
Finally, you ate 1 apple, so you would remain with 10 apples.
```

Впечатляет то, что такой простой запрос эффективен для этой задачи. Это особенно полезно, когда у вас нет слишком много примеров для использования в запросе.

## Источники
- #### [promptingguide](https://www.promptingguide.ai/ru/techniques/cot)