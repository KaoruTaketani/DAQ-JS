import { WebSocketServer } from 'ws'
import Operator from './Operator.js'
import { BlockList } from 'net'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Map<import('ws').WebSocket,string>} */
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        /** @type {Map<string,boolean|string>} */
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
            this._blockList = new BlockList()
            this._blockList.addRange('0.0.0.0', '255.255.255.255')

            this._httpServer.on('upgrade', (request, socket, head) => {
                const clientIp = request.socket.remoteAddress
                if (!clientIp
                    || this._blockList.check(clientIp)
                    || this._blockList.check(clientIp, 'ipv6')) {
                    request.socket.destroy()
                    return
                }
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    const url = new URL(`ws://localhost${request.url}`)
                    this._webSocketPathnames.set(ws, url.pathname)

                    ws.on('close', () => { this._webSocketPathnames.delete(ws) })

                    this._elementValues.forEach((value, key) => {
                        if (request.url !== key) return

                        if (typeof value === 'string')
                            ws.send(value)
                        if (typeof value === 'boolean')
                            ws.send(value ? 'true' : '')
                    })
                })
            })
        }
    }
}

