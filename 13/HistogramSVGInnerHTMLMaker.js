import axes from './axes.js'
import max from './max.js'
import linspace from '../lib/linspace.js'
import stairs from './stairs.js'
import xlabel from './xlabel.js'
import ylabel from './ylabel.js'
import Operator from './Operator.js'

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
                xTick: linspace(0, 1, 11),
                yTick: [0, max(this._histogram.binCounts)],
                xTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1)),
                yTickLabel: ['0', `${max(this._histogram.binCounts)}`]
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

