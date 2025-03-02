---
dg-publish: true
---
CSR, или Client Side Rendering, - это подход к рендерингу веб-страниц, при котором основная работа по отрисовке интерфейса веб-приложения выполняется на стороне клиента (браузера пользователя).

В CSR, когда пользователь запрашивает страницу, браузер отправляет запрос на сервер для получения HTML-файла, который содержит только структуру страницы и ссылки на необходимые скрипты и стили. Затем браузер загружает и выполняет JavaScript-код, который отвечает за динамическое обновление и отрисовку контента на странице.

---

Приведем пример на библиотеке React
  
Всё дело в том, что React — это **JavaScript** библиотека, а это значит, что код может быть исполнен в среде Node.js или в браузере. В нашем случае это браузер.  И если выключить JS в браузере, то мы увидим только пустую страницу, потому что дерево рисуется скриптом.

**И принцип работы React построен следующим образом**:

- при открытии сайта браузер отправляет запрос на сервер;
    
- тот в ответ возвращает пустую страницу index.html, в которой нет разметки, кроме блока div с уникальным идентификатором (id);
    
- и есть тег script (здесь в блоке head), в котором подключается React-приложение;
    
- затем браузер парсит эту страничку, и когда доходит до тега `</script>`, загружает файл со скриптом и исполняет его;
    
- библиотека ReactDOM встроит приложение в блок div c идентификатором root, и после этого мы увидим наше приложение в браузере.
    
- будет сделан API-запрос на получение данных
    
- React отобразит данные, полученные в ответе от сервера, на странице
    

Итого для отображения списка фильмов, React делает 3 запроса (без учета стилей, шрифтов и картинок)

Постарался схематично отобразить этот процесс.

![[./_/csr.png]]

**Такой способ отрисовки называется Client Side Rendering (CSR), когда вся работа по рендерингу приложения выполняется на стороне клиента, в браузере.**

Приложения, сделанные с таким подходом, легки в разработке и весят меньше в размере (сравнение размеров с разными подходами в главе «Синтетические тесты»). Когда у вас ограниченные ресурсы на хостинге или ваше приложение закрыто для всех, например у вас панель администрирования, то CSR вам отлично подойдет.

Если мы опубликуем наше приложение в сети и попытаемся найти в Гугле, то мы получим минимум информации о содержимом сайта. Всё дело в том, что SEO анализаторы, сканируя приложение, не загружают JavaScript, и не поймут, какое содержание у нашего сайта. 

А если у вас тот случай, когда сайт публичный и важна настройка SEO-аналитики, то здесь отлично подойдет SSG.
