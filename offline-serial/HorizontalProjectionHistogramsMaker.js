import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'
import diff from '../lib/diff.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.prependListener(arg => { this._roiInPixels = arg })
        /** @type {number[]} */
        this._horizontalProjectionHistogramsXBinLimits
        variables.horizontalProjectionHistogramsXBinLimitsInPixels.prependListener(arg => { this._horizontalProjectionHistogramsXBinLimits = arg })
        /** @type {number[]} */
        this._horizontalProjectionHistogramsYBinLimits
        variables.horizontalProjectionHistogramsYBinLimitsInNanoseconds.prependListener(arg => { this._horizontalProjectionHistogramsYBinLimits = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._horizontalProjectionHistogramsBinCounts
        variables.horizontalProjectionHistogramsBinCounts.prependListener(arg => { this._horizontalProjectionHistogramsBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidthInNanoseconds = diff(this._horizontalProjectionHistogramsYBinLimits)[0]
                / this._horizontalProjectionHistogramsBinCounts.shape[0],
                [x, _y, _w, _h] = this._roiInPixels
            // sub2ind expects indexes to start frpm 1
            this._horizontalProjectionHistogramsBinCounts.data[sub2ind(
                this._horizontalProjectionHistogramsBinCounts.shape,
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidthInNanoseconds),
                this._filteredNeutronEvent.xCoordinateInPixels - x
            )]++
        }
    }
}
