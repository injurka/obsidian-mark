## Colored console log

```ts
const blue = '\x1B[34m'
const green = '\x1B[32m'
const yellow = '\x1B[33m'
const reset = '\x1B[0m'

console.log(`${blue}🔌 api proxy setuped${reset}`)
console.log(`| ${green}Path${reset} | ${yellow}Target${reset} |`)
console.log(`| ${green}paddedKey${reset} | ${yellow}paddedTarget${reset} |`)
```

## Grouped logs

```ts
export function logEvent(log: string, type?: unknown, msg?: unknown) {
  const eventStyle = 'color: #9400D3; font-weight: bold;'

  console.groupCollapsed(`%c${log}`, eventStyle, msg ? type : '')
  console.log(msg || type)
  console.groupEnd()
}
```

<iframe src="https://caniuse.bitsofco.de/embed/index.html?feat=console-basic" frameborder="0" width="100%" height="510px"></iframe>

## Источники
- #### [mdn](https://developer.mozilla.org/ru/docs/Web/API/console)