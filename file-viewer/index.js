import { readFile } from 'fs'
import { Server } from 'http'
import AttributesHandler from './AttributesHandler.js'
import FilesHandler from './FilesHandler.js'
import NumEventsHandler from './NumEventsHandler.js'
import RootHandler from './RootHandler.js'
import Variables from './Variables.js'
import GraphHandler from './GraphHandler.js'
import WaveformHandler from './WaveformHandler.js'
import ImageHandler from './ImageHandler.js'
import TableHandler from './TableHandler.js'

const variables = new Variables()
new FilesHandler(variables)
new NumEventsHandler(variables)
new AttributesHandler(variables)
new RootHandler(variables)
new GraphHandler(variables)
new WaveformHandler(variables)
new ImageHandler(variables)
new TableHandler(variables)

const httpServer = new Server()
const responses = new Map()
variables.responses.assign(responses)
variables.edrPath.assign('../../edr')
variables.hdf5Path.assign('../../hdf5')

httpServer.on('request', (request, response) => {
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)

    if (url.pathname.endsWith('.js')) {
        if (url.pathname === '/Client.js') {

            response.writeHead(404)
            response.end('')
            return
        }
        if (url.pathname.startsWith('/lib/')) {
            readFile(`../${request.url}`, 'utf8', (err, data) => {
                if (err) throw err

                response.writeHead(200, { 'Content-Type': 'text/javascript' })
                response.end(data)
            })
        } else {
            readFile(`.${request.url}`, 'utf8', (err, data) => {
                if (err) throw err

                response.writeHead(200, { 'Content-Type': 'text/javascript' })
                response.end(data)
            })
        }
        return
    }
    if (url.pathname.endsWith('.html')) {
        if (url.pathname === '/Graph.html') {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script type="module" src="./FigureClientGraph.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (url.pathname === '/Waveform.html') {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script type="module" src="./FigureClientWaveform.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (url.pathname === '/Image.html') {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script type="module" src="./FigureClientImage.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (url.pathname === '/Attributes.html') {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script type="module" src="./AttributesClient.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (url.pathname === '/Table.html') {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script type="module" src="./TableClient.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        response.writeHead(404)
        response.end(`${url.pathname} was not found`)
        return
    }
    responses.set(url, response)
    // variables.response.assign(response)
    variables.url.assign(url)
}).listen(80)
