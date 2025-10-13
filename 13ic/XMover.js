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
            if (Number.isNaN(this._xDestination)) return

            const socket = new Socket()
            socket.setEncoding('utf8')
            socket.on('data', (/** @type {string} */data) => {
                console.log(`data: ${data}`)
                if (!data.startsWith('ok')) {
                    socket.end()
                    return
                }
                if (data === 'ok') {
                    socket.write('pulse?:0')
                } else {
                    const pulse = parseInt(data.split(' ')[1]),
                        isBusy = data.split(' ')[2] === '1'
                    variables.xPulse.assign(pulse)
                    if (isBusy) {
                        setTimeout(() => {
                            socket.write('pulse?:0')
                        }, 100)
                    } else {
                        socket.end()
                    }
                }
            }).on('close', () => {
                console.log(`close`)
                variables.xDestination.assign(Number.NaN)
            }).connect(23, 'localhost', () => {
                socket.write(`move_to:0 ${this._xDestination}`)
            })
        }
    }
}

