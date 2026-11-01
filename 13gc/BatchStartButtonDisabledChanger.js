import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchProcessorState
        variables.batchProcessorState.addListener(arg => {
            this._batchProcessorState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._batchProcessorState === 'busy')
                variables.batchStartButtonDisabled.assign(true)
            if (this._batchProcessorState === 'idle')
                variables.batchStartButtonDisabled.assign(false)
        }
    }
}

