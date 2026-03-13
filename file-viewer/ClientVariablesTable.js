import ClientVariables from './ClientVariables.js'
import ListenableNumber from './ListenableNumber.js'
import ListenableString from './ListenableString.js'

export default class extends ClientVariables {
    constructor() {
        super()
        this.offset = new ListenableNumber()

        this.tableInnerText = new ListenableString()
        this.offsetValue = new ListenableString()
    }
}

