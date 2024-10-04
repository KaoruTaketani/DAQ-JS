import ListenableBoolean from './ListenableBoolean.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.webSocketServer = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.randomNumberGeneratorIsBusy = new ListenableBoolean()
    }
}

