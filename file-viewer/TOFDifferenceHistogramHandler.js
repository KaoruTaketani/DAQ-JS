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
            if (fileNames.length !== 1) {
                response.writeHead(400)
                response.end()
                return
            }

            const startTime = Date.now()
            let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");
            /** @type {import('h5wasm').Dataset|null} */
            const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('tofDifferenceHistogramBinCounts'))
            ok(dataset)
            /** @type {Uint32Array} */
            const y = /** @type {Uint32Array} */(dataset.value)
            const x = colon(0, y.length)

            const xLimValues = this._url.searchParams.getAll('xLim')
            const yLimValues = this._url.searchParams.getAll('yLim')
            const xLim = xLimValues.length === 2
                ? xLimValues.map(v => parseFloat(v))
                : [0, y.length]
            const yLim = yLimValues.length === 2
                ? yLimValues.map(v => parseFloat(v))
                : [0, max(y)]
            const xTick = linspace(xLim[0], xLim[1], 8 + 1)
            const ax = {
                xLim: xLim,
                yLim: yLim,
                xTick: xTick,
                yTick: yLim,
                xTickLabel: xTick.map(x => x.toFixed()),
                yTickLabel: yLim.map(y => y.toString())
            }
            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            response.end([
                axes(ax),
                xlabel(ax, 'tof (ch)'),
                stairs(ax, x, y)
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
