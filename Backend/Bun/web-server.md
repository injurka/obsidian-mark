
```ts
import Bun from 'bun'

const config = {
  port: 8080,
  hostname: '0.0.0.0',
}

Bun.serve({
  port: config.port,
  hostname: config.hostname,

  async fetch(req, server) {
    const url = new URL(req.url)

    if (url.pathname === '/') {
      server.upgrade(req)
      return new Response(Bun.file('./dist/index.html'))
    }

    const filePath = `./dist${url.pathname}`
    const file = Bun.file(filePath)

    return new Response(file)
  },

  websocket: {
    open(ws) {
      console.log(`Client #${ws} connected.`)
    },
    message(ws, message) {
      console.log(`Received message from client #${ws}: ${message}.`)
    },
  },
  error() {
    return new Response(null, { status: 404 })
  },
})

```