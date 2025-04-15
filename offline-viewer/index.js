import { readdir, readFile } from 'fs'
import { Server } from 'http'
import { join } from 'path'
import { WebSocketServer } from 'ws'
const h5wasm = await import("h5wasm/node");
await h5wasm.ready

const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })
const hdf5Path = '../../hdf5/mieze'

httpServer.on('request', (request, response) => {
    if (request.url.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
    } else {
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
    }
})
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        readdir(hdf5Path, (err, files) => {
            if (err) throw err

            ws.send(files.map(innerText => `<option>${innerText}</option>`).join('\n'))
        })
        ws.onmessage = event => {
            const files = JSON.parse(event.data)
            // console.log(files)
            if (files.length === 1) {
                const f = new h5wasm.File(join(hdf5Path, files[0]), "r")
                ws.send(f.keys().map(key => `<p>${key}</p>`).join(''))
                console.log(f.attrs)
                console.log(Object.keys(f.attrs))
                console.log(Object.keys(f.attrs).map(key=>`${key}: ${f.attrs[key].value}, ${f.attrs[key].dtype}`))
                f.close()
            } else {

            }
        }
        ws.onclose = () => {
            console.log('a ws closed by the client')
        }
    })
})
httpServer.listen(80)

