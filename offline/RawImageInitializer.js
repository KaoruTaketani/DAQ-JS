import Operator from './Operator.js'
import prod from './prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.addListener(arg => {
            this._neutronPositionBitLength = arg
            this._operation()
        })
        this._operation = () => {
            const size = [
                2 ** this._neutronPositionBitLength,
                2 ** this._neutronPositionBitLength],
                length = prod(size)

            variables.rawImage.assign({
                numBins: size,
                binCounts: new Array(length).fill(0),
                binWidth: [1, 1]
            })
        }
    }
}
