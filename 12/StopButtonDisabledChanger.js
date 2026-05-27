import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorDestinationState
        variables.randomNumberGeneratorDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorDestinationState === 'idle')
                variables.stopButtonDisabled.assign(true)
            if (this._randomNumberGeneratorDestinationState === 'busy')
                variables.stopButtonDisabled.assign(false)
        }
    }
}

