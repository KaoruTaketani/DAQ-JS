import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._channel0Count
        variables.channel0Count.prependListener(arg => { this._channel0Count = arg })
        /** @type {number} */
        this._channel1Count
        variables.channel1Count.prependListener(arg => { this._channel1Count = arg })
        /** @type {import('./index.js').ChannelEvent[]} */
        this._channelEvents
        variables.channelEvents.prependListener(arg => { this._channelEvents = arg })
        /** @type {number} */
        this._edrFileSize
        variables.edrFileSize.prependListener(arg => { this._edrFileSize = arg })
        /** @type {number} */
        this._processedSize
        variables.processedSize.addListener(arg => {
            this._processedSize = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._channelEvents) return

            variables.channelEventMessageInnerText.assign([
                `bytes: ${this._processedSize.toLocaleString()}/ ${this._edrFileSize.toLocaleString()}`,
                `channelEvents.length: ${this._channelEvents.length.toLocaleString()}`
            ].join(', '))// can not use \n
        }
    }
}
