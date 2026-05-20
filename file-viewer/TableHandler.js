import { openSync, closeSync, readSync } from 'fs'
import { join } from 'path'
import { ok } from 'assert'
import isbetween from '../lib/isbetween.js'

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {Map<URL,import('http').ServerResponse>} */
        this._responses
        variables.responses.prependListener(arg => { this._responses = arg })
        /** @type {URL} */
        this._url
        variables.url.addListener(arg => {
            this._url = arg
            this._operation()
        })
        this._operation = () => {
            if (this._url.pathname !== '/table') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            /** @type {string[]} */
            const fileNames = this._url.searchParams.getAll('fileName')
            if (fileNames.length !== 1) {
                response.writeHead(400)
                response.end()
                return
            }
            const offsetValue = this._url.searchParams.get('offset')
            if (!offsetValue) {
                response.writeHead(400)
                response.end()
                return
            }
            const offset = parseInt(offsetValue)
            const header = this._url.searchParams.get('header')
            if (!header) {
                response.writeHead(400)
                response.end()
                return
            }

            const fd = openSync(join(this._edrPath, path, fileNames[0]), 'r')
            const chunk = new Uint8Array(8 * 25)
            readSync(fd, chunk, 0, 8 * 25, 8 * offset)
            closeSync(fd)

            if (header === '0x5a') {
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
                return
            }
            if (header === '0x5b') {
                const timerEvents = new Array(25)
                for (let i = 0; i < chunk.length / 8; ++i) {
                    if (chunk[8 * i] === 0x5a) {
                        timerEvents[i] = {
                            header: `0x5a`,
                            crate: Number.NaN,
                            module: Number.NaN,
                            kickerId: Number.NaN
                        }
                    } else if (chunk[8 * i] === 0x5b) {
                        const
                            byte1 = chunk[8 * i + 1],
                            byte2 = chunk[8 * i + 2],
                            byte3 = chunk[8 * i + 3],
                            byte4 = chunk[8 * i + 4],
                            byte5 = chunk[8 * i + 5],
                            byte6 = chunk[8 * i + 6],
                            byte7 = chunk[8 * i + 7],
                            kickerId = (byte3 << 32) + (byte4 << 24) + (byte5 << 16) + (byte6 << 8) + byte7
                        timerEvents[i] = {
                            header: `0x5b`,
                            crate: byte1,
                            module: byte2,
                            kickerId: kickerId
                        }
                    } else if (chunk[8 * i] === 0x5c) {
                        timerEvents[i] = {
                            header: `0x5c`,
                            crate: Number.NaN,
                            module: Number.NaN,
                            kickerId: Number.NaN
                        }
                    } else {
                        // unexpected
                    }
                }

                response.end([
                    '<thead>',
                    '<tr>',
                    Object.keys(timerEvents[0]).map(key => `<th>${key}</th>`).join(''),
                    '</tr>',
                    '</thead>',
                    '<tbody align="right">',
                    timerEvents.map(obj => ['<tr>',
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
            if (header === '0x5c') {
                const timerEvents = new Array(25)
                for (let i = 0; i < chunk.length / 8; ++i) {
                    if (chunk[8 * i] === 0x5a) {
                        timerEvents[i] = {
                            header: `0x5a`,
                            mlfTimeInSeconds: Number.NaN,
                            subsecond: Number.NaN,
                            microsecond: Number.NaN
                        }
                    } else if (chunk[8 * i] === 0x5b) {
                        timerEvents[i] = {
                            header: `0x5b`,
                            mlfTimeInSeconds: Number.NaN,
                            subsecond: Number.NaN,
                            microsecond: Number.NaN
                        }
                    } else if (chunk[8 * i] === 0x5c) {
                        const
                            byte1 = chunk[8 * i + 1],
                            byte2 = chunk[8 * i + 2],
                            byte3 = chunk[8 * i + 3],
                            byte4 = chunk[8 * i + 4],
                            byte5 = chunk[8 * i + 5],
                            byte6 = chunk[8 * i + 6],
                            byte7 = chunk[8 * i + 7],
                            mlfTime = (byte1 << 22) + (byte2 << 14) + (byte3 << 6) + (byte4 >> 2),
                            subsecond = ((byte4 & 0b11) << 13) + (byte5 << 5) + (byte6 >> 3),
                            microsecond = ((byte6 & 0b111) << 8) + byte7
                        timerEvents[i] = {
                            header: `0x5c`,
                            mlfTimeInSeconds: mlfTime,
                            subsecond: subsecond,
                            microsecond: microsecond
                        }
                    } else {
                        // unexpected
                    }
                }

                response.end([
                    '<thead>',
                    '<tr>',
                    Object.keys(timerEvents[0]).map(key => `<th>${key}</th>`).join(''),
                    '</tr>',
                    '</thead>',
                    '<tbody align="right">',
                    timerEvents.map(obj => ['<tr>',
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
            if (header === '0x5a:pair') {
                const pariedlEvents = []
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
                            // module = byte4 >> 3,
                            left = (byte5 << 4) + (byte6 >> 4),
                            right = ((byte6 & 0b1111) << 8) + byte7

                        if (channel === 0) this._channel0 = {
                            tofInNanoseconds: tof,
                            left: left,
                            right: right
                        }
                        if (channel === 1) this._channel1 = {
                            tofInNanoseconds: tof,
                            left: left,
                            right: right
                        }
                        if (this._channel0 && this._channel1) {
                            pariedlEvents.push({
                                tofInNanosecondsX: this._channel0.tofInNanoseconds,
                                leftX: this._channel0.left,
                                rightX: this._channel0.right,
                                tofInNanosecondsY: this._channel1.tofInNanoseconds,
                                leftY: this._channel1.left,
                                rightY: this._channel1.right
                            })
                        }
                    } else if (chunk[8 * i] === 0x5b) {
                        // do nothing
                    } else if (chunk[8 * i] === 0x5c) {
                        // do nothing
                    } else {
                        // unexpected
                    }
                }

                response.end([
                    '<thead>',
                    '<tr>',
                    Object.keys(pariedlEvents[0]).map(key => `<th>${key}</th>`).join(''),
                    '</tr>',
                    '</thead>',
                    '<tbody align="right">',
                    pariedlEvents.map(obj => ['<tr>',
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
            if (header === '0x5a:neutron') {
                const neutronEvents = []
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
                            // module = byte4 >> 3,
                            left = (byte5 << 4) + (byte6 >> 4),
                            right = ((byte6 & 0b1111) << 8) + byte7

                        if (channel === 0) this._channel0 = {
                            tofInNanoseconds: tof,
                            left: left,
                            right: right
                        }
                        if (channel === 1) this._channel1 = {
                            tofInNanoseconds: tof,
                            left: left,
                            right: right
                        }
                        if (this._channel0 && this._channel1) {
                            const dt = this._channel0.tofInNanoseconds - this._channel1.tofInNanoseconds

                            if (isbetween(dt, [-250, 250]))
                                neutronEvents.push({
                                    tofInNanoseconds: (this._channel0.tofInNanoseconds + this._channel1.tofInNanoseconds) >> 1,
                                    xInMillimeters: 50 * this._channel0.left / (this._channel0.left + this._channel0.right),
                                    yInMillimeters: 50 * this._channel1.left / (this._channel1.left + this._channel1.right),
                                })
                        }
                    } else if (chunk[8 * i] === 0x5b) {
                        // do nothing
                    } else if (chunk[8 * i] === 0x5c) {
                        // do nothing
                    } else {
                        // unexpected
                    }
                }

                response.end([
                    '<thead>',
                    '<tr>',
                    Object.keys(neutronEvents[0]).map(key => `<th>${key}</th>`).join(''),
                    '</tr>',
                    '</thead>',
                    '<tbody align="right">',
                    neutronEvents.map(obj => ['<tr>',
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
}
