import { ok } from 'assert'
import h5wasm from "h5wasm/node"
import { join } from 'path'
import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'
await h5wasm.ready;

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
            if (this._url.pathname !== '/filteredImage') return

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
            /** @type {import('h5wasm').Dataset|null} */
            const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('filteredImageBinCounts'))
            if (!dataset) {
                response.writeHead(404)
                response.end()
                return
            }

            const startTime = Date.now()
            /** @type {import('../lib/index.js').Uint32NDArray} */
            const hist = {
                shape:/** @type {number[]} */ (dataset.shape),
                data:/** @type {Uint32Array} */ (dataset.value)
            }
            imwrite(imagesc(hist)).then(buffer => {
                console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                response.writeHead(200, { 'Content-Type': 'application/base64' })
                response.end(JSON.stringify({
                    xLimInMillimeters: f.attrs['filteredImageXBinLimitsInMillimeters'].value,
                    yLimInMillimeters: f.attrs['filteredImageYBinLimitsInMillimeters'].value,
                    imageSrc: `data:image/png;base64,${buffer.toString('base64')}`
                }))
            })
        }
    }
}
