import axes from '../lib/axes.js'
import max from '../lib/max.js'
import linspace from '../lib/linspace.js'
import stairs from '../lib/stairs.js'
import line from '../lib/line.js'
import colon from '../lib/colon.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
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
            const xTick = linspace(this._histogram.binLimits[0], this._histogram.binLimits[1], 11),
                yTick = [-0.05, 0.0, 0.05],
                ax = {
                    xLim: this._histogram.binLimits,
                    yLim: [-0.05, 0.05],
                    xTick: xTick,
                    yTick: yTick,
                    xTickLabel: xTick.map(x => x.toFixed(1)),
                    yTickLabel: yTick.map(x => x.toFixed(1))
                }
            // console.log(this._histogram.binCounts)
            // console.log(colon(1,this._histogram.binCounts.length))
            variables.histogramSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'time (msec)'),
                ylabel(ax, 'voltage (volts)'),
                stairs(ax, this._histogram)
                // line(ax,colon(1,this._histogram.binCounts.length),this._histogram.binCounts)
            ].join(''))
        }
    }
}

