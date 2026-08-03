import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraSizeInMillimeters
        variables.cameraSizeInMillimeters.addListener(arg => {
            this._cameraSizeInMillimeters = arg
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
            if (!this._cameraSizeInMillimeters) return

            variables.cameraPixelSizeInMillimeters.assign([
                this._cameraSizeInMillimeters[0] / 2 ** this._neutronPositionBitLength,
                this._cameraSizeInMillimeters[1] / 2 ** this._neutronPositionBitLength
            ])
        }
    }
}
