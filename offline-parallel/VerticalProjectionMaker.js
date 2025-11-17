import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Histogram} */
        this._verticalProjection
        variables.verticalProjection.prependListener(arg => { this._verticalProjection = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            // sub2ind expects indexes to start frpm 1
            this._verticalProjection.binCounts[
                this._neutronEvent.yPositionInPixels + 1
            ]++
        }
    }
}
