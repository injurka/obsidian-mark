### Основы работы с элементом `<canvas>`

1. **Атрибуты и инициализация**:
   - Для использования `<canvas>` нужно задать атрибуты `width` и `height`.
   - Контент между тегами `<canvas>` выводится, если элемент не поддерживается.
```html
<canvas id="drawing" width="200" height="200">A drawing of something.</canvas>
```

2. **Стилизация и видимость**:
   - Атрибуты `width` и `height` можно изменять динамически.
   - Элемент можно стилизовать с помощью CSS.
   - Если нет стилей и рисунков, элемент остается невидимым.

3. **Получение контекста рисования**:
   - Используйте метод `getContext()` для получения контекста рисования.
   - Передайте `"2d"` для двухмерного контекста.
```javascript
let drawing = document.getElementById("drawing");
if (drawing.getContext) {
 let context = drawing.getContext("2d");
}
   ```

4. **Экспорт изображений**:
   - Используйте метод `toDataURL()` для экспорта изображения.
   - Принимает формат изображения (MIME-тип).
```javascript
if (drawing.getContext) {
 let imgURI = drawing.toDataURL("image/png");
 let image = document.createElement("img");
 image.src = imgURI;
 document.body.appendChild(image);
}
```

### Двухмерный контекст

1. **Координаты и размеры**:
   - Начало координат в верхнем левом углу.
   - Значения `x` увеличиваются слева направо, `y` — сверху вниз.

2. **Заливка и рисование контура**:
   - Используйте `fillStyle` и `strokeStyle` для стилизации.
   - Методы `fillRect()` и `strokeRect()` для прямоугольников.
```javascript
context.fillStyle = "#ff0000";
context.fillRect(10, 10, 50, 50);
context.strokeStyle = "rgba(0,0,255,0.5)";
context.strokeRect(30, 30, 50, 50);
```

3. **Рисование путей**:
   - Начните путь с `beginPath()`.
   - Используйте методы `arc()`, `lineTo()`, `moveTo()` и другие для создания пути.
   - Завершите путь с `closePath()`, `fill()`, или `stroke()`.
```javascript
context.beginPath();
context.arc(100, 100, 99, 0, 2 * Math.PI, false);
context.moveTo(194, 100);
context.arc(100, 100, 94, 0, 2 * Math.PI, false);
context.stroke();
```

4. **Рисование текста**:
   - Используйте `fillText()` и `strokeText()` для рисования текста.
   - Настройте шрифт с `font`, выравнивание с `textAlign`, и базовую линию с `textBaseline`.
```javascript
context.font = "bold 14px Arial";
context.textAlign = "center";
context.textBaseline = "middle";
context.fillText("12", 100, 20);
```

5. **Преобразования**:
   - Используйте методы `rotate()`, `scale()`, `translate()`, `transform()`, и `setTransform()` для преобразований.
   - Сохраняйте и восстанавливайте состояние с `save()` и `restore()`.
```javascript
context.translate(100, 100);
context.rotate(1);
context.fillRect(0, 0, 100, 100);
```

6. **Рисование изображений**:
   - Используйте `drawImage()` для вывода изображений.
   - Можно масштабировать и выводить части изображения.
```javascript
context.drawImage(image, 10, 10);
context.drawImage(image, 50, 10, 20, 30);
context.drawImage(image, 0, 10, 50, 50, 0, 100, 40, 60);
```

7. **Тени**:
   - Настройте тени с `shadowColor`, `shadowOffsetX`, `shadowOffsetY`, и `shadowBlur`.
```javascript
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 4;
context.shadowColor = "rgba(0, 0, 0, 0.5)";
```

8. **Градиенты и узоры**:
   - Создавайте линейные и радиальные градиенты с `createLinearGradient()` и `createRadialGradient()`.
   - Создавайте узоры с `createPattern()`.
```javascript
let gradient = context.createLinearGradient(30, 30, 70, 70);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
context.fillStyle = gradient;
```

9. **Работа с данными изображений**:
   - Получайте данные изображения с `getImageData()`.
   - Изменяйте и выводите данные с `putImageData()`.
```javascript
let imageData = context.getImageData(10, 5, 50, 50);
let data = imageData.data;
for (let i = 0; i < data.length; i += 4) {
 let average = Math.floor((data[i] + data[i + 1] + data[i + 2]) / 3);
 data[i] = average;
 data[i + 1] = average;
 data[i + 2] = average;
}
context.putImageData(imageData, 0, 0);
```

10. **Композиция изображений**:
    - Управляйте прозрачностью с `globalAlpha`.
    - Управляйте композицией с `globalCompositeOperation`.
    ```javascript
    context.globalAlpha = 0.5;
    context.globalCompositeOperation = "destination-over";
    ```
