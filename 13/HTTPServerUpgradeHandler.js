import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._webSocketServer
        variables.webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    console.log(request.url)
                    ws.on('message', data => {
                        const arg = JSON.parse(data.toString())
                        variables.message.assign(arg)
                    })
                })
            })
        }
    }
}

