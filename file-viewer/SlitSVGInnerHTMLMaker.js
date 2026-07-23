import bounds from '../lib/bounds.js'
import colon from '../lib/colon.js'
import axes from '../lib/axes.js'
import line from '../lib/line.js'
import min from '../lib/min.js'
import max from '../lib/max.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'

export default class {
    /**
     * @param {import('./SlitVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._upstreamSlitToDownstreamSlitDistanceInMeters
        variables.upstreamSlitToDownstreamSlitDistanceInMeters.addListener(arg => {
            this._upstreamSlitToDownstreamSlitDistanceInMeters = arg
            this._operation()
        })
        /** @type {string} */
        this._downstreamSlitToDetectorDistanceInMeters
        variables.downstreamSlitToDetectorDistanceInMeters.addListener(arg => {
            this._downstreamSlitToDetectorDistanceInMeters = arg
            this._operation()
        })
        /** @type {string} */
        this._upstreamSlitWidthInMillimeters
        variables.upstreamSlitWidthInMillimeters.addListener(arg => {
            this._upstreamSlitWidthInMillimeters = arg
            this._operation()
        })
        /** @type {string} */
        this._downstreamSlitWidthInMillimeters
        variables.downstreamSlitWidthInMillimeters.addListener(arg => {
            this._downstreamSlitWidthInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._upstreamSlitToDownstreamSlitDistanceInMeters) return
            if (!this._downstreamSlitToDetectorDistanceInMeters) return
            if (!this._upstreamSlitWidthInMillimeters) return
            if (!this._downstreamSlitWidthInMillimeters) return

            const xTick = colon(-4, 1, 3),
                yTick = colon(-3, 1, 3)
            const ax = {
                xLim: bounds(xTick),
                yLim: bounds(yTick),
                xTick: xTick,
                yTick: yTick,
                xTickLabel: xTick.map(x => x.toFixed()),
                yTickLabel: yTick.map(y => y.toFixed())
            }
            const l1 = parseFloat(this._upstreamSlitToDownstreamSlitDistanceInMeters),
                l2 = parseFloat(this._downstreamSlitToDetectorDistanceInMeters),
                w1 = parseFloat(this._upstreamSlitWidthInMillimeters),
                w2 = parseFloat(this._downstreamSlitWidthInMillimeters)
            console.log(l1, l2, w1, w2)
            if (Number.isNaN(l1) || Number.isNaN(l2) || Number.isNaN(w1) || Number.isNaN(w2)) {
                variables.svgInnerHTML.assign(axes(ax))
            } else {
                variables.svgInnerHTML.assign([
                    axes(ax),
                    xlabel(ax, 'longitudinal (m)'),
                    ylabel(ax, 'transverse (mm)'),
                    line(ax, [-l1, -l1], [min(yTick), -w1 / 2]),
                    line(ax, [-l1, -l1], [w1 / 2, max(yTick)]),
                    line(ax, [0, 0], [min(yTick), -w2 / 2]),
                    line(ax, [0, 0], [w2 / 2, max(yTick)]),
                    line(ax, [l2, l2], [min(yTick), max(yTick)])
                ].join(''))
            }
        }
    }
}
