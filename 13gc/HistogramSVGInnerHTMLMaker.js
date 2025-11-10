import axes from '../lib/axes.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import stairs from '../lib/stairs.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import Operator from '../13/Operator.js'
import throttle from '../lib/throttle.js'

export default class extends Operator {
    /**
     * @param {import('../13hb/Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = throttle(() => {
            const yMax = max(this._histogram.binCounts) === 0
                ? 1 : max(this._histogram.binCounts),
                xTick = linspace(this._histogram.binLimits[0], this._histogram.binLimits[1], this._histogram.binCounts.length + 1),
                ax = {
                    xLim: this._histogram.binLimits,
                    yLim: [0, yMax],
                    xTick: xTick,
                    yTick: [0, yMax],
                    xTickLabel: xTick.map(x => x.toFixed(1)),
                    yTickLabel: ['0', `${yMax}`]
                }
            variables.histogramSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'random number'),
                ylabel(ax, 'counts'),
                stairs(ax, this._histogram)
            ].join(''))
        }, 1000)
    }
}

