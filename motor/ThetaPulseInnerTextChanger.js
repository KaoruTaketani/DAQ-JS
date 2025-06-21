import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._thetaPulse
        variables.thetaPulse.addListener(arg => {
            this._thetaPulse = arg
            this._operation()
        })
        this._operation = () => {
            variables.thetaPulseInnerText.assign(`x: ${this._thetaPulse}`)
        }
    }
}

