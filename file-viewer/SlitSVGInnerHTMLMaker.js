import bounds from '../lib/bounds.js'
import colon from '../lib/colon.js'
import axes from '../lib/axes.js'
import line from '../lib/line.js'
import min from '../lib/min.js'
import max from '../lib/max.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import polyfit from '../lib/polyfit.js'
import polyval from '../lib/polyval.js'
import linspace from '../lib/linspace.js'
import gauss1 from '../lib/gauss1.js'
import trapz from '../lib/trapz.js'
import std from '../lib/std.js'
import mean from '../lib/mean.js'

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

            const l1 = parseFloat(this._upstreamSlitToDownstreamSlitDistanceInMeters),
                l2 = parseFloat(this._downstreamSlitToDetectorDistanceInMeters),
                w1 = parseFloat(this._upstreamSlitWidthInMillimeters),
                w2 = parseFloat(this._downstreamSlitWidthInMillimeters)

            if (Number.isNaN(l1) || Number.isNaN(l2) || Number.isNaN(w1) || Number.isNaN(w2)) {
                console.log(l1, l2, w1, w2)
            } else {
                const lTick = colon(-4, 1, 3),
                    tTick = colon(-3, 1, 3),
                    ax = {
                        xLim: bounds(lTick),
                        yLim: bounds(tTick),
                        xTick: lTick,
                        yTick: tTick,
                        xTickLabel: lTick.map(l => l.toFixed()),
                        yTickLabel: tTick.map(t => t.toFixed())
                    }
                const b2 = polyval(polyfit([-l1, 0], [-w1 / 2, w2 / 2], 1), [-l1, l2]),
                    b1 = polyval(polyfit([-l1, 0], [w1 / 2, -w2 / 2], 1), [-l1, l2]),
                    t1 = polyval(polyfit([-l1, 0], [-w1 / 2, -w2 / 2], 1), [-l1, l2]),
                    t2 = polyval(polyfit([-l1, 0], [w1 / 2, w2 / 2], 1), [-l1, l2])

                variables.setupSVGInnerHTML.assign([
                    axes(ax),
                    xlabel(ax, 'longitudinal (m)'),
                    ylabel(ax, 'transverse (mm)'),
                    line(ax, [-l1, l2], b1, { color: 'red' }),
                    line(ax, [-l1, l2], b2, { color: 'red' }),
                    line(ax, [-l1, l2], t1, { color: 'blue' }),
                    line(ax, [-l1, l2], t2, { color: 'blue' }),
                    line(ax, [-l1, -l1], [min(tTick), -w1 / 2]),
                    line(ax, [-l1, -l1], [w1 / 2, max(tTick)]),
                    line(ax, [0, 0], [min(tTick), -w2 / 2]),
                    line(ax, [0, 0], [w2 / 2, max(tTick)]),
                    line(ax, [l2, l2], [min(tTick), max(tTick)])
                ].join(''))

                // evaluate the anglular width at the coordinate on the detector
                const iTick = [0, 1e3 * Math.atan2(w1 * 1e-3, l1 + l2)]
                const h = t1[1] < t2[1]
                    ? iTick[1]
                    : 1e3 * Math.atan2(w2 * 1e-3, l2)
                const ax2 = {
                    xLim: bounds(tTick),
                    yLim: iTick,
                    xTick: tTick,
                    yTick: iTick,
                    xTickLabel: tTick.map(t => t.toFixed()),
                    yTickLabel: iTick.map(y => y.toFixed(2))
                }
                // see @TrapezoidalDistributionStandardDeviation
                // the result does not depends on the t1,t2 order
                const stdTrap = Math.sqrt(((t2[1] - t1[1]) ** 2 + (b1[1] - b2[1]) ** 2) / 24)
                const areaTrap = t1[1] < t2[1]
                    ? h * (t2[1] - t1[1] + b2[1] - t2[1])
                    : h * (t1[1] - t2[1] + b2[1] - t1[1])
                const t = linspace(tTick[0], tTick[tTick.length - 1], 100)
                const [func, _] = gauss1
                // see @NormalDistributionPDF for conversing parameters for gauss1
                const s = stdTrap
                const b = areaTrap
                const c = Math.SQRT2 * (stdTrap / Math.sqrt(areaTrap)) ** (3 / 2)
                // const i = t.map(t => func(t, [h, 0.0, std]))
                const i = t.map(t => func(t, [
                    b / Math.sqrt(2 * Math.PI) / s,
                    0.0,
                    Math.SQRT2 * s
                ]))
                const gaussianArea = trapz(t, i)
                const gaussianStd = std(t, i)
                const gaussianMean = mean(t, i)
                if (t1[1] < t2[1]) {
                    variables.beamSVGInnerHTML.assign([
                        axes(ax2),
                        xlabel(ax2, 'transverse (mm)'),
                        ylabel(ax2, 'intensity (arb. unit)'),
                        line(ax2, t, i, { lineStyle: '--' }),
                        line(ax2, [b1[1], t1[1], t2[1], b2[1]], [0, h, h, 0]),
                        line(ax2, [t1[1], t1[1]], iTick, { color: 'blue' }),
                        line(ax2, [t2[1], t2[1]], iTick, { color: 'blue' }),
                        line(ax2, [b1[1], b1[1]], iTick, { color: 'red' }),
                        line(ax2, [b2[1], b2[1]], iTick, { color: 'red' })
                    ].join(''))
                    variables.tableInnerHTML.assign([
                        '<tbody>',
                        `<tr><th>gaussian mean (mm)</th><td>${gaussianMean.toFixed(3)}</td></tr>`,
                        `<tr><th>area (arb. unit)</th><td>${areaTrap.toFixed(3)}</td></tr>`,
                        `<tr><th>gaussian area (arb. unit)</th><td>${gaussianArea.toFixed(3)}</td></tr>`,
                        `<tr><th>std (mm)</th><td>${stdTrap.toFixed(3)}</td></tr>`,
                        `<tr><th>gaussian std (mm)</th><td>${gaussianStd.toFixed(3)}</td></tr>`,
                        '</tbody>'
                    ].join(''))
                } else {
                    variables.beamSVGInnerHTML.assign([
                        axes(ax2),
                        xlabel(ax2, 'transverse (mm)'),
                        ylabel(ax2, 'intensity (arb. unit)'),
                        line(ax2, t, i, { lineStyle: '--' }),
                        line(ax2, [b1[1], t2[1], t1[1], b2[1]], [0, h, h, 0]),
                        line(ax2, [t1[1], t1[1]], iTick, { color: 'blue' }),
                        line(ax2, [t2[1], t2[1]], iTick, { color: 'blue' }),
                        line(ax2, [b1[1], b1[1]], iTick, { color: 'red' }),
                        line(ax2, [b2[1], b2[1]], iTick, { color: 'red' })
                    ].join(''))
                    variables.tableInnerHTML.assign([
                        '<tbody>',
                        `<tr><th>gaussian mean (mm)</th><td>${gaussianMean.toFixed(3)}</td></tr>`,
                        `<tr><th>area (arb. unit)</th><td>${areaTrap.toFixed(3)}</td></tr>`,
                        `<tr><th>gaussian area (arb. unit)</th><td>${gaussianArea.toFixed(3)}</td></tr>`,
                        `<tr><th>std (mm)</th><td>${stdTrap.toFixed(3)}</td></tr>`,
                        `<tr><th>gaussian std (mm)</th><td>${gaussianStd.toFixed(3)}</td></tr>`,
                        '</tbody>'
                    ].join(''))
                }
            }
        }
    }
}
