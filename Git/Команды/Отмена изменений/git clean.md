Команда `git clean` в некоторой степени является командой отмены действия. Можно также сказать, что `git clean` дополняет другие инструменты, такие как [[git reset]] и [[git checkout]]. Эти две команды нужны в работе с файлами, ранее добавленными в индекс отслеживания Git, в то время как `git clean` используется для операций с неотслеживаемыми файлами, то есть с такими, которые созданы в рабочем каталоге репозитория, но еще не добавлены в индекс отслеживания с помощью [[git add]]

`git clean` представляет собой удобный способ удаления неотслеживаемых файлов в рабочем каталоге репозитория. Неотслеживаемые файлы — это файлы в каталоге репозитория, которые еще не добавлены в раздел проиндексированных файлов с помощью [[git add]]. Результат использования `git clean` в целом можно получить с помощью команды [[git status]] и встроенных средств удаления в операционной системе. Команду `git clean` можно использовать вместе с [[git reset]] для полной отмены изменений и коммитов в репозитории.

## Основные варианты использования команды

1. **Удаление неотслеживаемых файлов:**
   Чтобы удалить все неотслеживаемые файлы из рабочего каталога, используйте команду:

   ```bash
   git clean -f
   ```

   Флаг `-f` (от англ. *force*) обязателен для выполнения команды, если в конфигурации Git не установлена опция `clean.requireForce` в значение `false`. Это сделано для предотвращения случайного удаления файлов.

2. **Удаление неотслеживаемых директорий:**
   Если в рабочем каталоге есть неотслеживаемые директории, их также можно удалить с помощью флага `-d`:

   ```bash
   git clean -fd
   ```

   Эта команда удалит все неотслеживаемые файлы и директории.

3. **Интерактивное удаление файлов:**
   Если вы хотите выбрать, какие файлы удалить, можно использовать интерактивный режим с флагом `-i`:

   ```bash
   git clean -i
   ```

   В интерактивном режиме Git покажет список неотслеживаемых файлов и предложит выбрать, какие из них удалить.

4. **Просмотр файлов, которые будут удалены:**
   Перед удалением файлов полезно проверить, какие файлы будут затронуты. Для этого используйте флаг `-n` (от англ. *dry run*):

   ```bash
   git clean -n
   ```

   Эта команда покажет список файлов, которые будут удалены, но не выполнит само удаление.

5. **Удаление игнорируемых файлов:**
   По умолчанию `git clean` не удаляет файлы, которые указаны в `.gitignore`. Если вы хотите удалить и игнорируемые файлы, используйте флаг `-x`:

   ```bash
   git clean -fx
   ```

   Эта команда удалит все неотслеживаемые файлы, включая те, которые игнорируются Git.

6. **Удаление только игнорируемых файлов:**
   Если вы хотите удалить только игнорируемые файлы, но оставить остальные неотслеживаемые файлы, используйте флаг `-X`:

   ```bash
   git clean -fX
   ```

   Эта команда удалит только файлы, которые указаны в `.gitignore`.

### Примеры использования:

- **Удаление всех неотслеживаемых файлов:**

  ```bash
  git clean -f
  ```

- **Удаление всех неотслеживаемых файлов и директорий:**

  ```bash
  git clean -fd
  ```

- **Просмотр файлов, которые будут удалены:**

  ```bash
  git clean -n
  ```

- **Удаление всех неотслеживаемых файлов, включая игнорируемые:**

  ```bash
  git clean -fx
  ```

- **Удаление только игнорируемых файлов:**

  ```bash
  git clean -fX
  ```

- **Интерактивное удаление файлов:**

  ```bash
  git clean -i
  ```

## Важные моменты

- **Безопасность:** Команда `git clean` удаляет файлы безвозвратно. Удаленные файлы нельзя восстановить через Git, так как они не были добавлены в индекс отслеживания. Поэтому перед использованием команды рекомендуется проверить, какие файлы будут удалены, с помощью флага `-n`.

- **Игнорируемые файлы:** По умолчанию `git clean` не удаляет файлы, указанные в `.gitignore`. Если вам нужно удалить и их, используйте флаг `-x`.

- **Комбинация с другими командами:** `git clean` часто используется вместе с `git reset` для полной отмены изменений в репозитории. Например, после сброса изменений в индексе с помощью `git reset`, можно удалить все неотслеживаемые файлы с помощью `git clean`.

## Пример сценария

1. Вы внесли изменения в файлы, добавили их в индекс, но затем решили отменить все изменения и вернуть репозиторий в чистое состояние.
2. Сначала сбросьте изменения в индексе:

   ```bash
   git reset --hard
   ```

3. Затем удалите все неотслеживаемые файлы:

   ```bash
   git clean -fd
   ```

Теперь ваш рабочий каталог полностью чист, и в нем нет ни изменений, ни неотслеживаемых файлов.