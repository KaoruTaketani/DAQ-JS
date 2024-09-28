import ListenableString from './ListenableString.js'
import ListenableObject from './ListenableObject.js'

export default class {
    constructor() {
        this.httpResponse = new ListenableObject()
        this.httpServer = new ListenableObject()
        this.newWebSocket = new ListenableObject()

        this.httpRequestUrl = new ListenableString()
    }
}

