import axes from './axes.js'
import max from './max.js'
import min from './min.js'
import line from './line.js'
import linspace from './linspace.js'
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
                xLim: [min(this._timeSeries.time), max(this._timeSeries.time)],
                yLim: [0, 1],
                xTick: [min(this._timeSeries.time), max(this._timeSeries.time)],
                yTick: linspace(0, 1, 11),
                xTickLabel: [
                    (new Date(min(this._timeSeries.time))).toLocaleTimeString(),
                    (new Date(max(this._timeSeries.time))).toLocaleTimeString()
                ],
                yTickLabel: linspace(0, 1, 11).map(x => x.toFixed(1))
            }
            variables.timeSeriesSVGInnerHTML.assign([
                axes(gca),
                line(gca, this._timeSeries.time, this._timeSeries.data)
            ].join(''))
        }
    }
}

