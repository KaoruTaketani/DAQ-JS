import Operator from '../13/Operator.js'
import { Socket } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._ringBufferSocket
        variables.ringBufferSocket.addListener(arg => { this._ringBufferSocket = arg })
        this._ringBufferMessage
        variables.ringBufferMessage.addListener(arg => {
            this._ringBufferMessage = arg
            this._operation()
        })
        this._operation = () => {
            this._ringBufferSocket.write(this._ringBufferMessage)
        }
    }
}

