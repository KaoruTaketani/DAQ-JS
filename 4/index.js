import { Server } from 'http'
import ListenableString from './ListenableString.js'

const httpRequestUrl = new ListenableString()
let httpResponse
httpRequestUrl.addListener(arg => {
    httpResponse.writeHead(200, { 'Content-Type': 'text/html' })
    httpResponse.end([
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
})


const httpServer = new Server()

httpServer.on('request', (request, response) => {
    httpResponse = response
    httpRequestUrl.assign(request.url)
})
httpServer.listen(80)
