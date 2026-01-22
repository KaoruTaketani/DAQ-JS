import Operator from './Operator.js'

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
            variables.verticalProjection.assign({
                binLimits: [0, 2 ** this._neutronPositionBitLength],
                binCounts: new Uint32Array(2 ** this._neutronPositionBitLength)
            })
        }
    }
}
