import ControllableBoolean from './ControllableBoolean.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketUrls = new ListenableObject()
        this.histogram = new ListenableObject()
        this.elementValues = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.total = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.randomNumberStopDisabled = new ElementBoolean('/RandomNumberGeneratorClient.js#randomNumberStopDisabled', this.elementValues, this.webSocketUrls)
        this.randomNumberStartDisabled = new ElementBoolean('/RandomNumberGeneratorClient.js#randomNumberStartDisabled', this.elementValues, this.webSocketUrls)

        this.randomNumberInnerText = new ElementString('/RandomNumberGeneratorClient.js#randomNumberInnerText', this.elementValues, this.webSocketUrls)

        this.totalInnerText = new ElementString('/HistogramMakerClient.js#totalInnerText', this.elementValues, this.webSocketUrls)
        this.startTimeInnerText = new ElementString('/HistogramMakerClient.js#startTimeInnerText', this.elementValues, this.webSocketUrls)
    }
}

