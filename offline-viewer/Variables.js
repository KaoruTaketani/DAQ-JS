import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        this.hdf5File = new ListenableObject()
        this.webSocket = new ListenableObject()

        this.clientUrl = new ListenableString()
        this.clientInnerHTML = new ListenableString()
    }
}

