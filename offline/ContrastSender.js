import { ok } from 'assert'
import { join } from 'path'
import axes from './axes.js'
import colon from './colon.js'
import line from './line.js'
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
            if (!this._clientUrl.endsWith('/ContrastClient.js')) return

            const f = new h5wasm.File(join(this._hdf5Path, this._message), "r")

            /** @type {any} */
            const entity = f.get('contrast')
            if (entity === null
                || entity.value === undefined) {
                this._clientWebSocket.send(`<text x="20" y="35">Undefined</text>`)
                return
            }
            ok(typeof entity.value[0] === 'number')
            /** @type {number[]} */
            const value = entity.value,
                xMax = value.length,
                yMax = 1.0
            const ax = {
                xLim: [1, xMax],
                yLim: [0, yMax],
                xTick: [1, xMax],
                yTick: [0, yMax],
                xTickLabel: [1, xMax].map(x => x.toFixed(3)),
                yTickLabel: [0, yMax].map(y => y.toLocaleString())
            }
            console.log(value.filter(x => Number.isFinite(x)).length)
            this._clientWebSocket.send([
                axes(ax),
                line(ax, colon(1, xMax), value)
            ].join(''))
            // console.log(value)
            // console.log(line(ax,colon(1,xMax),value))
        }
    }
}

