import { Server } from 'http'

const httpServer = new Server()

httpServer.on('request', (_, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(['<html>', '<head>', '<meta charset="utf-8">', '</head>',
    '<body>', `<p>random number is ${Math.random()}</p>`, '</body>', '</html>'
  ].join('\n'))
})
httpServer.listen(80)
