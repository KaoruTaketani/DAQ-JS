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
        this._response
        variables.response.addListener(arg => {
            this._response = arg
            this._operation()
        })
        this._operation = () => {
            if (Number.isNaN(this._channel1Destination)) return
            const value = this._response.get('pulse?:A:5')
            if (value === null) return
            if (value.endsWith('1')) {
                setTimeout(() => {
                    this._tcpQueue.push('pulse?:A:5')
                }, 100)
            } else {
                variables.channel1Destination.assign(Number.NaN)
            }
            // this._tcpQueue.push('pulse?:1', (data, done) => {
            //     console.log(`data: ${data}`)
            //     const x = parseInt(data.split(' ')[1])
            //     variables.channel1Pulse.assign(x)
            //     done()
            // })
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

