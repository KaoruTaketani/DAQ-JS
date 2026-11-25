import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._tcpQueue
        variables.tcpQueue.addListener(arg => { this._tcpQueue = arg })
        this._channel2Destination
        variables.channel2Destination.addListener(arg => { this._channel2Destination = arg })
        this._channel2Pulse
        variables.channel2Pulse.addListener(arg => {
            this._channel2Pulse = arg
            this._operation()
        })
        this._operation = () => {
            if (Number.isNaN(this._channel2Destination)
                && !Number.isNaN(this._channel2Pulse)) return

            this._tcpQueue.push('pulse?:2', (data, done) => {
                console.log(`2nd data: ${data}`)
                const pulse = parseInt(data.split(' ')[1]),
                    isBusy = data.split(' ')[2] == '1'
                variables.channel2Pulse.assign(pulse)
                if (!isBusy) {
                    variables.channel2Destination.assign(Number.NaN)
                }
                done()
            })

        // this._socketQueue.push((socket, done) => {
        //     setTimeout(() => {
        //         socket.once('data', data => {
        //             console.log(`2nd data: ${data}`)
        //             const pulse = parseInt(data.split(' ')[1]),
        //                 isBusy = data.split(' ')[2] == '1'
        //             variables.channel2Pulse.assign(pulse)
        //             if (!isBusy) {
        //                 variables.channel2Destination.assign(Number.NaN)
        //             }
        //             // socket.end()
        //             done()
        //         }).write('pulse?:2')
        //     }, 100)//necessary to accept stop queue?
        // })
    }
}
}

