import Operator from '../13/Operator.js'
import { Socket } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGetterDestinationState
        variables.randomNumberGetterDestinationState.addListener(arg => {
            this._randomNumberGetterDestinationState = arg
            this._operation()
        })
        this._socket
        this._state = 'idle'
        this._operation = () => {
            if (this._state === 'idle') {
                if (this._randomNumberGetterDestinationState === 'busy') {
                    this._socket = new Socket()
                    this._socket.setEncoding('utf8')
                    this._socket.on('data', data => {
                        const randomNumber = parseFloat(data)
                        variables.randomNumber.assign(randomNumber)
                        setTimeout(() => {
                            this._socket.write('get')
                        }, 1000)
                    }).on('close', () => {
                        console.log('close')
                    }).connect(23, 'localhost', () => {
                        this._socket.write('get')
                    })
                    this._state = this._randomNumberGetterDestinationState
                }
                return
            }
            if (this._state = 'busy') {
                if (this._randomNumberGetterDestinationState === 'idle') {
                    this._socket?.end()
                    this._state = this._randomNumberGetterDestinationState
                }
                return
            }
        }
    }
}

