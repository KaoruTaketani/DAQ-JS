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
        this._histogramYAxisScale
        variables.histogramYAxisScale.addListener(arg => { this._histogramYAxisScale = arg })
        this._histogramSVGViewBoxWidth
        variables.histogramSVGViewBoxWidth.addListener(arg => { this._histogramSVGViewBoxWidth = arg })
        this._histogramSVGViewBoxHeight
        variables.histogramSVGViewBoxHeight.addListener(arg => { this._histogramSVGViewBoxHeight = arg })
        this._histogram
        variables.histogram.addListener(arg => {
            this._histogram = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._histogramSVGViewBoxHeight) return
            if (!this._histogramSVGViewBoxWidth) return

            const gca = {
                parentHeight: this._histogramSVGViewBoxHeight,
                parentWidth: this._histogramSVGViewBoxWidth,
                yAxisScale: this._histogramYAxisScale,
                xLim: [this._histogram.lowerEdge, this._histogram.upperEdge],
                yLim: [0, max(this._histogram.value)]
            }
            variables.histogramSVGInnerHTML.assign([
                axes(gca),
                stairs(gca, this._histogram.value)
            ].join(''))
            variables.histogramSVGViewBox.assign(`0 0 ${this._histogramSVGViewBoxWidth} ${this._histogramSVGViewBoxHeight}`)
        }
    }
}

