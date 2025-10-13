import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._xDestination
        variables.xDestination.addListener(arg => {
            this._xDestination = arg
            this._operation()
        })
        this._operation = () => {
            variables.xDestinationValue.assign(`${this._xDestination}`)
        }
    }
}

