import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._presetStep
        variables.presetStep.addListener(arg => {
            this._presetStep = arg
            this._operation()
        })
        this._operation = () => {
            variables.presetStepValue.assign(this._presetStep.toString())
        }
    }
}

