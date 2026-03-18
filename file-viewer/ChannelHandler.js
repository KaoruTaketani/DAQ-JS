import { openSync, closeSync, readSync } from 'fs'
import { join } from 'path'

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {import('http').ServerResponse} */
        this._response
        variables.response.prependListener(arg => { this._response = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (this._url.pathname !== '/channel') return

            const path = this._url.searchParams.get('path')
            if (!path) return
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) return
            const offsetValue = this._url.searchParams.get('offset')
            if (!offsetValue) return
            const offset = parseInt(offsetValue)

            const fd = openSync(join(this._edrPath, path, fileName), 'r')
            const chunk = new Uint8Array(8 * 25)
            readSync(fd, chunk, 0, 8 * 25, 8 * offset)
            closeSync(fd)

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

            this._response.end([
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
        }
    }
}
