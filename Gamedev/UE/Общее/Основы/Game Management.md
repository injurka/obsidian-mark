**Система Управления Игрой** в Unreal Engine состоит из следующих основных компонентов:

1. **HUD Class**: Отвечает за отображение информации на экране игрока.
2. **Player Controller Class**: Обрабатывает ввод игрока и управляет персонажем или камерой.
3. **Game State Class**: Хранит и синхронизирует информацию о состоянии игры.
4. **Player State Class**: Хранит и синхронизирует информацию о состоянии отдельного игрока.
5. **Spectator Class**: Управляет камерой и поведением игрока в режиме наблюдателя.

Эти компоненты работают вместе, чтобы обеспечить полный цикл управления игрой, от обработки ввода игрока до отображения информации и синхронизации данных в сетевой игре.

1. **HUD Class (Класс HUD)**:
   - **Описание**: HUD (Heads-Up Display) отвечает за отображение информации на экране игрока, такой как здоровье, очки, мини-карта, сообщения и другие элементы интерфейса.
   - **Функции**:
     - Отображение текста и изображений на экране.
     - Обновление информации в реальном времени (например, количество жизней).
     - Создание и управление элементами интерфейса, такими как кнопки и индикаторы.

2. **Player Controller Class (Класс Контроллера Игрока)**:
   - **Описание**: Player Controller отвечает за обработку ввода игрока и управление персонажем или камерой.
   - **Функции**:
     - Обработка ввода с клавиатуры, мыши, геймпада.
     - Передача команд персонажу (например, движение, атака).
     - Управление камерой и её позиционированием.
     - Реализация логики, связанной с управлением игрока.

3. **Game State Class (Класс Состояния Игры)**:
   - **Описание**: Game State содержит информацию о текущем состоянии игры, которая должна быть синхронизирована между всеми игроками в сетевой игре.
   - **Функции**:
     - Хранение данных о состоянии игры (например, текущий счет, время раунда).
     - Синхронизация данных между клиентами в сетевой игре.
     - Оповещение игроков об изменениях в состоянии игры.

4. **Player State Class (Класс Состояния Игрока)**:
   - **Описание**: Player State содержит информацию о состоянии отдельного игрока, которая должна быть синхронизирована между сервером и клиентами.
   - **Функции**:
     - Хранение данных о игроке (например, очки, уровень, ранг).
     - Синхронизация данных между сервером и клиентами.
     - Оповещение игроков об изменениях в состоянии игрока.

5. **Spectator Class (Класс Наблюдателя)**:
   - **Описание**: Spectator отвечает за управление камерой и поведение игрока в режиме наблюдателя.
   - **Функции**:
     - Управление камерой в режиме наблюдателя (например, свободное перемещение, следование за другими игроками).
     - Обработка ввода игрока в режиме наблюдателя.
     - Реализация логики, связанной с режимом наблюдателя.

