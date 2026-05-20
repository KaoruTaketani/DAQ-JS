import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionMaxInMillimeters
        variables.neutronPositionMaxInMillimeters.prependListener(arg => { this._neutronPositionMaxInMillimeters = arg })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            variables.verticalProjectionBinLimitsInMillimeters.assign([0, this._neutronPositionMaxInMillimeters])
            variables.verticalProjectionBinCounts.assign(
                new Uint32Array(2 ** this._neutronPositionBitLength)
            )
        }
    }
}
