import Operator from '../13/Operator.js'
import { Socket } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._socket
        variables.socket.addListener(arg => {
            this._socket = arg
            this._operation()
        })
        this._operation = () => {
            this._socket.setEncoding('utf8')
            this._socket.on('data', data => {
                const randomNumber = parseFloat(data)
                variables.randomNumber.assign(randomNumber)
                setTimeout(() => {
                    this._socket.write('get')
                }, 1000)
            })
        }
    }
}

