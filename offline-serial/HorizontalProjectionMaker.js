import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Uint32Array} */
        this._horizontalProjectionBinCounts
        variables.horizontalProjectionBinCounts.prependListener(arg => { this._horizontalProjectionBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._horizontalProjectionBinCounts[
                this._neutronEvent.xCoordinateInPixels 
            ]++
        }
    }
}
