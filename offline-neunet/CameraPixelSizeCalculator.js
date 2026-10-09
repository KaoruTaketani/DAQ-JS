import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraImageSizeInMillimeters
        variables.cameraImageSizeInMillimeters.addListener(arg => {
            this._cameraImageSizeInMillimeters = arg
            this._operation()
        })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._neutronPositionBitLength) return
            if (!this._cameraImageSizeInMillimeters) return

            variables.cameraPixelSizeInMillimeters.assign([
                this._cameraImageSizeInMillimeters[0] / 2 ** this._neutronPositionBitLength,
                this._cameraImageSizeInMillimeters[1] / 2 ** this._neutronPositionBitLength
            ])
        }
    }
}
