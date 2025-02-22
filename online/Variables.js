import ControllableBoolean from './ControllableBoolean.js'
import ControllableNumber from './ControllableNumber.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableObject from './ListenableObject.js'

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

        this.preset = new ControllableNumber('preset', this.message)

        this.kickerPulseCountInnerText = new ElementString('/kickerPulseCountInnerText', this.elementValues, this.webSocketPathnames)
        this.tofHistogramSVGInnerHTML = new ElementString('/tofHistogramSVGInnerHTML', this.elementValues, this.webSocketPathnames)
        this.presetValue = new ElementString('/presetValue', this.elementValues, this.webSocketPathnames)
    }
}

