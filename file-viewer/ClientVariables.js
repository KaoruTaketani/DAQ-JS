import ListenableObject from '../lib/ListenableObject.js'
import ListenableString from '../lib/ListenableString.js'

export default class {
    constructor() {
        this.fileNames = new ListenableObject()

        this.filesInnerHTML = new ListenableString()
        this.path = new ListenableString()
        this.extname = new ListenableString()
        this.directoryName = new ListenableString()
        this.divInnerText = new ListenableString()
    }
}

