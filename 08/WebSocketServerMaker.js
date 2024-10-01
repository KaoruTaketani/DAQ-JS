import { WebSocketServer } from 'ws'
import Operator from './Operator.js'

export default class extends Operator {
    constructor(httpServer, webSocketServer) {
        super()
        httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            webSocketServer.assign(new WebSocketServer({ noServer: true }))
        }
    }
}

