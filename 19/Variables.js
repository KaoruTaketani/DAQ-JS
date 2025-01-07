import ControllableBoolean from './ControllableBoolean.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import WritableHistogram from './WritableHistogram.js'
import WritableInteger from './WritableInteger.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.timeSeries = new ListenableObject()
        this.histogramHDF5File = new ListenableObject()
        this.histogram = new WritableHistogram('histogram', this.histogramHDF5File)
        this.elementValues = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.total = new WritableInteger('total',this.histogramHDF5File)
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.stopButtonDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.startButtonDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketPathnames)
        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketPathnames)

        this.totalInnerText = new ElementString('/totalInnerText', this.elementValues, this.webSocketPathnames)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketPathnames)
        this.histogramSVGInnerHTML = new ElementString('/histogramSVGInnerHTML', this.elementValues, this.webSocketPathnames)

        this.timeSeriesSVGInnerHTML = new ElementString('/timeSeriesSVGInnerHTML', this.elementValues, this.webSocketPathnames)
    }
}

