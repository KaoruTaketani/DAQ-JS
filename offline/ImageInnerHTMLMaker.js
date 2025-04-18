import imagesc from './imagesc.js'
import Operator from './Operator.js'
import { readFile } from 'fs'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {import('h5wasm').File} */
        this._hdf5File
        variables.hdf5File.addListener(arg => {
            this._hdf5File = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('/Image.js')) return

            /** @type {any} */
            const entity = this._hdf5File.get('image')
            if (entity === null || entity.values === undefined) {
                console.log(`failed file:${this._hdf5File.path}`)
                readFile('../../png/error.png', (err, data) => {
                    if (err) throw err

                    variables.clientInnerHTML.assign(`data:image/png;base64,${data.toString('base64')}`)
                })
                return
            }

            /** @type {import('h5wasm').Group} */
            const group = entity
            /** @type {any} */
            const binCountsEntity = group.get('binCounts')
            /** @type {any} */
            const xBinLimitsEntity = group.get('xBinLimits')
            /** @type {any} */
            const yBinLimitsEntity = group.get('yBinLimits')

            const binCounts = binCountsEntity.value
            const xBinLimits = xBinLimitsEntity.value
            const yBinLimits = yBinLimitsEntity.value

            /**  @type {import('./index.js').Histogram2D} */
            const h = {
                xBinLimits: xBinLimits,
                yBinLimits: yBinLimits,
                binCounts: binCounts,
                numBins: binCountsEntity.shape
            }
            imagesc(h).then(buf => {
                variables.clientInnerHTML.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}

