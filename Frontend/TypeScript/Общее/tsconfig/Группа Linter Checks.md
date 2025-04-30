Флаги этой группы проверяют не соответствие типов, а качество кода. Своего рода правила как в ESLint. И действительно некоторые правила секции `Linter Checks` можно заменить на аналогичные правила ESLint. Полный список флагов данной секции:

```json
{
  "compilerOptions": {
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
  }
}
```

**_Все вышеперечисленные флаги по умолчанию имеют значение_** `false`, а для того, чтобы было строго нужно установить противоположное значение – `true`.

Я неспроста отделил флаги `noPropertyAccessFromIndexSignature` и `noUncheckedIndexedAccess` пустой строкой от других флагов группы. Дело в том, что они находятся здесь только по причине того, что концептуально не могут располагаться в группе `Strict Checks`. По задумке в этой секции находятся флаги, которые подконтрольны опции `strict`.

Но эти флаги слишком специфичные для того, чтобы включать их по умолчанию. Практически так и сказано в анонсах `noPropertyAccessFromIndexSignature` и `noUncheckedIndexedAccess`. Однако это не делает их правилами линтинга, они проверяют типы и по факту относятся к `Strict Checks`, только не включаются автоматически при включении флага `strict`.

Остальные же флаги группы полноправно находятся в этой секции и имеют аналогичные правила в ESLint. В некоторых случаях с временными ограничениями, так как ещё не все правила перенесены в ESLint из TSLint. Соответствия правил можно посмотреть на странице [TSLint Migration Guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) и в репозитории [ESLint rules for TSLint](https://github.com/buzinas/tslint-eslint-rules).


## noPropertyAccessFromIndexSignature

> Рекомендую: всегда / сложность: легко / есть нюанс / нельзя заменить линтером

Флаг `noPropertyAccessFromIndexSignature` запрещает обращаться к свойствам объекта через точку aka `dot notation`, если свойства объекта описаны не явно, а через произвольные параметры (aka arbitrarily-named properties, index signatures).

```ts
interface User {
  // явно указанные параметры
  login: string
  email: string

  // произвольные параметры
  [key: string]: string
}

const user: User = {
  login: 'hello',
  email: 'hello@example.com'
}

// c noPropertyAccessFromIndexSignature: true
// данная строка приведёт к ошибке
const username = user.name

// но так обращаться всё ещё можно
const username2 = user['name']
```

Вместо точечной нотации мы используем скобочную нотацию aka [bracket notation](https://derekknox.com/articles/js-bracket-notation-practical-examples/). Идея флага примерно такая же как у `noImplicitAny` - привлечь внимание к потенциально проблемным местам.

Единственной причиной не использовать данную опцию – наличие двух видов синтаксиса для обращения к свойствам объекта. Однако на мой взгляд в этом нет проблемы так как хоть синтаксис и разный, у каждого из них есть своё назначение. Всегда используем `dot notation` и, если случается исключение, переходим на скобочную нотацию. При этом код становится безопаснее. Поэтому я рекомендую использовать этот флаг.

На самом деле есть ещё одна причина, но она решается флагом `noUncheckedIndexedAccess`.

## noUncheckedIndexedAccess

**Рекомендую: по ситуации / сложность: средне / есть серьёзный нюанс / связан с** `strictNullChecks` / нельзя заменить линтером

Ещё раз взглянем на предыдущий пример.

```ts
interface User {
  // явно указанные параметры
  login: string
  email: string

  // произвольные параметры
  [key: string]: string
}

const user: User = {
  login: 'hello',
  email: 'hello@example.com'
}

// Тип переменной username - string
const username = user['name']
```

Как мы видим, тип переменной `username` является `string.` И это не совсем правильно так как мы можем обратиться к любому свойству, даже если его не существует. Можно описывать произвольные поля следующим образом: `[key: string]: string | undefined`. Это решит проблему, но добавит ручной работы. Плюс, из-за человеческого фактора можно периодически забывать дописывать `undefined`.

Флаг `noUncheckedIndexedAccess` сделает эту работу за нас. Теперь компилятор не позволит использовать полученные таким образом переменные без предварительной проверки.

Рассмотрим ещё один пример. На этот раз с массивом:

```ts
const strings: string[] = ['hello']
// здесь переменная number будет иметь тип string
const number = strings[100]
```

Однако очевидно, что в данном случае переменная будет `undefined`. С включенным `noUncheckedIndexedAccess` в подобных ситуациях тип переменной будет определяться как `string | undefined`.

Казалось бы, мы подчеркнули скобочной нотацией «магические» свойства объекта, мы можем использовать их только после проверок на `undefined` – всё красиво и безопасно. Что может пойти не так?

Если кратко:

```ts
const strings: string[] = ['hello']
// в данном случае переменная number также будет иметь тип string | undefined
const number = strings[0]
```

Или другой пример:

```ts
function upperCaseAll(strings: string[]) {
  for (let i = 0; i < strings.length; i++) {
      // здесь будет ошибка компиляции
      console.log(strings[i].toUpperCase());
  }
}
```

Другими словами, при данной конфигурации в обмен на безопасность в некоторых случаях придётся платить проверками, которые не несут смысла только для того, чтобы укротить строптивый компилятор. Выглядит это крайне костыльно.

Определённо код с `noUncheckedIndexedAccess` становится значительно безопаснее, а это главная цель использования TypeScript. Однако компромисс может выглядеть достаточно серьёзным, поэтому я не могу рекомендовать флаг всем разработчикам.

_Флаг является своего рода дополнением к флагу_ `strictNullChecks` поэтому работает только когда второй флаг тоже включен.

## noImplicitReturns

> Рекомендую: всегда / сложность: легко / правило ESLint: consistent-return, пока не реализовано

Флаг проверяет, чтобы все ветки функции возвращали значение:

```ts
function lookupHeadphonesManufacturer(color: 'blue' | 'black'): string {
  if (color === 'blue') {
    return 'beats'
  }
  // забыли return
}
```

Аналогично правилу ESLint `consistent-return`, которое в данный момент ещё не реализовано для TypeScript.

## noFallthroughCasesInSwitch

> Рекомендую: если не используется ESLint / сложность: легко / правило ESLint: `no-fallthrough`

Флаг проверяет наличие `break` в операторе `switch/case`:

```ts
switch (value) {
  case 0:
    console.log('even')
    // забыли break
  case 1:
    console.log('odd')
    break
}
```

Заменяется правилом `no-fallthrough`.

## noUnusedLocals

**Рекомендую: для production если не используется ESLint / сложность: легко / правило ESLint: no-unused-vars**

Код проверяется на наличие неиспользуемых переменных:

```ts
function createKeyboard (modelID: number) {
  // объявлена неиспользуемая переменная
  const defaultModelID = 23

  return {
    type: 'keyboard',
    modelID
  }
}
```

Данное правило крайне неудобно при использовании в процессе разработки. В процессе написания кода он может находится в «разобранном» состоянии, а наличие неиспользуемых переменных будет вызывать ошибку компиляции.

Можно переопределять флаг для `development` окружения или использовать правило ESLint `no-unused-vars`.

## noUnusedParameters

> Рекомендую: для production если не используется ESLint / сложность: легко / правило ESLint: no-unused-vars

Код проверяется на наличие неиспользуемых аргументов функций и методов:

```ts
function createDefaultKeyboard (modelID: number) {
  const defaultModelID = 23

  return {
    type: 'keyboard',
    modelID: defaultModelID
  }
}
```

Данное правило также как `noUnusedParameters` мешает удобному процессу разработки. Можно переопределять флаг для `development` окружения или добавить дополнительные параметры к проверке ESLint `no-unused-vars`.

Подведение итогов `Linter Checks`

- нет единого флага, которым можно активировать все опции секции
    
- опции `noPropertyAccessFromIndexSignature` и `noUncheckedIndexedAccess` по факту относятся к `Strict Checks`, только не активируются автоматически при включении главного флага `strict`
    
- остальные флаги секции: `noFallthroughCasesInSwitch`, `noUnusedLocals`, `noUnusedParameters` можно заменить правилами линтера. Только правило для `noImplicitReturns` временно не поддерживается


## Источники
- #### [habr](https://habr.com/ru/articles/557738/)
