import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._cameraLengthInMeters
        variables.cameraLengthInMeters.prependListener(arg => { this._cameraLengthInMeters = arg })
        /** @type {number} */
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.prependListener(arg => { this._miezeFrequencyInKilohertz = arg })
        /** @type {number[]} */
        this._wavelengthInAngstroms
        variables.wavelengthInAngstroms.addListener(arg => {
            this._wavelengthInAngstroms = arg
            this._operation()
        })
        this._operation = () => {
            const fourierTime = new Array(this._wavelengthInAngstroms.length).fill(0).map((_, i) => {
                /** see @MIEZETime */
                const lambda = this._wavelengthInAngstroms[i]
                const nu = this._miezeFrequencyInKilohertz
                const L = this._cameraLengthInMeters

                return 0.0063896926 * L * nu * lambda ** 3
            })
            variables.fourierTimeInPicoseconds.assign(fourierTime)
        }
    }
}
