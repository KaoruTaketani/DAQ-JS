import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.randomNumber = new ListenableNumber()

        this.httpServer = new ListenableObject()
        this.webSocketServer = new ListenableObject()
    }
}

