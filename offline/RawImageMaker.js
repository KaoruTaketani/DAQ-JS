import Operator from './Operator.js'
import sub2ind from './sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram2D} */
        this._rawImage
        variables.rawImage.prependListener(arg => { this._rawImage = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._rawImage.binCounts[sub2ind(
                this._rawImage.numBins,
                this._neutronEvent.y,
                this._neutronEvent.x
            )]++
        }
    }
}
