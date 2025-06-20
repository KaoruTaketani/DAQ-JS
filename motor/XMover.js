import { Socket } from 'net'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._xDestination
        variables.xDestination.addListener(arg => {
            this._xDestination = arg
            this._operation()
        })
        this._operation = () => {
            const socket = new Socket()
            socket.setEncoding('utf8')
            socket.once('data', (/** @type {string} */data) => {
                console.log(`data: ${data}`)
                socket.end()
            }).once('close', () => {
                console.log(`close`)
            }).connect(23, 'localhost', () => {
                socket.write(`move_to:0 ${this._xDestination}`)
            })
        }
    }
}

