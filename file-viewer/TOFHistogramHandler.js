import { join } from 'path'
import { ok } from 'assert'
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
            if (this._url.pathname !== '/tofHistogram') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) {
                response.writeHead(400)
                response.end()
                return
            }

            let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r");
            const filteredTOFHistogram = f.get('tofHistogram')
            if (!filteredTOFHistogram) {
                response.writeHead(404)
                response.end()
                return
            }
            // console.log(filteredTOFHistogram.shape)
            // console.log(filteredTOFHistogram.value)
            const startTime = Date.now()
            const binCounts = filteredTOFHistogram.value
            const yMax = max(binCounts)
            const edges = linspace(0, binCounts.length, 8 + 1)
            const ax = {
                xLim: [0, binCounts.length],
                yLim: [0, yMax],
                xTick: edges,
                yTick: [0, yMax],
                xTickLabel: edges.map(x => x.toFixed()),
                yTickLabel: ['0', `${yMax}`]
            }
            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            response.end([
                axes(ax),
                xlabel(ax, 'tof (ch)'),
                stairs(ax, { binLimits: [0, binCounts.length], binCounts: binCounts })
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
