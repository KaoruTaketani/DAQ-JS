import { readdir } from 'fs'
import { basename, join } from 'path'
import { WebSocketServer } from 'ws'
import Operator from './Operator.js'
const h5wasm = await import("h5wasm/node")
await h5wasm.ready

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.prependListener(arg => { this._hdf5Path = arg })
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
                    readdir(this._hdf5Path, (err, files) => {
                        if (err) throw err

                        if (request.url?.endsWith('/TableClient.js')) {
                            const startTime = Date.now()
                            /** @type {object[]} */
                            const metadata = []
                            files.forEach(file => {
                                if (!file.endsWith('.h5')) return

                                const tmp = new Map()
                                tmp.set('_name', basename(file, '.h5'))
                                const f = new h5wasm.File(join(this._hdf5Path, file), 'r')
                                Object.keys(f.attrs).forEach(key => {
                                    tmp.set(key, f.attrs[key].value)
                                })
                                f.close()
                                metadata.push(Object.fromEntries(tmp))
                            })
                            const keys = new Set()
                            metadata.forEach(row => {
                                Object.keys(row).forEach(key => {
                                    keys.add(key)
                                })
                            })
                            console.log(`readMetadata elapsedTime: ${Date.now() - startTime}ms`)
                            variables.tableMetadata.assign(metadata)
                            ws.send(Array.from(keys).sort().map(key => `<option selected>${key}</option>`).join('\n'))
                        } else if (request.url?.endsWith('/VelocityClient.js')) {
                        } else {
                            ws.send(files.map(innerText => `<option>${innerText}</option>`).join('\n'))
                        }
                    })

                    ws.on('message', data => {
                        console.log(`onmessage url:${request.url}`)

                        if (request.url === undefined) {
                            console.log(`request.url is undefiend`)
                            return
                        }
                        variables.clientUrl.assign(request.url)
                        variables.message.assign(data.toString())
                        // if (request.url.endsWith('/TableClient.js')) {
                        //     variables.tableSelectedColumns.assign(data.toString())
                        // } else if (request.url.endsWith('/VelocityClient.js')) {
                        // } else {
                        //     const f = new h5wasm.File(join(this._hdf5Path, data.toString()), "r")
                        //     variables.hdf5File.assign(f)
                        //     f.close()
                        // }
                        variables.clientWebSocket.assign(ws)
                    })
                    ws.on('close', () => {
                        console.log('a ws closed by the client')
                    })
                })
            })
        }
    }
}

