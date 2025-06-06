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
        this._hdf5ReaderFileName
        variables.hdf5ReaderFileName.addListener(arg => {
            this._hdf5ReaderFileName = arg
            this._operation()
        })
        this._operation = () => {
            const f = new h5wasm.File(join(this._hdf5Path, this._hdf5ReaderFileName), "r")

            /** @type {any} */
            const entity = f.get('contrast')
            if (entity === null
                || entity.value === undefined) {
                variables.svgInnerHTML.assign(`<text x="20" y="35">Undefined</text>`)
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
            // console.log(value.filter(x => Number.isFinite(x)).length)
            variables.svgInnerHTML.assign([
                axes(ax),
                line(ax, colon(1, xMax), value)
            ].join(''))
            // console.log(value)
            // console.log(line(ax,colon(1,xMax),value))
        }
    }
}

