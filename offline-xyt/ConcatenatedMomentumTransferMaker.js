import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._lowIncidentAngleMomentumTransferInInverseAngstroms
        variables.lowIncidentAngleMomentumTransferInInverseAngstroms.prependListener(arg => { this._lowIncidentAngleMomentumTransferInInverseAngstroms = arg })
        /** @type {Float64Array|undefined} */
        this._momentumTransferInInverseAngstroms
        variables.momentumTransferInInverseAngstroms.addListener(arg => {
            this._momentumTransferInInverseAngstroms = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._momentumTransferInInverseAngstroms) return

            if (!this._lowIncidentAngleMomentumTransferInInverseAngstroms) {
                variables.concatenatedMomentumTransferInReciprocalAngstroms.assign(undefined)
            } else {
                const n1 = this._lowIncidentAngleMomentumTransferInInverseAngstroms.length
                const n2 = this._momentumTransferInInverseAngstroms.length
                const c = new Float64Array(n1 + n2)
                c.set(this._lowIncidentAngleMomentumTransferInInverseAngstroms)
                c.set(this._momentumTransferInInverseAngstroms, n1)
                variables.concatenatedMomentumTransferInReciprocalAngstroms.assign(c)
            }
        }
    }
}
