import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._thetaPulse
        variables.widthInMillimeters.addListener(arg => {
            this._thetaPulse = arg
            this._operation()
        })
        this._operation = () => {
            variables.widthInMillimetersInnerText.assign(this._thetaPulse.toLocaleString())
        }
    }
}

