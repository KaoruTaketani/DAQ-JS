import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.prependListener(arg => { this._roiInPixels = arg })
        /** @type {number} */
        this._filteredNeutronCount
        variables.filteredNeutronCount.prependListener(arg => { this._filteredNeutronCount = arg })
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const [x, y, w, h] = this._roiInPixels
            const dx = this._neutronEvent.xCoordinateInPixels - x
            const dy = this._neutronEvent.yCoordinateInPixels - y
            if (dx < 1) return
            if (dx > w) return
            if (dy < 1) return
            if (dy > h) return

            variables.filteredNeutronCount.assign(this._filteredNeutronCount + 1)
            variables.filteredNeutronEvent.assign(this._neutronEvent)
        }
    }
}
