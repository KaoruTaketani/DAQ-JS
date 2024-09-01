import { Server } from 'http'
import { WebSocketServer } from 'ws'

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
            `    <script type="module">`,
            '        const socket = new WebSocket("ws://localhost")',
            '        ',
            '        const messageElement = document.createElement("p")',
            '        messageElement.innerText = "random number is NaN"',
            '        socket.onmessage = event => {',
            '            const msg = JSON.parse(event.data)',
            '            //console.log(msg)',
            '            ',
            '            if (msg.channel === "messageInnerText") {',
            '                messageElement.innerText = msg.value',
            '            }',
            '        }',
            '        document.body.appendChild(messageElement)',
            '        ',
            '        const buttonElement = document.createElement("input")',
            '        buttonElement.type = "button"',
            '        buttonElement.value = "generate"',
            '        buttonElement.style.width = "100px"',
            '        buttonElement.addEventListener("click", () => {',
            '            socket.send(JSON.stringify({channel: "clickedElementValue", value: buttonElement.value}))',
            '        })',
            '        document.body.appendChild(buttonElement)',
            '    </script>',
            '</body>',
            '',
            '</html>'
        ].join('\n'))
    }
})
const webSocketServer = new WebSocketServer({ noServer: true })
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        ws.on('message', data => {
            const msg = JSON.parse(data)
            // console.log(msg)

            if (msg.channel === 'clickedElementValue'
                && msg.value === 'generate') {
                ws.send(JSON.stringify({ channel: 'messageInnerText', value: `random number is ${Math.random()}` }))
            }
        })
    })
})
httpServer.listen(80)
