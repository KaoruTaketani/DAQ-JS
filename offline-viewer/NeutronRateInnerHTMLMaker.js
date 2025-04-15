import axes from './axes.js'
import max from './max.js'
import Operator from './Operator.js'
import stairs from './stairs.js'

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
            if (!this._clientUrl.endsWith('NeutronRate.js')) return

            const dataset = this._hdf5File.get('neutronRate')
            if (dataset === null) {
                variables.clientInnerHTML.assign(`<text x="20" y="35">Undefined</text>`)
                return
            }
            const ax = {
                xLim: [0, dataset.value.length],
                yLim: [0, max(dataset.value)],
                xTick: [0, dataset.value.length],
                yTick: [0, max(dataset.value)],
                xTickLabel: [0, dataset.value.length].map(x => x.toFixed(3)),
                yTickLabel: [0, max(dataset.value)].map(y => y.toLocaleString())
            }

            variables.clientInnerHTML.assign([
                axes(ax),
                stairs(ax, dataset.value)
            ].join(''))
        }
    }
}

