import { ok } from 'assert'
import { join } from 'path'
import axes from '../lib/axes.js'
import linspace from '../lib/linspace.js'
import max from '../lib/max.js'
import scatter from '../lib/scatter.js'
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
            if (this._url.pathname !== '/centersByWavelength') return

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
            let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");
            /** @type {import('h5wasm').Dataset} */
            const centers = /** @type {import('h5wasm').Dataset} */(f.get('centers'))
            if (!centers) {
                response.writeHead(404)
                response.end()
                return
            }
            /** @type {import('h5wasm').Dataset|null} */
            const velocity =/** @type {import('h5wasm').Dataset|null} */ (f.get('wavelengthInAngstroms'))
            if (!velocity) {
                response.writeHead(404)
                response.end()
                return
            }
            /** @type {Float64Array} */
            const x = /** @type {Float64Array} */(velocity.value)
            /** @type {Float64Array} */
            const y = /** @type {Float64Array} */(centers.value)

            const startTime = Date.now()
            const xLimValues = this._url.searchParams.getAll('xLim')
            const yLimValues = this._url.searchParams.getAll('yLim')
            const xLim = xLimValues.length === 2
                ? xLimValues.map(v => parseFloat(v))
                : [0, x[x.length-1]]// x[x.length-1]) is the maximum  wavelengthenergy
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
                xlabel(ax, 'neutron wavelength (Angstroms)'),
                scatter(ax, x, y)
            ].join(''))
            console.log(`elapsedTime: ${Date.now() - startTime}ms`)
        }
    }
}
