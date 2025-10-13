import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._presetStart
        variables.presetStart.addListener(arg => {
            this._presetStart = arg
            this._operation()
        })
        this._operation = () => {
            variables.presetStartValue.assign(this._presetStart.toString())
        }
    }
}

