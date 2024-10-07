import axes from './axes.js'
import max from './max.js'
import min from './min.js'
import line from './line.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._timeSeries
        variables.timeSeries.addListener(arg => {
            this._timeSeries = arg
            this._operation()
        })
        this._operation = () => {
            const gca = {
                xLim: [1, this._timeSeries.length],
                yLim: [min(this._timeSeries), max(this._timeSeries)]
            }
            variables.timeSeriesSVGInnerHTML.assign([
                axes(gca),
                line(gca, this._timeSeries)
            ].join(''))
        }
    }
}

