import Operator from '../14/Operator.js'
import { Socket } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._socket
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
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
            } else {
                this._socket?.end()
            }
        }
    }
}

