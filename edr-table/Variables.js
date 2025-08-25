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
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent[]>} */
        this.channelEvents = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').ChannelEvent>} */
        this.channelEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').PairedEvent[]>} */
        this.pairedEvents = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').NeutronEvent[]>} */
        this.neutronEvents = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()

        this.edrFileSize = new ListenableNumber()
        this.processedSize = new ListenableNumber()
        this.kickerPulseCount = new ListenableNumber()
        this.neutronPositionBitLength = new ListenableNumber()
        this.tofMaxInMilliseconds = new ListenableNumber()
        this.tofDifferenceMaxInNanoseconds = new ListenableNumber()
        this.tofDifferenceMinInNanoseconds = new ListenableNumber()
        this.pulseRepetitionFrequencyInHertz = new ListenableNumber()
        this.startTimeInSeconds = new ListenableNumber()
        this.actualMeasuremntTimeInSeconds = new ListenableNumber()
        this.expectedMeasuremntTimeInSeconds = new ListenableNumber()

        this.eventOffset = new ControllableNumber('eventOffset', this.message)

        this.edrPath = new ListenableString()

        this.tableInnerHTML = new ElementString('tableInnerHTML', webSocket)
        this.offsetValue = new ElementString('offsetValue', webSocket)
        this.messageInnerText = new ElementString('messageInnerText', webSocket)
        this.edrFileNamesInnerHTML = new ElementString('edrFileNamesInnerHTML', webSocket)

        this.edrReaderFileName = new ControllableString('edrReaderFileName', this.message)
    }
}

