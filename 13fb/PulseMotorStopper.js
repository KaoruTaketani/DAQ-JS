import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._socketQueue
        variables.socketQueue.addListener(arg => { this._socketQueue = arg })
        this._stopChannel
        variables.stopChannel.addListener(arg => {
            this._stopChannel = arg
            this._operation()
        })
        this._operation = () => {
            this._socketQueue.push((socket, done) => {
                socket.once('data', data => {
                    console.log(`stop response: ${data}`)

                    variables.channel2Destination.assign(Number.NaN)
                    done()
                }).write(`stop:${this._stopChannel}`)
            })
        }
    }
}

