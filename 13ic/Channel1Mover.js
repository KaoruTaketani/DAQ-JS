import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel1Pulse
        variables.channel1Pulse.addListener(arg => { this._channel1Pulse = arg })
        this._tcpQueue
        variables.tcpQueue.addListener(arg => { this._tcpQueue = arg })
        this._channel1Destination
        variables.channel1Destination.addListener(arg => {
            this._channel1Destination = arg
            this._operation()
        })
        this._operation = () => {
            console.log(`channel1Destination: ${this._channel1Destination}`)
            if (Number.isNaN(this._channel1Destination)) return

            this._tcpQueue.push(`move_to:A:5 2 ${this._channel1Destination}`)
            this._tcpQueue.push(`pulse?:A:5`)
            // this._tcpQueue.push((socket, done) => {
            //     socket.once('data', data => {
            //         console.log(`1st data: ${data}`)
            //         if (data === 'ok') {
            //             variables.channel2Pulse.assign(this._channel2Pulse)
            //             // this._socketQueue.push((socket, done) => {
            //             //     socket.once('data', data => {
            //             //         console.log(`2nd data: ${data}`)
            //             //         const pulse = parseInt(data.split(' ')[1])
            //             //         console.log(pulse)
            //             //         variables.channel2Pulse.assign(pulse)
            //             //         // socket.end()
            //             //         done()
            //             //     }).write('pulse?:2')
            //             // })
            //         }
            //         done()
            //     }).write(`move_to:2 ${this._channel2Destination}`)
            // })

            // const socket = new Socket()
            // socket.setEncoding('utf8')
            // socket.on('data', (/** @type {string} */data) => {
            //     console.log(`data: ${data}`)
            //     if (!data.startsWith('ok')) {
            //         socket.end()
            //         return
            //     }
            //     if (data === 'ok') {
            //         socket.write('pulse?:0')
            //     } else {
            //         const pulse = parseInt(data.split(' ')[1]),
            //             isBusy = data.split(' ')[2] === '1'
            //         variables.xPulse.assign(pulse)
            //         if (isBusy) {
            //             setTimeout(() => {
            //                 socket.write('pulse?:0')
            //             }, 100)
            //         } else {
            //             socket.end()
            //         }
            //     }
            // }).on('close', () => {
            //     console.log(`close`)
            //     variables.xDestination.assign(Number.NaN)
            // }).connect(23, 'localhost', () => {
            //     socket.write(`move_to:0 ${this._xDestination}`)
            // })
        }
    }
}

