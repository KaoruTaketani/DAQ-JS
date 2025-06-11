import { readFile } from 'fs'
import { Server } from 'http'
import { WebSocketServer } from 'ws'
import ListenableNumber from './ListenableNumber.js'

const randomNumber = new ListenableNumber()
const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })

randomNumber.addListener(arg => {
    webSocketServer.clients.forEach(ws => {
        ws.send(`random number is ${arg}`)
    })
})

httpServer.on('request', (request, response) => {
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./Client.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
    if (request.url === '/Client.js') {
        readFile('./Client.js', 'utf8', (err, data) => {
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
    randomNumber.assign(Math.random())
}, 1000)
