import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import AttributesRequestHandler from './AttributesRequestHandler.js'
import ChannelRequestHandler from './ChannelRequestHandler.js'
import FilesRequestHandler from './FilesRequestHandler.js'
import NumEventsRequestHandler from './NumEventsRequestHandler.js'
import Variables from './Variables.js'
import FilteredImageRequestHandler from './FilteredImageRequestHandler.js'
import FilteredTOFHistogramRequestHandler from './FilteredTOFHistogramRequestHandler.js'

const variables = new Variables()
new FilesRequestHandler(variables)
new ChannelRequestHandler(variables)
new NumEventsRequestHandler(variables)
new AttributesRequestHandler(variables)
new FilteredImageRequestHandler(variables)
new FilteredTOFHistogramRequestHandler(variables)

const httpServer = new Server()
variables.edrPath.assign('../../edr')
variables.hdf5Path.assign('../../hdf5')

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
            `    <p><a href="./ChanneClient.html">Channel</a></p>`,
            `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
            `    <h2>HDF5</h2>`,
            `    <p><a href="./AttributesClient.html">Attributes</a></p>`,
            `    <p><a href="./FilteredImageClient.html">Filtered Image</a></p>`,
            `    <p><a href="./FilteredTOFHistogramClient.html">Filtered TOF Histogram</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
}).listen(80)
