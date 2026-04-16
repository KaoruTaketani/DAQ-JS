import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'


export default class {
    constructor() {
        this.fileNames = new ListenableObject()

        this.selectInnerHTML = new ListenableString()
        this.path = new ListenableString()
        this.directoryName = new ListenableString()
        this.divInnerText = new ListenableString()
    }
}

