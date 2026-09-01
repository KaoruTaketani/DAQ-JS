import colon from '../lib/colon.js'
import Operator from './Operator.js'
import std from '../lib/std.js'
import column from '../lib/column.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofImageVProjectionSums
        variables.tofImageVProjectionSums.addListener(arg => {
            this._tofImageVProjectionSums = arg
            this._operation()
        })
        this._operation = () => {
            const shape = this._tofImageVProjectionSums.shape,
                stds = new Float64Array(shape[1])

            for (let i = 0; i < shape[1]; ++i) {
                // column index starts from 1
                stds[i] = std(colon(1, shape[0]), column(this._tofImageVProjectionSums, i + 1))
            }

            variables.tofImageVProjectionStandardDeviations.assign(stds)
        }
    }
}
