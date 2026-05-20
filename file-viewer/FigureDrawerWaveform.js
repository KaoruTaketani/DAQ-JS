import axes from '../lib/axes.js'
import stairs from '../lib/stairs.js'
import xlabel from '../lib/xlabel.js'

export default class {
    /**
     * @param {import('./FigureVariablesWaveform.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._xlabel
        variables.xlabel.prependListener(arg => { this._xlabel = arg })
        /** @type {number[]} */
        this._xDataset
        variables.xDataset.prependListener(arg => { this._xDataset = arg })
        /** @type {number[]} */
        this._yDataset
        variables.yDataset.prependListener(arg => { this._yDataset = arg })
        /** @type {string} */
        this._xminValue
        variables.xminValue.addListener(arg => {
            this._xminValue = arg
            this._operation()
        })
        /** @type {string} */
        this._xmaxValue
        variables.xmaxValue.addListener(arg => {
            this._xmaxValue = arg
            this._operation()
        })
        /** @type {string} */
        this._yminValue
        variables.yminValue.addListener(arg => {
            this._yminValue = arg
            this._operation()
        })
        /** @type {string} */
        this._ymaxValue
        variables.ymaxValue.addListener(arg => {
            this._ymaxValue = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._xminValue) return
            if (!this._xmaxValue) return
            if (!this._yminValue) return
            if (!this._ymaxValue) return

            const ax = {
                xLim: [parseFloat(this._xminValue), parseFloat(this._xmaxValue)],
                yLim: [parseFloat(this._yminValue), parseFloat(this._ymaxValue)],
                xTick: [parseFloat(this._xminValue), parseFloat(this._xmaxValue)],
                yTick: [parseFloat(this._yminValue), parseFloat(this._ymaxValue)],
                xTickLabel: [this._xminValue, this._xmaxValue],
                yTickLabel: [this._yminValue, this._ymaxValue]
            }
            variables.svgInnerHTML.assign([
                axes(ax),
                xlabel(ax, this._xlabel),
                stairs(ax, this._xDataset, this._yDataset)
            ].join(''))
        }
    }
}
