import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        this.httpServer = new ListenableObject()
        this.webSocketPathnames = new ListenableObject()

        this.randomNumber = new ListenableNumber()
        this.startTime = new ListenableNumber()

        this.randomNumberGeneratorDestinationState = new ListenableString()
    }
}

