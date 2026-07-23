## Введение в WebGL

- **WebGL** — это трехмерный контекст холста, разработанный не в W3C, а в **Khronos Group**.
- Khronos Group разрабатывает свободные открытые стандарты для параллельных вычислений, графики и мультимедиа.
- Основа WebGL — **OpenGL ES 2.0**.

## Основы WebGL

- **Контекст WebGL**:
  - Название контекста WebGL 2.0 — "webgl2", а WebGL 1.0 — "webgl".
  - Проверка поддержки контекста:
    ```javascript
    let drawing = document.getElementById("drawing");
    if (drawing.getContext) {
      let gl = drawing.getContext("webgl");
      if (gl) {
        // Работа с WebGL
      }
    }
    ```

- **Параметры контекста**:
  - alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer.
  - Пример:
    ```javascript
    let gl = drawing.getContext("webgl", { alpha: false });
    ```

- **Константы и методы**:
  - Константы доступны в объекте WebGL-контекста с префиксом `gl.`.
  - Методы могут принимать разное количество аргументов разных типов, обозначаемых суффиксами (например, `gl.uniform4f()`).

## Подготовка к рисованию

- **Очистка холста**:
  ```javascript
  gl.clearColor(0, 0, 0, 1); // Черный цвет
  gl.clear(gl.COLOR_BUFFER_BIT);
  ```

- **Области просмотра и координаты**:
  - Определение области просмотра:
    ```javascript
    gl.viewport(0, 0, drawing.width, drawing.height);
    ```
  - Система координат:
    - Левый нижний угол (0, 0), правый верхний (ширина-1, высота-1).
    - Внутри области просмотра: начало координат в центре, (-1, -1) в левом нижнем углу, (1, 1) в правом верхнем.

## Буферы

- Создание и наполнение буфера:
  ```javascript
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0.5, 1]), gl.STATIC_DRAW);
  ```
- Типы использования буфера: STATIC_DRAW, STREAM_DRAW, DYNAMIC_DRAW.

## Ошибки

- Проверка ошибок:
  ```javascript
  let errorCode = gl.getError();
  while (errorCode) {
    console.log("Error occurred: " + errorCode);
    errorCode = gl.getError();
  }
  ```

## Шейдеры

- **Типы шейдеров**: вершинные и фрагментные.
- **Создание шейдеров**:
  - Использование GLSL (OpenGL Shading Language).
  - Пример вершинного шейдера:
    ```glsl
    attribute vec2 aVertexPosition;
    void main() {
      gl_Position = vec4(aVertexPosition, 0.0, 1.0);
    }
    ```
  - Пример фрагментного шейдера:
    ```glsl
    uniform vec4 uColor;
    void main() {
      gl_FragColor = uColor;
    }
    ```

- **Создание программы с шейдерами**:
  - Компиляция и компоновка шейдеров:
    ```javascript
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexGlsl);
    gl.compileShader(vertexShader);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentGlsl);
    gl.compileShader(fragmentShader);
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    ```

- **Передача значений шейдерам**:
  - Однородные значения:
    ```javascript
    let uColor = gl.getUniformLocation(program, "uColor");
    gl.uniform4fv(uColor, [0, 0, 0, 1]);
    ```
  - Атрибуты:
    ```javascript
    let aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(aVertexPosition);
    gl.vertexAttribPointer(aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);
    ```

## Рисование

- **Методы рисования**: `drawArrays()` и `drawElements()`.
- Пример рисования треугольника:
  ```javascript
  gl.drawArrays(gl.TRIANGLES, 0, vertexSetCount);
  ```

## Текстуры

- Создание и настройка текстур:
  ```javascript
  let image = new Image();
  image.src = "smile.gif";
  image.onload = function() {
    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  ```

## Чтение пикселей

- Метод `readPixels()`:
  ```javascript
  let pixels = new Uint8Array(25 * 25);
  gl.readPixels(0, 0, 25, 25, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  ```

## Сравнение WebGL1 и WebGL2

- Код для WebGL1 почти полностью совместим с WebGL2.
- В WebGL2 многие расширения стали стандартными функциями.

## Итоги

- WebGL предоставляет мощные возможности для трехмерной графики в веб-приложениях.
- Основные концепции включают контексты, буферы, шейдеры, текстуры и методы рисования.
- WebGL2 улучшает совместимость и добавляет новые функции по сравнению с WebGL1.