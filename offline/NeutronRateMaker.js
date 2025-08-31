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
        /** @type {import('../lib/index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.addListener(arg => {
            this._tofHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._tofHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const numBins = this._frequencyVectorLength

            const neutronRate = new Array(this._tofHistogram.binCounts.length / numBins).fill(0).map((_, i) => {
                const s = this._tofHistogram.binCounts.slice(i * numBins, (i + 1) * numBins)
                const b = s.reduce((a, b) => a + b, 0)
                return b / this._kickerPulseCount
            })
            variables.neutronRate.assign(neutronRate)
        }
    }
}
