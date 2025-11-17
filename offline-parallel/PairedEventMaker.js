import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default|import('./WorkerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel0Event
        variables.channel0Event.addListener(arg => {
            this._channel0Event = arg
            this._operation()
        })
        this._channel1Event
        variables.channel1Event.addListener(arg => {
            this._channel1Event = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._channel0Event) return
            if (!this._channel1Event) return

            variables.pairedEvent.assign({
                xPositionInPixels: this._channel0Event.positionInPixels,
                xPulseHeight: this._channel0Event.pulseHeight,
                xTOFInNanoseconds: this._channel0Event.tofInNanoseconds,
                yPositionInPixels: this._channel1Event.positionInPixels,
                yPulseHeight: this._channel1Event.pulseHeight,
                yTOFInNanoseconds: this._channel1Event.tofInNanoseconds
            })
        }
    }
}
