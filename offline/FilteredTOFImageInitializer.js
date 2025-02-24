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
            if (!this._roiHeight) return
            if (!this._roiWidth) return
            if (!this._roiX) return
            if (!this._roiY) return

            const size = [
                80,
                this._roiHeight,
                this._roiWidth],
                length = prod(size)
            console.log(`t: ${size[0]}, h: ${size[1]}, w: ${size[2]} memory: ${(8 * length).toLocaleString()} bytes, heap_limit: ${getHeapStatistics().heap_size_limit.toLocaleString()} bytes`)

            variables.filteredTOFImage.assign({
                numBins: size,
                xBinLimits: [this._roiX, this._roiX + this._roiWidth],
                yBinLimits: [this._roiY, this._roiY + this._roiHeight],
                zBinLimits: [0, size[0]],
                binCounts: new Array(length).fill(0)
            })
        }
    }
}
