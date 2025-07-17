import axes from '../14/axes.js'
import max from '../14/max.js'
import linspace from '../14/linspace.js'
import stairs from './stairs.js'
import xlabel from '../14/xlabel.js'
import ylabel from '../14/ylabel.js'
import Operator from '../14/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = () => {
            const ax = {
                xLim: this._histogram.binLimits,
                yLim: [0, max(this._histogram.binCounts)],
                xTick: linspace(this._histogram.binLimits[0], this._histogram.binLimits[1], this._histogram.binCounts.length + 1),
                yTick: [0, max(this._histogram.binCounts)],
                xTickLabel: linspace(this._histogram.binLimits[0], this._histogram.binLimits[1], this._histogram.binCounts.length + 1).map(x => x.toFixed(1)),
                yTickLabel: ['0', `${max(this._histogram.binCounts)}`],
                yAxisScale: 'log'
            }
            variables.histogramSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'random number'),
                ylabel(ax, 'counts'),
                stairs(ax, this._histogram.binCounts)
            ].join(''))
        }
    }
}

