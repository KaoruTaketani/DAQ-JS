import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._saveFile
        variables.saveFile.addListener(arg => {
            this._saveFile = arg
            this._operation()
        })
        this._operation = () => {
            variables.saveFileChecked.assign(this._saveFile)
        }
    }
}

