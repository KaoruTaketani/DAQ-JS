import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiXInPixels
        variables.roiXInPixels.prependListener(arg => { this._roiXInPixels = arg })
        /** @type {number} */
        this._roiYInPixels
        variables.roiYInPixels.prependListener(arg => { this._roiYInPixels = arg })
        /** @type {number} */
        this._roiWidthInPixels
        variables.roiWidthInPixels.prependListener(arg => { this._roiWidthInPixels = arg })
        /** @type {number} */
        this._roiHeightInPixels
        variables.roiHeightInPixels.prependListener(arg => { this._roiHeightInPixels = arg })
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const dx = this._neutronEvent.x - this._roiXInPixels
            const dy = this._neutronEvent.y - this._roiYInPixels
            if (dx < 1) return
            if (dx > this._roiWidthInPixels) return
            if (dy < 1) return
            if (dy > this._roiHeightInPixels) return

            variables.filteredNeutronEvent.assign(this._neutronEvent)
        }
    }
}
