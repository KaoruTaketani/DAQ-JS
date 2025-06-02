import ControllableNumber from './ControllableNumber.js'
import ControllableString from './ControllableString.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    /**
     * @param {import('ws').WebSocket} webSocket 
     */
    constructor(webSocket) {
        /** @type {import('./ListenableObject.js').default<object>} */
        this.message = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent[]>} */
        this.channelEvents = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent>} */
        this.channelEvent = new ListenableObject()

        this.edrFileSize = new ListenableNumber()
        this.processedSize = new ListenableNumber()
        this.kickerPulseCount = new ListenableNumber()
        this.channel0Count = new ListenableNumber()
        this.channel1Count = new ListenableNumber()
        this.neutronPositionBitLength = new ListenableNumber()

        this.channelEventOffset = new ControllableNumber('channelEventOffset', this.message)

        this.edrPath = new ListenableString()

        this.channelEventTableInnerHTML = new ElementString('channelEventTableInnerHTML', webSocket)
        this.channelEventOffsetValue = new ElementString('channelEventOffsetValue', webSocket)
        this.channelEventMessageInnerText = new ElementString('channelEventMessageInnerText', webSocket)
        this.edrFileNamesInnerHTML = new ElementString('edrFileNamesInnerHTML', webSocket)

        this.edrReaderFileName = new ControllableString('edrReaderFileName', this.message)
    }
}

