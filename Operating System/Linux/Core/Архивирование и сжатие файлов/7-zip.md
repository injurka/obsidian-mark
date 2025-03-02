Формат 7-Zip впервые появился в 1999 году. Данный формат отличает высокая степень сжатия данных. По сравнению с ZIP степень сжатия 7-Zip может быть на 30-50% лучше. 7-Zip в основном используется среди пользователей Windows.

7-Zip нельзя использовать для создания резервных копий в Linux, так как формат не сохраняет информацию о правах доступа к файлам и данные о владельце.

В данной заметке мы рассмотрим, как установить поддержку 7-Zip в некоторых дистрибутивах Linux, а также как работать с 7zip-архивами.

Варианты установки:

- **p7zip** — базовая версия, которая поддерживает только архивы в формате .7z Представляет собой порт утилиты _7za.exe_ для POSIX систем.
- **p7zip-full** — полная версия, которая поддерживает различные алгоритмы сжатия при создании 7zip-архивов, а также другие форматы архивов. Установка данного пакета также обеспечивает поддержку 7-Zip в менеджере архивов [File Roller](https://pingvinus.ru/program/file-roller), который используется в Ubuntu.
- **p7zip-rar** — отдельный модуль для p7zip, позволяющий распаковывать RAR-архивы.

## Раcпаковка 7zip-архивов

Когда поддержка 7-Zip установлена, то для распаковки .7z файлов вы можете использовать графические утилиты (например, [File Roller](https://pingvinus.ru/program/file-roller), [Ark](https://pingvinus.ru/program/ark)), средства файлового менеджера вашего дистрибутива (если есть поддержка), а также командую строку.

Для работы с 7-Zip архивами через командную строку используется команда 7z 

### Распаковать в текущую директорию

Чтобы распаковать .7z архив в текущую директорию с сохранением структуры директорий, которые находятся внутри архива, выполните в терминале команду:

```
7z x archive.7z
```

Файлы архива будут распакованы в текущую директорию. Если в архиве содержатся директории, то при распаковке их структура будет сохранена.

### Распаковать в определенную директорию

Чтобы распаковать архив в определенную директорию используется опция -o, за которой без пробела указывается путь до директории.

```
7z x archive.7z -o./mydir
```

### Распаковать без сохранения структуры директорий

Можно распаковать .7z архив, не сохраняя структуру директорий. То есть, если внутри архива есть директории и файлы в них, то при распаковке все файлы будут распакованы в одну директорию. Для этого используется опция (команда) e.

```
7z e archive.7z
```

## Создание 7zip-архива

### Упаковать один файл

Чтобы создать .7z архив используется следующая команда.

```
7z a archive.7z myfile.txt
```

В результате выполнения данной команды будет создан архив archive.7z, который содержит файл myfile.txt

### Упаковать несколько файлов

Чтобы упаковать несколько файлов, перечислите их имена через пробел.

```
7z a archive myfile1.txt myfile2.txt myfile3.txt
```

### Упаковать директорию и ее содержимое

Вместо файла, при создании архива, можно указать путь до директории, которую необходимо сжать.

```
7z a archive.7z /path/to/mydir
```

### Добавить файлы в существующий архив

Если архив уже создан, то можно добавлять в него новые файлы. Для этого используется такая же команда, как и для создания архива, только в качестве названия архива указывается существующий файл.

```
7z a archive.7z myfile123.txt
```

## Просмотр файлов в архиве

Для просмотра содержимого архива используется команда:

```
7z l archive.7z
```

## Протестировать целостность архива

Чтобы проверить целостность архива (проверить, что архив «не битый») используется команда:

```
7z t archive.7z
```