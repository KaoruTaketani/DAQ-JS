import Operator from './Operator.js'
import { getHeapStatistics } from 'v8'
import prod from './prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._detectorHeightInMillimeters
        variables.detectorHeightInMillimeters.addListener(arg => {
            this._detectorHeightInMillimeters = arg
            this._operation()
        })
        /** @type {number} */
        this._detectorWidthInMillimeters
        variables.detectorWidthInMillimeters.addListener(arg => {
            this._detectorWidthInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._detectorHeightInMillimeters) return
            if (!this._detectorWidthInMillimeters) return

            const size = [1024, 1024],
                length = prod(size)
           
            variables.image.assign({
                xBinLimits: [0, this._detectorWidthInMillimeters],
                yBinLimits: [0, this._detectorHeightInMillimeters],
                size: size,
                binCounts: new Array(length).fill(0)
            })
        }
    }
}
