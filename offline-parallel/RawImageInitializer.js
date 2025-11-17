import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('worker_threads').MessagePort} */
        this._rawImagePort
        variables.rawImagePort.prependListener(arg => { this._rawImagePort = arg })
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

            variables.rawImage.assign({
                numBins: size,
                binCounts: new Array(prod(size)).fill(0),
                xBinLimits: [0, 2 ** this._neutronPositionBitLength],
                yBinLimits: [0, 2 ** this._neutronPositionBitLength]
            })
            this._rawImagePort.postMessage({
                numBins: size,
                binCounts: new Array(prod(size)).fill(0),
                xBinLimits: [0, 2 ** this._neutronPositionBitLength],
                yBinLimits: [0, 2 ** this._neutronPositionBitLength]
            })
        }
    }
}
