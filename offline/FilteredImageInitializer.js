import Operator from './Operator.js'
import { getHeapStatistics } from 'v8'
import prod from './prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiX
        variables.roiX.addListener(arg => {
            this._roiX = arg
            this._operation()
        })
        /** @type {number} */
        this._roiY
        variables.roiY.addListener(arg => {
            this._roiY = arg
            this._operation()
        })
        /** @type {number} */
        this._roiWidth
        variables.roiWidth.addListener(arg => {
            this._roiWidth = arg
            this._operation()
        })
        /** @type {number} */
        this._roiHeight
        variables.roiHeight.addListener(arg => {
            this._roiHeight = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._roiX) return
            if (!this._roiY) return
            if (!this._roiHeight) return
            if (!this._roiWidth) return

            const size = [
                this._roiHeight,
                this._roiWidth],
                length = prod(size)

            variables.filteredImage.assign({
                xBinLimits: [this._roiX, this._roiX + this._roiWidth],
                yBinLimits: [this._roiY, this._roiY + this._roiHeight],
                numBins: size,
                binCounts: new Array(length).fill(0)
            })
        }
    }
}
