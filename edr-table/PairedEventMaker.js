import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').ChannelEvent} */
        this._channelEvent
        variables.channelEvent.addListener(arg => {
            this._channelEvent = arg
            this._operation()
        })
        /** @type {import('../lib/index.js').ChannelEvent} */
        this._channel0Event
        /** @type {import('../lib/index.js').ChannelEvent} */
        this._channel1Event
        this._operation = () => {
            if (this._channelEvent.channel === 0) this._channel0Event = this._channelEvent
            if (this._channelEvent.channel === 1) this._channel1Event = this._channelEvent

            if (!this._channel0Event) return
            if (!this._channel1Event) return

            variables.pairedEvent.assign({
                xPositionInPixels: this._channel0Event.positionInPixels,
                xPulseHeight: this._channel0Event.pulseHeight,
                xTOFInNanoseconds: this._channel0Event.tofInNanoseconds,
                yPositionInPixels: this._channel1Event.positionInPixels,
                yPulseHeight: this._channel1Event.pulseHeight,
                yTOFInNanoseconds: this._channel1Event.tofInNanoseconds
            })
        }
    }
}
