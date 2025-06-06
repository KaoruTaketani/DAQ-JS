import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').ChannelEvent[]} */
        this._channelEvents
        variables.channelEvents.prependListener(arg => { this._channelEvents = arg })
        /** @type {import('./index.js').ChannelEvent} */
        this._channel0Event
        variables.channelEvent.addListener(arg => {
            this._channel0Event = arg
            this._operation()
        })
        this._operation = () => {
            this._channelEvents.push(this._channel0Event)
        }
    }
}
