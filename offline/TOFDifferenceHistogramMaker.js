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
        /** @type {import('./index.js').Histogram} */
        this._tofDifferenceHistogram
        variables.tofDifferenceHistogram.prependListener(arg => { this._tofDifferenceHistogram = arg })
        /** @type {import('./index.js').PairedEvent} */
        this._pairedEvent
        variables.pairedEvent.addListener(arg => {
            this._pairedEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._operation = () => {
                const dt = this._pairedEvent.xTOFInNanoseconds - this._pairedEvent.yTOFInNanoseconds,
                    id = Math.floor(
                        (dt - this._tofDifferenceHistogramMinInNanoseconds)
                        / this._tofDifferenceHistogram.binWidth
                    )

                if (id < 0) {
                    // this._tofDifferenceHistogram.value[0]++
                    // this._tofDifferenceHistogram.underflowValue++
                } else if (id > this._tofDifferenceHistogram.binCounts.length - 1) {
                    // this._tofDifferenceHistogram.value[this._tofDifferenceHistogram.numberOfBins + 1]++
                    // this._tofDifferenceHistogram.overflowValue++
                } else {
                    // this._tofDifferenceHistogram.value[id + 1]++
                    this._tofDifferenceHistogram.binCounts[id]++
                }
            }
        }
    }
}
