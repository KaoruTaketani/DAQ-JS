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
        this._ringBufferDestinationState
        variables.ringBufferDestinationState.addListener(arg => {
            this._ringBufferDestinationState = arg
            this._operation()
        })
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._ringBufferDestinationState === 'busy') {
                    const ringBufferSocket = new Socket()
                    ringBufferSocket.setEncoding('utf8')
                    ringBufferSocket.on('data', data => {
                        // console.log(data)
                        variables.ringBufferDataInnerText.assign(data)
                    }).on('close', () => {
                        console.log('close')
                        variables.ringBufferDestinationState.assign('idle')
                    }).connect(23, 'localhost', () => {
                        // this._socket.write('get')
                    })
                    variables.ringBufferSocket.assign(ringBufferSocket)
                    this._state = this._ringBufferDestinationState
                }
                return
            }
            if (this._state === 'busy') {
                if (this._ringBufferDestinationState === 'idle') {
                    this._ringBufferSocket?.end()
                    this._state = this._ringBufferDestinationState
                }
                return
            }
        }
    }
}

