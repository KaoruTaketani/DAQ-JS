import max from './max.js'
import Operator from './Operator.js'
import imagesc from './imagesc.js'

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
            if (!this._clientUrl.endsWith('Image.js')) return

            const dataset = this._hdf5File.get('image')
            if (dataset === null) {
                console.log(`null file:${this._hdf5File.path}`)
                variables.clientInnerHTML.assign('failed to load')
                return
            }

            const ax = {
                zLim: [0, max(dataset.value)]
            }
            /**  @type {import('./index.js').Histogram2D} */
            const h = {
                xBinLimits: [0, 1024],
                yBinLimits: [0, 1024],
                binCounts: dataset.value,
                numBins: [1024, 1024]
            }
            imagesc(ax, h).then(buf => {
                variables.clientInnerHTML.assign(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}

