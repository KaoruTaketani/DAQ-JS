import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._thetaDestination
        variables.centerDestination.addListener(arg => {
            this._thetaDestination = arg
            this._operation()
        })
        this._operation = () => {
            variables.widthDestinationInnerText.assign(`${this._thetaDestination}`)
        }
    }
}

