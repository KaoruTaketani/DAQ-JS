import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorDestinationState
        variables.randomNumberGeneratorDestinationState.prependListener(arg => { this._randomNumberGeneratorDestinationState = arg })
        this._startTime
        variables.startTime.addListener(arg => {
            this._startTime = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorDestinationState === 'busy') {
                variables.startTimeInnerText.assign(`start time is ${new Date(this._startTime).toString()}`)
            } else {
                variables.startTimeInnerText.assign(`start time is ${new Date(this._startTime).toString()}, stopped at ${new Date().toString()}`)
            }
        }
    }
}

