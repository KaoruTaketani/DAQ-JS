import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import EDRChannelRequestHandler from './EDRChannelRequestHandler.js'
import EDRNumEventsRequestHandler from './EDRNumEventsRequestHandler.js'
import FilesRequestHandler from './FilesRequestHandler.js'
import Variables from './Variables.js'

const variables = new Variables()
new FilesRequestHandler(variables)
new EDRNumEventsRequestHandler(variables)
new EDRChannelRequestHandler(variables)

const httpServer = new Server()
const edrPath = '../../edr'
variables.edrPath.assign(edrPath)

httpServer.on('request', (request, response) => {
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)
    variables.response.assign(response)
    variables.url.assign(url)
    
    if (url.pathname.endsWith('.js')) {
        readFile(`.${request.url}`, 'utf8', (err, data) => {
            if (err) throw err

            response.writeHead(200, { 'Content-Type': 'text/javascript' })
            response.end(data)
        })
        return
    }
    if (url.pathname.endsWith('.html')) {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <script type="module" src="./${basename(url.pathname, '.html')}.js">`,
            `    </script>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
    if (url.pathname === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' })
        response.end([
            '<html>',
            '<head>',
            '    <meta charset="utf-8">',
            '</head>',
            '<body>',
            `    <h2>EDR</h2>`,
            `    <p><a href="./ChannelEventTableClient.html">Channel</a></p>`,
            `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
}).listen(80)
