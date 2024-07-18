Расширение/Наследование (Extend/Inheritance) в SCSS позволяет одному селектору наследовать стили другого селектора, что улучшает организацию кода и уменьшает его размер. Это достигается с помощью директивы `@extend`.

1. **Основные принципы**:
   - Директива `@extend` позволяет одному селектору наследовать стили другого селектора.
   - Это уменьшает дублирование кода и упрощает управление стилями.

2. **Пример использования**:
   Предположим, у вас есть базовый стиль для кнопок, и вы хотите создать несколько вариаций этих кнопок с дополнительными стилями. Вы можете определить базовый стиль и затем использовать `@extend` для создания новых стилей:

   ```scss
   .button {
     border: none;
     padding: 10px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 4px 2px;
     cursor: pointer;
   }

   .button-primary {
     @extend .button;
     background-color: #4CAF50;
     color: white;
   }

   .button-secondary {
     @extend .button;
     background-color: #008CBA;
     color: white;
   }
   ```

3. **Компиляция в CSS**:
   - Когда SCSS компилируется в CSS, `@extend` приводит к тому, что все селекторы, которые используют `@extend`, объединяются в один селектор.
   - Например, приведенный выше SCSS будет скомпилирован в следующий CSS:

   ```css
   .button, .button-primary, .button-secondary {
     border: none;
     padding: 10px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 4px 2px;
     cursor: pointer;
   }

   .button-primary {
     background-color: #4CAF50;
     color: white;
   }

   .button-secondary {
     background-color: #008CBA;
     color: white;
   }
   ```

4. **Плейсхолдеры (Placeholders)**:
   - В SCSS также можно использовать плейсхолдеры (селекторы, начинающиеся с `%`), которые не компилируются в CSS напрямую, но могут быть использованы с `@extend`.
   - Это полезно для создания стилей, которые не должны появляться в итоговом CSS, если они не используются.

   Пример использования плейсхолдера:

   ```scss
   %button {
     border: none;
     padding: 10px 20px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
     margin: 4px 2px;
     cursor: pointer;
   }

   .button-primary {
     @extend %button;
     background-color: #4CAF50;
     color: white;
   }

   .button-secondary {
     @extend %button;
     background-color: #008CBA;
     color: white;
   }
   ```

   При компиляции этот SCSS также будет преобразован в аналогичный CSS, как в предыдущем примере.

5. **Преимущества использования расширения/наследования**:
   - **Уменьшение дублирования**: `@extend` позволяет избежать повторения одних и тех же стилей в разных местах.
   - **Улучшение организаци