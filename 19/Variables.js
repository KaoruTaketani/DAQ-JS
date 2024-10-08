import ControllableBoolean from './ControllableBoolean.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import WritableHistogram from './WritableHistogram.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketUrls = new ListenableObject()
        this.timeSeries = new ListenableObject()
        this.histogramHDF5File = new ListenableObject()
        this.histogram = new WritableHistogram('rand', this.histogramHDF5File)        

        this.randomNumber = new ListenableNumber()
        this.total = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.randomNumberStopDisabled = new ElementBoolean('randomNumberStopDisabled', '/RandomNumberGeneratorClient.js', this.webSocketUrls)
        this.randomNumberStartDisabled = new ElementBoolean('randomNumberStartDisabled', '/RandomNumberGeneratorClient.js', this.webSocketUrls)
        this.randomNumberInnerText = new ElementString('randomNumberInnerText', '/RandomNumberGeneratorClient.js', this.webSocketUrls)

        this.totalInnerText = new ElementString('totalInnerText', '/HistogramMakerClient.js', this.webSocketUrls)
        this.startTimeInnerText = new ElementString('startTimeInnerText', '/HistogramMakerClient.js', this.webSocketUrls)
        this.histogramSVGInnerHTML = new ElementString('svgInnerHTML', '/HistogramMakerClient.js', this.webSocketUrls)

        this.timeSeriesSVGInnerHTML = new ElementString('svgInnerHTML', '/TimeSeriesMakerClient.js', this.webSocketUrls)
    }
}
