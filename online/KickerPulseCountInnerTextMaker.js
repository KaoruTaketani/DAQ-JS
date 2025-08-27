import throttle from '../14n/throttle.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.addListener(arg => {
            this._kickerPulseCount = arg
            this._operation()
        })
        this._operation = throttle(() => {
            variables.kickerPulseCountInnerText.assign(`kicker pulse: ${this._kickerPulseCount.toLocaleString()} events`)
        }, 200)
    }
}

