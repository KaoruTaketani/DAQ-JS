import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').NeutronEvent[]} */
        this._neutronEvents
        variables.neutronEvents.prependListener(arg => { this._neutronEvents = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._neutronEvents.push(this._neutronEvent)
        }
    }
}
