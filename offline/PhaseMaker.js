import Operator from './Operator.js'
import fft0 from './fft0.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('./index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.addListener(arg => {
            this._tofHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._tofHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const numBins = this._frequencyVectorLength

            const phase = new Array(this._tofHistogram.binCounts.length / numBins).fill(0).map((_, i) => {
                /** see @MIEZEPhase */
                // const x = miezeX8(this._filteredTOFHistogram.binCounts, n * i)
                // const x = miezeX(this._tofHistogram.binCounts, fs, i)
                // const y = miezeY8(this._filteredTOFHistogram.binCounts, n * i)
                // const y = miezeY(this._tofHistogram.binCounts, fs, i)
                const s = this._tofHistogram.binCounts.slice(i * numBins, (i + 1) * numBins)
                const [x, y] = fft0(s)
                return Math.atan2(y, x)
            })
            variables.phase.assign(phase)
        }
    }
}
