import sum from '../lib/sum.js'
import prod from '../lib/prod.js'
import sub2ind from '../lib/sub2ind.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters
        variables.interpolatedTOFImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds
        variables.interpolatedTOFImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._interpolatedTOFImageVProjectionBinCounts
        variables.interpolatedTOFImageVProjectionBinCounts.addListener(arg => {
            this._interpolatedTOFImageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (sum(this._interpolatedTOFImageVProjectionBinCounts.data) === 0) return

            const originalShape = this._interpolatedTOFImageVProjectionBinCounts.shape,
                shape = [originalShape[0], originalShape[1] / this._frequencyVectorLength],
                sums = new Uint32Array(prod(shape))

            for (let i = 1; i <= shape[0]; ++i) {
                for (let j = 1; j <= shape[1]; ++j) {
                    const startIndex = sub2ind(originalShape, i, j * this._frequencyVectorLength)
                    const data = this._interpolatedTOFImageVProjectionBinCounts.data.slice(startIndex, startIndex + this._frequencyVectorLength)

                    sums[sub2ind(shape, i, j)] = sum(data)
                }
            }
            variables.interpolatedTOFImageVProjectionSums.assign({
                shape: shape,
                data: sums
            })
            variables.tofImageVProjectionSumsXLimitsInNanoseconds.assign(this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds)
            variables.tofImageVProjectionSumsYLimitsInMillimeters.assign(this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters)
        }
    }
}
