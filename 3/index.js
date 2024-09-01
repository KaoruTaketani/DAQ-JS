import { Server } from 'http'

const httpServer = new Server()

httpServer.on('request', (request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end([
      '<html>',
      '',
      '<head>',
      '    <meta charset="utf-8">',
      '</head>',
      '',
      '<body>',
      '    <h2>Random Number Generator</h2>',
      `    <p>random number is ${Math.random()}</p>`,
      '</body>',
      '',
      '</html>'
    ].join('\n'))
  }
})
httpServer.listen(80)
