import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        this.hdf5File = new ListenableObject()
        this.clientWebSocket = new ListenableObject()
        this.httpServer = new ListenableObject()
        this.tableMetadata = new ListenableObject()

        this.hdf5Path = new ListenableString()
        this.clientUrl = new ListenableString()
        this.clientInnerHTML = new ListenableString()
        this.tableSelectedColumns = new ListenableString()
    }
}

