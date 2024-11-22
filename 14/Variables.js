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

        this.randomNumberStopDisabled = new ElementBoolean('/stopButtonDisabled', this.elementValues, this.webSocketUrls)
        this.randomNumberStartDisabled = new ElementBoolean('/startButtonDisabled', this.elementValues, this.webSocketUrls)

        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketUrls)

        this.totalInnerText = new ElementString('/totalInnerText', this.elementValues, this.webSocketUrls)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketUrls)
    }
}

