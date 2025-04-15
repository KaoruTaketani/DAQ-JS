import { readdir } from 'fs'
import { join } from 'path'
import { WebSocketServer } from 'ws'
import Operator from './Operator.js'
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
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
        this._hdf5Path = '../../hdf5/mieze'
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    readdir(this._hdf5Path, (err, files) => {
                        if (err) throw err

                        ws.send(files.map(innerText => `<option>${innerText}</option>`).join('\n'))
                    })
                    ws.onmessage = event => {
                        console.log(`onmessage url:${request.url}`)

                        if (request.url === undefined) {
                            console.log(`request.url is undefiend`)
                            return
                        }
                        variables.clientUrl.assign(request.url)

                        const f = new h5wasm.File(join(this._hdf5Path, event.data.toString()), "r")
                        variables.hdf5File.assign(f)
                        f.close()
                        variables.clientWebSocket.assign(ws)
                    }
                    ws.onclose = () => {
                        console.log('a ws closed by the client')
                    }
                })
            })
        }
    }
}

