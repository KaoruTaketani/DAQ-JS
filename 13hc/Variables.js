import ElementBoolean from '../13/ElementBoolean.js'
import ElementString from '../13/ElementString.js'
import ListenableNumber from '../13/ListenableNumber.js'
import ListenableObject from '../13/ListenableObject.js'
import ControllableBoolean from '../13hb/ControllableBoolean.js'
import ControllableNumber from '../13hb/ControllableNumber.js'
import BatchBoolean from './BatchBoolean.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.requestParams = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()
        this.histogram = new ListenableObject()
        this.batchParams = new ListenableObject()
        this.batchResolve = new ListenableObject()
        this.batchReject = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.batchProcessorIsBusy = new ControllableBoolean('batchProcessorIsBusy', this.requestParams,this.batchResolve)
        this.randomNumberGeneratorIsBusy = new BatchBoolean('randomNumberGeneratorIsBusy', this.requestParams, this.batchResolve)

        this.preset = new ControllableNumber('preset', this.requestParams,this.batchResolve)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.presetDisabled = new ElementBoolean('/presetDisabled', this.elementValues, this.webSocketPathnames)
        this.batchStartButtonDisabled = new ElementBoolean('/batchStartButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.batchStopButtonDisabled = new ElementBoolean('/batchStopButtonDisabled', this.elementValues, this.webSocketPathnames)

        this.histogramSVGInnerHTML = new ElementString('/histogramSVGInnerHTML', this.elementValues, this.webSocketPathnames)
        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketPathnames)
        this.batchTableInnerHTML = new ElementString('/batchTableInnerHTML', this.elementValues, this.webSocketPathnames)
        this.presetValue = new ElementString('/presetValue', this.elementValues, this.webSocketPathnames)
    }
}

