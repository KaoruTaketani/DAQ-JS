import Operator from '../13/Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'
import sub2ind from '../lib/sub2ind.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramXBinLimits
        variables.histogramXBinLimits.addListener(arg => { this._histogramXBinLimits = arg })
        this._histogramYBinLimits
        variables.histogramYBinLimits.addListener(arg => { this._histogramYBinLimits = arg })
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => { this._histogramBinCounts = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            // console.log(this._randomNumber)
            if (!isbetween(this._randomNumber[0], this._histogramXBinLimits)) return
            if (!isbetween(this._randomNumber[1], this._histogramYBinLimits)) return

            // sub2ind expects indexes to start frpm 1
            const r0 = rescale(this._randomNumber[0], this._histogramXBinLimits),
                r1 = rescale(this._randomNumber[1], this._histogramYBinLimits),
                i = sub2ind(
                    this._histogramBinCounts.shape,
                    Math.floor(r1 * this._histogramBinCounts.shape[1]) + 1,
                    Math.floor(r0 * this._histogramBinCounts.shape[0]) + 1
                )
            // console.log(`numBins: [${this._histogram.numBins}], prod: ${prod(this._histogram.numBins)}, i ${i}`)
            this._histogramBinCounts.data[i]++
            variables.histogramBinCounts.assign(this._histogramBinCounts)
        }
    }
}

