
```ts
import Bun from 'bun'

const CONFIG = {
  port: 8080,
  hostname: '0.0.0.0',
}

const CORS_HEADERS = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
}

Bun.serve({
  port: CONFIG.port,
  hostname: CONFIG.hostname,

  async fetch(req, server) {
    const url = new URL(req.url)

    //* Handle CORS preflight requests
    if (req.method === 'OPTIONS')
      return new Response('Departed', CORS_HEADERS)

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