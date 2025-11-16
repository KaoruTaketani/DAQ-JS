import Operator from '../13/Operator.js'
import TCPQueue from './TCPQueue.js'

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
            console.log(`channel2Pulse: ${this._channel2Pulse}`)
        }
    }
}
