import Operator from './Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Uint32Array} */
        this._tofHistogramBinCounts
        variables.tofHistogramBinCounts.prependListener(arg => { this._tofHistogramBinCounts = arg })
        /** @type {number[]} */
        this._tofHistogramBinLimitsInNanoseconds
        variables.tofHistogramBinLimitsInNanoseconds.prependListener(arg => { this._tofHistogramBinLimitsInNanoseconds = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            if (!isbetween(this._neutronEvent.tofInNanoseconds, this._tofHistogramBinLimitsInNanoseconds)) return

            const r = rescale(this._neutronEvent.tofInNanoseconds, this._tofHistogramBinLimitsInNanoseconds),
                i = Math.floor(r * this._tofHistogramBinCounts.length)
            this._tofHistogramBinCounts[i]++
        }
    }
}
