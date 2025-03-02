## Event Dispatchers, Events, Functions, Macros

**Event Dispatchers:**

* **Определение:** Event Dispatcher - это механизм, который позволяет передавать события между различными Blueprint Class. Он похож на сигнал, который может быть вызван в одном Blueprint и обработан в другом.
* **Использование:** Используется для создания гибких и расширяемых систем, где различные объекты могут взаимодействовать друг с другом.
* **Пример:** Создание Event Dispatcher для события "OnPlayerDeath", которое может быть вызвано при смерти игрока и обработано другими объектами, такими как UI или другие игровые объекты.

**Events:**

* **Определение:** Events - это узлы, которые представляют собой действия, происходящие в игре (например, нажатие кнопки, столкновение объектов). Они запускаются автоматически при наступлении определенного события.
* **Использование:** Используются для реагирования на события в игре и выполнения соответствующей логики.
* **Пример:** Event "BeginPlay" запускается при запуске уровня, а Event "Tick" запускается каждый кадр.

**Functions:**

* **Определение:** Functions - это блоки кода, которые могут быть вызваны из Graph. Они позволяют создавать повторно используемые блоки логики.
* **Использование:** Используются для создания функциональности, которая может быть вызвана из различных мест в Graph.
* **Пример:** Создание функции "CalculateDamage", которая вычисляет урон на основе различных параметров.

**Macros:**

* **Определение:** Macros - это блоки кода, которые похожи на функции, но могут содержать несколько узлов и использоваться для создания более сложных повторно используемых блоков логики.
* **Использование:** Используются для создания сложных блоков логики, которые могут быть вызваны из различных мест в Graph.
* **Пример:** Создание макроса "CheckHealth", который проверяет текущее здоровье и выполняет различные действия в зависимости от результата.

## Переменные (Variables): типы данных, области видимости, привязка к компонентам

**Типы данных:**

* **Boolean:** Логический тип данных (true/false).
* **Integer:** Целочисленный тип данных.
* **Float:** Тип данных с плавающей запятой.
* **String:** Строковый тип данных.
* **Vector:** Векторный тип данных (содержит три значения: X, Y, Z).
* **Rotator:** Тип данных для представления поворота (содержит три значения: Pitch, Yaw, Roll).
* **Object Reference:** Ссылка на объект (например, ссылка на другой Blueprint Class).

**Области видимости:**

* **Private:** Переменная доступна только внутри Blueprint Class.
* **Public:** Переменная доступна из других Blueprint Class.
* **EditAnywhere:** Переменная может быть изменена в редакторе и доступна из других Blueprint Class.
* **VisibleAnywhere:** Переменная видна в редакторе, но не может быть изменена.

**Привязка к компонентам:**

* **Определение:** Переменные могут быть привязаны к компонентам, что позволяет управлять свойствами компонентов через переменные.
* **Пример:** Создание переменной "Speed" и привязка ее к компоненту "MovementComponent" для управления скоростью передвижения персонажа.

## Конструкторы (Construction Script) и деструкторы (Destructor)

**Конструкторы (Construction Script):**

* **Определение:** Construction Script - это блок кода, который выполняется при создании объекта. Он используется для инициализации объекта и настройки его свойств.
* **Использование:** Используется для настройки объекта при его создании, например, для установки начальных значений переменных или добавления компонентов.
* **Пример:** В Construction Script можно установить начальное положение объекта, добавить компоненты или настроить их свойства.

**Деструкторы (Destructor):**

* **Определение:** Destructor - это блок кода, который выполняется при уничтожении объекта. Он используется для освобождения ресурсов и выполнения завершающих действий.
* **Использование:** Используется для выполнения завершающих действий, таких как сохранение данных или освобождение ресурсов.
* **Пример:** В Destructor можно сохранить данные объекта перед его уничтожением или освободить ресурсы, которые он использовал.

## Условные операторы (Branch, FlipFlop, Gate)

**Branch:**

* **Определение:** Branch - это условный оператор, который позволяет выполнять различные действия в зависимости от значения логического выражения.
* **Использование:** Используется для создания ветвления в логике, где разные действия выполняются в зависимости от условия.
* **Пример:** Использование Branch для проверки, является ли игрок на земле, и выполнения различных действий в зависимости от результата.

**FlipFlop:**

* **Определение:** FlipFlop - это оператор, который переключается между двумя состояниями при каждом вызове.
* **Использование:** Используется для создания циклической логики, где действия выполняются поочередно.
* **Пример:** Использование FlipFlop для переключения между двумя анимациями (например, ходьба и бег).

**Gate:**

* **Определение:** Gate - это оператор, который позволяет пропускать или блокировать поток выполнения в зависимости от состояния.
* **Использование:** Используется для управления потоком выполнения, например, для блокировки действий до выполнения определенного условия.
* **Пример:** Использование Gate для блокировки атаки персонажа до завершения анимации.

## Циклы (ForLoop, ForEachLoop)

**ForLoop:**

* **Определение:** ForLoop - это цикл, который выполняет блок кода заданное количество раз.
* **Использование:** Используется для выполнения повторяющихся действий определенное количество раз.
* **Пример:** Использование ForLoop для создания нескольких копий объекта.

**ForEachLoop:**

* **Определение:** ForEachLoop - это цикл, который выполняет блок кода для каждого элемента в массиве или коллекции.
* **Использование:** Используется для выполнения действий для каждого элемента в массиве или коллекции.
* **Пример:** Использование ForEachLoop для обработки каждого объекта в массиве (например, нанесение урона всем врагам в зоне поражения).

### Математические операции (Add, Subtract, Multiply, Divide)

**Add:**

* **Определение:** Add - это оператор, который складывает два значения.
* **Использование:** Используется для сложения чисел или векторов.
* **Пример:** Использование Add для увеличения значения переменной на определенное число.

**Subtract:**

* **Определение:** Subtract - это оператор, который вычитает одно значение из другого.
* **Использование:** Используется для вычитания чисел или векторов.
* **Пример:** Использование Subtract для уменьшения значения переменной на определенное число.

**Multiply:**

* **Определение:** Multiply - это оператор, который умножает два значения.
* **Использование:** Используется для умножения чисел или векторов.
* **Пример:** Использование Multiply для увеличения скорости персонажа в определенное количество раз.

**Divide:**

* **Определение:** Divide - это оператор, который делит одно значение на другое.
* **Использование:** Используется для деления чисел или векторов.
* **Пример:** Использование Divide для уменьшения скорости персонажа в определенное количество раз.

## Работа со временем (Delay, Timer)

**Delay:**

* **Определение:** Delay - это оператор, который задерживает выполнение следующего узла на заданное количество времени.
* **Использование:** Используется для создания задержек в логике, например, для задержки выполнения действия.
* **Пример:** Использование Delay для задержки выполнения атаки после анимации.

**Timer:**

* **Определение:** Timer - это механизм, который позволяет выполнять действия через определенные интервалы времени.
* **Использование:** Используется для создания повторяющихся действий или действий, выполняемых через определенные интервалы времени.
* **Пример:** Использование Timer для нанесения периодического урона врагу.

## Работа с вводом (Input): управление персонажем, обработка событий

**Управление персонажем:**

* **Определение:** Управление персонажем - это процесс обработки ввода от игрока и перемещения персонажа в игре.
* **Использование:** Используется для реализации передвижения, прыжков, атак и других действий персонажа.
* **Пример:** Использование ввода для управления передвижением персонажа с помощью клавиш WASD.

**Обработка событий:**

* **Определение:** Обработка событий - это процесс реагирования на ввод от игрока и выполнения соответствующих действий.
* **Использование:** Используется для реализации взаимодействия с игрой, такого как нажатие кнопок, движение мыши и другие действия.
* **Пример:** Использование обработки событий для реагирования на нажатие кнопки мыши и выполнения атаки персонажа.
