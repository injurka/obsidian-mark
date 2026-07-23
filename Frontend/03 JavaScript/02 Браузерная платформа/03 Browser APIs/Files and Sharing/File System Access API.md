File System Access API — это веб-интерфейс, который позволяет веб-приложениям читать и записывать файлы и директории на устройствах пользователей. Этот API предоставляет более прямой и мощный доступ к файловой системе по сравнению с традиционными методами, такими как `<input type="file">`, и предназначен для использования в современных браузерах.

## Как использовать File System Access API

1. **Доступ к файлам и директориям**:
   - **Чтение файлов**:
 ```javascript
 async function getFile() {
   const [fileHandle] = await window.showOpenFilePicker();
   const file = await fileHandle.getFile();
   const contents = await file.text();
   console.log(contents);
 }
 ```

   - **Запись в файлы**:
 ```javascript
 async function saveFile() {
   const fileHandle = await window.showSaveFilePicker();
   const writable = await fileHandle.createWritable();
   await writable.write('Hello, world!');
   await writable.close();
 }
 ```

   - **Работа с директориями**:
 ```javascript
 async function getDirectory() {
   const dirHandle = await window.showDirectoryPicker();
   for await (const entry of dirHandle.values()) {
	 console.log(entry.name);
   }
 }
 ```

2. **Сохранение и восстановление доступа**:
   - **Сохранение доступа**:
 ```javascript
 async function persistPermission(fileHandle) {
   const permission = await fileHandle.queryPermission();
   if (permission === 'granted') {
	 // Доступ уже предоставлен
   } else {
	 await fileHandle.requestPermission();
   }
 }
 ```

   - **Восстановление доступа**:
 ```javascript
 async function restorePermission(fileHandle) {
   const permission = await fileHandle.queryPermission();
   if (permission !== 'granted') {
	 await fileHandle.requestPermission();
   }
 }
 ```

## Особенности File System Access API

1. **Безопасность**:
   - Пользователь должен явно предоставить разрешение на доступ к файлам и директориям.
   - API работает только в контексте безопасных источников (HTTPS).

2. **Поддержка браузерами**:
   - File System Access API поддерживается в Chrome, Edge и других браузерах на основе Chromium.
   - В Firefox и Safari поддержка ограничена или отсутствует.

3. **Производительность**:
   - API позволяет эффективно работать с большими файлами и директориями, обеспечивая высокую производительность.

4. **Интеграция с другими API**:
   - Может быть использован в сочетании с другими веб-API, такими как Web Workers, для улучшения производительности и пользовательского опыта.

### Пример использования

```tsx
<button onclick="getFile()">Open File</button>
<button onclick="saveFile()">Save File</button>
<button onclick="getDirectory()">Open Directory</button>

// ...

async function getFile() {
  const [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  console.log(contents);
}

async function saveFile() {
  const fileHandle = await window.showSaveFilePicker();
  const writable = await fileHandle.createWritable();
  await writable.write('Hello, world!');
  await writable.close();
}

async function getDirectory() {
  const dirHandle = await window.showDirectoryPicker();
  for await (const entry of dirHandle.values()) {
	console.log(entry.name);
  }
}
```

## Источники
- #### [mdn](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)