import ControllableBoolean from '../13/ControllableBoolean.js'
import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableNumber from './ControllableNumber.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()
        this.histogram = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.preset = new ControllableNumber('preset', this.message)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.presetDisabled = new ElementBoolean('/presetDisabled', this.elementValues, this.webSocketPathnames)

        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketPathnames)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketPathnames)
        this.presetValue = new ElementString('/presetValue', this.elementValues, this.webSocketPathnames)
        this.histogramSVGInnerHTML = new ElementString('/histogramSVGInnerHTML', this.elementValues, this.webSocketPathnames)
        this.timeSeriesSVGInnerHTML = new ElementString('/timeSeriesSVGInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

