import sum from '../lib/sum.js'
import prod from '../lib/prod.js'
import sub2ind from '../lib/sub2ind.js'
import Operator from './Operator.js'
import fft0 from '../lib/fft0.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._tofImageVProjectionYBinLimitsInMillimeters
        variables.tofImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._tofImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionXBinLimitsInNanoseconds
        variables.tofImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofImageVProjectionBinCounts
        variables.tofImageVProjectionBinCounts.addListener(arg => {
            this._tofImageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (sum(this._tofImageVProjectionBinCounts.data) === 0) return

            const originalShape = this._tofImageVProjectionBinCounts.shape,
                shape = [originalShape[0], originalShape[1] / this._frequencyVectorLength],
                contrasts = new Float64Array(prod(shape))

            for (let i = 1; i <= shape[0]; ++i) {
                for (let j = 1; j <= shape[1]; ++j) {
                    const startIndex = sub2ind(originalShape, i, j * this._frequencyVectorLength)
                    const data = this._tofImageVProjectionBinCounts.data.slice(startIndex, startIndex + this._frequencyVectorLength)

                    const 
                        [x, y] = fft0(data),
                        b = sum(data)

                    // may be useful not to include NaN into hdf5 files for later use
                    contrasts[sub2ind(shape, i, j)]= b === 0 ? 1 : 2 * Math.hypot(x, y) / b                    
                }
            }
            variables.tofImageVProjectionContrasts.assign({
                shape: shape,
                data: contrasts
            })
            variables.tofImageVProjectionContrastsXLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            variables.tofImageVProjectionContrastsYLimitsInMillimeters.assign(this._tofImageVProjectionYBinLimitsInMillimeters)
        }
    }
}
