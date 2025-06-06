import imagesc from './imagesc.js'
import Operator from './Operator.js'
import { join } from 'path'
import { readFile } from 'fs'
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
        /** @type {string} */
        this._message
        variables.message.prependListener(arg => { this._message = arg })
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {import('ws').WebSocket} */
        this._clientWebSocket
        variables.clientWebSocket.addListener(arg => {
            this._clientWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('/ImageClient.js')) return

            console.log(join(this._hdf5Path, this._message))
            const f = new h5wasm.File(join(this._hdf5Path, this._message), "r")

            /** @type {import('h5wasm').Dataset} */
            const dataset = /** @type {import('h5wasm').Dataset} */(f.get('/rawImage'))

            // console.log(dataset.value)
            // console.log(dataset.dtype)
            if (dataset === null || dataset.shape === null || dataset.value === null) {
                console.log(`failed file:${f.path}`)
                readFile('../../png/error.png', (err, data) => {
                    if (err) throw err

                    this._clientWebSocket.send(`data:image/png;base64,${data.toString('base64')}`)
                })
                return
            }

            // /** @type {import('h5wasm').Group} */
            // const group = dataset
            // /** @type {any} */
            // const binCountsEntity = group.get('binCounts')
            // /** @type {any} */
            // const xBinLimitsEntity = group.get('xBinLimits')
            // /** @type {any} */
            // const yBinLimitsEntity = group.get('yBinLimits')

            // const binCounts = binCountsEntity.value
            // const xBinLimits = xBinLimitsEntity.value
            // const yBinLimits = yBinLimitsEntity.value

            /**  @type {import('./index.js').Histogram2D} */
            const h = {
                // xBinLimits: xBinLimits,
                // yBinLimits: yBinLimits,
                binCounts: /** @type {number[]} */(dataset.value),
                numBins: dataset.shape,
                binWidth: [1, 1]
            }
            imagesc(h).then(buf => {
                this._clientWebSocket.send(`data:image/png;base64,${buf.toString('base64')}`)
            })
        }
    }
}

