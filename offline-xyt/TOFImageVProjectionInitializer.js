import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.addListener(arg => {
            this._frequencyVectorLength = arg
            this._operation()
        })
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
            if (!this._frequencyVectorLength) return

            const cycleInMilliseconds = 1 / this._miezeFrequencyInKilohertz
            const binWidthInMillisecond = cycleInMilliseconds / this._frequencyVectorLength
            const numBins = Math.ceil(this._tofMaxInMilliseconds / binWidthInMillisecond)

            const [x, _y, w, _h] = this._roiInPixels,
                size = [w, numBins]
            variables.tofImageVProjectionYBinLimitsInMillimeters.assign([x, x + w].map(v => v * this._cameraPixelSizeInMillimeters[0]))
            variables.tofImageVProjectionXBinLimitsInNanoseconds.assign([0, this._tofMaxInMilliseconds * 1_000_000])
            variables.tofImageVProjectionBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
