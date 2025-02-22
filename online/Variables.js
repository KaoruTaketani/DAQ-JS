import ControllableBoolean from './ControllableBoolean.js'
import ControllableNumber from './ControllableNumber.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('http').Server>} */
        this.httpServer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<object>} */
        this.message = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Map<import('ws').WebSocket,string>>} */
        this.webSocketPathnames = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Map<string,boolean|string>>} */
        this.elementValues = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').Histogram>} */
        this.tofHistogram = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('net').Socket>} */
        this.neunetReaderSocket = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<Buffer>} */
        this.eventBuffer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent>} */
        this.channel0Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').ChannelEvent>} */
        this.channel1Event = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').PairedEvent>} */
        this.pairedEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').NeutronEvent>} */
        this.neutronEvent = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('./index.js').Histogram2D>} */
        this.image = new ListenableObject()

        this.neunetReaderIsBusy = new ControllableBoolean('neunetReaderIsBusy', this.message)
        this.usePreset = new ControllableBoolean('usePreset', this.message)
        this.saveFile = new ControllableBoolean('saveFile', this.message)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.usePresetChecked = new ElementBoolean('/usePresetChecked', this.elementValues, this.webSocketPathnames)
        this.usePresetDisabled = new ElementBoolean('/usePresetDisabled', this.elementValues, this.webSocketPathnames)
        this.presetDisabled = new ElementBoolean('/presetDisabled', this.elementValues, this.webSocketPathnames)
        this.saveFileChecked = new ElementBoolean('/saveFileChecked', this.elementValues, this.webSocketPathnames)
        this.saveFileDisabled = new ElementBoolean('/saveFileDisabled', this.elementValues, this.webSocketPathnames)

        this.kickerPulseCount = new ListenableNumber()
        this.channel0Count = new ListenableNumber()
        this.channel1Count = new ListenableNumber()
        this.neutronCount = new ListenableNumber()
        this.tofDifferenceMin = new ListenableNumber()
        this.tofDifferenceMax = new ListenableNumber()

        this.preset = new ControllableNumber('preset', this.message)

        this.edrFilePath = new ListenableString()

        this.presetValue = new ElementString('/presetValue', this.elementValues, this.webSocketPathnames)
        this.kickerPulseCountInnerText = new ElementString('/kickerPulseCountInnerText', this.elementValues, this.webSocketPathnames)
        this.channel0CountInnerText = new ElementString('/channel0CountInnerText', this.elementValues, this.webSocketPathnames)
        this.channel1CountInnerText = new ElementString('/channel1CountInnerText', this.elementValues, this.webSocketPathnames)
        this.neutronCountInnerText = new ElementString('/neutronCountInnerText', this.elementValues, this.webSocketPathnames)
        this.imageSrc = new ElementString('/imageSrc', this.elementValues, this.webSocketPathnames)
        this.edrFilePathInnerText = new ElementString('/edrFilePathInnerText', this.elementValues, this.webSocketPathnames)
    }
}

