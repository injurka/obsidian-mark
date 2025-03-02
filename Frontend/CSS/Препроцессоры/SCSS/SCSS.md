SCSS (Sassy CSS) является расширенной версией CSS, которая добавляет множество функций для улучшения структуры, читаемости и поддерживаемости кода. Вот основные "фичи" SCSS, расписанные по пунктам:

- ### [[At-Rules]]

1. **[[Вложенные правила|Вложенные правила (Nested Rules)]]**:
   - Позволяют вкладывать селекторы внутрь других селекторов, что улучшает читаемость и организует код более иерархически.

2. **[[Переменные|Переменные (Variables)]]**:
   - Позволяют определять переменные для повторно используемых значений, таких как цвета, шрифты и размеры, что упрощает управление стилями.

3. **[[Миксины|Миксины (Mixins)]]**:
   - Позволяют создавать группы стилей, которые можно включать в различные селекторы, что уменьшает дублирование кода и упрощает его изменение.

4. **[[Расширение и Наследование|Расширение/Наследование (Extend/Inheritance)]]**:
   - Позволяет одному селектору наследовать стили другого селектора, что улучшает организацию кода и уменьшает его размер.

5. **[[Плейсхолдеры|Плейсхолдеры (Placeholders)]]**:
   - Похожи на миксины, но используются только с директивой `@extend`, что позволяет оптимизировать итоговый CSS.

6. **[[Встроенные функции|Встроенные функции (Built-in Functions)]]**:
   - Предоставляют множество полезных функций для работы с цветами, строками, числами и другими значениями.

7. **[[Операции|Операции (Operations)]]**:
   - Позволяют выполнять математические операции прямо в SCSS, что упрощает вычисления размеров, отступов и других значений.

8. **[[Условия|Условия (Conditionals)]]**:
   - Позволяют использовать условные операторы (`@if`, `@else`) для создания более динамичных и адаптивных стилей.

9. **[[Циклы|Циклы (Loops)]]**:
   - Позволяют использовать циклы (`@for`, `@each`, `@while`) для генерации повторяющихся стилей, что уменьшает дублирование и упрощает масштабирование.

10. **[[Импорт|Импорт (Import)]]**:
    - Позволяет разделять код на несколько файлов и импортировать их в один основной файл, что улучшает организацию и модульность кода.

11. **[[Интерполяция|Интерполяция (Interpolation)]]**:
    - Позволяет вставлять значения переменных и результаты выражений прямо в селекторы и свойства, что делает код более динамичным.

