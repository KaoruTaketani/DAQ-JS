import axes from '../lib/axes.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import stairs from '../lib/stairs.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramBinLimits
        variables.histogramBinLimits.addListener(arg => { this._histogramBinLimits = arg })
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => {
            this._histogramBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            const yMax = max(this._histogramBinCounts) === 0
                ? 1 : max(this._histogramBinCounts),
                edges = linspace(this._histogramBinLimits[0], this._histogramBinLimits[1], this._histogramBinCounts.length + 1),
                ax = {
                    xLim: this._histogramBinLimits,
                    yLim: [0, yMax],
                    xTick: edges,
                    yTick: [0, yMax],
                    xTickLabel: edges.map(x => x.toFixed(1)),
                    yTickLabel: ['0', `${yMax}`]
                }
            variables.histogramSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'random number'),
                ylabel(ax, 'counts'),
                stairs(ax, edges, this._histogramBinCounts)
            ].join(''))
        }
    }
}

