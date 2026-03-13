import { closeSync, openSync, readdir, readFile, readSync, statSync } from 'fs'
import { Server } from 'http'
import { basename, join } from 'path'
import Variables from './Variables.js'
import FilesRequestHandler from './FilesRequestHandler.js'
import EDRNumEventsRequestHandler from './EDRNumEventsRequestHandler.js'

const variables = new Variables()
new FilesRequestHandler(variables)
new EDRNumEventsRequestHandler(variables)

const httpServer = new Server()
const edrPath = '../../edr'
variables.edrPath.assign(edrPath)

httpServer.on('request', (request, response) => {
    console.log(`GET url: ${request.url}`)
    const url = new URL(`http://localhost${request.url}`)
    variables.response.assign(response)
    variables.url.assign(new URL(`http://localhost${request.url}`))

    if (url.pathname.endsWith('.edr')) {
        console.log(`pathname: ${url.pathname}, type: ${url.searchParams.get('type')}, offset: ${url.searchParams.get('offset')}`)
        if (url.searchParams.get('type') === 'channel') {
            const offsetValue = url.searchParams.get('offset')
            if (!offsetValue) return
            const offset = parseInt(offsetValue)

            const fd = openSync(join(edrPath, url.pathname), 'r')
            const chunk = new Uint8Array(8 * 25)
            readSync(fd, chunk, 0, 8 * 25, 8 * offset)
            closeSync(fd)

            // createReadStream(join(edrPath, url.pathname), { start: 8 * offset, end: 8 * offset + 25 * 8, highWaterMark: 25 * 8 })
            //     .on('data', chunk => {
            const channelEvents = new Array(25)
            for (let i = 0; i < chunk.length / 8; ++i) {
                if (chunk[8 * i] === 0x5a) {
                    const
                        byte1 = chunk[8 * i + 1],
                        byte2 = chunk[8 * i + 2],
                        byte3 = chunk[8 * i + 3],
                        byte4 = chunk[8 * i + 4],
                        byte5 = chunk[8 * i + 5],
                        byte6 = chunk[8 * i + 6],
                        byte7 = chunk[8 * i + 7],
                        tof = ((byte1 << 16) + (byte2 << 8) + byte3) * 25, /** time bin is 25 nsec */
                        channel = byte4 & 0b111,
                        module = byte4 >> 3,
                        left = (byte5 << 4) + (byte6 >> 4),
                        right = ((byte6 & 0b1111) << 8) + byte7

                    channelEvents[i] = {
                        header: `0x5a`,
                        channel: channel,
                        module: module,
                        tofInNanoseconds: tof,
                        left: left,
                        right: right
                    }
                } else if (chunk[8 * i] === 0x5b) {
                    channelEvents[i] = {
                        header: `0x5b`,
                        channel: Number.NaN,
                        module: Number.NaN,
                        tofInNanoseconds: Number.NaN,
                        left: Number.NaN,
                        right: Number.NaN
                    }
                } else if (chunk[8 * i] === 0x5c) {
                    channelEvents[i] = {
                        header: `0x5c`,
                        channel: Number.NaN,
                        module: Number.NaN,
                        tofInNanoseconds: Number.NaN,
                        left: Number.NaN,
                        right: Number.NaN
                    }
                } else {
                    // unexpected
                }
            }
            // necessary to make paired/neutron events from channel events
            // this.variables.neutronPositionBitLength.assign(10)
            // this.variables.tofMaxInMilliseconds.assign(80)
            // this.variables.tofDifferenceMaxInNanoseconds.assign(250)
            // this.variables.tofDifferenceMinInNanoseconds.assign(-250)
            //
            // pulseHeight: left + right,
            // coordinateInPixels: ((left << 8) / (left + right)) >> 0
            //
            // if (this._channelEvent.channel === 0) this._channel0Event = this._channelEvent
            // if (this._channelEvent.channel === 1) this._channel1Event = this._channelEvent

            // if (!this._channel0Event) return
            // if (!this._channel1Event) return

            // variables.pairedEvent.assign({
            //     xCoordinateInPixels: this._channel0Event.coordinateInPixels,
            //     xPulseHeight: this._channel0Event.pulseHeight,
            //     xTOFInNanoseconds: this._channel0Event.tofInNanoseconds,
            //     yCoordinateInPixels: this._channel1Event.coordinateInPixels,
            //     yPulseHeight: this._channel1Event.pulseHeight,
            //     yTOFInNanoseconds: this._channel1Event.tofInNanoseconds
            // })

            // const dt = this._pairedEvent.xTOFInNanoseconds - this._pairedEvent.yTOFInNanoseconds
            // if (dt > this._tofDifferenceMaxInNanoseconds) return
            // if (dt < this._tofDifferenceMinInNanoseconds) return

            // const tof = (this._pairedEvent.xTOFInNanoseconds + this._pairedEvent.yTOFInNanoseconds) >> 1
            // if (tof > this._tofMaxInMilliseconds * 1_000_000) return

            // variables.neutronEvent.assign({
            //     tofInNanoseconds: tof,
            //     xCoordinateInPixels: this._pairedEvent.xCoordinateInPixels,
            //     yCoordinateInPixels: this._pairedEvent.yCoordinateInPixels,
            //     // channelEvent.pulse is 12bit, pairedEvent.pulse is sum of them.
            //     // to match the pulseHieghtHistogram's 10bit bints, divide here 2^4=16
            //     pulseheight: (this._pairedEvent.xPulseHeight + this._pairedEvent.yPulseHeight) / 16
            // })

            response.end([
                '<thead>',
                '<tr>',
                Object.keys(channelEvents[0]).map(key => `<th>${key}</th>`).join(''),
                '</tr>',
                '</thead>',
                '<tbody align="right">',
                channelEvents.map(obj => ['<tr>',
                    Object.keys(obj).map(key => {
                        /** @type {any} */
                        const tmp = obj
                        return `<td>${tmp[key].toLocaleString()}</td>`
                    }).join(''),
                    '</tr>'].join('')
                ).join(''),
                '</tbody>'
            ].join(''))

            // }).on('end', () => {
            //     console.log('end')
            // })
            return
        }
    }
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
            `    <script type="module" src="./${basename(request.url, '.html')}.js">`,
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
            `    <p><a href="./ChannelEventTableClient.html">Channel</a></p>`,
            `    <p><a href="./PairedEventTableClient.html">Paired</a></p>`,
            `    <p><a href="./NeutronEventTableClient.html">Neutron</a></p>`,
            '</body>',
            '</html>'
        ].join('\n'))
        return
    }
}).listen(80)
