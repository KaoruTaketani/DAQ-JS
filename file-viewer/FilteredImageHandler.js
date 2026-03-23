import { join } from 'path'
import { ok } from 'assert'
import axes from '../lib/axes.js'
import imagesc from '../lib/imagesc.js'
import imwrite from '../lib/imwrite.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
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
            const fileName = this._url.searchParams.get('fileName')
            if (!fileName) {
                response.writeHead(400)
                response.end()
                return
            }

            if (this._url.searchParams.get('type') === 'png') {
                let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r");
                const filteredImage = f.get('filteredImage')
                if (!filteredImage) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                // console.log(filteredImage.shape)
                // console.log(filteredImage.value)
                const startTime = Date.now()
                /** @type {import('../lib/index.js').Histogram2D} */
                const hist = {
                    numBins: filteredImage.shape,
                    binCounts: filteredImage.value,
                    xBinLimits: [],
                    yBinLimits: []
                }
                imwrite(imagesc(hist)).then(buffer => {
                    console.log(`elapsedTime: ${Date.now() - startTime}ms`)
                    response.writeHead(200, { 'Content-Type': 'application/base64' })
                    response.end(`data:image/png;base64,${buffer.toString('base64')}`)
                })
                return
            }
            if (this._url.searchParams.get('type') === 'svg') {
                let f = new h5wasm.File(join(this._hdf5Path, path, fileName), "r");
                const filteredImage = f.get('filteredImage')
                if (!filteredImage) {
                    response.writeHead(404)
                    response.end()
                    return
                }
                // console.log(filteredTOFHistogram.shape)
                // console.log(filteredTOFHistogram.value)
                // const startTime = Date.now()
                const widthInMillimeters = filteredImage.shape[0] / 1024 * 50
                const heightInMillimeters = filteredImage.shape[1] / 1024 * 50
                const ax = {
                    xLim: [0, widthInMillimeters],
                    yLim: [0, heightInMillimeters],
                    xTick: [0, widthInMillimeters],
                    yTick: [0, heightInMillimeters],
                    xTickLabel: ['0', `${widthInMillimeters.toFixed(1)}`],
                    yTickLabel: ['0', `${heightInMillimeters.toFixed(1)}`]
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
