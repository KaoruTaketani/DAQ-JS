import ControllableBoolean from './ControllableBoolean.js'
import ControllableNumber from './ControllableNumber.js'
import ControllableString from './ControllableString.js'
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
        this.histogramHDF5File = new ListenableObject()
        this.histogram = new WritableHistogram('rand', this.histogramHDF5File)

        this.randomNumber = new ListenableNumber()
        this.histogramSVGViewBoxWidth = new ListenableNumber()
        this.histogramSVGViewBoxHeight = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.histogramTotal = new ControllableNumber('histogramTotal', this.message)

        this.histogramYAxisScale = new ControllableString('histogramYAxisScale', this.message)

        this.randomNumberStopDisabled = new ElementBoolean('randomNumberStopDisabled', '/RandomNumberGeneratorClient.js', this.webSocketUrls)
        this.randomNumberStartDisabled = new ElementBoolean('randomNumberStartDisabled', '/RandomNumberGeneratorClient.js', this.webSocketUrls)
        this.randomNumberInnerText = new ElementString('randomNumberInnerText', '/RandomNumberGeneratorClient.js', this.webSocketUrls)

        this.histogramYAxisScaleLogChecked = new ElementBoolean('yAxisScaleLogChecked', '/HistogramMakerClient.js', this.webSocketUrls)
        this.histogramMessageInnerText = new ElementString('messageInnerText', '/HistogramMakerClient.js', this.webSocketUrls)
        this.histogramSVGInnerHTML = new ElementString('svgInnerHTML', '/HistogramMakerClient.js', this.webSocketUrls)
        this.histogramSVGViewBox = new ElementString('svgViewBox', '/HistogramMakerClient.js', this.webSocketUrls)
    }
}
