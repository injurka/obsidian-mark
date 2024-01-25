Это самый новый способ хранения данных. При этом он обладает достаточно сложным API. В отличие от всех остальных способов, это API асинхронное.

Данный способ представляет собой API базы данных, что зачастую излишне для веб-приложений. Существует много разных библиотек, упрощающих работу с этим видом хранилища.

Пример простого взаимодействия с Indexed DB:
```js
let db
const connection = indexedDB.open('myDatabase', 1)

connection.onupgradeneeded = function(event) {
  db = event.target.result
  db.createObjectStore('notes', {autoIncrement: true})
}

connection.onsuccess = function(event) {
  db = event.target.result
  addNote(db, 'Прочитать статью "Хранение данных в браузере"')
}

connection.onerror = function(event) {
  console.log(`Ошибка при открытии базы данных: ${event.target.errorCode}`)
}

function addNote(db, text) {
  const tx = db.transaction(['notes'], 'readwrite')
  const store = tx.objectStore('notes')
  const note = { text, timestamp: Date.now() }

  tx.oncomplete = () => {
    console.log('Заметка сохранена')
  }
  tx.onerror = (event) => {
    console.log(`Ошибка при записи заметки: ${event.target.errorCode}`)
  }

  store.add(note)
}
```

> [!NOTE]
> Эта функция доступна в  [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Источник
- #### [mdn](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
