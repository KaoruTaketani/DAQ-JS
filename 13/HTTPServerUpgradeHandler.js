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
        this._elementValues
        variables.elementValues.addListener(arg => { this._elementValues = arg })
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer = new WebSocketServer({ noServer: true })
            variables.webSocketPathnames.assign(new Map())
            variables.elementValues.assign(new Map())

            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    const url = new URL(`ws://localhost${request.url}`)
                    this._webSocketPathnames.set(ws, url.pathname)

                    ws.on('close', () => {
                        ws.removeAllListeners('message')
                        this._webSocketPathnames.delete(ws)
                    })
                    ws.on('message', data => {
                        const arg = JSON.parse(data.toString())
                        variables.message.assign(arg)
                    })

                    this._elementValues.forEach((value, key) => {
                        if (request.url !== key) return

                        if (typeof value === 'string')
                            ws.send(value)
                        if (typeof value === 'boolean')
                            ws.send(value.toString())
                    })
                })
            })
        }
    }
}

