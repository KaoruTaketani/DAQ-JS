import { ok } from 'assert'
import Operator from './Operator.js'
import deg2rad from './deg2rad.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._incidentAngleInDegrees
        variables.incidentAngleInDegrees.prependListener(arg => {
            this._incidentAngleInDegrees = arg
            this._operation()
        })
        /** @type {number[]} */
        this._wavelengthInAngstroms
        variables.wavelengthInAngstroms.addListener(arg => {
            this._wavelengthInAngstroms = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._incidentAngleInDegrees) return
            if (!this._wavelengthInAngstroms) return

            const q = new Array(this._wavelengthInAngstroms.length).fill(0).map((_, i) => {
                /** see @MomentumTransferAmplitude */
                const lambda = this._wavelengthInAngstroms[i]
                const theta = deg2rad(this._incidentAngleInDegrees)
                return 4 * Math.PI * Math.sin(theta) / lambda
            })
            variables.momentumTransferInInverseAngstroms.assign(q)
        }
    }
}
