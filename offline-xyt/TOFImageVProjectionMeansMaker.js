import colon from '../lib/colon.js'
import column from '../lib/column.js'
import mean from '../lib/mean.js'
import Operator from './Operator.js'

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
                means = new Float64Array(shape[1])

            for (let i = 0; i < shape[1]; ++i) {
                // column index starts from 1
                means[i] = mean(colon(1, shape[0]), column(this._tofImageVProjectionSums, i + 1))
            }
            variables.tofImageVProjectionMeans.assign(means)
        }
    }
}
