import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import { WebSocketServer } from 'ws'
import AttributesServer from './AttributesServer.js'
import ContrastServer from './ContrastServer.js'
import RawImageServer from './RawImageServer.js'
import NeutronRateServer from './NeutronRateServer.js'
import TableServer from './TableServer.js'
import VelocityServer from './VelocityServer.js'


const httpServer = new Server(),
    webSocketServer = new WebSocketServer({ noServer: true }),
    servers = new Map()

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
            `    <p><a href="./AttributesClient.html">Attributes</a></p>`,
            `    <p><a href="./ContrastClient.html">Contrast</a></p>`,
            `    <p><a href="./RawImageClient.html">Raw Image</a></p>`,
            `    <p><a href="./NeutronRateClient.html">NeutronRate</a></p>`,
            `    <p><a href="./TableClient.html">Table</a></p>`,
            `    <hr />`,
            `    <p><a href="./VelocityClient.html">Velocity</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
    }
}).on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        if (request.url === '/AttributesClient.js')
            servers.set(ws, new AttributesServer(ws))
        if (request.url === '/ContrastClient.js')
            servers.set(ws, new ContrastServer(ws))
        if (request.url === '/RawImageClient.js')
            servers.set(ws, new RawImageServer(ws))
        if (request.url === '/NeutronRateClient.js')
            servers.set(ws, new NeutronRateServer(ws))
        if (request.url === '/TableClient.js')
            servers.set(ws, new TableServer(ws))
        if (request.url === '/VelocityClient.js')
            servers.set(ws, new VelocityServer(ws))

        ws.on('message', data => {
            const arg =JSON.parse(data.toString())
            servers.get(ws)?.variables.message.assign(arg)
            // console.log(`onmessage url:${request.url}`)

            // if (request.url === undefined) {
            //     console.log(`request.url is undefiend`)
            //     return
            // }
            // variables.clientUrl.assign(request.url)
            // variables.message.assign(data.toString())
            // if (request.url.endsWith('/TableClient.js')) {
            //     variables.tableSelectedColumns.assign(data.toString())
            // } else if (request.url.endsWith('/VelocityClient.js')) {
            // } else {
            //     const f = new h5wasm.File(join(this._hdf5Path, data.toString()), "r")
            //     variables.hdf5File.assign(f)
            //     f.close()
            // }
            // variables.clientWebSocket.assign(ws)
        })
        ws.on('close', () => {
            console.log('a ws closed by the client')
            servers.delete(ws)
        })
    })
}).listen(80)


