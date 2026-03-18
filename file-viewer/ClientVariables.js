import ListenableString from './ListenableString.js'


export default class {
    constructor() {
        this.selectInnerHTML = new ListenableString()
        this.path = new ListenableString()
        this.directoryName = new ListenableString()
        this.fileName = new ListenableString()
        this.divInnerText = new ListenableString()
    }
}

