import { Socket } from 'net'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {

            const socket = new Socket()
            socket.setEncoding('utf8')
            socket.once('data', (/** @type {string} */data) => {
                console.log(`data: ${data}`)
                const x = parseInt(data.split(' ')[1])
                variables.xPulse.assign(x)
                variables.xPulseInnerText.assign(`x: ${x}`)
                socket.end()
            }).once('close', () => {
                console.log(`close`)
                socket.once('data', (/** @type {string} */data) => {
                    console.log(`2nd data: ${data}`)
                    const theta = parseInt(data.split(' ')[1])
                    variables.thetaPulse.assign(theta)
                    variables.thetaPulseInnerText.assign(`theta: ${theta}`)
                    socket.end()
                }).once('close', () => {
                    console.log('2nd close')
                }).connect(23, 'localhost', () => {
                    socket.write('pulse?:1')
                })
            }).connect(23, 'localhost', () => {
                socket.write(`pulse?:0`)
            })


        }
    }
}

