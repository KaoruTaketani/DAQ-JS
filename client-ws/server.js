import { Server } from 'http'
import { WebSocketServer } from 'ws'

const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })

httpServer.on('request', (request, response) => {
    console.log(`url: ${request.url}, method: ${request.method}`)
    response.writeHead(404)
    response.end()
}).listen(80)
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        console.log(`url: ${request.url}`)
        if (request.url === '/date') {
            ws.send(Date.now())
        }
        if (request.url === '/') {
            ws.on('message', data => {
                console.log(`recieved ${data.toString()}`)
                ws.close()
            })
        }
    })
})
