import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._centerInMillimeters
        variables.centerInMillimeters.addListener(arg => {
            this._centerInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            variables.centerInMillimetersInnerText.assign(this._centerInMillimeters.toLocaleString())
        }
    }
}

