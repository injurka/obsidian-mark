Команда `git status` отображает состояние рабочего каталога и раздела проиндексированных файлов. С ее помощью можно проверить индексацию изменений и увидеть файлы, которые не отслеживаются Git. Информация об истории коммитов проекта _не_ отображается при выводе данных о состоянии. Для этого используется команда `git log`

`git status` 
выводит более подробную информацию о состоянии файлов в рабочем каталоге и области подготовленных изменений. Он показывает измененные файлы, неподготовленные файлы и изменения, подготовленные для коммита.

`git status -s`
предоставляет краткий формат вывода. Каждая строка представляет один файл, и статусные коды указывают, подготовлен ли файл, изменен ли он, отслеживается ли он или есть конфликты слияния.

`M` - (**m**odified) отслеживаемые, изменились с прошлого коммита, еще не добавлены  
`D` - (**d**eleted) отслеживаемые, удалены после прошлого коммита, еще не добавлены  
`?` - (untracked) неотслеживаемые, не запрещены к добавлению  
`!` - (ignored) неотслеживаемые, запрещены к добавлению (например, в `.gitignore`)

## Основные варианты использования команды

1. **Проверка состояния рабочего каталога:**
   Чтобы увидеть текущее состояние рабочего каталога, просто выполни команду:

   ```bash
   git status
   ```

   Git покажет:
   - Какие файлы изменены, но еще не добавлены в индекс.
   - Какие файлы добавлены в индекс и готовы к коммиту.
   - Какие файлы не отслеживаются Git (untracked files).

2. **Краткий вывод:**
   Если нужен более компактный вывод, используй флаг `-s` или `--short`:

   ```bash
   git status -s
   ```

   В этом режиме Git покажет статус файлов в виде двухбуквенных кодов:
   - ` M` — файл изменен, но не добавлен в индекс.
   - `M ` — файл изменен и добавлен в индекс.
   - `??` — файл не отслеживается Git.
   - `A ` — файл добавлен в индекс (новый файл).
   - ` D` — файл удален, но удаление еще не добавлено в индекс.
   - `D ` — файл удален, и удаление добавлено в индекс.

3. **Проверка состояния с игнорированием подмодулей:**
   Если в репозитории есть подмодули, и нужно игнорировать их состояние, используй флаг `--ignore-submodules`:

   ```bash
   git status --ignore-submodules
   ```

4. **Проверка состояния с указанием ветки:**
   Чтобы увидеть, на какой ветке ты находишься, и есть ли изменения, которые нужно закоммитить или отправить на удаленный репозиторий, используй команду:

   ```bash
   git status -b
   ```

   Или:

   ```bash
   git status --branch
   ```

   Git покажет:
   - Текущую ветку.
   - Состояние ветки относительно удаленного репозитория (например, отстает ли локальная ветка от удаленной или опережает её).

## Примеры использования

- **Проверка состояния рабочего каталога:**

  ```bash
  git status
  ```

  Вывод будет выглядеть примерно так:

  ```
  On branch main
  Your branch is up to date with 'origin/main'.

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
      modified:   example.txt

  Untracked files:
    (use "git add <file>..." to include in what will be committed)
      newfile.txt

  no changes added to commit (use "git add" and/or "git commit -a")
  ```

  Здесь:
  - Файл `example.txt` изменен, но изменения еще не добавлены в индекс.
  - Файл `newfile.txt` не отслеживается Git.

- **Краткий вывод:**

  ```bash
  git status -s
  ```

  Вывод будет выглядеть так:

  ```
   M example.txt
  ?? newfile.txt
  ```

- **Проверка состояния с указанием ветки:**

  ```bash
  git status -b
  ```

  Вывод будет выглядеть так:

  ```
  On branch main
  Your branch is up to date with 'origin/main'.

  Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git restore <file>..." to discard changes in working directory)
      modified:   example.txt

  Untracked files:
    (use "git add <file>..." to include in what will be committed)
      newfile.txt

  no changes added to commit (use "git add" and/or "git commit -a")
  ```

## Как работает `git status`

1. **Анализ рабочего каталога:**
   `git status` сравнивает текущее состояние файлов в рабочем каталоге с состоянием в индексе и последнем коммите.

2. **Классификация изменений:**
   Git классифицирует изменения на несколько категорий:
   - Измененные файлы (modified).
   - Новые файлы (untracked).
   - Удаленные файлы (deleted).
   - Файлы, добавленные в индекс (staged).

3. **Вывод информации:**
   Git выводит информацию о состоянии файлов и подсказки, что делать дальше (например, как добавить файлы в индекс или отменить изменения).

## Важные моменты

- **Подсказки:**
   `git status` всегда показывает подсказки, что делать дальше. Например:
   - Как добавить файлы в индекс (`git add <file>`).
   - Как отменить изменения в рабочем каталоге (`git restore <file>`).
   - Как отправить изменения на удаленный репозиторий (`git push`).

- **Игнорирование файлов:**
   Если файл добавлен в `.gitignore`, он не будет отображаться в списке неотслеживаемых файлов.

- **Состояние ветки:**
   `git status` показывает, на какой ветке ты находишься, и есть ли изменения, которые нужно отправить на удаленный репозиторий или получить с него.

## Пример сценария

1. В рабочем каталоге есть изменения, и нужно понять, что именно изменилось. Используешь:

   ```bash
   git status
   ```

2. Если нужно быстро увидеть статус файлов, используешь краткий вывод:

   ```bash
   git status -s
   ```

3. Чтобы проверить, на какой ветке ты находишься, и есть ли изменения, которые нужно отправить на удаленный репозиторий, используешь:

   ```bash
   git status -b
   ```

4. Если нужно игнорировать состояние подмодулей, используешь:

   ```bash
   git status --ignore-submodules
   ```
