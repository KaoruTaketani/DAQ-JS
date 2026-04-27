import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._imageBinWidthInMillimeters
        variables.imageBinWidthInMillimeters.prependListener(arg => { this._imageBinWidthInMillimeters = arg })
        /** @type {number} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.addListener(arg => {
            this._tofMaxInMilliseconds = arg
            this._operation()
        })
        /** @type {number} */
        this._miezeFrequencyInKilohertz
        variables.miezeFrequencyInKilohertz.addListener(arg => {
            this._miezeFrequencyInKilohertz = arg
            this._operation()
        })
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.addListener(arg => {
            this._roiInPixels = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofMaxInMilliseconds) return
            if (!this._miezeFrequencyInKilohertz) return
            if (!this._roiInPixels) return

            const [x, _y, w, _h] = this._roiInPixels,
                size = [
                    this._tofMaxInMilliseconds * this._miezeFrequencyInKilohertz,
                    w]

            variables.horizontalProjectionHistogramsXBinLimitsInMillimeters.assign([x, x + w].map(v => v * this._imageBinWidthInMillimeters))
            variables.horizontalProjectionHistogramsYBinLimitsInNanoseconds.assign([0, this._tofMaxInMilliseconds * 1_000_000])
            variables.horizontalProjectionHistogramsBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
