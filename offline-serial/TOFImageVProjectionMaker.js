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
        this._tofImageVProjectionXBinLimitsInNanoseconds
        variables.tofImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionXBinLimitsInNanoseconds = arg })
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
            const binWidthInNanoseconds = diff(this._tofImageVProjectionXBinLimitsInNanoseconds)[0]
                / this._tofImageVProjectionBinCounts.shape[1]

            this._tofImageVProjectionBinCounts.data[sub2ind(
                this._tofImageVProjectionBinCounts.shape,
                this._filteredNeutronEvent.xCoordinateInPixels - this._roiInPixels[0],
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidthInNanoseconds)
            )]++
        }
    }
}
