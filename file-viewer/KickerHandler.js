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
            if (this._url.pathname !== '/kicker') return

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
