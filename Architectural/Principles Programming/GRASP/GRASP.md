## GRASP (general responsibility assignment software patterns)

Шаблоны GRASP являются скорее не паттернами проектирования (как GoF'овские), а фундаментальными принципами распределения ответственности между классами. Они, как показывает практика, не обладают особой популярностью, однако анализ спроектированных классов с использованием полного набора GRASP'овских паттернов является необходимым условием написания хорошего кода.

Полный список шаблонов GRASP состоит из 9 элементов

- ### [[Information Expert]]
- ### [[Creator]]
- ### [[Controller]]
- ### [[Low Coupling]]
- ### [[High Cohesion]]
- ### [[Polymorphism]]
- ### [[Pure Fabrication]]
- ### [[Indirection]]
- ### [[Protected Variations]]

## Признаки плохого проекта

- Закрепощённость: система с трудом поддается изменениям, поскольку любое минимальное изменение вызывает эффект "снежного кома", затрагивающего другие компоненты системы.
- Неустойчивость: в результате осуществляемых изменений система разрушается в тех местах, которые не имеют прямого отношения к непосредственно изменяемому компоненту.
- Неподвижность: достаточно трудно разделить систему на компоненты, которые могли бы повторно использоваться в других системах.
- Вязкость - сделать что-то правильно намного сложнее, чем выполнить какие-либо некорректные действия.
- Неоправданная сложность: проект включает инфраструктуру, применение которой не влечёт непосредственной выгоды.
- Неопределенность: исходный код трудно читать и понимать. Недостаточно четко выражено содержимое проекта.