import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.elementValues.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.neunetReaderIsBusy.assign(false)
            variables.usePreset.assign(true)
            variables.preset.assign(10)
            variables.saveFile.assign(false)
        }
    }
}

