import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._rawImageBinCounts
        variables.rawImageBinCounts.prependListener(arg => { this._rawImageBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._rawImageBinCounts.data[sub2ind(
                this._rawImageBinCounts.shape,
                this._neutronEvent.yCoordinateInPixels,
                this._neutronEvent.xCoordinateInPixels
            )]++
        }
    }
}
