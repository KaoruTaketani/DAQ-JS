import axes from './axes.js'
import max from './max.js'
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
                xTick: [this._histogram.lowerEdge, this._histogram.upperEdge],
                yTick: [0, max(this._histogram.value)],
                xTickLabel: [`${this._histogram.lowerEdge}`, `${this._histogram.upperEdge}`],
                yTickLabel: ['0', `${max(this._histogram.value)}`],
            }
            variables.histogramSVGInnerHTML.assign([
                axes(gca),
                stairs(gca, this._histogram.value)
            ].join(''))
        }
    }
}

