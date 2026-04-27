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
        variables.neutronPositionMaxInMillimeters.prependListener(arg => { this._neutronPositionMaxInMillimeters = arg })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            const size = [
                2 ** this._neutronPositionBitLength,
                2 ** this._neutronPositionBitLength]

            variables.rawImageXBinLimitsInMillimeters.assign([0, this._neutronPositionMaxInMillimeters])
            variables.rawImageYBinLimitsInMillimeters.assign([0, this._neutronPositionMaxInMillimeters])

            variables.rawImageBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
