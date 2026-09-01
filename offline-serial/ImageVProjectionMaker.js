import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Uint32Array} */
        this._imageVProjectionBinCounts
        variables.imageVProjectionBinCounts.prependListener(arg => { this._imageVProjectionBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._imageVProjectionBinCounts[
                this._neutronEvent.xCoordinateInPixels 
            ]++
        }
    }
}
