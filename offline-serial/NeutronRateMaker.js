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
        /** @type {import('../lib/index.js').Uint32Dataset} */
        this._tofHistogramBinCounts
        variables.tofHistogramBinCounts.addListener(arg => {
            this._tofHistogramBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (this._tofHistogramBinCounts.data.reduce((a, b) => a + b, 0) === 0) return

            const numBins = this._frequencyVectorLength,
                length = this._tofHistogramBinCounts.data.length / numBins

            variables.neutronRate.assign({
                shape: [length],
                data: new Float64Array(length).map((_, i) => {
                    const s = this._tofHistogramBinCounts.data.slice(i * numBins, (i + 1) * numBins)
                    const b = s.reduce((a, b) => a + b, 0)
                    return b / this._kickerPulseCount
                })
            })
        }
    }
}
