### CommonJS
CommonJS (CJS) - это формат, представленный в Node.js, который позволяет обмениваться функциональностью между изолированными модулями JavaScript ([подробнее](https://nodejs.org/api/modules.html)).

Cинтаксис:
```js
const a = require('./a')

module.exports.a = a
```
Такие бандлеры, как webpack и Rollup, поддерживают этот синтаксис и позволяют использовать модули, написанные на CommonJS, в браузере.

### ESM 
Чаще всего, когда люди говорят о ESM и CJS, они имеют в виду разный синтаксис для написания [модулей](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules):
```js
import a from './a'

export { a }
```

Прежде чем модули ECMAScript Modules (ESM) стали стандартом (на это ушло более 10 лет!), такие инструменты, как [webpack](https://webpack.js.org/guides/ecma-script-modules), и даже языки, такие как TypeScript, начали поддерживать так называемый синтаксис ESM. Однако есть несколько ключевых различий с реальной спецификацией; [вот полезное объяснение](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive).

Возможно, вы уже давно пишете свои приложения, используя синтаксис ESM. В конце концов, он изначально поддерживается браузером. Например, в Nuxt 2 весь написанный вами код компилировался в соответствующий формат (CJS для сервера, ESM для браузера).

При добавлении модулей в пакет все было немного иначе. Библиотека-образец могла представлять версии CJS и ESM и позволяла выбирать, какая из них нужна:
```json
{
  "name": "sample-library",
  "main": "dist/sample-library.cjs.js",
  "module": "dist/sample-library.esm.js"
}
```
Например, в Nuxt 2 компоновщик (webpack) брал CJS-файл ('main') для сборки сервера и использовал ESM-файл ('module') для сборки клиента.

Однако в последних выпусках Node.js LTS появилась возможность использовать [родной модуль ESM](https://nodejs.org/api/esm.html) внутри Node.js. Это означает, что Node.js сам может обрабатывать JavaScript с использованием синтаксиса ESM, хотя по умолчанию он этого не делает. Два наиболее распространенных способа включить синтаксис ESM:

- установите `"type": "module"` внутри вашего `package.json` и продолжайте использовать расширение `.js`.
- использовать расширения файлов `.mjs` (рекомендуется)


### Что такое допустимый импорт в контексте Node.js?
Когда вы `import` модуль, а не `require` его, Node.js разрешает его по-другому. Например, когда вы импортируете `sample-library`, Node.js будет искать не `main`, а запись `exports` или `module` в `package.json` этой библиотеки.

Это справедливо и для динамического импорта, например :
`const b = await import('sample-library')`

Node поддерживает следующие виды импорта ([см. документацию](https://nodejs.org/api/packages.html#determining-module-system)):
1. файлы, заканчивающиеся на `.mjs` - ожидается, что они будут использовать синтаксис ESM
2. файлы, заканчивающиеся на `.cjs` - ожидается, что они будут использовать синтаксис CJS
3. файлы, заканчивающиеся на `.js` - ожидается, что они будут использовать синтаксис CJS, если только их `package.json` не имеет `"type": "module"`.

### Какие проблемы могут возникнуть?

Долгое время авторы модулей создавали сборки с ESM-синтаксисом, но использовали такие соглашения, как `.esm.js` или `.es.js`, которые они добавляли в поле `module` в файле `package.json`. До сих пор это не было проблемой, потому что они использовались только бандлерами вроде webpack, которым расширение файла не особенно важно.

Однако если вы попытаетесь импортировать пакет с файлом `.esm.js` в ESM-контекст Node.js, это не сработает, и вы получите ошибку, например:

```js
(node:22145) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
/path/to/index.js:1

export default {}
^^^^^^

SyntaxError: Unexpected token 'export'
    at wrapSafe (internal/modules/cjs/loader.js:1001:16)
    at Module._compile (internal/modules/cjs/loader.js:1049:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1114:10)
    ....
    at async Object.loadESM (internal/process/esm_loader.js:68:5)

```

Вы также можете получить эту ошибку, если у вас есть именованный импорт из сборки с ESM-синтаксисом, который Node.js считает CJS:

```js
file:///path/to/index.mjs:5
import { named } from 'sample-library'
         ^^^^^
SyntaxError: Named export 'named' not found. The requested module 'sample-library' is a CommonJS module, which may not support all module.exports as named exports.

CommonJS modules can always be imported via the default export, for example using:

import pkg from 'sample-library';
const { named } = pkg;

    at ModuleJob._instantiate (internal/modules/esm/module_job.js:120:21)
    at async ModuleJob.run (internal/modules/esm/module_job.js:165:5)
    at async Loader.import (internal/modules/esm/loader.js:177:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)

```

### Поиск и устранение неисправностей ESM
Если вы столкнулись с этими ошибками, проблема почти наверняка связана с библиотекой upstream. Им необходимо исправить свою библиотеку, чтобы она поддерживала импорт в Node.

#### Transpiling Libraries
Это процесс преобразования кода из одной версии JavaScript в другую с использованием инструментов, таких как Babel. Это позволяет разработчикам писать код на более новых версиях JavaScript (например, ES6 или ES7), а затем преобразовывать его в более старые версии (например, ES5), чтобы обеспечить совместимость с более старыми браузерами или средами выполнения.

Transpiling библиотек в JavaScript означает применение этого процесса к библиотекам или фреймворкам, чтобы обеспечить их совместимость с различными средами выполнения. Например, если библиотека написана на более новой версии JavaScript, она может быть транспилирована в более старую версию для поддержки более широкого круга пользователей.

Процесс транспиляции библиотек в JavaScript обычно выполняется с использованием инструментов, таких как Babel, который автоматически преобразует код из одной версии JavaScript в другую. Для этого обычно используется файл конфигурации (например, .babelrc), в котором указываются требуемые преобразования и настройки.


#### Aliasing Libraries
В некоторых случаях вам также может понадобиться вручную присвоить библиотеке псевдоним, например, для версии CJS в Nuxt2:
```js
export default defineNuxtConfig({
  alias: {
    'sample-library': 'sample-library/dist/sample-library.cjs.js'
  }
})
```

#### Default Exports
Зависимость с форматом CommonJS может использовать `module.exports` или `exports` для предоставления экспорта по умолчанию:

>node_modules/cjs-pkg/index.js
```js
module.exports = { test: 123 }
// or
exports.test = 123
```

This normally works well if we `require` such dependency:

>test.cjs
```js
const pkg = require('cjs-pkg')

console.log(pkg) // { test: 123 }
```

[Node.js в родном режиме ESM](https://nodejs.org/api/esm.html#interoperability-with-commonjs), `typescript` с [`esModuleInterop: true`](https://www.typescriptlang.org/tsconfig#esModuleInterop) и такие бандлеры, как webpack, предоставляют механизм совместимости, чтобы мы могли по умолчанию импортировать такую библиотеку. Этот механизм часто называют "interop require default":
```js
import pkg from 'cjs-pkg'

console.log(pkg) // { test: 123 }
```

Однако из-за сложностей определения синтаксиса и различных форматов пакетов всегда есть вероятность, что interop default не сработает, и в итоге мы получим что-то вроде этого:
```js
import pkg from 'cjs-pkg'

console.log(pkg) // { default: { test: 123 } }
```

Также при использовании синтаксиса динамического импорта (как в `CJS`, так и в `ESM`-файлах) всегда возникает такая ситуация:
```js
import('cjs-pkg').then(console.log) 
// [Module: null prototype] { default: { test: '123' } }
```

В этом случае нам нужно будет вручную вмешаться в экспорт по умолчанию:
```js
// Static import
import { default as pkg } from 'cjs-pkg'

// Dynamic import
import('cjs-pkg').then(m => m.default || m).then(console.log)
```

Для решения более сложных ситуаций и обеспечения большей безопасности можно использовать [mlly](https://github.com/unjs/mlly), который может сохранять именованные экспорты.
```js
import { interopDefault } from 'mlly'

// Assuming the shape is { default: { foo: 'bar' }, baz: 'qux' }
import myModule from 'my-module'

console.log(interopDefault(myModule)) // { foo: 'bar', baz: 'qux' }
```

### Для авторов библиотек
Хорошая новость заключается в том, что исправить проблемы совместимости с `ESM` довольно просто. Есть два основных варианта:

1. **Вы можете переименовать свои ESM-файлы, чтобы они заканчивались на `.mjs`.**  
    Возможно, вам придется разобраться с зависимостями вашей библиотеки и, возможно, с вашей системой сборки, но в большинстве случаев это поможет решить проблему. Также рекомендуется переименовывать файлы `CJS`, чтобы они заканчивались на `.cjs`, для наибольшей ясности.
2. **Вы можете сделать всю вашу библиотеку только ESM**.  
    Это будет означать установку `"type": "module"` в файле `package.json` и убедиться, что собранная библиотека использует синтаксис `ESM`. Однако у вас могут возникнуть проблемы с зависимостями - такой подход означает, что ваша библиотека может быть использована только в контексте `ESM`.


### Переход на ESM

Первым шагом на пути от `CJS` к `ESM` является обновление любого использования `require` на `import`:

>export (CJS)
```js
module.exports = ...

exports.hello = ...
```

>export (ESM)
```js
export default ...

export const hello = ...
```

>import (CJS)
```js
const myLib = require('my-lib')
```

>import (ESM)
```js
import myLib from 'my-lib'
// or
const myLib = await import('my-lib').then(lib => lib.default || lib)
```

В модулях ESM, в отличие от CJS, глобалы `require`, `require.resolve`, `__filename` и `__dirname` недоступны и должны быть заменены на `import()` и `import.meta.filename`.

> CJS
```js
// file
import { join } from 'path'
const newDir = join(__dirname, 'new-dir')

// lib
const someFile = require.resolve('./lib/foo.js')
```

> ESM
```js
// file
import { fileURLToPath } from 'node:url'
const newDir = fileURLToPath(new URL('./new-dir', import.meta.url))

// lib
import { resolvePath } from 'mlly'
const someFile = await resolvePath('my-lib', { url: import.meta.url })
```

### Лучшие практики

- Предпочитайте именованный экспорт вместо экспорта по умолчанию. Это помогает уменьшить конфликты CJS. (см. раздел [Default exports](https://nuxt.com/docs/guide/concepts/esm#default-exports))
- Избегайте зависимости от встроенных модулей Node.js и зависимостей CommonJS или Node.js-only насколько это возможно, чтобы сделать вашу библиотеку пригодной для использования в браузерах и Edge Workers без необходимости использования полифиллов.
- Используйте новое поле `exports` с условным экспортом. ([читать далее](https://nodejs.org/api/packages.html#conditional-exports)).
```json
{
  "exports": {
    ".": {
      "import": "./dist/mymodule.mjs"
    }
  }
}
```