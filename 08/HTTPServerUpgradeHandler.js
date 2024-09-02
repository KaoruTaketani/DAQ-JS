import { WebSocketServer } from 'ws'
import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._webSocketServer = new WebSocketServer({ noServer: true })
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    ws.on('message', data => {
                        const msg = JSON.parse(data)
                        // console.log(msg)

                        if (msg.channel === 'clickedElementValue'
                            && msg.value === 'generate') {
                            ws.send(JSON.stringify({ channel: 'messageInnerText', value: `random number is ${Math.random()}` }))
                        }
                    })
                })
            })
        }
    }
}

