import Operator from './Operator.js'
import prod from '../lib/prod.js'

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
        this._roiYInPixels
        variables.roiYInPixels.addListener(arg => {
            this._roiYInPixels = arg
            this._operation()
        })
        /** @type {number} */
        this._roiWidthInPixels
        variables.roiWidthInPixels.addListener(arg => {
            this._roiWidthInPixels = arg
            this._operation()
        })
        /** @type {number} */
        this._roiHeightInPixels
        variables.roiHeightInPixels.addListener(arg => {
            this._roiHeightInPixels = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._roiXInPixels) return
            if (!this._roiYInPixels) return
            if (!this._roiHeightInPixels) return
            if (!this._roiWidthInPixels) return

            const size = [
                this._roiHeightInPixels,
                this._roiWidthInPixels],
                length = prod(size)

            variables.filteredImage.assign({
                numBins: size,
                binCounts: new Array(length).fill(0),
                binWidth: [1, 1]
            })
        }
    }
}
