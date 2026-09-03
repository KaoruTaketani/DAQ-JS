import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._imageBinCounts
        variables.imageBinCounts.prependListener(arg => { this._imageBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._imageBinCounts.data[sub2ind(
                this._imageBinCounts.shape,
                this._neutronEvent.yCoordinateInPixels,
                this._neutronEvent.xCoordinateInPixels
            )]++
        }
    }
}
