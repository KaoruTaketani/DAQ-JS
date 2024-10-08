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
                xLim: [min(this._timeSeries.x), max(this._timeSeries.x)],
                yLim: [min(this._timeSeries.y), max(this._timeSeries.y)]
            }
            variables.timeSeriesSVGInnerHTML.assign([
                axes(gca),
                line(gca, this._timeSeries.x, this._timeSeries.y)
            ].join(''))
        }
    }
}

