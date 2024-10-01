import Operator from './Operator.js'

export default class extends Operator {
    constructor(randomNumber, webSocketServer) {
        super()
        this._webSocketServer
        webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._randomNumber
        randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer.clients.forEach(ws => {
                ws.send(`random number is ${this._randomNumber}`)
            })
        }
    }
}

