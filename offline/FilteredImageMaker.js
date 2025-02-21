import Operator from './Operator.js'
import sub2ind from './sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram2D} */
        this._filteredImage
        variables.filteredImage.prependListener(arg => { this._filteredImage = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._filteredImage.binCounts[sub2ind(
                this._filteredImage.size, 
                this._filteredNeutronEvent.y - this._filteredImage.yBinLimits[0],
                this._filteredNeutronEvent.x - this._filteredImage.xBinLimits[0]
            )]++
        }
    }
}
