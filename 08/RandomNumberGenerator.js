import Operator from './Operator.js'

export default class extends Operator {
    constructor(randomNumberGeneratorDestinationState, randomNumber) {
        super()
        this._randomNumberGeneratorDestinationState
        randomNumberGeneratorDestinationState.addListener(arg => {
            this._randomNumberGeneratorDestinationState = arg
            this._operation()
        })
        this._interval
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._randomNumberGeneratorDestinationState === 'busy') {
                    this._interval = setInterval(() => {
                        randomNumber.assign(Math.random())
                    }, 1000)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
            }
            if (this._state === 'busy') {
                if (this._randomNumberGeneratorDestinationState === 'idle') {
                    clearInterval(this._interval)
                    this._state = this._randomNumberGeneratorDestinationState
                }
                return
            }
        }
    }
}

