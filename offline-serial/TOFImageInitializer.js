import Operator from './Operator.js'
import { getHeapStatistics } from 'v8'
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
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.addListener(arg => {
            this._roiInPixels = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofMaxInMilliseconds) return
            if (!this._roiInPixels) return

            const [_x, _y, w, h] = this._roiInPixels,
                size = [
                    this._tofMaxInMilliseconds,
                    h,
                    w],
                length = prod(size)//,
            // must be nanoseconds as used in maker
            //dt = size[0] * 1_000_000 / size[0]

            console.log(`t: ${size[0]}, h: ${size[1]}, w: ${size[2]} memory: ${(8 * length).toLocaleString()} bytes, heap_limit: ${getHeapStatistics().heap_size_limit.toLocaleString()} bytes`)

                ,
                variables.tofImageXBinLimitsInPixels.assign([0, w])
            variables.tofImageYBinLimitsInPixels.assign([0, h])
            variables.tofImageZBinLimitsInNanoseconds.assign([0, this._tofMaxInMilliseconds * 1_000_000])
            variables.tofImage.assign({
                shape: size,
                data: new Uint16Array(length)
            })
        }
    }
}
