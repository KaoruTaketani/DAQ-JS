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
            if (!this._url.pathname.endsWith('.edr')) return
            if (this._url.searchParams.get('type') !== 'timer') return

            const offsetValue = this._url.searchParams.get('offset')
            if (!offsetValue) return
            const offset = parseInt(offsetValue)

            const fd = openSync(join(this._edrPath, this._url.pathname), 'r')
            const chunk = new Uint8Array(8 * 25)
            readSync(fd, chunk, 0, 8 * 25, 8 * offset)
            closeSync(fd)

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

            this._response.end([
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
    }
}
