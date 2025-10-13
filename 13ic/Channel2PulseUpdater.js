import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._socketQueue
        variables.socketQueue.addListener(arg => { this._socketQueue = arg })
        this._channel2Destination
        variables.channel2Destination.addListener(arg => { this._channel2Destination = arg })
        this._channel2Pulse
        variables.channel2Pulse.addListener(arg => {
            this._channel2Pulse = arg
            this._operation()
        })
        this._operation = () => {
            console.log(`pulse: ${this._channel2Pulse}, dest: ${this._channel2Destination}`)
            if (Number.isNaN(this._channel2Destination)) {
                if (!Number.isNaN(this._channel2Pulse)) return

                this._socketQueue.push((socket, done) => {
                    socket.once('data', data => {
                        console.log(`2nd data: ${data}`)
                        const pulse = parseInt(data.split(' ')[1])
                        variables.channel2Pulse.assign(pulse)
                        // socket.end()
                        done()
                    }).write('pulse?:2')
                })
            } else {
                // console.log('repeat?')
                this._socketQueue.push((socket, done) => {
                    socket.once('data', data => {
                        console.log(`2nd data: ${data}`)
                        const pulse = parseInt(data.split(' ')[1]),
                            isBusy = data.split(' ')[2] == '1'
                        variables.channel2Pulse.assign(pulse)
                        if(!isBusy){
                            variables.channel2Destination.assign(Number.NaN)
                        }
                        // socket.end()
                        done()
                    }).write('pulse?:2')
                })
            }
        }
    }
}

