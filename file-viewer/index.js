import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import AttributesHandler from './AttributesHandler.js'
import ChannelHandler from './ChannelHandler.js'
import FilesHandler from './FilesHandler.js'
import NumEventsHandler from './NumEventsHandler.js'
import Variables from './Variables.js'
import FilteredImageHandler from './FilteredImageHandler.js'
import FilteredTOFHistogramHandler from './FilteredTOFHistogramHandler.js'
import TimerHandler from './TimerHandler.js'
import KickerHandler from './KickerHandler.js'
import ImageHandler from './ImageHandler.js'

const variables = new Variables()
new FilesHandler(variables)
new ChannelHandler(variables)
new TimerHandler(variables)
new KickerHandler(variables)
new NumEventsHandler(variables)
new AttributesHandler(variables)
new FilteredImageHandler(variables)
new FilteredTOFHistogramHandler(variables)
new ImageHandler(variables)

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
            `    <p><a href="./TimerClient.html">Timer</a></p>`,
            `    <p><a href="./KickerClient.html">Kicker</a></p>`,
            `    <p><a href="./ChannelClient.html">Channel</a></p>`,
            `    <p><a href="./PairedClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronClient.html">Neutron</a></p>`,
            `    <h2>HDF5</h2>`,
            `    <p><a href="./AttributesClient.html">Attributes</a></p>`,
            `    <p><a href="./ImageClient.html">Image</a></p>`,
            `    <p><a href="./FilteredImageClient.html">Filtered Image</a></p>`,
            `    <p><a href="./FilteredTOFHistogramClient.html">Filtered TOF Histogram</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
}).listen(80)
