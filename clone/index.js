import { Server } from 'http'
import { readFile } from 'fs'
import { WebSocketServer } from 'ws'
import { Worker } from 'worker_threads'

const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })
const webSocketPathnames = new Map()
const workers = new Map()

httpServer.on('request', (request, response) => {
    if (request.url.endsWith('.js')) {
        readFile('./velocityClient.js', 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
    } else {
        const id = Date.now()
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script>`,
            `        window.id = ${id}`,
            `    </script>`,
            `    <script type="module" src="./velocityClient.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
        const worker = new Worker('./velocityMaker.js', { workerData: id })
        worker.on('message', data => {
            console.log(data)
            webSocketPathnames.forEach((pathname, ws) => {
                if (pathname !== `/${data.id}`) return

                ws.send(`velocity (m/s): ${data.velocity}`)
            })
        })
        workers.set(id, worker)
    }
})
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        console.log(request.url)
        const url = new URL(`ws://localhost${request.url}`)
        webSocketPathnames.set(ws, url.pathname)

        ws.onmessage = event => {
            console.log(`event.data: ${event.data}`)
            const id = parseInt(webSocketPathnames.get(ws).substring(1))
            console.log(id)
            workers.get(id).postMessage(event.data)
        }
        ws.onclose = () => {
            const id = parseInt(webSocketPathnames.get(ws).substring(1))
            console.log(id)
            workers.get(id).terminate().then(() => {
                workers.get(id).removeAllListeners('message')
                workers.delete(id)
                console.log(`worker terminated id: ${id}`)
            })
            webSocketPathnames.delete(ws)
        }
    })
})
httpServer.listen(80)

