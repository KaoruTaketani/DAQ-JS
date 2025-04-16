import axes from './axes.js'
import max from './max.js'
import { ok } from 'assert'
import Operator from './Operator.js'
import line from './line.js'
import colon from './colon.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {import('h5wasm').File} */
        this._hdf5File
        variables.hdf5File.addListener(arg => {
            this._hdf5File = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('/NeutronRate.js')) return

            /** @type {any} */
            const entity = this._hdf5File.get('neutronRate')
            if (entity === null
                || entity.value === undefined) {
                variables.clientInnerHTML.assign(`<text x="20" y="35">Undefined</text>`)
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

            variables.clientInnerHTML.assign([
                axes(ax),
                line(ax, colon(1, xMax), value)
            ].join(''))
        }
    }
}

