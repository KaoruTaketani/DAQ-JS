import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchResolve
        variables.batchResolve.addListener(arg => { this._batchResolve = arg })
        this._batchParams
        variables.batchParams.addListener(arg => {
            this._batchParams = arg
            this._operation()
        })
        this._batchProcessorState
        variables.batchProcessorState.addListener(arg => {
            this._batchProcessorState = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._batchParams) return

            if (Array.from(this._batchParams.keys())
                .filter(key => !this._batchResolve.has(key)).length > 0) {
                variables.batchStartButtonDisabled.assign(true)
                return
            }

            if (this._batchProcessorState === 'busy')
                variables.batchStartButtonDisabled.assign(true)
            if (this._batchProcessorState === 'idle')
                variables.batchStartButtonDisabled.assign(false)
        }
    }
}

