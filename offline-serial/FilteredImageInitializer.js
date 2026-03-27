import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.addListener(arg => {
            this._roiInPixels = arg
            this._operation()
        })
        this._operation = () => {
            const [x, y, w, h] = this._roiInPixels

            const size = [h, w]

            variables.filteredImageXBinLimitsInPixels.assign([x, x + w])
            variables.filteredImageYBinLimitsInPixels.assign([y, y + h])
            variables.filteredImageBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
