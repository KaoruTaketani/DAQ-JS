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
        this._tofImageVProjectionYBinLimits
        variables.tofImageVProjectionYBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionYBinLimits = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofImageVProjectionBinCounts
        variables.tofImageVProjectionBinCounts.prependListener(arg => { this._tofImageVProjectionBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidthInNanoseconds = diff(this._tofImageVProjectionYBinLimits)[0]
                / this._tofImageVProjectionBinCounts.shape[0]

            // sub2ind expects indexes to start frpm 1
            this._tofImageVProjectionBinCounts.data[sub2ind(
                this._tofImageVProjectionBinCounts.shape,
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidthInNanoseconds),
                this._filteredNeutronEvent.xCoordinateInPixels - this._roiInPixels[0]
            )]++
        }
    }
}
