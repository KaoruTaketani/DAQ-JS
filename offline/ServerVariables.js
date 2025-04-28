import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<import('ws').WebSocket>} */
        this.clientWebSocket = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<import('http').Server>} */
        this.httpServer = new ListenableObject()
        /** @type {import('./ListenableObject.js').default<object[]>} */
        this.tableMetadata = new ListenableObject()

        this.message = new ListenableString()
        this.hdf5Path = new ListenableString()
        this.clientUrl = new ListenableString()
    }
}

