import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._tofDifferenceHistogramBinLimitsInNanoseconds
        variables.tofDifferenceHistogramBinLimitsInNanoseconds.prependListener(arg => { this._tofDifferenceHistogramBinLimitsInNanoseconds = arg })
        /** @type {Uint32Array} */
        this._tofDifferenceHistogramBinCounts
        variables.tofDifferenceHistogramBinCounts.prependListener(arg => { this._tofDifferenceHistogramBinCounts = arg })
        /** @type {import('../lib/index.js').PairedEvent} */
        this._pairedEvent
        variables.pairedEvent.addListener(arg => {
            this._pairedEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._operation = () => {
                const dt = this._pairedEvent.xTOFInNanoseconds - this._pairedEvent.yTOFInNanoseconds
                if (!isbetween(dt, this._tofDifferenceHistogramBinLimitsInNanoseconds)) return

                const r = rescale(dt, this._tofDifferenceHistogramBinLimitsInNanoseconds),
                    i = Math.floor(r * this._tofDifferenceHistogramBinCounts.length)

                this._tofDifferenceHistogramBinCounts[i]++
            }
        }
    }
}
