import { readFile } from 'fs'
import { Server } from 'http'
import { basename } from 'path'
import AttributesHandler from './AttributesHandler.js'
import ChannelHandler from './ChannelHandler.js'
import FilesHandler from './FilesHandler.js'
import NumEventsHandler from './NumEventsHandler.js'
import Variables from './Variables.js'
import FilteredImageHandler from './FilteredImageHandler.js'
import TOFHistogramHandler from './TOFHistogramHandler.js'
import TimerHandler from './TimerHandler.js'
import KickerHandler from './KickerHandler.js'
import RawImageHandler from './RawImageHandler.js'
import RootHandler from './RootHandler.js'
import CentersHandler from './CentersHandler.js'
import ContrastHandler from './ContrastHandler.js'
import HeightsHandler from './HeightsHandler.js'
import HorizontalProjectionHandler from './HorizontalProjectionHandler.js'
import HorizontalProjectionHistogramsHandler from './HorizontalProjectionHistogramsHandler.js'
import HorizontalProjectionMeansHandler from './HorizontalProjectionMeansHandler.js'
import HorizontalProjectionStandardDeviationsHandler from './HorizontalProjectionStandardDeviationsHandler.js'
import NeutronRateHandler from './NeutronRateHandler.js'
import PhaseHandler from './PhaseHandler.js'
import PulseHeightHistogramHandler from './PulseHeightHistogramHandler.js'
import TOFDifferenceHistogramHandler from './TOFDifferenceHistogramHandler.js'
import VerticalProjectionHandler from './VerticalProjectionHandler.js'
import WidthsHandler from './WidthsHandler.js'

const variables = new Variables()
new FilesHandler(variables)
new ChannelHandler(variables)
new TimerHandler(variables)
new KickerHandler(variables)
new NumEventsHandler(variables)
new AttributesHandler(variables)
new FilteredImageHandler(variables)
new TOFHistogramHandler(variables)
new RawImageHandler(variables)
new RootHandler(variables)
new CentersHandler(variables)
new ContrastHandler(variables)
new HeightsHandler(variables)
new HorizontalProjectionHandler(variables)
new HorizontalProjectionHistogramsHandler(variables)
new HorizontalProjectionMeansHandler(variables)
new HorizontalProjectionStandardDeviationsHandler(variables)
new NeutronRateHandler(variables)
new PhaseHandler(variables)
new PulseHeightHistogramHandler(variables)
new TOFDifferenceHistogramHandler(variables)
new VerticalProjectionHandler(variables)
new WidthsHandler(variables)



const httpServer = new Server()
const responses = new Map()
variables.responses.assign(responses)
variables.edrPath.assign('../../edr')
variables.hdf5Path.assign('../../hdf5')

httpServer.on('request', (request, response) => {
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)

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
    responses.set(url, response)
    // variables.response.assign(response)
    variables.url.assign(url)
}).listen(80)
