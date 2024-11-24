import axes from './axes.js'
import max from './max.js'
import linspace from './linspace.js'
import stairs from './stairs.js'
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
            const gca = {
                xLim: [this._histogram.lowerEdge, this._histogram.upperEdge],
                yLim: [0, max(this._histogram.value)],
                xTick: linspace(0, 1, 11),
                yTick: [0, max(this._histogram.value)],
                xTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1)),
                yTickLabel: ['0', `${max(this._histogram.value)}`]
            }
            variables.histogramSVGInnerHTML.assign([
                axes(gca),
                stairs(gca, this._histogram.value)
            ].join(''))
        }
    }
}

