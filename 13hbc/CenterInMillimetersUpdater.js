import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel2Pulse
        variables.channel2Pulse.addListener(arg => {
            this._channel2Pulse = arg
            this._operation()
        })
        this._operation = () => {
            variables.centerInMillimeters.assign(this._channel2Pulse * 500 + 0.5)
        }
    }
}

