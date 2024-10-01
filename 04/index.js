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
        '            const msg = JSON.parse(event.data)',
        '            console.log(msg)',
        '            ',
        '            if (msg.key === "randomNumberInnerText") {',
        '                randomNumberElement.innerText = msg.value',
        '            }',
        '        }',
        `    </script>`,
        '</body>',
        '</html>'
    ].join('\n'))
})
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        // variables.newWebSocket.assign(ws)
        // ws.on('message', data => {
        //     const msg = JSON.parse(data)
        //     console.log(msg)

        //     if (msg.channel === 'clickedElementValue'
        //         && msg.value === 'generate') {
        //         ws.send(JSON.stringify({ channel: 'messageInnerText', value: `random number is ${Math.random()}` }))
        //     }
        // })
    })
})
httpServer.listen(80)

setInterval(() => {
    randomNumber = Math.random()
    webSocketServer.clients.forEach(ws => {
        ws.send(JSON.stringify({
            key:'randomNumberInnerText',
            value:`random number is ${randomNumber}`
        }))
    })
}, 1000)
