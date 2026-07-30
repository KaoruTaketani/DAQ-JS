import axes from '../lib/axes.js'
import bounds from '../lib/bounds.js'
import colon from '../lib/colon.js'
import line from '../lib/line.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import deg2rad from '../lib/deg2rad.js'
import linspace from '../lib/linspace.js'

export default class {
    /**
     * @param {import('./QRangeVariables.js').default} variables 
     */
    constructor(variables) {
        /** @type {string} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.addListener(arg => {
            this._tofMaxInMilliseconds = arg
            this._operation()
        })
        /** @type {string} */
        this._tofMinInMilliseconds
        variables.tofMinInMilliseconds.addListener(arg => {
            this._tofMinInMilliseconds = arg
            this._operation()
        })
        /** @type {string} */
        this._cameraLengthInMeters
        variables.cameraLengthInMeters.addListener(arg => {
            this._cameraLengthInMeters = arg
            this._operation()
        })
        /** @type {string} */
        this._moderatorToSampleDistanceInMeters
        variables.moderatorToSampleDistanceInMeters.addListener(arg => {
            this._moderatorToSampleDistanceInMeters = arg
            this._operation()
        })
        /** @type {string} */
        this._incidentAngleInDegrees
        variables.incidentAngleInDegrees.addListener(arg => {
            this._incidentAngleInDegrees = arg
            this._operation()
        })
        /** @type {string} */
        this._cameraWidthInMillimeters
        variables.cameraWidthInMillimeters.addListener(arg => {
            this._cameraWidthInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._cameraWidthInMillimeters) return
            if (!this._tofMaxInMilliseconds) return
            if (!this._tofMinInMilliseconds) return
            if (!this._cameraLengthInMeters) return
            if (!this._moderatorToSampleDistanceInMeters) return
            if (!this._incidentAngleInDegrees) return

            const t2 = parseFloat(this._tofMaxInMilliseconds),
                t1 = parseFloat(this._tofMinInMilliseconds),
                l2 = parseFloat(this._cameraLengthInMeters),
                l1 = parseFloat(this._moderatorToSampleDistanceInMeters),
                thetaDeg = parseFloat(this._incidentAngleInDegrees),
                cw = parseFloat(this._cameraWidthInMillimeters)

            if (Number.isNaN(l1) ||
                Number.isNaN(l2) ||
                Number.isNaN(t1) ||
                Number.isNaN(t2) ||
                Number.isNaN(cw) ||
                Number.isNaN(thetaDeg)) {
                console.log('parse failed')
                return
            }

            const xTick = colon(-1, 1, 3),
                zTick = colon(-0.1, 0.05, 0.1),
                ax = {
                    xLim: bounds(xTick),
                    yLim: bounds(zTick),
                    xTick: xTick,
                    yTick: zTick,
                    xTickLabel: xTick.map(v => v.toFixed()),
                    yTickLabel: zTick.map(v => v.toFixed(2))
                }

            const thetaRad = deg2rad(thetaDeg),
                cost = Math.cos(thetaRad),
                sint = Math.sin(thetaRad),
                cwm = cw * 0.001, // camera width in meters
                ccx = l2 * cost, // camera coordinate x
                ccz = l2 * sint, //camera coordinate z
                phiRad = cwm / 2 / l2, // acceptable angle
                ws = 0.0762 // substrate width in meters

            variables.sampleWidthInMillimeters.assign((ws * 1_000).toFixed())
            variables.setupSVGInnerHTML.assign([
                axes(ax),
                xlabel(ax, 'longitudinal (m)'),
                ylabel(ax, 'transverse (m)'),
                line(ax, [ccx + cwm / 2 * sint, ccx - cwm / 2 * sint], [ccz - cwm / 2 * cost, ccz + cwm / 2 * cost]),//camera
                line(ax, [-1, 0, ccx], [Math.tan(thetaRad), 0, ccz]),
                line(ax, [-ws / 2, ws / 2], [0, 0])//sample
            ].join(''))

            // see @NeutronWavelengthByTimeOfFlight
            const w1 = 3.956 * t1 / (l1 + l2),
                w2 = 3.956 * t2 / (l1 + l2)

            variables.wavelengthMinInAngstroms.assign(w1.toFixed(2))
            variables.wavelengthMaxInAngstroms.assign(w2.toFixed(2))

            const qxTick = colon(-0.0025, 0.0005, 0.001),
                qzTick = colon(0, 0.05, 0.20)
            const ax2 = {
                xLim: bounds(qxTick),
                yLim: bounds(qzTick),
                xTick: qxTick,
                yTick: qzTick,
                xTickLabel: qxTick.map(t => t.toFixed(4)),
                yTickLabel: qzTick.map(y => y.toFixed(2))
            }
            const
                qx1 = linspace(w1, w2).map(w => this.qx(thetaRad, thetaRad + phiRad, w)),
                qz1 = linspace(w1, w2).map(w => this.qz(thetaRad, thetaRad + phiRad, w)),
                //
                qx2 = linspace(w1, w2).map(w => this.qx(thetaRad, thetaRad - phiRad, w)),
                qz2 = linspace(w1, w2).map(w => this.qz(thetaRad, thetaRad - phiRad, w)),
                //
                qx3 = linspace(-phiRad, phiRad).map(p => this.qx(thetaRad, thetaRad + p, w1)),
                qz3 = linspace(-phiRad, phiRad).map(p => this.qz(thetaRad, thetaRad + p, w1)),
                //
                qx4 = linspace(-phiRad, phiRad).map(p => this.qx(thetaRad, thetaRad + p, w2)),
                qz4 = linspace(-phiRad, phiRad).map(p => this.qz(thetaRad, thetaRad + p, w2))
            //
            // line(ax,qx1,qz1)
            variables.beamSVGInnerHTML.assign([
                axes(ax2),
                xlabel(ax2, 'Qx (1/Å)'),
                ylabel(ax2, 'Qz (1/Å)'),
                line(ax2, qx1, qz1),
                line(ax2, qx2, qz2),
                line(ax2, qx3, qz3),
                line(ax2, qx4, qz4)
            ].join(''))
        }
    }
    /**
     * @param {number} i 
     * @param {number} e 
     * @param {number} w 
     * @returns {number}
     */
    qx(i, e, w) {
        return Math.PI / w * (i - e) * (i + e)
    }
    /**
     * @param {number} i 
     * @param {number} e 
     * @param {number} w 
     * @returns {number}
     */
    qz(i, e, w) {
        return 2 * Math.PI / w * (e + i)
    }
}
