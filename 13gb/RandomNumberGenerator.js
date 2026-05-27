import Operator from '../13/Operator.js'

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
        this._interval
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._randomNumberGeneratorDestinationState === 'busy') {
                    this._interval = setInterval(() => {
                        variables.randomNumber.assign(Math.random())
                    }, 50)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
            }
            if (this._state === 'busy') {
                if (this._randomNumberGeneratorDestinationState==='idle') {
                    clearInterval(this._interval)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
            }
        }
    }
}

