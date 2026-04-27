import { join } from 'path'
import { ok } from 'assert'
import axes from '../lib/axes.js'
import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import h5wasm from "h5wasm/node"
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
            if (this._url.pathname !== '/rawImage') return

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

            if (this._url.searchParams.get('type') === 'png') {
                let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");
                /** @type {import('h5wasm').Dataset|null} */
                const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('rawImageBinCounts'))
                if (!dataset) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                // console.log(filteredImage.shape)
                // console.log(filteredImage.value)
                const startTime = Date.now()
                /** @type {import('../lib/index.js').Uint32NDArray} */
                const hist = {
                    shape: /** @type {number[]} */(dataset.shape),
                    data: /** @type {Uint32Array} */ (dataset.value)
                }
                imwrite(imagesc(hist)).then(buffer => {
                    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                    response.writeHead(200, { 'Content-Type': 'application/base64' })
                    response.end(`data:image/png;base64,${buffer.toString('base64')}`)
                })
                return
            }
            if (this._url.searchParams.get('type') === 'svg') {
                let f = new h5wasm.File(join(this._hdf5Path, path, fileNames[0]), "r");

                /** @type {import('h5wasm').Dataset|null} */
                const dataset = /** @type {import('h5wasm').Dataset|null} */(f.get('rawImageBinCounts'))
                if (!dataset) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                /** @type {number[]} */
                const xLim = this._url.searchParams.getAll('xLim').map(v => parseFloat(v))
                if (xLim.length === 0) {
                    const v =/** @type {Float64Array} */(f.attrs['rawImageXBinLimitsInMillimeters'].value)
                    ok(v)
                    xLim.push(v[0])
                    xLim.push(v[1])
                }
                /** @type {number[]} */
                const yLim = this._url.searchParams.getAll('yLim').map(v => parseFloat(v))
                if (yLim.length === 0) {
                    const v =/** @type {Float64Array} */(f.attrs['rawImageYBinLimitsInMillimeters'].value)
                    ok(v)
                    yLim.push(v[0])
                    yLim.push(v[1])
                }
                const ax = {
                    xLim: xLim,
                    yLim: yLim,
                    xTick: xLim,
                    yTick: yLim,
                    xTickLabel: xLim.map(x => x.toFixed()),
                    yTickLabel: yLim.map(y => y.toFixed())
                }
                response.writeHead(200, { 'Content-Type': 'image/svg+xml' })
                response.end([
                    axes(ax),
                    xlabel(ax, 'width (mm)'),
                    ylabel(ax, 'height (mm)')
                ].join(''))
                // console.log(`elapsedTime: ${Date.now() - startTime}ms`)
            }
        }
    }
}
