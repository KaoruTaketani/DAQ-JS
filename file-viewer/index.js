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
import CentersByVelocityHandler from './CentersByVelocityHandler.js'
import CentersByEnergyHandler from './CentersByEnergyHandler.js'
import CentersByWavelengthHandler from './CentersByWavelengthHandler.js'

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
new CentersByVelocityHandler(variables)
new CentersByEnergyHandler(variables)
new CentersByWavelengthHandler(variables)



const httpServer = new Server()
const responses = new Map()
variables.responses.assign(responses)
variables.edrPath.assign('../../edr')
variables.hdf5Path.assign('../../hdf5')

const pngPathnames = new Map()
pngPathnames.set('/FilteredImageClient.html', '/filteredImage')
pngPathnames.set('/HorizontalProjectionHistogramsClient.html', '/horizontalProjectionHistograms')
pngPathnames.set('/RawImageClient.html', '/rawImage')

const svgPathnames = new Map()
svgPathnames.set('/CentersClient.html', '/centers')
svgPathnames.set('/CentersByEnergyClient.html', '/centersByEnergy')
svgPathnames.set('/CentersByVelocityClient.html', '/centersByVelocity')
svgPathnames.set('/CentersByWavelengthClient.html', '/centersByWavelength')
svgPathnames.set('/ContrastClient.html', '/contrast')
svgPathnames.set('/HeightsClient.html', '/heights')
svgPathnames.set('/HorizontalProjectionClient.html', '/horizontalProjection')
svgPathnames.set('/HorizontalProjectionMeansClient.html', '/horizontalProjectionMeans')
svgPathnames.set('/HorizontalProjectionStandardDeviationsClient.html', '/horizontalProjectionStandardDeviations')
svgPathnames.set('/NeutronRateClient.html', '/neutronRate')
svgPathnames.set('/PhaseClient.html', '/phase')
svgPathnames.set('/PulseHeightHistogramClient.html', '/pulseHeightHistogram')
svgPathnames.set('/TOFDifferenceHistogramClient.html', '/tofDifferenceHistogram')
svgPathnames.set('/TOFHistogramClient.html', '/tofHistogram')
svgPathnames.set('/VerticalProjectionClient.html', '/verticalProjection')
svgPathnames.set('/WidthsClient.html', '/widths')

const tablePathnames = new Map()
tablePathnames.set('/TimerClient.html', '/timer')
tablePathnames.set('/KickerClient.html', '/kicker')


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

        if (pngPathnames.has(url.pathname)) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script>`,
                `        window.pathname="${pngPathnames.get(url.pathname)}"`,
                `    </script>`,
                `    <script type="module" src="./FigureClientPNG.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (svgPathnames.has(url.pathname)) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script>`,
                `        window.pathname="${svgPathnames.get(url.pathname)}"`,
                `    </script>`,
                `    <script type="module" src="./FigureClientSVG.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }

        if (url.pathname === 'AttributesClient.html') {
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

        if (tablePathnames.has(url.pathname)) {
            response.writeHead(200, { 'Content-Type': 'text/html' })
            response.end([
                '<html>',
                '<head>',
                '    <meta charset="utf-8">',
                '</head>',
                '<body>',
                `    <script>`,
                `        window.pathname="${tablePathnames.get(url.pathname)}"`,
                `    </script>`,
                `    <script type="module" src="./TableClient.js">`,
                `    </script>`,
                '</body>',
                '</html>'
            ].join('\n'))
            return
        }
        response.writeHead(404)
        response.end()
        return
    }
    responses.set(url, response)
    // variables.response.assign(response)
    variables.url.assign(url)
}).listen(80)
