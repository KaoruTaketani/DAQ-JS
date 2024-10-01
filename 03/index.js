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
