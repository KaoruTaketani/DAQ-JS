import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms
        variables.smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms.prependListener(arg => { this._smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms = arg })
        /** @type {Float64Array|undefined} */
        this._scatteringVectorMagnitudeTransferInInverseAngstroms
        variables.scatteringVectorMagnitudeTransferInInverseAngstroms.addListener(arg => {
            this._scatteringVectorMagnitudeTransferInInverseAngstroms = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._scatteringVectorMagnitudeTransferInInverseAngstroms) return

            if (!this._smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms) {
                variables.concatenatedScatteringVectorMagnitudeInReciprocalAngstroms.assign(undefined)
            } else {
                const n1 = this._smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms.length
                const n2 = this._scatteringVectorMagnitudeTransferInInverseAngstroms.length
                const c = new Float64Array(n1 + n2)
                c.set(this._smallIncidenceAngleScatteringVectorMagnitudeInInverseAngstroms)
                c.set(this._scatteringVectorMagnitudeTransferInInverseAngstroms, n1)
                variables.concatenatedScatteringVectorMagnitudeInReciprocalAngstroms.assign(c)
            }
        }
    }
}
