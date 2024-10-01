import ControllableBoolean from './ControllableBoolean.js'
import ElementBoolean from './ElementBoolean.js'
import ElementString from './ElementString.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketServer = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)

        this.randomNumberStopDisabled = new ElementBoolean('randomNumberStopDisabled', this.webSocketServer)
        this.randomNumberStartDisabled = new ElementBoolean('randomNumberStartDisabled', this.webSocketServer)

        this.randomNumberInnerText = new ElementString('randomNumberInnerText', this.webSocketServer)
    }
}

