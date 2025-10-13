import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._thetaDestination
        variables.thetaDestination.addListener(arg => {
            this._thetaDestination = arg
            this._operation()
        })
        this._operation = () => {
            variables.thetaDestinationValue.assign(`${this._thetaDestination}`)
        }
    }
}

