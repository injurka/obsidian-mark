# Blob и File

Если `ArrayBuffer` — это сырые данные в памяти, то `Blob` (Binary Large Object) и `File` — это высокоуровневые объекты для работы с бинарными файлами.

## Blob
`Blob` представляет собой объект, содержащий данные (которые могут быть строками, типизированными массивами, другими Blob) и MIME-тип (например, `image/png` или `text/plain`). 
С помощью `Blob` можно легко создавать файлы «на лету» в браузере и позволять пользователю их скачивать.

### Пример применения Blob
```javascript
// Создаём текстовый Blob
let blob = new Blob(["Hello, world!"], { type: "text/plain" });

// Создаём ссылку на этот Blob для скачивания или отображения
let url = URL.createObjectURL(blob);
let link = document.createElement("a");
link.href = url;
link.download = "hello.txt";
link.click();

URL.revokeObjectURL(url); // Освобождаем память
```

## File
Объект `File` является наследником `Blob`. Он имеет все те же возможности, но дополнительно содержит информацию о файле:
- Имя файла (`name`)
- Дату последней модификации (`lastModified`)

Объекты `File` обычно появляются, когда пользователь выбирает файл через `<input type="file">` или перетаскивает его в браузер (Drag-and-Drop).

### Пример применения File
```html
<input type="file" id="fileInput">
<script>
  document.getElementById("fileInput").addEventListener("change", function(event) {
    let file = event.target.files[0];
    console.log("Имя:", file.name);
    console.log("Размер:", file.size);
    console.log("Тип:", file.type);
    
    // Мы можем прочитать его содержимое как ArrayBuffer, если нужно
    file.arrayBuffer().then(buffer => {
      console.log("Данные загружены в память", buffer);
    });
  });
</script>
```

Оба класса незаменимы при загрузке файлов на сервер (например, через `FormData` в `fetch`).
