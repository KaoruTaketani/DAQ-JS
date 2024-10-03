import { WebSocketServer } from 'ws'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.httpServer.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.webSocketServer.assign(new WebSocketServer({ noServer: true }))
        }
    }
}

