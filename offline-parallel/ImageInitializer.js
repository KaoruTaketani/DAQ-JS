import Operator from './Operator.js'
import prod from '../lib/prod.js'

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
                2 ** this._neutronPositionBitLength]

            variables.image.assign({
                numBins: size,
                binCounts: new Uint32Array(prod(size)),
                xBinLimits: [0, 2 ** this._neutronPositionBitLength],
                yBinLimits: [0, 2 ** this._neutronPositionBitLength]
            })
            variables.imageWorker.broadcast({
                numBins: size,
                binCounts: new Uint32Array(prod(size)),
                xBinLimits: [0, 2 ** this._neutronPositionBitLength],
                yBinLimits: [0, 2 ** this._neutronPositionBitLength]
            })
        }
    }
}
