import Operator from '../13/Operator.js'
import TCPQueue from './TCPQueue.js'

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
            console.log(`channel1Pulse: ${this._channel1Pulse}`)
        }
    }
}
