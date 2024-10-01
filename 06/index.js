import { readFile } from 'fs'
import { Server } from 'http'
import { WebSocketServer } from 'ws'

let randomNumber
const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })

httpServer.on('request', (request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./RandomNumberGeneratorClient.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
    if (request.url.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
        return
    }
    response.writeHead(404)
    response.end(`${request.url} was not found on this server`)
})
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, () => { })
})
httpServer.listen(80)

setInterval(() => {
    randomNumber = Math.random()
    webSocketServer.clients.forEach(ws => {
        ws.send(`random number is ${randomNumber}`)
    })
}, 1000)
