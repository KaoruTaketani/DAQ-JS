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
            if (!this._roiHeightInPixels) return
            if (!this._roiWidthInPixels) return
            if (!this._roiXInPixels) return
            if (!this._roiYInPixels) return

            const size = [
                80,
                this._roiHeightInPixels,
                this._roiWidthInPixels],
                length = prod(size)
            console.log(`t: ${size[0]}, h: ${size[1]}, w: ${size[2]} memory: ${(8 * length).toLocaleString()} bytes, heap_limit: ${getHeapStatistics().heap_size_limit.toLocaleString()} bytes`)

            variables.filteredTOFImage.assign({
                numBins: size,
                xBinLimits: [this._roiXInPixels, this._roiXInPixels + this._roiWidthInPixels],
                yBinLimits: [this._roiYInPixels, this._roiYInPixels + this._roiHeightInPixels],
                zBinLimits: [0, size[0]],
                binCounts: new Array(length).fill(0)
            })
        }
    }
}
