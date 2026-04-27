import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionMaxInMillimeters
        variables.neutronPositionMaxInMillimeters.addListener(arg => {
            this._neutronPositionMaxInMillimeters = arg
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
            if (!this._neutronPositionMaxInMillimeters) return

            variables.imageBinWidthInMillimeters.assign(
                this._neutronPositionMaxInMillimeters
                / 2 ** this._neutronPositionBitLength
            )
        }
    }
}
