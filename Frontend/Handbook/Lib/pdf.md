## Via express

> routes

```js
// Просто открытие файла нативными средствами браузера
router.get('/1', function (req, res, next) {
  res.sendFile('/path.pdf');
});

// Скачивание файла и открытие в новой вкладке нативными средствами
router.get('/2', function (req, res, next) {
  res.setHeader('Content-Disposition', 'attachment; filename=2.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.sendFile('/path.pdf');
});

// Скачивание файла и открытие в новой вкладке нативными средствами
router.get('/3', function (req, res, next) {
  res.download('/path.pdf');
});

// Отображение всегда в одном стиле через pdfjs 
router.get('/4-pdfjs', function (req, res, next) {
  res.render('/html/path');
});

// Встраивание в html и открытие файла нативными средствами браузера
// *Позволяет добавить title
router.get('/5-iframe', function (req, res, next) {
  res.render('/html/path');
});

// Тоже самое что и iframe только через embed
router.get('/6-embed', function (req, res, next) {
  res.render('/html/path');
});
```

### 4-pdfjs

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Example-4</title>
	<style>
		pdfjs-viewer-element {
		  height: 100vh;
		  height: 100dvh;
		}
	</style>
  </head>

  <body>
	  <pdfjs-viewer-element 
	    src="path.pdf"
	    viewer-path="/public/vendor/pdfjs-4.0.379-dist"
	    viewer-css-theme="LIGHT"
	    page="1"
	    search="null"
	    phrase="false"
	    locale="ru"
	    text-layer="hove"
	    pagemode="none"
	    zoom="page-fit"
	  />
	<script 
		type="module" 
		src="https://cdn.skypack.dev/pdfjs-viewer-element">
	</script>
  </body>
</html>
```

### 5-iframe

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Example-5</title>
  </head>

  <body>
    <iframe src="path.pdf#zoom=page-fit" />
  </body>
</html>
```

### 6-embed

```html
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Example-6</title>
  </head>

  <body>
	<embed
      width="100%"
      height="100%"
      src="path.pdf#zoom=page-fit"
      type="application/pdf"
    />
  </body>
</html>
```
