import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._xDestination
        variables.widthDestination.addListener(arg => {
            this._xDestination = arg
            this._operation()
        })
        this._operation = () => {
            variables.centerDestinationInnerText.assign(`${this._xDestination}`)
        }
    }
}

