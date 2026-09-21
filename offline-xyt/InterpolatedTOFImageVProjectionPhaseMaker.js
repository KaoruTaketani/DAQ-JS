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
        this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters
        variables.interpolatedTOFImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds
        variables.interpolatedTOFImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._interpolatedTOFImageVProjectionBinCounts
        variables.interpolatedTOFImageVProjectionBinCounts.addListener(arg => {
            this._interpolatedTOFImageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._interpolatedTOFImageVProjectionBinCounts) return
            if (sum(this._interpolatedTOFImageVProjectionBinCounts.data) === 0) return

            const originalShape = this._interpolatedTOFImageVProjectionBinCounts.shape,
                shape = [originalShape[0], originalShape[1] / this._frequencyVectorLength],
                phases = new Float64Array(prod(shape))

            for (let i = 1; i <= shape[0]; ++i) {
                for (let j = 1; j <= shape[1]; ++j) {
                    const startIndex = sub2ind(originalShape, i, j * this._frequencyVectorLength)
                    const data = this._interpolatedTOFImageVProjectionBinCounts.data.slice(startIndex, startIndex + this._frequencyVectorLength)

                    const [x, y] = fft0(data)

                    // offset Pi to set the result from [-Pi,Pi] to [0,2*Pi]
                    phases[sub2ind(shape, i, j)] = Math.atan2(y, x) + Math.PI
                }
            }
            variables.interpolatedTOFImageVProjectionPhases.assign({
                shape: shape,
                data: phases
            })
            variables.interpolatedTOFImageVProjectionPhasesXLimitsInNanoseconds.assign(this._interpolatedTOFImageVProjectionXBinLimitsInNanoseconds)
            variables.interpolatedTOFImageVProjectionPhasesYLimitsInMillimeters.assign(this._interpolatedTOFImageVProjectionYBinLimitsInMillimeters)
        }
    }
}
