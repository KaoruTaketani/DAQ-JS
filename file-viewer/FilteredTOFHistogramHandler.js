import { join } from 'path'
import axes from '../lib/axes.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import xlabel from '../lib/xlabel.js'
import stairs from '../lib/stairs.js'
// @ts-ignore
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
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
            if (this._url.pathname !== '/filteredTOFHistogram') return

            const path = this._url.searchParams.get('path')
            if (!path) return
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) return

            let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r");
            const filteredTOFHistogram = f.get('filteredTOFHistogram')
            if (!filteredTOFHistogram) {
                this._response.writeHead(404)
                this._response.end()
                return
            }
            // console.log(filteredTOFHistogram.shape)
            // console.log(filteredTOFHistogram.value)
            const startTime = Date.now()
            const binCounts = filteredTOFHistogram.value
            const yMax = max(binCounts)
            const xTick = linspace(0, binCounts.length, 8 + 1)
            const ax = {
                xLim: [0, binCounts.length],
                yLim: [0, yMax],
                xTick: xTick,
                yTick: [0, yMax],
                xTickLabel: xTick.map(x => x.toFixed()),
                yTickLabel: ['0', `${yMax}`]
            }
            this._response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            this._response.end([
                axes(ax),
                xlabel(ax, 'tof (ch)'),
                stairs(ax, { binLimits: [0, binCounts.length], binCounts: binCounts })
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
