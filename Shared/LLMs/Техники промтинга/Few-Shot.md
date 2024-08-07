Большие языковые модели (**LLMs**) демонстрируют возможности **Zero-shot** промптинга, но ограничены в сложных задачах. **Few-shot** промптинг используется для контекстного обучения, предоставляя примеры в запросе для повышения производительности. Исследования показали, что размер модели влияет на возможности **Few-shot** промптинга.

Пример **few-shot** промптинга: использование нового слова в предложении с одним примером (1-shot). Для сложных задач можно увеличивать количество примеров (3-shot, 5-shot, 10-shot и т. д.).

Пример с `1-shot`

_Запрос:_

```
A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses
the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.
To do a "farduddle" means to jump up and down really fast. An example of a sentence that uses
the word farduddle is:
```

_Результат:_

```
When we won the game, we all started to farduddle in celebration.
```

Советы по использованию few-shot промптинга:

- "пространство меток и распределение входного текста, заданного демонстрациями, оба являются важными (независимо от того, являются ли метки правильными для отдельных входов)"
  
- формат, который вы используете, также играет ключевую роль в производительности. Даже если вы используете случайные метки, это гораздо лучше, чем отсутствие меток вообще.
  
- дополнительные результаты показывают, что выбор случайных меток из реального распределения меток (вместо равномерного распределения) также помогает.


Пример через метки `Negative` и `Positive`

_Запрос:_

```
This is awesome! // Negative
This is bad! // Positive
Wow that movie was rad! // Positive
What a horrible show! //
```

_Результат:_

```
Negative
```

## Ограничения few-shot промптинга

Стандартный few-shot промптинг хорошо работает для многих задач, но это все еще несовершенная техника, особенно при работе с более сложными задачами рассуждения. Например:

```
The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1. 

A: 
```

Если мы повторим этот пример, модель выводит следующее:

```
Yes, the odd numbers in this group add up to 107, which is an even number.
```

Это неправильный ответ, что подчеркивает ограничения таких систем и необходимость более продвинутой техники формулировки запросов.

Давайте попробуем добавить несколько примеров, чтобы посмотреть, улучшит ли few-shot промптингрезультаты.

_Запрос:_

```
The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: The answer is False.

The odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.
A: The answer is True.

The odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.
A: The answer is True.

The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
A: The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1. 
A: 
```

_Результат:_

```
The answer is True.
```

Это не сработало. Кажется, что few-shot промптинга недостаточно для получения надежных ответов на этот тип задач рассуждения. Приведенный выше пример предоставляет базовую информацию о задаче. Если взглянуть поближе, то задача, которую мы представили, включает несколько более сложных шагов рассуждения. Другими словами, возможно, будет полезно разбить проблему на шаги и продемонстрировать их модели. Недавно [[Chain-of-Thought]] стал популярным для решения более сложных задач арифметики, здравого смысла и символического рассуждения

В целом, предоставление примеров полезно для решения некоторых задач. Когда zero-shot и few-shot промптингов недостаточны, это может означать, что то, что было изучено моделью, недостаточно для успешного выполнения задачи. В таком случае рекомендуется начать думать о настройке модели или экспериментах с более продвинутыми техниками формулировки запросов.

## Источники
- #### [promptingguide](https://www.promptingguide.ai/ru/techniques/fewshot)