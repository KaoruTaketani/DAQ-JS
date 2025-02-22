import axes from './axes.js'
import linspace from './linspace.js'
import max from './max.js'
import Operator from './Operator.js'
import stairs from './stairs.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.addListener(arg => {
            this._tofHistogram = arg
            this._operation()
        })
        this._operation = () => {
            const ax = {
                xLim: this._tofHistogram.binLimits,
                yLim: [0, max(this._tofHistogram.binCounts)],
                xTick: linspace(0, 1, 11),
                yTick: [0, max(this._tofHistogram.binCounts)],
                xTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1)),
                yTickLabel: ['0', `${max(this._tofHistogram.binCounts)}`]
            }
            variables.tofHistogramSVGInnerHTML.assign([
                axes(ax),
                stairs(ax, this._tofHistogram.binCounts)
            ].join(''))
        }
    }
}

