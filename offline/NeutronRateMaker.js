import freqspace from './freqspace.js'
import miezeB from './miezeB.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.prependListener(arg => { this._kickerPulseCount = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.addListener(arg => {
            this._filteredTOFHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._filteredTOFHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const n = this._frequencyVectorLength,
                fs = freqspace(this._frequencyVectorLength)

            const neutronRate = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                // const b = miezeB8(this._filteredTOFHistogram.binCounts, n * i)
                const b = miezeB(this._filteredTOFHistogram.binCounts, fs, i)
                return b / this._kickerPulseCount
            })
            variables.neutronRate.assign(neutronRate)
        }
    }
}
