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
            const stepInSeconds = 0.001 / this._miezeFrequencyInKilohertz,
                totalInSeconds = (0.001 * this._tofMaxInMilliseconds),
                tofInSeconds = colon(stepInSeconds / 2, stepInSeconds, totalInSeconds - stepInSeconds / 2)

            variables.tofInSeconds.assign({
                shape: [tofInSeconds.length],
                data: new Float64Array(tofInSeconds)
            })
        }
    }
}
