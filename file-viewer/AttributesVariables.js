import ClientVariables from './ClientVariables.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.tBodyElement = new ListenableObject()
        this.tHeadElement = new ListenableObject()
        this.tableElement = new ListenableObject()

        this.visibleInnerHTML = new ListenableString()
    }
}

