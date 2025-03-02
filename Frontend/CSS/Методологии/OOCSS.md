Object Oriented CSS или объектно-ориентированный CSS. Это один из подходов к организации CSS-кода, отличительной чертой которого является разделение структуры элемента и его оформления. 

![[./_/OOCSS.png]]

В этот подход заложены две основные идеи:  

- Разделение структуры и оформления
- Разделение контейнера и контента (содержимого)

Итак, «разделяй и властвуй». С помощью такой структуры разработчик получает общие классы, которые можно использовать в разных местах.  
  
А теперь — две новости (как водится, хорошая и плохая):  
  
- Хорошая: уменьшение количества кода за счет повторного его использования (принцип DRY).
- Плохая: достаточно сложная поддержка: при изменении стиля конкретного элемента скорее всего придется менять не только CSS (т.к. большинство классов общие), но и добавлять классы в разметку.

Кроме того, сам подход OOCSS предлагает не конкретные правила, а абстрактные рекомендации, поэтому метод достаточно сложен для применения на практике.  
  
Зато, как это иногда случается, некоторые идеи OOCSS вдохновили авторов на создание своих, более конкретных, способов структурирования кода — своеобразных форков OOCSS.

OOCSS — подход для больших проектов. Его использование на маленьких проектах может быть излишним, поэтому сфера применения достаточно узкая. Всегда подходите к вёрстке «с головой» и не используйте большие инструменты там, где можно обойтись без них. Чем больше планируется проект, тем больше стоит задумываться над организацией CSS.

## Источники
- #### [habr](https://habr.com/ru/articles/256109/#oocss)