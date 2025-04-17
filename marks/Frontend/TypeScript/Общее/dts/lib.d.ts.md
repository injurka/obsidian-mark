## Общее

Когда вы устанавливаете TypeScript, вместе с ним устанавливаются файлы объявлений, такие как `lib.d.ts`. Этот файл содержит различные объявления общей среды, которые существуют во время выполнения JavaScript и DOM.

> Это позволяет быстро начать писать типизированный JavaScript.
>
> Он автоматически включается в контекст компиляции проекта TypeScript;

Вы можете исключить этот файл из контекста, указав флаг командной строки компилятора `noLib` (или указав параметр `noLib: true` в `tsconfig.json`).

Посмотрите на следующий пример:

```ts
const foo = 123;
const bar = foo.toString();
```

Этот тип кода работает нормально, потому что `lib.d.ts` определяет метод `toString` для всех объектов JavaScript.

Если вы используете тот же код с опцией `noLib`, это приведет к ошибке проверки типа:

```ts
const foo = 123;
const bar = foo.toString(); // ERROR: Property 'toString' does not exist on type 'number'
```

---

## Как работает внутри

Содержимое `lib.d.ts` это в основном объявления переменных (такие как: `window`, `document`, `math`) и некоторые аналогичные объявления интерфейса (такие как: `Window`, `Document`, `Math`).

Самый простой способ найти типы кода (такие как `Math.floor`) это использовать `F12`(для mac `fn` + `F12`) из IDE (переход к определению).

Наприме, `window` определяется как:

```ts
declare var window: Window;
```

Это просто `declate var`, за которым следуют имя переменной (`window`) и интерфейс для аннотаций типов (интерфейс `Window`). Эти переменные обычно указывают на некоторый глобальный интерфейс. Например, ниже приведена небольшая часть интерфейса `Window`:

```ts
interface Window
  extends EventTarget,
    WindowTimers,
    WindowSessionStorage,
    WindowLocalStorage,
    WindowConsole,
    GlobalEventHandlers,
    IDBEnvironment,
    WindowBase64 {
  animationStartTime: number;
  applicationCache: ApplicationCache;
  clientInformation: Navigator;
  closed: boolean;
  crypto: Crypto;
  // so on and so forth...
}
```

Вы можете видеть много информации о типах в этих интерфейсах. Когда вы не используете TypeScript, вам нужно хранить их в своем мозгу. Теперь вы можете использовать такие вещи, как `intellisense`, которые позволят запоминать чтото более важное.

Выгодно использовать эти глобальные переменные. Позволяет добавлять дополнительные свойства без изменения `lib.d.ts`. Далее мы покажем эти понятия.

---

## Изменение исходных типов

В TypeScript интерфейсы открыты, что означает, что когда вы хотите использовать несуществующие члены, вам просто нужно добавить их в объявление интерфейса в `lib.d.ts`, и TypeScript автоматически получит его. Обратите внимание, что вам нужно внести эти изменения в глобальный модуль, чтобы связать эти интерфейсы с `lib.d.ts`. Мы рекомендуем вам создать специальный файл с именем `global.d.ts`.

Вот несколько примеров, как мы можем добавить новые свойства в `Window`, `Math`, `Date`:

### Window

Просто добавлено свойство для интерфейса `Window`

```ts
interface Window {
  helloWorld(): void;
}
```

Это позволит вам использовать его безопасным способом:

```ts
// Добавьте в код
window.helloWorld = () => console.log('hello world');

// Вызовите
window.helloWorld();

// Неправильное использование может привести к ошибкам
window.helloWorld('gracius'); // Error: Supplied parameters do not match the signature of the call target
```

### Math

Глобальная переменная `Math` определена в `lib.d.ts` как:

```ts
/** An intrinsic object that provides basic mathematics functionality and constants. */
declare var Math: Math;
```

То есть переменная `Math` является экземпляром `Math`, а интерфейс `Math` определяется как:

```ts
interface Math {
  E: number;
  LN10: number;
  // others ...
}
```

Когда вы хотите добавить атрибуты, которые вам нужны, в глобальную переменную `Math`, вам нужно только добавить его в глобальный интерфейс `Math`. Например, в `seedrandom` он добавляет функцию `seedrandom` в глобальный объект Math. Это можно сделать так:

```ts
interface Math {
  seedrandom(seed?: string): void;
}
```

А затем использовать это так:

```ts
Math.seedrandom();

Math.seedrandom('Any string you want');
```

### Date

Если вы ищете объявление определения `Date` в `lib.d.ts`, вы найдете:

```ts
declare var Date: DateConstructor;
```

Интерфейс `DateConstructor` такой же, как интерфейсы `Math` и `Window`, которые вы видели выше, поскольку он охватывает элементы глобальной переменной `Date`, которые можно использовать (например, `Date.now()`). Кроме того, он содержит подпись для конструктора (например, `new Date()`), которая позволяет создавать экземпляр `Date`. Часть кода для интерфейса `DateConstructor` выглядит следующим образом:

```ts
interface DateConstructor {
  new (): Date;
  // ... other construct signatures

  now(): number;

  // ... other member functions
}
```

В `datejs` добавляют свойства как к глобальной переменной `Date`, так и к экземплярам `Date`, поэтому определение TypeScript этой библиотеки выглядит следующим образом

```ts
// DateJS добавил статические методы
interface DateConstructor {
  /** Gets a date that is set to the current date. The time is set to the start of the day (00:00 or 12:00 AM) */
  today(): Date;
  // ... so on and so forth
}

// DateJS дал доступ к публичным методам
interface Date {
  /** Adds the specified number of milliseconds to this instance. */
  addMilliseconds(milliseconds: number): Date;
  // ... so on and so forth
}
```

Это позволяет вам делать это с проверкой типов:

```ts
const today = Date.today();
const todayAfter1second = today.addMilliseconds(1000);
```

### string

Если вы ищете `string` в `lib.d.ts`, вы найдете что-то похожее на `Date` (глобальные переменные `String`, интерфейс `StringConstructor`, интерфейс `String`). Но стоит отметить, что интерфейс `String` также влияет на строковые литералы, как показано ниже:

```ts
interface String {
  endsWith(suffix: string): boolean;
}

String.prototype.endsWith = function(suffix: string): boolean {
  const str: string = this;
  return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```

### string redux

Для удобства объявления мы рекомендуем создать файл `global.d.ts`. Тем не менее, если вы хотите, вы можете войти в глобальное пространство имен из файлового модуля, используя `declare global { / global namespace / }`:

```ts
// Убедитесь, что это модуль
export {};

declare global {
  interface String {
    endsWith(suffix: string): boolean;
  }
}

String.prototype.endsWith = function(suffix: string): boolean {
  const str: string = this;
  return str && str.indexOf(suffix, str.length - suffix.length) !== -1;
};

console.log('foo bar'.endsWith('bas')); // false
console.log('foo bas'.endsWith('bas')); // true
```


### Используйте свой собственный `lib.d.ts`

Как упоминалось выше, использование параметра компиляции `--noLib` приведет к тому, что TypeScript автоматически исключит включенные файлы `lib.d.ts`. Почему эта функция работает, я перечислил несколько общих причин:

- Рабочая среда JavaScript сильно отличается от стандартной среды выполнения на основе браузера;
- Вы хотите строго контролировать глобальные переменные в своем коде, например: `lib.d.ts` определяет элемент как глобальную переменную, и вы не хотите, чтобы он просочился в ваш код.

После исключения файла `lib.d.ts` по умолчанию вы можете включить файл с аналогичным именем в контекст компиляции, и TypeScript выберет его для проверки типа.

>Будьте осторожны с опцией `--noLib`: как только вы ее используете, использующие модуль также будут вынуждены использовать опцию `--noLib`, когда вы делитесь своим проектом с другими. Еще хуже, если вы привнесете внешний код в свой проект, вам может понадобиться также перенести код на основе `lib`.


### Влияние target компилятора на `lib.d.ts`

Установка `target` компиляции в `es6` может привести к тому, что `lib.d.ts` будет включать в себя более современные (`es6`) объявления среды, такие как `Promise`. Этот волшебный эффект целей компилятора изменяет среду кода, которая идеально подходит для некоторых людей, но вызывает путаницу у других, потому что смешивает скомпилированный код со средой.

Если вам нужен более детальный контроль над вашей средой, вы должны использовать параметр `--lib`, который мы обсудим далее.

#### `--lib` опция

Иногда вы хотите отделить связь между целью компиляции (созданная версия JavaScript) и поддержкой окружающих библиотек. Например, для `Promise` вашей целью компиляции является `--target es5`, но вы все равно хотите ее использовать. В настоящее время вы можете использовать `lib` для управления ею.

> Используйте параметр `--lib`, чтобы отделить любую библиотеку от `--target`.

Вы можете предоставить эту опцию компилятору из командной строки или в `tsconfig.json` (рекомендуется):

#### Командная строка

```bash
tsc --target es5 --lib dom,es6
```


#### tsconfig.json

```json
"compilerOptions": {
    "lib": ["dom", "es6"]
}
```

`lib` может быть классифицированы следующим образом:

- JavaScript
	- es5 
	- es6
	- es2015
	- es7
	- es2016
	- es2017
	- esnext 
- Runtime Environment 
	- dom
	- dom.iterable
	- Zwebworker
	- scripthost 
- ESNext Варианты функционала
	- es2015.core
	- es2015.collection
	- es2015.generator
	- es2015.iterable
	- es2015.promise
	- es2015.proxy
	- es2015.reflect
	- es2015.symbol
	- es2015.symbol.wellknow
	- es2016.array.include
	- es2017.object
	- es2017.sharedmemory
	- esnext.asynciterable 

> Опция `--lib` обеспечивает очень детальный контроль, поэтому вы, скорее всего, выберете один из сред выполнения и один из категории объектов JavaScript. Если вы не укажете `--lib`, будет импортирована библиотека по умолчанию:
> - Для `--target es5` => es5, dom, scripthost
> - Для `--target es6` => es6, dom, dom.iterable, scripthost