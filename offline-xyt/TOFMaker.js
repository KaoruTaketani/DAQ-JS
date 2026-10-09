import colon from '../lib/colon.js'
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
            const dt = this._tofHistogramBinWidthInMilliseconds,
                tofInMilliseconds = colon(dt / 2, dt, this._tofMaxInMilliseconds - dt / 2)

            variables.tofInMilliseconds.assign(new Float64Array(tofInMilliseconds))
        }
    }
}
