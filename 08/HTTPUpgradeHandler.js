import Operator from './Operator.js'

export default class extends Operator {
    constructor(httpServer, webSocketServer) {
        super()
        this._webSocketServer
        webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._httpServer
        httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, () => { })
            })
        }
    }
}

