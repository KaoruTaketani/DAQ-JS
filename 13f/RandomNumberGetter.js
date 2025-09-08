import Operator from '../13/Operator.js'
import { Socket } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._socket
        variables.socket.addListener(arg => { this._socket = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._socket.once('close', () => {
                    console.log('close')
                }).connect(23, 'localhost', () => {
                    this._socket.write('get')
                })
            } else {
                this._socket.end()
            }
        }
    }
}

