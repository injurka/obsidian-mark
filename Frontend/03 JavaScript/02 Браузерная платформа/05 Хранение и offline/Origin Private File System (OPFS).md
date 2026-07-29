# Origin Private File System (OPFS)

**OPFS** (Origin Private File System) — один из механизмов клиентского хранения данных, да. Но это не прямая замена IndexedDB, а альтернатива с другой специализацией: **низкоуровневый файловый доступ** вместо базы данных «ключ-значение».

OPFS — это часть File System API: приватная виртуальная файловая система, жёстко изолированная в пределах текущего origin (источника). Файлы в ней не видны пользователю в обычной файловой системе ОС — браузер сам решает, как и где их физически хранить.

## Отличие от обычного File System API

| | File System API (showDirectoryPicker) | OPFS |
|---|---|---|
| Видимость | Реальные папки пользователя (например, «Документы») | Скрытая песочница origin |
| Разрешения | Требуется явный prompt пользователя | Не требуется |
| Проверки безопасности | Safe browsing, антивирус, запись через временные файлы | Отключены — отсюда скорость |
| Синхронный доступ | Нет | Да, в Web Workers |

Именно отключение тяжеловесных проверок безопасности делает OPFS самым быстрым механизмом хранения в браузере.

## Базовое использование (асинхронный API)

Точка входа — `navigator.storage.getDirectory()`, доступна и в main thread, и в workers:

```js
// Получаем корень приватной файловой системы
const root = await navigator.storage.getDirectory()

// Создаём/открываем файл
const fileHandle = await root.getFileHandle('data.bin', { create: true })

// Записываем
const writable = await fileHandle.createWritable()
await writable.write(new Uint8Array([1, 2, 3]))
await writable.close()

// Читаем
const file = await fileHandle.getFile()
const buffer = await file.arrayBuffer()
```

Поддерживаются и директории: `root.getDirectoryHandle('subdir', { create: true })`, удаление — `root.removeEntry('data.bin')`.

## Синхронный доступ (ключевая фича)

Главное преимущество OPFS — синхронные методы `FileSystemSyncAccessHandle`. Они доступны **только внутри Web Worker** (иначе бы блокировали UI-поток) и не тратят время на промисы:

```js
// worker.js
const root = await navigator.storage.getDirectory()
const fileHandle = await root.getFileHandle('data.bin', { create: true })

// Синхронный дескриптор
const handle = await fileHandle.createSyncAccessHandle()

const size = handle.getSize()
const buffer = new ArrayBuffer(size)
handle.read(buffer)                 // чтение сырых байт в буфер
handle.write(new Uint8Array([1]))   // запись по месту (in-place)
handle.flush()                      // сброс на диск
handle.truncate(0)                  // обрезка файла
handle.close()
```

- Запись **in-place** — по указанному смещению, без перезаписи всего файла.
- Только один `SyncAccessHandle` на файл одновременно — эксклюзивная блокировка.

## OPFS vs IndexedDB

| | IndexedDB | OPFS |
|---|---|---|
| Модель | NoSQL БД, индексы, транзакции | Файлы и байтовые потоки |
| Оптимально для | Структурированных данных, запросов | Больших бинарных данных, SQLite Wasm |
| API | Асинхронный, события | Синхронный (в workers) — максимально быстрый |
| Накладные расходы | Structured clone, B-tree, транзакции | Почти нет — прямой доступ к байтам |
| Сложность | Обертки типа `idb` | Оркестрация workers и блокировок |

Чтение больших объёмов из OPFS в разы быстрее, чем извлечение тех же `ArrayBuffer` из IndexedDB.

## Главный сценарий: SQLite/DuckDB в браузере

OPFS стал катализатором подхода **BYOD (Bring Your Own Database)**: полноценные СУБД компилируются в WebAssembly и используют OPFS как свой диск:

- **SQLite Wasm** (официальный порт sqlite3) хранит страницы БД в OPFS через sync access handles.
- **DuckDB-Wasm** — аналитическая колоночная СУБД прямо в браузере.

Так веб-приложение получает настоящий SQL-движок с нативной скоростью I/O, чего IndexedDB дать не может.

## Ограничения и подводные камни

- **Многопоточная запись.** OPFS разделяется между всеми вкладками origin. Параллельная запись → повреждение файлов. Решение — **Web Locks API** (`navigator.locks.request()`) для эксклюзивных/разделяемых блокировок между потоками и вкладками.
- **Квоты.** OPFS входит в общую квоту origin вместе с IndexedDB и Cache API; подчиняется тем же правилам вытеснения (eviction) и 7-дневному лимиту ITP в Safari. Персистентность запрашивается через `navigator.storage.persist()`.
- **Нет наблюдателей.** Изменения файлов не генерируют событий — синхронизацию состояния между вкладками нужно делать самому (BroadcastChannel).
- Поддержка: все современные браузеры (Chromium, Firefox 111+, Safari 15.2+ — с оговорками на ранние баги WebKit).

## Когда выбирать OPFS

- Большие бинарные данные: видео, CAD-модели, ML-модели, дампы.
- Хранилище для Wasm-СУБД (SQLite, DuckDB).
- Сценарии, где производительность I/O критична и есть worker-архитектура.

Когда **не** выбирать: обычные структурированные данные приложения с запросами и индексами — для этого по-прежнему подходит IndexedDB.

> [!NOTE]
> Подробный разбор архитектуры, сравнение производительности и координация потоков — в файле [[Архитектура клиентского хранения]].
