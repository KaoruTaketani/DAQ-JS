import { ok } from 'assert';
import h5wasm from "h5wasm/node";
import { join } from 'path';
import linspace from '../lib/linspace.js';
import Operator from './Operator.js';
await h5wasm.ready;

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
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
            if (this._url.pathname !== '/waveform') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const key = this._url.searchParams.get('key')
            if (!key) {
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

            // use mode "r" for reading.  All modes can be found in h5wasm.ACCESS_MODES
            let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r")

            /** @type {import('h5wasm').Dataset|null} */
            const dataset =/** @type {import('h5wasm').Dataset|null} */ (f.get(`${key}BinCounts`))
            if (!dataset) {
                response.writeHead(404)
                response.end()
                f.close()
                return
            }
            const y = Array.from(/** @type {Float64Array} */(dataset.value))
            let xlabel
            let attrKey = ''
            if (key === 'horizontalProjection') {
                attrKey = key + 'BinLimitsInMillimeters'
                xlabel = 'coordinate (mm)'
            }
            if (key === 'pulseHeightHistogram') {
                attrKey = key + 'BinLimits'
                xlabel = 'pulse height'
            }
            if (key === 'tofHistogram') {
                attrKey = key + 'BinLimitsInNanoseconds'
                xlabel = 'tof (ns)'
            }
            if (key === 'tofDifferenceHistogram') {
                attrKey = key + 'BinLimitsInNanoseconds'
                xlabel = 'tof (ns)'
            }
            if (key === 'verticalProjection') {
                attrKey = key + 'BinLimitsInMillimeters'
                xlabel = 'coordinate (mm)'
            }
            if (attrKey === '') {
                response.writeHead(404)
                response.end()
                f.close()
                return
            }
            const lims = /** @type {number[]} */(f.attrs[attrKey].value)
            if (lims.length !== 2) {
                response.writeHead(404)
                response.end()
                f.close()
                return
            }
            const x = linspace(lims[0], lims[1], y.length + 1)
            f.close()

            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            response.end(JSON.stringify({
                x: x,
                y: y,
                xlabel: xlabel
            }))

        }
    }
}

