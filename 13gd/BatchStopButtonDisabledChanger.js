import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchProcessorDestinationState
        variables.batchProcessorDestinationState.addListener(arg => {
            this._batchProcessorDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._batchProcessorDestinationState === 'busy')
                variables.batchStopButtonDisabled.assign(false)
            if (this._batchProcessorDestinationState === 'idle')
                variables.batchStopButtonDisabled.assign(true)
        }
    }
}

