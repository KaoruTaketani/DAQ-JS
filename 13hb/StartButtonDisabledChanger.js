import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._ringBufferDestinationState
        variables.ringBufferDestinationState.addListener(arg => {
            this._ringBufferDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._ringBufferDestinationState === 'busy')
                variables.startButtonDisabled.assign(true)
            if (this._ringBufferDestinationState === 'idle')
                variables.startButtonDisabled.assign(false)
        }
    }
}

