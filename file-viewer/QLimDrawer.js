import axes from '../lib/axes.js'
import xlabel from '../lib/xlabel.js'
import ylabel from '../lib/ylabel.js'
import deg2rad from '../lib/deg2rad.js'
import line from '../lib/line.js'
import linspace from '../lib/linspace.js'

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
        /** @type {string} */
        this._filmThicknessInAngstroms
        variables.filmThicknessInAngstroms.addListener(arg => {
            this._filmThicknessInAngstroms = arg
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
            if (!this._filmThicknessInAngstroms) return

            const t2 = parseFloat(this._tofMaxInMilliseconds),
                t1 = parseFloat(this._tofMinInMilliseconds),
                l2 = parseFloat(this._cameraLengthInMeters),
                l1 = parseFloat(this._moderatorToSampleDistanceInMeters),
                thetaDeg = parseFloat(this._incidentAngleInDegrees),
                qmin = parseFloat(this._qminInReciprocalAngstroms),
                qmax = parseFloat(this._qmaxInReciprocalAngstroms),
                beta1 = parseFloat(this._filmScatteringLengthDensityInSquaredReciprocalAngstroms),
                beta2 = parseFloat(this._substrateScatteringLengthDensityInSquaredReciprocalAngstroms),
                thickness = parseFloat(this._filmThicknessInAngstroms)

            if (Number.isNaN(l1) ||
                Number.isNaN(l2) ||
                Number.isNaN(t1) ||
                Number.isNaN(t2) ||
                Number.isNaN(qmin) ||
                Number.isNaN(qmax) ||
                Number.isNaN(beta1) ||
                Number.isNaN(beta2) ||
                Number.isNaN(thickness) ||
                Number.isNaN(thetaDeg)) {
                console.log('parse failed')
                return
            }
            const k1 = this.wavenumber((l1 + l2) / t1)
            const k2 = this.wavenumber((l1 + l2) / t2)
            const q1 = 2 * k1 * Math.sin(deg2rad(thetaDeg))
            const q2 = 2 * k2 * Math.sin(deg2rad(thetaDeg))
            /** @type { import('../lib/index.js').Axes } */
            const ax1 = {
                xLim: [qmin, qmax],
                yLim: [1e-5, 1.1],
                xTick: [qmin, qmax],
                yTick: [1e-5, 1e-4, 1e-3, 1e-2, 1e-1, 1],
                xTickLabel: [qmin, qmax].map(q => q.toFixed(2)),
                yTickLabel: ['1e-5', '1e-4', '1e-3', '1e-2', '1e-1', '1'],
                yScale: 'log'
            }
            const q = linspace(qmin, qmax, 100)
            const r = q.map(q => this.reflectivity(q, beta1, beta2, thickness))
            variables.reflectivitySVGInnerHTML.assign([
                axes(ax1),
                line(ax1, [q1, q1], [1e-5, 1.1]),
                line(ax1, [q2, q2], [1e-5, 1.1]),
                line(ax1, q, r),
                xlabel(ax1, 'scattering vector (1/Å)')
            ].join(''))

            const v1 = this.potential(beta1)
            const v2 = this.potential(beta2)

            /** @type { import('../lib/index.js').Axes } */
            const ax2 = {
                xLim: [-100, 1000],
                yLim: [0, 300],
                xTick: [-100, 1000],
                yTick: [0, 300],
                xTickLabel: [-100, 1000].map(q => q.toFixed()),
                yTickLabel: ['0', '300']
            }

            variables.potentialSVGInnerHTML.assign([
                axes(ax2),
                line(ax2,
                    [-100, 0, 0, thickness, thickness, 1000],
                    [0, 0, v1, v1, v2, v2]),
                xlabel(ax2, 'normal coordinate (Å)'),
                ylabel(ax2, 'potential (neV)')
            ].join(''))
        }
    }
    /**
     * @param {number} velocityInMetersPerMilliseconds 
     * @returns {number}
     */
    wavenumber(velocityInMetersPerMilliseconds) {
        // unit is 1/Å
        // see @NeutronWavenumberByVelocity
        return 1.588 * velocityInMetersPerMilliseconds
    }
    /**
     * @param {number} betaInSquaredReciprocalAngstroms 
     * @returns {number}
     */
    potential(betaInSquaredReciprocalAngstroms) {
        // unit is neV
        // see @NeutronWavenumberByVelocity
        return 2.604e7 * betaInSquaredReciprocalAngstroms
    }
    /**
     * @param {number} qInReciprocalAngstroms 
     * @param {number} scatteringLengthDensityInSquaredReciprocalAngstroms 
     * @return {number}
     */
    qi(qInReciprocalAngstroms, scatteringLengthDensityInSquaredReciprocalAngstroms) {
        // uint is 1/Å
        // see @NeutronNormalWavenumber
        const q0 = qInReciprocalAngstroms
        const beta = scatteringLengthDensityInSquaredReciprocalAngstroms
        return Math.sqrt(q0 ** 2 - 4 * Math.PI * beta)
    }
    /**
     * @param {number} qInReciprocalAngstroms 
     * @param {number} filmScatteringLengthDensityInSquaredReciprocalAngstroms
     * @param {number} substrateScatteringLengthDensityInSquaredReciprocalAngstroms
     * @param {number} filmThicknessInAngstroms
     * @returns {number}
     */
    reflectivity(qInReciprocalAngstroms, filmScatteringLengthDensityInSquaredReciprocalAngstroms, substrateScatteringLengthDensityInSquaredReciprocalAngstroms, filmThicknessInAngstroms) {
        // see @FilmOnSubstrateNeutronReflectivity
        const beta1 = filmScatteringLengthDensityInSquaredReciprocalAngstroms
        const beta2 = substrateScatteringLengthDensityInSquaredReciprocalAngstroms
        const d = filmThicknessInAngstroms
        const q = qInReciprocalAngstroms
        const q1 = this.qi(q, beta1)
        const q2 = this.qi(q, beta2)
        const c = Math.cos(d * q)
        const s = Math.sin(d * q)
        const den = c ** 2 * q ** 2 * (q1 + q2) ** 2 + s ** 2 * (q ** 2 + q1 * q2) ** 2
        const num1 = s ** 2 * q ** 4
        const num2 = c ** 2 * q ** 2 * q1 ** 2
        const num3 = 2 * c ** 2 * q ** 2 * q1 * q2
        const num4 = 2 * s ** 2 * q ** 2 * q1 * q2
        const num5 = c ** 2 * q ** 2 * q2 ** 2
        const num6 = s ** 2 * q1 ** 2 * q2 ** 2

        return (num1 + num2 + num3 - num4 + num5 + num6) / den
    }
}
