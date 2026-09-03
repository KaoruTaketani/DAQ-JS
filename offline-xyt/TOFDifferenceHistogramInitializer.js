import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofResolutionInNanoseconds
        variables.tofResolutionInNanoseconds.addListener(arg => {
            this._tofResolutionInNanoseconds = arg
            this._operation()
        })
        this._operation = () => {
            variables.tofDifferenceHistogramBinLimitsInNanoseconds.assign([-400, 400])

            variables.tofDifferenceHistogramBinCounts.assign(
                new Uint32Array(800 / this._tofResolutionInNanoseconds),
            )
        }
    }
}
