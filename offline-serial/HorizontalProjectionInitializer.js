import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraSizeInMillimeters
        variables.cameraSizeInMillimeters.prependListener(arg => { this._cameraSizeInMillimeters = arg })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            variables.horizontalProjectionBinLimitsInMillimeters.assign([0, this._cameraSizeInMillimeters[0]])
            variables.horizontalProjectionBinCounts.assign(
                new Uint32Array(2 ** this._neutronPositionBitLength)
            )
        }
    }
}
