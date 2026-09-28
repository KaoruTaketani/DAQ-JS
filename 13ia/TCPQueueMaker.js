import Operator from '../13/Operator.js'
import TCPQueue from './TCPQueue.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._tcpResponseHandlers
        variables.tcpResponseHandlers.addListener(arg => {
            this._tcpResponseHandlers = arg
            this._operation()
        })
        this._operation = () => {
            variables.tcpQueue.assign(new TCPQueue(23, 'localhost', this._tcpResponseHandlers))
        }
    }
}
