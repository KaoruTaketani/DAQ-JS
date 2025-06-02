import { WebSocketServer } from 'ws'
import ChannelEventTableServer from './ChannelEventTableServer.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('http').Server} */
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._webSocketServer = new WebSocketServer({ noServer: true })
        this._servers = new Map()
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    if (request.url === '/ChannelEventTableClient.js')
                        this._servers.set(ws, new ChannelEventTableServer(ws))

                    ws.on('message', data => {
                        console.log(`onmessage url:${request.url}`)

                        const arg = JSON.parse(data.toString())
                        this._servers.get(ws)?.variables.message.assign(arg)
                    })
                    ws.on('close', () => {
                        console.log(`a ws closed by the client url: ${request.url}`)

                        this._servers.delete(ws)
                    })
                })
            })
        }
    }
}

