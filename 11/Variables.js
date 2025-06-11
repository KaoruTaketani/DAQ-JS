import ListenableBoolean from '../10/ListenableBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()
        this.elementValues = new ListenableObject()

        this.randomNumberGeneratorIsBusy = new ListenableBoolean()

        this.randomNumber = new ListenableNumber()
        this.total = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberInnerText = new ElementString('/randomNumberInnerText', this.elementValues, this.webSocketPathnames)
        this.startTimeInnerText = new ElementString('/startTimeInnerText', this.elementValues, this.webSocketPathnames)
    }
}

