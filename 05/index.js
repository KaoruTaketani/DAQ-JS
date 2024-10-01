import { Server } from 'http'
import { WebSocketServer } from 'ws'

let randomNumber
const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })

httpServer.on('request', (_, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.end([
        '<html>',
        '<head>',
        '    <meta charset="utf-8">',
        '</head>',
        '<body>',
        `    <p id="randomNumber">random number is NaN</p>`,
        `    <script type="module">`,
        '        const randomNumberElement = document.getElementById("randomNumber")',
        '        ',
        '        const socket = new WebSocket("ws://localhost")',
        '        socket.onclose = () => {',
        '            document.body.innerHTML = "the connection was closed by the server."',
        '        }',
        '        socket.onmessage = event => {',
        '            randomNumberElement.innerText = event.data',
        '        }',
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
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
