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
        this._operation = () => {
            variables.kickerPulseCountInnerText.assign(`kicker pulse: ${this._kickerPulseCount.toLocaleString()} events`)
        }
    }
}

