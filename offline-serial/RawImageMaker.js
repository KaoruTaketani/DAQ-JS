import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32Dataset} */
        this._rawImage
        variables.rawImageBinCounts.prependListener(arg => { this._rawImage = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            // sub2ind expects indexes to start frpm 1
            this._rawImage.data[sub2ind(
                this._rawImage.shape,
                this._neutronEvent.yCoordinateInPixels + 1,
                this._neutronEvent.xCoordinateInPixels + 1
            )]++
        }
    }
}
