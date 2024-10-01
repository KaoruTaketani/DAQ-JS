import { ok } from 'assert'
import { WebSocketServer } from 'ws'
import MainVariables from './MainVariables.js'
import Operator from './Operator.js'
import init from './init.js'

export default class extends Operator {
    /**
     * @param {import('./IndexVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Map<string,import('./ServerVariables.js').default>} */
        this._serverVariables
        variables.serverVariables.prependListener(arg => { this._serverVariables = arg })
        /** @type {import('http').Server} */
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer = new WebSocketServer({ noServer: true })
            /** @type {WeakMap<import('ws').WebSocket,any>} */
            this._operators = new WeakMap()

            this._httpServer.on('upgrade', (request, socket, head) => {
                console.log(`url: ${request.url}`)
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    ok(request.url)

                    const vars = this._serverVariables.get(request.url)

                    vars.connectedWebSocket.assign(ws)
                    ws.on('close', () => {
                        vars.closedWebSocket.assign(ws)
                    })
                })
            })
        }
    }
}
