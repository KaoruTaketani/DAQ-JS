import ClientVariables from './ClientVariables.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()

        this.tableInnerHTML = new ListenableString()
        this.visibleInnerHTML = new ListenableString()
    }
}

