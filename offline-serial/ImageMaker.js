import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Histogram2D} */
        this._image
        variables.image.prependListener(arg => { this._image = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            // sub2ind expects indexes to start frpm 1
            this._image.binCounts[sub2ind(
                this._image.numBins,
                this._neutronEvent.yCoordinateInPixels + 1,
                this._neutronEvent.xCoordinateInPixels + 1
            )]++
        }
    }
}
