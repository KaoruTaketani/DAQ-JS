import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiX
        variables.roiX.prependListener(arg => { this._roiX = arg })
        /** @type {number} */
        this._roiY
        variables.roiY.prependListener(arg => { this._roiY = arg })
        /** @type {number} */
        this._roiWidth
        variables.roiWidth.prependListener(arg => { this._roiWidth = arg })
        /** @type {number} */
        this._roiHeight
        variables.roiHeight.prependListener(arg => { this._roiHeight = arg })
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const dx = this._neutronEvent.x - this._roiX
            const dy = this._neutronEvent.y - this._roiY
            if (dx < 1) return
            if (dx > this._roiWidth) return
            if (dy < 1) return
            if (dy > this._roiHeight) return

            variables.filteredNeutronEvent.assign(this._neutronEvent)
        }
    }
}
