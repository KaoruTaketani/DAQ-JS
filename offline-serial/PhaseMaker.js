import Operator from './Operator.js'
import fft0 from '../lib/fft0.js'

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

            variables.phase.assign(
                new Float64Array(length).map((_, i) => {
                    /** see @MIEZEPhase */
                    const s = this._tofHistogramBinCounts.slice(i * numBins, (i + 1) * numBins)
                    const [x, y] = fft0(s)
                    return Math.atan2(y, x)
                })
            )
        }
    }
}
