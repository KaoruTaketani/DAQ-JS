import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').PairedEvent[]} */
        this._pairedEvents
        variables.pairedEvents.prependListener(arg => { this._pairedEvents = arg })
        /** @type {import('./index.js').PairedEvent} */
        this._pairedEvent
        variables.pairedEvent.addListener(arg => {
            this._pairedEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._pairedEvents.push(this._pairedEvent)
        }
    }
}
