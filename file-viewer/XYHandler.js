import { ok } from 'assert';
import h5wasm from "h5wasm/node";
import { join } from 'path';
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
            if (this._url.pathname !== '/xy') return

            const response = this._responses.get(this._url)
            ok(response)
            this._responses.delete(this._url)
            const path = this._url.searchParams.get('path')
            if (!path) {
                response.writeHead(400)
                response.end()
                return
            }
            const xkey = this._url.searchParams.get('xkey')
            if (!xkey) {
                response.writeHead(400)
                response.end()
                return
            }
            const ykey = this._url.searchParams.get('ykey')
            if (!ykey) {
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
            const datasetY =/** @type {import('h5wasm').Dataset|null} */ (f.get(ykey))
            if (!datasetY) {
                response.writeHead(404)
                response.end()
                f.close()
                return
            }
            const datasetX =/** @type {import('h5wasm').Dataset|null} */ (f.get(xkey))
            if (!datasetX) {
                response.writeHead(404)
                response.end()
                f.close()
                return
            }
            const y = Array.from(/** @type {Float64Array} */(datasetY.value))
            const x = Array.from(/** @type {Float64Array} */(datasetX.value))

            response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
            response.end(JSON.stringify({
                x: x,
                y: y
            }))
            f.close()
        }
    }
}

