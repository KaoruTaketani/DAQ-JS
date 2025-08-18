import { WebSocketServer } from 'ws'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer = new WebSocketServer({ noServer: true })
            variables.webSocketPathnames.assign(new Map())

            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    const url = new URL(`ws://localhost${request.url}`)
                    this._webSocketPathnames.set(ws, url.pathname)

                    ws.on('close', () => {
                        this._webSocketPathnames.delete(ws)
                    })
                })
            })
        }
    }
}

