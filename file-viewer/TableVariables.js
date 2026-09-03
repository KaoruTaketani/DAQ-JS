import ClientVariables from './ClientVariables.js'
import ListenableNumber from '../lib/ListenableNumber.js'
import ListenableString from '../lib/ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()
        this.offset = new ListenableNumber()

        this.tableInnerHTML = new ListenableString()
        this.offsetValue = new ListenableString()
        this.headerText = new ListenableString()
    }
}

