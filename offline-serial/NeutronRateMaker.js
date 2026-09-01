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
        /** @type {Uint32Array} */
        this._tofHistogramSum
        variables.tofHistogramSum.addListener(arg => {
            this._tofHistogramSum = arg
            this._operation()
        })
        this._operation = () => {
            variables.neutronRate.assign(
                new Float64Array(this._tofHistogramSum).map((_, i) => {
                    return this._tofHistogramSum[i] / this._kickerPulseCount
                })
            )
        }
    }
}
