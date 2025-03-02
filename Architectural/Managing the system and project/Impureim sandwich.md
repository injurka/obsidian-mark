В такой архитектуре принято, что чистые функции не могут вызывать функции с сайд-эффектами, только наоборот. Используя её, мы можем создать «сэндвич», где:

- Функции с сайд-эффектами общаются с внешним миром, получают от окружения данные (запросы к БД, реакция на действия пользователей — это всё здесь);
- Затем чистые функции как-то преобразовывают полученные данные;
- А после функции с сайд-эффектами меняют состояние внешнего мира (например, перерисовывают пользовательский интерфейс).

Получается, как его [зовёт Марк Симан](https://blog.ploeh.dk/2020/03/02/impureim-sandwich/), _impure / pure / impure_ или _impureim_ сэндвич.

![[./_/impureim-sandwich.png]]

Чистые функции в таком сэндвиче только преобразовывают данные, получить эти данные и отобразить — дело функций с сайд-эффектами.

Можно сказать, что «хлеб» в этом сэндвиче позволяет нам создать условия для вызова чистой функции с основной работой, а потом посмотреть или вывести результат.