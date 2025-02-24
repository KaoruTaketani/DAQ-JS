import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._saveToEDR
        variables.saveToEDR.addListener(arg => {
            this._saveToEDR = arg
            this._operation()
        })
        this._operation = () => {
            variables.saveToEDRChecked.assign(this._saveToEDR)
        }
    }
}

