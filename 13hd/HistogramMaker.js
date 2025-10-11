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
        this._histogram
        variables.histogram.addListener(arg => { this._histogram = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            // console.log(this._randomNumber)
            if (!isbetween(this._randomNumber[0], this._histogram.xBinLimits)) return
            if (!isbetween(this._randomNumber[1], this._histogram.yBinLimits)) return

            // sub2ind expects indexes to start frpm 1
            const r0 = rescale(this._randomNumber[0], this._histogram.xBinLimits),
                r1 = rescale(this._randomNumber[1], this._histogram.yBinLimits),
                i = sub2ind(
                    this._histogram.numBins,
                    Math.floor(r1 * this._histogram.numBins[1]) + 1,
                    Math.floor(r0 * this._histogram.numBins[0]) + 1
                )
                // console.log(`numBins: [${this._histogram.numBins}], prod: ${prod(this._histogram.numBins)}, i ${i}`)
            this._histogram.binCounts[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}

