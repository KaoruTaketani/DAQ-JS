import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel1Destination
        variables.channel1Destination.addListener(arg => { this._channel1Destination = arg })
        this._tcpQueue
        variables.tcpQueue.addListener(arg => { this._tcpQueue = arg })
        this._channel1Pulse
        variables.channel1Pulse.addListener(arg => {
            this._channel1Pulse = arg
            this._operation()
        })
        this._operation = () => {
            if (Number.isNaN(this._channel1Destination)) {
                if (!Number.isNaN(this._channel1Pulse)) return

                this._tcpQueue.push({
                    message: 'pulse?:1',
                    callback: (data, done) => {
                        console.log(`data: ${data}`)
                        const x = parseInt(data.split(' ')[1])
                        variables.channel1Pulse.assign(x)
                        done()
                    }
                })
                // this._socketQueue.push((socket, done) => {
                //     socket.once('data', data => {
                //         console.log(`data: ${data}`)
                //         const x = parseInt(data.split(' ')[1])
                //         variables.channel1Pulse.assign(x)
                //         done()
                //     }).write(`pulse?:1`)
                // })                
            }
        }
    }
}

