import ListenableNumber from './ListenableNumber.js'
import ListenableObject from './ListenableObject.js'
import ListenableString from './ListenableString.js'

export default class {
    constructor() {
        /** @type {import('./ListenableObject.js').default<HTMLSelectElement>} */
        this.selectElement = new ListenableObject()

        this.offset = new ListenableNumber()

        this.path = new ListenableString()
        this.filePath = new ListenableString()
        this.divInnerText = new ListenableString()
        this.tableInnerText = new ListenableString()
        this.offsetValue = new ListenableString()
    }
}

