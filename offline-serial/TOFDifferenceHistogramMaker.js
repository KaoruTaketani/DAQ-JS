import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofDifferenceHistogramMinInNanoseconds
        variables.tofDifferenceHistogramMinInNanoseconds.prependListener(arg => { this._tofDifferenceHistogramMinInNanoseconds = arg })
        /** @type {import('../lib/index.js').Histogram} */
        this._tofDifferenceHistogram
        variables.tofDifferenceHistogram.prependListener(arg => { this._tofDifferenceHistogram = arg })
        /** @type {import('../lib/index.js').PairedEvent} */
        this._pairedEvent
        variables.pairedEvent.addListener(arg => {
            this._pairedEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._operation = () => {
                const dt = this._pairedEvent.xTOFInNanoseconds - this._pairedEvent.yTOFInNanoseconds
                if (!isbetween(dt, this._tofDifferenceHistogram.binLimits)) return

                const r = rescale(dt, this._tofDifferenceHistogram.binLimits),
                    i = Math.floor(r * this._tofDifferenceHistogram.binCounts.length)

                this._tofDifferenceHistogram.binCounts[i]++
            }
        }
    }
}
