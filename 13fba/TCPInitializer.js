import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._tcpQueue
        variables.tcpQueue.addListener(arg => { this._tcpQueue = arg })
        this._tcpSocket
        variables.tcpSocket.addListener(arg => {
            this._tcpSocket = arg
            this._operation()
        })
        this._operation = () => {
            this._tcpSocket.setEncoding('utf8')
            this._tcpSocket.on('data', data => {
                const key = this._tcpQueue.shift()
                // const params = new URLSearchParams
                // params.set(key, data)
                const params = `${key}=${data}`
                console.log(`key: ${key}, data: ${data}, params: ${params}`)
                variables.tcpParams.assign(params)
            })
        }
    }
}
