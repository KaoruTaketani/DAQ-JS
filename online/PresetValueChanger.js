import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._preset
        variables.preset.addListener(arg => {
            this._preset = arg
            this._operation()
        })
        this._operation = () => {
            variables.presetValue.assign(this._preset.toString())
        }
    }
}

