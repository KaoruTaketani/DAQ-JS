import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._usePreset
        variables.usePreset.addListener(arg => {
            this._usePreset = arg
            this._operation()
        })
        this._operation = () => {
            variables.usePresetChecked.assign(this._usePreset)
        }
    }
}

