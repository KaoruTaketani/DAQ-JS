import { ok } from 'assert'
import { join } from 'path'
import Operator from './Operator.js'
import axes from '../lib/axes.js'
import colon from '../lib/colon.js'
import line from '../lib/line.js'
import max from '../lib/max.js'
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
        /** @type {string} */
        this._hdf5ReaderFileName
        variables.hdf5ReaderFileName.addListener(arg => {
            this._hdf5ReaderFileName = arg
            this._operation()
        })
        this._operation = () => {
            const f = new h5wasm.File(join(this._hdf5Path, this._hdf5ReaderFileName), "r")

            /** @type {any} */
            const entity = f.get('neutronRate')
            if (entity === null
                || entity.value === undefined) {
                variables.svgInnerHTML.assign(`<text x="20" y="35">Undefined</text>`)
                return
            }
            ok(typeof entity.value[0] === 'number')
            /** @type {number[]} */
            const value = entity.value,
                xMax = value.length,
                yMax = max(value)
            const ax = {
                xLim: [1, xMax],
                yLim: [0, yMax],
                xTick: [1, xMax],
                yTick: [0, yMax],
                xTickLabel: [1, xMax].map(x => x.toFixed(3)),
                yTickLabel: [0, yMax].map(y => y.toLocaleString())
            }
            f.close()

            variables.svgInnerHTML.assign([
                axes(ax),
                line(ax, colon(1, xMax), value)
            ].join(''))
        }
    }
}

