import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.prependListener(arg => { this._tofMaxInMilliseconds = arg })
        /** @type {number} */
        this._tofHistogramBinWidthInMilliseconds
        variables.tofHistogramBinWidthInMilliseconds.addListener(arg => {
            this._tofHistogramBinWidthInMilliseconds = arg
            this._operation()
        })
        this._operation = () => {
            const numBins = Math.ceil(this._tofMaxInMilliseconds / this._tofHistogramBinWidthInMilliseconds)

            variables.tofHistogramBinLimitsInNanoseconds.assign([0, this._tofMaxInMilliseconds * 1_000_000])
            variables.tofHistogramBinCounts.assign(new Uint32Array(numBins))
        }
    }
}
