import { readdir, readFile } from 'fs';
import { Server } from 'http';
import { basename, join } from 'path';
import { WebSocketServer } from 'ws';
import Variables from './Variables.js';
import AttrsInnerHTMLMaker from './AttributesInnerHTMLMaker.js';
import ClientInnerHTMLSender from './ClientInnerHTMLSender.js';
import NeutronRateInnerHTMLMaker from './NeutronRateInnerHTMLMaker.js';
const h5wasm = await import("h5wasm/node");
// import { ready } from 'h5wasm
await h5wasm.ready

const httpServer = new Server()
const webSocketServer = new WebSocketServer({ noServer: true })
const hdf5Path = '../../hdf5/mieze'

const variables = new Variables()
new ClientInnerHTMLSender(variables)
new AttrsInnerHTMLMaker(variables)
new NeutronRateInnerHTMLMaker(variables)

httpServer.on('request', (request, response) => {
    if (request.url?.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
    } else if (request.url?.endsWith('.html')) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./${basename(request.url, '.html')}.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <p><a href="./Attributes.html">Attributes</a></p>`,
            `    <p><a href="./NeutronRate.html">NeutronRate</a></p>`,
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
            console.log(`onmessage url:${request.url}`)

            if (request.url === undefined) {
                console.log(`request.url is undefiend`)
                return
            }
            variables.clientUrl.assign(request.url)

            const f = new h5wasm.File(join(hdf5Path, event.data.toString()), "r")
            variables.hdf5File.assign(f)
            f.close()
            variables.clientWebSocket.assign(ws)
        }
        ws.onclose = () => {
            console.log('a ws closed by the client')
        }
    })
})
httpServer.listen(80)

