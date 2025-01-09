[[Frontend/JavaScript/Сетевые запросы/Fetch|Fetch]] предоставляет возможность работы с сетью, с его помощью можно отправлять запросы на сервер.

```
fetch('http://example.com/movies.json')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data)
  })
```

## Источники
- #### [doka](https://doka.guide/js/bom/)
