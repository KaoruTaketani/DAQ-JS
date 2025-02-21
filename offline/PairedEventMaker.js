import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
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
                xPosition: this._channel0Event.position,
                xPulse: this._channel0Event.pulse,
                xTOF: this._channel0Event.tof,
                yPosition: this._channel1Event.position,
                yPulse: this._channel1Event.pulse,
                yTOF: this._channel1Event.tof
            })
        }
    }
}
