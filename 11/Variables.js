import ListenableString from './ListenableString.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpResponse = new ListenableObject()
        this.httpServer = new ListenableObject()
        this.webSockets = new ListenableObject()
        this.connectedWebSocket = new ListenableObject()
        this.closedWebSocket = new ListenableObject()

        this.httpRequestUrl = new ListenableString()
    }
}

