import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchReject
        variables.batchReject.addListener(arg => { this._batchReject = arg })
        this._batchProcessorIsBusy
        variables.batchProcessorIsBusy.addListener(arg => {
            this._batchProcessorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (this._batchProcessorIsBusy) return

            if (this._batchReject) this._batchReject()
        }
    }
}

