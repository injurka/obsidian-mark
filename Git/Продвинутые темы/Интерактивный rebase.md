Инструмент для управления историей коммитов. Он позволяет переписывать, объединять, удалять или изменять порядок коммитов. Это особенно полезно, когда нужно привести историю в порядок перед слиянием ветки или отправкой изменений в удалённый репозиторий.

## Как работает интерактивный rebase?

1. **Выбор диапазона коммитов**:
   - Указываешь диапазон коммитов, которые нужно переписать. Например:
     ```bash
     git rebase -i HEAD~3
     ```
     Это откроет редактор с последними тремя коммитами.

2. **Редактирование списка коммитов**:
   - В редакторе отображается список коммитов с возможностью выбрать действие для каждого:
     ```
     pick abc123 Первый коммит
     pick def456 Второй коммит
     pick ghi789 Третий коммит
     ```
   - Можно изменить порядок, объединить коммиты, изменить сообщения или удалить коммиты.

3. **Применение изменений**:
   - После сохранения и закрытия редактора Git применяет изменения в указанном порядке.

## Основные команды в интерактивном rebase

В редакторе для каждого коммита можно указать одно из следующих действий:

1. **`pick`**:
   - Оставить коммит без изменений.
   - Пример:
     ```
     pick abc123 Первый коммит
     ```

2. **`reword`**:
   - Оставить коммит, но изменить его сообщение.
   - Пример:
     ```
     reword abc123 Первый коммит
     ```

3. **`edit`**:
   - Остановиться на этом коммите, чтобы внести изменения в файлы или разделить коммит.
   - Пример:
     ```
     edit abc123 Первый коммит
     ```

4. **`squash`**:
   - Объединить коммит с предыдущим. Сообщения коммитов также объединяются.
   - Пример:
     ```
     pick abc123 Первый коммит
     squash def456 Второй коммит
     ```

5. **`fixup`**:
   - Объединить коммит с предыдущим, но удалить его сообщение.
   - Пример:
     ```
     pick abc123 Первый коммит
     fixup def456 Второй коммит
     ```

6. **`drop`**:
   - Удалить коммит из истории.
   - Пример:
     ```
     pick abc123 Первый коммит
     drop def456 Второй коммит
     ```

## Пример использования

### Исходное состояние:
- История коммитов:
  ```
  abc123 Первый коммит
  def456 Второй коммит
  ghi789 Третий коммит
  ```

### Задача:
- Объединить второй и третий коммиты в один.
- Изменить сообщение первого коммита.

### Шаги:
1. Запусти интерактивный rebase:
   ```bash
   git rebase -i HEAD~3
   ```

2. В редакторе измени список:
   ```
   reword abc123 Первый коммит
   pick def456 Второй коммит
   squash ghi789 Третий коммит
   ```

3. Сохрани и закрой редактор. Git откроет ещё один редактор для изменения сообщения первого коммита.

4. После изменения сообщения Git объединит второй и третий коммиты и предложит ввести новое сообщение для объединённого коммита.

### Результат:
- Новая история:
  ```
  abc123 Новое сообщение первого коммита
  def456 Объединённый коммит
  ```

## Советы

1. **Используй `edit` для сложных изменений**:
   - Если нужно внести изменения в файлы или разделить коммит, используй `edit`. После остановки на коммите можно:
     - Внести изменения в файлы.
     - Использовать `git commit --amend` для изменения текущего коммита.
     - Использовать `git rebase --continue` для продолжения.

2. **Будь осторожен с переписыванием истории**:
   - Интерактивный rebase изменяет историю коммитов. Если ветка уже была отправлена в удалённый репозиторий, это может вызвать проблемы у других разработчиков.

3. **Используй `--autosquash` для автоматического объединения**:
   - Если коммиты помечены как `fixup!` или `squash!`, можно использовать:
     ```bash
     git rebase -i --autosquash HEAD~3
     ```
     Git автоматически расставит команды `squash` и `fixup`.

4. **Проверяй историю после rebase**:
   - После завершения rebase используй `git log`, чтобы убедиться, что история выглядит так, как задумано.

## Пример с `edit`

1. Запусти интерактивный rebase:
   ```bash
   git rebase -i HEAD~3
   ```

2. Укажи `edit` для коммита:
   ```
   pick abc123 Первый коммит
   edit def456 Второй коммит
   pick ghi789 Третий коммит
   ```

3. После остановки на втором коммите внеси изменения в файлы:
   ```bash
   git add file.txt
   git commit --amend
   ```

4. Продолжи rebase:
   ```bash
   git rebase --continue
   ```
