import { WebSocketServer } from 'ws'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketUrls
        variables.webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer = new WebSocketServer({ noServer: true })
            variables.webSocketUrls.assign(new Map())

            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {

                    ws.on('message', data => {
                        const arg = JSON.parse(data.toString())
                        variables.message.assign(arg)
                    })
                    ws.on('close',()=>{
                        ws.removeAllListeners('message')
                        this._webSocketUrls.delete(ws)
                    })
                    this._webSocketUrls.set(ws, request.url)
                    variables.webSocketUrls.assign(this._webSocketUrls)
                })
            })
        }
    }
}

