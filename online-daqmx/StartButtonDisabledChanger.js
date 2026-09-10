import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._randomNumberGeneratorDestinationState
        variables.daqmxDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorDestinationState === 'busy')
                variables.startButtonDisabled.assign(true)
            if (this._randomNumberGeneratorDestinationState === 'idle')
                variables.startButtonDisabled.assign(false)
        }
    }
}

