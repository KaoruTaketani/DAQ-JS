import Operator from './Operator.js'
import mean from '../lib/mean.js'
import diff from '../lib/diff.js'
import colon from '../lib/colon.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[} */
        this._imageVProjectionBinLimitsInMillimeters
        variables.imageVProjectionBinLimitsInMillimeters.prependListener(arg => { this._imageVProjectionBinLimitsInMillimeters = arg })
        /** @type {Uint32Array} */
        this._imageVProjectionBinCounts
        variables.imageVProjectionBinCounts.addListener(arg => {
            this._imageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            const dx = diff(this._imageVProjectionBinLimitsInMillimeters)[0]
                / this._imageVProjectionBinCounts.length
            const binCenters = colon(
                this._imageVProjectionBinLimitsInMillimeters[0] + dx / 2,
                dx,
                this._imageVProjectionBinLimitsInMillimeters[1] - dx / 2
            )
            console.log(
                this._imageVProjectionBinLimitsInMillimeters[0] + dx / 2,
                dx,
                this._imageVProjectionBinLimitsInMillimeters[1] - dx / 2
            )
            console.log(binCenters.length, this._imageVProjectionBinCounts.length)
            variables.imageVProjectionMeanInMillimeters.assign(mean(binCenters, this._imageVProjectionBinCounts))
        }
    }
}
