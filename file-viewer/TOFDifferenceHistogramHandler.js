import { ok } from 'assert'
import { join } from 'path'
import axes from '../lib/axes.js'
import colon from '../lib/colon.js'
import linspace from '../lib/linspace.js'
import max from '../lib/max.js'
import stairs from '../lib/stairs.js'
import xlabel from '../lib/xlabel.js'
import h5wasm from "h5wasm/node"
await h5wasm.ready;

export default class {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
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
            if (this._url.pathname !== '/tofDifferenceHistogram') return

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
            if (fileNames.length!==1) {
                response.writeHead(400)
                response.end()
                return
            }

            let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");
            /** @type {import('h5wasm').Dataset|null} */
            const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('tofDifferenceHistogramBinCounts'))
            if (!dataset) {
                response.writeHead(404)
                response.end()
                return
            }
            // console.log(filteredTOFHistogram.shape)
            // console.log(filteredTOFHistogram.value)
            const startTime = Date.now()
            /** @type {Uint32Array} */
            const y = /** @type {Uint32Array} */(dataset.value)
            const x = colon(0, y.length)
            const yMax = max(y)
            const xTick = linspace(0, y.length, 8 + 1)
            const ax = {
                xLim: [0, y.length],
                yLim: [0, yMax],
                xTick: xTick,
                yTick: [0, yMax],
                xTickLabel: xTick.map(x => x.toFixed()),
                yTickLabel: ['0', `${yMax.toFixed()}`]
            }
            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            // console.log(colon(1, yData.length))
            // console.log(yData)
            response.end([
                axes(ax),
                xlabel(ax, 'tof (ch)'),
                stairs(ax, x, y)
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
