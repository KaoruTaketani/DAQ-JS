import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.webSocketServer = new ListenableObject()

        this.randomNumber = new ListenableNumber()

        this.randomNumberGeneratorDestinationState = new ListenableString()
    }
}

