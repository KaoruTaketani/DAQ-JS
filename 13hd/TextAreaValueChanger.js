import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchParams
        variables.batchParams.addListener(arg => {
            this._batchParams = arg
            this._operation()
        })
        this._operation = () => {
            variables.textAreaValue.assign(this._batchParams.join('\n'))
        }
    }
}

