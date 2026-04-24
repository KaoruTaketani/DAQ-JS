import { join } from 'path'
import { ok } from 'assert'
import axes from '../lib/axes.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import xlabel from '../lib/xlabel.js'
import line from '../lib/line.js'
import colon from '../lib/colon.js'
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
            if (this._url.pathname !== '/neutronRate') return

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
            if (fileNames.length > 2) {
                response.writeHead(400)
                response.end()
                return
            }

            if (fileNames.length === 1) {
                const startTime = Date.now()
                let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");
                /** @type {import('h5wasm').Dataset|null} */
                const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('neutronRate'))
                ok(dataset)
                /** @type {Float64Array} */
                const y = /** @type {Float64Array} */(dataset.value)
                const x = colon(1, y.length)

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
                    line(ax, x, y)
                ].join(''))
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
            } else {
                // two files
                const startTime = Date.now()
                let f0 = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r")
                let f1 = new h5wasm.File(join(this._hdf5Path, path, fileNames[1]), "r")
                /** @type {import('h5wasm').Dataset|null} */
                const dataset0 = /** @type {import('h5wasm').Dataset|null} */(f0.get('neutronRate'))
                ok(dataset0)
                /** @type {import('h5wasm').Dataset|null} */
                const dataset1 = /** @type {import('h5wasm').Dataset|null} */(f1.get('neutronRate'))
                ok(dataset1)
                /** @type {Float64Array} */
                const y0 = /** @type {Float64Array} */(dataset0.value)
                /** @type {Float64Array} */
                const y1 = /** @type {Float64Array} */(dataset1.value)
                ok(y0.length === y1.length)
                const x = colon(1, y0.length)

                const xLimValues = this._url.searchParams.getAll('xLim')
                const yLimValues = this._url.searchParams.getAll('yLim')
                const xLim = xLimValues.length === 2
                    ? xLimValues.map(v => parseFloat(v))
                    : [0, y0.length]
                const yLim = yLimValues.length === 2
                    ? yLimValues.map(v => parseFloat(v))
                    : [0, Math.max(max(y0), max(y1))]
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
                    line(ax, x, y0),
                    // line(ax, x, y1, { lineStyle: '--' })
                    line(ax, x, y1, { color: 'red' })
                ].join(''))
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
            }
        }
    }
}
