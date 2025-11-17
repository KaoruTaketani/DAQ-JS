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
            const dt = 0.001 / this._miezeFrequencyInKilohertz

            variables.tofInSeconds.assign(colon(dt / 2, dt, 0.001 * this._tofMaxInMilliseconds - dt / 2))
        }
    }
}
