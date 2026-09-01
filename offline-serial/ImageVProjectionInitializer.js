import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraImageSizeInMillimeters
        variables.cameraImageSizeInMillimeters.prependListener(arg => { this._cameraImageSizeInMillimeters = arg })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            variables.imageVProjectionBinLimitsInMillimeters.assign([0, this._cameraImageSizeInMillimeters[0]])
            variables.imageVProjectionBinCounts.assign(
                new Uint32Array(2 ** this._neutronPositionBitLength)
            )
        }
    }
}
