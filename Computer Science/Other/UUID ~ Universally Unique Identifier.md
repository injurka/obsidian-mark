`UUID` (Universally Unique Identifier) - это стандарт, определенный в RFC 4122, который используется для генерации уникальных идентификаторов. UUID представляет собой 128-битное (16 байт) число, которое обычно записывается в виде строки, состоящей из 32 шестнадцатеричных цифр, разделенных дефисами.

UUID-идентификаторы обычно используются для гарантии уникальности объектов или данных в распределенных системах, где есть несколько источников, генерирующих идентификаторы. Генерация UUID основана на различных факторах, таких как текущее время, уникальный идентификатор компьютера и другие параметры, чтобы обеспечить высокую вероятность уникальности.

---

## v1 ~ uniqueness

Генерируется с помощью комбинации MAC-адреса хост-компьютера и текущей даты и времени. В дополнение к этому он также вводит еще один случайный компонент, чтобы быть уверенным в его уникальности.

Это означает, что вы гарантированно получите полностью уникальный идентификатор, если только вы не генерируете его с того же компьютера и в то же самое время. В этом случае вероятность столкновения меняется с невозможной на очень маленькую благодаря случайным битам.

Эта гарантированная уникальность достигается ценой анонимности. Поскольку UUID v1 учитывает время и ваш MAC-адрес, это также означает, что кто-то потенциально может определить время и место (т. е. компьютер) создания. Попробуйте регенерировать приведенные выше UUID, и вы увидите, что какая-то часть UUID v1 остается постоянной.

---

## v2 ~ like v1

UUIDv2 практически идентичен UUIDv1. Он содержит большинство тех же компонентов:
- Временная метка
- Mac-адрес
- Тактовая последовательность
- Вариант
- Версия

Однако есть несколько небольших отличий. А именно:
- "Последовательность часов" из UUIDv1 заменена с 3 символов на 1, так как последние 2 символа заменены новым значением перечисления "Локальный домен".
- Низкое время" заменяется на "Номер локального домена".

В Unix-подобных операционных системах, таких как Linux и macOS, вашей машине необходим способ отслеживать пользователей в системе. Основной способ, которым компьютеры в этом семействе ОС делают это, - присваивают вам "идентификатор пользователя", или "UID".

Это то, что относится к "Локальному домену". 0 в поле "Локальный домен" говорит о том, что "Номер локального домена" отслеживает UID пользователя Unix-подобной системы. Номер локального домена" - это и есть сам UID.

>Но подождите, зачем нам вообще нужно поле "Локальный домен"?

Оказывается, Unix-подобные системы отслеживают больше данных о пользователе, чем одно число. Рассмотрим следующий пример использования школьного сервера на базе Linux:

Вы хотите предоставить права доступа к каталогу "Ответы на домашние задания" всем учителям, но не пользователям-ученикам. Разве не было бы здорово иметь "группу" пользователей, которым можно было бы назначать определенные разрешения?

Именно с этой мыслью была придумана концепция "группового идентификатора" или "GID". Подобно UID, GID - это номер, который хранит информацию о группе пользователей в системе.

UUIDv2 позволяет отслеживать GID, а не UID, путем изменения локального домена на число 1.

>Это только два "Локальных домена"?

Увы, это не так. Давайте продолжим наш пример со школьным Linux-сервером, чтобы объяснить, почему. Предположим, что вы принадлежите к системе школ Калифорнийского университета и хотите создать каталог, позволяющий отправлять электронные письма всем жителям кампуса Калифорнийского университета в Дэвисе. Именно здесь может появиться организация.

Эта организация будет связана с набором групп, которые, в свою очередь, связаны с набором пользователей. Все это будет отслеживаться с помощью "идентификатора организации", которому будет присвоен локальный домен 2.

Это и было первоначальной целью UUIDv2: кодирование данных POSIX в уникальный идентификатор: существуют приложения, в которых информация об операционной системе пользователя, легко доступная в идентификаторе ресурса, была бы удобна.

У UUIDv2 много проблем:
- Мало реализаций: Из-за редкого использования UUIDv2 и отсутствия формальной спецификации в RFC 4122, существует очень мало реализаций UUIDv2 в большинстве языков и библиотек. Это может сделать их реализацию более сложной по сравнению с другими версиями UUID.
- Сложность исследования: Поскольку реализаций UUIDv2 немного, узнать об этой версии UUID довольно сложно. В большинстве статей (включая мое собственное введение в UUID) этому вопросу посвящен всего один абзац (если вообще посвящен!).

---

## v3

Допустим, вы создаете базу данных URL-адресов, отслеживаемых на вашем сайте. Вы хотите использовать URL в качестве первичного ключа в своей базе данных, но не хотите использовать полный URL, поскольку это увеличит требования к хранению ключа.

Другая сторона медали: вы не можете использовать случайные данные для хранения в качестве первичного ключа URL, поскольку это может привести к появлению дубликатов записей URL в таблице базы данных.

Есть ли хороший способ генерировать один и тот же уникальный идентификатор из одного и того же исходного кода каждый раз?

Введение: UUIDv3 и UUIDv5.

Обе эти версии UUID используют следующую информацию:

    Постоянный UUID (называемый "пространством имен")
    Входная строка (называемая "именем").

Затем эти версии UUID выдают UUID, содержащий хэш из пространства имен и имени, соединенных вместе.

Алгоритм генерации для обеих версий UUID можно представить следующим образом:

```bash
UUID = hash(NAMESPACE + NAME)
```

---

## v4 ~ randomness
Генерируется с использованием случайных или псевдослучайных чисел. Он обеспечивает высокую вероятность уникальности и может быть использован для общего назначения.

Учитывая огромное количество возможных комбинаций (2^128), создать дубликат будет практически невозможно, если только вы не генерируете триллионы идентификаторов каждую секунду в течение многих лет.

> Если ваше приложение является критически важным (например, банковские операции или медицинские системы), вам все равно следует добавить ограничение уникальности, чтобы избежать коллизии UUIDv4.

---

## v5: ~non-random

>UUIDv3, но более безопасный (использует SHA-1).

Если вам нужен уникальный идентификатор, который не является случайным, UUID `v5` может стать правильным выбором.

В отличие от `v1` или `v4`, `v5` генерируется путем предоставления двух частей входной информации:

- Входная строка: Любая строка, которая может изменяться в вашем приложении.
- Пространство имен: Фиксированный UUID, используемый в сочетании с входной строкой для различения UUID, сгенерированных в разных приложениях, и для предотвращения взлома радужной таблицы.

Эти две части информации преобразуются в UUID с помощью алгоритма хэширования SHA1.

Важно отметить, что UUID v5 является последовательным. Это означает, что любая комбинация входных данных и пространства имен всегда будет приводить к одному и тому же UUID.

Это очень удобно, если вы хотите, например, поддерживать сопоставление пользователей с их UUID без явного сохранения этой информации в хранилище.

Однако помните, что эти идентификаторы не случайны, и за их уникальность теперь отвечаете вы.