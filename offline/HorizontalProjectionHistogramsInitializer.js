import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
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
        /** @type {number} */
        this._roiXInPixels
        variables.roiXInPixels.addListener(arg => {
            this._roiXInPixels = arg
            this._operation()
        })
        /** @type {number} */
        this._roiWidthInPixels
        variables.roiWidthInPixels.addListener(arg => {
            this._roiWidthInPixels = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofMaxInMilliseconds) return
            if (!this._miezeFrequencyInKilohertz) return
            if (!this._roiWidthInPixels) return
            if (!this._roiXInPixels) return

            const size = [
                this._tofMaxInMilliseconds * this._miezeFrequencyInKilohertz,
                this._roiWidthInPixels]//,
            // must be nanoseconds as used in maker
            // dt = this._tofMaxInMilliseconds * 1_000_000 / size[0]

            variables.horizontalProjectionHistograms.assign({
                numBins: size,
                binCounts: new Array(prod(size)).fill(0),
                xBinLimits: [0, 80],
                yBinLimits: [0, size[1]]
            })
        }
    }
}
