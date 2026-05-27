import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGetterDestinationState
        variables.randomNumberGetterDestinationState.addListener(arg => {
            this._randomNumberGetterDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGetterDestinationState === 'busy')
                variables.stopButtonDisabled.assign(false)
            if (this._randomNumberGetterDestinationState === 'idle')
                variables.stopButtonDisabled.assign(true)
        }
    }
}

