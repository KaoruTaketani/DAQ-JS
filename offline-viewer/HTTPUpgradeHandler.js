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
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
        /** @type {object[]} */
        this._tableMetadata
        variables.tableMetadata.prependListener(arg => { this._tableMetadata = arg })
        /** @type {import('http').Server} */
        this._httpServer
        variables.httpServer.addListener(arg => {
            this._httpServer = arg
            this._operation()
        })
        this._webSocketServer = new WebSocketServer({ noServer: true })
        this._operation = () => {
            this._httpServer.on('upgrade', (request, socket, head) => {
                this._webSocketServer.handleUpgrade(request, socket, head, ws => {
                    if (request.url?.endsWith('/Table.js')) {
                        const keys = new Set()
                        this._tableMetadata.forEach(row => {
                            Object.keys(row).forEach(key => {
                                keys.add(key)
                            })
                        })
                        ws.send(Array.from(keys).map(key => `<option selected>${key}</option>`).join('\n'))
                    } else {
                        readdir(this._hdf5Path, (err, files) => {
                            if (err) throw err

                            ws.send(files.map(innerText => `<option>${innerText}</option>`).join('\n'))
                        })
                    }

                    ws.onmessage = event => {
                        console.log(`onmessage url:${request.url}`)

                        if (request.url === undefined) {
                            console.log(`request.url is undefiend`)
                            return
                        }
                        variables.clientUrl.assign(request.url)

                        if (!request.url.endsWith('/Table.js')) {
                            const f = new h5wasm.File(join(this._hdf5Path, event.data.toString()), "r")
                            variables.hdf5File.assign(f)
                            f.close()
                        } else {
                            variables.tableColumns.assign(event.data.toString())
                        }
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

