import Operator from './Operator.js'
import prod from './prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiXInPixels
        variables.roiXInPixels.addListener(arg => {
            this._roiXInPixels = arg
            this._operation()
        })
        /** @type {number} */
        this._roiWidthInPixels
        variables.roiWidthInPixels.addListener(arg => {
            this._roiWidthInPixels = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._roiWidthInPixels) return
            if (!this._roiXInPixels) return

            const size = [
                80,
                this._roiWidthInPixels],
                length = prod(size)

            variables.filteredHorizontalProjections.assign({
                numBins: size,
                xBinLimits: [this._roiXInPixels, this._roiXInPixels + this._roiWidthInPixels],
                yBinLimits: [0, 80],
                binCounts: new Array(length).fill(0)
            })
        }
    }
}
