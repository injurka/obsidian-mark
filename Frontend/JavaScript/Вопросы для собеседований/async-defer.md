В JS для тега script есть два атрибута: async и defer. Можешь рассказать про разницу между ними и какой нужно когда использовать?

> [!INFO]- Ответ
> >
> 1. async
> >
> <u>Что делает?</u>
> Скрипт загружается асинхронно, то есть браузер не блокирует парсинг HTML-документа во время загрузки скрипта.
> Как только скрипт загружен, он выполняется немедленно, даже если парсинг HTML еще не завершен.
> >
> <u>Когда нужен?</u>
> Когда скрипт не зависит от других скриптов или DOM-структуры.
> Когда важно, чтобы скрипт выполнился как можно скорее после загрузки, но не обязательно до завершения парсинга HTML.
> >
> 2. defer
> > 
> <u>Что делает?</u>
> Скрипт загружается асинхронно, как и в случае с async. Однако выполнение скрипта откладывается до тех пор, пока весь HTML-документ не будет полностью проанализирован и готов. Скрипты с атрибутом defer выполняются в том порядке, в котором они расположены в HTML-документе.
> >
> <u>Когда нужен?</u>
> Когда скрипт зависит от полной готовности DOM-структуры.
> Когда порядок выполнения скриптов важен.
>
