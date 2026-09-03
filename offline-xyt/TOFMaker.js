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
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.addListener(arg => {
            this._miezeFrequencyInKilohertz = arg
            this._operation()
        })
        this._operation = () => {
            const stepInMilliseconds = 1 / this._miezeFrequencyInKilohertz,
                tofInMilliseconds = colon(stepInMilliseconds / 2, stepInMilliseconds, this._tofMaxInMilliseconds - stepInMilliseconds / 2)

            variables.tofInMilliseconds.assign(new Float64Array(tofInMilliseconds))
        }
    }
}
