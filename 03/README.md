[home](../README.md)

"Node.js provides a set of asynchronous I/O primitives in its standard library."

By runnging the sample code, a number is shown in the browser. The number does not change by reloading.

```js
import { Server } from 'http'

const randomNumber = Math.random()
const httpServer = new Server()

httpServer.on('request', (_, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(['<html><head><meta charset="utf-8"></head>',
    `<body><p>random number is ${randomNumber}</p></body></html>`
  ].join('\n'))
})
httpServer.listen(80)
```

## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `node .` in the terminal
1. open http://localhost in your browser