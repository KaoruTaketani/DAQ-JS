import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel1Pulse
        variables.channel1Pulse.addListener(arg => {
            this._channel1Pulse = arg
            this._operation()
        })
        this._operation = () => {
            variables.widthInMillimeters.assign(this._channel1Pulse * 500 + 0.5)
        }
    }
}

