import Operator from './Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofHistogramBinCounts
        variables.tofHistogramBinCounts.prependListener(arg => { this._tofHistogramBinCounts = arg })
        /** @type {number[]} */
        this._tofHistogramBinLimitsInNanoseconds
        variables.tofHistogramBinLimitsInNanoseconds.prependListener(arg => { this._tofHistogramBinLimitsInNanoseconds = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            if (!isbetween(this._filteredNeutronEvent.tofInNanoseconds, this._tofHistogramBinLimitsInNanoseconds)) return

            const r = rescale(this._filteredNeutronEvent.tofInNanoseconds, this._tofHistogramBinLimitsInNanoseconds),
                i = Math.floor(r * this._tofHistogramBinCounts.data.length)
            this._tofHistogramBinCounts.data[i]++
        }
    }
}
