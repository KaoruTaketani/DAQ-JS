import Operator from './Operator.js'
import sum from '../lib/sum.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {Uint32Array} */
        this._tofHistogramBinCounts
        variables.tofHistogramBinCounts.addListener(arg => {
            this._tofHistogramBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (this._tofHistogramBinCounts.reduce((a, b) => a + b, 0) === 0) return

            const numBins = this._frequencyVectorLength,
                length = this._tofHistogramBinCounts.length / numBins

            variables.tofHistogramSum.assign(
                new Float64Array(length).map((_, i) => {
                    const s = this._tofHistogramBinCounts.slice(i * numBins, (i + 1) * numBins)
                    
                    return sum(s)
                })
            )
        }
    }
}
