import Operator from './Operator.js'
import prod from '../lib/prod.js'
import setColumn from '../lib/setColumn.js'
import getColumn from '../lib/getColumn.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofImageVProjectionBinCounts
        variables.tofImageVProjectionBinCounts.prependListener(arg => { this._tofImageVProjectionBinCounts = arg })
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionYBinLimitsInMillimeters
        variables.tofImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._tofImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionXBinLimitsInNanoseconds
        variables.tofImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {number[]} */
        this._trimmedLimitsInMillimeters
        variables.trimmedLimitsInMillimeters.addListener(arg => {
            this._trimmedLimitsInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            const dx = this._cameraPixelSizeInMillimeters[0]
            const oldLim = this._tofImageVProjectionYBinLimitsInMillimeters
            const newLim = this._trimmedLimitsInMillimeters
            const offsetMin = (newLim[0] - oldLim[0])
            const offsetMax = (newLim[1] - oldLim[0])
            const indexMin = offsetMin / dx
            const indexMax = offsetMax / dx
            if (!Number.isInteger(indexMin) || !Number.isInteger(indexMax)) {
                throw new Error('trimmed limits should be divided ty pixel size')
            }

            const trimmedShape = [indexMax - indexMin, this._tofImageVProjectionBinCounts.shape[1]]
            console.log(`indexLim: ${[indexMin, indexMax]}, trimmedShape: ${trimmedShape}`)
            /** @type {import('../lib/index.js').Uint32NDArray} */
            const trimmedBinCounts = {
                shape: trimmedShape,
                data: new Uint32Array(prod(trimmedShape))
            }
            trimmedBinCounts.data.set(this._tofImageVProjectionBinCounts.data.slice(indexMin * this._tofImageVProjectionBinCounts.shape[1], prod(trimmedShape)))

            variables.trimmedTOFImageVProjectionXBinLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            variables.trimmedTOFImageVProjectionYBinLimitsInMillimeters.assign(this._trimmedLimitsInMillimeters)
            variables.trimmedTOFImageVProjectionBinCounts.assign(trimmedBinCounts)
        }
    }
}
