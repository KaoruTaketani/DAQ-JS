import ControllableBoolean from './ControllableBoolean.js'
import ControllableNumber from './ControllableNumber.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.message = new ListenableObject()
        this.webSocketServer = new ListenableObject()
        this.histogram = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.total = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ControllableBoolean('randomNumberGeneratorIsBusy', this.message)
    }
}

