import Operator from './Operator.js'
import freqspace from './freqspace.js'
import miezeX from './miezeX.js'
import miezeY from './miezeY.js'

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
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.addListener(arg => {
            this._filteredTOFHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._filteredTOFHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const n = this._frequencyVectorLength,
                fs = freqspace(n)

            const phase = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                /** see @MIEZEPhase */
                // const x = miezeX8(this._filteredTOFHistogram.binCounts, n * i)
                const x = miezeX(this._filteredTOFHistogram.binCounts, fs, i)
                // const y = miezeY8(this._filteredTOFHistogram.binCounts, n * i)
                const y = miezeY(this._filteredTOFHistogram.binCounts, fs, i)
                return Math.atan2(y, x)
            })
            variables.phase.assign(phase)
        }
    }
}
