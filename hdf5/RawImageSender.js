import { readFile } from 'fs'
import { join } from 'path'
import imagesc from './imagesc.js'
import Operator from './Operator.js'
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {string} */
        this._hdf5ReaderFileName
        variables.hdf5ReaderFileName.addListener(arg => {
            this._hdf5ReaderFileName = arg
            this._operation()
        })
        this._operation = () => {
            const f = new h5wasm.File(join(this._hdf5Path, this._hdf5ReaderFileName), "r")

            /** @type {import('h5wasm').Dataset} */
            const dataset = /** @type {import('h5wasm').Dataset} */(f.get('/rawImage'))

            if (dataset === null || dataset.shape === null || dataset.value === null) {
                console.log(`failed file:${f.path}`)
                readFile('../../png/error.png', (err, data) => {
                    if (err) throw err

                    variables.imageSrc.assign(`data:image/png;base64,${data.toString('base64')}`)
                })
                return
            }

            // /** @type {import('h5wasm').Group} */
            // const group = dataset
            // /** @type {any} */
            // const binCountsEntity = group.get('binCounts')
            // /** @type {any} */
            // const xBinLimitsEntity = group.get('xBinLimits')
            // /** @type {any} */
            // const yBinLimitsEntity = group.get('yBinLimits')

            // const binCounts = binCountsEntity.value
            // const xBinLimits = xBinLimitsEntity.value
            // const yBinLimits = yBinLimitsEntity.value

            /**  @type {import('./index.js').Histogram2D} */
            const h = {
                // xBinLimits: xBinLimits,
                // yBinLimits: yBinLimits,
                binCounts: /** @type {number[]} */(dataset.value),
                numBins: dataset.shape,
                binWidth: [1, 1]
            }
            imagesc(h).then(buf => {
                variables.imageSrc.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}

