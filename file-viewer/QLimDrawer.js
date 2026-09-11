import axes from '../lib/axes.js'
import xlabel from '../lib/xlabel.js'
import deg2rad from '../lib/deg2rad.js'
import line from '../lib/line.js'

export default class {
    /**
     * @param {import('./QLimVariables.js').default} variables 
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
        this._qmaxInReciprocalAngstroms
        variables.qmaxInReciprocalAngstroms.addListener(arg => {
            this._qmaxInReciprocalAngstroms = arg
            this._operation()
        })
        /** @type {string} */
        this._qminInReciprocalAngstroms
        variables.qminInReciprocalAngstroms.addListener(arg => {
            this._qminInReciprocalAngstroms = arg
            this._operation()
        })
        /** @type {string} */
        this._filmScatteringLengthDensityInSquaredReciprocalAngstroms
        variables.filmScatteringLengthDensityInSquaredReciprocalAngstroms.addListener(arg => {
            this._filmScatteringLengthDensityInSquaredReciprocalAngstroms = arg
            this._operation()
        })
        /** @type {string} */
        this._substrateScatteringLengthDensityInSquaredReciprocalAngstroms
        variables.substrateScatteringLengthDensityInSquaredReciprocalAngstroms.addListener(arg => {
            this._substrateScatteringLengthDensityInSquaredReciprocalAngstroms = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofMaxInMilliseconds) return
            if (!this._tofMinInMilliseconds) return
            if (!this._cameraLengthInMeters) return
            if (!this._moderatorToSampleDistanceInMeters) return
            if (!this._incidentAngleInDegrees) return
            if (!this._qminInReciprocalAngstroms) return
            if (!this._qmaxInReciprocalAngstroms) return
            if (!this._filmScatteringLengthDensityInSquaredReciprocalAngstroms) return
            if (!this._substrateScatteringLengthDensityInSquaredReciprocalAngstroms) return

            const t2 = parseFloat(this._tofMaxInMilliseconds),
                t1 = parseFloat(this._tofMinInMilliseconds),
                l2 = parseFloat(this._cameraLengthInMeters),
                l1 = parseFloat(this._moderatorToSampleDistanceInMeters),
                thetaDeg = parseFloat(this._incidentAngleInDegrees),
                qmin = parseFloat(this._qminInReciprocalAngstroms),
                qmax = parseFloat(this._qmaxInReciprocalAngstroms),
                beta1 = parseFloat(this._filmScatteringLengthDensityInSquaredReciprocalAngstroms),
                beta2 = parseFloat(this._substrateScatteringLengthDensityInSquaredReciprocalAngstroms)

            if (Number.isNaN(l1) ||
                Number.isNaN(l2) ||
                Number.isNaN(t1) ||
                Number.isNaN(t2) ||
                Number.isNaN(qmin) ||
                Number.isNaN(qmax) ||
                Number.isNaN(beta1) ||
                Number.isNaN(beta2) ||
                Number.isNaN(thetaDeg)) {
                console.log('parse failed')
                return
            }
            const k1 = this.wavenumber((l1 + l2) / t1)
            const k2 = this.wavenumber((l1 + l2) / t2)
            const q1 = 2 * k1 * Math.sin(deg2rad(thetaDeg))
            const q2 = 2 * k2 * Math.sin(deg2rad(thetaDeg))
            /** @type { import('../lib/index.js').Axes } */
            const ax = {
                xLim: [qmin, qmax],
                yLim: [1e-5, 1.1],
                xTick: [qmin, qmax],
                yTick: [1e-5,1],
                xTickLabel: [qmin, qmax].map(q => q.toFixed(2)),
                yTickLabel: ['1e-5','1'],
                yScale: 'log'
            }

            variables.svgInnerHTML.assign([
                axes(ax),
                line(ax, [q1, q1], [1e-5, 1.1]),
                line(ax, [q2, q2], [1e-5, 1.1]),
                xlabel(ax, 'momentum transfer (1/Å)')
            ].join(''))
        }
    }
    /**
     * @param {number} velocityInMetersPerMilliseconds 
     * @returns {number}
     */
    wavenumber(velocityInMetersPerMilliseconds) {
        // @NeutronWavenumberByVelocity
        return 1.588 * velocityInMetersPerMilliseconds
    }
}
