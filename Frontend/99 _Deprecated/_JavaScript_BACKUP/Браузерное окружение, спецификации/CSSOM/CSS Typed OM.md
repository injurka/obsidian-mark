**CSS Typed OM (Typed Object Model)** — это современный API для работы с CSS-значениями в JavaScript, который предоставляет типобезопасный и более производительный способ взаимодействия с CSS по сравнению с традиционным CSSOM. Он был разработан для замены строковых значений (например, `element.style.color = "red"`) на объекты с типами, что делает код более предсказуемым и эффективным.


**CSS Typed OM (Typed Object Model)** — это современный API для работы с CSS-значениями в JavaScript, который предоставляет типобезопасный и более производительный способ взаимодействия с CSS по сравнению с традиционным CSSOM. Он был разработан для замены строковых значений (например, `element.style.color = "red"`) на объекты с типами, что делает код более предсказуемым и эффективным.

## Основные особенности CSS Typed OM

1. **Типизированные значения**:
   - В CSS Typed OM каждое CSS-свойство представлено объектом с определённым типом. Например, цвет — это объект `CSSColorValue`, а длина — `CSSUnitValue`.
   - Это устраняет необходимость работы со строками и ручного парсинга значений.

2. **Производительность**:
   - Поскольку значения представлены в виде объектов, браузеру не нужно выполнять дополнительные преобразования между строками и внутренними представлениями, что повышает производительность.

3. **Безопасность**:
   - Типизация уменьшает вероятность ошибок, связанных с неправильным форматом значений (например, передача недопустимого цвета или единицы измерения).

4. **Поддержка единиц измерения**:
   - CSS Typed OM поддерживает различные единицы измерения (пиксели, проценты, em, rem и т.д.), что позволяет работать с ними напрямую.

## Основные компоненты CSS Typed OM

1. **`element.attributeStyleMap`**:
   - Это свойство предоставляет доступ к инлайн-стилям элемента через Typed OM.
   - Пример:
     ```javascript
     const element = document.querySelector('div');
     element.attributeStyleMap.set('color', new CSSKeywordValue('red'));
     ```

2. **`CSSStyleValue`**:
   - Базовый класс для всех типизированных CSS-значений.
   - Примеры подклассов:
     - `CSSKeywordValue`: Представляет ключевые слова, например, `auto`, `inherit`.
     - `CSSUnitValue`: Представляет значения с единицами измерения, например, `10px`, `50%`.
     - `CSSColorValue`: Представляет цвета.
     - `CSSMathValue`: Представляет математические выражения, например, `calc(100% - 20px)`.

3. **`CSSUnitValue`**:
   - Представляет значение с единицей измерения.
   - Пример:
     ```javascript
     const length = new CSSUnitValue(10, 'px');
     console.log(length.value); // 10
     console.log(length.unit);  // px
     ```

4. **`CSSKeywordValue`**:
   - Представляет ключевые слова, такие как `auto`, `initial`, `inherit`.
   - Пример:
     ```javascript
     const keyword = new CSSKeywordValue('auto');
     console.log(keyword.value); // auto
     ```

5. **`CSSColorValue`**:
   - Представляет цветовые значения.
   - Пример:
     ```javascript
     const color = new CSSColorValue('rgb(255, 0, 0)');
     console.log(color.toString()); // rgb(255, 0, 0)
     ```

6. **`CSSMathValue`**:
   - Представляет математические выражения, такие как `calc()`, `min()`, `max()`.
   - Пример:
     ```javascript
     const math = new CSSMathSum(new CSSUnitValue(100, 'px'), new CSSUnitValue(20, 'px'));
     console.log(math.toString()); // calc(100px + 20px)
     ```

## Примеры использования CSS Typed OM

### 1. Установка цвета
```javascript
const element = document.querySelector('div');
element.attributeStyleMap.set('color', new CSSKeywordValue('blue'));
```

### 2. Установка длины
```javascript
const element = document.querySelector('div');
element.attributeStyleMap.set('width', new CSSUnitValue(100, 'px'));
```

### 3. Использование `calc()`
```javascript
const element = document.querySelector('div');
const width = new CSSMathSum(new CSSUnitValue(100, 'px'), new CSSUnitValue(20, 'px'));
element.attributeStyleMap.set('width', width);
```

### 4. Получение текущих значений
```javascript
const element = document.querySelector('div');
const width = element.attributeStyleMap.get('width');
console.log(width.value); // 100
console.log(width.unit);  // px
```

## Отличия CSS Typed OM от CSSOM

1. **Типизация**:
   - В CSSOM значения представлены строками, что требует ручного парсинга и может приводить к ошибкам.
   - В CSS Typed OM значения представлены объектами с типами, что делает код более безопасным и удобным.

2. **Производительность**:
   - CSS Typed OM работает с внутренними представлениями значений, что устраняет необходимость преобразований между строками и объектами.

3. **Единицы измерения**:
   - В CSSOM единицы измерения приходится обрабатывать вручную (например, извлекать число из строки `"10px"`).
   - В CSS Typed OM единицы измерения представлены как часть объекта, что упрощает работу с ними.

4. **Математические выражения**:
   - В CSSOM математические выражения (например, `calc()`) передаются как строки.
   - В CSS Typed OM они представлены объектами, что позволяет работать с ними программно.

## Пример сравнения CSSOM и CSS Typed OM

### CSSOM (традиционный способ)
```javascript
const element = document.querySelector('div');
element.style.width = 'calc(100px + 20px)'; // Строковое значение
```

### CSS Typed OM
```javascript
const element = document.querySelector('div');
const width = new CSSMathSum(new CSSUnitValue(100, 'px'), new CSSUnitValue(20, 'px'));
element.attributeStyleMap.set('width', width); // Типизированное значение
```


## Преимущества CSS Typed OM

1. **Безопасность**:
   - Типизация уменьшает вероятность ошибок, связанных с неправильным форматом значений.

2. **Производительность**:
   - Устранение преобразований между строками и объектами повышает производительность.

3. **Удобство**:
   - Работа с объектами и методами делает код более читаемым и поддерживаемым.

4. **Поддержка сложных значений**:
   - Легко работать с цветами, единицами измерения и математическими выражениями.

## Ограничения CSS Typed OM

1. **Поддержка браузеров**:
   - На момент написания CSS Typed OM поддерживается не всеми браузерами. Проверяйте актуальную информацию на [caniuse.com](https://caniuse.com).

2. **Сложность миграции**:
   - Переход с CSSOM на CSS Typed OM может потребовать значительных изменений в коде.