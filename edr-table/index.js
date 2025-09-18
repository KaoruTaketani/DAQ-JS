import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import { WebSocketServer } from 'ws'
import ChannelEventTableServer from './ChannelEventTableServer.js'
import NeutronEventTableServer from './NeutronEventTableServer.js'
import PairedEventTableServer from './PairedEventTableServer.js'

const httpServer = new Server(),
    webSocketServer = new WebSocketServer({ noServer: true }),
    servers = new Map()

httpServer.on('request', (request, response) => {
    console.log(request.url)
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
            `    <p><a href="./ChannelEventTableClient.html">Channel</a></p>`,
            `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
    }
}).on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, ws => {
        if (request.url === '/ChannelEventTableClient.js')
            servers.set(ws, new ChannelEventTableServer(ws))
        if (request.url === '/PairedEventTableClient.js')
            servers.set(ws, new PairedEventTableServer(ws))
        if (request.url === '/NeutronEventTableClient.js')
            servers.set(ws, new NeutronEventTableServer(ws))

        ws.on('message', data => {
            // console.log(`onmessage url:${request.url}`)

            const arg = JSON.parse(data.toString())
            servers.get(ws)?.variables.message.assign(arg)
        })
        ws.on('close', () => {
            console.log(`a ws closed by the client url: ${request.url}`)

            servers.delete(ws)
        })
    })
}).listen(80)
