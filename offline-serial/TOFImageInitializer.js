import Operator from './Operator.js'
import { getHeapStatistics } from 'v8'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.addListener(arg => {
            this._tofMaxInMilliseconds = arg
            this._operation()
        })
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
            if (!this._tofMaxInMilliseconds) return
            if (!this._roiHeightInPixels) return
            if (!this._roiWidthInPixels) return
            if (!this._roiXInPixels) return
            if (!this._roiYInPixels) return

            const size = [
                this._tofMaxInMilliseconds,
                this._roiHeightInPixels,
                this._roiWidthInPixels],
                length = prod(size)//,
            // must be nanoseconds as used in maker
            //dt = size[0] * 1_000_000 / size[0]

            console.log(`t: ${size[0]}, h: ${size[1]}, w: ${size[2]} memory: ${(8 * length).toLocaleString()} bytes, heap_limit: ${getHeapStatistics().heap_size_limit.toLocaleString()} bytes`)

            variables.tofImage.assign({
                numBins: size,
                binCounts: new Uint16Array(length),
                xBinLimits: [0, this._roiWidthInPixels],
                yBinLimits: [0, this._roiHeightInPixels],
                zBinLimits: [0, this._tofMaxInMilliseconds * 1_000_000]
            })
        }
    }
}
