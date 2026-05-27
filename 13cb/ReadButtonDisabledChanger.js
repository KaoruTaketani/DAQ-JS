import { request } from 'https'
import { createInterface } from 'readline'
import token from './token.js'
import org from './org.js'
import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._timeSeries
        variables.timeSeries.addListener(arg => { this._timeSeries })
        this._randomNumberGeneratorDestinationState
        variables.randomNumberGeneratorDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorDestinationState === 'busy')
                variables.readButtonDisabled.assign(true)
            if (this._randomNumberGeneratorDestinationState === 'idle')
                variables.readButtonDisabled.assign(false)
        }
    }
}

