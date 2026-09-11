import ControllableString from './ControllableString.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('http').Server>} */
        this.httpServer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('net').BlockList>} */
        this.blockList = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<URLSearchParams} */
        this.requestParams = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Map<import('ws').WebSocket,string>>} */
        this.webSocketPathnames = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Map<string,boolean|string>>} */
        this.elementValues = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('../lib/index.js').Waveform>} */
        this.waveform = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.daqmxDestinationState = new ControllableString('daqmxDestinationState', this.requestParams)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.peakInnerText = new ElementString('/peakInnerText', this.elementValues, this.webSocketPathnames)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketPathnames)
        this.waveformSVGInnerHTML = new ElementString('/waveformSVGInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

