import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._xPulse
        variables.xPulse.addListener(arg => {
            this._xPulse = arg
            this._operation()
        })
        this._operation = () => {
            variables.xPulseInnerText.assign(this._xPulse.toLocaleString())
        }
    }
}

