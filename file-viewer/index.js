import { readFile } from 'fs'
import { Server } from 'http'
import AttributesHandler from './AttributesHandler.js'
import CentersByEnergyHandler from './CentersByEnergyHandler.js'
import CentersByVelocityHandler from './CentersByVelocityHandler.js'
import CentersByWavelengthHandler from './CentersByWavelengthHandler.js'
import CentersHandler from './CentersHandler.js'
import ChannelHandler from './ChannelHandler.js'
import ContrastHandler from './ContrastHandler.js'
import FilesHandler from './FilesHandler.js'
import FilteredImageHandler from './FilteredImageHandler.js'
import HeightsHandler from './HeightsHandler.js'
import HorizontalProjectionHandler from './HorizontalProjectionHandler.js'
import HorizontalProjectionHistogramsHandler from './HorizontalProjectionHistogramsHandler.js'
import HorizontalProjectionMeansHandler from './HorizontalProjectionMeansHandler.js'
import HorizontalProjectionStandardDeviationsHandler from './HorizontalProjectionStandardDeviationsHandler.js'
import KickerHandler from './KickerHandler.js'
import NeutronRateHandler from './NeutronRateHandler.js'
import NumEventsHandler from './NumEventsHandler.js'
import PhaseHandler from './PhaseHandler.js'
import PulseHeightHistogramHandler from './PulseHeightHistogramHandler.js'
import RawImageHandler from './RawImageHandler.js'
import RootHandler from './RootHandler.js'
import TOFDifferenceHistogramHandler from './TOFDifferenceHistogramHandler.js'
import TOFHistogramHandler from './TOFHistogramHandler.js'
import TimerHandler from './TimerHandler.js'
import Variables from './Variables.js'
import VerticalProjectionHandler from './VerticalProjectionHandler.js'
import WidthsHandler from './WidthsHandler.js'
import PairedHandler from './PairedHandler.js'
import NeutronHandler from './NeutronHandler.js'

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
new PairedHandler(variables)
new NeutronHandler(variables)

const httpServer = new Server()
const responses = new Map()
variables.responses.assign(responses)
variables.edrPath.assign('../../edr')
variables.hdf5Path.assign('../../hdf5')

const pngPathnames = new Map()
pngPathnames.set('/FilteredImage.html', '/filteredImage')
pngPathnames.set('/HorizontalProjectionHistograms.html', '/horizontalProjectionHistograms')
pngPathnames.set('/RawImage.html', '/rawImage')

const svgPathnames = new Map()
svgPathnames.set('/Centers.html', '/centers')
svgPathnames.set('/CentersByEnergy.html', '/centersByEnergy')
svgPathnames.set('/CentersByVelocity.html', '/centersByVelocity')
svgPathnames.set('/CentersByWavelength.html', '/centersByWavelength')
svgPathnames.set('/Contrast.html', '/contrast')
svgPathnames.set('/Heights.html', '/heights')
svgPathnames.set('/HorizontalProjection.html', '/horizontalProjection')
svgPathnames.set('/HorizontalProjectionMeans.html', '/horizontalProjectionMeans')
svgPathnames.set('/HorizontalProjectionStandardDeviations.html', '/horizontalProjectionStandardDeviations')
svgPathnames.set('/NeutronRate.html', '/neutronRate')
svgPathnames.set('/Phase.html', '/phase')
svgPathnames.set('/PulseHeightHistogram.html', '/pulseHeightHistogram')
svgPathnames.set('/TOFDifferenceHistogram.html', '/tofDifferenceHistogram')
svgPathnames.set('/TOFHistogram.html', '/tofHistogram')
svgPathnames.set('/VerticalProjection.html', '/verticalProjection')
svgPathnames.set('/Widths.html', '/widths')

const tablePathnames = new Map()
tablePathnames.set('/Timer.html', '/timer')
tablePathnames.set('/Kicker.html', '/kicker')
tablePathnames.set('/Channel.html', '/channel')
tablePathnames.set('/Paired.html', '/paired')
tablePathnames.set('/Neutron.html', '/neutron')

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
                `    <script type="module" src="./TableClientEDR.js">`,
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
